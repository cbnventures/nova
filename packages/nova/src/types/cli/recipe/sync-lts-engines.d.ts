import type { WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - Sync LTS Engines - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncLtsEnginesRunOptionsDryRun = true;

export type CLIRecipeSyncLtsEnginesRunOptionsReplaceFile = true;

export type CLIRecipeSyncLtsEnginesRunOptions = {
  dryRun?: CLIRecipeSyncLtsEnginesRunOptionsDryRun;
  replaceFile?: CLIRecipeSyncLtsEnginesRunOptionsReplaceFile;
};

export type CLIRecipeSyncLtsEnginesRunReturns = Promise<void>;

/**
 * CLI Recipe - Sync LTS Engines - Sync node constraint.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncLtsEnginesSyncNodeConstraintWorkspace = WorkspaceManifest;

export type CLIRecipeSyncLtsEnginesSyncNodeConstraintConstraint = string;

export type CLIRecipeSyncLtsEnginesSyncNodeConstraintReturns = void;
