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
  Tests_Cli_Utility_ChangelogAndroid_AppPackagePath,
  Tests_Cli_Utility_ChangelogAndroid_ChangelogContent,
  Tests_Cli_Utility_ChangelogAndroid_ChangelogDirectory,
  Tests_Cli_Utility_ChangelogAndroid_ChangelogPath,
  Tests_Cli_Utility_ChangelogAndroid_ConfigPath,
  Tests_Cli_Utility_ChangelogAndroid_EntryPath,
  Tests_Cli_Utility_ChangelogAndroid_GradlePath,
  Tests_Cli_Utility_ChangelogAndroid_OriginalCwd,
  Tests_Cli_Utility_ChangelogAndroid_ProjectDirectory,
  Tests_Cli_Utility_ChangelogAndroid_RootPackagePath,
  Tests_Cli_Utility_ChangelogAndroid_SandboxRoot,
  Tests_Cli_Utility_ChangelogAndroid_TemporaryPrefix,
  Tests_Cli_Utility_ChangelogAndroid_UpdatedGradle,
  Tests_Cli_Utility_ChangelogAndroid_UpdatedPackage,
  Tests_Cli_Utility_ChangelogAndroid_WorkspaceDirectory,
} from '../../../types/tests/cli/utility/changelog-android.test.d.ts';

/**
 * Tests - CLI - Utility - Changelog Android - Run Android Releases.
 *
 * @since 0.34.0
 */
describe('run Android releases', async () => {
  const originalCwd: Tests_Cli_Utility_ChangelogAndroid_OriginalCwd = process.cwd();
  const temporaryPrefix: Tests_Cli_Utility_ChangelogAndroid_TemporaryPrefix = join(tmpdir(), `nova-${'android-changelog'}-`);
  const sandboxRoot: Tests_Cli_Utility_ChangelogAndroid_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('synchronizes Android versions and writes the build in the heading', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogAndroid_ProjectDirectory = join(sandboxRoot, 'android-release');
    const workspaceDirectory: Tests_Cli_Utility_ChangelogAndroid_WorkspaceDirectory = join(projectDirectory, 'apps', 'android');
    const changelogDirectory: Tests_Cli_Utility_ChangelogAndroid_ChangelogDirectory = join(projectDirectory, '.changelog');
    const rootPackagePath: Tests_Cli_Utility_ChangelogAndroid_RootPackagePath = join(projectDirectory, 'package.json');
    const configPath: Tests_Cli_Utility_ChangelogAndroid_ConfigPath = join(projectDirectory, 'nova.config.json');
    const appPackagePath: Tests_Cli_Utility_ChangelogAndroid_AppPackagePath = join(workspaceDirectory, 'package.json');
    const gradlePath: Tests_Cli_Utility_ChangelogAndroid_GradlePath = join(workspaceDirectory, 'app', 'build.gradle.kts');
    const entryPath: Tests_Cli_Utility_ChangelogAndroid_EntryPath = join(changelogDirectory, 'android-release.md');

    await Promise.all([
      mkdir(changelogDirectory, { recursive: true }),
      mkdir(join(workspaceDirectory, 'app'), { recursive: true }),
    ]);

    await Promise.all([
      writeFile(rootPackagePath, `${JSON.stringify({ name: 'example' }, null, 2)}\n`, 'utf-8'),
      writeFile(configPath, `${JSON.stringify({
        project: {
          name: {
            slug: 'example',
          },
        },
        workspaces: {
          './apps/android': {
            name: 'example-app-android',
            role: 'app',
            policy: 'trackable',
          },
        },
      }, null, 2)}\n`, 'utf-8'),
      writeFile(appPackagePath, `${JSON.stringify({
        name: 'example-app-android',
        version: '1.4.0',
      }, null, 2)}\n`, 'utf-8'),
      writeFile(gradlePath, [
        'android {',
        '  defaultConfig {',
        '    versionCode = 449',
        '    versionName = "1.4.0"',
        '  }',
        '}',
        '',
      ].join('\n'), 'utf-8'),
      writeFile(entryPath, [
        '---',
        'package: "example-app-android"',
        'category: fixed',
        'bump: patch',
        '---',
        '',
        'Fixed the Android release flow.',
        '',
      ].join('\n'), 'utf-8'),
    ]);

    process.chdir(projectDirectory);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      release: true,
    });

    const updatedPackage: Tests_Cli_Utility_ChangelogAndroid_UpdatedPackage = JSON.parse(await readFile(appPackagePath, 'utf-8'));
    const updatedGradle: Tests_Cli_Utility_ChangelogAndroid_UpdatedGradle = await readFile(gradlePath, 'utf-8');
    const changelogPath: Tests_Cli_Utility_ChangelogAndroid_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');
    const changelogContent: Tests_Cli_Utility_ChangelogAndroid_ChangelogContent = await readFile(changelogPath, 'utf-8');

    strictEqual(process.exitCode, undefined);
    strictEqual(updatedPackage['version'], '1.4.1');
    strictEqual(updatedGradle.includes('versionName = "1.4.1"'), true);
    strictEqual(updatedGradle.includes('versionCode = 450'), true);
    strictEqual(changelogContent.includes('## 1.4.1 (450) - '), true);

    return;
  });

  it('bumps the Android build while folding an existing section', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogAndroid_ProjectDirectory = join(sandboxRoot, 'android-fold');
    const workspaceDirectory: Tests_Cli_Utility_ChangelogAndroid_WorkspaceDirectory = join(projectDirectory, 'apps', 'android');
    const rootPackagePath: Tests_Cli_Utility_ChangelogAndroid_RootPackagePath = join(projectDirectory, 'package.json');
    const configPath: Tests_Cli_Utility_ChangelogAndroid_ConfigPath = join(projectDirectory, 'nova.config.json');
    const appPackagePath: Tests_Cli_Utility_ChangelogAndroid_AppPackagePath = join(workspaceDirectory, 'package.json');
    const gradlePath: Tests_Cli_Utility_ChangelogAndroid_GradlePath = join(workspaceDirectory, 'app', 'build.gradle.kts');
    const changelogPath: Tests_Cli_Utility_ChangelogAndroid_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');

    await mkdir(join(workspaceDirectory, 'app'), { recursive: true });

    await Promise.all([
      writeFile(rootPackagePath, `${JSON.stringify({ name: 'example' }, null, 2)}\n`, 'utf-8'),
      writeFile(configPath, `${JSON.stringify({
        project: {
          name: {
            slug: 'example',
          },
        },
        workspaces: {
          './apps/android': {
            name: 'example-app-android',
            role: 'app',
            policy: 'trackable',
          },
        },
      }, null, 2)}\n`, 'utf-8'),
      writeFile(appPackagePath, `${JSON.stringify({
        name: 'example-app-android',
        version: '1.4.0',
      }, null, 2)}\n`, 'utf-8'),
      writeFile(gradlePath, [
        'android {',
        '  defaultConfig {',
        '    versionCode = 449',
        '    versionName = "1.4.0"',
        '  }',
        '}',
        '',
      ].join('\n'), 'utf-8'),
      writeFile(changelogPath, [
        '# example-app-android',
        '',
        '## 1.4.0 (449) - 2026-11-01',
        '',
        '### FIXED',
        '',
        '- Fixed the original Android issue.',
        '',
      ].join('\n'), 'utf-8'),
    ]);

    process.chdir(projectDirectory);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      package: 'example-app-android',
      add: true,
      category: 'added',
      message: 'The corrected Android behavior ships.',
    });

    const updatedGradle: Tests_Cli_Utility_ChangelogAndroid_UpdatedGradle = await readFile(gradlePath, 'utf-8');
    const changelogContent: Tests_Cli_Utility_ChangelogAndroid_ChangelogContent = await readFile(changelogPath, 'utf-8');

    strictEqual(updatedGradle.includes('versionName = "1.4.0"'), true);
    strictEqual(updatedGradle.includes('versionCode = 450'), true);
    strictEqual(changelogContent.includes('## 1.4.0 (450) - 2026-11-01'), true);
    strictEqual(changelogContent.includes('- The corrected Android behavior ships.'), true);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('refuses to bump an older Android version', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogAndroid_ProjectDirectory = join(sandboxRoot, 'android-fold-older-version');
    const workspaceDirectory: Tests_Cli_Utility_ChangelogAndroid_WorkspaceDirectory = join(projectDirectory, 'apps', 'android');
    const rootPackagePath: Tests_Cli_Utility_ChangelogAndroid_RootPackagePath = join(projectDirectory, 'package.json');
    const configPath: Tests_Cli_Utility_ChangelogAndroid_ConfigPath = join(projectDirectory, 'nova.config.json');
    const appPackagePath: Tests_Cli_Utility_ChangelogAndroid_AppPackagePath = join(workspaceDirectory, 'package.json');
    const gradlePath: Tests_Cli_Utility_ChangelogAndroid_GradlePath = join(workspaceDirectory, 'app', 'build.gradle.kts');
    const changelogPath: Tests_Cli_Utility_ChangelogAndroid_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');

    await mkdir(join(workspaceDirectory, 'app'), { recursive: true });

    await Promise.all([
      writeFile(rootPackagePath, `${JSON.stringify({ name: 'example' }, null, 2)}\n`, 'utf-8'),
      writeFile(configPath, `${JSON.stringify({
        project: {
          name: {
            slug: 'example',
          },
        },
        workspaces: {
          './apps/android': {
            name: 'example-app-android',
            role: 'app',
            policy: 'trackable',
          },
        },
      }, null, 2)}\n`, 'utf-8'),
      writeFile(appPackagePath, `${JSON.stringify({
        name: 'example-app-android',
        version: '1.4.0',
      }, null, 2)}\n`, 'utf-8'),
      writeFile(gradlePath, [
        'android {',
        '  defaultConfig {',
        '    versionCode = 449',
        '    versionName = "1.4.0"',
        '  }',
        '}',
        '',
      ].join('\n'), 'utf-8'),
      writeFile(changelogPath, [
        '# example-app-android',
        '',
        '## 1.4.0 (449) - 2026-11-01',
        '',
        '### FIXED',
        '',
        '- Fixed the current Android issue.',
        '',
        '## 1.3.0 (448) - 2026-10-01',
        '',
        '### FIXED',
        '',
        '- Fixed the older Android issue.',
        '',
      ].join('\n'), 'utf-8'),
    ]);

    process.chdir(projectDirectory);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      package: 'example-app-android',
      version: '1.3.0',
      add: true,
      category: 'fixed',
      message: 'An older Android issue no longer happens.',
    });

    const updatedGradle: Tests_Cli_Utility_ChangelogAndroid_UpdatedGradle = await readFile(gradlePath, 'utf-8');
    const changelogContent: Tests_Cli_Utility_ChangelogAndroid_ChangelogContent = await readFile(changelogPath, 'utf-8');

    strictEqual(updatedGradle.includes('versionCode = 449'), true);
    strictEqual(updatedGradle.includes('versionCode = 450'), false);
    strictEqual(changelogContent.includes('An older Android issue no longer happens.'), false);
    strictEqual(process.exitCode, 1);

    process.exitCode = undefined;

    return;
  });

  return;
});
