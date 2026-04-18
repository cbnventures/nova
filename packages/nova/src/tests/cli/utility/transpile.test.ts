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

import { CliUtilityTranspile } from '../../../cli/utility/transpile.js';

import type {
  TestsCliUtilityTranspileRunIndexPath,
  TestsCliUtilityTranspileRunOriginalCwd,
  TestsCliUtilityTranspileRunOutputExists,
  TestsCliUtilityTranspileRunOutputJsPath,
  TestsCliUtilityTranspileRunProjectDirectory,
  TestsCliUtilityTranspileRunSandboxDirectory,
  TestsCliUtilityTranspileRunSandboxRoot,
  TestsCliUtilityTranspileRunTemporaryDirectory,
  TestsCliUtilityTranspileRunTemporaryPrefix,
  TestsCliUtilityTranspileRunTsconfigContents,
  TestsCliUtilityTranspileRunTsconfigPath,
} from '../../../types/tests/cli/utility/transpile.test.d.ts';

/**
 * Tests - CLI - Utility - Transpile - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityTranspile.run', async () => {
  const originalCwd: TestsCliUtilityTranspileRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliUtilityTranspileRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliUtilityTranspileRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxDirectory: TestsCliUtilityTranspileRunSandboxDirectory = await mkdtemp(temporaryPrefix);
  const sandboxRoot: TestsCliUtilityTranspileRunSandboxRoot = await realpath(sandboxDirectory);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('emits compiled output for valid TypeScript', async () => {
    const projectDirectory: TestsCliUtilityTranspileRunProjectDirectory = join(sandboxRoot, 'emit-valid-ts');

    await mkdir(projectDirectory, { recursive: true });

    const tsconfigPath: TestsCliUtilityTranspileRunTsconfigPath = join(projectDirectory, 'tsconfig.json');
    const tsconfigContents: TestsCliUtilityTranspileRunTsconfigContents = JSON.stringify({
      compilerOptions: {
        strict: true,
        outDir: './build',
      },
      include: ['*.ts'],
    }, null, 2);

    await writeFile(tsconfigPath, tsconfigContents, 'utf-8');

    const indexPath: TestsCliUtilityTranspileRunIndexPath = join(projectDirectory, 'index.ts');

    await writeFile(indexPath, 'const greeting: string = "hello";\nconsole.log(greeting);\n', 'utf-8');

    process.chdir(projectDirectory);

    CliUtilityTranspile.run({
      project: tsconfigPath,
    });

    strictEqual(process.exitCode, undefined);

    const outputJsPath: TestsCliUtilityTranspileRunOutputJsPath = join(projectDirectory, 'build', 'index.js');
    const outputExists: TestsCliUtilityTranspileRunOutputExists = existsSync(outputJsPath);

    ok(outputExists);

    return;
  });

  it('errors when no tsconfig.json found', async () => {
    const projectDirectory: TestsCliUtilityTranspileRunProjectDirectory = join(sandboxRoot, 'no-tsconfig');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    CliUtilityTranspile.run({});

    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});
