import type { WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - package.json - Normalize Modules - Handle.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeModulesHandleWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonNormalizeModulesHandleReturns = void;

/**
 * CLI Recipe - package.json - Normalize Modules - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeModulesRunOptionsDryRun = true;

export type CLIRecipePackageJsonNormalizeModulesRunOptionsReplaceFile = true;

export type CLIRecipePackageJsonNormalizeModulesRunOptions = {
  dryRun?: CLIRecipePackageJsonNormalizeModulesRunOptionsDryRun;
  replaceFile?: CLIRecipePackageJsonNormalizeModulesRunOptionsReplaceFile;
};

export type CLIRecipePackageJsonNormalizeModulesRunReturns = Promise<void>;
