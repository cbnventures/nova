import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type { Shared_GeneratorRunResult as SharedGeneratorRunResult, Shared_NovaConfig as SharedNovaConfig } from '../../../shared.d.ts';

/**
 * CLI - Generate - GitHub - Funding - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_Github_Funding_Runner_Run_Options_DryRun = true;

export type Cli_Generate_Github_Funding_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_Github_Funding_Runner_Run_Options = {
  dryRun?: Cli_Generate_Github_Funding_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_Github_Funding_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_Github_Funding_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_Github_Funding_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_Github_Funding_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_Github_Funding_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_Github_Funding_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_Github_Funding_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_Github_Funding_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Generate_Github_Funding_Runner_Run_WorkingFile = SharedNovaConfig;

export type Cli_Generate_Github_Funding_Runner_Run_Urls = SharedNovaConfig['urls'];

export type Cli_Generate_Github_Funding_Runner_Run_FundSources = string[];

export type Cli_Generate_Github_Funding_Runner_Run_GithubSponsor = string;

export type Cli_Generate_Github_Funding_Runner_Run_CustomDonations = string[];

export type Cli_Generate_Github_Funding_Runner_Run_IsGitHubSponsor = boolean;

export type Cli_Generate_Github_Funding_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_Github_Funding_Runner_Run_TemplatePath = string;

export type Cli_Generate_Github_Funding_Runner_Run_Template = string;

export type Cli_Generate_Github_Funding_Runner_Run_Stripped = string;

export type Cli_Generate_Github_Funding_Runner_Run_CustomDonationSeparator = string;

export type Cli_Generate_Github_Funding_Runner_Run_CustomDonationList = string;

export type Cli_Generate_Github_Funding_Runner_Run_Content = string;

export type Cli_Generate_Github_Funding_Runner_Run_TargetPath = string;
