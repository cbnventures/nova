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
import { test } from 'node:test';

import { CLIUtilityTranspile } from '@/cli/utility/transpile.js';

import type {
  CLIUtilityTranspileTestOriginalCwd,
  CLIUtilityTranspileTestSandboxRoot,
} from '@/types/tests/cli/utility/transpile.test.d.ts';

/**
 * CLI Utility - Transpile - Run.
 *
 * @since 1.0.0
 */
test('CLIUtilityTranspile.run', async (context) => {
  const originalCwd: CLIUtilityTranspileTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIUtilityTranspileTestSandboxRoot = await realpath(await mkdtemp(join(tmpdir(), `nova-${context.name}-`)));

  context.after(async () => {
    process.chdir(originalCwd);

    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('emits compiled output for valid TypeScript', async () => {
    const projectDir = join(sandboxRoot, 'emit-valid-ts');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          outDir: './build',
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

    CLIUtilityTranspile.run({
      project: join(projectDir, 'tsconfig.json'),
    });

    strictEqual(process.exitCode, undefined);
    ok(existsSync(join(projectDir, 'build', 'index.js')));
  });

  await context.test('sets exit code for project type errors', async () => {
    const projectDir = join(sandboxRoot, 'emit-invalid-ts');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          outDir: './build',
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

    CLIUtilityTranspile.run({
      project: join(projectDir, 'tsconfig.json'),
    });

    strictEqual(process.exitCode, 1);
  });

  await context.test('errors when no tsconfig.json found', async () => {
    const projectDir = join(sandboxRoot, 'no-tsconfig');

    await mkdir(projectDir, { recursive: true });

    process.chdir(projectDir);

    process.exitCode = undefined;

    CLIUtilityTranspile.run({});

    strictEqual(process.exitCode, undefined);
  });
});
