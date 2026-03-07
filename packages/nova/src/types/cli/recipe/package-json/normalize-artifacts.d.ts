import type { WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - package.json - Normalize Artifacts - Handle.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeArtifactsHandleWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonNormalizeArtifactsHandleReturns = Promise<void>;

/**
 * CLI Recipe - package.json - Normalize Artifacts - Handle publish.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeArtifactsHandlePublishWorkspace = WorkspaceManifest;

export type CLIRecipePackageJsonNormalizeArtifactsHandlePublishReturns = Promise<void>;

/**
 * CLI Recipe - package.json - Normalize Artifacts - Is empty.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeArtifactsIsEmptyValue = unknown;

export type CLIRecipePackageJsonNormalizeArtifactsIsEmptyReturns = boolean;

/**
 * CLI Recipe - package.json - Normalize Artifacts - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipePackageJsonNormalizeArtifactsRunOptionsDryRun = true;

export type CLIRecipePackageJsonNormalizeArtifactsRunOptionsReplaceFile = true;

export type CLIRecipePackageJsonNormalizeArtifactsRunOptions = {
  dryRun?: CLIRecipePackageJsonNormalizeArtifactsRunOptionsDryRun;
  replaceFile?: CLIRecipePackageJsonNormalizeArtifactsRunOptionsReplaceFile;
};

export type CLIRecipePackageJsonNormalizeArtifactsRunReturns = Promise<void>;
