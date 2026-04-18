import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { CliGenerateGithubIssueTemplate } from '../../../../cli/generate/github/issue-template.js';

import type {
  TestsCliGenerateGithubIssueTemplateRunOriginalCwd,
  TestsCliGenerateGithubIssueTemplateRunProjectDirectory,
  TestsCliGenerateGithubIssueTemplateRunSandboxRoot,
  TestsCliGenerateGithubIssueTemplateRunTemporaryDirectory,
  TestsCliGenerateGithubIssueTemplateRunTemporaryPrefix,
} from '../../../../types/tests/cli/generate/github/issue-template.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Issue Template - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateGithubIssueTemplate.run', async () => {
  const originalCwd: TestsCliGenerateGithubIssueTemplateRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateGithubIssueTemplateRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateGithubIssueTemplateRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateGithubIssueTemplateRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliGenerateGithubIssueTemplateRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateGithubIssueTemplate.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});
