import chalk from 'chalk';

import {
  itemPackageJsonKeysBundler,
  itemPackageJsonKeysCorepack,
  itemPackageJsonKeysNodeJs,
  itemPackageJsonKeysNpm,
  itemPackageJsonSortOrder,
} from '@/lib/item.js';
import { NovaConfig } from '@/lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipePackageJsonCleanupHandleReorderReordered,
  CLIRecipePackageJsonCleanupHandleReorderReturns,
  CLIRecipePackageJsonCleanupHandleReorderSortedKeys,
  CLIRecipePackageJsonCleanupHandleReorderWorkspace,
  CLIRecipePackageJsonCleanupHandleReturns,
  CLIRecipePackageJsonCleanupHandleUnknownAllowedKeys,
  CLIRecipePackageJsonCleanupHandleUnknownReturns,
  CLIRecipePackageJsonCleanupHandleUnknownWorkspace,
  CLIRecipePackageJsonCleanupHandleWorkspace,
  CLIRecipePackageJsonCleanupRunOptions,
  CLIRecipePackageJsonCleanupRunReturns,
} from '@/types/cli/recipe/package-json/cleanup.d.ts';

/**
 * CLI Recipe - package.json - Cleanup.
 *
 * @since 1.0.0
 */
export class CLIRecipePackageJsonCleanup {
  /**
   * CLI Recipe - package.json - Cleanup - Run.
   *
   * @param {CLIRecipePackageJsonCleanupRunOptions} options - Options.
   *
   * @returns {CLIRecipePackageJsonCleanupRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePackageJsonCleanupRunOptions): CLIRecipePackageJsonCleanupRunReturns {
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
        name: 'CLIRecipePackageJsonCleanup.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePackageJsonCleanup.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonCleanup.run',
        purpose: 'workspaces',
      }).warn('Skipping cleanup. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceRecipes = workspaceConfig.recipes;

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple = workspaceRecipes['cleanup'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonCleanup.run',
        purpose: 'workspaces',
      }).warn('Skipping cleanup. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonCleanup.run',
        purpose: 'workspaces',
      }).warn('Skipping cleanup. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonCleanup.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for cleanup.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      const workspaceConfig = eligibleWorkspaces.find((eligible) => eligible[1].name === workspace.manifest.name);

      if (workspaceConfig === undefined) {
        continue;
      }

      const workspaceConfigEntry = workspaceConfig[1];
      const workspaceConfigEntryRecipes = workspaceConfigEntry.recipes;

      let removeUnknownKeys = true;
      let reorderKeys = true;

      if (workspaceConfigEntryRecipes !== undefined) {
        const cleanupRecipe = workspaceConfigEntryRecipes['cleanup'];

        if (cleanupRecipe !== undefined) {
          const cleanupRecipeSettings = cleanupRecipe[1];

          if (cleanupRecipeSettings !== undefined) {
            removeUnknownKeys = cleanupRecipeSettings['removeUnknownKeys'] !== false;
            reorderKeys = cleanupRecipeSettings['reorderKeys'] !== false;
          }
        }
      }

      Logger.customize({
        name: 'CLIRecipePackageJsonCleanup.run',
        purpose: 'iteration',
      }).info(`Running cleanup for the "${workspace.manifest.name}" workspace ...`);

      CLIRecipePackageJsonCleanup.handle(workspace, removeUnknownKeys, reorderKeys);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - package.json - Cleanup - Handle.
   *
   * @param {CLIRecipePackageJsonCleanupHandleWorkspace} workspace         - Workspace.
   * @param {boolean}                                    removeUnknownKeys - Remove unknown keys.
   * @param {boolean}                                    reorderKeys       - Reorder keys.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonCleanupHandleReturns}
   *
   * @since 1.0.0
   */
  private static handle(workspace: CLIRecipePackageJsonCleanupHandleWorkspace, removeUnknownKeys: boolean, reorderKeys: boolean): CLIRecipePackageJsonCleanupHandleReturns {
    if (removeUnknownKeys === true) {
      CLIRecipePackageJsonCleanup.handleUnknown(workspace);
    }

    if (reorderKeys === true) {
      CLIRecipePackageJsonCleanup.handleReorder(workspace);
    }
  }

  /**
   * CLI Recipe - package.json - Cleanup - Handle reorder.
   *
   * @param {CLIRecipePackageJsonCleanupHandleReorderWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonCleanupHandleReorderReturns}
   *
   * @since 1.0.0
   */
  private static handleReorder(workspace: CLIRecipePackageJsonCleanupHandleReorderWorkspace): CLIRecipePackageJsonCleanupHandleReorderReturns {
    const fileContents = workspace.fileContents;
    const manifest = workspace.manifest;

    const sortedKeys: CLIRecipePackageJsonCleanupHandleReorderSortedKeys = new Set(itemPackageJsonSortOrder);
    const currentKeys = Object.keys(fileContents);
    const reordered: CLIRecipePackageJsonCleanupHandleReorderReordered = {};

    // Add known keys in sorted order.
    for (const key of itemPackageJsonSortOrder) {
      if (key in fileContents) {
        Reflect.set(reordered, key, Reflect.get(fileContents, key));
      }
    }

    // Append unknown keys (preserving their original order).
    for (const key of currentKeys) {
      if (sortedKeys.has(key) === false) {
        Reflect.set(reordered, key, Reflect.get(fileContents, key));
      }
    }

    const reorderedKeys = Object.keys(reordered);

    // Skip if the key order is already correct.
    if (currentKeys.every((currentKey, index) => currentKey === reorderedKeys[index])) {
      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonCleanup.handleReorder',
      purpose: 'reorder',
    }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Reordering "package.json" keys ...`);

    // Replace all keys in fileContents with reordered keys.
    for (const key of currentKeys) {
      Reflect.deleteProperty(fileContents, key);
    }

    for (const [key, value] of Object.entries(reordered)) {
      Reflect.set(fileContents, key, value);
    }
  }

  /**
   * CLI Recipe - package.json - Cleanup - Handle unknown.
   *
   * @param {CLIRecipePackageJsonCleanupHandleUnknownWorkspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonCleanupHandleUnknownReturns}
   *
   * @since 1.0.0
   */
  private static handleUnknown(workspace: CLIRecipePackageJsonCleanupHandleUnknownWorkspace): CLIRecipePackageJsonCleanupHandleUnknownReturns {
    const allowedKeys: CLIRecipePackageJsonCleanupHandleUnknownAllowedKeys = new Set([
      ...itemPackageJsonKeysBundler,
      ...itemPackageJsonKeysCorepack,
      ...itemPackageJsonKeysNodeJs,
      ...itemPackageJsonKeysNpm,
    ]);
    const manifestContents = workspace.fileContents ?? {};
    const manifestKeys = Object.keys(manifestContents);
    const unknownKeys = manifestKeys.filter((manifestKey) => allowedKeys.has(manifestKey) === false);

    if (unknownKeys.length === 0) {
      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonCleanup.handleUnknown',
      purpose: 'unsupported',
    }).warn([
      `Workspace "${workspace.manifest.name}" contains unsupported "package.json" key(s).`,
      'The unsupported keys are:',
      `- "${unknownKeys.join('"\n- "')}"`,
      'Review the references below:',
      '- https://cbnventures.github.io/nova/docs/cli/recipes/package-json/cleanup#unsupported-keys',
    ].join('\n'));

    for (const unknownKey of unknownKeys) {
      Logger.customize({
        name: 'CLIRecipePackageJsonCleanup.handleUnknown',
        purpose: 'removal',
      }).info(`Removing unsupported key "${unknownKey}" from workspace "${workspace.manifest.name}".`);

      Reflect.deleteProperty(manifestContents, unknownKey);
    }
  }
}
