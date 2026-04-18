import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  SharedNovaConfigConfig,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaceRecipeTuple,
  SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Artifacts - Handle.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeArtifactsHandleWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonNormalizeArtifactsHandleReturns = Promise<void>;

export type CliRecipePackageJsonNormalizeArtifactsHandleFileContents = Record<string, unknown>;

export type CliRecipePackageJsonNormalizeArtifactsHandleManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeArtifactsHandlePackageFiles = unknown;

export type CliRecipePackageJsonNormalizeArtifactsHandlePackageBin = unknown;

export type CliRecipePackageJsonNormalizeArtifactsHandlePackageMan = unknown;

export type CliRecipePackageJsonNormalizeArtifactsHandlePackageDirectories = unknown;

export type CliRecipePackageJsonNormalizeArtifactsHandlePackageName = string;

export type CliRecipePackageJsonNormalizeArtifactsHandleBinName = string | undefined;

/**
 * CLI - Recipe - package.json - Normalize Artifacts - Handle Publish.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeArtifactsHandlePublishWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonNormalizeArtifactsHandlePublishReturns = Promise<void>;

export type CliRecipePackageJsonNormalizeArtifactsHandlePublishFileContents = Record<string, unknown>;

export type CliRecipePackageJsonNormalizeArtifactsHandlePublishManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeArtifactsHandlePublishPackagePrivate = unknown;

export type CliRecipePackageJsonNormalizeArtifactsHandlePublishPackagePublishConfig = unknown;

export type CliRecipePackageJsonNormalizeArtifactsHandlePublishPrivateValue = boolean;

/**
 * CLI - Recipe - package.json - Normalize Artifacts - Is Empty.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeArtifactsIsEmptyValue = unknown;

export type CliRecipePackageJsonNormalizeArtifactsIsEmptyReturns = boolean;

/**
 * CLI - Recipe - package.json - Normalize Artifacts - Run.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonNormalizeArtifactsRunOptionsDryRun = true;

export type CliRecipePackageJsonNormalizeArtifactsRunOptionsReplaceFile = true;

export type CliRecipePackageJsonNormalizeArtifactsRunOptions = {
  dryRun?: CliRecipePackageJsonNormalizeArtifactsRunOptionsDryRun;
  replaceFile?: CliRecipePackageJsonNormalizeArtifactsRunOptionsReplaceFile;
};

export type CliRecipePackageJsonNormalizeArtifactsRunReturns = Promise<void>;

export type CliRecipePackageJsonNormalizeArtifactsRunCurrentDirectory = string;

export type CliRecipePackageJsonNormalizeArtifactsRunIsAtProjectRoot = boolean;

export type CliRecipePackageJsonNormalizeArtifactsRunIsDryRun = boolean;

export type CliRecipePackageJsonNormalizeArtifactsRunIsReplaceFile = boolean;

export type CliRecipePackageJsonNormalizeArtifactsRunReplaceFileNotice = string;

export type CliRecipePackageJsonNormalizeArtifactsRunNovaConfig = LibNovaConfig;

export type CliRecipePackageJsonNormalizeArtifactsRunWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonNormalizeArtifactsRunWorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeArtifactsRunEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonNormalizeArtifactsRunWorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonNormalizeArtifactsRunWorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonNormalizeArtifactsRunRecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonNormalizeArtifactsRunWorkspaces = SharedWorkspaceManifest[];
