import type {
  Shared_NovaConfig_Github,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_Github,
  Shared_NovaConfigConfig,
  Shared_NovaConfigGithubRecipeName,
  Shared_ShellOutput,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - GitHub - Gh Precheck - Gh Precheck.
 *
 * @since 0.23.0
 */
export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_RecipeName = Shared_NovaConfigGithubRecipeName;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Options_DryRun = true;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Options = {
  dryRun?: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Options_DryRun;
};

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_Github = Shared_NovaConfig_Github;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_Owner = string;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_Repo = string;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_IsDryRun = boolean;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result = {
  workingFile: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_WorkingFile;
  github: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_Github;
  owner: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_Owner;
  repo: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_Repo;
  isDryRun: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result_IsDryRun;
};

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Returns = Promise<Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result | undefined>;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_CurrentDirectory = string;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_IsAtProjectRoot = boolean;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_IsDryRun = boolean;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Github = Shared_NovaConfig_Github | undefined;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_GithubRecipes = Shared_NovaConfig_Recipes_Github | undefined;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_RecipeEntry = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Owner = string | undefined;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Repo = string | undefined;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_IsCommandOnPath = boolean;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersionOutput = Shared_ShellOutput;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersionPattern = RegExp;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersionMatch = RegExpMatchArray | null;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_GhVersion = string;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_AuthStatus = Shared_ShellOutput;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_ViewResult = Shared_ShellOutput;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_ViewerPermission = string | undefined;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Parsed_ViewerPermission = string | undefined;

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Parsed = {
  viewerPermission?: Cli_Recipe_Github_GhPrecheck_GhPrecheck_Parsed_ViewerPermission;
};

export type Cli_Recipe_Github_GhPrecheck_GhPrecheck_Permission = string[];
