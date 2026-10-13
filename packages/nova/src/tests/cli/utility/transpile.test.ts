import { ok, strictEqual } from 'node:assert/strict';
import { existsSync } from 'node:fs';
import {
  mkdir,
  mkdtemp,
  realpath,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as CliUtilityTranspile } from '../../../cli/utility/transpile.js';
import { runTranspile } from '../../../lib/transpile.js';

import type {
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_IndexPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_OutputExists,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_OutputJsPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_ProjectDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_TsconfigContents,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_TsconfigPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_ErrorsWhenNoTsconfigJsonFound_ProjectDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_OriginalCwd,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_IndexPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_OutputExists,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_OutputJsPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_ProjectDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_TsconfigContents,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_TsconfigPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsInvalidJSON_ProjectDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsInvalidJSON_TsconfigContents,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsInvalidJSON_TsconfigPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_SandboxDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_SandboxRoot,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TemporaryDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TemporaryPrefix,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_Errors,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_IndexPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_Info,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_OutputJsPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_ProjectDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_Result,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_TsconfigContents,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_TsconfigPath,
} from '../../../types/tests/cli/utility/transpile.test.d.ts';

/**
 * Tests - CLI - Utility - Transpile - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityTranspile.run', async () => {
  const originalCwd: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxDirectory: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_SandboxDirectory = await mkdtemp(temporaryPrefix);
  const sandboxRoot: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_SandboxRoot = await realpath(sandboxDirectory);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('emits compiled output for valid TypeScript', async () => {
    const projectDirectory: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_ProjectDirectory = join(sandboxRoot, 'emit-valid-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_TsconfigContents = JSON.stringify({
      compilerOptions: {
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        noEmitOnError: true,
        strict: true,
        skipLibCheck: false,
        outDir: './build',
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_IndexPath = join(projectDirectory, 'index.ts');

    await mkdir(join(projectDirectory, 'node_modules', 'broken-dependency'), { recursive: true });

    await writeFile(join(projectDirectory, 'node_modules', 'broken-dependency', 'package.json'), JSON.stringify({
      name: 'broken-dependency',
      type: 'module',
      types: './index.d.ts',
    }, null, 2), 'utf-8');

    await writeFile(join(projectDirectory, 'node_modules', 'broken-dependency', 'index.d.ts'), 'export declare const greeting: MissingDependencyType;\n', 'utf-8');

    await writeFile(indexPath, 'import { greeting } from "broken-dependency";\nconsole.log(greeting);\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTranspile.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, undefined);

    const outputJsPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_OutputJsPath = join(projectDirectory, 'build', 'index.js');
    const outputExists: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_EmitsCompiledOutputForValidTypeScript_OutputExists = existsSync(outputJsPath);

    ok(outputExists);

    return;
  });

  it('rejects an invalid compiler option without emitting output', async () => {
    const projectDirectory: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_ProjectDirectory = join(sandboxRoot, 'invalid-compiler-option');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_TsconfigContents = JSON.stringify({
      compilerOptions: {
        module: 'invalid',
        outDir: './build',
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_IndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'export {};\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTranspile.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, 1);

    const outputJsPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_OutputJsPath = join(projectDirectory, 'build', 'index.js');
    const outputExists: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsAnInvalidCompilerOptionWithoutEmittingOutput_OutputExists = existsSync(outputJsPath);

    strictEqual(outputExists, false);

    return;
  });

  it('rejects invalid JSON', async () => {
    const projectDirectory: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsInvalidJSON_ProjectDirectory = join(sandboxRoot, 'invalid-json');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsInvalidJSON_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_RejectsInvalidJSON_TsconfigContents = '{ "compilerOptions": {';

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTranspile.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when no tsconfig.json found', async () => {
    const projectDirectory: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_ErrorsWhenNoTsconfigJsonFound_ProjectDirectory = join(sandboxRoot, 'no-tsconfig');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    CliUtilityTranspile.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('watch mode starts an incremental emitter', async () => {
    const projectDirectory: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_ProjectDirectory = join(sandboxRoot, 'watch-mode');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_TsconfigContents = JSON.stringify({
      compilerOptions: {
        strict: true,
        outDir: './build',
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_IndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'export const watched: string = "ready";\n', 'utf-8');

    process.chdir(projectDirectory);

    const errors: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_Errors = [];
    const info: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_Info = [];
    const result: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_Result = runTranspile({
      project: tsconfigPath,
      watch: true,
      printError: (message) => errors.push(message),
      printInfo: (message) => info.push(message),
    });

    ok(typeof result !== 'number', 'Expected watch mode to return an active TypeScript watcher');

    const outputJsPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_WatchModeStartsAnIncrementalEmitter_OutputJsPath = join(projectDirectory, 'build', 'index.js');

    strictEqual(existsSync(outputJsPath), true);
    strictEqual(errors.length, 0);
    ok(info.some((message) => message === 'No type errors found.'), 'Expected the initial watched emit to report a clean compilation');

    result.close();

    return;
  });

  return;
});
