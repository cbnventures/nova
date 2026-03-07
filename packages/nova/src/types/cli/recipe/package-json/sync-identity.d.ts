import type { NovaConfig, WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - package.json - Sync Identity - Handle.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonSyncIdentityHandleWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonSyncIdentityHandleWorkingFile = NovaConfig;

export type CLIRecipePackageJsonSyncIdentityHandleReturns = Promise<void>;

export type CLIRecipePackageJsonSyncIdentityHandleNormalizedLicenseReference = string | undefined;

/**
 * CLI Recipe - package.json - Sync Identity - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonSyncIdentityRunOptionsDryRun = true;

export type CLIRecipePackageJsonSyncIdentityRunOptionsReplaceFile = true;

export type CLIRecipePackageJsonSyncIdentityRunOptions = {
  dryRun?: CLIRecipePackageJsonSyncIdentityRunOptionsDryRun;
  replaceFile?: CLIRecipePackageJsonSyncIdentityRunOptionsReplaceFile;
};

export type CLIRecipePackageJsonSyncIdentityRunReturns = Promise<void>;
