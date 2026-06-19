import chalk from 'chalk';

import {
  libItemSideEffectsEsnextRoles,
  libItemTypesModuleRoles,
} from '../../../lib/item.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_AllowsSideEffectsEsnext,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_AllowsTypesModule,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_FileContents,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Manifest,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageEsnext,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageModule,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageSideEffects,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageTypes,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageTypings,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Returns,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Workspace,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_CurrentDirectory,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_EligibleWorkspaces,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_IsDryRun,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_IsReplaceFile,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Options,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_RecipeTupleFilter,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Returns,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkingFile,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkingFileWorkspaces,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkspaceConfigFilter,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkspaceRecipesFilter,
  Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Workspaces,
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
export class Runner {
  /**
   * CLI - Recipe - package.json - Normalize Bundler - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes bundler-specific
   * fields in each manifest. Supports dry-run mode.
   *
   * @param {Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Options): Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-bundler. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_EligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfigFilter: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkspaceConfigFilter = workspace[1];
      const workspaceRecipesFilter: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkspaceRecipesFilter = workspaceConfigFilter['recipes'];

      if (workspaceRecipesFilter === undefined) {
        return false;
      }

      const recipeTupleFilter: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_RecipeTupleFilter = workspaceRecipesFilter['normalize-bundler'];

      if (recipeTupleFilter === undefined) {
        return false;
      }

      return recipeTupleFilter[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-bundler. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-bundler. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-bundler.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'iteration',
      }).info(`Running normalize-bundler for the "${workspace['manifest']['name']}" workspace ...`);

      Runner.handle(workspace);

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
   * @param {Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Returns}
   *
   * @since 0.14.0
   */
  private static handle(workspace: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Workspace): Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Returns {
    const fileContents: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_FileContents = workspace['fileContents'];
    const manifest: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Manifest = workspace['manifest'];

    const packageTypes: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageTypes = fileContents['types'];
    const packageTypings: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageTypings = fileContents['typings'];
    const packageModule: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageModule = fileContents['module'];
    const packageSideEffects: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageSideEffects = fileContents['sideEffects'];
    const packageEsnext: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageEsnext = fileContents['esnext'];

    // Merge "typings" -> "types" (same pattern as bundledDependencies -> bundleDependencies).
    if (packageTypings !== undefined) {
      if (packageTypes !== undefined) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'typings',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Merging "typings" into "types". Keeping existing "types" value.`);
      } else {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'typings',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Renaming "typings" to "types" ...`);

        Reflect.set(fileContents, 'types', packageTypings);
      }

      Reflect.deleteProperty(fileContents, 'typings');
    }

    // Roles that allow "types" and "module".
    const allowsTypesModule: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_AllowsTypesModule = libItemTypesModuleRoles.includes(manifest['role']);

    // Roles that allow "sideEffects" and "esnext".
    const allowsSideEffectsEsnext: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_AllowsSideEffectsEsnext = libItemSideEffectsEsnextRoles.includes(manifest['role']);

    // Sync the "types" field.
    if (
      fileContents['types'] !== undefined // Package "types" is defined (may have changed from typings merge).
      && allowsTypesModule === false // Workspace role does not allow it.
    ) {
      Logger.customize({
        name: 'Runner.handle',
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
        name: 'Runner.handle',
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
        name: 'Runner.handle',
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
        name: 'Runner.handle',
        purpose: 'esnext',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "esnext". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'esnext');
    }

    return;
  }
}
