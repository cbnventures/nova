import chalk from 'chalk';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_BinName,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_FileContents,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Manifest,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageBin,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageDirectories,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageFiles,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageMan,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageName,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Returns,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Workspace,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_FileContents,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Manifest,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_PackagePrivate,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_PackagePublishConfig,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_PrivateValue,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Returns,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Workspace,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_IsEmpty_Returns,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_IsEmpty_Value,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_CurrentDirectory,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_EligibleWorkspaces,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_IsDryRun,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_IsReplaceFile,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Options,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_RecipeTupleFilter,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Returns,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkingFile,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkingFileWorkspaces,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkspaceConfigFilter,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkspaceRecipesFilter,
  Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Workspaces,
} from '../../../types/cli/recipe/package-json/normalize-artifacts.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Artifacts.
 *
 * Enforces files, bin, man, and directories fields based on workspace role. Only package and
 * tool roles may keep artifact fields.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Recipe - package.json - Normalize Artifacts - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes artifact and publish
   * fields for each manifest. Supports dry-run.
   *
   * @param {Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Options): Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-artifacts. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_EligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_RecipeTupleFilter = workspaceRecipes['normalize-artifacts'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-artifacts. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-artifacts. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-artifacts.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'iteration',
      }).info(`Running normalize-artifacts for the "${workspace['manifest']['name']}" workspace ...`);

      await Runner.handle(workspace);

      await Runner.handlePublish(workspace);

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
   * @param {Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Returns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Workspace): Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Returns {
    const fileContents: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_FileContents = workspace['fileContents'];
    const manifest: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Manifest = workspace['manifest'];

    const packageFiles: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageFiles = fileContents['files'];
    const packageBin: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageBin = fileContents['bin'];
    const packageMan: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageMan = fileContents['man'];
    const packageDirectories: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageDirectories = fileContents['directories'];

    // Sync the "files" field.
    if (
      packageFiles !== undefined // Package "files" is defined.
      && [
        'package',
        'tool',
      ].includes(manifest['role']) === false // Workspace role is not "package" or "tool".
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'files',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "files". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'files');
    } else if (
      (
        manifest['role'] === 'package' // Workspace role is "package".
        || manifest['role'] === 'tool' // Workspace role is "tool".
      )
      && packageFiles !== undefined // Package "files" is defined.
      && Runner.isEmpty(packageFiles) === true // Package "files" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
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
        name: 'Runner.handle',
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
        const packageName: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageName = manifest['name'];
        const binName: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_BinName = (packageName.includes('/') === true) ? packageName.split('/').pop() : packageName;

        Logger.customize({
          name: 'Runner.handle',
          purpose: 'bin',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Normalizing "bin" from string to object ...`);

        Reflect.set(fileContents, 'bin', {
          [binName ?? packageName]: packageBin,
        });
      } else if (Runner.isEmpty(packageBin) === true) {
        Logger.customize({
          name: 'Runner.handle',
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
        name: 'Runner.handle',
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
          name: 'Runner.handle',
          purpose: 'man',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Normalizing "man" from string to array ...`);

        Reflect.set(fileContents, 'man', [packageMan]);
      } else if (Runner.isEmpty(packageMan) === true) {
        Logger.customize({
          name: 'Runner.handle',
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
        name: 'Runner.handle',
        purpose: 'directories',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "directories". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'directories');
    } else if (
      (
        manifest['role'] === 'package' // Workspace role is "package".
        || manifest['role'] === 'tool' // Workspace role is "tool".
      )
      && packageDirectories !== undefined // Package "directories" is defined.
      && Runner.isEmpty(packageDirectories) === true // Package "directories" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
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
   * @param {Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Returns}
   *
   * @since 0.14.0
   */
  private static async handlePublish(workspace: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Workspace): Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Returns {
    const fileContents: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_FileContents = workspace['fileContents'];
    const manifest: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Manifest = workspace['manifest'];

    const packagePrivate: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_PackagePrivate = fileContents['private'];
    const packagePublishConfig: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_PackagePublishConfig = fileContents['publishConfig'];

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
      const privateValue: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_PrivateValue = (manifest['policy'] !== 'distributable');

      Logger.customize({
        name: 'Runner.handlePublish',
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
        name: 'Runner.handlePublish',
        purpose: 'publishConfig',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "publishConfig". Workspace policy "${manifest['policy']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'publishConfig');
    } else if (
      manifest['policy'] === 'distributable' // Workspace policy is "distributable".
      && packagePublishConfig !== undefined // Package "publishConfig" is defined.
      && Runner.isEmpty(packagePublishConfig) === true // Package "publishConfig" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handlePublish',
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
   * @param {Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_IsEmpty_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_IsEmpty_Returns}
   *
   * @since 0.14.0
   */
  private static isEmpty(value: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_IsEmpty_Value): Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_IsEmpty_Returns {
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
