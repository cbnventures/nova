import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_PackageJson,
  Shared_NovaConfig_Recipes_PackageJsonWorkspace,
  Shared_NovaConfigConfig,
  Shared_NovaConfigWorkspace,
  Shared_WorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Modules - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Workspace = Shared_WorkspaceManifest;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Returns = void;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_Manifest = Shared_NovaConfigWorkspace;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageExports = unknown;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageMain = unknown;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageType = unknown;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageBrowser = unknown;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_PackageImports = unknown;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_CurrentPackageExports = unknown;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Handle_CurrentExportsBrowser = unknown;

/**
 * CLI - Recipe - package.json - Normalize Modules - Run.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Options = {
  dryRun?: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_WorkingFileWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_ConfigRecipes = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_ConfigRecipesPackageJson = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_EligibleWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_EligiblePath = string;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_EligibleWorkspaceRecipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_EligibleEntry = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_PackageJson_NormalizeModules_Runner_Run_Workspaces = Shared_WorkspaceManifest[];
