import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  SharedNovaConfigConfig,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaceRecipeSettings,
  SharedNovaConfigWorkspaceRecipeTuple,
  SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Cleanup - Handle.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonCleanupHandleWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonCleanupHandleRemoveUnknownKeys = boolean;

export type CliRecipePackageJsonCleanupHandleReorderKeys = boolean;

export type CliRecipePackageJsonCleanupHandleReturns = void;

/**
 * CLI - Recipe - package.json - Cleanup - Handle Reorder.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonCleanupHandleReorderWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonCleanupHandleReorderReturns = void;

export type CliRecipePackageJsonCleanupHandleReorderFileContents = Record<string, unknown>;

export type CliRecipePackageJsonCleanupHandleReorderManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonCleanupHandleReorderSortedKeys = Set<string>;

export type CliRecipePackageJsonCleanupHandleReorderCurrentKeys = string[];

export type CliRecipePackageJsonCleanupHandleReorderReordered = Record<string, unknown>;

export type CliRecipePackageJsonCleanupHandleReorderValue = unknown;

export type CliRecipePackageJsonCleanupHandleReorderReorderedKeys = string[];

export type CliRecipePackageJsonCleanupHandleReorderReorderedEntries = [string, unknown][];

/**
 * CLI - Recipe - package.json - Cleanup - Handle Unknown.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonCleanupHandleUnknownWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonCleanupHandleUnknownReturns = void;

export type CliRecipePackageJsonCleanupHandleUnknownAllowedKeys = Set<string>;

export type CliRecipePackageJsonCleanupHandleUnknownManifestContents = Record<string, unknown>;

export type CliRecipePackageJsonCleanupHandleUnknownManifestKeys = string[];

export type CliRecipePackageJsonCleanupHandleUnknownUnknownKeys = string[];

export type CliRecipePackageJsonCleanupHandleUnknownFormattedUnknownKeys = string;

export type CliRecipePackageJsonCleanupHandleUnknownUnsupportedMessage = string;

/**
 * CLI - Recipe - package.json - Cleanup - Run.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonCleanupRunOptionsDryRun = true;

export type CliRecipePackageJsonCleanupRunOptionsReplaceFile = true;

export type CliRecipePackageJsonCleanupRunOptions = {
  dryRun?: CliRecipePackageJsonCleanupRunOptionsDryRun;
  replaceFile?: CliRecipePackageJsonCleanupRunOptionsReplaceFile;
};

export type CliRecipePackageJsonCleanupRunReturns = Promise<void>;

export type CliRecipePackageJsonCleanupRunCurrentDirectory = string;

export type CliRecipePackageJsonCleanupRunIsAtProjectRoot = boolean;

export type CliRecipePackageJsonCleanupRunIsDryRun = boolean;

export type CliRecipePackageJsonCleanupRunIsReplaceFile = boolean;

export type CliRecipePackageJsonCleanupRunReplaceFileNotice = string;

export type CliRecipePackageJsonCleanupRunNovaConfig = LibNovaConfig;

export type CliRecipePackageJsonCleanupRunWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonCleanupRunWorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonCleanupRunEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonCleanupRunWorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonCleanupRunWorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonCleanupRunRecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonCleanupRunWorkspaces = SharedWorkspaceManifest[];

export type CliRecipePackageJsonCleanupRunWorkspaceConfig = [string, SharedNovaConfigWorkspace] | undefined;

export type CliRecipePackageJsonCleanupRunWorkspaceConfigEntry = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonCleanupRunWorkspaceConfigEntryRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonCleanupRunRemoveUnknownKeys = boolean;

export type CliRecipePackageJsonCleanupRunReorderKeys = boolean;

export type CliRecipePackageJsonCleanupRunCleanupRecipe = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonCleanupRunCleanupRecipeSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;
