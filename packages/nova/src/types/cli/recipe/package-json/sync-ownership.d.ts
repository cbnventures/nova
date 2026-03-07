import type { NovaConfig, WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - package.json - Sync Ownership - Handle.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonSyncOwnershipHandleWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonSyncOwnershipHandleWorkingFile = NovaConfig;

export type CLIRecipePackageJsonSyncOwnershipHandleReturns = void;

/**
 * CLI Recipe - package.json - Sync Ownership - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonSyncOwnershipRunOptionsDryRun = true;

export type CLIRecipePackageJsonSyncOwnershipRunOptionsReplaceFile = true;

export type CLIRecipePackageJsonSyncOwnershipRunOptions = {
  dryRun?: CLIRecipePackageJsonSyncOwnershipRunOptionsDryRun;
  replaceFile?: CLIRecipePackageJsonSyncOwnershipRunOptionsReplaceFile;
};

export type CLIRecipePackageJsonSyncOwnershipRunReturns = Promise<void>;
