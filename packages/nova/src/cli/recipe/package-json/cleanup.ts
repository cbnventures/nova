import chalk from 'chalk';

import {
  libItemBundlerKeys,
  libItemCorepackKeys,
  libItemNodeJsKeys,
  libItemNpmKeys,
  libItemSortOrderKeys,
} from '../../../lib/item.js';
import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliRecipePackageJsonCleanupHandleRemoveUnknownKeys,
  CliRecipePackageJsonCleanupHandleReorderCurrentKeys,
  CliRecipePackageJsonCleanupHandleReorderFileContents,
  CliRecipePackageJsonCleanupHandleReorderKeys,
  CliRecipePackageJsonCleanupHandleReorderManifest,
  CliRecipePackageJsonCleanupHandleReorderReordered,
  CliRecipePackageJsonCleanupHandleReorderReorderedKeys,
  CliRecipePackageJsonCleanupHandleReorderReturns,
  CliRecipePackageJsonCleanupHandleReorderSortedKeys,
  CliRecipePackageJsonCleanupHandleReorderValue,
  CliRecipePackageJsonCleanupHandleReorderWorkspace,
  CliRecipePackageJsonCleanupHandleReturns,
  CliRecipePackageJsonCleanupHandleUnknownAllowedKeys,
  CliRecipePackageJsonCleanupHandleUnknownFormattedUnknownKeys,
  CliRecipePackageJsonCleanupHandleUnknownManifestContents,
  CliRecipePackageJsonCleanupHandleUnknownManifestKeys,
  CliRecipePackageJsonCleanupHandleUnknownReturns,
  CliRecipePackageJsonCleanupHandleUnknownUnknownKeys,
  CliRecipePackageJsonCleanupHandleUnknownUnsupportedMessage,
  CliRecipePackageJsonCleanupHandleUnknownWorkspace,
  CliRecipePackageJsonCleanupHandleWorkspace,
  CliRecipePackageJsonCleanupRunCleanupRecipe,
  CliRecipePackageJsonCleanupRunCleanupRecipeSettings,
  CliRecipePackageJsonCleanupRunCurrentDirectory,
  CliRecipePackageJsonCleanupRunEligibleWorkspaces,
  CliRecipePackageJsonCleanupRunIsAtProjectRoot,
  CliRecipePackageJsonCleanupRunIsDryRun,
  CliRecipePackageJsonCleanupRunIsReplaceFile,
  CliRecipePackageJsonCleanupRunOptions,
  CliRecipePackageJsonCleanupRunRecipeTupleFilter,
  CliRecipePackageJsonCleanupRunRemoveUnknownKeys,
  CliRecipePackageJsonCleanupRunReorderKeys,
  CliRecipePackageJsonCleanupRunReplaceFileNotice,
  CliRecipePackageJsonCleanupRunReturns,
  CliRecipePackageJsonCleanupRunWorkingFile,
  CliRecipePackageJsonCleanupRunWorkingFileWorkspaces,
  CliRecipePackageJsonCleanupRunWorkspaceConfig,
  CliRecipePackageJsonCleanupRunWorkspaceConfigEntry,
  CliRecipePackageJsonCleanupRunWorkspaceConfigEntryRecipes,
  CliRecipePackageJsonCleanupRunWorkspaceConfigFilter,
  CliRecipePackageJsonCleanupRunWorkspaceRecipesFilter,
  CliRecipePackageJsonCleanupRunWorkspaces,
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
export class CliRecipePackageJsonCleanup {
  /**
   * CLI - Recipe - package.json - Cleanup - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then applies key removal and
   * reordering per recipe settings. Supports dry-run mode.
   *
   * @param {CliRecipePackageJsonCleanupRunOptions} options - Options.
   *
   * @returns {CliRecipePackageJsonCleanupRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliRecipePackageJsonCleanupRunOptions): CliRecipePackageJsonCleanupRunReturns {
    const currentDirectory: CliRecipePackageJsonCleanupRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipePackageJsonCleanupRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipePackageJsonCleanupRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliRecipePackageJsonCleanupRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipePackageJsonCleanup.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliRecipePackageJsonCleanupRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliRecipePackageJsonCleanup.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliRecipePackageJsonCleanupRunWorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: CliRecipePackageJsonCleanupRunWorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonCleanup.run',
        purpose: 'workspaces',
      }).warn('Skipping cleanup. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: CliRecipePackageJsonCleanupRunEligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig: CliRecipePackageJsonCleanupRunWorkspaceConfigFilter = workspace[1];
      const workspaceRecipes: CliRecipePackageJsonCleanupRunWorkspaceRecipesFilter = workspaceConfig['recipes'];

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple: CliRecipePackageJsonCleanupRunRecipeTupleFilter = workspaceRecipes['cleanup'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonCleanup.run',
        purpose: 'workspaces',
      }).warn('Skipping cleanup. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: CliRecipePackageJsonCleanupRunWorkspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CliRecipePackageJsonCleanup.run',
        purpose: 'workspaces',
      }).warn('Skipping cleanup. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CliRecipePackageJsonCleanup.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for cleanup.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      const workspaceConfig: CliRecipePackageJsonCleanupRunWorkspaceConfig = eligibleWorkspaces.find((eligible) => eligible[1]['name'] === workspace['manifest']['name']);

      if (workspaceConfig === undefined) {
        continue;
      }

      const workspaceConfigEntry: CliRecipePackageJsonCleanupRunWorkspaceConfigEntry = workspaceConfig[1];
      const workspaceConfigEntryRecipes: CliRecipePackageJsonCleanupRunWorkspaceConfigEntryRecipes = workspaceConfigEntry['recipes'];

      let removeUnknownKeys: CliRecipePackageJsonCleanupRunRemoveUnknownKeys = true;
      let reorderKeys: CliRecipePackageJsonCleanupRunReorderKeys = true;

      if (workspaceConfigEntryRecipes !== undefined) {
        const cleanupRecipe: CliRecipePackageJsonCleanupRunCleanupRecipe = workspaceConfigEntryRecipes['cleanup'];

        if (cleanupRecipe !== undefined) {
          const cleanupRecipeSettings: CliRecipePackageJsonCleanupRunCleanupRecipeSettings = cleanupRecipe[1];

          if (cleanupRecipeSettings !== undefined) {
            removeUnknownKeys = cleanupRecipeSettings['removeUnknownKeys'] !== false;
            reorderKeys = cleanupRecipeSettings['reorderKeys'] !== false;
          }
        }
      }

      Logger.customize({
        name: 'CliRecipePackageJsonCleanup.run',
        purpose: 'iteration',
      }).info(`Running cleanup for the "${workspace['manifest']['name']}" workspace ...`);

      CliRecipePackageJsonCleanup.handle(workspace, removeUnknownKeys, reorderKeys);

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
   * @param {CliRecipePackageJsonCleanupHandleWorkspace}         workspace         - Workspace.
   * @param {CliRecipePackageJsonCleanupHandleRemoveUnknownKeys} removeUnknownKeys - Remove unknown keys.
   * @param {CliRecipePackageJsonCleanupHandleReorderKeys}       reorderKeys       - Reorder keys.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonCleanupHandleReturns}
   *
   * @since 0.14.0
   */
  private static handle(workspace: CliRecipePackageJsonCleanupHandleWorkspace, removeUnknownKeys: CliRecipePackageJsonCleanupHandleRemoveUnknownKeys, reorderKeys: CliRecipePackageJsonCleanupHandleReorderKeys): CliRecipePackageJsonCleanupHandleReturns {
    if (removeUnknownKeys === true) {
      CliRecipePackageJsonCleanup.handleUnknown(workspace);
    }

    if (reorderKeys === true) {
      CliRecipePackageJsonCleanup.handleReorder(workspace);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Cleanup - Handle Reorder.
   *
   * Reorders package.json keys to match the canonical sort order defined in
   * libItemSortOrderKeys. Unknown keys are appended after all known keys.
   *
   * @param {CliRecipePackageJsonCleanupHandleReorderWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonCleanupHandleReorderReturns}
   *
   * @since 0.14.0
   */
  private static handleReorder(workspace: CliRecipePackageJsonCleanupHandleReorderWorkspace): CliRecipePackageJsonCleanupHandleReorderReturns {
    const fileContents: CliRecipePackageJsonCleanupHandleReorderFileContents = workspace['fileContents'];
    const manifest: CliRecipePackageJsonCleanupHandleReorderManifest = workspace['manifest'];

    const sortedKeys: CliRecipePackageJsonCleanupHandleReorderSortedKeys = new Set(libItemSortOrderKeys);
    const currentKeys: CliRecipePackageJsonCleanupHandleReorderCurrentKeys = Object.keys(fileContents);
    const reordered: CliRecipePackageJsonCleanupHandleReorderReordered = {};

    // Add known keys in sorted order.
    for (const libItemSortOrderKey of libItemSortOrderKeys) {
      if (libItemSortOrderKey in fileContents) {
        const value: CliRecipePackageJsonCleanupHandleReorderValue = Reflect.get(fileContents, libItemSortOrderKey);

        Reflect.set(reordered, libItemSortOrderKey, value);
      }
    }

    // Append unknown keys (preserving their original order).
    for (const key of currentKeys) {
      if (sortedKeys.has(key) === false) {
        const value: CliRecipePackageJsonCleanupHandleReorderValue = Reflect.get(fileContents, key);

        Reflect.set(reordered, key, value);
      }
    }

    const reorderedKeys: CliRecipePackageJsonCleanupHandleReorderReorderedKeys = Object.keys(reordered);

    // Skip if the key order is already correct.
    if (currentKeys.every((currentKey, index) => currentKey === reorderedKeys[index]) === true) {
      return;
    }

    Logger.customize({
      name: 'CliRecipePackageJsonCleanup.handleReorder',
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
   * Node.js, and npm key lists from the lib/item module.
   *
   * @param {CliRecipePackageJsonCleanupHandleUnknownWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CliRecipePackageJsonCleanupHandleUnknownReturns}
   *
   * @since 0.14.0
   */
  private static handleUnknown(workspace: CliRecipePackageJsonCleanupHandleUnknownWorkspace): CliRecipePackageJsonCleanupHandleUnknownReturns {
    const allowedKeys: CliRecipePackageJsonCleanupHandleUnknownAllowedKeys = new Set([
      ...libItemBundlerKeys,
      ...libItemCorepackKeys,
      ...libItemNodeJsKeys,
      ...libItemNpmKeys,
    ]);
    const manifestContents: CliRecipePackageJsonCleanupHandleUnknownManifestContents = workspace['fileContents'] ?? {};
    const manifestKeys: CliRecipePackageJsonCleanupHandleUnknownManifestKeys = Object.keys(manifestContents);
    const unknownKeys: CliRecipePackageJsonCleanupHandleUnknownUnknownKeys = manifestKeys.filter((manifestKey) => allowedKeys.has(manifestKey) === false);

    if (unknownKeys.length === 0) {
      return;
    }

    const formattedUnknownKeys: CliRecipePackageJsonCleanupHandleUnknownFormattedUnknownKeys = unknownKeys.map((unknownKey) => {
      return `- "${unknownKey}"`;
    }).join('\n');

    const unsupportedMessage: CliRecipePackageJsonCleanupHandleUnknownUnsupportedMessage = [
      `Workspace "${workspace['manifest']['name']}" contains unsupported "package.json" key(s).`,
      'The unsupported keys are:',
      formattedUnknownKeys,
      'Review the references below:',
      '- https://nova.cbnventures.io/docs/cli/recipes/package-json/cleanup#unsupported-keys',
    ].join('\n');

    Logger.customize({
      name: 'CliRecipePackageJsonCleanup.handleUnknown',
      purpose: 'unsupported',
    }).warn(unsupportedMessage);

    for (const unknownKey of unknownKeys) {
      Logger.customize({
        name: 'CliRecipePackageJsonCleanup.handleUnknown',
        purpose: 'removal',
      }).info(`Removing unsupported key "${unknownKey}" from workspace "${workspace['manifest']['name']}".`);

      Reflect.deleteProperty(manifestContents, unknownKey);
    }

    return;
  }
}
