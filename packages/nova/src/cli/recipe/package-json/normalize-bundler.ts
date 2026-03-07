import chalk from 'chalk';

import {
  itemNormalizeBundlerRolesSideEffectsEsnext,
  itemNormalizeBundlerRolesTypesModule,
} from '@/lib/item.js';
import { NovaConfig } from '@/lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipePackageJsonNormalizeBundlerHandleReturns,
  CLIRecipePackageJsonNormalizeBundlerHandleWorkspace,
  CLIRecipePackageJsonNormalizeBundlerRunOptions,
  CLIRecipePackageJsonNormalizeBundlerRunReturns,
} from '@/types/cli/recipe/package-json/normalize-bundler.d.ts';

/**
 * CLI Recipe - package.json - Normalize Bundler.
 *
 * @since 1.0.0
 */
export class CLIRecipePackageJsonNormalizeBundler {
  /**
   * CLI Recipe - package.json - Normalize Bundler - Run.
   *
   * @param {CLIRecipePackageJsonNormalizeBundlerRunOptions} options - Options.
   *
   * @returns {CLIRecipePackageJsonNormalizeBundlerRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePackageJsonNormalizeBundlerRunOptions): CLIRecipePackageJsonNormalizeBundlerRunReturns {
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
        name: 'CLIRecipePackageJsonNormalizeBundler.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeBundler.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeBundler.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-bundler. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceRecipes = workspaceConfig.recipes;

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple = workspaceRecipes['normalize-bundler'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeBundler.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-bundler. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeBundler.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-bundler. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonNormalizeBundler.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-bundler.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeBundler.run',
        purpose: 'iteration',
      }).info(`Running normalize-bundler for the "${workspace.manifest.name}" workspace ...`);

      CLIRecipePackageJsonNormalizeBundler.handle(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - package.json - Normalize Bundler - Handle.
   *
   * @param {CLIRecipePackageJsonNormalizeBundlerHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonNormalizeBundlerHandleReturns}
   *
   * @since 1.0.0
   */
  private static handle(workspace: CLIRecipePackageJsonNormalizeBundlerHandleWorkspace): CLIRecipePackageJsonNormalizeBundlerHandleReturns {
    const fileContents = workspace.fileContents;
    const manifest = workspace.manifest;

    const packageTypes = fileContents['types'];
    const packageTypings = fileContents['typings'];
    const packageModule = fileContents['module'];
    const packageSideEffects = fileContents['sideEffects'];
    const packageEsnext = fileContents['esnext'];

    // Merge "typings" → "types" (same pattern as bundledDependencies → bundleDependencies).
    if (packageTypings !== undefined) {
      if (packageTypes !== undefined) {
        Logger.customize({
          name: 'CLIRecipePackageJsonNormalizeBundler.handle',
          purpose: 'typings',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Merging "typings" into "types". Keeping existing "types" value.`);
      } else {
        Logger.customize({
          name: 'CLIRecipePackageJsonNormalizeBundler.handle',
          purpose: 'typings',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Renaming "typings" to "types" ...`);

        Reflect.set(fileContents, 'types', packageTypings);
      }

      Reflect.deleteProperty(fileContents, 'typings');
    }

    // Roles that allow "types" and "module".
    const allowsTypesModule = itemNormalizeBundlerRolesTypesModule.includes(manifest.role);

    // Roles that allow "sideEffects" and "esnext".
    const allowsSideEffectsEsnext = itemNormalizeBundlerRolesSideEffectsEsnext.includes(manifest.role);

    // Sync the "types" field.
    if (
      fileContents['types'] !== undefined // Package "types" is defined (may have changed from typings merge).
      && allowsTypesModule === false // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeBundler.handle',
        purpose: 'types',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "types". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'types');
    }

    // Sync the "module" field.
    if (
      packageModule !== undefined // Package "module" is defined.
      && allowsTypesModule === false // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeBundler.handle',
        purpose: 'module',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "module". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'module');
    }

    // Sync the "sideEffects" field.
    if (
      packageSideEffects !== undefined // Package "sideEffects" is defined.
      && allowsSideEffectsEsnext === false // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeBundler.handle',
        purpose: 'sideEffects',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "sideEffects". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'sideEffects');
    }

    // Sync the "esnext" field.
    if (
      packageEsnext !== undefined // Package "esnext" is defined.
      && allowsSideEffectsEsnext === false // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonNormalizeBundler.handle',
        purpose: 'esnext',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "esnext". Workspace role "${manifest.role}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'esnext');
    }
  }
}
