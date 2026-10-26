import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as CliUtilityChangelog } from '../../../cli/utility/changelog.js';

import type {
  Tests_Cli_Utility_ChangelogApple_AppPackageContents,
  Tests_Cli_Utility_ChangelogApple_AppPackagePath,
  Tests_Cli_Utility_ChangelogApple_ChangelogContent,
  Tests_Cli_Utility_ChangelogApple_ChangelogDirectory,
  Tests_Cli_Utility_ChangelogApple_ChangelogPath,
  Tests_Cli_Utility_ChangelogApple_ConfigContents,
  Tests_Cli_Utility_ChangelogApple_ConfigPath,
  Tests_Cli_Utility_ChangelogApple_EntryOneContents,
  Tests_Cli_Utility_ChangelogApple_EntryOnePath,
  Tests_Cli_Utility_ChangelogApple_EntryTwoContents,
  Tests_Cli_Utility_ChangelogApple_EntryTwoPath,
  Tests_Cli_Utility_ChangelogApple_OriginalCwd,
  Tests_Cli_Utility_ChangelogApple_PbxprojContent,
  Tests_Cli_Utility_ChangelogApple_PbxprojPath,
  Tests_Cli_Utility_ChangelogApple_ProjectDirectory,
  Tests_Cli_Utility_ChangelogApple_ProjectFileContents,
  Tests_Cli_Utility_ChangelogApple_ProjectFilePath,
  Tests_Cli_Utility_ChangelogApple_RootPackageContents,
  Tests_Cli_Utility_ChangelogApple_RootPackagePath,
  Tests_Cli_Utility_ChangelogApple_SandboxPrefix,
  Tests_Cli_Utility_ChangelogApple_SandboxRoot,
  Tests_Cli_Utility_ChangelogApple_TemporaryDirectory,
  Tests_Cli_Utility_ChangelogApple_UpdatedAppPackage,
  Tests_Cli_Utility_ChangelogApple_UpdatedAppPackageRaw,
  Tests_Cli_Utility_ChangelogApple_UpdatedPbxproj,
  Tests_Cli_Utility_ChangelogApple_UpdatedProjectFile,
  Tests_Cli_Utility_ChangelogApple_WorkspaceDirectory,
  Tests_Cli_Utility_ChangelogApple_XcodeProjectDirectory,
} from '../../../types/tests/cli/utility/changelog-apple.test.d.ts';

/**
 * Tests - CLI - Utility - Changelog Apple - CliUtilityChangelog.run Apple Releases.
 *
 * @since 0.34.0
 */
describe('CliUtilityChangelog.run Apple releases', async () => {
  const originalCwd: Tests_Cli_Utility_ChangelogApple_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_ChangelogApple_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Cli_Utility_ChangelogApple_SandboxPrefix = join(temporaryDirectory, `nova-${'apple-changelog'}-`);
  const sandboxRoot: Tests_Cli_Utility_ChangelogApple_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('synchronizes Apple native versions and writes the build in the heading', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogApple_ProjectDirectory = join(sandboxRoot, 'apple-release');
    const workspaceDirectory: Tests_Cli_Utility_ChangelogApple_WorkspaceDirectory = join(projectDirectory, 'apps', 'apple');
    const changelogDirectory: Tests_Cli_Utility_ChangelogApple_ChangelogDirectory = join(projectDirectory, '.changelog');
    const xcodeProjectDirectory: Tests_Cli_Utility_ChangelogApple_XcodeProjectDirectory = join(workspaceDirectory, 'Example.xcodeproj');

    await mkdir(changelogDirectory, { recursive: true });
    await mkdir(xcodeProjectDirectory, { recursive: true });

    const rootPackagePath: Tests_Cli_Utility_ChangelogApple_RootPackagePath = join(projectDirectory, 'package.json');
    const rootPackageContents: Tests_Cli_Utility_ChangelogApple_RootPackageContents = JSON.stringify({
      name: 'example',
    }, null, 2);

    await writeFile(rootPackagePath, rootPackageContents, 'utf-8');

    const configPath: Tests_Cli_Utility_ChangelogApple_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_ChangelogApple_ConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'example',
        },
      },
      workspaces: {
        './apps/apple': {
          name: 'example-app-apple',
          role: 'app',
          policy: 'trackable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const appPackagePath: Tests_Cli_Utility_ChangelogApple_AppPackagePath = join(workspaceDirectory, 'package.json');
    const appPackageContents: Tests_Cli_Utility_ChangelogApple_AppPackageContents = JSON.stringify({
      name: 'example-app-apple',
      version: '1.4.0',
    }, null, 2);

    await writeFile(appPackagePath, appPackageContents, 'utf-8');

    const projectFilePath: Tests_Cli_Utility_ChangelogApple_ProjectFilePath = join(workspaceDirectory, 'project.yml');
    const projectFileContents: Tests_Cli_Utility_ChangelogApple_ProjectFileContents = [
      'settings:',
      '  base:',
      '    MARKETING_VERSION: "1.4.0"',
      '    CURRENT_PROJECT_VERSION: "449"',
      '',
    ].join('\n');

    await writeFile(projectFilePath, projectFileContents, 'utf-8');

    const pbxprojPath: Tests_Cli_Utility_ChangelogApple_PbxprojPath = join(xcodeProjectDirectory, 'project.pbxproj');
    const pbxprojContent: Tests_Cli_Utility_ChangelogApple_PbxprojContent = [
      'MARKETING_VERSION = 1.4.0;',
      'CURRENT_PROJECT_VERSION = 449;',
      'MARKETING_VERSION = 1.4.0;',
      'CURRENT_PROJECT_VERSION = 449;',
      '',
    ].join('\n');

    await writeFile(pbxprojPath, pbxprojContent, 'utf-8');

    const entryOnePath: Tests_Cli_Utility_ChangelogApple_EntryOnePath = join(changelogDirectory, 'first-entry.md');
    const entryOneContents: Tests_Cli_Utility_ChangelogApple_EntryOneContents = [
      '---',
      'package: "example-app-apple"',
      'category: fixed',
      'bump: patch',
      '---',
      '',
      'Fixed the first Apple issue.',
      '',
    ].join('\n');
    const entryTwoPath: Tests_Cli_Utility_ChangelogApple_EntryTwoPath = join(changelogDirectory, 'second-entry.md');
    const entryTwoContents: Tests_Cli_Utility_ChangelogApple_EntryTwoContents = [
      '---',
      'package: "example-app-apple"',
      'category: updated',
      'bump: patch',
      '---',
      '',
      'Updated the second Apple behavior.',
      '',
    ].join('\n');

    await writeFile(entryOnePath, entryOneContents, 'utf-8');
    await writeFile(entryTwoPath, entryTwoContents, 'utf-8');

    process.chdir(projectDirectory);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      release: true,
    });

    const updatedAppPackageRaw: Tests_Cli_Utility_ChangelogApple_UpdatedAppPackageRaw = await readFile(appPackagePath, 'utf-8');
    const updatedAppPackage: Tests_Cli_Utility_ChangelogApple_UpdatedAppPackage = JSON.parse(updatedAppPackageRaw);
    const updatedProjectFile: Tests_Cli_Utility_ChangelogApple_UpdatedProjectFile = await readFile(projectFilePath, 'utf-8');
    const updatedPbxproj: Tests_Cli_Utility_ChangelogApple_UpdatedPbxproj = await readFile(pbxprojPath, 'utf-8');
    const changelogPath: Tests_Cli_Utility_ChangelogApple_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');
    const changelogContent: Tests_Cli_Utility_ChangelogApple_ChangelogContent = await readFile(changelogPath, 'utf-8');

    strictEqual(updatedAppPackage['version'], '1.4.1');
    strictEqual(updatedProjectFile.includes('MARKETING_VERSION: "1.4.1"'), true);
    strictEqual(updatedProjectFile.includes('CURRENT_PROJECT_VERSION: "451"'), true);
    strictEqual(updatedPbxproj, pbxprojContent);
    strictEqual(changelogContent.includes('## 1.4.1 (451) - '), true);
    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});
