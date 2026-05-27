import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_NovaConfigConfig as SharedNovaConfigConfig,
  Shared_NovaConfigWorkspace as SharedNovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Recipes as SharedNovaConfigWorkspaceRecipes,
  Shared_NovaConfigWorkspaceRecipeTuple as SharedNovaConfigWorkspaceRecipeTuple,
  Shared_WorkspaceManifest as SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Bundler - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Returns = void;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_Manifest = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageTypes = unknown;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageTypings = unknown;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageModule = unknown;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageSideEffects = unknown;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_PackageEsnext = unknown;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_AllowsTypesModule = boolean;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Handle_AllowsSideEffectsEsnext = boolean;

/**
 * CLI - Recipe - package.json - Normalize Bundler - Run.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Options = {
  dryRun?: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkingFile = SharedNovaConfigConfig;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_EligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_WorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_RecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_NormalizeBundler_Runner_Run_Workspaces = SharedWorkspaceManifest[];
