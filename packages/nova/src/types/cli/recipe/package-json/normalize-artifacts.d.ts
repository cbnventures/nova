import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_NovaConfigConfig as SharedNovaConfigConfig,
  Shared_NovaConfigWorkspace as SharedNovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Recipes as SharedNovaConfigWorkspaceRecipes,
  Shared_NovaConfigWorkspaceRecipeTuple as SharedNovaConfigWorkspaceRecipeTuple,
  Shared_WorkspaceManifest as SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Artifacts - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_Manifest = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageFiles = unknown;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageBin = unknown;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageMan = unknown;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageDirectories = unknown;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_PackageName = string;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Handle_BinName = string | undefined;

/**
 * CLI - Recipe - package.json - Normalize Artifacts - Handle Publish.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_Manifest = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_PackagePrivate = unknown;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_PackagePublishConfig = unknown;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_HandlePublish_PrivateValue = boolean;

/**
 * CLI - Recipe - package.json - Normalize Artifacts - Is Empty.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_IsEmpty_Value = unknown;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_IsEmpty_Returns = boolean;

/**
 * CLI - Recipe - package.json - Normalize Artifacts - Run.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Options = {
  dryRun?: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkingFile = SharedNovaConfigConfig;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_EligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_WorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_RecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_NormalizeArtifacts_Runner_Run_Workspaces = SharedWorkspaceManifest[];
