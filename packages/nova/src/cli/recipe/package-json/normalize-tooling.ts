import {
  dirname,
  join,
} from 'path';

import chalk from 'chalk';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  pathExists,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_FileContents,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_FilePath,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_HasBindingGyp,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Manifest,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageConfig,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageGypfile,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageScripts,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageWorkspaces,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Returns,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Workspace,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_IsEmpty_Returns,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_IsEmpty_Value,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_CurrentDirectory,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligibleWorkspaces,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsDryRun,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsReplaceFile,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Options,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_RecipeTupleFilter,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Returns,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkingFile,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkingFileWorkspaces,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkspaceConfigFilter,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkspaceRecipesFilter,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Workspaces,
} from '../../../types/cli/recipe/package-json/normalize-tooling.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Tooling.
 *
 * Enforces scripts, gypfile, config, and workspaces
 * fields based on workspace role. Ensures project-role
 * workspaces always have a workspaces array.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Recipe - package.json - Normalize Tooling - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes tooling fields in
   * each manifest. Supports dry-run and replace-file.
   *
   * @param {Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Options): Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_RecipeTupleFilter = workspaceRecipes['normalize-tooling'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-tooling.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'iteration',
      }).info(`Running normalize-tooling for the "${workspace['manifest']['name']}" workspace ...`);

      await Runner.handle(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Tooling - Handle.
   *
   * Processes scripts, gypfile, config, and workspaces for one workspace. Adds gypfile when
   * binding.gyp exists and no install scripts.
   *
   * @param {Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Returns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Workspace): Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Returns {
    const fileContents: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_FileContents = workspace['fileContents'];
    const filePath: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_FilePath = workspace['filePath'];
    const manifest: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Manifest = workspace['manifest'];

    const packageScripts: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageScripts = fileContents['scripts'];
    const packageGypfile: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageGypfile = fileContents['gypfile'];
    const packageConfig: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageConfig = fileContents['config'];
    const packageWorkspaces: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageWorkspaces = fileContents['workspaces'];

    const hasBindingGyp: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_HasBindingGyp = await pathExists(join(dirname(filePath), 'binding.gyp'));

    // Sync the "scripts" field.
    if (
      packageScripts === undefined // Package "scripts" is missing.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'scripts',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "scripts" as an empty object ...`);

      Reflect.set(fileContents, 'scripts', {});
    }

    // Sync the "gypfile" field.
    if (
      packageGypfile !== undefined // Package "gypfile" is defined.
      && hasBindingGyp === false // "binding.gyp" file is missing.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'gypfile',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "gypfile". No "binding.gyp" file is found.`);

      Reflect.deleteProperty(fileContents, 'gypfile');
    } else if (
      packageGypfile === undefined // Package "gypfile" is missing.
      && hasBindingGyp === true // "binding.gyp" file is present.
      && (
        isPlainObject(packageScripts) === false // Package "scripts" is not a plain object.
        || (
          isPlainObject(packageScripts) === true // Package "scripts" is a plain object.
          && packageScripts['preinstall'] === undefined // Package "scripts.preinstall" is missing.
          && packageScripts['install'] === undefined // Package "scripts.install" is missing.
        )
      )
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'gypfile',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "gypfile" as the npm default ...`);

      Reflect.set(fileContents, 'gypfile', true);
    }

    // Sync the "config" field.
    if (
      packageConfig !== undefined // Package "config" is defined.
      && Runner.isEmpty(packageConfig) === true // Package "config" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'config',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "config" ...`);

      Reflect.deleteProperty(fileContents, 'config');
    }

    // Sync the "workspaces" field.
    if (
      packageWorkspaces !== undefined // Package "workspaces" is defined.
      && manifest['role'] !== 'project' // Workspace role is not "project".
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'workspaces',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "workspaces". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'workspaces');
    } else if (
      manifest['role'] === 'project' // Workspace role is "project".
      && packageWorkspaces === undefined // Package "workspaces" is missing.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'workspaces',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "workspaces" as an empty array ...`);

      Reflect.set(fileContents, 'workspaces', []);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Tooling - Is Empty.
   *
   * Checks whether a value is null, undefined, a blank
   * string, an empty array, or an object with no keys.
   * Used by handle to decide when to remove fields.
   *
   * @param {Cli_Recipe_PackageJson_NormalizeTooling_Runner_IsEmpty_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeTooling_Runner_IsEmpty_Returns}
   *
   * @since 0.14.0
   */
  private static isEmpty(value: Cli_Recipe_PackageJson_NormalizeTooling_Runner_IsEmpty_Value): Cli_Recipe_PackageJson_NormalizeTooling_Runner_IsEmpty_Returns {
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
