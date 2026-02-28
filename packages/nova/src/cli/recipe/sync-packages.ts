import {
  dirname,
  join,
  relative,
  sep,
} from 'path';

import chalk from 'chalk';

import { NodeReleases } from '@/api/node-releases.js';
import { SpdxLicenses } from '@/api/spdx-licenses.js';
import {
  itemPackageJsonKeysBundler,
  itemPackageJsonKeysCorepack,
  itemPackageJsonKeysNodeJs,
  itemPackageJsonKeysNpm,
  itemPackageJsonSortOrder,
} from '@/lib/item.js';
import { NovaConfig } from '@/lib/nova-config.js';
import {
  PATTERN_DIGITS,
  PATTERN_NAME_AT_VERSION,
  PATTERN_RANGE_CAPTURE_REMAINDER,
  PATTERN_RANGE_GREATER_EQUAL_MAJOR,
  PATTERN_RANGE_MAJOR,
  PATTERN_SEMVER_STRICT,
} from '@/lib/regex.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  pathExists,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipeSyncPackagesHandleArtifactsReturns,
  CLIRecipeSyncPackagesHandleArtifactsWorkspace,
  CLIRecipeSyncPackagesHandleBundlerReturns,
  CLIRecipeSyncPackagesHandleBundlerWorkspace,
  CLIRecipeSyncPackagesHandleCorepackReturns,
  CLIRecipeSyncPackagesHandleCorepackWorkspace,
  CLIRecipeSyncPackagesHandleDependenciesReturns,
  CLIRecipeSyncPackagesHandleDependenciesWorkspace,
  CLIRecipeSyncPackagesHandleEnvironmentReturns,
  CLIRecipeSyncPackagesHandleEnvironmentWorkspace,
  CLIRecipeSyncPackagesHandleIdentityNormalizedLicenseReference,
  CLIRecipeSyncPackagesHandleIdentityReturns,
  CLIRecipeSyncPackagesHandleIdentityWorkingFile,
  CLIRecipeSyncPackagesHandleIdentityWorkspace,
  CLIRecipeSyncPackagesHandleOwnershipReturns,
  CLIRecipeSyncPackagesHandleOwnershipWorkingFile,
  CLIRecipeSyncPackagesHandleOwnershipWorkspace,
  CLIRecipeSyncPackagesHandlePublishReturns,
  CLIRecipeSyncPackagesHandlePublishWorkspace,
  CLIRecipeSyncPackagesHandleReorderReordered,
  CLIRecipeSyncPackagesHandleReorderReturns,
  CLIRecipeSyncPackagesHandleReorderSortedKeys,
  CLIRecipeSyncPackagesHandleReorderWorkspace,
  CLIRecipeSyncPackagesHandleRuntimeReturns,
  CLIRecipeSyncPackagesHandleRuntimeWorkspace,
  CLIRecipeSyncPackagesHandleToolingReturns,
  CLIRecipeSyncPackagesHandleToolingWorkspace,
  CLIRecipeSyncPackagesHandleUnknownAllowedKeys,
  CLIRecipeSyncPackagesHandleUnknownReturns,
  CLIRecipeSyncPackagesHandleUnknownWorkspace,
  CLIRecipeSyncPackagesIsEmptyReturns,
  CLIRecipeSyncPackagesIsEmptyValue,
  CLIRecipeSyncPackagesRunOptions,
  CLIRecipeSyncPackagesRunReturns,
} from '@/types/cli/recipe/sync-packages.d.ts';

/**
 * CLI Recipe - Sync Packages.
 *
 * @since 1.0.0
 */
export class CLIRecipeSyncPackages {
  /**
   * CLI Recipe - Sync Packages - Run.
   *
   * @param {CLIRecipeSyncPackagesRunOptions} options - Options.
   *
   * @returns {CLIRecipeSyncPackagesRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipeSyncPackagesRunOptions): CLIRecipeSyncPackagesRunReturns {
    const currentDirectory = process.cwd();
    const isAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun = options.dryRun === true;
    const isIgnoreUnknown = options.ignoreUnknown === true;
    const isReplaceFile = options.replaceFile === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isIgnoreUnknown === true) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.run',
        purpose: 'options',
      }).warn('Ignore unknown enabled. Unknown keys from the "package.json" file will ignored.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipeSyncPackages.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.run',
        purpose: 'workspaces',
      }).warn('Skipping package sync. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: workingFileWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.run',
        purpose: 'workspaces',
      }).warn('Skipping package sync. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipeSyncPackages.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for syncing.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.run',
        purpose: 'iteration',
      }).info(`Syncing the "${workspace.manifest.name}" workspace ...`);

      // Remove unknown keys from the "package.json" file.
      if (isIgnoreUnknown !== true) {
        CLIRecipeSyncPackages.handleUnknown(workspace);
      }

      await CLIRecipeSyncPackages.handleIdentity(workspace, workingFile);
      CLIRecipeSyncPackages.handleOwnership(workspace, workingFile);
      CLIRecipeSyncPackages.handleRuntime(workspace);
      await CLIRecipeSyncPackages.handleArtifacts(workspace);
      await CLIRecipeSyncPackages.handlePublish(workspace);
      await CLIRecipeSyncPackages.handleTooling(workspace);
      CLIRecipeSyncPackages.handleCorepack(workspace);
      await CLIRecipeSyncPackages.handleEnvironment(workspace);
      await CLIRecipeSyncPackages.handleDependencies(workspace);
      CLIRecipeSyncPackages.handleBundler(workspace);
      CLIRecipeSyncPackages.handleReorder(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle identity.
   *
   * @param {CLIRecipeSyncPackagesHandleIdentityWorkspace}   workspace   - Workspace.
   * @param {CLIRecipeSyncPackagesHandleIdentityWorkingFile} workingFile - Working file.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleIdentityReturns}
   *
   * @since 1.0.0
   */
  private static async handleIdentity(workspace: CLIRecipeSyncPackagesHandleIdentityWorkspace, workingFile: CLIRecipeSyncPackagesHandleIdentityWorkingFile): CLIRecipeSyncPackagesHandleIdentityReturns {
    const { fileContents, filePath, manifest } = workspace;

    const packageName = fileContents['name'];
    const packageVersion = fileContents['version'];
    const packageDescription = fileContents['description'];
    const packageKeywords = fileContents['keywords'];
    const packageLicense = fileContents['license'];

    // Sync the "name" field.
    if (
      typeof packageName !== 'string' // Package "name" is not a string.
      || packageName !== manifest.name // Package "name" must match the workspace manifest name.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleIdentity',
        purpose: 'name',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "name" from workspace manifest ...`);

      Reflect.set(fileContents, 'name', manifest.name);
    }

    // Sync the "version" field.
    if (
      typeof packageVersion !== 'string' // Package "version" is not a string.
      || !PATTERN_SEMVER_STRICT.test(packageVersion) // Package "version" must be valid semver.
      || (
        ['freezable'].includes(manifest.policy) // Workspace policy is "freezable".
        && packageVersion !== '0.0.0' // Freezable workspaces must stay on "0.0.0".
      ) || (
        ['trackable', 'distributable'].includes(manifest.policy) // Workspace policy is "trackable" or "distributable".
        && packageVersion === '0.0.0' // "trackable" or "distributable" workspaces cannot stay on "0.0.0".
      )
    ) {
      const validVersion = (manifest.policy === 'freezable') ? '0.0.0' : '0.0.1';

      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleIdentity',
        purpose: 'version',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Invalid version detected. Setting it to "${validVersion}" ...`);

      Reflect.set(fileContents, 'version', validVersion);
    }

    // Sync the "description" field.
    if (
      packageDescription !== undefined // Package "description" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleIdentity',
        purpose: 'description',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "description". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'description');
    } else {
      const validDescription = (workingFile.project !== undefined && workingFile.project.description !== undefined) ? workingFile.project.description.short : undefined;

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && manifest.syncProperties !== undefined // Workspace sync properties is defined.
          && manifest.syncProperties.includes('description') // Workspace sync properties contains "description".
          && validDescription !== undefined // Nova config "project.description.short" setting is set.
        )
        && (
          typeof packageDescription !== 'string' // Package "description" is not a string.
          || packageDescription !== validDescription // Package "description" differs from "validDescription".
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleIdentity',
          purpose: 'description',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "description" from workspace manifest ...`);

        Reflect.set(fileContents, 'description', validDescription);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && manifest.syncProperties !== undefined // Workspace sync properties is defined.
        && manifest.syncProperties.includes('description') // Workspace sync properties contains "description".
        && validDescription === undefined // Nova config "project.description.short" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleIdentity',
          purpose: 'description',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "description". No description is defined.`);

        Reflect.deleteProperty(fileContents, 'description');
      }
    }

    // Sync the "keywords" field.
    if (
      packageKeywords !== undefined // Package "keywords" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleIdentity',
        purpose: 'keywords',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "keywords". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'keywords');
    } else {
      const validKeywords = (workingFile.project !== undefined) ? workingFile.project.keywords : undefined;

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && manifest.syncProperties !== undefined // Workspace sync properties is defined.
          && manifest.syncProperties.includes('keywords') // Workspace sync properties contains "keywords".
          && validKeywords !== undefined // Nova config "project.keywords" setting is set.
        )
        && (
          JSON.stringify(packageKeywords) !== JSON.stringify(validKeywords)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleIdentity',
          purpose: 'keywords',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "keywords" from workspace manifest ...`);

        Reflect.set(fileContents, 'keywords', validKeywords);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && manifest.syncProperties !== undefined // Workspace sync properties is defined.
        && manifest.syncProperties.includes('keywords') // Workspace sync properties contains "keywords".
        && validKeywords === undefined // Nova config "project.keywords" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleIdentity',
          purpose: 'keywords',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "keywords". No keywords are defined.`);

        Reflect.deleteProperty(fileContents, 'keywords');
      }
    }

    // Sync the "license" field.
    const spdxLicenses = await SpdxLicenses.fetchLicenses();

    if (
      typeof packageLicense !== 'string' // Package "license" is not a string.
      || (spdxLicenses !== undefined && !spdxLicenses.has(packageLicense)) // Package "license" is not within SPDX specification.
    ) {
      const packageDirectory = dirname(filePath);
      const projectRoot = process.cwd();
      const licenseCandidates = [
        join(packageDirectory, 'LICENSE'),
        join(packageDirectory, 'LICENSE.md'),
        join(projectRoot, 'LICENSE'),
        join(projectRoot, 'LICENSE.md'),
      ];

      let resolvedLicensePath;

      for (const candidate of licenseCandidates) {
        if (await pathExists(candidate)) {
          resolvedLicensePath = candidate;

          break;
        }
      }

      const relativeLicensePath = (resolvedLicensePath !== undefined) ? relative(packageDirectory, resolvedLicensePath) : undefined;
      let normalizedLicenseReference: CLIRecipeSyncPackagesHandleIdentityNormalizedLicenseReference;

      if (relativeLicensePath !== undefined) {
        normalizedLicenseReference = (relativeLicensePath.startsWith('.')) ? relativeLicensePath : `./${relativeLicensePath}`;
      }
      const fallbackLicense = (normalizedLicenseReference !== undefined) ? `SEE LICENSE IN ${normalizedLicenseReference}` : 'UNLICENSED';

      if (packageLicense === fallbackLicense) {
        return;
      }

      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleIdentity',
        purpose: 'license',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "license" to "${fallbackLicense}" ...`);

      Reflect.set(fileContents, 'license', fallbackLicense);
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle artifacts.
   *
   * @param {CLIRecipeSyncPackagesHandleArtifactsWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleArtifactsReturns}
   *
   * @since 1.0.0
   */
  private static async handleArtifacts(workspace: CLIRecipeSyncPackagesHandleArtifactsWorkspace): CLIRecipeSyncPackagesHandleArtifactsReturns {
    const { fileContents, manifest } = workspace;

    const packageFiles = fileContents['files'];
    const packageBin = fileContents['bin'];
    const packageMan = fileContents['man'];
    const packageDirectories = fileContents['directories'];

    // Sync the "files" field.
    if (
      packageFiles !== undefined // Package "files" is defined.
      && !['package', 'tool'].includes(manifest.role) // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleArtifacts',
        purpose: 'files',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "files". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'files');
    } else {
      if (
        (manifest.role === 'package' || manifest.role === 'tool') // Workspace role is "package" or "tool".
        && packageFiles !== undefined // Package "files" is defined.
        && CLIRecipeSyncPackages.isEmpty(packageFiles) // Package "files" is empty.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleArtifacts',
          purpose: 'files',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "files" ...`);

        Reflect.deleteProperty(fileContents, 'files');
      }
    }

    // Sync the "bin" field.
    if (
      packageBin !== undefined // Package "bin" is defined.
      && !['package', 'tool'].includes(manifest.role) // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleArtifacts',
        purpose: 'bin',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "bin". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'bin');
    } else {
      if (
        (manifest.role === 'package' || manifest.role === 'tool') // Workspace role is "package" or "tool".
        && packageBin !== undefined // Package "bin" is defined.
      ) {
        if (
          typeof packageBin === 'string' // Package "bin" is a string.
        ) {
          const packageName = manifest.name;
          const binName = (packageName.includes('/')) ? packageName.split('/').pop() : packageName;

          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleArtifacts',
            purpose: 'bin',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "bin" from string to object ...`);

          Reflect.set(fileContents, 'bin', {
            [binName ?? packageName]: packageBin,
          });
        } else if (CLIRecipeSyncPackages.isEmpty(packageBin)) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleArtifacts',
            purpose: 'bin',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "bin" ...`);

          Reflect.deleteProperty(fileContents, 'bin');
        }
      }
    }

    // Sync the "man" field.
    if (
      packageMan !== undefined // Package "man" is defined.
      && !['package', 'tool'].includes(manifest.role) // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleArtifacts',
        purpose: 'man',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "man". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'man');
    } else {
      if (
        (manifest.role === 'package' || manifest.role === 'tool') // Workspace role is "package" or "tool".
        && packageMan !== undefined // Package "man" is defined.
      ) {
        if (
          typeof packageMan === 'string' // Package "man" is a string.
        ) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleArtifacts',
            purpose: 'man',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "man" from string to array ...`);

          Reflect.set(fileContents, 'man', [packageMan]);
        } else if (CLIRecipeSyncPackages.isEmpty(packageMan)) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleArtifacts',
            purpose: 'man',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "man" ...`);

          Reflect.deleteProperty(fileContents, 'man');
        }
      }
    }

    // Sync the "directories" field.
    if (
      packageDirectories !== undefined // Package "directories" is defined.
      && !['package', 'tool'].includes(manifest.role) // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleArtifacts',
        purpose: 'directories',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "directories". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'directories');
    } else {
      if (
        (manifest.role === 'package' || manifest.role === 'tool') // Workspace role is "package" or "tool".
        && packageDirectories !== undefined // Package "directories" is defined.
        && CLIRecipeSyncPackages.isEmpty(packageDirectories) // Package "directories" is empty.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleArtifacts',
          purpose: 'directories',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "directories" ...`);

        Reflect.deleteProperty(fileContents, 'directories');
      }
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle publish.
   *
   * @param {CLIRecipeSyncPackagesHandlePublishWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandlePublishReturns}
   *
   * @since 1.0.0
   */
  private static async handlePublish(workspace: CLIRecipeSyncPackagesHandlePublishWorkspace): CLIRecipeSyncPackagesHandlePublishReturns {
    const { fileContents, manifest } = workspace;

    const packagePrivate = fileContents['private'];
    const packagePublishConfig = fileContents['publishConfig'];

    // Sync the "private" field.
    if (
      typeof packagePrivate !== 'boolean' // Package "private" is not a boolean.
      || (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && packagePrivate // Package "private" is "true"
      )
      || (
        manifest.policy !== 'distributable' // Workspace policy is not "distributable"
        && !packagePrivate // Package "private" is not "true".
      )
    ) {
      const privateValue = (manifest.policy !== 'distributable');

      Logger.customize({
        name: 'CLIRecipeSyncPackages.handlePublish',
        purpose: 'private',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "private" to "${privateValue}" ...`);

      Reflect.set(fileContents, 'private', privateValue);
    }

    // Sync the "publishConfig" field.
    if (
      packagePublishConfig !== undefined // Package "publishConfig" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handlePublish',
        purpose: 'publishConfig',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "publishConfig". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'publishConfig');
    } else {
      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && packagePublishConfig !== undefined // Package "publishConfig" is defined.
        && CLIRecipeSyncPackages.isEmpty(packagePublishConfig) // Package "publishConfig" is empty.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handlePublish',
          purpose: 'publishConfig',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "publishConfig" ...`);

        Reflect.deleteProperty(fileContents, 'publishConfig');
      }
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle tooling.
   *
   * @param {CLIRecipeSyncPackagesHandleToolingWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleToolingReturns}
   *
   * @since 1.0.0
   */
  private static async handleTooling(workspace: CLIRecipeSyncPackagesHandleToolingWorkspace): CLIRecipeSyncPackagesHandleToolingReturns {
    const { fileContents, filePath, manifest } = workspace;

    const packageScripts = fileContents['scripts'];
    const packageGypfile = fileContents['gypfile'];
    const packageConfig = fileContents['config'];
    const packageWorkspaces = fileContents['workspaces'];

    const hasBindingGyp = await pathExists(join(dirname(filePath), 'binding.gyp'));

    // Sync the "scripts" field.
    if (
      packageScripts === undefined // Package "scripts" is missing.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleTooling',
        purpose: 'scripts',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "scripts" as an empty object ...`);

      Reflect.set(fileContents, 'scripts', {});
    }

    // Sync the "gypfile" field.
    if (
      packageGypfile !== undefined // Package "gypfile" is defined.
      && !hasBindingGyp // "binding.gyp" file is missing.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleTooling',
        purpose: 'gypfile',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "gypfile". No "binding.gyp" file is found.`);

      Reflect.deleteProperty(fileContents, 'gypfile');
    } else {
      if (
        packageGypfile === undefined // Package "gypfile" is missing.
        && hasBindingGyp // "binding.gyp" file is present.
        && (
          !isPlainObject(packageScripts) // Package "scripts" is not a plain object.
          || (
            isPlainObject(packageScripts) // Package "scripts" is a plain object.
            && packageScripts['preinstall'] === undefined // Package "scripts.preinstall" is missing.
            && packageScripts['install'] === undefined // Package "scripts.install" is missing.
          )
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleTooling',
          purpose: 'gypfile',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "gypfile" as the npm default ...`);

        Reflect.set(fileContents, 'gypfile', true);
      }
    }

    // Sync the "config" field.
    if (
      packageConfig !== undefined // Package "config" is defined.
      && CLIRecipeSyncPackages.isEmpty(packageConfig) // Package "config" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleTooling',
        purpose: 'config',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "config" ...`);

      Reflect.deleteProperty(fileContents, 'config');
    }

    // Sync the "workspaces" field.
    if (
      packageWorkspaces !== undefined // Package "workspaces" is defined.
      && manifest.role !== 'project' // Workspace role is not "project".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleTooling',
        purpose: 'workspaces',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "workspaces". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'workspaces');
    } else {
      if (
        manifest.role === 'project' // Workspace role is "project".
        && packageWorkspaces === undefined // Package "workspaces" is missing.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleTooling',
          purpose: 'workspaces',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "workspaces" as an empty array ...`);

        Reflect.set(fileContents, 'workspaces', []);
      }
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle environment.
   *
   * @param {CLIRecipeSyncPackagesHandleEnvironmentWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleEnvironmentReturns}
   *
   * @since 1.0.0
   */
  private static async handleEnvironment(workspace: CLIRecipeSyncPackagesHandleEnvironmentWorkspace): CLIRecipeSyncPackagesHandleEnvironmentReturns {
    const { fileContents, manifest } = workspace;

    const packageEngines = fileContents['engines'];
    const packageOs = fileContents['os'];
    const packageCpu = fileContents['cpu'];
    const packageLibc = fileContents['libc'];
    const packageDevEngines = fileContents['devEngines'];

    // Sync the "engines" field (Required).
    const ltsConstraint = await NodeReleases.fetchLtsVersions();

    if (
      packageEngines === undefined // Package "engines" is missing.
    ) {
      if (ltsConstraint !== undefined) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleEnvironment',
          purpose: 'engines',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "engines" with "node" set to "${ltsConstraint}" ...`);

        Reflect.set(fileContents, 'engines', {
          node: ltsConstraint,
        });
      } else {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleEnvironment',
          purpose: 'engines',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "engines" as an empty object ...`);

        Reflect.set(fileContents, 'engines', {});
      }
    } else {
      if (
        isPlainObject(packageEngines) // Package "engines" is an object.
        && packageEngines['node'] === undefined // Package "engines.node" is missing.
        && ltsConstraint !== undefined // LTS constraint is available.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleEnvironment',
          purpose: 'engines',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "engines.node" set to "${ltsConstraint}" ...`);

        Reflect.set(packageEngines, 'node', ltsConstraint);
      }
    }

    // Warn if "engines.node" does not cover all active LTS versions (only when syncLtsEngines is enabled).
    if (
      manifest.syncLtsEngines === true // Workspace has opted into LTS engine sync.
      && isPlainObject(fileContents['engines']) // Package "engines" is an object.
      && typeof fileContents['engines']['node'] === 'string' // Package "engines.node" is a string.
      && ltsConstraint !== undefined // LTS constraint is available.
    ) {
      const existingNode = fileContents['engines']['node'];
      const ltsMatches = [...ltsConstraint.matchAll(new RegExp(PATTERN_DIGITS.source, 'g'))];

      if (ltsMatches.length > 0) {
        const ltsMajors = ltsMatches.map((match) => parseInt(match[0], 10));
        const branches = existingNode.split('||').map((branch) => branch.trim());

        // Check if every active LTS major is covered by at least one branch.
        const coversAll = ltsMajors.every((major) => {
          return branches.some((branch) => {
            // Wildcard: covers everything.
            if (branch === '*') {
              return true;
            }

            // >=N pattern: covers major if N <= major.
            const geMatch = branch.match(PATTERN_RANGE_GREATER_EQUAL_MAJOR);

            if (geMatch !== null) {
              return parseInt(geMatch[1] ?? '', 10) <= major;
            }

            // ^N, ~N, or N.x pattern: covers major if N === major.
            const majorMatch = branch.match(PATTERN_RANGE_MAJOR);

            if (majorMatch !== null) {
              return parseInt(majorMatch[1] ?? '', 10) === major;
            }

            return false;
          });
        });

        if (coversAll !== true) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleEnvironment',
            purpose: 'engines',
          }).warn(`${chalk.magenta(`"${manifest.name}" workspace`)} → "engines.node" is "${existingNode}" but must cover all active LTS versions (${ltsMajors.join(', ')}). Run "nova recipe sync-lts-engines" to update.`);
        }
      }
    }

    // Sync the "os" field (Conditional).
    if (
      packageOs !== undefined // Package "os" is defined.
      && CLIRecipeSyncPackages.isEmpty(packageOs) // Package "os" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleEnvironment',
        purpose: 'os',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "os" ...`);

      Reflect.deleteProperty(fileContents, 'os');
    }

    // Sync the "cpu" field (Conditional).
    if (
      packageCpu !== undefined // Package "cpu" is defined.
      && CLIRecipeSyncPackages.isEmpty(packageCpu) // Package "cpu" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleEnvironment',
        purpose: 'cpu',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "cpu" ...`);

      Reflect.deleteProperty(fileContents, 'cpu');
    }

    // Sync the "libc" field (Conditional).
    if (
      packageLibc !== undefined // Package "libc" is defined.
      && !(
        Array.isArray(fileContents['os']) // Package "os" is an array.
        && fileContents['os'].includes('linux') // Package "os" includes "linux".
      )
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleEnvironment',
        purpose: 'libc',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "libc". Package "os" does not include "linux".`);

      Reflect.deleteProperty(fileContents, 'libc');
    } else {
      if (
        packageLibc === undefined // Package "libc" is missing.
        && (
          Array.isArray(fileContents['os']) // Package "os" is an array.
          && fileContents['os'].includes('linux') // Package "os" includes "linux".
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleEnvironment',
          purpose: 'libc',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "libc" as "glibc" ...`);

        Reflect.set(fileContents, 'libc', ['glibc']);
      }
    }

    // Sync the "devEngines" field (Conditional).
    if (
      packageDevEngines !== undefined // Package "devEngines" is defined.
      && CLIRecipeSyncPackages.isEmpty(packageDevEngines) // Package "devEngines" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleEnvironment',
        purpose: 'devEngines',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "devEngines" ...`);

      Reflect.deleteProperty(fileContents, 'devEngines');
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle dependencies.
   *
   * @param {CLIRecipeSyncPackagesHandleDependenciesWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleDependenciesReturns}
   *
   * @since 1.0.0
   */
  private static async handleDependencies(workspace: CLIRecipeSyncPackagesHandleDependenciesWorkspace): CLIRecipeSyncPackagesHandleDependenciesReturns {
    const { fileContents, manifest } = workspace;

    const packageDependencies = fileContents['dependencies'];
    const packageDevDependencies = fileContents['devDependencies'];
    const packagePeerDependencies = fileContents['peerDependencies'];
    const packagePeerDependenciesMeta = fileContents['peerDependenciesMeta'];
    const packageBundleDependencies = fileContents['bundleDependencies'];
    const packageBundledDependencies = fileContents['bundledDependencies'];
    const packageOptionalDependencies = fileContents['optionalDependencies'];
    const packageOverrides = fileContents['overrides'];

    // Sync the "dependencies" field (Conditional).
    if (
      packageDependencies !== undefined // Package "dependencies" is defined.
      && CLIRecipeSyncPackages.isEmpty(packageDependencies) // Package "dependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleDependencies',
        purpose: 'dependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "dependencies" ...`);

      Reflect.deleteProperty(fileContents, 'dependencies');
    }

    // Sync the "devDependencies" field (Conditional).
    if (
      packageDevDependencies !== undefined // Package "devDependencies" is defined.
      && CLIRecipeSyncPackages.isEmpty(packageDevDependencies) // Package "devDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleDependencies',
        purpose: 'devDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "devDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'devDependencies');
    }

    // Sync the "peerDependencies" field (Conditional).
    if (
      packagePeerDependencies !== undefined // Package "peerDependencies" is defined.
      && CLIRecipeSyncPackages.isEmpty(packagePeerDependencies) // Package "peerDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleDependencies',
        purpose: 'peerDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "peerDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'peerDependencies');
    }

    // Sync the "peerDependenciesMeta" field (Conditional).
    if (
      packagePeerDependenciesMeta !== undefined // Package "peerDependenciesMeta" is defined.
      && CLIRecipeSyncPackages.isEmpty(packagePeerDependenciesMeta) // Package "peerDependenciesMeta" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleDependencies',
        purpose: 'peerDependenciesMeta',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "peerDependenciesMeta" ...`);

      Reflect.deleteProperty(fileContents, 'peerDependenciesMeta');
    }

    // Sync the "bundledDependencies" → "bundleDependencies" merge.
    if (
      packageBundledDependencies !== undefined // Package "bundledDependencies" is defined.
    ) {
      const bundleDependencies = Array.isArray(packageBundleDependencies) ? packageBundleDependencies : [];
      const bundledDependencies = Array.isArray(packageBundledDependencies) ? packageBundledDependencies : [];
      const mergedBundleDependencies = [...new Set([...bundleDependencies, ...bundledDependencies])];

      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleDependencies',
        purpose: 'bundleDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Merging "bundledDependencies" into "bundleDependencies" ...`);

      Reflect.set(fileContents, 'bundleDependencies', mergedBundleDependencies);

      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleDependencies',
        purpose: 'bundledDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "bundledDependencies". "bundledDependencies" is an alias of "bundleDependencies".`);

      Reflect.deleteProperty(fileContents, 'bundledDependencies');
    }

    // Sync the "bundleDependencies" field (Conditional).
    if (
      fileContents['bundleDependencies'] !== undefined // Package "bundleDependencies" is defined.
      && CLIRecipeSyncPackages.isEmpty(fileContents['bundleDependencies']) // Package "bundleDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleDependencies',
        purpose: 'bundleDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "bundleDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'bundleDependencies');
    }

    // Sync the "optionalDependencies" field (Conditional).
    if (
      packageOptionalDependencies !== undefined // Package "optionalDependencies" is defined.
      && CLIRecipeSyncPackages.isEmpty(packageOptionalDependencies) // Package "optionalDependencies" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleDependencies',
        purpose: 'optionalDependencies',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "optionalDependencies" ...`);

      Reflect.deleteProperty(fileContents, 'optionalDependencies');
    }

    // Sync the "overrides" field (Conditional).
    if (
      packageOverrides !== undefined // Package "overrides" is defined.
      && CLIRecipeSyncPackages.isEmpty(packageOverrides) // Package "overrides" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleDependencies',
        purpose: 'overrides',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing empty "overrides" ...`);

      Reflect.deleteProperty(fileContents, 'overrides');
    }

    // Warn about unpinned dependency versions (only when pinVersions is enabled).
    if (manifest.pinVersions === true) {
      const depGroups = [
        'dependencies',
        'devDependencies',
      ];

      for (const depGroup of depGroups) {
        const deps = fileContents[depGroup];

        if (!isPlainObject(deps)) {
          continue;
        }

        for (const [depName, depVersion] of Object.entries(deps)) {
          if (typeof depVersion !== 'string') {
            continue;
          }

          if (PATTERN_RANGE_CAPTURE_REMAINDER.test(depVersion)) {
            Logger.customize({
              name: 'CLIRecipeSyncPackages.handleDependencies',
              purpose: depGroup,
            }).warn(`${chalk.magenta(`"${manifest.name}" workspace`)} → "${depName}" has unpinned version "${depVersion}". Run "nova recipe pin-versions" to fix.`);
          }
        }
      }
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle unknown.
   *
   * @param {CLIRecipeSyncPackagesHandleUnknownWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleUnknownReturns}
   *
   * @since 1.0.0
   */
  private static handleUnknown(workspace: CLIRecipeSyncPackagesHandleUnknownWorkspace): CLIRecipeSyncPackagesHandleUnknownReturns {
    const allowedKeys: CLIRecipeSyncPackagesHandleUnknownAllowedKeys = new Set([
      ...itemPackageJsonKeysBundler,
      ...itemPackageJsonKeysCorepack,
      ...itemPackageJsonKeysNodeJs,
      ...itemPackageJsonKeysNpm,
    ]);
    const manifestContents = workspace.fileContents ?? {};
    const manifestKeys = Object.keys(manifestContents);
    const unknownKeys = manifestKeys.filter((key) => !allowedKeys.has(key));

    if (unknownKeys.length === 0) {
      return;
    }

    Logger.customize({
      name: 'CLIRecipeSyncPackages.handleUnknown',
      purpose: 'unsupported',
    }).warn([
      `Workspace "${workspace.manifest.name}" contains unsupported "package.json" key(s).`,
      'The unsupported keys are:',
      `- "${unknownKeys.join('"\n- "')}"`,
      'Review the references below:',
      '- https://cbnventures.github.io/nova/docs/cli/recipes/sync-packages#unsupported-keys',
    ].join('\n'));

    for (const unknownKey of unknownKeys) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleUnknown',
        purpose: 'removal',
      }).info(`Removing unsupported key "${unknownKey}" from workspace "${workspace.manifest.name}".`);

      Reflect.deleteProperty(manifestContents, unknownKey);
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle ownership.
   *
   * @param {CLIRecipeSyncPackagesHandleOwnershipWorkspace}   workspace   - Workspace.
   * @param {CLIRecipeSyncPackagesHandleOwnershipWorkingFile} workingFile - Working file.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleOwnershipReturns}
   *
   * @since 1.0.0
   */
  private static handleOwnership(workspace: CLIRecipeSyncPackagesHandleOwnershipWorkspace, workingFile: CLIRecipeSyncPackagesHandleOwnershipWorkingFile): CLIRecipeSyncPackagesHandleOwnershipReturns {
    const { fileContents, manifest } = workspace;

    const packageHomepage = fileContents['homepage'];
    const packageBugs = fileContents['bugs'];
    const packageAuthor = fileContents['author'];
    const packageContributors = fileContents['contributors'];
    const packageFundingSources = fileContents['funding'];
    const packageRepository = fileContents['repository'];

    // Sync the "homepage" field.
    if (
      packageHomepage !== undefined // Package "homepage" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleOwnership',
        purpose: 'homepage',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "homepage". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'homepage');
    } else {
      const validHomepage = (workingFile.urls !== undefined) ? workingFile.urls.homepage : undefined;

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && manifest.syncProperties !== undefined // Workspace sync properties is defined.
          && manifest.syncProperties.includes('homepage') // Workspace sync properties contains "homepage".
          && validHomepage !== undefined // Nova config "urls.homepage" setting is set.
        )
        && (
          typeof packageHomepage !== 'string' // Package "homepage" is not a string.
          || packageHomepage !== validHomepage // Package "homepage" differs from "validHomepage".
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'homepage',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "homepage" from workspace manifest ...`);

        Reflect.set(fileContents, 'homepage', validHomepage);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && manifest.syncProperties !== undefined // Workspace sync properties is defined.
        && manifest.syncProperties.includes('homepage') // Workspace sync properties contains "homepage".
        && validHomepage === undefined // Nova config "urls.homepage" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'homepage',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "homepage". No homepage is defined.`);

        Reflect.deleteProperty(fileContents, 'homepage');
      }
    }

    // Sync the "bugs" field.
    if (
      packageBugs !== undefined // Package "bugs" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleOwnership',
        purpose: 'bugs',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "bugs". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'bugs');
    } else {
      const validBugs = {
        email: (workingFile.emails !== undefined) ? workingFile.emails.bugs : undefined,
        url: (workingFile.urls !== undefined) ? workingFile.urls.bugs : undefined,
      };

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && manifest.syncProperties !== undefined // Workspace sync properties is defined.
          && manifest.syncProperties.includes('bugs') // Workspace sync properties contains "bugs".
          && (
            validBugs.email !== undefined // Nova config "bugs.email" setting is set.
            || validBugs.url !== undefined // Nova config "bugs.url" setting is set.
          )
        )
        && (
          JSON.stringify(packageBugs) !== JSON.stringify(validBugs)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'bugs',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "bugs" from workspace manifest ...`);

        Reflect.set(fileContents, 'bugs', validBugs);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && manifest.syncProperties !== undefined // Workspace sync properties is defined.
        && manifest.syncProperties.includes('bugs') // Workspace sync properties contains "bugs".
        && (
          validBugs.email === undefined // Nova config "bugs.email" setting is not set.
          && validBugs.url === undefined // Nova config "bugs.url" setting is not set.
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'bugs',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "bugs". No bug contacts are defined.`);

        Reflect.deleteProperty(fileContents, 'bugs');
      }
    }

    // Sync the "author" field.
    if (
      packageAuthor !== undefined // Package "author" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleOwnership',
        purpose: 'author',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "author". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'author');
    } else {
      const validAuthor = (() => {
        const entity = (workingFile.entities !== undefined) ? workingFile.entities.find((entity) => {
          return Array.isArray(entity.roles) && entity.roles.includes('author');
        }) : undefined;

        if (entity === undefined) {
          return {
            name: undefined,
            email: undefined,
            url: undefined,
          };
        }

        return {
          name: entity.name,
          email: entity.email,
          url: entity.url,
        };
      })();

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && manifest.syncProperties !== undefined // Workspace sync properties is defined.
          && manifest.syncProperties.includes('author') // Workspace sync properties contains "author".
          && (
            validAuthor.name !== undefined // Nova config "entities[0].name" setting is set.
            || validAuthor.email !== undefined // Nova config "entities[0].email" setting is set.
            || validAuthor.url !== undefined // Nova config "entities[0].url" setting is set.
          )
        )
        && (
          JSON.stringify(packageAuthor) !== JSON.stringify(validAuthor)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'author',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "author" from workspace manifest ...`);

        Reflect.set(fileContents, 'author', validAuthor);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && manifest.syncProperties !== undefined // Workspace sync properties is defined.
        && manifest.syncProperties.includes('author') // Workspace sync properties contains "author".
        && (
          validAuthor.name === undefined // Nova config "entities[0].name" setting is not set.
          && validAuthor.email === undefined // Nova config "entities[0].email" setting is not set.
          && validAuthor.url === undefined // Nova config "entities[0].url" setting is not set.
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'author',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "author". No author is defined.`);

        Reflect.deleteProperty(fileContents, 'author');
      }
    }

    // Sync the "contributors" field.
    if (
      packageContributors !== undefined // Package "contributors" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleOwnership',
        purpose: 'contributors',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "contributors". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'contributors');
    } else {
      const validContributors = (() => {
        const entities = workingFile.entities ?? [];

        return entities
          .filter((entity) => Array.isArray(entity.roles) && entity.roles.includes('contributor'))
          .map((entity) => ({
            name: entity.name,
            email: entity.email,
            url: entity.url,
          }))
          .filter((entity) => entity.name !== undefined || entity.email !== undefined || entity.url !== undefined);
      })();

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && manifest.syncProperties !== undefined // Workspace sync properties is defined.
          && manifest.syncProperties.includes('contributors') // Workspace sync properties contains "contributors".
          && (
            validContributors.length > 0 // Nova config "entities" has contributors.
          )
        )
        && (
          JSON.stringify(packageContributors) !== JSON.stringify(validContributors)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'contributors',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "contributors" from workspace manifest ...`);

        Reflect.set(fileContents, 'contributors', validContributors);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && manifest.syncProperties !== undefined // Workspace sync properties is defined.
        && manifest.syncProperties.includes('contributors') // Workspace sync properties contains "contributors".
        && (
          validContributors.length === 0 // Nova config "entities" has no contributors.
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'contributors',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "contributors". No contributors are defined.`);

        Reflect.deleteProperty(fileContents, 'contributors');
      }
    }

    // Sync the "funding" field.
    if (
      packageFundingSources !== undefined // Package "funding" sources is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleOwnership',
        purpose: 'funding',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "funding". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'funding');
    } else {
      const validFundingSources = (workingFile.urls !== undefined) ? workingFile.urls.fundSources : undefined;

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && manifest.syncProperties !== undefined // Workspace sync properties is defined.
          && manifest.syncProperties.includes('funding') // Workspace sync properties contains "funding".
          && validFundingSources !== undefined // Nova config "urls.fundSources" setting is set.
        )
        && (
          JSON.stringify(packageFundingSources) !== JSON.stringify(validFundingSources)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'funding',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "funding" from workspace manifest ...`);

        Reflect.set(fileContents, 'funding', validFundingSources);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && manifest.syncProperties !== undefined // Workspace sync properties is defined.
        && manifest.syncProperties.includes('funding') // Workspace sync properties contains "funding".
        && validFundingSources === undefined // Nova config "urls.fundSources" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'funding',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "funding". No funding sources are defined.`);

        Reflect.deleteProperty(fileContents, 'funding');
      }
    }

    // Sync the "repository" field.
    if (
      packageRepository !== undefined // Package "repository" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleOwnership',
        purpose: 'repository',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "repository". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'repository');
    } else {
      const validRepository = (() => {
        const repositoryUrl = (workingFile.urls !== undefined) ? workingFile.urls.repository : undefined;

        if (repositoryUrl === undefined) {
          return undefined;
        }

        const projectRoot = process.cwd();
        const packageDirectory = dirname(workspace.filePath);
        const repositoryDirectory = relative(projectRoot, packageDirectory).replaceAll(sep, '/');

        return {
          type: 'git',
          url: repositoryUrl,
          ...(repositoryDirectory !== '' && repositoryDirectory !== '.' ? {
            directory: repositoryDirectory,
          } : {}),
        };
      })();

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && manifest.syncProperties !== undefined // Workspace sync properties is defined.
          && manifest.syncProperties.includes('repository') // Workspace sync properties contains "repository".
          && validRepository !== undefined // Nova config "urls.repository" setting is set.
        )
        && (
          JSON.stringify(packageRepository) !== JSON.stringify(validRepository)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'repository',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "repository" from workspace manifest ...`);

        Reflect.set(fileContents, 'repository', validRepository);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && manifest.syncProperties !== undefined // Workspace sync properties is defined.
        && manifest.syncProperties.includes('repository') // Workspace sync properties contains "repository".
        && validRepository === undefined // Nova config "urls.repository" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleOwnership',
          purpose: 'repository',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "repository". No repository url is defined.`);

        Reflect.deleteProperty(fileContents, 'repository');
      }
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle runtime.
   *
   * @param {CLIRecipeSyncPackagesHandleRuntimeWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleRuntimeReturns}
   *
   * @since 1.0.0
   */
  private static handleRuntime(workspace: CLIRecipeSyncPackagesHandleRuntimeWorkspace): CLIRecipeSyncPackagesHandleRuntimeReturns {
    const { fileContents, manifest } = workspace;

    const packageExports = fileContents['exports'];
    const packageMain = fileContents['main'];
    const packageType = fileContents['type'];
    const packageBrowser = fileContents['browser'];
    const packageImports = fileContents['imports'];

    // Sync the "exports" field.
    if (
      packageExports !== undefined // Package "exports" is defined.
      && !['config', 'package', 'tool'].includes(manifest.role) // Workspace role is not "config", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleRuntime',
        purpose: 'exports',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "exports". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'exports');
    } else {
      if (
        manifest.role === 'config' // Workspace role is "config".
        || manifest.role === 'package' // Workspace role is "package".
        || manifest.role === 'tool' // Workspace role is "tool".
      ) {
        // If "exports" is a string, normalize it into an object.
        if (typeof packageExports === 'string') {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleRuntime',
            purpose: 'exports',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "exports" from string to object ...`);

          Reflect.set(fileContents, 'exports', {
            '.': {
              default: packageExports,
            },
          });
        }
      }
    }

    // Sync the "main" field.
    if (
      packageMain !== undefined // Package "main" is defined.
      && !['config', 'app', 'package', 'tool'].includes(manifest.role) // Workspace role is not "config", "app", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleRuntime',
        purpose: 'main',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "main". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'main');
    } else {
      if (
        manifest.role === 'config' // Workspace role is "config".
        || manifest.role === 'app' // Workspace role is "app".
        || manifest.role === 'package' // Workspace role is "package".
        || manifest.role === 'tool' // Workspace role is "tool".
      ) {
        const currentPackageExports = fileContents['exports'];

        if (
          typeof packageMain === 'string' // Package "main" is a string.
          && (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
            && typeof currentPackageExports['.']['require'] === 'string' // Package "exports['.'].require" is a string.
          )
          && packageMain !== currentPackageExports['.']['require'] // Package "main" differs from package "exports['.'].require".
        ) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleRuntime',
            purpose: 'main',
          }).warn(`${chalk.magenta(`"${manifest.name}" workspace`)} → "main" differs from "exports['.'].require". No changes applied.`);
        } else if (
          typeof packageMain === 'string' // Package "main" is a string.
          && (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
          )
          && typeof currentPackageExports['.']['require'] !== 'string' // Package "exports['.'].require" is not a string.
        ) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleRuntime',
            purpose: 'main',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "exports['.'].require" from "main" ...`);

          Reflect.set(currentPackageExports['.'], 'require', packageMain);
        } else if (
          (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
            && typeof currentPackageExports['.']['require'] === 'string' // Package "exports['.'].require" is a string.
          )
          && typeof packageMain !== 'string' // Package "main" is not a string.
        ) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleRuntime',
            purpose: 'main',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "main" from "exports['.'].require" ...`);

          Reflect.set(fileContents, 'main', currentPackageExports['.']['require']);
        } else if (
          typeof packageMain === 'string' // Package "main" is a string.
          && isPlainObject(currentPackageExports) // Package "exports" is an object.
          && typeof currentPackageExports['.'] === 'string' // Package "exports['.']" is a string.
        ) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleRuntime',
            purpose: 'main',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "exports['.']" from string to object ...`);

          Reflect.set(currentPackageExports, '.', {
            default: currentPackageExports['.'],
            require: packageMain,
          });
        }
      }
    }

    // Sync the "type" field.
    if (
      packageType !== undefined // Package "type" is defined.
      && !['config', 'app', 'package', 'tool'].includes(manifest.role) // Workspace role is not "config", "app", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleRuntime',
        purpose: 'type',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "type". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'type');
    }

    // Sync the "browser" field.
    if (
      packageBrowser !== undefined // Package "browser" is defined.
      && !['package'].includes(manifest.role) // Workspace role is not "package".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleRuntime',
        purpose: 'browser',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "browser". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'browser');
    } else {
      if (
        manifest.role === 'package' // Workspace role is "package".
      ) {
        const currentPackageExports = fileContents['exports'];

        if (
          typeof packageBrowser === 'string' // Package "browser" is a string.
          && (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
            && typeof currentPackageExports['.']['browser'] === 'string' // Package "exports['.'].browser" is a string.
          )
          && packageBrowser !== currentPackageExports['.']['browser'] // Package "browser" differs from "exports['.'].browser".
        ) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleRuntime',
            purpose: 'browser',
          }).warn(`${chalk.magenta(`"${manifest.name}" workspace`)} → "browser" differs from "exports['.'].browser". No changes applied.`);
        } else if (
          typeof packageBrowser === 'string' // Package "browser" is a string.
          && (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
          )
          && typeof currentPackageExports['.']['browser'] !== 'string' // Package "exports['.'].browser" is not a string.
        ) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleRuntime',
            purpose: 'browser',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "exports['.'].browser" from "browser" ...`);

          Reflect.set(currentPackageExports['.'], 'browser', packageBrowser);
        } else if (
          (
            isPlainObject(currentPackageExports) // Package "exports" is an object.
            && isPlainObject(currentPackageExports['.']) // Package "exports['.']" is an object.
            && typeof currentPackageExports['.']['browser'] === 'string' // Package "exports['.'].browser" is a string.
          )
          && typeof packageBrowser !== 'string' // Package "browser" is not a string.
          && !isPlainObject(packageBrowser) // Package "browser" is not a plain object.
        ) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleRuntime',
            purpose: 'browser',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "browser" from "exports['.'].browser" ...`);

          Reflect.set(fileContents, 'browser', currentPackageExports['.']['browser']);
        } else if (
          typeof packageBrowser === 'string' // Package "browser" is a string.
          && isPlainObject(currentPackageExports) // Package "exports" is an object.
          && typeof currentPackageExports['.'] === 'string' // Package "exports['.']" is a string.
        ) {
          Logger.customize({
            name: 'CLIRecipeSyncPackages.handleRuntime',
            purpose: 'browser',
          }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Normalizing "exports['.']" from string to object ...`);

          Reflect.set(currentPackageExports, '.', {
            default: currentPackageExports['.'],
            browser: packageBrowser,
          });
        }
      }
    }

    // Sync the "imports" field.
    if (
      packageImports !== undefined // Package "imports" is defined.
      && !['config', 'app', 'package', 'tool'].includes(manifest.role) // Workspace role is not "config", "app", "package", or "tool".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleRuntime',
        purpose: 'imports',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "imports". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'imports');
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle corepack.
   *
   * @param {CLIRecipeSyncPackagesHandleCorepackWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleCorepackReturns}
   *
   * @since 1.0.0
   */
  private static handleCorepack(workspace: CLIRecipeSyncPackagesHandleCorepackWorkspace): CLIRecipeSyncPackagesHandleCorepackReturns {
    const { fileContents, manifest } = workspace;

    const packageManager = fileContents['packageManager'];

    // Sync the "packageManager" field.
    if (
      packageManager !== undefined // Package "packageManager" is defined.
      && manifest.role !== 'project' // Workspace role is not "project".
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleCorepack',
        purpose: 'packageManager',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "packageManager". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'packageManager');
    } else {
      if (
        manifest.role === 'project' // Workspace role is "project".
        && packageManager !== undefined // Package "packageManager" is defined.
        && (
          typeof packageManager !== 'string' // Package "packageManager" is not a string.
          || !PATTERN_NAME_AT_VERSION.test(packageManager) // Package "packageManager" is not valid format (<name>@<version>).
        )
      ) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleCorepack',
          purpose: 'packageManager',
        }).warn(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "packageManager". Invalid format detected.`);

        Reflect.deleteProperty(fileContents, 'packageManager');
      }
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle bundler.
   *
   * @param {CLIRecipeSyncPackagesHandleBundlerWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleBundlerReturns}
   *
   * @since 1.0.0
   */
  private static handleBundler(workspace: CLIRecipeSyncPackagesHandleBundlerWorkspace): CLIRecipeSyncPackagesHandleBundlerReturns {
    const { fileContents, manifest } = workspace;

    const packageTypes = fileContents['types'];
    const packageTypings = fileContents['typings'];
    const packageModule = fileContents['module'];
    const packageSideEffects = fileContents['sideEffects'];
    const packageEsnext = fileContents['esnext'];

    // Merge "typings" → "types" (same pattern as bundledDependencies → bundleDependencies).
    if (packageTypings !== undefined) {
      if (packageTypes !== undefined) {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleBundler',
          purpose: 'typings',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Merging "typings" into "types". Keeping existing "types" value.`);
      } else {
        Logger.customize({
          name: 'CLIRecipeSyncPackages.handleBundler',
          purpose: 'typings',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Renaming "typings" to "types" ...`);

        Reflect.set(fileContents, 'types', packageTypings);
      }

      Reflect.deleteProperty(fileContents, 'typings');
    }

    // Roles that allow "types" and "module".
    const allowsTypesModule = ['config', 'package', 'tool'].includes(manifest.role);

    // Roles that allow "sideEffects" and "esnext".
    const allowsSideEffectsEsnext = ['package'].includes(manifest.role);

    // Sync the "types" field.
    if (
      fileContents['types'] !== undefined // Package "types" is defined (may have changed from typings merge).
      && !allowsTypesModule // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleBundler',
        purpose: 'types',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "types". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'types');
    }

    // Sync the "module" field.
    if (
      packageModule !== undefined // Package "module" is defined.
      && !allowsTypesModule // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleBundler',
        purpose: 'module',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "module". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'module');
    }

    // Sync the "sideEffects" field.
    if (
      packageSideEffects !== undefined // Package "sideEffects" is defined.
      && !allowsSideEffectsEsnext // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleBundler',
        purpose: 'sideEffects',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "sideEffects". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'sideEffects');
    }

    // Sync the "esnext" field.
    if (
      packageEsnext !== undefined // Package "esnext" is defined.
      && !allowsSideEffectsEsnext // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CLIRecipeSyncPackages.handleBundler',
        purpose: 'esnext',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "esnext". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'esnext');
    }
  }

  /**
   * CLI Recipe - Sync Packages - Handle reorder.
   *
   * @param {CLIRecipeSyncPackagesHandleReorderWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesHandleReorderReturns}
   *
   * @since 1.0.0
   */
  private static handleReorder(workspace: CLIRecipeSyncPackagesHandleReorderWorkspace): CLIRecipeSyncPackagesHandleReorderReturns {
    const { fileContents, manifest } = workspace;

    const sortedKeys: CLIRecipeSyncPackagesHandleReorderSortedKeys = new Set(itemPackageJsonSortOrder);
    const currentKeys = Object.keys(fileContents);
    const reordered: CLIRecipeSyncPackagesHandleReorderReordered = {};

    // Add known keys in sorted order.
    for (const key of itemPackageJsonSortOrder) {
      if (key in fileContents) {
        reordered[key] = fileContents[key];
      }
    }

    // Append unknown keys (preserving their original order).
    for (const key of currentKeys) {
      if (!sortedKeys.has(key)) {
        reordered[key] = fileContents[key];
      }
    }

    const reorderedKeys = Object.keys(reordered);

    // Skip if the key order is already correct.
    if (currentKeys.every((key, index) => key === reorderedKeys[index])) {
      return;
    }

    Logger.customize({
      name: 'CLIRecipeSyncPackages.handleReorder',
      purpose: 'reorder',
    }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Reordering "package.json" keys ...`);

    // Replace all keys in fileContents with reordered keys.
    for (const key of currentKeys) {
      Reflect.deleteProperty(fileContents, key);
    }

    for (const [key, value] of Object.entries(reordered)) {
      Reflect.set(fileContents, key, value);
    }
  }

  /**
   * CLI Recipe - Sync Packages - Is empty.
   *
   * @param {CLIRecipeSyncPackagesIsEmptyValue} value - Value.
   *
   * @private
   *
   * @returns {CLIRecipeSyncPackagesIsEmptyReturns}
   *
   * @since 1.0.0
   */
  private static isEmpty(value: CLIRecipeSyncPackagesIsEmptyValue): CLIRecipeSyncPackagesIsEmptyReturns {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === 'string') {
      return value.trim() === '';
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }

    return false;
  }
}
