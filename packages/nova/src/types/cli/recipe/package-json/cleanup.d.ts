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
 * CLI - Recipe - package.json - Cleanup - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_Cleanup_Runner_Handle_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Handle_RemoveUnknownKeys = boolean;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Handle_ReorderKeys = boolean;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Handle_Returns = void;

/**
 * CLI - Recipe - package.json - Cleanup - Handle Reorder.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Returns = void;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Manifest = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_SortedKeys = Set<string>;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_CurrentKeys = string[];

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Reordered = Record<string, unknown>;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_Value = unknown;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_UnknownValue = unknown;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_ReorderedKeys = string[];

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleReorder_ReorderedEntries = [string, unknown][];

/**
 * CLI - Recipe - package.json - Cleanup - Handle Unknown.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_Returns = void;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_AllowedKeys = Set<string>;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_ManifestContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_ManifestKeys = string[];

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_UnknownKeys = string[];

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_FormattedUnknownKeys = string;

export type Cli_Recipe_PackageJson_Cleanup_Runner_HandleUnknown_UnsupportedMessage = string;

/**
 * CLI - Recipe - package.json - Cleanup - Run.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_Options = {
  dryRun?: Cli_Recipe_PackageJson_Cleanup_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_PackageJson_Cleanup_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkingFile = SharedNovaConfigConfig;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_EligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_EligibleConfig = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_EligibleRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_EligibleTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_Workspaces = SharedWorkspaceManifest[];

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfig = [string, SharedNovaConfigWorkspace] | undefined;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfigEntry = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_WorkspaceConfigEntryRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_RemoveUnknownKeys = boolean;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_ReorderKeys = boolean;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_CleanupRecipe = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_Cleanup_Runner_Run_CleanupRecipeSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;
