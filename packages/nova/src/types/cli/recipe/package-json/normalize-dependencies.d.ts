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
 * CLI - Recipe - package.json - Normalize Dependencies - Handle.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeDependenciesHandleWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonNormalizeDependenciesHandleReturns = Promise<void>;

export type CliRecipePackageJsonNormalizeDependenciesHandleFileContents = Record<string, unknown>;

export type CliRecipePackageJsonNormalizeDependenciesHandleManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeDependenciesHandlePackageDependencies = unknown;

export type CliRecipePackageJsonNormalizeDependenciesHandlePackageDevDependencies = unknown;

export type CliRecipePackageJsonNormalizeDependenciesHandlePackagePeerDependencies = unknown;

export type CliRecipePackageJsonNormalizeDependenciesHandlePackagePeerDependenciesMeta = unknown;

export type CliRecipePackageJsonNormalizeDependenciesHandlePackageBundleDependencies = unknown;

export type CliRecipePackageJsonNormalizeDependenciesHandlePackageBundledDependencies = unknown;

export type CliRecipePackageJsonNormalizeDependenciesHandlePackageOptionalDependencies = unknown;

export type CliRecipePackageJsonNormalizeDependenciesHandlePackageOverrides = unknown;

export type CliRecipePackageJsonNormalizeDependenciesHandleBundleDependencies = unknown[];

export type CliRecipePackageJsonNormalizeDependenciesHandleBundledDependencies = unknown[];

export type CliRecipePackageJsonNormalizeDependenciesHandleMergedBundleDependencies = unknown[];

/**
 * CLI - Recipe - package.json - Normalize Dependencies - Is Empty.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeDependenciesIsEmptyValue = unknown;

export type CliRecipePackageJsonNormalizeDependenciesIsEmptyReturns = boolean;

/**
 * CLI - Recipe - package.json - Normalize Dependencies - Pin Dependencies.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinDependencyVersions = boolean;

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinDevDependencyVersions = boolean;

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesReturns = number;

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepGroups = string[];

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesPinned = number;

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesUnpinnable = number;

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesDeps = unknown;

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepEntries = [string, unknown][];

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepName = string;

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesDepVersion = unknown;

export type CliRecipePackageJsonNormalizeDependenciesPinDependenciesStripped = string | undefined;

/**
 * CLI - Recipe - package.json - Normalize Dependencies - Run.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeDependenciesRunOptionsDryRun = true;

export type CliRecipePackageJsonNormalizeDependenciesRunOptionsReplaceFile = true;

export type CliRecipePackageJsonNormalizeDependenciesRunOptions = {
  dryRun?: CliRecipePackageJsonNormalizeDependenciesRunOptionsDryRun;
  replaceFile?: CliRecipePackageJsonNormalizeDependenciesRunOptionsReplaceFile;
};

export type CliRecipePackageJsonNormalizeDependenciesRunReturns = Promise<void>;

export type CliRecipePackageJsonNormalizeDependenciesRunCurrentDirectory = string;

export type CliRecipePackageJsonNormalizeDependenciesRunIsAtProjectRoot = boolean;

export type CliRecipePackageJsonNormalizeDependenciesRunIsDryRun = boolean;

export type CliRecipePackageJsonNormalizeDependenciesRunIsReplaceFile = boolean;

export type CliRecipePackageJsonNormalizeDependenciesRunReplaceFileNotice = string;

export type CliRecipePackageJsonNormalizeDependenciesRunNovaConfig = LibNovaConfig;

export type CliRecipePackageJsonNormalizeDependenciesRunWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonNormalizeDependenciesRunWorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeDependenciesRunEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeDependenciesRunWorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeDependenciesRunWorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonNormalizeDependenciesRunRecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonNormalizeDependenciesRunWorkspaces = SharedWorkspaceManifest[];

export type CliRecipePackageJsonNormalizeDependenciesRunHasUnpinnable = boolean;

export type CliRecipePackageJsonNormalizeDependenciesRunRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonNormalizeDependenciesRunRecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonNormalizeDependenciesRunRecipeSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;

export type CliRecipePackageJsonNormalizeDependenciesRunPinDependencyVersions = boolean;

export type CliRecipePackageJsonNormalizeDependenciesRunPinDevDependencyVersions = boolean;

export type CliRecipePackageJsonNormalizeDependenciesRunCount = number;

/**
 * CLI - Recipe - package.json - Normalize Dependencies - Strip Prefix.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeDependenciesStripPrefixVersion = string;

export type CliRecipePackageJsonNormalizeDependenciesStripPrefixReturns = string | undefined;

export type CliRecipePackageJsonNormalizeDependenciesStripPrefixMatch = RegExpMatchArray | null;
