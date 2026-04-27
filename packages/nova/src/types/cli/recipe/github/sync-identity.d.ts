import type {
  SharedNovaConfigGithub,
  SharedNovaConfigGithubRecipes,
  SharedShellOutput,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Identity - Normalize Topics.
 *
 * @since 0.22.0
 */
export type CliRecipeGithubSyncIdentityNormalizeTopicsKeywords = string[] | undefined;

export type CliRecipeGithubSyncIdentityNormalizeTopicsReturns = string[] | undefined;

export type CliRecipeGithubSyncIdentityNormalizeTopicsPatternWhitespaceOrUnderscore = RegExp;

export type CliRecipeGithubSyncIdentityNormalizeTopicsNonTopicPattern = RegExp;

export type CliRecipeGithubSyncIdentityNormalizeTopicsPatternLeadingOrTrailing = RegExp;

export type CliRecipeGithubSyncIdentityNormalizeTopicsNormalized = string[];

export type CliRecipeGithubSyncIdentityNormalizeTopicsStep1 = string;

export type CliRecipeGithubSyncIdentityNormalizeTopicsStep2 = string;

export type CliRecipeGithubSyncIdentityNormalizeTopicsStep3 = string;

export type CliRecipeGithubSyncIdentityNormalizeTopicsStep4 = string;

export type CliRecipeGithubSyncIdentityNormalizeTopicsDeduped = string[];

export type CliRecipeGithubSyncIdentityNormalizeTopicsKeyword = string;

/**
 * CLI - Recipe - GitHub - Sync Identity - Run.
 *
 * @since 0.22.0
 */
export type CliRecipeGithubSyncIdentityRunOptionsDryRun = true;

export type CliRecipeGithubSyncIdentityRunOptions = {
  dryRun?: CliRecipeGithubSyncIdentityRunOptionsDryRun;
};

export type CliRecipeGithubSyncIdentityRunReturns = Promise<void>;

export type CliRecipeGithubSyncIdentityRunCurrentDirectory = string;

export type CliRecipeGithubSyncIdentityRunIsAtProjectRoot = boolean;

export type CliRecipeGithubSyncIdentityRunIsDryRun = boolean;

export type CliRecipeGithubSyncIdentityRunWorkingFile = import('../../../shared.d.ts').SharedNovaConfigConfig;

export type CliRecipeGithubSyncIdentityRunGithub = SharedNovaConfigGithub | undefined;

export type CliRecipeGithubSyncIdentityRunRecipes = SharedNovaConfigGithubRecipes | undefined;

export type CliRecipeGithubSyncIdentityRunOwner = string | undefined;

export type CliRecipeGithubSyncIdentityRunRepo = string | undefined;

export type CliRecipeGithubSyncIdentityRunIsCommandOnPath = boolean;

export type CliRecipeGithubSyncIdentityRunGhVersionOutput = SharedShellOutput;

export type CliRecipeGithubSyncIdentityRunGhVersionPattern = RegExp;

export type CliRecipeGithubSyncIdentityRunGhVersionMatch = RegExpMatchArray | null;

export type CliRecipeGithubSyncIdentityRunGhVersion = string;

export type CliRecipeGithubSyncIdentityRunAuthStatus = SharedShellOutput;

export type CliRecipeGithubSyncIdentityRunViewResult = SharedShellOutput;

export type CliRecipeGithubSyncIdentityRunViewerPermission = string | undefined;

export type CliRecipeGithubSyncIdentityRunViewerPermissionParsedViewerPermission = string | undefined;

export type CliRecipeGithubSyncIdentityRunViewerPermissionParsed = {
  viewerPermission?: CliRecipeGithubSyncIdentityRunViewerPermissionParsedViewerPermission;
};

export type CliRecipeGithubSyncIdentityRunPermission = string[];

export type CliRecipeGithubSyncIdentityRunDescription = string | undefined;

export type CliRecipeGithubSyncIdentityRunHomepage = string | undefined;

export type CliRecipeGithubSyncIdentityRunKeywords = string[] | undefined;

export type CliRecipeGithubSyncIdentityRunTopics = string[] | undefined;

export type CliRecipeGithubSyncIdentityRunEditFlags = string[];

export type CliRecipeGithubSyncIdentityRunEditCommand = string;

export type CliRecipeGithubSyncIdentityRunEditResult = SharedShellOutput;

export type CliRecipeGithubSyncIdentityRunTopicFlags = string;

export type CliRecipeGithubSyncIdentityRunTopicsCommand = string;

export type CliRecipeGithubSyncIdentityRunTopicsResult = SharedShellOutput;
