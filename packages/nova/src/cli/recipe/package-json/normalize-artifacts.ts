import chalk from 'chalk';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliRecipePackageJsonNormalizeArtifactsHandleBinName,
  CliRecipePackageJsonNormalizeArtifactsHandleFileContents,
  CliRecipePackageJsonNormalizeArtifactsHandleManifest,
  CliRecipePackageJsonNormalizeArtifactsHandlePackageBin,
  CliRecipePackageJsonNormalizeArtifactsHandlePackageDirectories,
  CliRecipePackageJsonNormalizeArtifactsHandlePackageFiles,
  CliRecipePackageJsonNormalizeArtifactsHandlePackageMan,
  CliRecipePackageJsonNormalizeArtifactsHandlePackageName,
  CliRecipePackageJsonNormalizeArtifactsHandlePublishFileContents,
  CliRecipePackageJsonNormalizeArtifactsHandlePublishManifest,
  CliRecipePackageJsonNormalizeArtifactsHandlePublishPackagePrivate,
  CliRecipePackageJsonNormalizeArtifactsHandlePublishPackagePublishConfig,
  CliRecipePackageJsonNormalizeArtifactsHandlePublishPrivateValue,
  CliRecipePackageJsonNormalizeArtifactsHandlePublishReturns,
  CliRecipePackageJsonNormalizeArtifactsHandlePublishWorkspace,
  CliRecipePackageJsonNormalizeArtifactsHandleReturns,
  CliRecipePackageJsonNormalizeArtifactsHandleWorkspace,
  CliRecipePackageJsonNormalizeArtifactsIsEmptyReturns,
  CliRecipePackageJsonNormalizeArtifactsIsEmptyValue,
  CliRecipePackageJsonNormalizeArtifactsRunCurrentDirectory,
  CliRecipePackageJsonNormalizeArtifactsRunEligibleWorkspaces,
  CliRecipePackageJsonNormalizeArtifactsRunIsAtProjectRoot,
  CliRecipePackageJsonNormalizeArtifactsRunIsDryRun,
  CliRecipePackageJsonNormalizeArtifactsRunIsReplaceFile,
  CliRecipePackageJsonNormalizeArtifactsRunOptions,
  CliRecipePackageJsonNormalizeArtifactsRunRecipeTupleFilter,
  CliRecipePackageJsonNormalizeArtifactsRunReplaceFileNotice,
  CliRecipePackageJsonNormalizeArtifactsRunReturns,
  CliRecipePackageJsonNormalizeArtifactsRunWorkingFile,
  CliRecipePackageJsonNormalizeArtifactsRunWorkingFileWorkspaces,
  CliRecipePackageJsonNormalizeArtifactsRunWorkspaceConfigFilter,
  CliRecipePackageJsonNormalizeArtifactsRunWorkspaceRecipesFilter,
  CliRecipePackageJsonNormalizeArtifactsRunWorkspaces,
} from '../../../types/cli/recipe/package-json/normalize-artifacts.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Artifacts.
 *
 * Enforces files, bin, man, and directories fields based on workspace role. Only package and
 * tool roles may keep artifact fields.
 *
 * @since 0.14.0
 */
export class CliRecipePackageJsonNormalizeArtifacts {
  /**
   * CLI - Recipe - package.json - Normalize Artifacts - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes artifact and publish
   * fields for each manifest. Supports dry-run.
   *
   * @param {CliRecipePackageJsonNormalizeArtifactsRunOptions} options - Options.
   *
   * @returns {CliRecipePackageJsonNormalizeArtifactsRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliRecipePackageJsonNormalizeArtifactsRunOptions): CliRecipePackageJsonNormalizeArtifactsRunReturns {
    const currentDirectory: CliRecipePackageJsonNormalizeArtifactsRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipePackageJsonNormalizeArtifactsRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipePackageJsonNormalizeArtifactsRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliRecipePackageJsonNormalizeArtifactsRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliRecipePackageJsonNormalizeArtifactsRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliRecipePackageJsonNormalizeArtifactsRunWorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: CliRecipePackageJsonNormalizeArtifactsRunWorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-artifacts. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: CliRecipePackageJsonNormalizeArtifactsRunEligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: CliRecipePackageJsonNormalizeArtifactsRunWorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: CliRecipePackageJsonNormalizeArtifactsRunWorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: CliRecipePackageJsonNormalizeArtifactsRunRecipeTupleFilter = workspaceRecipes['normalize-artifacts'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-artifacts. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: CliRecipePackageJsonNormalizeArtifactsRunWorkspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-artifacts. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CliRecipePackageJsonNormalizeArtifacts.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-artifacts.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.run',
        purpose: 'iteration',
      }).info(`Running normalize-artifacts for the "${workspace['manifest']['name']}" workspace ...`);

      await CliRecipePackageJsonNormalizeArtifacts.handle(workspace);

      await CliRecipePackageJsonNormalizeArtifacts.handlePublish(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Artifacts - Handle.
   *
   * Processes files, bin, man, and directories for one workspace. Normalizes bin strings to
   * objects and man strings to arrays for consistency.
   *
   * @param {CliRecipePackageJsonNormalizeArtifactsHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeArtifactsHandleReturns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: CliRecipePackageJsonNormalizeArtifactsHandleWorkspace): CliRecipePackageJsonNormalizeArtifactsHandleReturns {
    const fileContents: CliRecipePackageJsonNormalizeArtifactsHandleFileContents = workspace['fileContents'];
    const manifest: CliRecipePackageJsonNormalizeArtifactsHandleManifest = workspace['manifest'];

    const packageFiles: CliRecipePackageJsonNormalizeArtifactsHandlePackageFiles = fileContents['files'];
    const packageBin: CliRecipePackageJsonNormalizeArtifactsHandlePackageBin = fileContents['bin'];
    const packageMan: CliRecipePackageJsonNormalizeArtifactsHandlePackageMan = fileContents['man'];
    const packageDirectories: CliRecipePackageJsonNormalizeArtifactsHandlePackageDirectories = fileContents['directories'];

    // Sync the "files" field.
    if (
      packageFiles !== undefined // Package "files" is defined.
      && [
        'package',
        'tool',
      ].includes(manifest['role']) === false // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'files',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "files". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'files');
    } else if (
      (
        manifest['role'] === 'package' // Workspace role is "package".
        || manifest['role'] === 'tool' // Workspace role is "tool".
      )
      && packageFiles !== undefined // Package "files" is defined.
      && CliRecipePackageJsonNormalizeArtifacts.isEmpty(packageFiles) === true // Package "files" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'files',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "files" ...`);

      Reflect.deleteProperty(fileContents, 'files');
    }

    // Sync the "bin" field.
    if (
      packageBin !== undefined // Package "bin" is defined.
      && [
        'package',
        'tool',
      ].includes(manifest['role']) === false // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'bin',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "bin". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'bin');
    } else if (
      (
        manifest['role'] === 'package' // Workspace role is "package".
        || manifest['role'] === 'tool' // Workspace role is "tool".
      )
      && packageBin !== undefined // Package "bin" is defined.
    ) {
      if (
        typeof packageBin === 'string' // Package "bin" is a string.
      ) {
        const packageName: CliRecipePackageJsonNormalizeArtifactsHandlePackageName = manifest['name'];
        const binName: CliRecipePackageJsonNormalizeArtifactsHandleBinName = (packageName.includes('/') === true) ? packageName.split('/').pop() : packageName;

        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
          purpose: 'bin',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Normalizing "bin" from string to object ...`);

        Reflect.set(fileContents, 'bin', {
          [binName ?? packageName]: packageBin,
        });
      } else if (CliRecipePackageJsonNormalizeArtifacts.isEmpty(packageBin) === true) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
          purpose: 'bin',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "bin" ...`);

        Reflect.deleteProperty(fileContents, 'bin');
      }
    }

    // Sync the "man" field.
    if (
      packageMan !== undefined // Package "man" is defined.
      && [
        'package',
        'tool',
      ].includes(manifest['role']) === false // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'man',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "man". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'man');
    } else if (
      (
        manifest['role'] === 'package' // Workspace role is "package".
        || manifest['role'] === 'tool' // Workspace role is "tool".
      )
      && packageMan !== undefined // Package "man" is defined.
    ) {
      if (
        typeof packageMan === 'string' // Package "man" is a string.
      ) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
          purpose: 'man',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Normalizing "man" from string to array ...`);

        Reflect.set(fileContents, 'man', [packageMan]);
      } else if (CliRecipePackageJsonNormalizeArtifacts.isEmpty(packageMan) === true) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
          purpose: 'man',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "man" ...`);

        Reflect.deleteProperty(fileContents, 'man');
      }
    }

    // Sync the "directories" field.
    if (
      packageDirectories !== undefined // Package "directories" is defined.
      && [
        'package',
        'tool',
      ].includes(manifest['role']) === false // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'directories',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "directories". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'directories');
    } else if (
      (
        manifest['role'] === 'package' // Workspace role is "package".
        || manifest['role'] === 'tool' // Workspace role is "tool".
      )
      && packageDirectories !== undefined // Package "directories" is defined.
      && CliRecipePackageJsonNormalizeArtifacts.isEmpty(packageDirectories) === true // Package "directories" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.handle',
        purpose: 'directories',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "directories" ...`);

      Reflect.deleteProperty(fileContents, 'directories');
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Artifacts - Handle Publish.
   *
   * Syncs the private flag based on workspace policy and removes publishConfig for
   * non-distributable roles. Distributable ones set private to false.
   *
   * @param {CliRecipePackageJsonNormalizeArtifactsHandlePublishWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeArtifactsHandlePublishReturns}
   *
   * @since 0.14.0
   */
  private static async handlePublish(workspace: CliRecipePackageJsonNormalizeArtifactsHandlePublishWorkspace): CliRecipePackageJsonNormalizeArtifactsHandlePublishReturns {
    const fileContents: CliRecipePackageJsonNormalizeArtifactsHandlePublishFileContents = workspace['fileContents'];
    const manifest: CliRecipePackageJsonNormalizeArtifactsHandlePublishManifest = workspace['manifest'];

    const packagePrivate: CliRecipePackageJsonNormalizeArtifactsHandlePublishPackagePrivate = fileContents['private'];
    const packagePublishConfig: CliRecipePackageJsonNormalizeArtifactsHandlePublishPackagePublishConfig = fileContents['publishConfig'];

    // Sync the "private" field.
    if (
      typeof packagePrivate !== 'boolean' // Package "private" is not a boolean.
      || (
        manifest['policy'] === 'distributable' // Workspace policy is "distributable".
        && packagePrivate === true // Package "private" is "true".
      )
      || (
        manifest['policy'] !== 'distributable' // Workspace policy is not "distributable".
        && packagePrivate !== true // Package "private" is not "true".
      )
    ) {
      const privateValue: CliRecipePackageJsonNormalizeArtifactsHandlePublishPrivateValue = (manifest['policy'] !== 'distributable');

      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.handlePublish',
        purpose: 'private',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Syncing "private" to "${privateValue}" ...`);

      Reflect.set(fileContents, 'private', privateValue);
    }

    // Sync the "publishConfig" field.
    if (
      packagePublishConfig !== undefined // Package "publishConfig" is defined.
      && manifest['policy'] !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.handlePublish',
        purpose: 'publishConfig',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "publishConfig". Workspace policy "${manifest['policy']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'publishConfig');
    } else if (
      manifest['policy'] === 'distributable' // Workspace policy is "distributable".
      && packagePublishConfig !== undefined // Package "publishConfig" is defined.
      && CliRecipePackageJsonNormalizeArtifacts.isEmpty(packagePublishConfig) === true // Package "publishConfig" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeArtifacts.handlePublish',
        purpose: 'publishConfig',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "publishConfig" ...`);

      Reflect.deleteProperty(fileContents, 'publishConfig');
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Artifacts - Is Empty.
   *
   * Checks whether a value is null, undefined, a blank
   * string, an empty array, or an object with no keys.
   * Used by handle and handlePublish to prune fields.
   *
   * @param {CliRecipePackageJsonNormalizeArtifactsIsEmptyValue} value - Value.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeArtifactsIsEmptyReturns}
   *
   * @since 0.14.0
   */
  private static isEmpty(value: CliRecipePackageJsonNormalizeArtifactsIsEmptyValue): CliRecipePackageJsonNormalizeArtifactsIsEmptyReturns {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === 'string') {
      return value.trim() === '';
    }

    if (Array.isArray(value) === true) {
      return value.length === 0;
    }

    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }

    return false;
  }
}
