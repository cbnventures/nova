import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { CliUtilityInitialize } from '../../../cli/utility/initialize.js';

import type {
  TestsCliUtilityInitializeRunOriginalCwd,
  TestsCliUtilityInitializeRunProjectDirectory,
  TestsCliUtilityInitializeRunSandboxRoot,
  TestsCliUtilityInitializeRunTemporaryDirectory,
  TestsCliUtilityInitializeRunTemporaryPrefix,
} from '../../../types/tests/cli/utility/initialize.test.d.ts';

/**
 * Tests - CLI - Utility - Initialize - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityInitialize.run', async () => {
  const originalCwd: TestsCliUtilityInitializeRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliUtilityInitializeRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliUtilityInitializeRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliUtilityInitializeRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliUtilityInitializeRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliUtilityInitialize.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});
