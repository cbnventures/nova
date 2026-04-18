import {
  dirname,
  join,
} from 'path';

import chalk from 'chalk';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  pathExists,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliRecipePackageJsonNormalizeToolingHandleFileContents,
  CliRecipePackageJsonNormalizeToolingHandleFilePath,
  CliRecipePackageJsonNormalizeToolingHandleHasBindingGyp,
  CliRecipePackageJsonNormalizeToolingHandleManifest,
  CliRecipePackageJsonNormalizeToolingHandlePackageConfig,
  CliRecipePackageJsonNormalizeToolingHandlePackageGypfile,
  CliRecipePackageJsonNormalizeToolingHandlePackageScripts,
  CliRecipePackageJsonNormalizeToolingHandlePackageWorkspaces,
  CliRecipePackageJsonNormalizeToolingHandleReturns,
  CliRecipePackageJsonNormalizeToolingHandleWorkspace,
  CliRecipePackageJsonNormalizeToolingIsEmptyReturns,
  CliRecipePackageJsonNormalizeToolingIsEmptyValue,
  CliRecipePackageJsonNormalizeToolingRunCurrentDirectory,
  CliRecipePackageJsonNormalizeToolingRunEligibleWorkspaces,
  CliRecipePackageJsonNormalizeToolingRunIsAtProjectRoot,
  CliRecipePackageJsonNormalizeToolingRunIsDryRun,
  CliRecipePackageJsonNormalizeToolingRunIsReplaceFile,
  CliRecipePackageJsonNormalizeToolingRunOptions,
  CliRecipePackageJsonNormalizeToolingRunRecipeTupleFilter,
  CliRecipePackageJsonNormalizeToolingRunReplaceFileNotice,
  CliRecipePackageJsonNormalizeToolingRunReturns,
  CliRecipePackageJsonNormalizeToolingRunWorkingFile,
  CliRecipePackageJsonNormalizeToolingRunWorkingFileWorkspaces,
  CliRecipePackageJsonNormalizeToolingRunWorkspaceConfigFilter,
  CliRecipePackageJsonNormalizeToolingRunWorkspaceRecipesFilter,
  CliRecipePackageJsonNormalizeToolingRunWorkspaces,
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
export class CliRecipePackageJsonNormalizeTooling {
  /**
   * CLI - Recipe - package.json - Normalize Tooling - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes tooling fields in
   * each manifest. Supports dry-run and replace-file.
   *
   * @param {CliRecipePackageJsonNormalizeToolingRunOptions} options - Options.
   *
   * @returns {CliRecipePackageJsonNormalizeToolingRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliRecipePackageJsonNormalizeToolingRunOptions): CliRecipePackageJsonNormalizeToolingRunReturns {
    const currentDirectory: CliRecipePackageJsonNormalizeToolingRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipePackageJsonNormalizeToolingRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipePackageJsonNormalizeToolingRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliRecipePackageJsonNormalizeToolingRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeTooling.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliRecipePackageJsonNormalizeToolingRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeTooling.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliRecipePackageJsonNormalizeToolingRunWorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: CliRecipePackageJsonNormalizeToolingRunWorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeTooling.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: CliRecipePackageJsonNormalizeToolingRunEligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: CliRecipePackageJsonNormalizeToolingRunWorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: CliRecipePackageJsonNormalizeToolingRunWorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: CliRecipePackageJsonNormalizeToolingRunRecipeTupleFilter = workspaceRecipes['normalize-tooling'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeTooling.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: CliRecipePackageJsonNormalizeToolingRunWorkspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeTooling.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CliRecipePackageJsonNormalizeTooling.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-tooling.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeTooling.run',
        purpose: 'iteration',
      }).info(`Running normalize-tooling for the "${workspace['manifest']['name']}" workspace ...`);

      await CliRecipePackageJsonNormalizeTooling.handle(workspace);

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
   * @param {CliRecipePackageJsonNormalizeToolingHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeToolingHandleReturns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: CliRecipePackageJsonNormalizeToolingHandleWorkspace): CliRecipePackageJsonNormalizeToolingHandleReturns {
    const fileContents: CliRecipePackageJsonNormalizeToolingHandleFileContents = workspace['fileContents'];
    const filePath: CliRecipePackageJsonNormalizeToolingHandleFilePath = workspace['filePath'];
    const manifest: CliRecipePackageJsonNormalizeToolingHandleManifest = workspace['manifest'];

    const packageScripts: CliRecipePackageJsonNormalizeToolingHandlePackageScripts = fileContents['scripts'];
    const packageGypfile: CliRecipePackageJsonNormalizeToolingHandlePackageGypfile = fileContents['gypfile'];
    const packageConfig: CliRecipePackageJsonNormalizeToolingHandlePackageConfig = fileContents['config'];
    const packageWorkspaces: CliRecipePackageJsonNormalizeToolingHandlePackageWorkspaces = fileContents['workspaces'];

    const hasBindingGyp: CliRecipePackageJsonNormalizeToolingHandleHasBindingGyp = await pathExists(join(dirname(filePath), 'binding.gyp'));

    // Sync the "scripts" field.
    if (
      packageScripts === undefined // Package "scripts" is missing.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeTooling.handle',
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
        name: 'CliRecipePackageJsonNormalizeTooling.handle',
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
        name: 'CliRecipePackageJsonNormalizeTooling.handle',
        purpose: 'gypfile',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "gypfile" as the npm default ...`);

      Reflect.set(fileContents, 'gypfile', true);
    }

    // Sync the "config" field.
    if (
      packageConfig !== undefined // Package "config" is defined.
      && CliRecipePackageJsonNormalizeTooling.isEmpty(packageConfig) === true // Package "config" is empty.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeTooling.handle',
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
        name: 'CliRecipePackageJsonNormalizeTooling.handle',
        purpose: 'workspaces',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "workspaces". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'workspaces');
    } else if (
      manifest['role'] === 'project' // Workspace role is "project".
      && packageWorkspaces === undefined // Package "workspaces" is missing.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeTooling.handle',
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
   * @param {CliRecipePackageJsonNormalizeToolingIsEmptyValue} value - Value.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeToolingIsEmptyReturns}
   *
   * @since 0.14.0
   */
  private static isEmpty(value: CliRecipePackageJsonNormalizeToolingIsEmptyValue): CliRecipePackageJsonNormalizeToolingIsEmptyReturns {
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
