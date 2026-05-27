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

import { Runner as CliUtilityChangelog } from '../../../cli/utility/changelog.js';

import type {
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ChangelogContent,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ChangelogDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ChangelogPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_Content,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_EntryContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_EntryPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_Files,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasBump,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasCategory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasFeature,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasMessage,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasPackage,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasVersion,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_MdFile,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_MdFiles,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_OriginalCwd,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJson,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonRaw,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RemainingFiles,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RemainingMdFiles,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SandboxPrefix,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SandboxRoot,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_TemporaryDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_UpdatedPackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_WorkspaceDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_WorkspacePackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_WorkspacePackagePath,
} from '../../../types/tests/cli/utility/changelog.test.d.ts';

/**
 * Tests - CLI - Utility - Changelog - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityChangelog.run', async () => {
  const originalCwd: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('errors when --record and --release are both set', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory = join(sandboxRoot, 'both-flags');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents = JSON.stringify({
      name: 'test-both-flags',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents = JSON.stringify({
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
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory = join(sandboxRoot, 'partial-flags');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents = JSON.stringify({
      name: 'test-partial-flags',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents = JSON.stringify({
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
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory = join(sandboxRoot, 'record-entry');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents = JSON.stringify({
      name: 'test-record-entry',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents = JSON.stringify({
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

    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ChangelogDirectory = join(projectDirectory, '.changelog');
    const files: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_Files = await readdir(changelogDirectory);
    const mdFiles: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_MdFiles = files.filter((file) => file.endsWith('.md') && file !== 'README.md');

    strictEqual(mdFiles.length, 1);

    const mdFile: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_MdFile = mdFiles[0] as Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_MdFile;
    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_EntryPath = join(changelogDirectory, mdFile);
    const content: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_Content = await readFile(entryPath, 'utf-8');

    const hasPackage: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasPackage = content.includes('package: "@test/core"');
    const hasCategory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasCategory = content.includes('category: added');
    const hasBump: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasBump = content.includes('bump: minor');
    const hasMessage: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasMessage = content.includes('Added new feature');

    strictEqual(hasPackage, true);
    strictEqual(hasCategory, true);
    strictEqual(hasBump, true);
    strictEqual(hasMessage, true);

    return;
  });

  it('errors when package is invalid', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory = join(sandboxRoot, 'invalid-package');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents = JSON.stringify({
      name: 'test-invalid-package',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents = JSON.stringify({
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
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory = join(sandboxRoot, 'invalid-category');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents = JSON.stringify({
      name: 'test-invalid-category',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents = JSON.stringify({
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
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory = join(sandboxRoot, 'invalid-bump');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents = JSON.stringify({
      name: 'test-invalid-bump',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents = JSON.stringify({
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
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory = join(sandboxRoot, 'empty-message');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents = JSON.stringify({
      name: 'test-empty-message',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents = JSON.stringify({
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
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory = join(sandboxRoot, 'release-bump');
    const workspaceDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');
    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ChangelogDirectory = join(projectDirectory, '.changelog');

    await mkdir(workspaceDirectory, { recursive: true });
    await mkdir(changelogDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents = JSON.stringify({
      name: 'test-release-bump',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const workspacePackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_WorkspacePackagePath = join(workspaceDirectory, 'package.json');
    const workspacePackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_WorkspacePackageContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackagePath, workspacePackageContents, 'utf-8');

    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_EntryPath = join(changelogDirectory, 'test-entry.md');
    const entryContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_EntryContents = [
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

    const updatedPackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_UpdatedPackagePath = join(workspaceDirectory, 'package.json');
    const packageJsonRaw: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonRaw = await readFile(updatedPackagePath, 'utf-8');
    const packageJson: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJson = JSON.parse(packageJsonRaw);

    strictEqual(packageJson['version'], '1.1.0');

    const changelogPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');
    const changelogContent: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ChangelogContent = await readFile(changelogPath, 'utf-8');

    const hasVersion: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasVersion = changelogContent.includes('## 1.1.0');
    const hasFeature: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_HasFeature = changelogContent.includes('Added a new feature');

    strictEqual(hasVersion, true);
    strictEqual(hasFeature, true);

    const remainingFiles: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RemainingFiles = await readdir(changelogDirectory);
    const remainingMdFiles: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RemainingMdFiles = remainingFiles.filter((file) => file.endsWith('.md') && file !== 'README.md');

    strictEqual(remainingMdFiles.length, 0);

    return;
  });

  it('skips release when no entries exist', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ProjectDirectory = join(sandboxRoot, 'no-entries');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PackageJsonContents = JSON.stringify({
      name: 'test-no-entries',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ConfigContents = JSON.stringify({
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
