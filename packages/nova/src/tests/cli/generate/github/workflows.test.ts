import { strictEqual } from 'node:assert/strict';
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

import type {
  TestsCliGenerateGithubWorkflowsRunBackupFiles,
  TestsCliGenerateGithubWorkflowsRunContent,
  TestsCliGenerateGithubWorkflowsRunEntries,
  TestsCliGenerateGithubWorkflowsRunExists,
  TestsCliGenerateGithubWorkflowsRunGitignorePath,
  TestsCliGenerateGithubWorkflowsRunNovaConfig,
  TestsCliGenerateGithubWorkflowsRunNovaConfigPath,
  TestsCliGenerateGithubWorkflowsRunOriginalCwd,
  TestsCliGenerateGithubWorkflowsRunOrphanFiles,
  TestsCliGenerateGithubWorkflowsRunPackageJson,
  TestsCliGenerateGithubWorkflowsRunPackageJsonPath,
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

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      project: { name: { slug: 'test' } },
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

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

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      workflows: [{
        template: 'publish-to-npm',
        suffix: 'my-pkg',
        triggers: ['release'],
        settings: {
          'ROOT_WORKING_DIR': './',
          'NPM_WORKING_DIR': './packages/my-package',
        },
      }],
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-to-npm-my-pkg.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    // Literal vars should be replaced with raw values.
    strictEqual(content.includes('"./packages/my-package"'), true);
    strictEqual(content.includes('"./"'), true);

    // Secrets should remain as expressions.
    strictEqual(content.includes([
      '$',
      '{{ secrets.NPM_TOKEN }}',
    ].join('')), true);

    // Workflow ID placeholder should be fully resolved in name and run-name.
    strictEqual(content.includes('Publish to npm (my-pkg)'), true);
    strictEqual(content.includes('[__WORKFLOW_ID__]'), false);

    return;
  });

  it('generates workflow file with secret remapping', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'secret-remap');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      workflows: [{
        template: 'publish-to-npm',
        suffix: 'core',
        triggers: ['release'],
        settings: {
          'NPM_TOKEN': 'NPM_TOKEN_CORE',
          'ROOT_WORKING_DIR': './',
          'NPM_WORKING_DIR': './packages/core',
        },
      }],
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-to-npm-core.yml');
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

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      workflows: [{
        template: 'publish-to-npm',
        suffix: 'incomplete',
        triggers: ['release'],
        settings: {
          'ROOT_WORKING_DIR': './',
        },
      }],
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    // No file should be generated.
    let exists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-to-npm-incomplete.yml');

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

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const workflowsDirectory: TestsCliGenerateGithubWorkflowsRunWorkflowsDirectory = join(projectDirectory, '.github', 'workflows');

    await mkdir(workflowsDirectory, { recursive: true });

    // Create an orphan file.
    await writeFile(join(workflowsDirectory, 'nova-old-workflow.yml'), 'name: old\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      workflows: [{
        template: 'lock-inactive-issues',
        suffix: 'default',
        triggers: ['schedule'],
      }],
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

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

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const workflowsDirectory: TestsCliGenerateGithubWorkflowsRunWorkflowsDirectory = join(projectDirectory, '.github', 'workflows');

    await mkdir(workflowsDirectory, { recursive: true });

    // Create a backup file that should NOT be cleaned up.
    await writeFile(join(workflowsDirectory, 'nova-old-workflow.2026-04-17_0001.nova-backup.yml'), 'name: backup\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      workflows: [{
        template: 'lock-inactive-issues',
        suffix: 'default',
        triggers: ['schedule'],
      }],
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({ replaceFile: true });

    const entries: TestsCliGenerateGithubWorkflowsRunEntries = await readdir(workflowsDirectory);
    const backupFiles: TestsCliGenerateGithubWorkflowsRunBackupFiles = entries.filter((e) => e.includes('.nova-backup.') === true);

    strictEqual(backupFiles.length, 1);

    return;
  });

  it('generates workflow with workflow-run-success trigger and depends-on', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'depends-on-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      workflows: [
        {
          template: 'publish-to-npm',
          suffix: 'primary',
          triggers: ['release'],
          settings: {
            'ROOT_WORKING_DIR': './',
            'NPM_WORKING_DIR': './packages/core',
          },
        },
        {
          'template': 'publish-to-npm',
          'suffix': 'secondary',
          'triggers': ['workflow-run-success'],
          'depends-on': ['publish-to-npm-primary'],
          'settings': {
            'ROOT_WORKING_DIR': './',
            'NPM_WORKING_DIR': './packages/utils',
          },
        },
      ],
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    // Primary workflow should exist.
    const primaryPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-to-npm-primary.yml');
    const primaryContent: TestsCliGenerateGithubWorkflowsRunContent = await readFile(primaryPath, 'utf-8');

    strictEqual(primaryContent.includes('release:'), true);

    // Secondary workflow should exist and reference the primary.
    const secondaryPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-to-npm-secondary.yml');
    const secondaryContent: TestsCliGenerateGithubWorkflowsRunContent = await readFile(secondaryPath, 'utf-8');

    strictEqual(secondaryContent.includes('workflow_run:'), true);
    strictEqual(secondaryContent.includes('Publish to npm (primary)'), true);

    return;
  });

  it('generates workflow with multiple triggers', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'multiple-triggers');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      workflows: [
        {
          template: 'publish-to-npm',
          suffix: 'primary',
          triggers: ['release'],
          settings: {
            'ROOT_WORKING_DIR': './',
            'NPM_WORKING_DIR': './packages/core',
          },
        },
        {
          template: 'publish-to-cloudflare-pages-docusaurus',
          suffix: 'multi',
          triggers: [
            'push',
            'release',
          ],
          settings: {
            'ROOT_WORKING_DIR': './',
            'DOCUSAURUS_WORKING_DIR': './apps/docs',
            'CLOUDFLARE_PROJECT_NAME': 'my-docs',
          },
        },
      ],
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-to-cloudflare-pages-docusaurus-multi.yml');
    const content: TestsCliGenerateGithubWorkflowsRunContent = await readFile(workflowPath, 'utf-8');

    // Should contain both trigger types.
    strictEqual(content.includes('push:'), true);
    strictEqual(content.includes('release:'), true);

    return;
  });

  it('rejects duplicate template-suffix combinations', async () => {
    const projectDirectory: TestsCliGenerateGithubWorkflowsRunProjectDirectory = join(sandboxRoot, 'duplicate-ids');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      workflows: [
        {
          template: 'publish-to-npm',
          suffix: 'same-suffix',
          triggers: ['release'],
          settings: {
            'ROOT_WORKING_DIR': './',
            'NPM_WORKING_DIR': './packages/a',
          },
        },
        {
          template: 'publish-to-npm',
          suffix: 'same-suffix',
          triggers: ['release'],
          settings: {
            'ROOT_WORKING_DIR': './',
            'NPM_WORKING_DIR': './packages/b',
          },
        },
      ],
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

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

    const packageJson: TestsCliGenerateGithubWorkflowsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateGithubWorkflowsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const gitignorePath: TestsCliGenerateGithubWorkflowsRunGitignorePath = join(projectDirectory, '.gitignore');

    await writeFile(gitignorePath, 'node_modules\n', 'utf-8');

    const novaConfig: TestsCliGenerateGithubWorkflowsRunNovaConfig = JSON.stringify({
      workflows: [{
        'template': 'publish-to-npm',
        'suffix': 'orphan',
        'triggers': ['workflow-run-success'],
        'depends-on': ['non-existent'],
        'settings': {
          'ROOT_WORKING_DIR': './',
          'NPM_WORKING_DIR': './packages/core',
        },
      }],
    }, null, 2);
    const novaConfigPath: TestsCliGenerateGithubWorkflowsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateGithubWorkflows.run({});

    // The workflow file should not be generated since depends-on target doesn't exist.
    let exists: TestsCliGenerateGithubWorkflowsRunExists = true;

    try {
      const workflowPath: TestsCliGenerateGithubWorkflowsRunWorkflowPath = join(projectDirectory, '.github', 'workflows', 'nova-publish-to-npm-orphan.yml');

      await readFile(workflowPath, 'utf-8');
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  return;
});
