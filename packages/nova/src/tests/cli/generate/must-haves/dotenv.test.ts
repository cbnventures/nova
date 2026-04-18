import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { CliGenerateMustHavesDotenv } from '../../../../cli/generate/must-haves/dotenv.js';

import type {
  TestsCliGenerateMustHavesDotenvRunOriginalCwd,
  TestsCliGenerateMustHavesDotenvRunProjectDirectory,
  TestsCliGenerateMustHavesDotenvRunSandboxRoot,
  TestsCliGenerateMustHavesDotenvRunTemporaryDirectory,
  TestsCliGenerateMustHavesDotenvRunTemporaryPrefix,
} from '../../../../types/tests/cli/generate/must-haves/dotenv.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesDotenv.run', async () => {
  const originalCwd: TestsCliGenerateMustHavesDotenvRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateMustHavesDotenvRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateMustHavesDotenvRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateMustHavesDotenvRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliGenerateMustHavesDotenvRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesDotenv.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});
