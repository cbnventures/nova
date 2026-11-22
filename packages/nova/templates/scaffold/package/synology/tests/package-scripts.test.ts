import { strictEqual } from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  chmod,
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  describe,
  it,
} from 'vitest';

import type {
  PackageScripts_BuildsAndChecksANoarchSpk_ArchiveHeader,
  PackageScripts_BuildsAndChecksANoarchSpk_BuildResult,
  PackageScripts_BuildsAndChecksANoarchSpk_CheckResult,
  PackageScripts_BuildsAndChecksANoarchSpk_FixtureDirectory,
  PackageScripts_BuildsAndChecksANoarchSpk_PackageJson,
  PackageScripts_BuildsAndChecksANoarchSpk_PackageJsonRaw,
  PackageScripts_BuildsAndChecksANoarchSpk_SpkPath,
  PackageScripts_CopyDirectory_DestinationDirectory,
  PackageScripts_CopyDirectory_DestinationPath,
  PackageScripts_CopyDirectory_Returns,
  PackageScripts_CopyDirectory_SourceDirectory,
  PackageScripts_CopyDirectory_SourcePath,
  PackageScripts_CreateFixture_DestinationPath,
  PackageScripts_CreateFixture_Entry,
  PackageScripts_CreateFixture_FixtureDirectory,
  PackageScripts_CreateFixture_Returns,
  PackageScripts_CreateFixture_SourcePath,
  PackageScripts_CreateFixture_SourceStats,
  PackageScripts_RejectsACgiScriptThatIsNotExecutable_CheckResult,
  PackageScripts_RejectsACgiScriptThatIsNotExecutable_FixtureDirectory,
  PackageScripts_RejectsAMissingDesktopIconSize_CheckResult,
  PackageScripts_RejectsAMissingDesktopIconSize_FixtureDirectory,
  PackageScripts_RejectsAnOldDsmMinimum_BadInfo,
  PackageScripts_RejectsAnOldDsmMinimum_CheckResult,
  PackageScripts_RejectsAnOldDsmMinimum_FixtureDirectory,
  PackageScripts_RejectsAnOldDsmMinimum_Info,
  PackageScripts_RejectsAWizardFieldWithoutAKey_CheckResult,
  PackageScripts_RejectsAWizardFieldWithoutAKey_FixtureDirectory,
  PackageScripts_RejectsAWizardFieldWithoutAKey_Wizard,
  PackageScripts_RejectsAWizardFieldWithoutAKey_WizardPath,
  PackageScripts_WorkspaceDirectory,
} from './types/package-scripts.test.d.ts';

/**
 * Package Scripts - Workspace Directory.
 *
 * Resolves the generated package workspace from this test module.
 * Fixture paths derive from this stable absolute directory.
 *
 * @since UNRELEASED
 */
const workspaceDirectory: PackageScripts_WorkspaceDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Package Scripts - Copy Directory.
 *
 * Copies a fixture directory using APIs supported by every tracked Node release.
 * Source modes are retained so lifecycle executability remains testable.
 *
 * @param {PackageScripts_CopyDirectory_SourceDirectory}      sourceDirectory      - Source directory.
 * @param {PackageScripts_CopyDirectory_DestinationDirectory} destinationDirectory - Destination directory.
 *
 * @returns {PackageScripts_CopyDirectory_Returns}
 *
 * @since UNRELEASED
 */
async function copyDirectory(sourceDirectory: PackageScripts_CopyDirectory_SourceDirectory, destinationDirectory: PackageScripts_CopyDirectory_DestinationDirectory): PackageScripts_CopyDirectory_Returns {
  await mkdir(destinationDirectory, { recursive: true });

  for (const directoryEntry of await readdir(sourceDirectory, { withFileTypes: true })) {
    const sourcePath: PackageScripts_CopyDirectory_SourcePath = join(sourceDirectory, directoryEntry.name);
    const destinationPath: PackageScripts_CopyDirectory_DestinationPath = join(destinationDirectory, directoryEntry.name);

    if (directoryEntry.isDirectory() === true) {
      await copyDirectory(sourcePath, destinationPath);
    } else {
      if (directoryEntry.isFile() === false) {
        throw new Error(`Cannot copy fixture entry "${sourcePath}": only regular files and directories are supported.`);
      }

      await copyFile(sourcePath, destinationPath);
      await chmod(destinationPath, (await stat(sourcePath)).mode);
    }
  }

  return;
}

/**
 * Package Scripts - Create Fixture.
 *
 * Copies the package inputs into a disposable directory so build tests never
 * modify the generated workspace.
 *
 * @returns {PackageScripts_CreateFixture_Returns}
 *
 * @since UNRELEASED
 */
async function createFixture(): PackageScripts_CreateFixture_Returns {
  const fixtureDirectory: PackageScripts_CreateFixture_FixtureDirectory = await mkdtemp(join(tmpdir(), 'synology-package-'));

  await mkdir(fixtureDirectory, { recursive: true });

  for (const fixtureEntry of [
    'INFO',
    'PACKAGE_ICON.PNG',
    'PACKAGE_ICON_256.PNG',
    'WIZARD_UIFILES',
    'conf',
    'package.json',
    'src',
    'scripts',
  ]) {
    const entry: PackageScripts_CreateFixture_Entry = fixtureEntry;
    const sourcePath: PackageScripts_CreateFixture_SourcePath = join(workspaceDirectory, entry);
    const destinationPath: PackageScripts_CreateFixture_DestinationPath = join(fixtureDirectory, entry);
    const sourceStats: PackageScripts_CreateFixture_SourceStats = await stat(sourcePath);

    if (sourceStats.isDirectory() === true) {
      await copyDirectory(sourcePath, destinationPath);
    } else {
      await copyFile(sourcePath, destinationPath);
      await chmod(destinationPath, sourceStats.mode);
    }
  }

  return fixtureDirectory;
}

/**
 * Package Scripts - Package Scripts.
 *
 * Exercises the generated build and check entry points as child processes.
 * The tests cover a valid archive, a rejected pre-DSM-7 minimum, a wizard
 * field without a key, a missing desktop icon size, and a CGI script that is
 * not executable.
 *
 * @since UNRELEASED
 */
describe('package scripts', () => {
  it('builds and checks a noarch SPK', async () => {
    const fixtureDirectory: PackageScripts_BuildsAndChecksANoarchSpk_FixtureDirectory = await createFixture();

    try {
      const buildResult: PackageScripts_BuildsAndChecksANoarchSpk_BuildResult = spawnSync(process.execPath, [
        join(workspaceDirectory, 'scripts', 'build-package.mjs'),
        fixtureDirectory,
      ], {
        encoding: 'utf-8',
      });

      strictEqual(buildResult.status, 0, buildResult.stderr);

      const checkResult: PackageScripts_BuildsAndChecksANoarchSpk_CheckResult = spawnSync(process.execPath, [
        join(workspaceDirectory, 'scripts', 'check-package.mjs'),
        fixtureDirectory,
      ], {
        encoding: 'utf-8',
      });

      strictEqual(checkResult.status, 0, checkResult.stderr);

      const packageJsonRaw: PackageScripts_BuildsAndChecksANoarchSpk_PackageJsonRaw = await readFile(join(fixtureDirectory, 'package.json'), 'utf-8');
      const packageJson: PackageScripts_BuildsAndChecksANoarchSpk_PackageJson = JSON.parse(packageJsonRaw) as PackageScripts_BuildsAndChecksANoarchSpk_PackageJson;
      const spkPath: PackageScripts_BuildsAndChecksANoarchSpk_SpkPath = join(fixtureDirectory, 'build', 'release', `${packageJson['name']}-${packageJson['version']}-noarch.spk`);
      const archiveHeader: PackageScripts_BuildsAndChecksANoarchSpk_ArchiveHeader = (await readFile(spkPath)).subarray(257, 263).toString('binary');

      strictEqual((await stat(spkPath)).isFile(), true);
      strictEqual(archiveHeader, 'ustar\0');
    } finally {
      await rm(fixtureDirectory, {
        force: true,
        recursive: true,
      });
    }

    return;
  });

  it('rejects an old DSM minimum', async () => {
    const fixtureDirectory: PackageScripts_RejectsAnOldDsmMinimum_FixtureDirectory = await createFixture();

    try {
      const info: PackageScripts_RejectsAnOldDsmMinimum_Info = await readFile(join(fixtureDirectory, 'INFO'), 'utf-8');
      const badInfo: PackageScripts_RejectsAnOldDsmMinimum_BadInfo = info.replace('os_min_ver="7.0-40000"', 'os_min_ver="6.2-25556"');

      await writeFile(join(fixtureDirectory, 'INFO'), badInfo, 'utf-8');

      const checkResult: PackageScripts_RejectsAnOldDsmMinimum_CheckResult = spawnSync(process.execPath, [
        join(workspaceDirectory, 'scripts', 'check-package.mjs'),
        fixtureDirectory,
      ], {
        encoding: 'utf-8',
      });

      strictEqual(checkResult.status, 1);
      strictEqual(checkResult.stderr.includes('INFO os_min_ver must be at least 7.0-40000.'), true);
    } finally {
      await rm(fixtureDirectory, {
        force: true,
        recursive: true,
      });
    }

    return;
  });

  it('rejects a wizard field without a key', async () => {
    const fixtureDirectory: PackageScripts_RejectsAWizardFieldWithoutAKey_FixtureDirectory = await createFixture();

    try {
      const wizardPath: PackageScripts_RejectsAWizardFieldWithoutAKey_WizardPath = join(fixtureDirectory, 'WIZARD_UIFILES', 'install_uifile');
      const wizard: PackageScripts_RejectsAWizardFieldWithoutAKey_Wizard = await readFile(wizardPath, 'utf-8');

      await writeFile(wizardPath, wizard.replace('"key": "wizard_greeting"', '"name": "wizard_greeting"'), 'utf-8');

      const checkResult: PackageScripts_RejectsAWizardFieldWithoutAKey_CheckResult = spawnSync(process.execPath, [
        join(workspaceDirectory, 'scripts', 'check-package.mjs'),
        fixtureDirectory,
      ], {
        encoding: 'utf-8',
      });

      strictEqual(checkResult.status, 1);
      strictEqual(checkResult.stderr.includes('Every field in WIZARD_UIFILES/install_uifile needs a "key" for the lifecycle scripts.'), true);
    } finally {
      await rm(fixtureDirectory, {
        force: true,
        recursive: true,
      });
    }

    return;
  });

  it('rejects a missing desktop icon size', async () => {
    const fixtureDirectory: PackageScripts_RejectsAMissingDesktopIconSize_FixtureDirectory = await createFixture();

    try {
      await rm(join(fixtureDirectory, 'src', 'ui', 'images', 'icon_24.png'));

      const checkResult: PackageScripts_RejectsAMissingDesktopIconSize_CheckResult = spawnSync(process.execPath, [
        join(workspaceDirectory, 'scripts', 'check-package.mjs'),
        fixtureDirectory,
      ], {
        encoding: 'utf-8',
      });

      strictEqual(checkResult.status, 1);
      strictEqual(checkResult.stderr.includes('icon_24.png'), true);
    } finally {
      await rm(fixtureDirectory, {
        force: true,
        recursive: true,
      });
    }

    return;
  });

  it('rejects a CGI script that is not executable', async () => {
    const fixtureDirectory: PackageScripts_RejectsACgiScriptThatIsNotExecutable_FixtureDirectory = await createFixture();

    try {
      await chmod(join(fixtureDirectory, 'src', 'ui', 'status.cgi'), Number.parseInt('644', 8));

      const checkResult: PackageScripts_RejectsACgiScriptThatIsNotExecutable_CheckResult = spawnSync(process.execPath, [
        join(workspaceDirectory, 'scripts', 'check-package.mjs'),
        fixtureDirectory,
      ], {
        encoding: 'utf-8',
      });

      strictEqual(checkResult.status, 1);
      strictEqual(checkResult.stderr.includes('src/ui/status.cgi must be executable; DSM runs it as a CGI script.'), true);
    } finally {
      await rm(fixtureDirectory, {
        force: true,
        recursive: true,
      });
    }

    return;
  });

  return;
});
