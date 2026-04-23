import { ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { CliGenerateGithubIssueTemplate } from '../../../../cli/generate/github/issue-template.js';
import * as utility from '../../../../lib/utility.js';

vi.mock('prompts', () => (
  {
    default: vi.fn().mockResolvedValue(
      {
        bugReportFields: [],
      },
    ),
  }
));

import type {
  TestsCliGenerateGithubIssueTemplateRunHeaderArg,
  TestsCliGenerateGithubIssueTemplateRunNovaConfig,
  TestsCliGenerateGithubIssueTemplateRunNovaConfigPath,
  TestsCliGenerateGithubIssueTemplateRunOriginalCwd,
  TestsCliGenerateGithubIssueTemplateRunPackageJson,
  TestsCliGenerateGithubIssueTemplateRunPackageJsonPath,
  TestsCliGenerateGithubIssueTemplateRunProjectDirectory,
  TestsCliGenerateGithubIssueTemplateRunSandboxRoot,
  TestsCliGenerateGithubIssueTemplateRunSaveCalls,
  TestsCliGenerateGithubIssueTemplateRunSaveSpy,
  TestsCliGenerateGithubIssueTemplateRunTargetCall,
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

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

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

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const projectDirectory: TestsCliGenerateGithubIssueTemplateRunProjectDirectory = join(sandboxRoot, 'header-metadata');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubIssueTemplateRunPackageJson = { name: 'test' };

    const packageJsonPath: TestsCliGenerateGithubIssueTemplateRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const novaConfig: TestsCliGenerateGithubIssueTemplateRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
    };

    const novaConfigPath: TestsCliGenerateGithubIssueTemplateRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    const saveSpy: TestsCliGenerateGithubIssueTemplateRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubIssueTemplate.run({ replaceFile: true });

    const calls: TestsCliGenerateGithubIssueTemplateRunSaveCalls = saveSpy['mock']['calls'];

    const targetCall: TestsCliGenerateGithubIssueTemplateRunTargetCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('ISSUE_TEMPLATE')
      && call[0].endsWith('.yml')
    ));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for an ISSUE_TEMPLATE .yml file');

    const headerArg: TestsCliGenerateGithubIssueTemplateRunHeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate github issue-template');
    strictEqual(headerArg['docsSlug'], 'cli/generators/github/issue-template');
    strictEqual(headerArg['mode'], 'strict');

    return;
  });

  return;
});
