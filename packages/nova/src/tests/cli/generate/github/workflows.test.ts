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
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { CliGenerateGithubWorkflows } from '../../../../cli/generate/github/workflows.js';
import { LIB_REGEX_PATTERN_ANSI } from '../../../../lib/regex.js';
import { pathExists } from '../../../../lib/utility.js';
import { libWorkflowTemplatesMetadata } from '../../../../lib/workflow-templates.js';

import type {
  TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesEntry,
  TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesJoined,
  TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesPublishMetadata,
  TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesSetupLines,
  TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesStripAnsiPattern,
  TestsCliGenerateGithubWorkflowsRunBackupFiles,
  TestsCliGenerateGithubWorkflowsRunContent,
  TestsCliGenerateGithubWorkflowsRunContentLines,
  TestsCliGenerateGithubWorkflowsRunCoreJobIndex,
  TestsCliGenerateGithubWorkflowsRunCoreNeedsLine,
  TestsCliGenerateGithubWorkflowsRunEntries,
  TestsCliGenerateGithubWorkflowsRunExists,
  TestsCliGenerateGithubWorkflowsRunExpectedBanner,
  TestsCliGenerateGithubWorkflowsRunGitignorePath,
  TestsCliGenerateGithubWorkflowsRunNovaConfig,
  TestsCliGenerateGithubWorkflowsRunNovaConfigPath,
  TestsCliGenerateGithubWorkflowsRunOriginalCwd,
  TestsCliGenerateGithubWorkflowsRunOrphanFiles,
  TestsCliGenerateGithubWorkflowsRunPackageJson,
  TestsCliGenerateGithubWorkflowsRunPackageJsonPath,
  TestsCliGenerateGithubWorkflowsRunPathOccurrences,
  TestsCliGenerateGithubWorkflowsRunPresetJobIndex,
  TestsCliGenerateGithubWorkflowsRunPresetNeedsLine,
  TestsCliGenerateGithubWorkflowsRunProjectDirectory,
  TestsCliGenerateGithubWorkflowsRunSandboxRoot,
  TestsCliGenerateGithubWorkflowsRunTemporaryDirectory,
  TestsCliGenerateGithubWorkflowsRunTemporaryPrefix,
  TestsCliGenerateGithubWorkflowsRunWorkflowPath,
  TestsCliGenerateGithubWorkflowsRunWorkflowsDirectory,
} from '../../../../types/tests/cli/generate/github/workflows.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateGithubWorkflows.run', async () => {
  const originalCwd: TestsCliGenerateGithubWorkflowsRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateGithubWorkflowsRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateGithubWorkflowsRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateGithubWorkflowsRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    strictEqual(process.exitCode, 1);

    process.exitCode = undefined;

    return;
  });

  it('returns early when workflows config is missing', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'no-workflows');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: { name: { slug: 'test' } },
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    // Should not have created .github/workflows directory.
    let exists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      const workflowsDirectory: TestsCliGenerateGithubWorkflowsRunWorkflowsDirectory = join(projectDirectory, '.github', 'workflows');

      await readdir(workflowsDirectory);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('generates workflow file with literal substitution', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'literal-substitution');

    await mkdir(join(projectDirectory, 'packages', 'my-package'), { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const myPackagePackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'my-package' };
    const myPackagePackageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'packages', 'my-package', 'package.json');

    await writeFile(myPackagePackageJsonPath, JSON.stringify(myPackagePackageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      workflows: [{
        template: 'publish',
        suffix: 'my-pkg',
        triggers: ['release'],
        scopes: ['./packages/my-package'],
        targets: [{
          type: 'npm', workingDir: './packages/my-package',
        }],
        settings: {
          'ROOT_WORKING_DIR': './',
        },
      }],
      workspaces: {
        './packages/my-package': {
          role: 'package', policy: 'distributable', name: 'my-package', recipes: {},
        },
      },
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-my-pkg.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    const expectedBanner: TestsCliGenerateGithubWorkflowsRunExpectedBanner = [
      '# This file is generated by @cbnventures/nova.',
      '# Do not edit manually.',
      '#',
      '# Run `nova generate github workflows` to regenerate.',
      '# See: https://nova.cbnventures.io/docs/cli/generators/github/workflows',
      '',
      '',
    ].join('\n');

    ok(content.startsWith(expectedBanner));

    // Literal vars should be replaced with raw values.
    strictEqual(content.includes('"./"'), true);

    // Secrets should remain as expressions.
    strictEqual(content.includes([
      '$',
      '{{ secrets.NPM_TOKEN }}',
    ].join('')), true);

    // Workflow ID placeholder should be fully resolved in name and run-name.
    strictEqual(content.includes('Publish (my-pkg)'), true);
    strictEqual(content.includes('[__WORKFLOW_ID__]'), false);

    return;
  });

  it('generates workflow file with secret remapping', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'secret-remap');

    await mkdir(join(projectDirectory, 'packages', 'core'), { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const corePackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'core' };
    const corePackageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'packages', 'core', 'package.json');

    await writeFile(corePackageJsonPath, JSON.stringify(corePackageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      workflows: [{
        template: 'publish',
        suffix: 'core',
        triggers: ['release'],
        scopes: ['./packages/core'],
        targets: [{
          type: 'npm', workingDir: './packages/core',
        }],
        settings: {
          'NPM_TOKEN': 'NPM_TOKEN_CORE',
          'ROOT_WORKING_DIR': './',
        },
      }],
      workspaces: {
        './packages/core': {
          role: 'package', policy: 'distributable', name: 'core', recipes: {},
        },
      },
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-core.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    // Secret should be remapped.
    strictEqual(content.includes([
      '$',
      '{{ secrets.NPM_TOKEN_CORE }}',
    ].join('')), true);
    strictEqual(content.includes([
      '$',
      '{{ secrets.NPM_TOKEN }}',
    ].join('')) === false, true);

    return;
  });

  it('skips workflow with missing required literal settings', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'missing-literals');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      workflows: [{
        template: 'publish',
        suffix: 'incomplete',
        triggers: ['release'],
        settings: {},
      }],
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    // No file should be generated.
    let exists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-incomplete.yml');

      await readFile(workflowPath, 'utf-8');
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('cleans up orphan nova-*.yml files', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'orphan-cleanup');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const workflowsDirectory: TestsCliGenerateGithubWorkflowsRunWorkflowsDirectory = join(projectDirectory, '.github', 'workflows');

    await mkdir(workflowsDirectory, { recursive: true });

    // Create an orphan file.
    await writeFile(join(workflowsDirectory, 'nova-old-workflow.yml'), 'name: old\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      workflows: [{
        template: 'lock-inactive-issues',
        suffix: 'default',
        triggers: ['schedule'],
      }],
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({ replaceFile: true });

    const entries: TestsCliGenerateGithubWorkflowsRunEntries = await readdir(workflowsDirectory);
    const orphanFiles: TestsCliGenerateGithubWorkflowsRunOrphanFiles = entries.filter((e) => e === 'nova-old-workflow.yml');

    strictEqual(orphanFiles.length, 0);

    return;
  });

  it('does not clean up .nova-backup. files', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'backup-preserved');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const workflowsDirectory: TestsCliGenerateGithubWorkflowsRunWorkflowsDirectory = join(projectDirectory, '.github', 'workflows');

    await mkdir(workflowsDirectory, { recursive: true });

    // Create a backup file that should NOT be cleaned up.
    await writeFile(join(workflowsDirectory, 'nova-old-workflow.2026-04-17_0001.nova-backup.yml'), 'name: backup\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      workflows: [{
        template: 'lock-inactive-issues',
        suffix: 'default',
        triggers: ['schedule'],
      }],
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({ replaceFile: true });

    const entries: TestsCliGenerateGithubWorkflowsRunEntries = await readdir(workflowsDirectory);
    const backupFiles: TestsCliGenerateGithubWorkflowsRunBackupFiles = entries.filter((e) => e.includes('.nova-backup.') === true);

    strictEqual(backupFiles.length, 1);

    return;
  });

  it('generates workflow with workflow-run-success trigger and depends-on', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'depends-on-test');

    await mkdir(join(projectDirectory, 'packages', 'core'), { recursive: true });
    await mkdir(join(projectDirectory, 'packages', 'utils'), { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const corePackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'core' };
    const corePackageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'packages', 'core', 'package.json');

    await writeFile(corePackageJsonPath, JSON.stringify(corePackageJson, null, 2));

    const utilsPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'utils' };
    const utilsPackageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'packages', 'utils', 'package.json');

    await writeFile(utilsPackageJsonPath, JSON.stringify(utilsPackageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      workflows: [
        {
          template: 'publish',
          suffix: 'primary',
          triggers: ['release'],
          scopes: ['./packages/core'],
          targets: [{
            type: 'npm', workingDir: './packages/core',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
          },
        },
        {
          'template': 'publish',
          'suffix': 'secondary',
          'triggers': ['workflow-run-success'],
          'depends-on': ['publish-primary'],
          'scopes': ['./packages/utils'],
          'targets': [{
            type: 'npm', workingDir: './packages/utils',
          }],
          'settings': {
            'ROOT_WORKING_DIR': './',
          },
        },
      ],
      workspaces: {
        './packages/core': {
          role: 'package', policy: 'distributable', name: 'core', recipes: {},
        },
        './packages/utils': {
          role: 'package', policy: 'distributable', name: 'utils', recipes: {},
        },
      },
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    // Primary workflow should exist.
    const primaryPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-primary.yml');
    const primaryContent: TestsCliGenerateGithubWorkflowsRunContent = await readFile(primaryPath, 'utf-8');

    strictEqual(primaryContent.includes('release:'), true);

    // Secondary workflow should exist and reference the primary.
    const secondaryPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-secondary.yml');
    const secondaryContent: TestsCliGenerateGithubWorkflowsRunContent = await readFile(secondaryPath, 'utf-8');

    strictEqual(secondaryContent.includes('workflow_run:'), true);
    strictEqual(secondaryContent.includes('Publish (primary)'), true);

    return;
  });

  it('generates workflow with multiple triggers', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'multiple-triggers');

    await mkdir(join(projectDirectory, 'apps', 'docs'), { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const docsPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'docs' };
    const docsPackageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'apps', 'docs', 'package.json');

    await writeFile(docsPackageJsonPath, JSON.stringify(docsPackageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      workflows: [
        {
          template: 'publish',
          suffix: 'primary',
          triggers: ['release'],
          scopes: ['./apps/docs'],
          targets: [{
            type: 'cloudflare-pages-docusaurus', workingDir: './apps/docs',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
            'CLOUDFLARE_PROJECT_NAME': 'my-docs',
          },
        },
        {
          'template': 'publish',
          'suffix': 'multi',
          'triggers': [
            'release',
            'workflow-run-success',
          ],
          'depends-on': ['publish-primary'],
          'scopes': ['./apps/docs'],
          'targets': [{
            type: 'cloudflare-pages-docusaurus', workingDir: './apps/docs',
          }],
          'settings': {
            'ROOT_WORKING_DIR': './',
            'CLOUDFLARE_PROJECT_NAME': 'my-docs',
          },
        },
      ],
      workspaces: {
        './apps/docs': {
          role: 'docs', policy: 'freezable', name: 'docs', recipes: {},
        },
      },
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-multi.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    // Should contain both trigger types.
    strictEqual(content.includes('release:'), true);
    strictEqual(content.includes('workflow_run:'), true);

    return;
  });

  it('rejects duplicate template-suffix combinations', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'duplicate-ids');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      workflows: [
        {
          template: 'publish',
          suffix: 'same-suffix',
          triggers: ['release'],
          settings: {
            'ROOT_WORKING_DIR': './',
          },
        },
        {
          template: 'publish',
          suffix: 'same-suffix',
          triggers: ['release'],
          settings: {
            'ROOT_WORKING_DIR': './',
          },
        },
      ],
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    strictEqual(process.exitCode, 1);

    process.exitCode = undefined;

    // No workflow files should be generated.
    let exists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      const workflowsDirectory: TestsCliGenerateGithubWorkflowsRunWorkflowsDirectory = join(projectDirectory, '.github', 'workflows');

      await readdir(workflowsDirectory);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('rejects depends-on referencing non-existent workflow', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'bad-depends-on');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = { name: 'test' };
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      workflows: [{
        'template': 'publish',
        'suffix': 'orphan',
        'triggers': ['workflow-run-success'],
        'depends-on': ['non-existent'],
        'settings': {
          'ROOT_WORKING_DIR': './',
        },
      }],
    };
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    // The workflow file should not be generated since depends-on target doesn't exist.
    let exists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-orphan.yml');

      await readFile(workflowPath, 'utf-8');
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('generates unified publish workflow with npm + github-packages targets and build artifact', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'publish-sandbox');

    await mkdir(join(projectDirectory, 'packages', 'pkg-a'), { recursive: true });
    await mkdir(join(projectDirectory, '.github', 'workflows'), { recursive: true });

    const rootPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = {
      name: 'sandbox-project',
      version: '0.0.0',
      private: true,
      workspaces: ['./packages/*'],
    };

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify(rootPackageJson, null, 2));

    const pkgJson: TestsCliGenerateGithubWorkflowsRunPackageJson = {
      name: 'pkg-a',
      version: '1.0.0',
      scripts: {
        build: 'echo build', check: 'echo check',
      },
    };

    await writeFile(join(projectDirectory, 'packages', 'pkg-a', 'package.json'), JSON.stringify(pkgJson, null, 2));

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: {
          title: 'Sandbox', slug: 'sandbox',
        },
      },
      workflows: [{
        template: 'publish',
        suffix: 'release',
        triggers: ['release'],
        scopes: ['./packages/pkg-a'],
        targets: [
          {
            type: 'npm', workingDir: './packages/pkg-a',
          },
          {
            type: 'github-packages', workingDir: './packages/pkg-a',
          },
        ],
        settings: {
          NPM_TOKEN: 'NPM_TOKEN', ROOT_WORKING_DIR: './',
        },
      }],
      workspaces: {
        './packages/pkg-a': {
          role: 'package', policy: 'distributable', name: 'pkg-a', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({
      replaceFile: true,
    });

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-release.yml');
    const exists: TestsCliGenerateGithubWorkflowsRunExists = await pathExists(workflowPath);

    strictEqual(exists, true, 'Expected nova-publish-release.yml to exist');

    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    strictEqual(content.includes('publish-npm-packages-pkg-a:'), true, 'Expected npm target job');
    strictEqual(content.includes('publish-github-packages-packages-pkg-a:'), true, 'Expected github-packages job');
    strictEqual(content.includes('needs: "build"') || content.includes('needs: build'), true, 'Expected needs: build');
    ok(content.includes('name: "build-npm-packages-pkg-a"'), 'Expected per-target npm artifact name');
    ok(content.includes('name: "build-github-packages-packages-pkg-a"'), 'Expected per-target github-packages artifact name');
    ok(content.includes('build-output') === false, 'Old shared artifact name must not appear');
    strictEqual(content.includes('packages/pkg-a/build'), true, 'Expected artifact path');
    strictEqual(content.includes('npm run check -w pkg-a'), true, 'Expected npm workspaces check command');

    return;
  });

  it('reproduces nova publish workflow from config entry', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'nova-mock');

    await mkdir(join(projectDirectory, 'packages', 'nova'), { recursive: true });
    await mkdir(join(projectDirectory, 'packages', 'docusaurus-preset-nova'), { recursive: true });
    await mkdir(join(projectDirectory, 'apps', 'docs'), { recursive: true });
    await mkdir(join(projectDirectory, '.github', 'workflows'), { recursive: true });

    const rootPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = {
      name: 'nova-project',
      version: '0.0.0',
      private: true,
      workspaces: [
        './apps/*',
        './packages/*',
      ],
      scripts: {
        build: 'turbo run build', check: 'turbo run check',
      },
    };

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify(rootPackageJson, null, 2));

    await writeFile(join(projectDirectory, 'turbo.json'), JSON.stringify({
      tasks: {
        build: {}, check: {},
      },
    }, null, 2));

    await writeFile(join(projectDirectory, 'packages', 'nova', 'package.json'), JSON.stringify({
      name: '@cbnventures/nova', version: '0.0.0',
    }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'docusaurus-preset-nova', 'package.json'), JSON.stringify({
      name: '@cbnventures/docusaurus-preset-nova', version: '0.0.0',
    }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'docs', 'package.json'), JSON.stringify({
      name: 'nova-docs', version: '0.0.0', private: true,
    }, null, 2));

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: {
          title: 'Nova', slug: 'nova',
        },
      },
      workflows: [{
        template: 'publish',
        suffix: 'release',
        triggers: ['release'],
        scopes: [
          './packages/nova',
          './packages/docusaurus-preset-nova',
          './apps/docs',
        ],
        targets: [
          {
            type: 'npm', workingDir: './packages/nova',
          },
          {
            type: 'npm', workingDir: './packages/docusaurus-preset-nova',
          },
          {
            type: 'github-packages', workingDir: './packages/nova',
          },
          {
            type: 'github-packages', workingDir: './packages/docusaurus-preset-nova',
          },
          {
            type: 'cloudflare-pages-docusaurus', workingDir: './apps/docs',
          },
        ],
        settings: {
          NPM_TOKEN: 'NPM_TOKEN',
          CLOUDFLARE_API_TOKEN: 'CLOUDFLARE_API_TOKEN',
          CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
          CLOUDFLARE_PROJECT_NAME: 'CLOUDFLARE_PROJECT_NAME',
          ROOT_WORKING_DIR: './',
        },
      }],
      workspaces: {
        './packages/nova': {
          role: 'package', policy: 'distributable', name: '@cbnventures/nova', recipes: {},
        },
        './packages/docusaurus-preset-nova': {
          role: 'package', policy: 'distributable', name: '@cbnventures/docusaurus-preset-nova', recipes: {},
        },
        './apps/docs': {
          role: 'docs', policy: 'freezable', name: 'nova-docs', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({
      replaceFile: true,
    });

    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(join(projectDirectory, '.github', 'workflows', 'nova-publish-release.yml'), 'utf-8');

    strictEqual(content.includes('build:'), true, 'build job missing');
    strictEqual(content.includes('npx turbo run check --filter=@cbnventures/nova --filter=@cbnventures/docusaurus-preset-nova --filter=nova-docs --concurrency=2'), true, 'turbo check command missing');
    strictEqual(content.includes('npx turbo run build --filter=@cbnventures/nova --filter=@cbnventures/docusaurus-preset-nova --filter=nova-docs --concurrency=2'), true, 'turbo build command missing');

    strictEqual(content.includes('publish-npm-packages-nova:'), true);
    strictEqual(content.includes('publish-npm-packages-docusaurus-preset-nova:'), true);
    strictEqual(content.includes('publish-github-packages-packages-nova:'), true);
    strictEqual(content.includes('publish-github-packages-packages-docusaurus-preset-nova:'), true);
    strictEqual(content.includes('publish-cloudflare-pages-docusaurus-apps-docs:'), true);

    strictEqual(content.includes('packages/nova/build'), true);
    strictEqual(content.includes('packages/docusaurus-preset-nova/build'), true);
    strictEqual(content.includes('apps/docs/build'), true);

    strictEqual(content.includes('npm publish --provenance --access public'), true);

    return;
  });

  it('serializes dependent publish targets via needs', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'needs-mock');

    await mkdir(join(projectDirectory, 'packages', 'core'), { recursive: true });
    await mkdir(join(projectDirectory, 'packages', 'preset'), { recursive: true });
    await mkdir(join(projectDirectory, '.github', 'workflows'), { recursive: true });

    const rootPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = {
      name: 'needs-project',
      version: '0.0.0',
      private: true,
      workspaces: ['./packages/*'],
      scripts: {
        build: 'turbo run build', check: 'turbo run check',
      },
    };

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify(rootPackageJson, null, 2));

    await writeFile(join(projectDirectory, 'turbo.json'), JSON.stringify({
      tasks: {
        build: {}, check: {},
      },
    }, null, 2));

    await writeFile(join(projectDirectory, 'packages', 'core', 'package.json'), JSON.stringify({
      name: '@scope/core', version: '0.0.0',
    }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'preset', 'package.json'), JSON.stringify({
      name: '@scope/preset', version: '0.0.0',
    }, null, 2));

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: {
          title: 'Needs', slug: 'needs',
        },
      },
      workflows: [{
        template: 'publish',
        suffix: 'release',
        triggers: ['release'],
        scopes: [
          './packages/core',
          './packages/preset',
        ],
        targets: [
          {
            type: 'npm', workingDir: './packages/core',
          },
          {
            type: 'npm', workingDir: './packages/preset', needs: ['./packages/core'],
          },
        ],
        settings: {
          NPM_TOKEN: 'NPM_TOKEN', ROOT_WORKING_DIR: './',
        },
      }],
      workspaces: {
        './packages/core': {
          role: 'package', policy: 'distributable', name: '@scope/core', recipes: {},
        },
        './packages/preset': {
          role: 'package', policy: 'distributable', name: '@scope/preset', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({
      replaceFile: true,
    });

    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(join(projectDirectory, '.github', 'workflows', 'nova-publish-release.yml'), 'utf-8');

    strictEqual(content.includes('publish-npm-packages-core:'), true, 'core job missing');
    strictEqual(content.includes('publish-npm-packages-preset:'), true, 'preset job missing');

    const lines: TestsCliGenerateGithubWorkflowsRunContentLines = content.split('\n');
    const coreJobIndex: TestsCliGenerateGithubWorkflowsRunCoreJobIndex = lines.findIndex((line) => line.includes('publish-npm-packages-core:'));
    const coreNeedsLine: TestsCliGenerateGithubWorkflowsRunCoreNeedsLine = (coreJobIndex >= 0 && coreJobIndex + 1 < lines.length) ? lines[coreJobIndex + 1] as TestsCliGenerateGithubWorkflowsRunCoreNeedsLine : '';

    strictEqual(coreNeedsLine.trim(), 'needs: "build"', 'core needs should be plain build');

    const presetJobIndex: TestsCliGenerateGithubWorkflowsRunPresetJobIndex = lines.findIndex((line) => line.includes('publish-npm-packages-preset:'));
    const presetNeedsLine: TestsCliGenerateGithubWorkflowsRunPresetNeedsLine = (presetJobIndex >= 0 && presetJobIndex + 1 < lines.length) ? lines[presetJobIndex + 1] as TestsCliGenerateGithubWorkflowsRunPresetNeedsLine : '';

    strictEqual(presetNeedsLine.trim(), 'needs: ["build", "publish-npm-packages-core"]', 'preset needs should include core job id');

    return;
  });

  it('generates download-artifact step with workspace build path for docusaurus deploy targets', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'download-artifact-path');

    await mkdir(join(projectDirectory, 'apps', 'docs'), { recursive: true });
    await mkdir(join(projectDirectory, '.github', 'workflows'), { recursive: true });

    const rootPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = {
      name: 'sandbox-project',
      version: '0.0.0',
      private: true,
      workspaces: ['./apps/*'],
    };

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify(rootPackageJson, null, 2));

    const docsPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = {
      name: 'sandbox-docs',
      version: '1.0.0',
      scripts: {
        build: 'echo build', check: 'echo check',
      },
    };

    await writeFile(join(projectDirectory, 'apps', 'docs', 'package.json'), JSON.stringify(docsPackageJson, null, 2));

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: {
          title: 'Sandbox', slug: 'sandbox',
        },
      },
      workflows: [{
        template: 'publish',
        suffix: 'release',
        triggers: ['release'],
        scopes: ['./apps/docs'],
        targets: [
          {
            type: 'cloudflare-pages-docusaurus', workingDir: './apps/docs',
          },
          {
            type: 'github-pages-docusaurus', workingDir: './apps/docs',
          },
        ],
        settings: {
          CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
          CLOUDFLARE_API_TOKEN: 'CLOUDFLARE_API_TOKEN',
          CLOUDFLARE_PROJECT_NAME: 'CLOUDFLARE_PROJECT_NAME',
          ROOT_WORKING_DIR: './',
        },
      }],
      workspaces: {
        './apps/docs': {
          role: 'docs', policy: 'freezable', name: 'sandbox-docs', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({
      replaceFile: true,
    });

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-release.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');
    const pathOccurrences: TestsCliGenerateGithubWorkflowsRunPathOccurrences = content.split('path: "./apps/docs/build"').length - 1;

    // 3 expected: cloudflare-pages download (1) + github-pages-docusaurus download (1)
    // + github-pages upload-pages-artifact step path (1). The build job upload now
    // emits path without leading "./" so it does not contribute to this count.
    strictEqual(pathOccurrences, 3, 'Expected cloudflare download + github-pages download + github-pages upload to carry path: "./apps/docs/build"');

    return;
  });

  it('buildEntrySetupLines includes target-level secrets and variables for publish template', () => {
    const entry: TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesEntry = {
      template: 'publish',
      suffix: 'project',
      triggers: ['release'],
      scopes: [
        './packages/pkg-a',
        './apps/docs',
      ],
      targets: [
        {
          type: 'npm', workingDir: './packages/pkg-a',
        },
        {
          type: 'cloudflare-pages-docusaurus', workingDir: './apps/docs',
        },
      ],
      settings: {
        CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
        CLOUDFLARE_API_TOKEN: 'CLOUDFLARE_API_TOKEN',
        CLOUDFLARE_PROJECT_NAME: 'CLOUDFLARE_PROJECT_NAME',
        NPM_TOKEN: 'NPM_TOKEN',
        ROOT_WORKING_DIR: './',
      },
    };
    const publishMetadata: TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesPublishMetadata = libWorkflowTemplatesMetadata.find((candidate) => candidate['name'] === 'publish');

    strictEqual(publishMetadata !== undefined, true, 'publish metadata entry must exist');

    const setupLines: TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesSetupLines = CliGenerateGithubWorkflows.buildEntrySetupLines(entry, publishMetadata, 'nova-publish-project.yml');
    const stripAnsiPattern: TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesStripAnsiPattern = new RegExp(LIB_REGEX_PATTERN_ANSI, 'g');
    const joined: TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesJoined = setupLines.join('\n').replace(stripAnsiPattern, '');

    strictEqual(joined.includes('Secret NPM_TOKEN'), true, 'Expected NPM_TOKEN secret in setup lines');
    strictEqual(joined.includes('Secret CLOUDFLARE_API_TOKEN'), true, 'Expected CLOUDFLARE_API_TOKEN secret in setup lines');
    strictEqual(joined.includes('Variable CLOUDFLARE_ACCOUNT_ID'), true, 'Expected CLOUDFLARE_ACCOUNT_ID variable in setup lines');
    strictEqual(joined.includes('Variable CLOUDFLARE_PROJECT_NAME'), true, 'Expected CLOUDFLARE_PROJECT_NAME variable in setup lines');

    return;
  });

  it('generates per-target upload steps and per-target download names for a multi-target publish workflow', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'multi-target-per-target-artifacts');

    await mkdir(join(projectDirectory, 'packages', 'lib'), { recursive: true });
    await mkdir(join(projectDirectory, 'apps', 'docs'), { recursive: true });
    await mkdir(join(projectDirectory, '.github', 'workflows'), { recursive: true });

    const rootPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = {
      name: 'multi-target-test',
      version: '0.0.0',
      private: true,
      workspaces: [
        './packages/*',
        './apps/*',
      ],
    };

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify(rootPackageJson, null, 2));

    const libPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = {
      name: 'multi-target-test-lib', version: '0.0.0',
    };

    await writeFile(join(projectDirectory, 'packages', 'lib', 'package.json'), JSON.stringify(libPackageJson, null, 2));

    const docsPackageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = {
      name: 'multi-target-docs', version: '0.0.0', private: true,
    };

    await writeFile(join(projectDirectory, 'apps', 'docs', 'package.json'), JSON.stringify(docsPackageJson, null, 2));

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: {
          title: 'Multi Target', slug: 'multi-target',
        },
      },
      workflows: [{
        template: 'publish',
        suffix: 'project',
        triggers: ['release'],
        scopes: [
          './packages/lib',
          './apps/docs',
        ],
        targets: [
          {
            type: 'npm', workingDir: './packages/lib',
          },
          {
            type: 'cloudflare-pages-docusaurus', workingDir: './apps/docs',
          },
        ],
        settings: {
          NPM_TOKEN: 'NPM_TOKEN',
          CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
          CLOUDFLARE_API_TOKEN: 'CLOUDFLARE_API_TOKEN',
          CLOUDFLARE_PROJECT_NAME: 'CLOUDFLARE_PROJECT_NAME',
          ROOT_WORKING_DIR: './',
        },
      }],
      workspaces: {
        './packages/lib': {
          role: 'package', policy: 'distributable', name: 'multi-target-test-lib', recipes: {},
        },
        './apps/docs': {
          role: 'docs', policy: 'freezable', name: 'multi-target-docs', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({
      replaceFile: true,
    });

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-project.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    // Build job: TWO upload steps with disambiguated names + per-target artifact names.
    ok(content.includes('Upload build artifacts (npm/packages-lib)'), 'Expected npm upload step name');
    ok(content.includes('Upload build artifacts (cloudflare-pages-docusaurus/apps-docs)'), 'Expected cloudflare upload step name');
    ok(content.includes('name: "build-npm-packages-lib"'), 'Expected npm artifact name');
    ok(content.includes('name: "build-cloudflare-pages-docusaurus-apps-docs"'), 'Expected cloudflare artifact name');

    // Publish jobs: each downloads its own artifact by name and uses the right download path.
    ok(content.includes('path: "./packages/lib/build"'), 'npm publish job has working-dir path');
    ok(content.includes('path: "./apps/docs/build"'), 'cloudflare job extracts to deploy dir');

    // Old shared artifact name must not appear anywhere.
    ok(content.includes('"build-output"') === false, 'Old shared artifact name must be gone');

    return;
  });

  return;
});
