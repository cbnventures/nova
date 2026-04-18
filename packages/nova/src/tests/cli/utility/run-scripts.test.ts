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

import { afterAll, describe, it } from 'vitest';

import { CliUtilityRunScripts } from '../../../cli/utility/run-scripts.js';

import type {
  TestsCliUtilityRunScriptsRunCapturedOutput,
  TestsCliUtilityRunScriptsRunCapturedWrites,
  TestsCliUtilityRunScriptsRunChunkString,
  TestsCliUtilityRunScriptsRunFileA,
  TestsCliUtilityRunScriptsRunFileAPath,
  TestsCliUtilityRunScriptsRunFileB,
  TestsCliUtilityRunScriptsRunFileBPath,
  TestsCliUtilityRunScriptsRunIncludesHelloA,
  TestsCliUtilityRunScriptsRunIncludesHelloB,
  TestsCliUtilityRunScriptsRunIncludesTaskA,
  TestsCliUtilityRunScriptsRunIncludesTaskB,
  TestsCliUtilityRunScriptsRunMissingFilePath,
  TestsCliUtilityRunScriptsRunOriginalCwd,
  TestsCliUtilityRunScriptsRunOriginalStdoutWrite,
  TestsCliUtilityRunScriptsRunOutput,
  TestsCliUtilityRunScriptsRunOutputPath,
  TestsCliUtilityRunScriptsRunPackageJson,
  TestsCliUtilityRunScriptsRunPackageJsonPath,
  TestsCliUtilityRunScriptsRunProjectRoot,
  TestsCliUtilityRunScriptsRunRealProjectRoot,
  TestsCliUtilityRunScriptsRunSandboxRoot,
  TestsCliUtilityRunScriptsRunSecondRan,
  TestsCliUtilityRunScriptsRunTemporaryDirectory,
  TestsCliUtilityRunScriptsRunTemporaryPrefix,
} from '../../../types/tests/cli/utility/run-scripts.test.d.ts';

/**
 * Tests - CLI - Utility - Run Scripts - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityRunScripts.run', async () => {
  const originalCwd: TestsCliUtilityRunScriptsRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliUtilityRunScriptsRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliUtilityRunScriptsRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliUtilityRunScriptsRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('runs scripts sequentially', async () => {
    const projectRoot: TestsCliUtilityRunScriptsRunProjectRoot = join(sandboxRoot, 'sequential');

    await mkdir(projectRoot, { recursive: true });

    // Create a "package.json" with scripts that write to a shared file.
    const packageJson: TestsCliUtilityRunScriptsRunPackageJson = JSON.stringify({
      name: 'test-sequential',
      scripts: {
        'build:first': 'node -e "require(\'fs\').appendFileSync(\'output.txt\', \'first\\n\')"',
        'build:second': 'node -e "require(\'fs\').appendFileSync(\'output.txt\', \'second\\n\')"',
      },
    }, null, 2);

    const packageJsonPath: TestsCliUtilityRunScriptsRunPackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: TestsCliUtilityRunScriptsRunRealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'build:*',
      sequential: true,
    });

    strictEqual(process.exitCode, undefined);

    const outputPath: TestsCliUtilityRunScriptsRunOutputPath = join(realProjectRoot, 'output.txt');
    const output: TestsCliUtilityRunScriptsRunOutput = await readFile(outputPath, 'utf-8');

    strictEqual(output, 'first\nsecond\n');

    return;
  });

  it('runs scripts in parallel', async () => {
    const projectRoot: TestsCliUtilityRunScriptsRunProjectRoot = join(sandboxRoot, 'parallel');

    await mkdir(projectRoot, { recursive: true });

    // Create a "package.json" with scripts that create individual marker files.
    const packageJson: TestsCliUtilityRunScriptsRunPackageJson = JSON.stringify({
      name: 'test-parallel',
      scripts: {
        'task:a': 'node -e "require(\'fs\').writeFileSync(\'a.txt\', \'done\')"',
        'task:b': 'node -e "require(\'fs\').writeFileSync(\'b.txt\', \'done\')"',
      },
    }, null, 2);

    const packageJsonPath: TestsCliUtilityRunScriptsRunPackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: TestsCliUtilityRunScriptsRunRealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'task:*',
      parallel: true,
    });

    strictEqual(process.exitCode, undefined);

    const fileAPath: TestsCliUtilityRunScriptsRunFileAPath = join(realProjectRoot, 'a.txt');
    const fileBPath: TestsCliUtilityRunScriptsRunFileBPath = join(realProjectRoot, 'b.txt');
    const fileA: TestsCliUtilityRunScriptsRunFileA = await readFile(fileAPath, 'utf-8');
    const fileB: TestsCliUtilityRunScriptsRunFileB = await readFile(fileBPath, 'utf-8');

    strictEqual(fileA, 'done');
    strictEqual(fileB, 'done');

    return;
  });

  it('produces prefixed output in parallel mode', async () => {
    const projectRoot: TestsCliUtilityRunScriptsRunProjectRoot = join(sandboxRoot, 'parallel-output');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: TestsCliUtilityRunScriptsRunPackageJson = JSON.stringify({
      name: 'test-parallel-output',
      scripts: {
        'task:a': 'node -e "process.stdout.write(\'hello-a\\n\')"',
        'task:b': 'node -e "process.stdout.write(\'hello-b\\n\')"',
      },
    }, null, 2);

    const packageJsonPath: TestsCliUtilityRunScriptsRunPackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: TestsCliUtilityRunScriptsRunRealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    // Capture stdout writes.
    const capturedWrites: TestsCliUtilityRunScriptsRunCapturedWrites = [];
    const originalStdoutWrite: TestsCliUtilityRunScriptsRunOriginalStdoutWrite = process.stdout.write;

    process.stdout.write = ((chunk) => {
      const chunkString: TestsCliUtilityRunScriptsRunChunkString = String(chunk);

      capturedWrites.push(chunkString);

      return true;
    }) as TestsCliUtilityRunScriptsRunOriginalStdoutWrite;

    try {
      await CliUtilityRunScripts.run({
        pattern: 'task:*',
        parallel: true,
        buffer: '100',
      });
    } finally {
      process.stdout.write = originalStdoutWrite;
    }

    strictEqual(process.exitCode, undefined);

    const capturedOutput: TestsCliUtilityRunScriptsRunCapturedOutput = capturedWrites.join('');

    const includesTaskA: TestsCliUtilityRunScriptsRunIncludesTaskA = capturedOutput.includes('[task:a]');
    const includesTaskB: TestsCliUtilityRunScriptsRunIncludesTaskB = capturedOutput.includes('[task:b]');
    const includesHelloA: TestsCliUtilityRunScriptsRunIncludesHelloA = capturedOutput.includes('hello-a');
    const includesHelloB: TestsCliUtilityRunScriptsRunIncludesHelloB = capturedOutput.includes('hello-b');

    strictEqual(includesTaskA, true);
    strictEqual(includesTaskB, true);
    strictEqual(includesHelloA, true);
    strictEqual(includesHelloB, true);

    return;
  });

  it('errors when --buffer value is not a positive integer', async () => {
    const projectRoot: TestsCliUtilityRunScriptsRunProjectRoot = join(sandboxRoot, 'bad-buffer');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: TestsCliUtilityRunScriptsRunPackageJson = JSON.stringify({
      name: 'test-bad-buffer',
      scripts: {
        'task:a': 'echo hello',
      },
    }, null, 2);

    const packageJsonPath: TestsCliUtilityRunScriptsRunPackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: TestsCliUtilityRunScriptsRunRealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'task:*',
      parallel: true,
      buffer: 'abc',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('stops on first failure in sequential mode', async () => {
    const projectRoot: TestsCliUtilityRunScriptsRunProjectRoot = join(sandboxRoot, 'seq-fail');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: TestsCliUtilityRunScriptsRunPackageJson = JSON.stringify({
      name: 'test-seq-fail',
      scripts: {
        'step:first': 'node -e "process.exit(1)"',
        'step:second': 'node -e "require(\'fs\').writeFileSync(\'should-not-exist.txt\', \'bad\')"',
      },
    }, null, 2);

    const packageJsonPath: TestsCliUtilityRunScriptsRunPackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: TestsCliUtilityRunScriptsRunRealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'step:*',
      sequential: true,
    });

    strictEqual(process.exitCode, 1);

    // The second script should not have run.
    let secondRan: TestsCliUtilityRunScriptsRunSecondRan = true;

    try {
      const missingFilePath: TestsCliUtilityRunScriptsRunMissingFilePath = join(realProjectRoot, 'should-not-exist.txt');

      await readFile(missingFilePath, 'utf-8');
    } catch {
      secondRan = false;
    }

    strictEqual(secondRan, false);

    return;
  });

  it('warns when no scripts match the pattern', async () => {
    const projectRoot: TestsCliUtilityRunScriptsRunProjectRoot = join(sandboxRoot, 'no-match');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: TestsCliUtilityRunScriptsRunPackageJson = JSON.stringify({
      name: 'test-no-match',
      scripts: {
        'build:transpile': 'echo transpile',
      },
    }, null, 2);

    const packageJsonPath: TestsCliUtilityRunScriptsRunPackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: TestsCliUtilityRunScriptsRunRealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'nonexistent:*',
      sequential: true,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('errors when both --sequential and --parallel are set', async () => {
    const projectRoot: TestsCliUtilityRunScriptsRunProjectRoot = join(sandboxRoot, 'both-modes');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: TestsCliUtilityRunScriptsRunPackageJson = JSON.stringify({
      name: 'test-both-modes',
      scripts: {
        'build:transpile': 'echo transpile',
      },
    }, null, 2);

    const packageJsonPath: TestsCliUtilityRunScriptsRunPackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: TestsCliUtilityRunScriptsRunRealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'build:*',
      sequential: true,
      parallel: true,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('matches exact script name without wildcard', async () => {
    const projectRoot: TestsCliUtilityRunScriptsRunProjectRoot = join(sandboxRoot, 'exact-match');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: TestsCliUtilityRunScriptsRunPackageJson = JSON.stringify({
      name: 'test-exact-match',
      scripts: {
        build: 'node -e "require(\'fs\').writeFileSync(\'exact.txt\', \'done\')"',
      },
    }, null, 2);

    const packageJsonPath: TestsCliUtilityRunScriptsRunPackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: TestsCliUtilityRunScriptsRunRealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'build',
      sequential: true,
    });

    strictEqual(process.exitCode, undefined);

    const outputPath: TestsCliUtilityRunScriptsRunOutputPath = join(realProjectRoot, 'exact.txt');
    const output: TestsCliUtilityRunScriptsRunOutput = await readFile(outputPath, 'utf-8');

    strictEqual(output, 'done');

    return;
  });

  return;
});
