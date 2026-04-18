import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  SharedNovaConfigConfig,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaceRecipeSettings,
  SharedNovaConfigWorkspaceRecipeTuple,
  SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Sync Environment - Handle.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonSyncEnvironmentHandleWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonSyncEnvironmentHandleReturns = Promise<void>;

export type CliRecipePackageJsonSyncEnvironmentHandleFileContents = Record<string, unknown>;

export type CliRecipePackageJsonSyncEnvironmentHandleManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonSyncEnvironmentHandlePackageEngines = unknown;

export type CliRecipePackageJsonSyncEnvironmentHandlePackageOs = unknown;

export type CliRecipePackageJsonSyncEnvironmentHandlePackageCpu = unknown;

export type CliRecipePackageJsonSyncEnvironmentHandlePackageLibc = unknown;

export type CliRecipePackageJsonSyncEnvironmentHandlePackageDevEngines = unknown;

export type CliRecipePackageJsonSyncEnvironmentHandleLtsConstraint = string | undefined;

export type CliRecipePackageJsonSyncEnvironmentHandleRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonSyncEnvironmentHandleRecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonSyncEnvironmentHandleRecipeSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;

export type CliRecipePackageJsonSyncEnvironmentHandleTrackNodeLtsVersions = boolean;

export type CliRecipePackageJsonSyncEnvironmentHandleExistingNode = string;

export type CliRecipePackageJsonSyncEnvironmentHandleLtsMatches = RegExpExecArray[];

export type CliRecipePackageJsonSyncEnvironmentHandleLtsMajors = number[];

export type CliRecipePackageJsonSyncEnvironmentHandleBranches = string[];

export type CliRecipePackageJsonSyncEnvironmentHandleCoversAll = boolean;

export type CliRecipePackageJsonSyncEnvironmentHandleGeMatch = RegExpMatchArray | null;

export type CliRecipePackageJsonSyncEnvironmentHandleMajorMatch = RegExpMatchArray | null;

/**
 * CLI - Recipe - package.json - Sync Environment - Handle Corepack.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonSyncEnvironmentHandleCorepackWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonSyncEnvironmentHandleCorepackReturns = void;

export type CliRecipePackageJsonSyncEnvironmentHandleCorepackFileContents = Record<string, unknown>;

export type CliRecipePackageJsonSyncEnvironmentHandleCorepackManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonSyncEnvironmentHandleCorepackPackageManager = unknown;

/**
 * CLI - Recipe - package.json - Sync Environment - Is Empty.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonSyncEnvironmentIsEmptyValue = unknown;

export type CliRecipePackageJsonSyncEnvironmentIsEmptyReturns = boolean;

/**
 * CLI - Recipe - package.json - Sync Environment - Run.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonSyncEnvironmentRunOptionsDryRun = true;

export type CliRecipePackageJsonSyncEnvironmentRunOptionsReplaceFile = true;

export type CliRecipePackageJsonSyncEnvironmentRunOptions = {
  dryRun?: CliRecipePackageJsonSyncEnvironmentRunOptionsDryRun;
  replaceFile?: CliRecipePackageJsonSyncEnvironmentRunOptionsReplaceFile;
};

export type CliRecipePackageJsonSyncEnvironmentRunReturns = Promise<void>;

export type CliRecipePackageJsonSyncEnvironmentRunCurrentDirectory = string;

export type CliRecipePackageJsonSyncEnvironmentRunIsAtProjectRoot = boolean;

export type CliRecipePackageJsonSyncEnvironmentRunIsDryRun = boolean;

export type CliRecipePackageJsonSyncEnvironmentRunIsReplaceFile = boolean;

export type CliRecipePackageJsonSyncEnvironmentRunReplaceFileNotice = string;

export type CliRecipePackageJsonSyncEnvironmentRunNovaConfig = LibNovaConfig;

export type CliRecipePackageJsonSyncEnvironmentRunWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonSyncEnvironmentRunWorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonSyncEnvironmentRunEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonSyncEnvironmentRunWorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonSyncEnvironmentRunWorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonSyncEnvironmentRunRecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonSyncEnvironmentRunWorkspaces = SharedWorkspaceManifest[];

/**
 * CLI - Recipe - package.json - Sync Environment - Sync Node Constraint.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintConstraint = string;

export type CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintReturns = void;

export type CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintEngines = unknown;

export type CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintCurrentNode = unknown;

export type CliRecipePackageJsonSyncEnvironmentSyncNodeConstraintPrevious = string;
