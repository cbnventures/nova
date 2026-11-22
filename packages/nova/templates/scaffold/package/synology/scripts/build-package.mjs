import {
  chmod,
  copyFile,
  mkdir,
  readdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

import {
  collectTarEntries,
  createTar,
} from './archive.mjs';
import { lifecycleScripts } from './package-constants.mjs';

/**
 * Build Package - Script Path.
 *
 * Resolves this module for workspace discovery and direct-execution detection.
 * Importing the module therefore exposes helpers without starting a build.
 *
 * @since UNRELEASED
 */
const scriptPath = fileURLToPath(import.meta.url);

/**
 * Build Package - Directory Mode.
 *
 * Grants the package user traversal while keeping staged directories writable
 * only by their owner.
 *
 * @since UNRELEASED
 */
const directoryMode = Number.parseInt('755', 8);

/**
 * Build Package - Regular File Mode.
 *
 * Keeps metadata, icons, configuration, and archives non-executable.
 * Lifecycle scripts receive an executable mode separately.
 *
 * @since UNRELEASED
 */
const regularFileMode = Number.parseInt('644', 8);

/**
 * Build Package - Copy Staged File.
 *
 * Copies one source into the staging tree and applies an explicit archive mode.
 * Parent creation keeps callers focused on the package inventory.
 *
 * @param {string} sourcePath      - Source path.
 * @param {string} destinationPath - Destination path.
 * @param {number} mode            - Mode.
 *
 * @returns {Promise<void>}
 *
 * @since UNRELEASED
 */
async function copyStagedFile(sourcePath, destinationPath, mode) {
  await mkdir(dirname(destinationPath), { recursive: true });
  await copyFile(sourcePath, destinationPath);
  await chmod(destinationPath, mode);

  return;
}

/**
 * Build Package - Copy Configuration.
 *
 * Copies the required privilege file and an optional resource file.
 * Missing optional resources are ignored while every other error is preserved.
 *
 * @param {string} workspaceDirectory - Workspace directory.
 * @param {string} stagingDirectory   - Staging directory.
 *
 * @returns {Promise<void>}
 *
 * @since UNRELEASED
 */
async function copyConfiguration(workspaceDirectory, stagingDirectory) {
  const sourceDirectory = join(workspaceDirectory, 'conf');
  const destinationDirectory = join(stagingDirectory, 'conf');

  await mkdir(destinationDirectory, {
    recursive: true,
    mode: directoryMode,
  });
  await chmod(destinationDirectory, directoryMode);
  await copyStagedFile(join(sourceDirectory, 'privilege'), join(destinationDirectory, 'privilege'), regularFileMode);

  try {
    await copyStagedFile(join(sourceDirectory, 'resource'), join(destinationDirectory, 'resource'), regularFileMode);
  } catch (error) {
    if (
      error === null
      || typeof error !== 'object'
      || Reflect.get(error, 'code') !== 'ENOENT'
    ) {
      throw error;
    }
  }

  return;
}

/**
 * Build Package - Copy Wizard Files.
 *
 * Copies every install, upgrade, and uninstall wizard file DSM reads from the
 * archive root. Packages without a WIZARD_UIFILES directory are left unchanged.
 *
 * @param {string} workspaceDirectory - Workspace directory.
 * @param {string} stagingDirectory   - Staging directory.
 *
 * @returns {Promise<void>}
 *
 * @since UNRELEASED
 */
async function copyWizardFiles(workspaceDirectory, stagingDirectory) {
  const sourceDirectory = join(workspaceDirectory, 'WIZARD_UIFILES');
  const destinationDirectory = join(stagingDirectory, 'WIZARD_UIFILES');
  const wizardEntries = await readdir(sourceDirectory, { withFileTypes: true }).catch((error) => {
    if (
      error === null
      || typeof error !== 'object'
      || Reflect.get(error, 'code') !== 'ENOENT'
    ) {
      throw error;
    }

    return null;
  });

  if (wizardEntries === null) {
    return;
  }

  await mkdir(destinationDirectory, {
    recursive: true,
    mode: directoryMode,
  });
  await chmod(destinationDirectory, directoryMode);

  for (const wizardEntry of wizardEntries) {
    if (wizardEntry.isFile() === false) {
      throw new Error(`WIZARD_UIFILES/${wizardEntry.name} must be a regular file.`);
    }

    const mode = (wizardEntry.name.endsWith('.sh') === true) ? directoryMode : regularFileMode;

    await copyStagedFile(join(sourceDirectory, wizardEntry.name), join(destinationDirectory, wizardEntry.name), mode);
  }

  return;
}

/**
 * Build Package - Build Package.
 *
 * Creates package.tgz and the final uncompressed DSM SPK archive using only
 * Node.js core APIs.
 *
 * @param {string} workspaceDirectory - Workspace directory.
 *
 * @returns {Promise<string>}
 *
 * @since UNRELEASED
 */
export async function buildPackage(workspaceDirectory) {
  const packageJsonRaw = await readFile(join(workspaceDirectory, 'package.json'), 'utf-8');
  const packageJson = JSON.parse(packageJsonRaw);
  const packageName = packageJson['name'];
  const version = packageJson['version'];

  if (typeof packageName !== 'string' || packageName.trim() === '') {
    throw new Error('package.json must contain a non-empty package name.');
  }

  if (typeof version !== 'string' || version.trim() === '') {
    throw new Error('package.json must contain a non-empty package version.');
  }

  const buildDirectory = join(workspaceDirectory, 'build');
  const stagingDirectory = join(buildDirectory, 'stage');
  const releaseDirectory = join(buildDirectory, 'release');

  await rm(buildDirectory, {
    force: true,
    recursive: true,
  });
  await mkdir(stagingDirectory, {
    recursive: true,
    mode: directoryMode,
  });
  await mkdir(releaseDirectory, {
    recursive: true,
    mode: directoryMode,
  });

  const payloadEntries = await collectTarEntries(join(workspaceDirectory, 'src'));
  const payloadArchive = gzipSync(createTar(payloadEntries), { level: 9 });

  await copyStagedFile(join(workspaceDirectory, 'INFO'), join(stagingDirectory, 'INFO'), regularFileMode);
  await writeFile(join(stagingDirectory, 'package.tgz'), payloadArchive, { mode: regularFileMode });
  await chmod(join(stagingDirectory, 'package.tgz'), regularFileMode);
  await copyStagedFile(join(workspaceDirectory, 'PACKAGE_ICON.PNG'), join(stagingDirectory, 'PACKAGE_ICON.PNG'), regularFileMode);
  await copyStagedFile(join(workspaceDirectory, 'PACKAGE_ICON_256.PNG'), join(stagingDirectory, 'PACKAGE_ICON_256.PNG'), regularFileMode);
  await copyConfiguration(workspaceDirectory, stagingDirectory);
  await copyWizardFiles(workspaceDirectory, stagingDirectory);

  const stagedScriptsDirectory = join(stagingDirectory, 'scripts');

  await mkdir(stagedScriptsDirectory, {
    recursive: true,
    mode: directoryMode,
  });
  await chmod(stagedScriptsDirectory, directoryMode);

  for (const lifecycleScript of lifecycleScripts) {
    await copyStagedFile(
      join(workspaceDirectory, 'scripts', lifecycleScript),
      join(stagedScriptsDirectory, lifecycleScript),
      directoryMode,
    );
  }

  const spkEntries = await collectTarEntries(stagingDirectory);
  const spkPath = join(releaseDirectory, `${packageName}-${version}-noarch.spk`);

  await writeFile(spkPath, createTar(spkEntries), { mode: regularFileMode });
  await chmod(spkPath, regularFileMode);

  return spkPath;
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === scriptPath) {
  const workspaceDirectory = resolve(process.argv[2] ?? join(dirname(scriptPath), '..'));
  const spkPath = await buildPackage(workspaceDirectory);

  process.stdout.write(`Built Synology package "${spkPath}".\n`);
}
