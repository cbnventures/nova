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

import { CliUtilityTypeCheck } from '../../../cli/utility/type-check.js';

import type {
  TestsCliUtilityTypeCheckRunIndexPath,
  TestsCliUtilityTypeCheckRunOriginalCwd,
  TestsCliUtilityTypeCheckRunProjectDirectory,
  TestsCliUtilityTypeCheckRunSandboxDirectory,
  TestsCliUtilityTypeCheckRunSandboxRoot,
  TestsCliUtilityTypeCheckRunTemporaryDirectory,
  TestsCliUtilityTypeCheckRunTemporaryPrefix,
  TestsCliUtilityTypeCheckRunTsconfigContents,
  TestsCliUtilityTypeCheckRunTsconfigPath,
} from '../../../types/tests/cli/utility/type-check.test.d.ts';

/**
 * Tests - CLI - Utility - Type Check - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityTypeCheck.run', async () => {
  const originalCwd: TestsCliUtilityTypeCheckRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliUtilityTypeCheckRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliUtilityTypeCheckRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxDirectory: TestsCliUtilityTypeCheckRunSandboxDirectory = await mkdtemp(temporaryPrefix);
  const sandboxRoot: TestsCliUtilityTypeCheckRunSandboxRoot = await realpath(sandboxDirectory);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('reports no errors for valid TypeScript', async () => {
    const projectDirectory: TestsCliUtilityTypeCheckRunProjectDirectory = join(sandboxRoot, 'valid-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: TestsCliUtilityTypeCheckRunTsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: TestsCliUtilityTypeCheckRunTsconfigContents = JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: TestsCliUtilityTypeCheckRunIndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'const greeting: string = "hello";\nconsole.log(greeting);\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('sets exit code for invalid TypeScript', async () => {
    const projectDirectory: TestsCliUtilityTypeCheckRunProjectDirectory = join(sandboxRoot, 'invalid-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: TestsCliUtilityTypeCheckRunTsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: TestsCliUtilityTypeCheckRunTsconfigContents = JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: TestsCliUtilityTypeCheckRunIndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'const greeting: number = "hello";\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when no tsconfig.json found', async () => {
    const projectDirectory: TestsCliUtilityTypeCheckRunProjectDirectory = join(sandboxRoot, 'no-tsconfig');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    CliUtilityTypeCheck.run({});

    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});
