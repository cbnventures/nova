import {
  dirname,
  join,
} from 'path';

import chalk from 'chalk';

import { NovaConfig } from '@/lib/nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  pathExists,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipePackageJsonNormalizeToolingHandleReturns,
  CLIRecipePackageJsonNormalizeToolingHandleWorkspace,
  CLIRecipePackageJsonNormalizeToolingIsEmptyReturns,
  CLIRecipePackageJsonNormalizeToolingIsEmptyValue,
  CLIRecipePackageJsonNormalizeToolingRunOptions,
  CLIRecipePackageJsonNormalizeToolingRunReturns,
} from '@/types/cli/recipe/package-json/normalize-tooling.d.ts';

/**
 * CLI Recipe - package.json - Normalize Tooling.
 *
 * @since 1.0.0
 */
export class CLIRecipePackageJsonNormalizeTooling {
  /**
   * CLI Recipe - package.json - Normalize Tooling - Run.
   *
   * @param {CLIRecipePackageJsonNormalizeToolingRunOptions} options - Options.
   *
   * @returns {CLIRecipePackageJsonNormalizeToolingRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePackageJsonNormalizeToolingRunOptions): CLIRecipePackageJsonNormalizeToolingRunReturns {
    const currentDirectory = process.cwd();
    const isAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun = options.dryRun === true;
    const isReplaceFile = options.replaceFile === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeTooling.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeTooling.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeTooling.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceRecipes = workspaceConfig.recipes;

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple = workspaceRecipes['normalize-tooling'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeTooling.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeTooling.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonNormalizeTooling.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-tooling.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeTooling.run',
        purpose: 'iteration',
      }).info(`Running normalize-tooling for the "${workspace.manifest.name}" workspace ...`);

      await CLIRecipePackageJsonNormalizeTooling.handle(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - package.json - Normalize Tooling - Handle.
   *
   * @param {CLIRecipePackageJsonNormalizeToolingHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeToolingHandleReturns}
   *
   * @since 1.0.0
   */
  private static async handle(workspace: CLIRecipePackageJsonNormalizeToolingHandleWorkspace): CLIRecipePackageJsonNormalizeToolingHandleReturns {
    const fileContents = workspace.fileContents;
    const filePath = workspace.filePath;
    const manifest = workspace.manifest;

    const packageScripts = fileContents['scripts'];
    const packageGypfile = fileContents['gypfile'];
    const packageConfig = fileContents['config'];
    const packageWorkspaces = fileContents['workspaces'];

    const workspaceDirectory = dirname(filePath);
    const bindingGypPath = join(workspaceDirectory, 'binding.gyp');
    const hasBindingGyp = await pathExists(bindingGypPath);

    // Sync the "scripts" field.
    if (
      packageScripts === undefined // Package "scripts" is missing.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeTooling.handle',
        purpose: 'scripts',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "scripts" as an empty object ...`);

      Reflect.set(fileContents, 'scripts', {});
    }

    // Sync the "gypfile" field.
    if (
      packageGypfile !== undefined // Package "gypfile" is defined.
      && hasBindingGyp === false // "binding.gyp" file is missing.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeTooling.handle',
        purpose: 'gypfile',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "gypfile". No "binding.gyp" file is found.`);

      Reflect.deleteProperty(fileContents, 'gypfile');
    } else {
      if (
        packageGypfile === undefined // Package "gypfile" is missing.
        && hasBindingGyp === true // "binding.gyp" file is present.
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
          name: 'CLIRecipePackageJsonNormalizeTooling.handle',
          purpose: 'gypfile',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "gypfile" as the npm default ...`);

        Reflect.set(fileContents, 'gypfile', true);
      }
    }

    // Sync the "config" field.
    if (
      packageConfig !== undefined // Package "config" is defined.
      && CLIRecipePackageJsonNormalizeTooling.isEmpty(packageConfig) // Package "config" is empty.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeTooling.handle',
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
        name: 'CLIRecipePackageJsonNormalizeTooling.handle',
        purpose: 'workspaces',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "workspaces". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'workspaces');
    } else {
      if (
        manifest.role === 'project' // Workspace role is "project".
        && packageWorkspaces === undefined // Package "workspaces" is missing.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonNormalizeTooling.handle',
          purpose: 'workspaces',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Adding "workspaces" as an empty array ...`);

        Reflect.set(fileContents, 'workspaces', []);
      }
    }
  }

  /**
   * CLI Recipe - package.json - Normalize Tooling - Is empty.
   *
   * @param {CLIRecipePackageJsonNormalizeToolingIsEmptyValue} value - Value.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeToolingIsEmptyReturns}
   *
   * @since 1.0.0
   */
  private static isEmpty(value: CLIRecipePackageJsonNormalizeToolingIsEmptyValue): CLIRecipePackageJsonNormalizeToolingIsEmptyReturns {
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
