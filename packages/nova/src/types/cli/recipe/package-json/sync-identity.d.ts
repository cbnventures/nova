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
 * CLI - Recipe - package.json - Sync Identity - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_WorkingFile = SharedNovaConfigConfig;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FilePath = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Manifest = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageName = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageVersion = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageDescription = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageKeywords = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageLicense = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Recipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RecipeSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidVersion = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidDescription = string | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidKeywords = string[] | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_SpdxLicenses = Set<string> | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageDirectory = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ProjectRoot = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_LicenseCandidates = string[];

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ResolvedLicensePath = string | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RelativeLicensePath = string | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_NormalizedLicenseReference = string | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FallbackLicense = string;

/**
 * CLI - Recipe - package.json - Sync Identity - Run.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Options = {
  dryRun?: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkingFile = SharedNovaConfigConfig;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_EligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkspaceConfig = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkspaceRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_RecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Workspaces = SharedWorkspaceManifest[];
