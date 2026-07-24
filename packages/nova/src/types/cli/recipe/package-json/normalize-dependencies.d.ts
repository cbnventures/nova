import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
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
 * CLI - Recipe - package.json - Normalize Dependencies - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Workspace = Shared_WorkspaceManifest;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_Manifest = Shared_NovaConfigWorkspace;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageDependencies = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageDevDependencies = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackagePeerDependencies = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackagePeerDependenciesMeta = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageBundleDependencies = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageBundledDependencies = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageOptionalDependencies = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_PackageOverrides = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_BundleDependencies = unknown[];

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_BundledDependencies = unknown[];

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Handle_MergedBundleDependencies = unknown[];

/**
 * CLI - Recipe - package.json - Normalize Dependencies - Is Empty.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_IsEmpty_Value = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_IsEmpty_Returns = boolean;

/**
 * CLI - Recipe - package.json - Normalize Dependencies - Pin Dependencies.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Workspace = Shared_WorkspaceManifest;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_PinDependencyVersions = boolean;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_PinDevDependencyVersions = boolean;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Returns = number;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepGroups = string[];

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Pinned = number;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Unpinnable = number;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Deps = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepEntries = [string, unknown][];

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepName = string;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_DepVersion = unknown;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_PinDependencies_Stripped = string | undefined;

/**
 * CLI - Recipe - package.json - Normalize Dependencies - Run.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Options = {
  dryRun?: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkingFileWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_EligibleWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkspacePathFilter = string;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipesFilter = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_PackageJsonRecipesFilter = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkspaceRecipesFilter = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipeEntryFilter = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Workspaces = Shared_WorkspaceManifest[];

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_HasUnpinnable = boolean;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkspacePath = string;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_PackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_WorkspaceRecipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipeEntry = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_RecipeSettings = Shared_NovaConfig_RecipeEntry_Settings | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_PinDependencyVersions = boolean;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_PinDevDependencyVersions = boolean;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_Run_Count = number;

/**
 * CLI - Recipe - package.json - Normalize Dependencies - Strip Prefix.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Version = string;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Returns = string | undefined;

export type Cli_Recipe_PackageJson_NormalizeDependencies_Runner_StripPrefix_Match = RegExpMatchArray | null;
