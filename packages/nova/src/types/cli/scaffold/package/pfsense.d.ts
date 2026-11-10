/**
 * CLI - Scaffold - Package - Pfsense.
 *
 * @since 0.29.0
 */
import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_Urls,
  Shared_NovaConfig_Urls_FundSources,
  Shared_NovaConfigEntity,
} from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Package - Pfsense - Escape PHP Single Quoted.
 *
 * @since 0.39.0
 */
export type Cli_Scaffold_Package_Pfsense_Runner_EscapePhpSingleQuoted_Value = string;

export type Cli_Scaffold_Package_Pfsense_Runner_EscapePhpSingleQuoted_Returns = string;

/**
 * CLI - Scaffold - Package - Pfsense - Resolve Github Repository.
 *
 * @since 0.39.0
 */
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_RepositoryUrl = string;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Returns = Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_GithubRepository | undefined;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_GithubRepository_Owner = string;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_GithubRepository_Repo = string;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_GithubRepository = {
  owner: Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_GithubRepository_Owner;
  repo: Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_GithubRepository_Repo;
};
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_NormalizedRepositoryUrl = string;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_ParsedRepositoryUrl = URL;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_PathSegments = string[];
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Owner = string | undefined;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Repo = string | undefined;

/**
 * CLI - Scaffold - Package - Pfsense - Resolve Replacements.
 *
 * @since 0.39.0
 */
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_WorkspaceName = string;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_ConfigRoot = string;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Returns = Promise<Map<RegExp, string> | undefined>;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Config = Shared_NovaConfig;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Entities = Shared_NovaConfig_Entities;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Author = Shared_NovaConfigEntity | undefined;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_AuthorEmail = string | undefined;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_ProjectDescription = string;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Urls = Shared_NovaConfig_Urls;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_FundSources = Shared_NovaConfig_Urls_FundSources;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_FundSourcesLiteral = string;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_RepositoryUrl = string;

export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepositoryOwner = string;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepositoryRepo = string;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepository = {
  owner: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepositoryOwner;
  repo: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepositoryRepo;
} | undefined;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateApiUrl = string;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateDownloadPrefix = string;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateDefaultFrequency = string;
export type Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateSettingsDescription = string;

/**
 * CLI - Scaffold - Package - Pfsense - Run.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_Package_Pfsense_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_Package_Pfsense_Runner_Run_Options_Install = boolean;
export type Cli_Scaffold_Package_Pfsense_Runner_Run_Options_Name = string;
export type Cli_Scaffold_Package_Pfsense_Runner_Run_Options_NonInteractive = true;
export type Cli_Scaffold_Package_Pfsense_Runner_Run_Options_Output = string;
export type Cli_Scaffold_Package_Pfsense_Runner_Run_Options_WorkspaceName = string;
export type Cli_Scaffold_Package_Pfsense_Runner_Run_Options = {
  dryRun?: Cli_Scaffold_Package_Pfsense_Runner_Run_Options_DryRun;
  install?: Cli_Scaffold_Package_Pfsense_Runner_Run_Options_Install;
  name?: Cli_Scaffold_Package_Pfsense_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_Package_Pfsense_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_Package_Pfsense_Runner_Run_Options_Output;
  workspaceName?: Cli_Scaffold_Package_Pfsense_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_Package_Pfsense_Runner_Run_Returns = Promise<void>;
