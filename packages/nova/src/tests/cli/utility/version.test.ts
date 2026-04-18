import { strictEqual } from 'node:assert/strict';
import {
  mkdtemp,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { CliUtilityVersion } from '../../../cli/utility/version.js';

import type {
  TestsCliUtilityVersionRunOriginalCwd,
  TestsCliUtilityVersionRunSandboxRoot,
  TestsCliUtilityVersionRunTemporaryDirectory,
  TestsCliUtilityVersionRunTemporaryPrefix,
} from '../../../types/tests/cli/utility/version.test.d.ts';

/**
 * Tests - CLI - Utility - Version - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityVersion.run', async () => {
  const originalCwd: TestsCliUtilityVersionRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliUtilityVersionRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliUtilityVersionRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliUtilityVersionRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('runs with --node flag without error', async () => {
    await CliUtilityVersion.run({
      node: true,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('runs with --all flag without error', async () => {
    await CliUtilityVersion.run({
      all: true,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('runs with empty options without error', async () => {
    await CliUtilityVersion.run({});

    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});
