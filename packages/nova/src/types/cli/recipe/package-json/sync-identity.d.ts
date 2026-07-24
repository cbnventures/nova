import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_NovaConfig_Project_License,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_RecipeEntry_Settings,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_PackageJson,
  Shared_NovaConfig_Recipes_PackageJsonWorkspace,
  Shared_NovaConfigConfig,
  Shared_NovaConfigWorkspace,
  Shared_WorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Sync Identity - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Workspace = Shared_WorkspaceManifest;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_FilePath = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Manifest = Shared_NovaConfigWorkspace;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageName = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageVersion = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageDescription = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageKeywords = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageLicense = unknown;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_WorkspacePath = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_PackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_WorkspaceRecipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RecipeEntry = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_RecipeSettings = Shared_NovaConfig_RecipeEntry_Settings | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidVersion = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidDescription = string | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ValidKeywords = string[] | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_SpdxLicenses = Set<string> | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_ConfigLicense = Shared_NovaConfig_Project_License | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Handle_DesiredLicense = string | undefined;

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

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkingFileWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_EligibleWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkspacePathFilter = string;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_RecipesFilter = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_PackageJsonRecipesFilter = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_WorkspaceRecipesFilter = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_RecipeEntryFilter = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_PackageJson_SyncIdentity_Runner_Run_Workspaces = Shared_WorkspaceManifest[];
