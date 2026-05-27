import { strictEqual } from 'node:assert/strict';
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

import { Runner as CliUtilityTypeCheck } from '../../../cli/utility/type-check.js';

import type {
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_IndexPath,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_OriginalCwd,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ProjectDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SandboxDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_SandboxRoot,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TemporaryDirectory,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TemporaryPrefix,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TsconfigContents,
  Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TsconfigPath,
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

  it('reports no errors for valid TypeScript', async () => {
    const projectDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ProjectDirectory = join(sandboxRoot, 'valid-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TsconfigContents = JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_IndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'const greeting: string = "hello";\nconsole.log(greeting);\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('sets exit code for invalid TypeScript', async () => {
    const projectDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ProjectDirectory = join(sandboxRoot, 'invalid-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_TsconfigContents = JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_IndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'const greeting: number = "hello";\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when no tsconfig.json found', async () => {
    const projectDirectory: Tests_Cli_Utility_TypeCheck_CliUtilityTypeCheckRun_ProjectDirectory = join(sandboxRoot, 'no-tsconfig');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({});

    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});
