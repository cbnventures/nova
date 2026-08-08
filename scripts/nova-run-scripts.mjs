import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { platform } from 'node:os';
import { resolve } from 'node:path';

import chalk from 'chalk';

/**
 * Nova Run Scripts - Nova Run Scripts.
 *
 * Replicates the `nova utility run-scripts` command because nova's own bin may
 * not be built when nova builds or checks itself, matching scripts by prefix and
 * running them sequentially or in parallel with exit-code propagation.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function novaRunScripts() {
  const args = process.argv.slice(2);
  const isSequential = args.includes('--sequential');
  const isParallel = args.includes('--parallel');
  const pattern = args.find((arg, index) => (
    arg.startsWith('--') === false
    && (
      index === 0
      || args[index - 1] !== '--buffer'
    )
  ));
  const bufferArgIndex = args.indexOf('--buffer');
  const bufferArgValue = (bufferArgIndex !== -1) ? args[bufferArgIndex + 1] : undefined;

  if (pattern === undefined) {
    process.stderr.write('A script name pattern is required (e.g., "build:*").\n');

    process.exit(1);
  }

  if (isSequential === true && isParallel === true) {
    process.stderr.write('Specify either --sequential or --parallel, not both.\n');

    process.exit(1);
  }

  if (isSequential === false && isParallel === false) {
    process.stderr.write('Specify --sequential or --parallel.\n');

    process.exit(1);
  }

  // Read "package.json" from the current working directory.
  const packageJsonPath = resolve(process.cwd(), 'package.json');
  let packageJson = undefined;

  try {
    packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  } catch {
    process.stderr.write('No "package.json" found in the current directory.\n');

    process.exit(1);
  }

  const scripts = packageJson['scripts'];

  if (scripts === undefined) {
    process.stderr.write('No "scripts" field found in "package.json".\n');

    process.exit(0);
  }

  // Match scripts by prefix pattern.
  let matched = /** @type {string[] | undefined} */ (undefined);

  if (pattern.endsWith('*') === true) {
    const prefix = pattern.slice(0, -1);

    matched = Object.keys(scripts).filter((name) => name.startsWith(prefix));
  } else if (scripts[pattern] !== undefined) {
    matched = [pattern];
  } else {
    matched = [];
  }

  if (matched.length === 0) {
    process.stderr.write(`No scripts matched the pattern "${pattern}".\n`);

    process.exit(0);
  }

  if (matched.length > 1) {
    process.stdout.write(`Matched ${matched.length} script(s): ${matched.map((name) => chalk.cyan(name)).join(', ')}\n`);
  }

  // Spawn a script.
  const npmCommand = (platform() === 'win32') ? 'npm.cmd' : 'npm';

  /**
   * Nova Run Scripts - Nova Run Scripts - Spawn Script.
   *
   * Runs a single npm script with inherited stdio and resolves with its exit
   * code, rejecting only when the child process fails to spawn at all.
   *
   * @param {string} script - Script.
   *
   * @returns {Promise<number>}
   *
   * @since 0.0.0
   */
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

        return;
      });

      child.on('error', (error) => {
        reject(error);

        return;
      });

      return;
    });
  }

  // Run scripts in the selected mode.
  if (isSequential === true) {
    for (const script of matched) {
      process.stdout.write(`\n┌─ ${chalk.cyan(script)} ──\n`);

      try {
        const exitCode = await spawnScript(script);

        if (exitCode !== 0) {
          process.stderr.write(`└─ ${chalk.cyan(script)} ── ${chalk.red(`✗ (exit code ${exitCode})`)}\n`);

          process.exit(1);
        }

        process.stdout.write(`└─ ${chalk.cyan(script)} ── ${chalk.green('✓')}\n`);
      } catch (spawnError) {
        const errorMessage = (spawnError instanceof Error) ? spawnError.message : String(spawnError);

        process.stderr.write(`└─ ${chalk.cyan(script)} ── ${chalk.red(`✗ (error: ${errorMessage})`)}\n`);

        process.exit(1);
      }
    }

    process.stdout.write('\nAll scripts completed successfully.\n');
  }

  if (isParallel === true) {
    const bufferMs = Number(bufferArgValue ?? '500');

    if (
      Number.isNaN(bufferMs) === true
      || bufferMs <= 0
      || Number.isInteger(bufferMs) === false
    ) {
      process.stderr.write('The --buffer value must be a positive integer.\n');

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

      if (
        script === undefined
        || colorFunction === undefined
      ) {
        continue;
      }

      prefixes.set(script, colorFunction(`[${script}]`));
    }

    // Shared queue and state.
    const queue = /** @type {{ script: string, stream: string, line: string }[]} */ ([]);
    const partialLines = new Map();
    const children = /** @type {import('node:child_process').ChildProcess[]} */ ([]);
    const exitPromises = [];

    let lastFlushedScript = '';

    /**
     * Nova Run Scripts - Nova Run Scripts - Wait For Child Exit.
     *
     * Resolves with the per-child failure outcome so parallel results are read
     * from return values instead of mutating shared loop state.
     *
     * @param {import('node:child_process').ChildProcess} child  - Child.
     * @param {string}                                    script - Script.
     *
     * @returns {Promise<boolean>}
     *
     * @since 0.0.0
     */
    const waitForChildExit = (child, script) => new Promise((promiseResolve) => {
      child.on('close', (code) => {
        const partial = partialLines.get(script) ?? '';

        if (partial.length > 0) {
          queue.push({
            script,
            stream: 'stdout',
            line: partial,
          });

          partialLines.set(script, '');
        }

        if (code !== 0) {
          queue.push({
            script,
            stream: 'stderr',
            line: `✗ (exit code ${code ?? 1})`,
          });

          promiseResolve(true);

          return;
        }

        queue.push({
          script,
          stream: 'stdout',
          line: '✓',
        });

        promiseResolve(false);

        return;
      });

      child.on('error', (error) => {
        queue.push({
          script,
          stream: 'stderr',
          line: `error: ${error.message}`,
        });

        promiseResolve(true);

        return;
      });

      return;
    });

    /**
     * Nova Run Scripts - Nova Run Scripts - Flush Queue.
     *
     * Writes every queued line with its color prefix and a blank-line separator
     * between different scripts so interleaved output stays readable.
     *
     * @returns {void}
     *
     * @since 0.0.0
     */
    const flushQueue = () => {
      for (const entry of queue) {
        const prefix = prefixes.get(entry['script']) ?? `[${entry['script']}]`;

        if (lastFlushedScript !== '' && lastFlushedScript !== entry['script']) {
          process.stdout.write('\n');
        }

        lastFlushedScript = entry['script'];

        const formattedLine = `${prefix} ${entry['line']}\n`;

        if (entry['stream'] === 'stderr') {
          process.stderr.write(formattedLine);
        } else {
          process.stdout.write(formattedLine);
        }
      }

      queue.length = 0;

      return;
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

      /**
       * Nova Run Scripts - Nova Run Scripts - Handle Data.
       *
       * Buffers a chunk into complete lines, holding any trailing partial line
       * until the next chunk so only whole lines are queued for output.
       *
       * @param {object} data   - Data.
       * @param {string} stream - Stream.
       *
       * @returns {void}
       *
       * @since 0.0.0
       */
      const handleData = (data, stream) => {
        const text = (partialLines.get(script) ?? '') + data.toString();
        const lines = text.split('\n');

        const partial = lines.pop() ?? '';

        partialLines.set(script, partial);

        for (const line of lines) {
          if (line.length > 0) {
            queue.push({
              script,
              stream,
              line,
            });
          }
        }

        return;
      };

      child.stdout.on('data', (data) => {
        handleData(data, 'stdout');

        return;
      });

      child.stderr.on('data', (data) => {
        handleData(data, 'stderr');

        return;
      });

      exitPromises.push(waitForChildExit(child, script));
    }

    // Start periodic flushing.
    const flushInterval = setInterval(flushQueue, bufferMs);

    /**
     * Nova Run Scripts - Nova Run Scripts - Forward Signal.
     *
     * Relays a received termination signal to every spawned child so the whole
     * process group shuts down together instead of orphaning children.
     *
     * @param {NodeJS.Signals} signal - Signal.
     *
     * @returns {void}
     *
     * @since 0.0.0
     */
    const forwardSignal = (signal) => {
      for (const child of children) {
        child.kill(signal);
      }

      return;
    };

    process.on('SIGINT', () => {
      forwardSignal('SIGINT');

      return;
    });

    process.on('SIGTERM', () => {
      forwardSignal('SIGTERM');

      return;
    });

    // Wait for all children to exit.
    const exitResults = await Promise.allSettled(exitPromises);
    const failed = exitResults.some((result) => result.status === 'fulfilled' && result.value === true);

    // Final flush and cleanup.
    clearInterval(flushInterval);
    flushQueue();

    if (failed === true) {
      process.exit(1);
    }

    process.stdout.write('\nAll scripts completed successfully.\n');
  }

  return;
}

novaRunScripts();
