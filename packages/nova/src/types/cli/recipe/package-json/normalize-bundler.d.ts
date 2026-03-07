import type { WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - package.json - Normalize Bundler - Handle.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeBundlerHandleWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonNormalizeBundlerHandleReturns = void;

/**
 * CLI Recipe - package.json - Normalize Bundler - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeBundlerRunOptionsDryRun = true;

export type CLIRecipePackageJsonNormalizeBundlerRunOptionsReplaceFile = true;

export type CLIRecipePackageJsonNormalizeBundlerRunOptions = {
  dryRun?: CLIRecipePackageJsonNormalizeBundlerRunOptionsDryRun;
  replaceFile?: CLIRecipePackageJsonNormalizeBundlerRunOptionsReplaceFile;
};

export type CLIRecipePackageJsonNormalizeBundlerRunReturns = Promise<void>;
