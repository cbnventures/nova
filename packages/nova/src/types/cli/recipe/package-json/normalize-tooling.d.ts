import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  SharedNovaConfigConfig,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaceRecipeTuple,
  SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Tooling - Handle.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeToolingHandleWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonNormalizeToolingHandleReturns = Promise<void>;

export type CliRecipePackageJsonNormalizeToolingHandleFileContents = Record<string, unknown>;

export type CliRecipePackageJsonNormalizeToolingHandleFilePath = string;

export type CliRecipePackageJsonNormalizeToolingHandleManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeToolingHandlePackageScripts = unknown;

export type CliRecipePackageJsonNormalizeToolingHandlePackageGypfile = unknown;

export type CliRecipePackageJsonNormalizeToolingHandlePackageConfig = unknown;

export type CliRecipePackageJsonNormalizeToolingHandlePackageWorkspaces = unknown;

export type CliRecipePackageJsonNormalizeToolingHandleWorkspaceDirectory = string;

export type CliRecipePackageJsonNormalizeToolingHandleBindingGypPath = string;

export type CliRecipePackageJsonNormalizeToolingHandleHasBindingGyp = boolean;

/**
 * CLI - Recipe - package.json - Normalize Tooling - Is Empty.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeToolingIsEmptyValue = unknown;

export type CliRecipePackageJsonNormalizeToolingIsEmptyReturns = boolean;

/**
 * CLI - Recipe - package.json - Normalize Tooling - Run.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeToolingRunOptionsDryRun = true;

export type CliRecipePackageJsonNormalizeToolingRunOptionsReplaceFile = true;

export type CliRecipePackageJsonNormalizeToolingRunOptions = {
  dryRun?: CliRecipePackageJsonNormalizeToolingRunOptionsDryRun;
  replaceFile?: CliRecipePackageJsonNormalizeToolingRunOptionsReplaceFile;
};

export type CliRecipePackageJsonNormalizeToolingRunReturns = Promise<void>;

export type CliRecipePackageJsonNormalizeToolingRunCurrentDirectory = string;

export type CliRecipePackageJsonNormalizeToolingRunIsAtProjectRoot = boolean;

export type CliRecipePackageJsonNormalizeToolingRunIsDryRun = boolean;

export type CliRecipePackageJsonNormalizeToolingRunIsReplaceFile = boolean;

export type CliRecipePackageJsonNormalizeToolingRunReplaceFileNotice = string;

export type CliRecipePackageJsonNormalizeToolingRunNovaConfig = LibNovaConfig;

export type CliRecipePackageJsonNormalizeToolingRunWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonNormalizeToolingRunWorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeToolingRunEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeToolingRunWorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeToolingRunWorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonNormalizeToolingRunRecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonNormalizeToolingRunWorkspaces = SharedWorkspaceManifest[];
