import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  SharedNovaConfigConfig,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaceRecipeTuple,
  SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Bundler - Handle.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeBundlerHandleWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonNormalizeBundlerHandleReturns = void;

export type CliRecipePackageJsonNormalizeBundlerHandleFileContents = Record<string, unknown>;

export type CliRecipePackageJsonNormalizeBundlerHandleManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeBundlerHandlePackageTypes = unknown;

export type CliRecipePackageJsonNormalizeBundlerHandlePackageTypings = unknown;

export type CliRecipePackageJsonNormalizeBundlerHandlePackageModule = unknown;

export type CliRecipePackageJsonNormalizeBundlerHandlePackageSideEffects = unknown;

export type CliRecipePackageJsonNormalizeBundlerHandlePackageEsnext = unknown;

export type CliRecipePackageJsonNormalizeBundlerHandleAllowsTypesModule = boolean;

export type CliRecipePackageJsonNormalizeBundlerHandleAllowsSideEffectsEsnext = boolean;

/**
 * CLI - Recipe - package.json - Normalize Bundler - Run.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeBundlerRunOptionsDryRun = true;

export type CliRecipePackageJsonNormalizeBundlerRunOptionsReplaceFile = true;

export type CliRecipePackageJsonNormalizeBundlerRunOptions = {
  dryRun?: CliRecipePackageJsonNormalizeBundlerRunOptionsDryRun;
  replaceFile?: CliRecipePackageJsonNormalizeBundlerRunOptionsReplaceFile;
};

export type CliRecipePackageJsonNormalizeBundlerRunReturns = Promise<void>;

export type CliRecipePackageJsonNormalizeBundlerRunCurrentDirectory = string;

export type CliRecipePackageJsonNormalizeBundlerRunIsAtProjectRoot = boolean;

export type CliRecipePackageJsonNormalizeBundlerRunIsDryRun = boolean;

export type CliRecipePackageJsonNormalizeBundlerRunIsReplaceFile = boolean;

export type CliRecipePackageJsonNormalizeBundlerRunReplaceFileNotice = string;

export type CliRecipePackageJsonNormalizeBundlerRunNovaConfig = LibNovaConfig;

export type CliRecipePackageJsonNormalizeBundlerRunWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonNormalizeBundlerRunWorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeBundlerRunEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeBundlerRunWorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeBundlerRunWorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonNormalizeBundlerRunRecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonNormalizeBundlerRunWorkspaces = SharedWorkspaceManifest[];
