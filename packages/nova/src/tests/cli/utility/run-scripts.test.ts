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

import { Runner as CliUtilityRunScripts } from '../../../cli/utility/run-scripts.js';

import type {
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBothSequentialAndParallelAreSet_PackageJson,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBothSequentialAndParallelAreSet_PackageJsonPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBothSequentialAndParallelAreSet_ProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBothSequentialAndParallelAreSet_RealProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBufferValueIsNotAPositiveInteger_PackageJson,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBufferValueIsNotAPositiveInteger_PackageJsonPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBufferValueIsNotAPositiveInteger_ProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBufferValueIsNotAPositiveInteger_RealProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_Output,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_OutputPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_PackageJson,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_PackageJsonPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_ProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_RealProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_OriginalCwd,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_CapturedOutput,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_CapturedWrites,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_ChunkString,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_IncludesHelloA,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_IncludesHelloB,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_IncludesTaskA,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_IncludesTaskB,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_OriginalStdoutWrite,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_PackageJson,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_PackageJsonPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_ProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_RealProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_FileA,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_FileAPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_FileB,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_FileBPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_PackageJson,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_PackageJsonPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_ProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_RealProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_Output,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_OutputPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_PackageJson,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_PackageJsonPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_ProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_RealProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_SandboxRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_MissingFilePath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_PackageJson,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_PackageJsonPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_ProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_RealProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_SecondRan,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_TemporaryDirectory,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_TemporaryPrefix,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_WarnsWhenNoScriptsMatchThePattern_PackageJson,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_WarnsWhenNoScriptsMatchThePattern_PackageJsonPath,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_WarnsWhenNoScriptsMatchThePattern_ProjectRoot,
  Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_WarnsWhenNoScriptsMatchThePattern_RealProjectRoot,
} from '../../../types/tests/cli/utility/run-scripts.test.d.ts';

/**
 * Tests - CLI - Utility - Run Scripts - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityRunScripts.run', async () => {
  const originalCwd: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('runs scripts sequentially', async () => {
    const projectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_ProjectRoot = join(sandboxRoot, 'sequential');

    await mkdir(projectRoot, { recursive: true });

    // Create a "package.json" with scripts that write to a shared file.
    const packageJson: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_PackageJson = JSON.stringify({
      name: 'test-sequential',
      scripts: {
        'build:first': 'node -e "require(\'fs\').appendFileSync(\'output.txt\', \'first\\n\')"',
        'build:second': 'node -e "require(\'fs\').appendFileSync(\'output.txt\', \'second\\n\')"',
      },
    }, null, 2);

    const packageJsonPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_PackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_RealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'build:*',
      sequential: true,
    });

    strictEqual(process.exitCode, undefined);

    const outputPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_OutputPath = join(realProjectRoot, 'output.txt');
    const output: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsSequentially_Output = await readFile(outputPath, 'utf-8');

    strictEqual(output, 'first\nsecond\n');

    return;
  });

  it('runs scripts in parallel', async () => {
    const projectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_ProjectRoot = join(sandboxRoot, 'parallel');

    await mkdir(projectRoot, { recursive: true });

    // Create a "package.json" with scripts that create individual marker files.
    const packageJson: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_PackageJson = JSON.stringify({
      name: 'test-parallel',
      scripts: {
        'task:a': 'node -e "require(\'fs\').writeFileSync(\'a.txt\', \'done\')"',
        'task:b': 'node -e "require(\'fs\').writeFileSync(\'b.txt\', \'done\')"',
      },
    }, null, 2);

    const packageJsonPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_PackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_RealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'task:*',
      parallel: true,
    });

    strictEqual(process.exitCode, undefined);

    const fileAPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_FileAPath = join(realProjectRoot, 'a.txt');
    const fileBPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_FileBPath = join(realProjectRoot, 'b.txt');
    const fileA: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_FileA = await readFile(fileAPath, 'utf-8');
    const fileB: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_RunsScriptsInParallel_FileB = await readFile(fileBPath, 'utf-8');

    strictEqual(fileA, 'done');
    strictEqual(fileB, 'done');

    return;
  });

  it('produces prefixed output in parallel mode', async () => {
    const projectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_ProjectRoot = join(sandboxRoot, 'parallel-output');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_PackageJson = JSON.stringify({
      name: 'test-parallel-output',
      scripts: {
        'task:a': 'node -e "process.stdout.write(\'hello-a\\n\')"',
        'task:b': 'node -e "process.stdout.write(\'hello-b\\n\')"',
      },
    }, null, 2);

    const packageJsonPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_PackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_RealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    // Capture stdout writes.
    const capturedWrites: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_CapturedWrites = [];
    const originalStdoutWrite: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_OriginalStdoutWrite = process.stdout.write;

    process.stdout.write = ((chunk) => {
      const chunkString: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_ChunkString = String(chunk);

      capturedWrites.push(chunkString);

      return true;
    }) as Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_OriginalStdoutWrite;

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

    const capturedOutput: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_CapturedOutput = capturedWrites.join('');

    const includesTaskA: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_IncludesTaskA = capturedOutput.includes('[task:a]');
    const includesTaskB: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_IncludesTaskB = capturedOutput.includes('[task:b]');
    const includesHelloA: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_IncludesHelloA = capturedOutput.includes('hello-a');
    const includesHelloB: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ProducesPrefixedOutputInParallelMode_IncludesHelloB = capturedOutput.includes('hello-b');

    strictEqual(includesTaskA, true);
    strictEqual(includesTaskB, true);
    strictEqual(includesHelloA, true);
    strictEqual(includesHelloB, true);

    return;
  });

  it('errors when --buffer value is not a positive integer', async () => {
    const projectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBufferValueIsNotAPositiveInteger_ProjectRoot = join(sandboxRoot, 'bad-buffer');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBufferValueIsNotAPositiveInteger_PackageJson = JSON.stringify({
      name: 'test-bad-buffer',
      scripts: {
        'task:a': 'echo hello',
      },
    }, null, 2);

    const packageJsonPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBufferValueIsNotAPositiveInteger_PackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBufferValueIsNotAPositiveInteger_RealProjectRoot = await realpath(projectRoot);

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
    const projectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_ProjectRoot = join(sandboxRoot, 'seq-fail');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_PackageJson = JSON.stringify({
      name: 'test-seq-fail',
      scripts: {
        'step:first': 'node -e "process.exit(1)"',
        'step:second': 'node -e "require(\'fs\').writeFileSync(\'should-not-exist.txt\', \'bad\')"',
      },
    }, null, 2);

    const packageJsonPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_PackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_RealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'step:*',
      sequential: true,
    });

    strictEqual(process.exitCode, 1);

    // The second script should not have run.
    let secondRan: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_SecondRan = true;

    try {
      const missingFilePath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_StopsOnFirstFailureInSequentialMode_MissingFilePath = join(realProjectRoot, 'should-not-exist.txt');

      await readFile(missingFilePath, 'utf-8');
    } catch {
      secondRan = false;
    }

    strictEqual(secondRan, false);

    return;
  });

  it('warns when no scripts match the pattern', async () => {
    const projectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_WarnsWhenNoScriptsMatchThePattern_ProjectRoot = join(sandboxRoot, 'no-match');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_WarnsWhenNoScriptsMatchThePattern_PackageJson = JSON.stringify({
      name: 'test-no-match',
      scripts: {
        'build:transpile': 'echo transpile',
      },
    }, null, 2);

    const packageJsonPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_WarnsWhenNoScriptsMatchThePattern_PackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_WarnsWhenNoScriptsMatchThePattern_RealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'nonexistent:*',
      sequential: true,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('errors when both --sequential and --parallel are set', async () => {
    const projectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBothSequentialAndParallelAreSet_ProjectRoot = join(sandboxRoot, 'both-modes');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBothSequentialAndParallelAreSet_PackageJson = JSON.stringify({
      name: 'test-both-modes',
      scripts: {
        'build:transpile': 'echo transpile',
      },
    }, null, 2);

    const packageJsonPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBothSequentialAndParallelAreSet_PackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_ErrorsWhenBothSequentialAndParallelAreSet_RealProjectRoot = await realpath(projectRoot);

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
    const projectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_ProjectRoot = join(sandboxRoot, 'exact-match');

    await mkdir(projectRoot, { recursive: true });

    const packageJson: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_PackageJson = JSON.stringify({
      name: 'test-exact-match',
      scripts: {
        build: 'node -e "require(\'fs\').writeFileSync(\'exact.txt\', \'done\')"',
      },
    }, null, 2);

    const packageJsonPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_PackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const realProjectRoot: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_RealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CliUtilityRunScripts.run({
      pattern: 'build',
      sequential: true,
    });

    strictEqual(process.exitCode, undefined);

    const outputPath: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_OutputPath = join(realProjectRoot, 'exact.txt');
    const output: Tests_Cli_Utility_RunScripts_CliUtilityRunScriptsRun_MatchesExactScriptNameWithoutWildcard_Output = await readFile(outputPath, 'utf-8');

    strictEqual(output, 'done');

    return;
  });

  return;
});
