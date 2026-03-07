import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { platform } from 'os';
import { resolve } from 'path';

import chalk from 'chalk';

const args = process.argv.slice(2);
const isSequential = args.includes('--sequential');
const isParallel = args.includes('--parallel');
const pattern = args.find((arg) => !arg.startsWith('--'));

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
    const child = spawn(npmCommand, ['run', script], {
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

function spawnScriptBuffered(script) {
  return new Promise((promiseResolve, reject) => {
    const child = spawn(npmCommand, ['run', script], {
      stdio: 'pipe',
      shell: false,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      promiseResolve({ exitCode: code ?? 1, stdout, stderr });
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

if (isParallel && matched.length === 1) {
  const exitCode = await spawnScript(matched[0]);

  if (exitCode !== 0) {
    process.exit(1);
  }
}

if (isParallel && matched.length > 1) {
  const results = await Promise.allSettled(
    matched.map((script) => spawnScriptBuffered(script)),
  );

  let failed = false;

  for (let i = 0; i < results.length; i += 1) {
    const result = results[i];
    const script = matched[i];

    if (result === undefined || script === undefined) {
      continue;
    }

    if (result.status === 'rejected') {
      console.info(`\n┌─ ${chalk.cyan(script)} ──`);
      console.error(`└─ ${chalk.cyan(script)} ── ${chalk.red(`✗ rejected: ${result.reason}`)}`);
      failed = true;
      continue;
    }

    const { exitCode, stdout, stderr } = result.value;

    console.info(`\n┌─ ${chalk.cyan(script)} ──`);

    if (stdout.length > 0) {
      process.stdout.write(stdout);
    }

    if (stderr.length > 0) {
      process.stderr.write(stderr);
    }

    if (exitCode !== 0) {
      console.error(`└─ ${chalk.cyan(script)} ── ${chalk.red(`✗ (exit code ${exitCode})`)}`);
      failed = true;
    } else {
      console.info(`└─ ${chalk.cyan(script)} ── ${chalk.green('✓')}`);
    }
  }

  if (failed) {
    process.exit(1);
  }

  console.info('\nAll scripts completed successfully.');
}
