import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { CLIUtilityRunScripts } from '@/cli/utility/run-scripts.js';

import type {
  CLIUtilityRunScriptsTestOriginalCwd,
  CLIUtilityRunScriptsTestSandboxRoot,
} from '@/types/tests/cli/utility/run-scripts.test.d.ts';

/**
 * CLI Utility - Run Scripts - Run.
 *
 * @since 1.0.0
 */
test('CLIUtilityRunScripts.run', async (context) => {
  const originalCwd: CLIUtilityRunScriptsTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIUtilityRunScriptsTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('runs scripts sequentially', async () => {
    const projectRoot = join(sandboxRoot, 'sequential');

    await mkdir(projectRoot, { recursive: true });

    // Create a "package.json" with scripts that write to a shared file.
    const packageJson = JSON.stringify({
      name: 'test-sequential',
      scripts: {
        'build:first': 'node -e "require(\'fs\').appendFileSync(\'output.txt\', \'first\\n\')"',
        'build:second': 'node -e "require(\'fs\').appendFileSync(\'output.txt\', \'second\\n\')"',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    process.exitCode = undefined;

    await CLIUtilityRunScripts.run({
      pattern: 'build:*',
      sequential: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(realProjectRoot, 'output.txt'), 'utf-8');

    strictEqual(output, 'first\nsecond\n');
  });

  await context.test('runs scripts in parallel', async () => {
    const projectRoot = join(sandboxRoot, 'parallel');

    await mkdir(projectRoot, { recursive: true });

    // Create a "package.json" with scripts that create individual marker files.
    const packageJson = JSON.stringify({
      name: 'test-parallel',
      scripts: {
        'task:a': 'node -e "require(\'fs\').writeFileSync(\'a.txt\', \'done\')"',
        'task:b': 'node -e "require(\'fs\').writeFileSync(\'b.txt\', \'done\')"',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    process.exitCode = undefined;

    await CLIUtilityRunScripts.run({
      pattern: 'task:*',
      parallel: true,
    });

    strictEqual(process.exitCode, undefined);

    const fileA = await readFile(join(realProjectRoot, 'a.txt'), 'utf-8');
    const fileB = await readFile(join(realProjectRoot, 'b.txt'), 'utf-8');

    strictEqual(fileA, 'done');
    strictEqual(fileB, 'done');
  });

  await context.test('stops on first failure in sequential mode', async () => {
    const projectRoot = join(sandboxRoot, 'seq-fail');

    await mkdir(projectRoot, { recursive: true });

    const packageJson = JSON.stringify({
      name: 'test-seq-fail',
      scripts: {
        'step:first': 'node -e "process.exit(1)"',
        'step:second': 'node -e "require(\'fs\').writeFileSync(\'should-not-exist.txt\', \'bad\')"',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    process.exitCode = undefined;

    await CLIUtilityRunScripts.run({
      pattern: 'step:*',
      sequential: true,
    });

    strictEqual(process.exitCode, 1);

    // The second script should not have run.
    let secondRan = true;

    try {
      await readFile(join(realProjectRoot, 'should-not-exist.txt'), 'utf-8');
    } catch (error) {
      secondRan = false;
    }

    strictEqual(secondRan, false);
  });

  await context.test('warns when no scripts match the pattern', async () => {
    const projectRoot = join(sandboxRoot, 'no-match');

    await mkdir(projectRoot, { recursive: true });

    const packageJson = JSON.stringify({
      name: 'test-no-match',
      scripts: {
        'build:transpile': 'echo transpile',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    process.exitCode = undefined;

    await CLIUtilityRunScripts.run({
      pattern: 'nonexistent:*',
      sequential: true,
    });

    strictEqual(process.exitCode, undefined);
  });

  await context.test('errors when both --sequential and --parallel are set', async () => {
    const projectRoot = join(sandboxRoot, 'both-modes');

    await mkdir(projectRoot, { recursive: true });

    const packageJson = JSON.stringify({
      name: 'test-both-modes',
      scripts: {
        'build:transpile': 'echo transpile',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    process.exitCode = undefined;

    await CLIUtilityRunScripts.run({
      pattern: 'build:*',
      sequential: true,
      parallel: true,
    });

    strictEqual(process.exitCode, 1);
  });

  await context.test('matches exact script name without wildcard', async () => {
    const projectRoot = join(sandboxRoot, 'exact-match');

    await mkdir(projectRoot, { recursive: true });

    const packageJson = JSON.stringify({
      name: 'test-exact-match',
      scripts: {
        build: 'node -e "require(\'fs\').writeFileSync(\'exact.txt\', \'done\')"',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    process.exitCode = undefined;

    await CLIUtilityRunScripts.run({
      pattern: 'build',
      sequential: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(realProjectRoot, 'exact.txt'), 'utf-8');

    strictEqual(output, 'done');
  });
});
