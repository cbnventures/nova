import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { CLIUtilityInitialize } from '@/cli/utility/initialize.js';

import type {
  CLIUtilityInitializeTestOriginalCwd,
  CLIUtilityInitializeTestSandboxRoot,
} from '@/types/tests/cli/utility/initialize.test.d.ts';

/**
 * CLI Utility - Initialize - Run.
 *
 * @since 1.0.0
 */
test('CLIUtilityInitialize.run', async (context) => {
  const originalCwd: CLIUtilityInitializeTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIUtilityInitializeTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('sets exit code when not at project root', async () => {
    const projectDir = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDir, { recursive: true });

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityInitialize.run({});

    strictEqual(process.exitCode, 1);
  });
});
