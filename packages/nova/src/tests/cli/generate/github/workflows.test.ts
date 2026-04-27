import { ok, strictEqual } from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
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

import { CliGenerateGithubWorkflows } from '../../../../cli/generate/github/workflows.js';
import { LibNovaConfig } from '../../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_ANSI,
  LIB_REGEX_PATTERN_WORKFLOW_ON_BLOCK,
  LIB_REGEX_PATTERN_WORKFLOW_PLACEHOLDER,
} from '../../../../lib/regex.js';
import * as utility from '../../../../lib/utility.js';
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
  TestsCliGenerateGithubWorkflowsRunGitignorePath,
  TestsCliGenerateGithubWorkflowsRunHeaderArg,
  TestsCliGenerateGithubWorkflowsRunIsProjectRootSpy,
  TestsCliGenerateGithubWorkflowsRunLoadSpy,
  TestsCliGenerateGithubWorkflowsRunNovaConfig,
  TestsCliGenerateGithubWorkflowsRunNovaConfigPath,
  TestsCliGenerateGithubWorkflowsRunOnMatches,
  TestsCliGenerateGithubWorkflowsRunOriginalCwd,
  TestsCliGenerateGithubWorkflowsRunOrphanFiles,
  TestsCliGenerateGithubWorkflowsRunPackageJson,
  TestsCliGenerateGithubWorkflowsRunPackageJsonPath,
  TestsCliGenerateGithubWorkflowsRunPathOccurrences,
  TestsCliGenerateGithubWorkflowsRunPlaceholderPattern,
  TestsCliGenerateGithubWorkflowsRunPresetJobIndex,
  TestsCliGenerateGithubWorkflowsRunPresetNeedsLine,
  TestsCliGenerateGithubWorkflowsRunProjectDirectory,
  TestsCliGenerateGithubWorkflowsRunSandboxRoot,
  TestsCliGenerateGithubWorkflowsRunSaveCalls,
  TestsCliGenerateGithubWorkflowsRunSaveSpy,
  TestsCliGenerateGithubWorkflowsRunTargetCall,
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
            'CLOUDFLARE_PROJECT_NAME': 'my-docs-primary',
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
            'CLOUDFLARE_PROJECT_NAME': 'my-docs-multi',
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

  it('passes the correct header metadata to saveGeneratedFile for each generated workflow', async () => {
    const isProjectRootSpy: TestsCliGenerateGithubWorkflowsRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: TestsCliGenerateGithubWorkflowsRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      workflows: [{
        template: 'publish',
        suffix: 'my-pkg',
        triggers: ['release'],
        scopes: ['./packages/my-package'],
        targets: [{
          type: 'npm', workingDir: './packages/my-package',
        }],
        settings: {
          ROOT_WORKING_DIR: './',
        },
      }],
      workspaces: {
        './packages/my-package': {
          role: 'package', policy: 'distributable', name: 'my-package', recipes: {},
        },
      },
    });
    const saveSpy: TestsCliGenerateGithubWorkflowsRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubWorkflows.run({ replaceFile: true });

    const calls: TestsCliGenerateGithubWorkflowsRunSaveCalls = saveSpy['mock']['calls'];

    const targetCall: TestsCliGenerateGithubWorkflowsRunTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('.yml'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for a .yml workflow file');

    const headerArg: TestsCliGenerateGithubWorkflowsRunHeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate github workflows');
    strictEqual(headerArg['docsSlug'], 'cli/generators/github/workflows');
    strictEqual(headerArg['mode'], 'strict');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('skips workflow when a target-level literal is missing from settings', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-action-missing-literal');

    await mkdir(join(projectDirectory, 'packages', 'my-action'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'my-action', 'package.json'), JSON.stringify({
      name: 'my-action', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: { name: { slug: 'test' } },
      workflows: [{
        template: 'publish',
        suffix: 'my-action',
        triggers: ['release'],
        targets: [{
          type: 'github-action', workingDir: './packages/my-action',
        }],
        settings: {
          'ACTION_ENTRY_POINT': 'index.js',
          'ACTION_OUTPUT_PATH': './packages/my-action/build',

          // ACTION_YML_PATH intentionally missing.
          'RELEASE_BRANCH_NAME': 'releases',
          'ROOT_WORKING_DIR': './',
        },
      }],
      workspaces: {
        './packages/my-action': {
          role: 'app', policy: 'trackable', name: 'test-app-my-action', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-my-action.yml');

    let workflowExists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      await access(workflowPath);
    } catch {
      workflowExists = false;
    }

    strictEqual(workflowExists, false, 'Workflow should NOT be generated when a target-level literal is missing from settings.');

    return;
  });

  it('generates workflow file for github-action target with user-supplied literals', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-action-minimal');

    await mkdir(join(projectDirectory, 'packages', 'my-action'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'my-action', 'package.json'), JSON.stringify({
      name: 'test-app-my-action', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [{
        template: 'publish',
        suffix: 'my-action',
        triggers: ['release'],
        targets: [{
          type: 'github-action', workingDir: './packages/my-action',
        }],
        settings: {
          'ACTION_ENTRY_POINT': 'index.js',
          'ACTION_OUTPUT_PATH': './packages/my-action/build',
          'ACTION_YML_PATH': './action.yml',
          'RELEASE_BRANCH_NAME': 'releases',
          'ROOT_WORKING_DIR': './',
        },
      }],
      workspaces: {
        './packages/my-action': {
          role: 'app', policy: 'trackable', name: 'test-app-my-action', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-my-action.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    // Job header correctly slugified.
    strictEqual(content.includes('publish-github-action-packages-my-action:'), true);

    // Permissions set as expected.
    strictEqual(content.includes('contents: "write"'), true);
    strictEqual(content.includes('id-token: "write"'), true);
    strictEqual(content.includes('attestations: "write"'), true);

    // Literal values substituted from settings.
    strictEqual(content.includes('./action.yml'), true);
    strictEqual(content.includes('./packages/my-action/build'), true);
    strictEqual(content.includes('"releases"'), true);

    // Orphan-branch bootstrap: both branches of the conditional are present in the emitted shell.
    strictEqual(content.includes('git init -b'), true);
    strictEqual(content.includes('git ls-remote --exit-code --heads origin'), true);
    strictEqual(content.includes('git fetch origin'), true);
    strictEqual(content.includes('git reset --hard'), true);
    strictEqual(content.includes('git push origin "releases" --force'), true);

    // Force-retag semver + floating major.
    strictEqual(content.includes('git tag -f "$TAG_NAME"'), true);
    strictEqual(content.includes('git push origin "refs/tags/$TAG_NAME" --force'), true);
    strictEqual(content.includes('git tag -f "$MAJOR"'), true);
    strictEqual(content.includes('git push origin "refs/tags/$MAJOR" --force'), true);

    // Prefix-aware floating-major derivation (matches plain `v1.2.3` and prefixed `primary-v1.2.3`).
    strictEqual(content.includes('sed -E \'s/^(([a-zA-Z][a-zA-Z0-9_-]*-)?v[0-9]+).*/\\1/\''), true);

    // SLSA attestation on the built artifact.
    strictEqual(content.includes('actions/attest-build-provenance@v2'), true);
    strictEqual(content.includes('subject-path: "./packages/my-action/build/index.js"'), true);

    // Optional files loop present.
    strictEqual(content.includes('for optional in README.md LICENSE SECURITY.md NOTICE CHANGELOG.md'), true);

    // All placeholders and vars references are resolved.
    strictEqual(content.includes('[__TARGET_ID__]'), false);
    strictEqual(content.includes('[__NEEDS__]'), false);
    strictEqual(content.includes('[__ARTIFACT_NAME__]'), false);
    strictEqual(content.includes([
      '$',
      '{{ vars.ACTION_YML_PATH }}',
    ].join('')), false);
    strictEqual(content.includes([
      '$',
      '{{ vars.ACTION_OUTPUT_PATH }}',
    ].join('')), false);
    strictEqual(content.includes([
      '$',
      '{{ vars.ACTION_ENTRY_POINT }}',
    ].join('')), false);
    strictEqual(content.includes([
      '$',
      '{{ vars.RELEASE_BRANCH_NAME }}',
    ].join('')), false);

    // Sweeping check: no [__...]  placeholder may leak into generated YAML.
    const placeholderPattern: TestsCliGenerateGithubWorkflowsRunPlaceholderPattern = LIB_REGEX_PATTERN_WORKFLOW_PLACEHOLDER;

    strictEqual(placeholderPattern.test(content), false, 'Generated YAML should have no unsubstituted [__...] placeholders');

    return;
  });

  it('generates workflow file for github-action target with non-default overrides', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-action-overrides');

    await mkdir(join(projectDirectory, 'packages', 'my-action'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'my-action', 'package.json'), JSON.stringify({
      name: 'test-app-my-action', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [{
        template: 'publish',
        suffix: 'my-action',
        triggers: ['release'],
        targets: [{
          type: 'github-action', workingDir: './packages/my-action',
        }],
        settings: {
          'ACTION_ENTRY_POINT': 'main.js',
          'ACTION_OUTPUT_PATH': './dist/bundle',
          'ACTION_YML_PATH': './nonstandard.action.yml',
          'RELEASE_BRANCH_NAME': 'custom-releases',
          'ROOT_WORKING_DIR': './',
        },
      }],
      workspaces: {
        './packages/my-action': {
          role: 'app', policy: 'trackable', name: 'test-app-my-action', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-my-action.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    // Non-default literal values flow through every reference site.
    strictEqual(content.includes('./nonstandard.action.yml'), true);
    strictEqual(content.includes('./dist/bundle'), true);
    strictEqual(content.includes('"custom-releases"'), true);
    strictEqual(content.includes('subject-path: "./dist/bundle/main.js"'), true);

    // The defaults from Task 4's test are NOT present — user overrides fully replaced them.
    strictEqual(content.includes('"./action.yml"'), false);
    strictEqual(content.includes('"releases"'), false);
    strictEqual(content.includes('./packages/my-action/build'), false);
    strictEqual(content.includes('/index.js'), false);

    return;
  });

  it('generates workflow with github-action and github-pages-docusaurus coexisting', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-action-coexist');

    await mkdir(join(projectDirectory, 'apps', 'docs'), { recursive: true });
    await mkdir(join(projectDirectory, 'packages', 'my-action'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'docs', 'package.json'), JSON.stringify({
      name: 'test-docs', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'my-action', 'package.json'), JSON.stringify({
      name: 'test-app-my-action', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [{
        template: 'publish',
        suffix: 'release',
        triggers: ['release'],
        targets: [
          {
            type: 'github-action', workingDir: './packages/my-action',
          },
          {
            type: 'github-pages-docusaurus', workingDir: './apps/docs',
          },
        ],
        settings: {
          'ACTION_ENTRY_POINT': 'index.js',
          'ACTION_OUTPUT_PATH': './packages/my-action/build',
          'ACTION_YML_PATH': './action.yml',
          'RELEASE_BRANCH_NAME': 'releases',
          'ROOT_WORKING_DIR': './',
        },
      }],
      workspaces: {
        './apps/docs': {
          role: 'docs', policy: 'trackable', name: 'test-docs', recipes: {},
        },
        './packages/my-action': {
          role: 'app', policy: 'trackable', name: 'test-app-my-action', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-release.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    // Both target jobs emit, each with correctly-slugified working dir in the job name.
    strictEqual(content.includes('publish-github-action-packages-my-action:'), true);
    strictEqual(content.includes('publish-github-pages-docusaurus-apps-docs:'), true);

    // Both targets depend on the shared build job (accept either string or array form).
    strictEqual(
      content.includes('needs: "build"') || content.includes('needs: ["build"]'),
      true,
    );

    // Base workflow has exactly one top-level "on:" block shared across both targets.
    const onMatches: TestsCliGenerateGithubWorkflowsRunOnMatches = content.match(new RegExp(LIB_REGEX_PATTERN_WORKFLOW_ON_BLOCK, 'gm'));

    strictEqual((onMatches ?? []).length, 1);

    return;
  });

  it('rejects workflow when two github-action targets collide on the same RELEASE_BRANCH_NAME', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-action-collision');

    await mkdir(join(projectDirectory, 'packages', 'action-alpha'), { recursive: true });
    await mkdir(join(projectDirectory, 'packages', 'action-beta'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'action-alpha', 'package.json'), JSON.stringify({
      name: 'test-app-action-alpha', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'action-beta', 'package.json'), JSON.stringify({
      name: 'test-app-action-beta', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [{
        template: 'publish',
        suffix: 'release',
        triggers: ['release'],
        targets: [
          {
            type: 'github-action', workingDir: './packages/action-alpha',
          },
          {
            type: 'github-action', workingDir: './packages/action-beta',
          },
        ],
        settings: {
          'ACTION_ENTRY_POINT': 'index.js',
          'ACTION_OUTPUT_PATH': './packages/action-alpha/build',
          'ACTION_YML_PATH': './action.yml',
          'RELEASE_BRANCH_NAME': 'releases',
          'ROOT_WORKING_DIR': './',
        },
      }],
      workspaces: {
        './packages/action-alpha': {
          role: 'app', policy: 'trackable', name: 'test-app-action-alpha', recipes: {},
        },
        './packages/action-beta': {
          role: 'app', policy: 'trackable', name: 'test-app-action-beta', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-release.yml');

    let workflowExists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      await access(workflowPath);
    } catch {
      workflowExists = false;
    }

    strictEqual(workflowExists, false, 'Workflow should NOT be generated when two github-action targets share the same RELEASE_BRANCH_NAME.');

    return;
  });

  it('generates workflows for two github-action targets with distinct RELEASE_BRANCH_NAME values', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-action-distinct-keys');

    await mkdir(join(projectDirectory, 'packages', 'action-alpha'), { recursive: true });
    await mkdir(join(projectDirectory, 'packages', 'action-beta'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'action-alpha', 'package.json'), JSON.stringify({
      name: 'test-app-action-alpha', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'action-beta', 'package.json'), JSON.stringify({
      name: 'test-app-action-beta', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [
        {
          template: 'publish',
          suffix: 'alpha',
          triggers: ['release'],
          targets: [{
            type: 'github-action', workingDir: './packages/action-alpha',
          }],
          settings: {
            'ACTION_ENTRY_POINT': 'index.js',
            'ACTION_OUTPUT_PATH': './packages/action-alpha/build',
            'ACTION_YML_PATH': './packages/action-alpha/action.yml',
            'RELEASE_BRANCH_NAME': 'releases-alpha',
            'ROOT_WORKING_DIR': './',
          },
        },
        {
          template: 'publish',
          suffix: 'beta',
          triggers: ['release'],
          targets: [{
            type: 'github-action', workingDir: './packages/action-beta',
          }],
          settings: {
            'ACTION_ENTRY_POINT': 'index.js',
            'ACTION_OUTPUT_PATH': './packages/action-beta/build',
            'ACTION_YML_PATH': './packages/action-beta/action.yml',
            'RELEASE_BRANCH_NAME': 'releases-beta',
            'ROOT_WORKING_DIR': './',
          },
        },
      ],
      workspaces: {
        './packages/action-alpha': {
          role: 'app', policy: 'trackable', name: 'test-app-action-alpha', recipes: {},
        },
        './packages/action-beta': {
          role: 'app', policy: 'trackable', name: 'test-app-action-beta', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const alphaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-alpha.yml');
    const betaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-beta.yml');
    const alphaContent: TestsCliGenerateGithubWorkflowsRunContent = await readFile(alphaWorkflowPath, 'utf-8');
    const betaContent: TestsCliGenerateGithubWorkflowsRunContent = await readFile(betaWorkflowPath, 'utf-8');

    // Both workflow files exist.
    strictEqual(alphaContent.includes('publish-github-action-packages-action-alpha:'), true);
    strictEqual(betaContent.includes('publish-github-action-packages-action-beta:'), true);

    // Each workflow uses its own distinct RELEASE_BRANCH_NAME.
    strictEqual(alphaContent.includes('"releases-alpha"'), true);
    strictEqual(betaContent.includes('"releases-beta"'), true);

    return;
  });

  it('supports multi-action repos via prefixed tags (primary-v1, secondary-v1)', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-action-multi-prefixed-tags');

    await mkdir(join(projectDirectory, 'packages', 'primary-action'), { recursive: true });
    await mkdir(join(projectDirectory, 'packages', 'secondary-action'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'primary-action', 'package.json'), JSON.stringify({
      name: 'test-app-primary-action', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'secondary-action', 'package.json'), JSON.stringify({
      name: 'test-app-secondary-action', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [
        {
          template: 'publish',
          suffix: 'primary',
          triggers: ['release'],
          targets: [{
            type: 'github-action', workingDir: './packages/primary-action',
          }],
          settings: {
            'ACTION_ENTRY_POINT': 'index.js',
            'ACTION_OUTPUT_PATH': './packages/primary-action/build',
            'ACTION_YML_PATH': './packages/primary-action/action.yml',
            'RELEASE_BRANCH_NAME': 'releases-primary',
            'ROOT_WORKING_DIR': './',
          },
        },
        {
          template: 'publish',
          suffix: 'secondary',
          triggers: ['release'],
          targets: [{
            type: 'github-action', workingDir: './packages/secondary-action',
          }],
          settings: {
            'ACTION_ENTRY_POINT': 'index.js',
            'ACTION_OUTPUT_PATH': './packages/secondary-action/build',
            'ACTION_YML_PATH': './packages/secondary-action/action.yml',
            'RELEASE_BRANCH_NAME': 'releases-secondary',
            'ROOT_WORKING_DIR': './',
          },
        },
      ],
      workspaces: {
        './packages/primary-action': {
          role: 'app', policy: 'trackable', name: 'test-app-primary-action', recipes: {},
        },
        './packages/secondary-action': {
          role: 'app', policy: 'trackable', name: 'test-app-secondary-action', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const primaryWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-primary.yml');
    const secondaryWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-secondary.yml');

    // Both workflow files exist.
    let primaryExists: TestsCliGenerateGithubWorkflowsRunExists = true;
    let secondaryExists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      await access(primaryWorkflowPath);
    } catch {
      primaryExists = false;
    }

    try {
      await access(secondaryWorkflowPath);
    } catch {
      secondaryExists = false;
    }

    strictEqual(primaryExists, true, 'Primary workflow should be generated.');
    strictEqual(secondaryExists, true, 'Secondary workflow should be generated.');

    const primaryContent: TestsCliGenerateGithubWorkflowsRunContent = await readFile(primaryWorkflowPath, 'utf-8');
    const secondaryContent: TestsCliGenerateGithubWorkflowsRunContent = await readFile(secondaryWorkflowPath, 'utf-8');

    // Both emitted YAMLs use the prefix-aware floating-major regex so consumers
    // ship `primary-v1.2.3 -> primary-v1` and `secondary-v1.0.0 -> secondary-v1`.
    strictEqual(primaryContent.includes('sed -E \'s/^(([a-zA-Z][a-zA-Z0-9_-]*-)?v[0-9]+).*/\\1/\''), true);
    strictEqual(secondaryContent.includes('sed -E \'s/^(([a-zA-Z][a-zA-Z0-9_-]*-)?v[0-9]+).*/\\1/\''), true);

    // Each workflow's release-push step references its own RELEASE_BRANCH_NAME.
    strictEqual(primaryContent.includes('git push origin "releases-primary" --force'), true);
    strictEqual(secondaryContent.includes('git push origin "releases-secondary" --force'), true);

    return;
  });

  it('skips workflow when two github-pages-docusaurus targets coexist (singleton)', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-pages-docusaurus-singleton');

    await mkdir(join(projectDirectory, 'apps', 'docs-1'), { recursive: true });
    await mkdir(join(projectDirectory, 'apps', 'docs-2'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'docs-1', 'package.json'), JSON.stringify({
      name: 'test-app-docs-1', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'docs-2', 'package.json'), JSON.stringify({
      name: 'test-app-docs-2', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [{
        template: 'publish',
        suffix: 'release',
        triggers: ['release'],
        targets: [
          {
            type: 'github-pages-docusaurus', workingDir: './apps/docs-1',
          },
          {
            type: 'github-pages-docusaurus', workingDir: './apps/docs-2',
          },
        ],
        settings: {
          'ROOT_WORKING_DIR': './',
        },
      }],
      workspaces: {
        './apps/docs-1': {
          role: 'app', policy: 'trackable', name: 'test-app-docs-1', recipes: {},
        },
        './apps/docs-2': {
          role: 'app', policy: 'trackable', name: 'test-app-docs-2', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-release.yml');

    let workflowExists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      await access(workflowPath);
    } catch {
      workflowExists = false;
    }

    strictEqual(workflowExists, false, 'Workflow should NOT be generated when two github-pages-docusaurus targets coexist (singleton constraint).');

    return;
  });

  it('rejects workflows when two github-action targets across separate workflows collide on the same RELEASE_BRANCH_NAME', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-action-cross-workflow-collision');

    await mkdir(join(projectDirectory, 'packages', 'action-alpha'), { recursive: true });
    await mkdir(join(projectDirectory, 'packages', 'action-beta'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'action-alpha', 'package.json'), JSON.stringify({
      name: 'test-app-action-alpha', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'packages', 'action-beta', 'package.json'), JSON.stringify({
      name: 'test-app-action-beta', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [
        {
          template: 'publish',
          suffix: 'alpha',
          triggers: ['release'],
          targets: [{
            type: 'github-action', workingDir: './packages/action-alpha',
          }],
          settings: {
            'ACTION_ENTRY_POINT': 'index.js',
            'ACTION_OUTPUT_PATH': './packages/action-alpha/build',
            'ACTION_YML_PATH': './packages/action-alpha/action.yml',
            'RELEASE_BRANCH_NAME': 'releases',
            'ROOT_WORKING_DIR': './',
          },
        },
        {
          template: 'publish',
          suffix: 'beta',
          triggers: ['release'],
          targets: [{
            type: 'github-action', workingDir: './packages/action-beta',
          }],
          settings: {
            'ACTION_ENTRY_POINT': 'index.js',
            'ACTION_OUTPUT_PATH': './packages/action-beta/build',
            'ACTION_YML_PATH': './packages/action-beta/action.yml',
            'RELEASE_BRANCH_NAME': 'releases',
            'ROOT_WORKING_DIR': './',
          },
        },
      ],
      workspaces: {
        './packages/action-alpha': {
          role: 'app', policy: 'trackable', name: 'test-app-action-alpha', recipes: {},
        },
        './packages/action-beta': {
          role: 'app', policy: 'trackable', name: 'test-app-action-beta', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const alphaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-alpha.yml');
    const betaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-beta.yml');

    let alphaExists: TestsCliGenerateGithubWorkflowsRunExists = true;
    let betaExists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      await access(alphaWorkflowPath);
    } catch {
      alphaExists = false;
    }

    try {
      await access(betaWorkflowPath);
    } catch {
      betaExists = false;
    }

    // Cross-workflow validation rejects both colliding workflows so neither
    // emits a partial output for a destination nova cannot disambiguate.
    strictEqual(alphaExists, false, 'Alpha workflow should NOT be generated when two github-action targets across workflows share the same RELEASE_BRANCH_NAME.');
    strictEqual(betaExists, false, 'Beta workflow should NOT be generated when two github-action targets across workflows share the same RELEASE_BRANCH_NAME.');

    return;
  });

  it('rejects workflows when two github-pages-docusaurus targets are declared across separate workflows (singleton)', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'github-pages-docusaurus-cross-workflow-singleton');

    await mkdir(join(projectDirectory, 'apps', 'docs-1'), { recursive: true });
    await mkdir(join(projectDirectory, 'apps', 'docs-2'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'docs-1', 'package.json'), JSON.stringify({
      name: 'test-app-docs-1', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'docs-2', 'package.json'), JSON.stringify({
      name: 'test-app-docs-2', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [
        {
          template: 'publish',
          suffix: 'docs-1',
          triggers: ['release'],
          targets: [{
            type: 'github-pages-docusaurus', workingDir: './apps/docs-1',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
          },
        },
        {
          template: 'publish',
          suffix: 'docs-2',
          triggers: ['release'],
          targets: [{
            type: 'github-pages-docusaurus', workingDir: './apps/docs-2',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
          },
        },
      ],
      workspaces: {
        './apps/docs-1': {
          role: 'app', policy: 'trackable', name: 'test-app-docs-1', recipes: {},
        },
        './apps/docs-2': {
          role: 'app', policy: 'trackable', name: 'test-app-docs-2', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const docs1WorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-docs-1.yml');
    const docs2WorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-docs-2.yml');

    let docs1Exists: TestsCliGenerateGithubWorkflowsRunExists = true;
    let docs2Exists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      await access(docs1WorkflowPath);
    } catch {
      docs1Exists = false;
    }

    try {
      await access(docs2WorkflowPath);
    } catch {
      docs2Exists = false;
    }

    // GitHub Pages is repo-scoped — only one github-pages-docusaurus target
    // may be declared across the entire config. Both workflows are rejected
    // when the singleton constraint is violated.
    strictEqual(docs1Exists, false, 'docs-1 workflow should NOT be generated when two github-pages-docusaurus targets are declared across workflows (singleton).');
    strictEqual(docs2Exists, false, 'docs-2 workflow should NOT be generated when two github-pages-docusaurus targets are declared across workflows (singleton).');

    return;
  });

  it('rejects workflows when two aws-amplify-nextjs targets across separate workflows share the same AMPLIFY_APP_ID and AMPLIFY_BRANCH_NAME', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'aws-amplify-nextjs-cross-workflow-collision');

    await mkdir(join(projectDirectory, 'apps', 'app-alpha'), { recursive: true });
    await mkdir(join(projectDirectory, 'apps', 'app-beta'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'app-alpha', 'package.json'), JSON.stringify({
      name: 'test-app-app-alpha', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'app-beta', 'package.json'), JSON.stringify({
      name: 'test-app-app-beta', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [
        {
          template: 'publish',
          suffix: 'alpha',
          triggers: ['release'],
          targets: [{
            type: 'aws-amplify-nextjs', workingDir: './apps/app-alpha',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
            'AMPLIFY_APP_ID': 'AMPLIFY_APP_ID',
            'AMPLIFY_BRANCH_NAME': 'AMPLIFY_BRANCH_NAME',
          },
        },
        {
          template: 'publish',
          suffix: 'beta',
          triggers: ['release'],
          targets: [{
            type: 'aws-amplify-nextjs', workingDir: './apps/app-beta',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
            'AMPLIFY_APP_ID': 'AMPLIFY_APP_ID',
            'AMPLIFY_BRANCH_NAME': 'AMPLIFY_BRANCH_NAME',
          },
        },
      ],
      workspaces: {
        './apps/app-alpha': {
          role: 'app', policy: 'trackable', name: 'test-app-app-alpha', recipes: {},
        },
        './apps/app-beta': {
          role: 'app', policy: 'trackable', name: 'test-app-app-beta', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const alphaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-alpha.yml');
    const betaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-beta.yml');

    let alphaExists: TestsCliGenerateGithubWorkflowsRunExists = true;
    let betaExists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      await access(alphaWorkflowPath);
    } catch {
      alphaExists = false;
    }

    try {
      await access(betaWorkflowPath);
    } catch {
      betaExists = false;
    }

    // Cross-workflow validation rejects both colliding workflows so neither
    // emits a partial output for a destination nova cannot disambiguate.
    strictEqual(alphaExists, false, 'Alpha workflow should NOT be generated when two aws-amplify-nextjs targets across workflows share the same AMPLIFY_APP_ID and AMPLIFY_BRANCH_NAME.');
    strictEqual(betaExists, false, 'Beta workflow should NOT be generated when two aws-amplify-nextjs targets across workflows share the same AMPLIFY_APP_ID and AMPLIFY_BRANCH_NAME.');

    return;
  });

  it('rejects workflows when two cloudflare-pages-docusaurus targets across separate workflows share the same CLOUDFLARE_PROJECT_NAME', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'cloudflare-pages-docusaurus-cross-workflow-collision');

    await mkdir(join(projectDirectory, 'apps', 'docs-alpha'), { recursive: true });
    await mkdir(join(projectDirectory, 'apps', 'docs-beta'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'docs-alpha', 'package.json'), JSON.stringify({
      name: 'test-app-docs-alpha', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'docs-beta', 'package.json'), JSON.stringify({
      name: 'test-app-docs-beta', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [
        {
          template: 'publish',
          suffix: 'alpha',
          triggers: ['release'],
          targets: [{
            type: 'cloudflare-pages-docusaurus', workingDir: './apps/docs-alpha',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
            'CLOUDFLARE_PROJECT_NAME': 'CLOUDFLARE_PROJECT_NAME',
          },
        },
        {
          template: 'publish',
          suffix: 'beta',
          triggers: ['release'],
          targets: [{
            type: 'cloudflare-pages-docusaurus', workingDir: './apps/docs-beta',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
            'CLOUDFLARE_PROJECT_NAME': 'CLOUDFLARE_PROJECT_NAME',
          },
        },
      ],
      workspaces: {
        './apps/docs-alpha': {
          role: 'app', policy: 'trackable', name: 'test-app-docs-alpha', recipes: {},
        },
        './apps/docs-beta': {
          role: 'app', policy: 'trackable', name: 'test-app-docs-beta', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const alphaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-alpha.yml');
    const betaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-beta.yml');

    let alphaExists: TestsCliGenerateGithubWorkflowsRunExists = true;
    let betaExists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      await access(alphaWorkflowPath);
    } catch {
      alphaExists = false;
    }

    try {
      await access(betaWorkflowPath);
    } catch {
      betaExists = false;
    }

    // Cross-workflow validation rejects both colliding workflows so neither
    // emits a partial output for a destination nova cannot disambiguate.
    strictEqual(alphaExists, false, 'Alpha workflow should NOT be generated when two cloudflare-pages-docusaurus targets across workflows share the same CLOUDFLARE_PROJECT_NAME.');
    strictEqual(betaExists, false, 'Beta workflow should NOT be generated when two cloudflare-pages-docusaurus targets across workflows share the same CLOUDFLARE_PROJECT_NAME.');

    return;
  });

  it('rejects workflows when two vercel-nextjs targets across separate workflows share the same VERCEL_ORG_ID and VERCEL_PROJECT_ID', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'vercel-nextjs-cross-workflow-collision');

    await mkdir(join(projectDirectory, 'apps', 'app-alpha'), { recursive: true });
    await mkdir(join(projectDirectory, 'apps', 'app-beta'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'app-alpha', 'package.json'), JSON.stringify({
      name: 'test-app-app-alpha', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, 'apps', 'app-beta', 'package.json'), JSON.stringify({
      name: 'test-app-app-beta', private: true,
    }, null, 2));
    await writeFile(join(projectDirectory, '.gitignore'), 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = {
      project: {
        name: { slug: 'test' },
      },
      workflows: [
        {
          template: 'publish',
          suffix: 'alpha',
          triggers: ['release'],
          targets: [{
            type: 'vercel-nextjs', workingDir: './apps/app-alpha',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
            'VERCEL_ORG_ID': 'VERCEL_ORG_ID',
            'VERCEL_PROJECT_ID': 'VERCEL_PROJECT_ID',
          },
        },
        {
          template: 'publish',
          suffix: 'beta',
          triggers: ['release'],
          targets: [{
            type: 'vercel-nextjs', workingDir: './apps/app-beta',
          }],
          settings: {
            'ROOT_WORKING_DIR': './',
            'VERCEL_ORG_ID': 'VERCEL_ORG_ID',
            'VERCEL_PROJECT_ID': 'VERCEL_PROJECT_ID',
          },
        },
      ],
      workspaces: {
        './apps/app-alpha': {
          role: 'app', policy: 'trackable', name: 'test-app-app-alpha', recipes: {},
        },
        './apps/app-beta': {
          role: 'app', policy: 'trackable', name: 'test-app-app-beta', recipes: {},
        },
      },
    };

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify(novaConfig, null, 2));

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const alphaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-alpha.yml');
    const betaWorkflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-beta.yml');

    let alphaExists: TestsCliGenerateGithubWorkflowsRunExists = true;
    let betaExists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      await access(alphaWorkflowPath);
    } catch {
      alphaExists = false;
    }

    try {
      await access(betaWorkflowPath);
    } catch {
      betaExists = false;
    }

    // Cross-workflow validation rejects both colliding workflows so neither
    // emits a partial output for a destination nova cannot disambiguate.
    strictEqual(alphaExists, false, 'Alpha workflow should NOT be generated when two vercel-nextjs targets across workflows share the same VERCEL_ORG_ID and VERCEL_PROJECT_ID.');
    strictEqual(betaExists, false, 'Beta workflow should NOT be generated when two vercel-nextjs targets across workflows share the same VERCEL_ORG_ID and VERCEL_PROJECT_ID.');

    return;
  });

  return;
});
