import type {
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_ReadMe,
  Shared_NovaConfigConfig,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - Read Me - Update Badges - Run.
 *
 * @since 0.21.0
 */
export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_Options = {
  dryRun?: Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_ReadMeRecipes = Shared_NovaConfig_Recipes_ReadMe | undefined;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_UpdateBadges = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_NewInnerContent = string | undefined;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_RootPath = string;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_TargetPaths = string[];

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_UpdatedCount = number;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_SkippedCount = number;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_AlreadyCurrentCount = number;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_NotFoundCount = number;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_Run_Result = 'updated' | 'skipped' | 'already-current' | 'not-found';

/**
 * CLI - Recipe - Read Me - Update Badges - Update Read Me File.
 *
 * @since 0.21.0
 */
export type Cli_Recipe_ReadMe_UpdateBadges_Runner_UpdateReadMeFile_FilePath = string;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_UpdateReadMeFile_NewInnerContent = string;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_UpdateReadMeFile_IsDryRun = boolean;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_UpdateReadMeFile_IsReplaceFile = boolean;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_UpdateReadMeFile_Returns = Promise<'updated' | 'skipped' | 'already-current' | 'not-found'>;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_UpdateReadMeFile_TargetExists = boolean;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_UpdateReadMeFile_CurrentContent = string;

export type Cli_Recipe_ReadMe_UpdateBadges_Runner_UpdateReadMeFile_Spliced = string | undefined;
