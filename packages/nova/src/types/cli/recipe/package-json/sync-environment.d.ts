import type { WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - package.json - Sync Environment - Handle.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonSyncEnvironmentHandleWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonSyncEnvironmentHandleReturns = Promise<void>;

/**
 * CLI Recipe - package.json - Sync Environment - Handle corepack.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonSyncEnvironmentHandleCorepackWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonSyncEnvironmentHandleCorepackReturns = void;

/**
 * CLI Recipe - package.json - Sync Environment - Is empty.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonSyncEnvironmentIsEmptyValue = unknown;

export type CLIRecipePackageJsonSyncEnvironmentIsEmptyReturns = boolean;

/**
 * CLI Recipe - package.json - Sync Environment - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonSyncEnvironmentRunOptionsDryRun = true;

export type CLIRecipePackageJsonSyncEnvironmentRunOptionsReplaceFile = true;

export type CLIRecipePackageJsonSyncEnvironmentRunOptions = {
  dryRun?: CLIRecipePackageJsonSyncEnvironmentRunOptionsDryRun;
  replaceFile?: CLIRecipePackageJsonSyncEnvironmentRunOptionsReplaceFile;
};

export type CLIRecipePackageJsonSyncEnvironmentRunReturns = Promise<void>;

/**
 * CLI Recipe - package.json - Sync Environment - Sync node constraint.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintConstraint = string;

export type CLIRecipePackageJsonSyncEnvironmentSyncNodeConstraintReturns = void;
