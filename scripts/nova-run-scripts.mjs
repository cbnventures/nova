import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { platform } from 'os';
import { resolve } from 'path';

import chalk from 'chalk';

const args = process.argv.slice(2);
const isSequential = args.includes('--sequential');
const isParallel = args.includes('--parallel');
const pattern = args.find((arg, index) => !arg.startsWith('--') && (index === 0 || args[index - 1] !== '--buffer'));
const bufferArgIndex = args.indexOf('--buffer');
const bufferArgValue = (bufferArgIndex !== -1) ? args[bufferArgIndex + 1] : undefined;

if (pattern === undefined) {
  console.error('A script name pattern is required (e.g., "build:*").');
  process.exit(1);
}

if (isSequential && isParallel) {
  console.error('Specify either --sequential or --parallel, not both.');
  process.exit(1);
}

if (!isSequential && !isParallel) {
  console.error('Specify --sequential or --parallel.');
  process.exit(1);
}

// Read "package.json" from the current working directory.
const packageJsonPath = resolve(process.cwd(), 'package.json');
let packageJson;

try {
  packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
} catch {
  console.error('No "package.json" found in the current directory.');
  process.exit(1);
}

const scripts = packageJson['scripts'];

if (scripts === undefined) {
  console.warn('No "scripts" field found in "package.json".');
  process.exit(0);
}

// Match scripts by prefix pattern.
let matched;

if (pattern.endsWith('*')) {
  const prefix = pattern.slice(0, -1);

  matched = Object.keys(scripts).filter((name) => name.startsWith(prefix));
} else if (scripts[pattern] !== undefined) {
  matched = [pattern];
} else {
  matched = [];
}

if (matched.length === 0) {
  console.warn(`No scripts matched the pattern "${pattern}".`);
  process.exit(0);
}

if (matched.length > 1) {
  console.info(`Matched ${matched.length} script(s): ${matched.map((name) => chalk.cyan(name)).join(', ')}`);
}

// Spawn a script.
const npmCommand = (platform() === 'win32') ? 'npm.cmd' : 'npm';

function spawnScript(script) {
  return new Promise((promiseResolve, reject) => {
    const child = spawn(npmCommand, [
      'run',
      script,
    ], {
      stdio: 'inherit',
      shell: false,
    });

    child.on('close', (code) => {
      promiseResolve(code ?? 1);
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

// Run scripts in the selected mode.
if (isSequential) {
  for (const script of matched) {
    console.info(`\n┌─ ${chalk.cyan(script)} ──`);

    const exitCode = await spawnScript(script);

    if (exitCode !== 0) {
      console.error(`└─ ${chalk.cyan(script)} ── ${chalk.red(`✗ (exit code ${exitCode})`)}`);
      process.exit(1);
    }

    console.info(`└─ ${chalk.cyan(script)} ── ${chalk.green('✓')}`);
  }

  console.info('\nAll scripts completed successfully.');
}

if (isParallel) {
  const bufferMs = Number(bufferArgValue ?? '500');

  if (Number.isNaN(bufferMs) || bufferMs <= 0 || !Number.isInteger(bufferMs)) {
    console.error('The --buffer value must be a positive integer.');
    process.exit(1);
  }

  // Build color-coded prefixes for each script.
  const colorFunctions = [
    chalk.cyan,
    chalk.yellow,
    chalk.magenta,
    chalk.green,
    chalk.blue,
    chalk.red,
  ];
  const prefixes = new Map();

  for (let colorIndex = 0; colorIndex < matched.length; colorIndex += 1) {
    const script = matched[colorIndex];
    const colorFunction = colorFunctions[colorIndex % colorFunctions.length];

    prefixes.set(script, colorFunction(`[${script}]`));
  }

  // Shared queue and state.
  const queue = [];
  const partialLines = new Map();
  const children = [];
  const exitPromises = [];

  let lastFlushedScript = '';

  // Resolve per-child exit outcome. Returns true if the child failed (non-zero
  // exit or error event), false otherwise. Resolving with a value (instead of
  // mutating outer scope) avoids closure-over-mutable-variable-in-loop hazards.
  const waitForChildExit = (child, script) => new Promise((promiseResolve) => {
    child.on('close', (code) => {
      const partial = partialLines.get(script) ?? '';

      if (partial.length > 0) {
        queue.push({
          script, stream: 'stdout', line: partial,
        });
        partialLines.set(script, '');
      }

      if (code !== 0) {
        queue.push({
          script, stream: 'stderr', line: `✗ (exit code ${code ?? 1})`,
        });
        promiseResolve(true);
        return;
      }

      queue.push({
        script, stream: 'stdout', line: '✓',
      });
      promiseResolve(false);
    });

    child.on('error', (error) => {
      queue.push({
        script, stream: 'stderr', line: `error: ${error.message}`,
      });
      promiseResolve(true);
    });
  });

  // Flush all queued lines with prefixes and blank-line separators.
  const flushQueue = () => {
    for (const entry of queue) {
      const prefix = prefixes.get(entry.script) ?? `[${entry.script}]`;

      if (lastFlushedScript !== '' && lastFlushedScript !== entry.script) {
        process.stdout.write('\n');
      }

      lastFlushedScript = entry.script;

      const formattedLine = `${prefix} ${entry.line}\n`;

      if (entry.stream === 'stderr') {
        process.stderr.write(formattedLine);
      } else {
        process.stdout.write(formattedLine);
      }
    }

    queue.length = 0;
  };

  // Spawn all scripts with piped stdio.
  for (const script of matched) {
    const child = spawn(npmCommand, [
      'run',
      script,
    ], {
      stdio: 'pipe',
      shell: false,
    });

    children.push(child);
    partialLines.set(script, '');

    const handleData = (data, stream) => {
      const text = (partialLines.get(script) ?? '') + data.toString();
      const lines = text.split('\n');

      const partial = lines.pop() ?? '';

      partialLines.set(script, partial);

      for (const line of lines) {
        if (line.length > 0) {
          queue.push({
            script, stream, line,
          });
        }
      }
    };

    child.stdout.on('data', (data) => {
      handleData(data, 'stdout');
    });

    child.stderr.on('data', (data) => {
      handleData(data, 'stderr');
    });

    exitPromises.push(waitForChildExit(child, script));
  }

  // Start periodic flushing.
  const flushInterval = setInterval(flushQueue, bufferMs);

  // Forward signals to children.
  const forwardSignal = (signal) => {
    for (const child of children) {
      child.kill(signal);
    }
  };

  process.on('SIGINT', () => {
    forwardSignal('SIGINT');
  });

  process.on('SIGTERM', () => {
    forwardSignal('SIGTERM');
  });

  // Wait for all children to exit.
  const exitResults = await Promise.allSettled(exitPromises);
  const failed = exitResults.some((result) => result.status === 'fulfilled' && result.value === true);

  // Final flush and cleanup.
  clearInterval(flushInterval);
  flushQueue();

  if (failed) {
    process.exit(1);
  }

  console.info('\nAll scripts completed successfully.');
}
