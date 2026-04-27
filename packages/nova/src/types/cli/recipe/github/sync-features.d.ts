import type {
  SharedNovaConfigGithub,
  SharedNovaConfigGithubFeatures,
  SharedNovaConfigGithubRecipes,
  SharedShellOutput,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Features - Run.
 *
 * @since 0.22.0
 */
export type CliRecipeGithubSyncFeaturesRunOptionsDryRun = true;

export type CliRecipeGithubSyncFeaturesRunOptions = {
  dryRun?: CliRecipeGithubSyncFeaturesRunOptionsDryRun;
};

export type CliRecipeGithubSyncFeaturesRunReturns = Promise<void>;

export type CliRecipeGithubSyncFeaturesRunCurrentDirectory = string;

export type CliRecipeGithubSyncFeaturesRunIsAtProjectRoot = boolean;

export type CliRecipeGithubSyncFeaturesRunIsDryRun = boolean;

export type CliRecipeGithubSyncFeaturesRunWorkingFile = import('../../../shared.d.ts').SharedNovaConfigConfig;

export type CliRecipeGithubSyncFeaturesRunGithub = SharedNovaConfigGithub | undefined;

export type CliRecipeGithubSyncFeaturesRunRecipes = SharedNovaConfigGithubRecipes | undefined;

export type CliRecipeGithubSyncFeaturesRunOwner = string | undefined;

export type CliRecipeGithubSyncFeaturesRunRepo = string | undefined;

export type CliRecipeGithubSyncFeaturesRunIsCommandOnPath = boolean;

export type CliRecipeGithubSyncFeaturesRunGhVersionOutput = SharedShellOutput;

export type CliRecipeGithubSyncFeaturesRunGhVersionPattern = RegExp;

export type CliRecipeGithubSyncFeaturesRunGhVersionMatch = RegExpMatchArray | null;

export type CliRecipeGithubSyncFeaturesRunGhVersion = string;

export type CliRecipeGithubSyncFeaturesRunAuthStatus = SharedShellOutput;

export type CliRecipeGithubSyncFeaturesRunViewResult = SharedShellOutput;

export type CliRecipeGithubSyncFeaturesRunViewerPermission = string | undefined;

export type CliRecipeGithubSyncFeaturesRunViewerPermissionParsedViewerPermission = string | undefined;

export type CliRecipeGithubSyncFeaturesRunViewerPermissionParsed = {
  viewerPermission?: CliRecipeGithubSyncFeaturesRunViewerPermissionParsedViewerPermission;
};

export type CliRecipeGithubSyncFeaturesRunPermission = string[];

export type CliRecipeGithubSyncFeaturesRunFeatures = SharedNovaConfigGithubFeatures | undefined;

export type CliRecipeGithubSyncFeaturesRunFlags = string[];

export type CliRecipeGithubSyncFeaturesRunCommand = string;

export type CliRecipeGithubSyncFeaturesRunResult = SharedShellOutput;
