import type {
  Shared_NovaConfig_Github as SharedNovaConfigGithub,
  Shared_NovaConfig_Github_Features as SharedNovaConfigGithubFeatures,
  Shared_NovaConfig_Github_Recipes as SharedNovaConfigGithubRecipes,
  Shared_ShellOutput as SharedShellOutput,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Features - Run.
 *
 * @since 0.22.0
 */
export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Github_SyncFeatures_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_WorkingFile = import('../../../shared.d.ts').Shared_NovaConfigConfig;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Github = SharedNovaConfigGithub | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Recipes = SharedNovaConfigGithubRecipes | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Owner = string | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Repo = string | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_IsCommandOnPath = boolean;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersionOutput = SharedShellOutput;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersionPattern = RegExp;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersionMatch = RegExpMatchArray | null;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_GhVersion = string;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_AuthStatus = SharedShellOutput;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_ViewResult = SharedShellOutput;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_ViewerPermission = string | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Parsed_ViewerPermission = string | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Parsed = {
  viewerPermission?: Cli_Recipe_Github_SyncFeatures_Runner_Run_Parsed_ViewerPermission;
};

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Permission = string[];

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Features = SharedNovaConfigGithubFeatures | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Flags = string[];

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Command = string;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Result = SharedShellOutput;
