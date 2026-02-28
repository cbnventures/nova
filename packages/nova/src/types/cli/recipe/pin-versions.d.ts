import type { WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - Pin Versions - Pin dependencies.
 *
 * @since 1.0.0
 */
export type CLIRecipePinVersionsPinDependenciesWorkspace = WorkspaceManifest;

export type CLIRecipePinVersionsPinDependenciesReturns = number;

/**
 * CLI Recipe - Pin Versions - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePinVersionsRunOptionsDryRun = true;

export type CLIRecipePinVersionsRunOptionsReplaceFile = true;

export type CLIRecipePinVersionsRunOptions = {
  dryRun?: CLIRecipePinVersionsRunOptionsDryRun;
  replaceFile?: CLIRecipePinVersionsRunOptionsReplaceFile;
};

export type CLIRecipePinVersionsRunReturns = Promise<void>;

/**
 * CLI Recipe - Pin Versions - Strip prefix.
 *
 * @since 1.0.0
 */
export type CLIRecipePinVersionsStripPrefixVersion = string;

export type CLIRecipePinVersionsStripPrefixReturns = string | undefined;
