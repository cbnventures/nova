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

import { Runner as CliUtilityTypeCheck } from '../../../cli/utility/type-check.js';

import type {
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_DelegatesTheRepositoryBootstrapToTheSharedChecker_BootstrapScriptContents,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_DelegatesTheRepositoryBootstrapToTheSharedChecker_BootstrapScriptPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ErrorsWhenNoTsconfigJsonFound_ProjectDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_OriginalCwd,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsAnInvalidCompilerOption_IndexPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsAnInvalidCompilerOption_ProjectDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsAnInvalidCompilerOption_TsconfigContents,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsAnInvalidCompilerOption_TsconfigPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsInvalidJSON_ProjectDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsInvalidJSON_TsconfigContents,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsInvalidJSON_TsconfigPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ReportsNoErrorsForValidTypeScript_IndexPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ReportsNoErrorsForValidTypeScript_ProjectDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ReportsNoErrorsForValidTypeScript_TsconfigContents,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ReportsNoErrorsForValidTypeScript_TsconfigPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SandboxDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SandboxRoot,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SetsExitCodeForInvalidTypeScript_IndexPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SetsExitCodeForInvalidTypeScript_ProjectDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SetsExitCodeForInvalidTypeScript_TsconfigContents,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SetsExitCodeForInvalidTypeScript_TsconfigPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SupportsIncrementalProjectConfigurations_IndexPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SupportsIncrementalProjectConfigurations_ProjectDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SupportsIncrementalProjectConfigurations_TsconfigContents,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SupportsIncrementalProjectConfigurations_TsconfigPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TemporaryDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TemporaryPrefix,
} from '../../../types/tests/cli/utility/type-check.test.d.ts';

/**
 * Tests - CLI - Utility - Type Check - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityTypeCheck.run', async () => {
  const originalCwd: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SandboxDirectory = await mkdtemp(temporaryPrefix);
  const sandboxRoot: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SandboxRoot = await realpath(sandboxDirectory);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('delegates the repository bootstrap to the shared checker', async () => {
    const bootstrapScriptPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_DelegatesTheRepositoryBootstrapToTheSharedChecker_BootstrapScriptPath = join(originalCwd, '..', '..', 'scripts', 'nova-type-check.mjs');
    const bootstrapScriptContents: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_DelegatesTheRepositoryBootstrapToTheSharedChecker_BootstrapScriptContents = await readFile(bootstrapScriptPath, 'utf-8');

    strictEqual(bootstrapScriptContents.includes('../packages/nova/src/lib/type-check.ts'), true);
    strictEqual(bootstrapScriptContents.includes('from \'typescript\''), false);
    strictEqual(bootstrapScriptContents.includes('fsCache: false'), true);

    return;
  });

  it('reports no errors for valid TypeScript', async () => {
    const projectDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ReportsNoErrorsForValidTypeScript_ProjectDirectory = join(sandboxRoot, 'valid-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ReportsNoErrorsForValidTypeScript_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ReportsNoErrorsForValidTypeScript_TsconfigContents = JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ReportsNoErrorsForValidTypeScript_IndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'const greeting: string = "hello";\nconsole.log(greeting);\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('rejects an invalid compiler option', async () => {
    const projectDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsAnInvalidCompilerOption_ProjectDirectory = join(sandboxRoot, 'invalid-compiler-option');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsAnInvalidCompilerOption_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsAnInvalidCompilerOption_TsconfigContents = JSON.stringify({
      compilerOptions: {
        module: 'invalid',
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsAnInvalidCompilerOption_IndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'export {};\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('rejects invalid JSON', async () => {
    const projectDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsInvalidJSON_ProjectDirectory = join(sandboxRoot, 'invalid-json');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsInvalidJSON_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_RejectsInvalidJSON_TsconfigContents = '{ "compilerOptions": {';

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('sets exit code for invalid TypeScript', async () => {
    const projectDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SetsExitCodeForInvalidTypeScript_ProjectDirectory = join(sandboxRoot, 'invalid-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SetsExitCodeForInvalidTypeScript_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SetsExitCodeForInvalidTypeScript_TsconfigContents = JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SetsExitCodeForInvalidTypeScript_IndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'const greeting: number = "hello";\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when no tsconfig.json found', async () => {
    const projectDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ErrorsWhenNoTsconfigJsonFound_ProjectDirectory = join(sandboxRoot, 'no-tsconfig');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('supports incremental project configurations', async () => {
    const projectDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SupportsIncrementalProjectConfigurations_ProjectDirectory = join(sandboxRoot, 'incremental-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SupportsIncrementalProjectConfigurations_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SupportsIncrementalProjectConfigurations_TsconfigContents = JSON.stringify({
      compilerOptions: {
        incremental: true,
        noEmit: true,
        strict: true,
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SupportsIncrementalProjectConfigurations_IndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'export const greeting: string = "hello";\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});
