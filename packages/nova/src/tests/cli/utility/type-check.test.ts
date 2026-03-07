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
import { test } from 'node:test';

import { CLIUtilityTypeCheck } from '@/cli/utility/type-check.js';

import type {
  CLIUtilityTypeCheckTestOriginalCwd,
  CLIUtilityTypeCheckTestSandboxRoot,
} from '@/types/tests/cli/utility/type-check.test.d.ts';

/**
 * CLI Utility - Type Check - Run.
 *
 * @since 1.0.0
 */
test('CLIUtilityTypeCheck.run', async (context) => {
  const originalCwd: CLIUtilityTypeCheckTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIUtilityTypeCheckTestSandboxRoot = await realpath(await mkdtemp(join(tmpdir(), `nova-${context.name}-`)));

  context.after(async () => {
    process.chdir(originalCwd);

    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('reports no errors for valid TypeScript', async () => {
    const projectDir = join(sandboxRoot, 'valid-ts');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          noEmit: true,
        },
        include: ['*.ts'],
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'index.ts'),
      'const greeting: string = "hello";\nconsole.log(greeting);\n',
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    CLIUtilityTypeCheck.run({
      project: join(projectDir, 'tsconfig.json'),
    });

    strictEqual(process.exitCode, undefined);
  });

  await context.test('sets exit code for invalid TypeScript', async () => {
    const projectDir = join(sandboxRoot, 'invalid-ts');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          noEmit: true,
        },
        include: ['*.ts'],
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'index.ts'),
      'const greeting: number = "hello";\n',
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    CLIUtilityTypeCheck.run({
      project: join(projectDir, 'tsconfig.json'),
    });

    strictEqual(process.exitCode, 1);
  });

  await context.test('errors when no tsconfig.json found', async () => {
    const projectDir = join(sandboxRoot, 'no-tsconfig');

    await mkdir(projectDir, { recursive: true });

    process.chdir(projectDir);

    process.exitCode = undefined;

    CLIUtilityTypeCheck.run({});

    strictEqual(process.exitCode, undefined);
  });
});
