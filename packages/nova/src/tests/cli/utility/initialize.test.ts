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
  TestsCliUtilityInitializeIsNonEmptyLiteralInputResult,
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

/**
 * Tests - CLI - Utility - Initialize - Is Non Empty Literal Input.
 *
 * @since 0.18.0
 */
describe('CliUtilityInitialize.isNonEmptyLiteralInput', () => {
  it('returns the error message for an empty string', () => {
    const result: TestsCliUtilityInitializeIsNonEmptyLiteralInputResult = CliUtilityInitialize.isNonEmptyLiteralInput('');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns the error message for whitespace-only input', () => {
    const result: TestsCliUtilityInitializeIsNonEmptyLiteralInputResult = CliUtilityInitialize.isNonEmptyLiteralInput('   ');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns true for a non-empty string', () => {
    const result: TestsCliUtilityInitializeIsNonEmptyLiteralInputResult = CliUtilityInitialize.isNonEmptyLiteralInput('./action.yml');

    strictEqual(result, true);

    return;
  });

  it('returns the error message for non-string input', () => {
    const result: TestsCliUtilityInitializeIsNonEmptyLiteralInputResult = CliUtilityInitialize.isNonEmptyLiteralInput(undefined);

    strictEqual(result, 'This field is required.');

    return;
  });

  return;
});
