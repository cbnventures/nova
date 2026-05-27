import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_NovaConfigConfig as SharedNovaConfigConfig,
  Shared_NovaConfigWorkspace as SharedNovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Recipes as SharedNovaConfigWorkspaceRecipes,
  Shared_NovaConfigWorkspaceRecipeSettings as SharedNovaConfigWorkspaceRecipeSettings,
  Shared_NovaConfigWorkspaceRecipeTuple as SharedNovaConfigWorkspaceRecipeTuple,
  Shared_WorkspaceManifest as SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Sync Environment - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Manifest = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageEngines = unknown;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageOs = unknown;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageCpu = unknown;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageLibc = unknown;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_PackageDevEngines = unknown;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_LtsConstraint = string | undefined;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Recipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_RecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_RecipeSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_TrackNodeLtsVersions = boolean;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_ExistingNode = string;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_LtsMatches = RegExpExecArray[];

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_LtsMajors = number[];

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_Branches = string[];

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_CoversAll = boolean;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_GeMatch = RegExpMatchArray | null;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Handle_MajorMatch = RegExpMatchArray | null;

/**
 * CLI - Recipe - package.json - Sync Environment - Handle Corepack.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Returns = void;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_Manifest = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_HandleCorepack_PackageManager = unknown;

/**
 * CLI - Recipe - package.json - Sync Environment - Is Empty.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_IsEmpty_Value = unknown;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_IsEmpty_Returns = boolean;

/**
 * CLI - Recipe - package.json - Sync Environment - Run.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Options = {
  dryRun?: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkingFile = SharedNovaConfigConfig;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_EligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_WorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_RecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_Run_Workspaces = SharedWorkspaceManifest[];

/**
 * CLI - Recipe - package.json - Sync Environment - Sync Node Constraint.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Constraint = string;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Returns = void;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Engines = unknown;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_CurrentNode = unknown;

export type Cli_Recipe_PackageJson_SyncEnvironment_Runner_SyncNodeConstraint_Previous = string;
