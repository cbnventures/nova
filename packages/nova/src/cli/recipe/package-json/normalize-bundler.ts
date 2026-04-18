import chalk from 'chalk';

import {
  libItemSideEffectsEsnextRoles,
  libItemTypesModuleRoles,
} from '../../../lib/item.js';
import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliRecipePackageJsonNormalizeBundlerHandleAllowsSideEffectsEsnext,
  CliRecipePackageJsonNormalizeBundlerHandleAllowsTypesModule,
  CliRecipePackageJsonNormalizeBundlerHandleFileContents,
  CliRecipePackageJsonNormalizeBundlerHandleManifest,
  CliRecipePackageJsonNormalizeBundlerHandlePackageEsnext,
  CliRecipePackageJsonNormalizeBundlerHandlePackageModule,
  CliRecipePackageJsonNormalizeBundlerHandlePackageSideEffects,
  CliRecipePackageJsonNormalizeBundlerHandlePackageTypes,
  CliRecipePackageJsonNormalizeBundlerHandlePackageTypings,
  CliRecipePackageJsonNormalizeBundlerHandleReturns,
  CliRecipePackageJsonNormalizeBundlerHandleWorkspace,
  CliRecipePackageJsonNormalizeBundlerRunCurrentDirectory,
  CliRecipePackageJsonNormalizeBundlerRunEligibleWorkspaces,
  CliRecipePackageJsonNormalizeBundlerRunIsAtProjectRoot,
  CliRecipePackageJsonNormalizeBundlerRunIsDryRun,
  CliRecipePackageJsonNormalizeBundlerRunIsReplaceFile,
  CliRecipePackageJsonNormalizeBundlerRunOptions,
  CliRecipePackageJsonNormalizeBundlerRunRecipeTupleFilter,
  CliRecipePackageJsonNormalizeBundlerRunReplaceFileNotice,
  CliRecipePackageJsonNormalizeBundlerRunReturns,
  CliRecipePackageJsonNormalizeBundlerRunWorkingFile,
  CliRecipePackageJsonNormalizeBundlerRunWorkingFileWorkspaces,
  CliRecipePackageJsonNormalizeBundlerRunWorkspaceConfigFilter,
  CliRecipePackageJsonNormalizeBundlerRunWorkspaceRecipesFilter,
  CliRecipePackageJsonNormalizeBundlerRunWorkspaces,
} from '../../../types/cli/recipe/package-json/normalize-bundler.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Bundler.
 *
 * Enforces types, typings, module, sideEffects,
 * and esnext fields based on workspace role. Merges
 * the legacy typings alias into types.
 *
 * @since 0.14.0
 */
export class CliRecipePackageJsonNormalizeBundler {
  /**
   * CLI - Recipe - package.json - Normalize Bundler - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes bundler-specific
   * fields in each manifest. Supports dry-run mode.
   *
   * @param {CliRecipePackageJsonNormalizeBundlerRunOptions} options - Options.
   *
   * @returns {CliRecipePackageJsonNormalizeBundlerRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliRecipePackageJsonNormalizeBundlerRunOptions): CliRecipePackageJsonNormalizeBundlerRunReturns {
    const currentDirectory: CliRecipePackageJsonNormalizeBundlerRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipePackageJsonNormalizeBundlerRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipePackageJsonNormalizeBundlerRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliRecipePackageJsonNormalizeBundlerRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliRecipePackageJsonNormalizeBundlerRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliRecipePackageJsonNormalizeBundlerRunWorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: CliRecipePackageJsonNormalizeBundlerRunWorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-bundler. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: CliRecipePackageJsonNormalizeBundlerRunEligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: CliRecipePackageJsonNormalizeBundlerRunWorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: CliRecipePackageJsonNormalizeBundlerRunWorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: CliRecipePackageJsonNormalizeBundlerRunRecipeTupleFilter = workspaceRecipes['normalize-bundler'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-bundler. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: CliRecipePackageJsonNormalizeBundlerRunWorkspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-bundler. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CliRecipePackageJsonNormalizeBundler.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-bundler.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.run',
        purpose: 'iteration',
      }).info(`Running normalize-bundler for the "${workspace['manifest']['name']}" workspace ...`);

      CliRecipePackageJsonNormalizeBundler.handle(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Bundler - Handle.
   *
   * Processes types, typings, module, sideEffects, and esnext for one workspace. Allowed
   * fields depend on role lists from libItem constants.
   *
   * @param {CliRecipePackageJsonNormalizeBundlerHandleWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonNormalizeBundlerHandleReturns}
   *
   * @since 0.14.0
   */
  private static handle(workspace: CliRecipePackageJsonNormalizeBundlerHandleWorkspace): CliRecipePackageJsonNormalizeBundlerHandleReturns {
    const fileContents: CliRecipePackageJsonNormalizeBundlerHandleFileContents = workspace['fileContents'];
    const manifest: CliRecipePackageJsonNormalizeBundlerHandleManifest = workspace['manifest'];

    const packageTypes: CliRecipePackageJsonNormalizeBundlerHandlePackageTypes = fileContents['types'];
    const packageTypings: CliRecipePackageJsonNormalizeBundlerHandlePackageTypings = fileContents['typings'];
    const packageModule: CliRecipePackageJsonNormalizeBundlerHandlePackageModule = fileContents['module'];
    const packageSideEffects: CliRecipePackageJsonNormalizeBundlerHandlePackageSideEffects = fileContents['sideEffects'];
    const packageEsnext: CliRecipePackageJsonNormalizeBundlerHandlePackageEsnext = fileContents['esnext'];

    // Merge "typings" → "types" (same pattern as bundledDependencies → bundleDependencies).
    if (packageTypings !== undefined) {
      if (packageTypes !== undefined) {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeBundler.handle',
          purpose: 'typings',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Merging "typings" into "types". Keeping existing "types" value.`);
      } else {
        Logger.customize({
          name: 'CliRecipePackageJsonNormalizeBundler.handle',
          purpose: 'typings',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Renaming "typings" to "types" ...`);

        Reflect.set(fileContents, 'types', packageTypings);
      }

      Reflect.deleteProperty(fileContents, 'typings');
    }

    // Roles that allow "types" and "module".
    const allowsTypesModule: CliRecipePackageJsonNormalizeBundlerHandleAllowsTypesModule = libItemTypesModuleRoles.includes(manifest['role']);

    // Roles that allow "sideEffects" and "esnext".
    const allowsSideEffectsEsnext: CliRecipePackageJsonNormalizeBundlerHandleAllowsSideEffectsEsnext = libItemSideEffectsEsnextRoles.includes(manifest['role']);

    // Sync the "types" field.
    if (
      fileContents['types'] !== undefined // Package "types" is defined (may have changed from typings merge).
      && allowsTypesModule === false // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.handle',
        purpose: 'types',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "types". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'types');
    }

    // Sync the "module" field.
    if (
      packageModule !== undefined // Package "module" is defined.
      && allowsTypesModule === false // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.handle',
        purpose: 'module',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "module". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'module');
    }

    // Sync the "sideEffects" field.
    if (
      packageSideEffects !== undefined // Package "sideEffects" is defined.
      && allowsSideEffectsEsnext === false // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.handle',
        purpose: 'sideEffects',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "sideEffects". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'sideEffects');
    }

    // Sync the "esnext" field.
    if (
      packageEsnext !== undefined // Package "esnext" is defined.
      && allowsSideEffectsEsnext === false // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'CliRecipePackageJsonNormalizeBundler.handle',
        purpose: 'esnext',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "esnext". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'esnext');
    }

    return;
  }
}
