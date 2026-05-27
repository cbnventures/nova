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

import type {
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_IndexPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_OriginalCwd,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_OutputExists,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_OutputJsPath,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_ProjectDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_SandboxDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_SandboxRoot,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TemporaryDirectory,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TemporaryPrefix,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TsconfigContents,
  Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TsconfigPath,
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
    const projectDirectory: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_ProjectDirectory = join(sandboxRoot, 'emit-valid-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_TsconfigContents = JSON.stringify({
      compilerOptions: {
        strict: true,
        outDir: './build',
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_IndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'const greeting: string = "hello";\nconsole.log(greeting);\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTranspile.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, undefined);

    const outputJsPath: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_OutputJsPath = join(projectDirectory, 'build', 'index.js');
    const outputExists: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_OutputExists = existsSync(outputJsPath);

    ok(outputExists);

    return;
  });

  it('errors when no tsconfig.json found', async () => {
    const projectDirectory: Tests_Cli_Utility_Transpile_CliUtilityTranspileRun_ProjectDirectory = join(sandboxRoot, 'no-tsconfig');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    CliUtilityTranspile.run({});

    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});
