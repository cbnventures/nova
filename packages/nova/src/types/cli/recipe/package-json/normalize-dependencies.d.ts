import type { WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - package.json - Normalize Dependencies - Handle.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeDependenciesHandleWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonNormalizeDependenciesHandleReturns = Promise<void>;

/**
 * CLI Recipe - package.json - Normalize Dependencies - Is empty.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeDependenciesIsEmptyValue = unknown;

export type CLIRecipePackageJsonNormalizeDependenciesIsEmptyReturns = boolean;

/**
 * CLI Recipe - package.json - Normalize Dependencies - Pin dependencies.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeDependenciesPinDependenciesWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonNormalizeDependenciesPinDependenciesPinDependencyVersions = boolean;

export type CLIRecipePackageJsonNormalizeDependenciesPinDependenciesPinDevDependencyVersions = boolean;

export type CLIRecipePackageJsonNormalizeDependenciesPinDependenciesReturns = number;

export type CLIRecipePackageJsonNormalizeDependenciesPinDependenciesDepGroups = string[];

/**
 * CLI Recipe - package.json - Normalize Dependencies - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeDependenciesRunOptionsDryRun = true;

export type CLIRecipePackageJsonNormalizeDependenciesRunOptionsReplaceFile = true;

export type CLIRecipePackageJsonNormalizeDependenciesRunOptions = {
  dryRun?: CLIRecipePackageJsonNormalizeDependenciesRunOptionsDryRun;
  replaceFile?: CLIRecipePackageJsonNormalizeDependenciesRunOptionsReplaceFile;
};

export type CLIRecipePackageJsonNormalizeDependenciesRunReturns = Promise<void>;

/**
 * CLI Recipe - package.json - Normalize Dependencies - Strip prefix.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeDependenciesStripPrefixVersion = string;

export type CLIRecipePackageJsonNormalizeDependenciesStripPrefixReturns = string | undefined;
