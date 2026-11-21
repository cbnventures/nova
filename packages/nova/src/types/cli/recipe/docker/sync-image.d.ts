import type {
  Shared_DockerPackagingSyncResult,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_Docker,
  Shared_NovaConfigConfig,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - Docker - Sync Image - Report.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Docker_SyncImage_Runner_Report_Result = Shared_DockerPackagingSyncResult;

export type Cli_Recipe_Docker_SyncImage_Runner_Report_IsDryRun = boolean;

export type Cli_Recipe_Docker_SyncImage_Runner_Report_Returns = void;

export type Cli_Recipe_Docker_SyncImage_Runner_Report_ChangedCount = number;

export type Cli_Recipe_Docker_SyncImage_Runner_Report_Verb = string;

/**
 * CLI - Recipe - Docker - Sync Image - Run.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Docker_SyncImage_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Docker_SyncImage_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_Docker_SyncImage_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_Docker_SyncImage_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_DockerRecipes = Shared_NovaConfig_Recipes_Docker | undefined;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_SyncImage = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_Result = Shared_DockerPackagingSyncResult | undefined;

export type Cli_Recipe_Docker_SyncImage_Runner_Run_ErrorMessage = string;
