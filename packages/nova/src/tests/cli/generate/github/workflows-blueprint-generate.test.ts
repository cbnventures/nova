import { ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  afterAll,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as WorkflowsBlueprint } from '../../../../cli/generate/github/workflows-blueprint.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_NovaConfig,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_ProjectDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_PublishContent,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_PublishPath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_StdoutChunks,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_StdoutSpy,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_StdoutText,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_DollarBrace,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_NovaConfig,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_ProjectDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_PublishContent,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_PublishPath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_Entries,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_ExistingPath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_NovaConfig,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_PreviousExitCode,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_ProjectDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_StderrSpy,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_OriginalCwd,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_Entries,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_NovaConfig,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_ObservedExitCode,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_PreviousExitCode,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_ProjectDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_StderrChunks,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_StderrSpy,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_StderrText,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_NovaConfig,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_ObservedExitCode,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_PreviousExitCode,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_ProjectDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_StderrChunks,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_StderrSpy,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_StderrText,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_NovaConfig,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_ObservedExitCode,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_PreviousExitCode,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_ProjectDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_StderrChunks,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_StderrSpy,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_StderrText,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_BackupFiles,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_CheckContent,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_CheckFixture,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_CheckPath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_Entries,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_LockContent,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_LockFixture,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_LockPath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_NovaConfig,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_ProjectDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_PublishContent,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_PublishContentSecondRun,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_PublishFixture,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_PublishPath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_CheckContent,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_CheckPath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_NovaConfig,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_ObservedExitCode,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_PreviousExitCode,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_ProjectDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_StderrChunks,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_StderrSpy,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_StderrText,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_SandboxRoot,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_TemporaryDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_TemporaryPrefix,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_Entries,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_NovaConfig,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_ProjectDirectory,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_StdoutChunks,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_StdoutSpy,
  Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_StdoutText,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint-generate.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Generate - Generate.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.generate', async () => {
  const originalCwd: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('reproduces all three portfolio workflows byte-for-byte and skips on a second run', async () => {
    const projectDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_ProjectDirectory = join(sandboxRoot, 'portfolio-mock');

    await mkdir(join(projectDirectory, 'apps', 'cbnventures'), { recursive: true });
    await mkdir(join(projectDirectory, 'apps', 'mrjackyliang'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({
      name: 'portfolio-project',
      version: '0.0.0',
      private: true,
    }, null, 2));

    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    // The real portfolio is a turbo monorepo, so the sandbox carries a
    // turbo.json for the generator's turbo detection to find.
    await writeFile(join(projectDirectory, 'turbo.json'), '{}\n', 'utf-8');

    const novaConfig: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_NovaConfig = {
      project: {
        name: {
          title: 'Portfolio',
          slug: 'portfolio',
        },
      },
      workflows: [
        {
          template: 'check-sponsor-gated-issues',
          name: 'project',
          triggers: [
            'issue-comment',
            'issues',
          ],
          with: {
            IS_ORGANIZATION: 'IS_ORGANIZATION',
            ISSUE_LABELS: 'ISSUE_LABELS',
            ISSUE_LIMIT_COMMENTER: 'ISSUE_LIMIT_COMMENTER',
            ISSUE_LOCK_ON_CLOSE: 'ISSUE_LOCK_ON_CLOSE',
            ISSUE_MESSAGE_NOT_SPONSOR: 'ISSUE_MESSAGE_NOT_SPONSOR',
            ISSUE_MESSAGE_WELCOME: 'ISSUE_MESSAGE_WELCOME',
            PERSONAL_ACCESS_TOKEN: 'PERSONAL_ACCESS_TOKEN',
            SPONSOR_ACTIVE_ONLY: 'SPONSOR_ACTIVE_ONLY',
            SPONSOR_EXEMPT_FILE_LOCATION: 'SPONSOR_EXEMPT_FILE_LOCATION',
            SPONSOR_MINIMUM: 'SPONSOR_MINIMUM',
          },
        },
        {
          template: 'lock-inactive-issues',
          name: 'project',
          triggers: ['schedule-weekly'],
        },
        {
          template: 'publish',
          name: 'sites',
          triggers: ['release'],
          build: [
            './apps/cbnventures',
            './apps/mrjackyliang',
          ],
          deploy: [
            {
              to: 'cloudflare-workers',
              path: './apps/cbnventures',
            },
            {
              to: 'cloudflare-workers',
              path: './apps/mrjackyliang',
            },
          ],
          with: {
            CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
          },
        },
      ],
      environment: {
        workspaces: {
          './apps/cbnventures': {
            prefix: 'CBN_',
            variables: [
              {
                key: 'PUBLIC_GOOGLE_TAG_MANAGER_ID',
                secret: false,
                reach: 'build',
              },
              {
                key: 'PUBLIC_TURNSTILE_SITE_KEY',
                secret: false,
                reach: 'build',
              },
              {
                key: 'PUBLIC_STRIPE_PUBLISHABLE_KEY',
                secret: false,
                reach: 'build',
              },
              {
                key: 'TURNSTILE_SECRET_KEY',
                secret: true,
                reach: 'runtime',
              },
              {
                key: 'STRIPE_SECRET_KEY',
                secret: true,
                reach: 'runtime',
              },
              {
                key: 'STRIPE_WEBHOOK_SECRET',
                secret: true,
                reach: 'runtime',
              },
              {
                key: 'AMAZON_ACCESS_KEY_ID',
                secret: true,
                reach: 'runtime',
              },
              {
                key: 'AMAZON_ACCESS_KEY_SECRET',
                secret: true,
                reach: 'runtime',
              },
              {
                key: 'AMAZON_REGION',
                secret: true,
                reach: 'runtime',
              },
            ],
          },
          './apps/mrjackyliang': {
            prefix: 'MJL_',
            variables: [
              {
                key: 'PUBLIC_GOOGLE_TAG_MANAGER_ID',
                secret: false,
                reach: 'build',
              },
              {
                key: 'PUBLIC_TURNSTILE_SITE_KEY',
                secret: false,
                reach: 'build',
              },
              {
                key: 'TURNSTILE_SECRET_KEY',
                secret: true,
                reach: 'runtime',
              },
              {
                key: 'AMAZON_ACCESS_KEY_ID',
                secret: true,
                reach: 'runtime',
              },
              {
                key: 'AMAZON_ACCESS_KEY_SECRET',
                secret: true,
                reach: 'runtime',
              },
              {
                key: 'AMAZON_REGION',
                secret: true,
                reach: 'runtime',
              },
            ],
          },
        },
      },
      workspaces: {
        './': {
          role: 'project',
          policy: 'freezable',
          name: 'portfolio-project',
        },
        './apps/cbnventures': {
          role: 'app',
          policy: 'trackable',
          name: 'portfolio-app-cbnventures',
        },
        './apps/mrjackyliang': {
          role: 'app',
          policy: 'trackable',
          name: 'portfolio-app-mrjackyliang',
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await WorkflowsBlueprint.generate({});

    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');

    // Check Sponsor Gated Issues.
    const checkPath: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_CheckPath = join(projectDirectory, '.github', 'workflows', 'nova-check-sponsor-gated-issues-project.yml');
    const checkContent: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_CheckContent = await readFile(checkPath, 'utf-8');
    const checkFixture: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_CheckFixture = await readFile(join(fixturesDir, 'nova-check-sponsor-gated-issues-project.yml'), 'utf-8');

    strictEqual(checkContent, checkFixture, 'check-sponsor-gated-issues differs from committed fixture');

    // Lock Inactive Issues.
    const lockPath: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_LockPath = join(projectDirectory, '.github', 'workflows', 'nova-lock-inactive-issues-project.yml');
    const lockContent: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_LockContent = await readFile(lockPath, 'utf-8');
    const lockFixture: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_LockFixture = await readFile(join(fixturesDir, 'nova-lock-inactive-issues-project.yml'), 'utf-8');

    strictEqual(lockContent, lockFixture, 'lock-inactive-issues differs from committed fixture');

    // Publish (sites).
    const publishPath: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_PublishPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-sites.yml');
    const publishContent: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_PublishContent = await readFile(publishPath, 'utf-8');
    const publishFixture: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_PublishFixture = await readFile(join(fixturesDir, 'nova-publish-sites.yml'), 'utf-8');

    strictEqual(publishContent, publishFixture, 'publish-sites differs from committed fixture');

    // Second run over an up-to-date repo makes no changes: the output stays
    // byte-identical and no backup files are created (skip path).
    await WorkflowsBlueprint.generate({});

    const publishContentSecondRun: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_PublishContentSecondRun = await readFile(publishPath, 'utf-8');

    strictEqual(publishContentSecondRun, publishContent, 'second run rewrote the publish workflow');

    const entries: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_Entries = await readdir(join(projectDirectory, '.github', 'workflows'));
    const backupFiles: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReproducesAllThreePortfolioWorkflowsByteForByteAndSkipsOnASecondRun_BackupFiles = entries.filter((name) => name.includes('.nova-backup.') === true);

    strictEqual(backupFiles.length, 0, 'second run created a backup file');

    ok(entries.length === 3, 'unexpected files in workflows directory');

    return;
  });

  it('writes the expected files and prints setup lines for a valid nova-shaped config', async () => {
    const projectDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_ProjectDirectory = join(sandboxRoot, 'valid-mock');

    await mkdir(join(projectDirectory, 'apps', 'cbnventures'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({
      name: 'valid-project',
      version: '0.0.0',
      private: true,
    }, null, 2));

    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_NovaConfig = {
      project: {
        name: {
          title: 'Valid',
          slug: 'valid',
        },
      },
      workflows: [
        {
          template: 'check-sponsor-gated-issues',
          name: 'project',
          triggers: [
            'issue-comment',
            'issues',
          ],
        },
        {
          template: 'publish',
          name: 'sites',
          triggers: ['release'],
          build: ['./apps/cbnventures'],
          deploy: [{
            to: 'cloudflare-workers',
            path: './apps/cbnventures',
          }],
          with: {},
        },
      ],
      workspaces: {
        './': {
          role: 'project',
          policy: 'freezable',
          name: 'valid-project',
        },
        './apps/cbnventures': {
          role: 'app',
          policy: 'trackable',
          name: 'valid-app-cbnventures',
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    const stdoutChunks: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_StdoutChunks = [];
    const stdoutSpy: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_StdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      stdoutChunks.push(String(chunk));

      return true;
    });

    await WorkflowsBlueprint.generate({});

    stdoutSpy.mockRestore();

    const entries: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_Entries = await readdir(join(projectDirectory, '.github', 'workflows'));

    ok(entries.includes('nova-check-sponsor-gated-issues-project.yml') === true, 'missing check workflow');

    ok(entries.includes('nova-publish-sites.yml') === true, 'missing publish workflow');

    const stdoutText: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_WritesTheExpectedFilesAndPrintsSetupLinesForAValidNovaShapedConfig_StdoutText = stdoutChunks.join('');

    ok(stdoutText.includes('Setup:') === true, 'missing Setup report');

    ok(stdoutText.includes('Secret CLOUDFLARE_API_TOKEN') === true, 'missing cloudflare secret setup line');

    ok(stdoutText.includes('Variable CLOUDFLARE_ACCOUNT_ID') === true, 'missing cloudflare variable setup line');

    ok(stdoutText.includes('Secret PERSONAL_ACCESS_TOKEN') === true, 'missing check-sponsor secret setup line');

    return;
  });

  it('reports a diagnostic and skips the file for an unknown template', async () => {
    const projectDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_ProjectDirectory = join(sandboxRoot, 'unknown-template-mock');

    await mkdir(projectDirectory, { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({
      name: 'unknown-template-project',
      version: '0.0.0',
      private: true,
    }, null, 2));

    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_NovaConfig = {
      project: {
        name: {
          title: 'Unknown Template',
          slug: 'unknown-template',
        },
      },
      workflows: [{
        template: 'not-a-real-template',
        name: 'project',
        triggers: ['issues'],
      }],
      workspaces: {
        './': {
          role: 'project',
          policy: 'freezable',
          name: 'unknown-template-project',
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    const previousExitCode: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_PreviousExitCode = process.exitCode;

    process.exitCode = undefined;

    const stderrChunks: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_StderrChunks = [];
    const stderrSpy: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_StderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      stderrChunks.push(String(chunk));

      return true;
    });

    await WorkflowsBlueprint.generate({});

    stderrSpy.mockRestore();

    const observedExitCode: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_ObservedExitCode = process.exitCode;

    process.exitCode = previousExitCode;

    strictEqual(observedExitCode, 1, 'expected non-zero exit for unknown template');

    const stderrText: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_StderrText = stderrChunks.join('');

    ok(stderrText.includes('Unknown template "not-a-real-template"') === true, 'missing unknown-template diagnostic');

    const entries: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticAndSkipsTheFileForAnUnknownTemplate_Entries = await readdir(join(projectDirectory, '.github', 'workflows')).catch(() => []);

    ok(entries.includes('nova-not-a-real-template-project.yml') === false, 'unknown template file was written');

    return;
  });

  it('keeps an existing workflow file when the config has a diagnostic', async () => {
    const projectDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_ProjectDirectory = join(sandboxRoot, 'diagnostic-orphan-mock');

    await mkdir(join(projectDirectory, '.github', 'workflows'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({
      name: 'diagnostic-orphan-project',
      version: '0.0.0',
      private: true,
    }, null, 2));

    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    // A pre-existing deployed workflow the generator must not delete when a
    // sibling workflow is rejected during validation.
    const existingPath: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_ExistingPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-project.yml');

    await writeFile(existingPath, 'name: "Existing"\n', 'utf-8');

    const novaConfig: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_NovaConfig = {
      project: {
        name: {
          title: 'Diagnostic Orphan',
          slug: 'diagnostic-orphan',
        },
      },
      workflows: [{
        template: 'not-a-real-template',
        name: 'project',
        triggers: ['issues'],
      }],
      workspaces: {
        './': {
          role: 'project',
          policy: 'freezable',
          name: 'diagnostic-orphan-project',
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    const previousExitCode: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_PreviousExitCode = process.exitCode;

    process.exitCode = undefined;

    const stderrSpy: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_StderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    await WorkflowsBlueprint.generate({});

    stderrSpy.mockRestore();

    process.exitCode = previousExitCode;

    const entries: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_KeepsAnExistingWorkflowFileWhenTheConfigHasADiagnostic_Entries = await readdir(join(projectDirectory, '.github', 'workflows')).catch(() => []);

    ok(entries.includes('nova-publish-project.yml') === true, 'existing workflow file was orphaned despite a diagnostic');

    ok(entries.some((entry) => entry.includes('.nova-backup.') === true) === false, 'existing workflow file was backed up despite a diagnostic');

    return;
  });

  it('reports a diagnostic for a workflow missing a suffix', async () => {
    const projectDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_ProjectDirectory = join(sandboxRoot, 'missing-suffix-mock');

    await mkdir(projectDirectory, { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({
      name: 'missing-suffix-project',
      version: '0.0.0',
      private: true,
    }, null, 2));

    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_NovaConfig = {
      project: {
        name: {
          title: 'Missing Suffix',
          slug: 'missing-suffix',
        },
      },
      workflows: [{
        template: 'lock-inactive-issues',
        triggers: ['schedule-weekly'],
      }],
      workspaces: {
        './': {
          role: 'project',
          policy: 'freezable',
          name: 'missing-suffix-project',
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    const previousExitCode: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_PreviousExitCode = process.exitCode;

    process.exitCode = undefined;

    const stderrChunks: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_StderrChunks = [];
    const stderrSpy: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_StderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      stderrChunks.push(String(chunk));

      return true;
    });

    await WorkflowsBlueprint.generate({});

    stderrSpy.mockRestore();

    const observedExitCode: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_ObservedExitCode = process.exitCode;

    process.exitCode = previousExitCode;

    strictEqual(observedExitCode, 1, 'expected non-zero exit for missing suffix');

    const stderrText: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAWorkflowMissingASuffix_StderrText = stderrChunks.join('');

    ok(stderrText.includes('missing a non-empty "name"') === true, 'missing name diagnostic not reported');

    return;
  });

  it('reports a diagnostic for an unregistered scope', async () => {
    const projectDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_ProjectDirectory = join(sandboxRoot, 'unregistered-scope-mock');

    await mkdir(join(projectDirectory, 'apps', 'cbnventures'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({
      name: 'unregistered-scope-project',
      version: '0.0.0',
      private: true,
    }, null, 2));

    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_NovaConfig = {
      project: {
        name: {
          title: 'Unregistered Scope',
          slug: 'unregistered-scope',
        },
      },
      workflows: [{
        template: 'publish',
        name: 'sites',
        triggers: ['release'],
        build: ['./apps/not-registered'],
        deploy: [{
          to: 'cloudflare-workers',
          path: './apps/cbnventures',
        }],
        with: {},
      }],
      workspaces: {
        './': {
          role: 'project',
          policy: 'freezable',
          name: 'unregistered-scope-project',
        },
        './apps/cbnventures': {
          role: 'app',
          policy: 'trackable',
          name: 'unregistered-scope-app-cbnventures',
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    const previousExitCode: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_PreviousExitCode = process.exitCode;

    process.exitCode = undefined;

    const stderrChunks: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_StderrChunks = [];
    const stderrSpy: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_StderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      stderrChunks.push(String(chunk));

      return true;
    });

    await WorkflowsBlueprint.generate({});

    stderrSpy.mockRestore();

    const observedExitCode: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_ObservedExitCode = process.exitCode;

    process.exitCode = previousExitCode;

    strictEqual(observedExitCode, 1, 'expected non-zero exit for unregistered scope');

    const stderrText: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ReportsADiagnosticForAnUnregisteredScope_StderrText = stderrChunks.join('');

    ok(stderrText.includes('Scope "./apps/not-registered" is not a registered workspace') === true, 'missing unregistered-scope diagnostic');

    return;
  });

  it('bakes public dotenv variables and lists them in the setup report', async () => {
    const projectDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_ProjectDirectory = join(sandboxRoot, 'public-dotenv-mock');

    await mkdir(join(projectDirectory, 'apps', 'cbnventures'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({
      name: 'public-dotenv-project',
      version: '0.0.0',
      private: true,
    }, null, 2));

    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_NovaConfig = {
      project: {
        name: {
          title: 'Public Dotenv',
          slug: 'public-dotenv',
        },
      },
      workflows: [{
        template: 'publish',
        name: 'sites',
        triggers: ['release'],
        build: ['./apps/cbnventures'],
        deploy: [{
          to: 'cloudflare-workers',
          path: './apps/cbnventures',
        }],
        with: {},
      }],
      environment: {
        workspaces: {
          './apps/cbnventures': {
            prefix: 'CBN_',
            variables: [
              {
                key: 'PUBLIC_SITE_KEY',
                secret: false,
                reach: 'build',
              },
              {
                key: 'PUBLIC_GTM_ID',
                secret: false,
                reach: 'build',
              },
            ],
          },
        },
      },
      workspaces: {
        './': {
          role: 'project',
          policy: 'freezable',
          name: 'public-dotenv-project',
        },
        './apps/cbnventures': {
          role: 'app',
          policy: 'trackable',
          name: 'public-dotenv-app-cbnventures',
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    const stdoutChunks: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_StdoutChunks = [];
    const stdoutSpy: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_StdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      stdoutChunks.push(String(chunk));

      return true;
    });

    await WorkflowsBlueprint.generate({});

    stdoutSpy.mockRestore();

    const stdoutText: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_StdoutText = stdoutChunks.join('');

    // The build-only environment values list under their prefixed GitHub names.
    ok(stdoutText.includes('Variable CBN_PUBLIC_SITE_KEY') === true, 'missing build-only variable setup line');

    ok(stdoutText.includes('Variable CBN_PUBLIC_GTM_ID') === true, 'missing prefixed build-only variable setup line');

    // The private runtime value is never surfaced in the build setup report.
    ok(stdoutText.includes('PRIVATE_TOKEN') === false, 'private dotenv variable leaked into setup report');

    const publishPath: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_PublishPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-sites.yml');
    const publishContent: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_BakesPublicDotenvVariablesAndListsThemInTheSetupReport_PublishContent = await readFile(publishPath, 'utf-8');

    // The generated publish workflow bakes the public keys into the scope .env.
    ok(publishContent.includes('Write environment file') === true, 'missing write-env step in generated publish workflow');

    ok(publishContent.includes('echo "PUBLIC_SITE_KEY=$PUBLIC_SITE_KEY"') === true, 'missing public site key echo in write-env step');

    // The private key is never baked into the build's write-env step. It
    // legitimately appears in the deploy job's secret-sync step under its
    // resolved source name, so the leak check is scoped to the "Write
    // environment file" step block rather than the whole workflow.
    ok(publishContent.slice(publishContent.indexOf('Write environment file'), publishContent.indexOf('Check project')).includes('PRIVATE_TOKEN') === false, 'private dotenv key leaked into the write-env build step');

    return;
  });

  it('generates a tag-push publish workflow with a tags filtered on-block', async () => {
    const projectDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_ProjectDirectory = join(sandboxRoot, 'tag-push-mock');

    await mkdir(join(projectDirectory, 'apps', 'cbnventures'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({
      name: 'tag-push-project',
      version: '0.0.0',
      private: true,
    }, null, 2));

    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_NovaConfig = {
      project: {
        name: {
          title: 'Tag Push',
          slug: 'tag-push',
        },
      },
      workflows: [{
        template: 'publish',
        name: 'sites',
        triggers: ['tag-push'],
        build: ['./apps/cbnventures'],
        deploy: [{
          to: 'cloudflare-workers',
          path: './apps/cbnventures',
        }],
        with: {},
      }],
      workspaces: {
        './': {
          role: 'project',
          policy: 'freezable',
          name: 'tag-push-project',
        },
        './apps/cbnventures': {
          role: 'app',
          policy: 'trackable',
          name: 'tag-push-app-cbnventures',
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await WorkflowsBlueprint.generate({});

    const publishPath: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_PublishPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-sites.yml');
    const publishContent: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_PublishContent = await readFile(publishPath, 'utf-8');

    // The on-block declares the tag-filtered push event with the default glob.
    ok(publishContent.includes('  push:') === true, 'missing push event in the on-block');

    ok(publishContent.includes('    tags:') === true, 'missing tags filter in the on-block');

    ok(publishContent.includes('      - "v*"') === true, 'missing default tag glob in the on-block');

    // Assemble the expected expression with the join trick so the literal
    // "${" placeholder does not trip the template-curly lint rule.
    const dollarBrace: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_GeneratesATagPushPublishWorkflowWithATagsFilteredOnBlock_DollarBrace = [
      '$',
      '{',
    ].join('');

    ok(publishContent.includes(`PUBLISH: "${dollarBrace}{ (github.event_name == 'push' && startsWith(github.ref, 'refs/tags/')) || (github.event_name == 'workflow_dispatch' && !inputs.dry-run) }}"`) === true, 'missing tag-push PUBLISH condition');

    return;
  });

  it('resolves a workflow environment prefix onto the sponsor env block', async () => {
    const projectDirectory: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_ProjectDirectory = join(sandboxRoot, 'workflow-prefix-mock');

    await mkdir(projectDirectory, { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({
      name: 'workflow-prefix-project',
      version: '0.0.0',
      private: true,
    }, null, 2));

    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    // A correctly-migrated config where the workflow "name" matches the
    // "environment.workflows" key. The full generate path must load without a
    // parseEnvironment diagnostic and resolve the SGI_ namespace prefix onto
    // every prefixable sponsor key, guarding the real generate -> dispatch ->
    // build flow that a direct builder call would bypass.
    const novaConfig: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_NovaConfig = {
      project: {
        name: {
          title: 'Workflow Prefix',
          slug: 'workflow-prefix',
        },
      },
      workflows: [{
        template: 'check-sponsor-gated-issues',
        name: 'sponsor-check',
        triggers: [
          'issue-comment',
          'issues',
        ],
      }],
      environment: {
        workflows: {
          'sponsor-check': {
            prefix: 'SGI_',
          },
        },
      },
      workspaces: {
        './': {
          role: 'project',
          policy: 'freezable',
          name: 'workflow-prefix-project',
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    const previousExitCode: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_PreviousExitCode = process.exitCode;

    process.exitCode = undefined;

    const stderrChunks: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_StderrChunks = [];
    const stderrSpy: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_StderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      stderrChunks.push(String(chunk));

      return true;
    });

    await WorkflowsBlueprint.generate({});

    stderrSpy.mockRestore();

    const observedExitCode: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_ObservedExitCode = process.exitCode;

    process.exitCode = previousExitCode;

    // A matched workflow name loads cleanly, so the run keeps a zero exit.
    strictEqual(observedExitCode, undefined, 'workflow-prefix config raised an unexpected diagnostic');

    const stderrText: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_StderrText = stderrChunks.join('');

    ok(stderrText.includes('does not match a configured workflow') === false, 'sponsor workflow name was rejected by parseEnvironment');

    const checkPath: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_CheckPath = join(projectDirectory, '.github', 'workflows', 'nova-check-sponsor-gated-issues-sponsor-check.yml');
    const checkContent: Tests_Cli_Generate_Github_WorkflowsBlueprintGenerate_WorkflowsBlueprintGenerate_ResolvesAWorkflowEnvironmentPrefixOntoTheSponsorEnvBlock_CheckContent = await readFile(checkPath, 'utf-8');

    // Prefixable sponsor keys resolve their GitHub names under the SGI_ prefix.
    ok(checkContent.includes('vars.SGI_ISSUE_LABELS') === true, 'sponsor variable did not receive the SGI_ prefix');

    ok(checkContent.includes('secrets.SGI_PERSONAL_ACCESS_TOKEN') === true, 'sponsor secret did not receive the SGI_ prefix');

    // The automatic GITHUB_TOKEN is never prefixed.
    ok(checkContent.includes('secrets.GITHUB_TOKEN') === true, 'automatic GITHUB_TOKEN was unexpectedly prefixed');

    return;
  });

  return;
});
