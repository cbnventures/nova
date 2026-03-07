import { strictEqual } from 'node:assert/strict';
import {
  mkdtemp,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { CLIUtilityVersion } from '@/cli/utility/version.js';

import type {
  CLIUtilityVersionTestOriginalCwd,
  CLIUtilityVersionTestSandboxRoot,
} from '@/types/tests/cli/utility/version.test.d.ts';

/**
 * CLI Utility - Version - Run.
 *
 * @since 1.0.0
 */
test('CLIUtilityVersion.run', async (context) => {
  const originalCwd: CLIUtilityVersionTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIUtilityVersionTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('runs with --node flag without error', async () => {
    process.exitCode = undefined;

    await CLIUtilityVersion.run({
      node: true,
    });

    strictEqual(process.exitCode, undefined);
  });

  await context.test('runs with --all flag without error', async () => {
    process.exitCode = undefined;

    await CLIUtilityVersion.run({
      all: true,
    });

    strictEqual(process.exitCode, undefined);
  });

  await context.test('runs with empty options without error', async () => {
    process.exitCode = undefined;

    await CLIUtilityVersion.run({});

    strictEqual(process.exitCode, undefined);
  });
});
