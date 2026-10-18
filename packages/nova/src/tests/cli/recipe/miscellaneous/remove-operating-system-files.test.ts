import { strictEqual } from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import {
  mkdir,
  mkdtemp,
  realpath,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  beforeEach,
  describe,
  it,
} from 'vitest';

import { Runner as CliRecipeMiscellaneousRemoveOperatingSystemFiles } from '../../../../cli/recipe/miscellaneous/remove-operating-system-files.js';

import type {
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_AbortsWhenGitProtectionCannotBeRead_ConfigContents,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_AbortsWhenGitProtectionCannotBeRead_FilePath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_AbortsWhenGitProtectionCannotBeRead_GitDirectory,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_AbortsWhenGitProtectionCannotBeRead_ProjectDirectory,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_OriginalCwd,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_AppleDoublePath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_BuildFilePath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_ConfigContents,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_DesktopServicesStorePath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_EnhancedThumbnailDatabasePath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_EnhancedVistaThumbnailDatabasePath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_KeepPath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_LinkDirectory,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_LinkPath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_NodeModulesFilePath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_ProjectDirectory,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_ThumbnailDatabasePath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_UnselectedPath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_ConfigContents,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_ProjectDirectory,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_TrackedPath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_UntrackedDirectory,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_UntrackedPath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SandboxDirectory,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SandboxRoot,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SkipsWhenDisabled_ConfigContents,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SkipsWhenDisabled_FilePath,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SkipsWhenDisabled_ProjectDirectory,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_TemporaryDirectory,
  Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_TemporaryPrefix,
} from '../../../../types/tests/cli/recipe/miscellaneous/remove-operating-system-files.test.d.ts';

/**
 * Tests - CLI - Recipe - Miscellaneous - Remove Operating System Files - Run.
 *
 * @since 0.32.0
 */
describe('CliRecipeMiscellaneousRemoveOperatingSystemFiles.run', async () => {
  const originalCwd: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_TemporaryPrefix = join(temporaryDirectory, 'nova-operating-system-files-');
  const sandboxDirectory: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SandboxDirectory = await mkdtemp(temporaryPrefix);
  const sandboxRoot: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SandboxRoot = await realpath(sandboxDirectory);

  beforeEach(() => {
    process.chdir(sandboxRoot);
    process.exitCode = undefined;

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);
    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('skips when disabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SkipsWhenDisabled_ProjectDirectory = join(sandboxRoot, 'disabled');
    const filePath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SkipsWhenDisabled_FilePath = join(projectDirectory, '.DS_Store');
    const configContents: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_SkipsWhenDisabled_ConfigContents = JSON.stringify({
      recipes: {
        miscellaneous: {
          'remove-operating-system-files': {
            enabled: false,
            settings: {
              macos: { desktopServicesStore: true },
            },
          },
        },
      },
    });

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'package.json'), '{"name":"disabled"}', 'utf-8');
    await writeFile(join(projectDirectory, 'nova.config.json'), configContents, 'utf-8');
    await writeFile(filePath, '', 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeMiscellaneousRemoveOperatingSystemFiles.run({});

    strictEqual(existsSync(filePath), true);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('previews then removes only enabled safe files', async () => {
    const projectDirectory: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_ProjectDirectory = join(sandboxRoot, 'enabled');
    const linkDirectory: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_LinkDirectory = join(projectDirectory, 'linked');
    const configContents: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_ConfigContents = JSON.stringify({
      recipes: {
        miscellaneous: {
          'remove-operating-system-files': {
            enabled: true,
            settings: {
              linux: {},
              macos: {
                appleDouble: true,
                desktopServicesStore: true,
              },
              windows: {
                enhancedThumbnailDatabase: true,
                enhancedVistaThumbnailDatabase: true,
                thumbnailDatabase: true,
              },
            },
          },
        },
      },
    });
    const appleDoublePath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_AppleDoublePath = join(projectDirectory, 'assets', '._photo.png');
    const desktopServicesStorePath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_DesktopServicesStorePath = join(projectDirectory, 'assets', '.DS_Store');
    const enhancedThumbnailDatabasePath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_EnhancedThumbnailDatabasePath = join(projectDirectory, 'assets', 'EHTHUMBS.DB');
    const enhancedVistaThumbnailDatabasePath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_EnhancedVistaThumbnailDatabasePath = join(projectDirectory, 'assets', 'ehthumbs_vista.db');
    const thumbnailDatabasePath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_ThumbnailDatabasePath = join(projectDirectory, 'assets', 'Thumbs.db');
    const unselectedPath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_UnselectedPath = join(projectDirectory, 'assets', 'desktop.ini');
    const keepPath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_KeepPath = join(projectDirectory, 'assets', 'keep.txt');
    const buildFilePath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_BuildFilePath = join(projectDirectory, 'build', '.DS_Store');
    const nodeModulesFilePath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_NodeModulesFilePath = join(projectDirectory, 'node_modules', '.DS_Store');
    const linkPath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_PreviewsThenRemovesOnlyEnabledSafeFiles_LinkPath = join(linkDirectory, '.DS_Store');

    await mkdir(join(projectDirectory, 'assets'), { recursive: true });
    await mkdir(join(projectDirectory, 'build'), { recursive: true });
    await mkdir(join(projectDirectory, 'node_modules'), { recursive: true });
    await mkdir(linkDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'package.json'), '{"name":"enabled"}', 'utf-8');
    await writeFile(join(projectDirectory, 'nova.config.json'), configContents, 'utf-8');

    for (const filePath of [
      appleDoublePath,
      desktopServicesStorePath,
      enhancedThumbnailDatabasePath,
      enhancedVistaThumbnailDatabasePath,
      thumbnailDatabasePath,
      unselectedPath,
      keepPath,
      buildFilePath,
      nodeModulesFilePath,
    ]) {
      await writeFile(filePath, '', 'utf-8');
    }

    if (process.platform !== 'win32') {
      await symlink(keepPath, linkPath);
    }

    process.chdir(projectDirectory);

    await CliRecipeMiscellaneousRemoveOperatingSystemFiles.run({ dryRun: true });

    strictEqual(existsSync(appleDoublePath), true);
    strictEqual(existsSync(desktopServicesStorePath), true);
    strictEqual(existsSync(thumbnailDatabasePath), true);

    await CliRecipeMiscellaneousRemoveOperatingSystemFiles.run({});

    strictEqual(existsSync(appleDoublePath), false);
    strictEqual(existsSync(desktopServicesStorePath), false);
    strictEqual(existsSync(enhancedThumbnailDatabasePath), false);
    strictEqual(existsSync(enhancedVistaThumbnailDatabasePath), false);
    strictEqual(existsSync(thumbnailDatabasePath), false);
    strictEqual(existsSync(unselectedPath), true);
    strictEqual(existsSync(keepPath), true);
    strictEqual(existsSync(buildFilePath), true);
    strictEqual(existsSync(nodeModulesFilePath), true);
    if (process.platform !== 'win32') {
      strictEqual(existsSync(linkPath), true);
    }
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('protects Git-tracked files', async () => {
    const projectDirectory: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_ProjectDirectory = join(sandboxRoot, 'tracked');
    const untrackedDirectory: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_UntrackedDirectory = join(projectDirectory, 'nested');
    const trackedPath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_TrackedPath = join(projectDirectory, '.DS_Store');
    const untrackedPath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_UntrackedPath = join(untrackedDirectory, '.DS_Store');
    const configContents: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_ProtectsGitTrackedFiles_ConfigContents = JSON.stringify({
      recipes: {
        miscellaneous: {
          'remove-operating-system-files': {
            enabled: true,
            settings: {
              macos: { desktopServicesStore: true },
            },
          },
        },
      },
    });

    await mkdir(untrackedDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'package.json'), '{"name":"tracked"}', 'utf-8');
    await writeFile(join(projectDirectory, 'nova.config.json'), configContents, 'utf-8');
    await writeFile(trackedPath, '', 'utf-8');
    await writeFile(untrackedPath, '', 'utf-8');

    execFileSync('git', ['init'], {
      cwd: projectDirectory,
      stdio: 'ignore',
    });
    execFileSync('git', [
      'add',
      '.DS_Store',
    ], {
      cwd: projectDirectory,
      stdio: 'ignore',
    });

    process.chdir(projectDirectory);

    await CliRecipeMiscellaneousRemoveOperatingSystemFiles.run({});

    strictEqual(existsSync(trackedPath), true);
    strictEqual(existsSync(untrackedPath), false);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('aborts when Git protection cannot be read', async () => {
    const projectDirectory: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_AbortsWhenGitProtectionCannotBeRead_ProjectDirectory = join(sandboxRoot, 'invalid-git');
    const gitDirectory: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_AbortsWhenGitProtectionCannotBeRead_GitDirectory = join(projectDirectory, '.git');
    const filePath: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_AbortsWhenGitProtectionCannotBeRead_FilePath = join(projectDirectory, '.DS_Store');
    const configContents: Tests_Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_CliRecipeMiscellaneousRemoveOperatingSystemFilesRun_AbortsWhenGitProtectionCannotBeRead_ConfigContents = JSON.stringify({
      recipes: {
        miscellaneous: {
          'remove-operating-system-files': {
            enabled: true,
            settings: {
              macos: { desktopServicesStore: true },
            },
          },
        },
      },
    });

    await mkdir(gitDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'package.json'), '{"name":"invalid-git"}', 'utf-8');
    await writeFile(join(projectDirectory, 'nova.config.json'), configContents, 'utf-8');
    await writeFile(filePath, '', 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeMiscellaneousRemoveOperatingSystemFiles.run({});

    strictEqual(existsSync(filePath), true);
    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});
