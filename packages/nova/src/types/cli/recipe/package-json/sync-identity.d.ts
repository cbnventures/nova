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
 * CLI - Recipe - package.json - Sync Identity - Handle.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonSyncIdentityHandleWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonSyncIdentityHandleWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonSyncIdentityHandleReturns = Promise<void>;

export type CliRecipePackageJsonSyncIdentityHandleFileContents = Record<string, unknown>;

export type CliRecipePackageJsonSyncIdentityHandleFilePath = string;

export type CliRecipePackageJsonSyncIdentityHandleManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonSyncIdentityHandlePackageName = unknown;

export type CliRecipePackageJsonSyncIdentityHandlePackageVersion = unknown;

export type CliRecipePackageJsonSyncIdentityHandlePackageDescription = unknown;

export type CliRecipePackageJsonSyncIdentityHandlePackageKeywords = unknown;

export type CliRecipePackageJsonSyncIdentityHandlePackageLicense = unknown;

export type CliRecipePackageJsonSyncIdentityHandleRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonSyncIdentityHandleRecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonSyncIdentityHandleRecipeSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;

export type CliRecipePackageJsonSyncIdentityHandleValidVersion = string;

export type CliRecipePackageJsonSyncIdentityHandleValidDescription = string | undefined;

export type CliRecipePackageJsonSyncIdentityHandleValidKeywords = string[] | undefined;

export type CliRecipePackageJsonSyncIdentityHandleSpdxLicenses = Set<string> | undefined;

export type CliRecipePackageJsonSyncIdentityHandlePackageDirectory = string;

export type CliRecipePackageJsonSyncIdentityHandleProjectRoot = string;

export type CliRecipePackageJsonSyncIdentityHandleLicenseCandidates = string[];

export type CliRecipePackageJsonSyncIdentityHandleResolvedLicensePath = string | undefined;

export type CliRecipePackageJsonSyncIdentityHandleRelativeLicensePath = string | undefined;

export type CliRecipePackageJsonSyncIdentityHandleNormalizedLicenseReference = string | undefined;

export type CliRecipePackageJsonSyncIdentityHandleFallbackLicense = string;

/**
 * CLI - Recipe - package.json - Sync Identity - Run.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonSyncIdentityRunOptionsDryRun = true;

export type CliRecipePackageJsonSyncIdentityRunOptionsReplaceFile = true;

export type CliRecipePackageJsonSyncIdentityRunOptions = {
  dryRun?: CliRecipePackageJsonSyncIdentityRunOptionsDryRun;
  replaceFile?: CliRecipePackageJsonSyncIdentityRunOptionsReplaceFile;
};

export type CliRecipePackageJsonSyncIdentityRunReturns = Promise<void>;

export type CliRecipePackageJsonSyncIdentityRunCurrentDirectory = string;

export type CliRecipePackageJsonSyncIdentityRunIsAtProjectRoot = boolean;

export type CliRecipePackageJsonSyncIdentityRunIsDryRun = boolean;

export type CliRecipePackageJsonSyncIdentityRunIsReplaceFile = boolean;

export type CliRecipePackageJsonSyncIdentityRunReplaceFileNotice = string;

export type CliRecipePackageJsonSyncIdentityRunNovaConfig = LibNovaConfig;

export type CliRecipePackageJsonSyncIdentityRunWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonSyncIdentityRunWorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonSyncIdentityRunEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonSyncIdentityRunWorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonSyncIdentityRunWorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonSyncIdentityRunRecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonSyncIdentityRunWorkspaces = SharedWorkspaceManifest[];
