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

import { CliUtilityChangelog } from '../../../cli/utility/changelog.js';

import type {
  TestsCliUtilityChangelogRunChangelogContent,
  TestsCliUtilityChangelogRunChangelogDirectory,
  TestsCliUtilityChangelogRunChangelogPath,
  TestsCliUtilityChangelogRunConfigContents,
  TestsCliUtilityChangelogRunConfigPath,
  TestsCliUtilityChangelogRunContent,
  TestsCliUtilityChangelogRunEntryContents,
  TestsCliUtilityChangelogRunEntryPath,
  TestsCliUtilityChangelogRunFiles,
  TestsCliUtilityChangelogRunHasBump,
  TestsCliUtilityChangelogRunHasCategory,
  TestsCliUtilityChangelogRunHasFeature,
  TestsCliUtilityChangelogRunHasMessage,
  TestsCliUtilityChangelogRunHasPackage,
  TestsCliUtilityChangelogRunHasVersion,
  TestsCliUtilityChangelogRunMdFile,
  TestsCliUtilityChangelogRunMdFiles,
  TestsCliUtilityChangelogRunOriginalCwd,
  TestsCliUtilityChangelogRunPackageJson,
  TestsCliUtilityChangelogRunPackageJsonContents,
  TestsCliUtilityChangelogRunPackageJsonPath,
  TestsCliUtilityChangelogRunPackageJsonRaw,
  TestsCliUtilityChangelogRunProjectDirectory,
  TestsCliUtilityChangelogRunRemainingFiles,
  TestsCliUtilityChangelogRunRemainingMdFiles,
  TestsCliUtilityChangelogRunSandboxPrefix,
  TestsCliUtilityChangelogRunSandboxRoot,
  TestsCliUtilityChangelogRunTemporaryDirectory,
  TestsCliUtilityChangelogRunUpdatedPackagePath,
  TestsCliUtilityChangelogRunWorkspaceDirectory,
  TestsCliUtilityChangelogRunWorkspacePackageContents,
  TestsCliUtilityChangelogRunWorkspacePackagePath,
} from '../../../types/tests/cli/utility/changelog.test.d.ts';

/**
 * Tests - CLI - Utility - Changelog - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityChangelog.run', async () => {
  const originalCwd: TestsCliUtilityChangelogRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliUtilityChangelogRunTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsCliUtilityChangelogRunSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliUtilityChangelogRunSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('errors when --record and --release are both set', async () => {
    const projectDirectory: TestsCliUtilityChangelogRunProjectDirectory = join(sandboxRoot, 'both-flags');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityChangelogRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityChangelogRunPackageJsonContents = JSON.stringify({
      name: 'test-both-flags',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: TestsCliUtilityChangelogRunConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsCliUtilityChangelogRunConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      release: true,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when partial non-interactive flags', async () => {
    const projectDirectory: TestsCliUtilityChangelogRunProjectDirectory = join(sandboxRoot, 'partial-flags');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityChangelogRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityChangelogRunPackageJsonContents = JSON.stringify({
      name: 'test-partial-flags',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: TestsCliUtilityChangelogRunConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsCliUtilityChangelogRunConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('records entry in non-interactive mode', async () => {
    const projectDirectory: TestsCliUtilityChangelogRunProjectDirectory = join(sandboxRoot, 'record-entry');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityChangelogRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityChangelogRunPackageJsonContents = JSON.stringify({
      name: 'test-record-entry',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: TestsCliUtilityChangelogRunConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsCliUtilityChangelogRunConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'added',
      bump: 'minor',
      message: 'Added new feature',
    });

    strictEqual(process.exitCode, undefined);

    const changelogDirectory: TestsCliUtilityChangelogRunChangelogDirectory = join(projectDirectory, '.changelog');
    const files: TestsCliUtilityChangelogRunFiles = await readdir(changelogDirectory);
    const mdFiles: TestsCliUtilityChangelogRunMdFiles = files.filter((file) => file.endsWith('.md') && file !== 'README.md');

    strictEqual(mdFiles.length, 1);

    const mdFile: TestsCliUtilityChangelogRunMdFile = mdFiles[0] as TestsCliUtilityChangelogRunMdFile;
    const entryPath: TestsCliUtilityChangelogRunEntryPath = join(changelogDirectory, mdFile);
    const content: TestsCliUtilityChangelogRunContent = await readFile(entryPath, 'utf-8');

    const hasPackage: TestsCliUtilityChangelogRunHasPackage = content.includes('package: "@test/core"');
    const hasCategory: TestsCliUtilityChangelogRunHasCategory = content.includes('category: added');
    const hasBump: TestsCliUtilityChangelogRunHasBump = content.includes('bump: minor');
    const hasMessage: TestsCliUtilityChangelogRunHasMessage = content.includes('Added new feature');

    strictEqual(hasPackage, true);
    strictEqual(hasCategory, true);
    strictEqual(hasBump, true);
    strictEqual(hasMessage, true);

    return;
  });

  it('errors when package is invalid', async () => {
    const projectDirectory: TestsCliUtilityChangelogRunProjectDirectory = join(sandboxRoot, 'invalid-package');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityChangelogRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityChangelogRunPackageJsonContents = JSON.stringify({
      name: 'test-invalid-package',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: TestsCliUtilityChangelogRunConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsCliUtilityChangelogRunConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/nonexistent',
      category: 'added',
      bump: 'minor',
      message: 'Some change',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when category is invalid', async () => {
    const projectDirectory: TestsCliUtilityChangelogRunProjectDirectory = join(sandboxRoot, 'invalid-category');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityChangelogRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityChangelogRunPackageJsonContents = JSON.stringify({
      name: 'test-invalid-category',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: TestsCliUtilityChangelogRunConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsCliUtilityChangelogRunConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'invalid-category',
      bump: 'minor',
      message: 'Some change',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when bump is invalid', async () => {
    const projectDirectory: TestsCliUtilityChangelogRunProjectDirectory = join(sandboxRoot, 'invalid-bump');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityChangelogRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityChangelogRunPackageJsonContents = JSON.stringify({
      name: 'test-invalid-bump',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: TestsCliUtilityChangelogRunConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsCliUtilityChangelogRunConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'added',
      bump: 'invalid-bump',
      message: 'Some change',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when message is empty', async () => {
    const projectDirectory: TestsCliUtilityChangelogRunProjectDirectory = join(sandboxRoot, 'empty-message');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityChangelogRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityChangelogRunPackageJsonContents = JSON.stringify({
      name: 'test-empty-message',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: TestsCliUtilityChangelogRunConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsCliUtilityChangelogRunConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'added',
      bump: 'minor',
      message: '   ',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('releases and bumps version', async () => {
    const projectDirectory: TestsCliUtilityChangelogRunProjectDirectory = join(sandboxRoot, 'release-bump');
    const workspaceDirectory: TestsCliUtilityChangelogRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');
    const changelogDirectory: TestsCliUtilityChangelogRunChangelogDirectory = join(projectDirectory, '.changelog');

    await mkdir(workspaceDirectory, { recursive: true });
    await mkdir(changelogDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityChangelogRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityChangelogRunPackageJsonContents = JSON.stringify({
      name: 'test-release-bump',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: TestsCliUtilityChangelogRunConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsCliUtilityChangelogRunConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const workspacePackagePath: TestsCliUtilityChangelogRunWorkspacePackagePath = join(workspaceDirectory, 'package.json');
    const workspacePackageContents: TestsCliUtilityChangelogRunWorkspacePackageContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackagePath, workspacePackageContents, 'utf-8');

    const entryPath: TestsCliUtilityChangelogRunEntryPath = join(changelogDirectory, 'test-entry.md');
    const entryContents: TestsCliUtilityChangelogRunEntryContents = [
      '---',
      'package: "@test/core"',
      'category: added',
      'bump: minor',
      '---',
      '',
      'Added a new feature',
      '',
    ].join('\n');

    await writeFile(entryPath, entryContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    const updatedPackagePath: TestsCliUtilityChangelogRunUpdatedPackagePath = join(workspaceDirectory, 'package.json');
    const packageJsonRaw: TestsCliUtilityChangelogRunPackageJsonRaw = await readFile(updatedPackagePath, 'utf-8');
    const packageJson: TestsCliUtilityChangelogRunPackageJson = JSON.parse(packageJsonRaw);

    strictEqual(packageJson['version'], '1.1.0');

    const changelogPath: TestsCliUtilityChangelogRunChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');
    const changelogContent: TestsCliUtilityChangelogRunChangelogContent = await readFile(changelogPath, 'utf-8');

    const hasVersion: TestsCliUtilityChangelogRunHasVersion = changelogContent.includes('## 1.1.0');
    const hasFeature: TestsCliUtilityChangelogRunHasFeature = changelogContent.includes('Added a new feature');

    strictEqual(hasVersion, true);
    strictEqual(hasFeature, true);

    const remainingFiles: TestsCliUtilityChangelogRunRemainingFiles = await readdir(changelogDirectory);
    const remainingMdFiles: TestsCliUtilityChangelogRunRemainingMdFiles = remainingFiles.filter((file) => file.endsWith('.md') && file !== 'README.md');

    strictEqual(remainingMdFiles.length, 0);

    return;
  });

  it('skips release when no entries exist', async () => {
    const projectDirectory: TestsCliUtilityChangelogRunProjectDirectory = join(sandboxRoot, 'no-entries');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityChangelogRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityChangelogRunPackageJsonContents = JSON.stringify({
      name: 'test-no-entries',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: TestsCliUtilityChangelogRunConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsCliUtilityChangelogRunConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});
