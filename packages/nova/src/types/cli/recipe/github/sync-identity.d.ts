import type {
  Shared_NovaConfig_Github as SharedNovaConfigGithub,
  Shared_NovaConfig_Github_Recipes as SharedNovaConfigGithubRecipes,
  Shared_ShellOutput as SharedShellOutput,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Identity - Normalize Topics.
 *
 * @since 0.22.0
 */
export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Keywords = string[] | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Returns = string[] | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_PatternWhitespaceOrUnderscore = RegExp;

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_NonTopicPattern = RegExp;

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_PatternLeadingOrTrailing = RegExp;

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Normalized = string[];

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step1 = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step2 = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step3 = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step4 = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Deduped = string[];

export type Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Keyword = string;

/**
 * CLI - Recipe - GitHub - Sync Identity - Run.
 *
 * @since 0.22.0
 */
export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Github_SyncIdentity_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_WorkingFile = import('../../../shared.d.ts').Shared_NovaConfigConfig;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Github = SharedNovaConfigGithub | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Recipes = SharedNovaConfigGithubRecipes | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Owner = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Repo = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_IsCommandOnPath = boolean;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_GhVersionOutput = SharedShellOutput;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_GhVersionPattern = RegExp;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_GhVersionMatch = RegExpMatchArray | null;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_GhVersion = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_AuthStatus = SharedShellOutput;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_ViewResult = SharedShellOutput;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_ViewerPermission = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_ViewerPermissionParsed_ViewerPermission = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_ViewerPermissionParsed = {
  viewerPermission?: Cli_Recipe_Github_SyncIdentity_Runner_Run_ViewerPermissionParsed_ViewerPermission;
};

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Permission = string[];

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Description = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Homepage = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Keywords = string[] | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Topics = string[] | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_EditFlags = string[];

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_EditCommand = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_EditResult = SharedShellOutput;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicFlags = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsCommand = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsResult = SharedShellOutput;
