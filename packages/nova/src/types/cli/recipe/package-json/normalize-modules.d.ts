import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  SharedNovaConfigConfig,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaceRecipeTuple,
  SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Modules - Handle.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeModulesHandleWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonNormalizeModulesHandleReturns = void;

export type CliRecipePackageJsonNormalizeModulesHandleFileContents = Record<string, unknown>;

export type CliRecipePackageJsonNormalizeModulesHandleManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeModulesHandlePackageExports = unknown;

export type CliRecipePackageJsonNormalizeModulesHandlePackageMain = unknown;

export type CliRecipePackageJsonNormalizeModulesHandlePackageType = unknown;

export type CliRecipePackageJsonNormalizeModulesHandlePackageBrowser = unknown;

export type CliRecipePackageJsonNormalizeModulesHandlePackageImports = unknown;

export type CliRecipePackageJsonNormalizeModulesHandleCurrentPackageExports = unknown;

/**
 * CLI - Recipe - package.json - Normalize Modules - Run.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeModulesRunOptionsDryRun = true;

export type CliRecipePackageJsonNormalizeModulesRunOptionsReplaceFile = true;

export type CliRecipePackageJsonNormalizeModulesRunOptions = {
  dryRun?: CliRecipePackageJsonNormalizeModulesRunOptionsDryRun;
  replaceFile?: CliRecipePackageJsonNormalizeModulesRunOptionsReplaceFile;
};

export type CliRecipePackageJsonNormalizeModulesRunReturns = Promise<void>;

export type CliRecipePackageJsonNormalizeModulesRunCurrentDirectory = string;

export type CliRecipePackageJsonNormalizeModulesRunIsAtProjectRoot = boolean;

export type CliRecipePackageJsonNormalizeModulesRunIsDryRun = boolean;

export type CliRecipePackageJsonNormalizeModulesRunIsReplaceFile = boolean;

export type CliRecipePackageJsonNormalizeModulesRunReplaceFileNotice = string;

export type CliRecipePackageJsonNormalizeModulesRunNovaConfig = LibNovaConfig;

export type CliRecipePackageJsonNormalizeModulesRunWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonNormalizeModulesRunWorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeModulesRunEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeModulesRunWorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeModulesRunWorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonNormalizeModulesRunRecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonNormalizeModulesRunWorkspaces = SharedWorkspaceManifest[];
