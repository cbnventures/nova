import type { WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - package.json - Normalize Tooling - Handle.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeToolingHandleWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonNormalizeToolingHandleReturns = Promise<void>;

/**
 * CLI Recipe - package.json - Normalize Tooling - Is empty.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeToolingIsEmptyValue = unknown;

export type CLIRecipePackageJsonNormalizeToolingIsEmptyReturns = boolean;

/**
 * CLI Recipe - package.json - Normalize Tooling - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeToolingRunOptionsDryRun = true;

export type CLIRecipePackageJsonNormalizeToolingRunOptionsReplaceFile = true;

export type CLIRecipePackageJsonNormalizeToolingRunOptions = {
  dryRun?: CLIRecipePackageJsonNormalizeToolingRunOptionsDryRun;
  replaceFile?: CLIRecipePackageJsonNormalizeToolingRunOptionsReplaceFile;
};

export type CLIRecipePackageJsonNormalizeToolingRunReturns = Promise<void>;
