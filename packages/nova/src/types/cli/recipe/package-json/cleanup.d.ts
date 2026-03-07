import type { WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - package.json - Cleanup - Handle.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonCleanupHandleWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonCleanupHandleReturns = void;

/**
 * CLI Recipe - package.json - Cleanup - Handle reorder.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonCleanupHandleReorderWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonCleanupHandleReorderReturns = void;

export type CLIRecipePackageJsonCleanupHandleReorderSortedKeys = Set<string>;

export type CLIRecipePackageJsonCleanupHandleReorderReordered = Record<string, unknown>;

/**
 * CLI Recipe - package.json - Cleanup - Handle unknown.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonCleanupHandleUnknownWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonCleanupHandleUnknownReturns = void;

export type CLIRecipePackageJsonCleanupHandleUnknownAllowedKeys = Set<string>;

/**
 * CLI Recipe - package.json - Cleanup - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonCleanupRunOptionsDryRun = true;

export type CLIRecipePackageJsonCleanupRunOptionsReplaceFile = true;

export type CLIRecipePackageJsonCleanupRunOptions = {
  dryRun?: CLIRecipePackageJsonCleanupRunOptionsDryRun;
  replaceFile?: CLIRecipePackageJsonCleanupRunOptionsReplaceFile;
};

export type CLIRecipePackageJsonCleanupRunReturns = Promise<void>;
