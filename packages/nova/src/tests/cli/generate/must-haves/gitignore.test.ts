import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { CliGenerateMustHavesGitignore } from '../../../../cli/generate/must-haves/gitignore.js';

import type {
  TestsCliGenerateMustHavesGitignoreRunOriginalCwd,
  TestsCliGenerateMustHavesGitignoreRunProjectDirectory,
  TestsCliGenerateMustHavesGitignoreRunSandboxRoot,
  TestsCliGenerateMustHavesGitignoreRunTemporaryDirectory,
  TestsCliGenerateMustHavesGitignoreRunTemporaryPrefix,
} from '../../../../types/tests/cli/generate/must-haves/gitignore.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Gitignore - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesGitignore.run', async () => {
  const originalCwd: TestsCliGenerateMustHavesGitignoreRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateMustHavesGitignoreRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateMustHavesGitignoreRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateMustHavesGitignoreRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliGenerateMustHavesGitignoreRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesGitignore.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});
