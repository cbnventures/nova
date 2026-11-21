import type {
  Shared_DescriptionDestination,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_GithubAction,
  Shared_NovaConfigConfig,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - GitHub Action - Sync Identity - Find Action File.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_WorkspaceDirectory = string;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_Returns = Promise<string | undefined>;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_Candidates = string[];

/**
 * CLI - Recipe - GitHub Action - Sync Identity - Report.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_IsSilent = boolean;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Level = 'info' | 'warn';

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Message = string;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Returns = void;

/**
 * CLI - Recipe - GitHub Action - Sync Identity - Run.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Options = {
  dryRun?: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_GithubActionRecipes = Shared_NovaConfig_Recipes_GithubAction | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_SyncIdentity = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_WorkspacePaths = string[];

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_TargetCount = number;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_ActionFilePath = string | undefined;

/**
 * CLI - Recipe - GitHub Action - Sync Identity - Sync File.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_FilePath = string;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_WorkspacePath = string | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsDryRun = boolean;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsReplaceFile = boolean;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsSilent = boolean;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Returns = Promise<boolean>;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DisplayPath = string;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Content = string;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_OwnerPath = string | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DescriptionDestination = Shared_DescriptionDestination;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Description = string | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DescriptionLimitMessage = string | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_UpdatedContent = string;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Title = string;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_NameContent = string | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DescriptionContent = string | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Author = string | undefined;

export type Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_AuthorContent = string | undefined;
