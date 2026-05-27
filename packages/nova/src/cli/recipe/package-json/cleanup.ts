import chalk from 'chalk';

import { LIB_CONSTANTS_DOCS_BASE_URL } from '../../../lib/constants.js';
import {
  libItemBundlerKeys,
  libItemCorepackKeys,
  libItemEcosystemKeys,
  libItemNodeJsKeys,
  libItemNpmKeys,
  libItemSortOrderKeys,
} from '../../../lib/item.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_PackageJson_Cleanup_Runner_Handle_RemoveUnknownKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_Handle_Returns,
  Cli_Recipe_PackageJson_Cleanup_Runner_Handle_Workspace,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_CurrentKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_FileContents,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Keys,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Manifest,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Reordered,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_ReorderedKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Returns,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_SortedKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Value,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Workspace,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_AllowedKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_FormattedUnknownKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_ManifestContents,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_ManifestKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_Returns,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_UnknownKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_UnsupportedMessage,
  Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_Workspace,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_CleanupRecipe,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_CleanupRecipeSettings,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_CurrentDirectory,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_EligibleWorkspaces,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_IsDryRun,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_IsReplaceFile,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_Options,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_RecipeTupleFilter,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_RemoveUnknownKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_ReorderKeys,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_Returns,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkingFile,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkingFileWorkspaces,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfig,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfigEntry,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfigEntryRecipes,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfigFilter,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceRecipesFilter,
  Cli_Recipe_PackageJson_Cleanup_Runner_Run_Workspaces,
} from '../../../types/cli/recipe/package-json/cleanup.d.ts';

/**
 * CLI - Recipe - package.json - Cleanup.
 *
 * Final-pass recipe that removes unsupported keys and
 * reorders remaining keys to the canonical sort order.
 * Runs last in the recipe registry.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Recipe - package.json - Cleanup - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then applies key removal and
   * reordering per recipe settings. Supports dry-run mode.
   *
   * @param {Cli_Recipe_PackageJson_Cleanup_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_PackageJson_Cleanup_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Recipe_PackageJson_Cleanup_Runner_Run_Options): Cli_Recipe_PackageJson_Cleanup_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_PackageJson_Cleanup_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_PackageJson_Cleanup_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_PackageJson_Cleanup_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_PackageJson_Cleanup_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_PackageJson_Cleanup_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping cleanup. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: Cli_Recipe_PackageJson_Cleanup_Runner_Run_EligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: Cli_Recipe_PackageJson_Cleanup_Runner_Run_RecipeTupleFilter = workspaceRecipes['cleanup'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping cleanup. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: Cli_Recipe_PackageJson_Cleanup_Runner_Run_Workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping cleanup. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for cleanup.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      const workspaceConfig: Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfig = eligibleWorkspaces.find((eligible) => eligible[1]['name'] === workspace['manifest']['name']);

      if (workspaceConfig === undefined) {
        continue;
      }

      const workspaceConfigEntry: Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfigEntry = workspaceConfig[1];
      const workspaceConfigEntryRecipes: Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfigEntryRecipes = workspaceConfigEntry['recipes'];

      let removeUnknownKeys: Cli_Recipe_PackageJson_Cleanup_Runner_Run_RemoveUnknownKeys = true;
      let reorderKeys: Cli_Recipe_PackageJson_Cleanup_Runner_Run_ReorderKeys = true;

      if (workspaceConfigEntryRecipes !== undefined) {
        const cleanupRecipe: Cli_Recipe_PackageJson_Cleanup_Runner_Run_CleanupRecipe = workspaceConfigEntryRecipes['cleanup'];

        if (cleanupRecipe !== undefined) {
          const cleanupRecipeSettings: Cli_Recipe_PackageJson_Cleanup_Runner_Run_CleanupRecipeSettings = cleanupRecipe[1];

          if (cleanupRecipeSettings !== undefined) {
            removeUnknownKeys = cleanupRecipeSettings['removeUnknownKeys'] !== false;
            reorderKeys = cleanupRecipeSettings['reorderKeys'] !== false;
          }
        }
      }

      Logger.customize({
        name: 'Runner.run',
        purpose: 'iteration',
      }).info(`Running cleanup for the "${workspace['manifest']['name']}" workspace ...`);

      Runner.handle(workspace, removeUnknownKeys, reorderKeys);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Cleanup - Handle.
   *
   * Orchestrates the two cleanup phases for a single
   * workspace: unknown key removal and key reordering.
   * Either phase can be disabled via recipe settings.
   *
   * @param {Cli_Recipe_PackageJson_Cleanup_Runner_Handle_Workspace}         workspace         - Workspace.
   * @param {Cli_Recipe_PackageJson_Cleanup_Runner_Handle_RemoveUnknownKeys} removeUnknownKeys - Remove unknown keys.
   * @param {Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Keys}       reorderKeys       - Reorder keys.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_Cleanup_Runner_Handle_Returns}
   *
   * @since 0.14.0
   */
  private static handle(workspace: Cli_Recipe_PackageJson_Cleanup_Runner_Handle_Workspace, removeUnknownKeys: Cli_Recipe_PackageJson_Cleanup_Runner_Handle_RemoveUnknownKeys, reorderKeys: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Keys): Cli_Recipe_PackageJson_Cleanup_Runner_Handle_Returns {
    if (removeUnknownKeys === true) {
      Runner.handleUnknown(workspace);
    }

    if (reorderKeys === true) {
      Runner.handleReorder(workspace);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Cleanup - Handle Reorder.
   *
   * Reorders package.json keys to match the canonical sort order defined in
   * libItemSortOrderKeys. Unknown keys are appended after all known keys.
   *
   * @param {Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Returns}
   *
   * @since 0.14.0
   */
  private static handleReorder(workspace: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Workspace): Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Returns {
    const fileContents: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_FileContents = workspace['fileContents'];
    const manifest: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Manifest = workspace['manifest'];

    const sortedKeys: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_SortedKeys = new Set(libItemSortOrderKeys);
    const currentKeys: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_CurrentKeys = Object.keys(fileContents);
    const reordered: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Reordered = {};

    // Add known keys in sorted order.
    for (const libItemSortOrderKey of libItemSortOrderKeys) {
      if (libItemSortOrderKey in fileContents) {
        const value: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Value = Reflect.get(fileContents, libItemSortOrderKey);

        Reflect.set(reordered, libItemSortOrderKey, value);
      }
    }

    // Append unknown keys (preserving their original order).
    for (const key of currentKeys) {
      if (sortedKeys.has(key) === false) {
        const value: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Value = Reflect.get(fileContents, key);

        Reflect.set(reordered, key, value);
      }
    }

    const reorderedKeys: Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_ReorderedKeys = Object.keys(reordered);

    // Skip if the key order is already correct.
    if (currentKeys.every((currentKey, index) => currentKey === reorderedKeys[index]) === true) {
      return;
    }

    Logger.customize({
      name: 'Runner.handleReorder',
      purpose: 'reorder',
    }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Reordering "package.json" keys ...`);

    // Replace all keys in fileContents with reordered keys.
    for (const key of currentKeys) {
      Reflect.deleteProperty(fileContents, key);
    }

    for (const entry of Object.entries(reordered)) {
      Reflect.set(fileContents, entry[0], entry[1]);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Cleanup - Handle Unknown.
   *
   * Detects and removes keys not present in the allowed set built from bundler, corepack,
   * ecosystem, Node.js, and npm key lists from the lib/item module.
   *
   * @param {Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_Returns}
   *
   * @since 0.14.0
   */
  private static handleUnknown(workspace: Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_Workspace): Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_Returns {
    const allowedKeys: Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_AllowedKeys = new Set([
      ...libItemBundlerKeys,
      ...libItemCorepackKeys,
      ...libItemEcosystemKeys,
      ...libItemNodeJsKeys,
      ...libItemNpmKeys,
    ]);
    const manifestContents: Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_ManifestContents = workspace['fileContents'] ?? {};
    const manifestKeys: Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_ManifestKeys = Object.keys(manifestContents);
    const unknownKeys: Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_UnknownKeys = manifestKeys.filter((manifestKey) => allowedKeys.has(manifestKey) === false);

    if (unknownKeys.length === 0) {
      return;
    }

    const formattedUnknownKeys: Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_FormattedUnknownKeys = unknownKeys.map((unknownKey) => {
      return `- "${unknownKey}"`;
    }).join('\n');

    const unsupportedMessage: Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_UnsupportedMessage = [
      `Workspace "${workspace['manifest']['name']}" contains unsupported "package.json" key(s).`,
      'The unsupported keys are:',
      formattedUnknownKeys,
      'Review the references below:',
      `- ${LIB_CONSTANTS_DOCS_BASE_URL}/docs/cli/recipes/package-json/cleanup#unsupported-keys`,
    ].join('\n');

    Logger.customize({
      name: 'Runner.handleUnknown',
      purpose: 'unsupported',
    }).warn(unsupportedMessage);

    for (const unknownKey of unknownKeys) {
      Logger.customize({
        name: 'Runner.handleUnknown',
        purpose: 'removal',
      }).info(`Removing unsupported key "${unknownKey}" from workspace "${workspace['manifest']['name']}".`);

      Reflect.deleteProperty(manifestContents, unknownKey);
    }

    return;
  }
}
