import type {
  SharedNovaConfigGithub,
  SharedNovaConfigGithubPolicies,
  SharedNovaConfigGithubPoliciesMergeMethods,
  SharedNovaConfigGithubRecipes,
  SharedShellOutput,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Policies - Run.
 *
 * @since 0.22.0
 */
export type CliRecipeGithubSyncPoliciesRunOptionsDryRun = true;

export type CliRecipeGithubSyncPoliciesRunOptions = {
  dryRun?: CliRecipeGithubSyncPoliciesRunOptionsDryRun;
};

export type CliRecipeGithubSyncPoliciesRunReturns = Promise<void>;

export type CliRecipeGithubSyncPoliciesRunCurrentDirectory = string;

export type CliRecipeGithubSyncPoliciesRunIsAtProjectRoot = boolean;

export type CliRecipeGithubSyncPoliciesRunIsDryRun = boolean;

export type CliRecipeGithubSyncPoliciesRunWorkingFile = import('../../../shared.d.ts').SharedNovaConfigConfig;

export type CliRecipeGithubSyncPoliciesRunGithub = SharedNovaConfigGithub | undefined;

export type CliRecipeGithubSyncPoliciesRunRecipes = SharedNovaConfigGithubRecipes | undefined;

export type CliRecipeGithubSyncPoliciesRunOwner = string | undefined;

export type CliRecipeGithubSyncPoliciesRunRepo = string | undefined;

export type CliRecipeGithubSyncPoliciesRunIsCommandOnPath = boolean;

export type CliRecipeGithubSyncPoliciesRunGhVersionOutput = SharedShellOutput;

export type CliRecipeGithubSyncPoliciesRunGhVersionPattern = RegExp;

export type CliRecipeGithubSyncPoliciesRunGhVersionMatch = RegExpMatchArray | null;

export type CliRecipeGithubSyncPoliciesRunGhVersion = string;

export type CliRecipeGithubSyncPoliciesRunAuthStatus = SharedShellOutput;

export type CliRecipeGithubSyncPoliciesRunViewResult = SharedShellOutput;

export type CliRecipeGithubSyncPoliciesRunViewerPermission = string | undefined;

export type CliRecipeGithubSyncPoliciesRunViewerPermissionParsedViewerPermission = string | undefined;

export type CliRecipeGithubSyncPoliciesRunViewerPermissionParsed = {
  viewerPermission?: CliRecipeGithubSyncPoliciesRunViewerPermissionParsedViewerPermission;
};

export type CliRecipeGithubSyncPoliciesRunPermission = string[];

export type CliRecipeGithubSyncPoliciesRunPolicies = SharedNovaConfigGithubPolicies | undefined;

export type CliRecipeGithubSyncPoliciesRunFlags = string[];

export type CliRecipeGithubSyncPoliciesRunMergeMethods = SharedNovaConfigGithubPoliciesMergeMethods | undefined;

export type CliRecipeGithubSyncPoliciesRunCommand = string;

export type CliRecipeGithubSyncPoliciesRunResult = SharedShellOutput;
