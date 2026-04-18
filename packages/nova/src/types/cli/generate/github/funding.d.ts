import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type { SharedNovaConfig } from '../../../shared.d.ts';

/**
 * CLI - Generate - GitHub - Funding - Run.
 *
 * @since 0.15.0
 */
export type CliGenerateGithubFundingRunOptionsDryRun = true;

export type CliGenerateGithubFundingRunOptionsReplaceFile = true;

export type CliGenerateGithubFundingRunOptions = {
  dryRun?: CliGenerateGithubFundingRunOptionsDryRun;
  replaceFile?: CliGenerateGithubFundingRunOptionsReplaceFile;
};

export type CliGenerateGithubFundingRunReturns = Promise<void>;

export type CliGenerateGithubFundingRunCurrentDirectory = string;

export type CliGenerateGithubFundingRunIsAtProjectRoot = boolean;

export type CliGenerateGithubFundingRunIsDryRun = boolean;

export type CliGenerateGithubFundingRunIsReplaceFile = boolean;

export type CliGenerateGithubFundingRunReplaceFileNotice = string;

export type CliGenerateGithubFundingRunNovaConfig = LibNovaConfig;

export type CliGenerateGithubFundingRunWorkingFile = SharedNovaConfig;

export type CliGenerateGithubFundingRunUrls = SharedNovaConfig['urls'];

export type CliGenerateGithubFundingRunFundSources = string[];

export type CliGenerateGithubFundingRunGithubSponsor = string;

export type CliGenerateGithubFundingRunCustomDonations = string[];

export type CliGenerateGithubFundingRunIsGitHubSponsor = boolean;

export type CliGenerateGithubFundingRunTemplateDirectory = string;

export type CliGenerateGithubFundingRunTemplatePath = string;

export type CliGenerateGithubFundingRunTemplate = string;

export type CliGenerateGithubFundingRunStripped = string;

export type CliGenerateGithubFundingRunCustomDonationSeparator = string;

export type CliGenerateGithubFundingRunCustomDonationList = string;

export type CliGenerateGithubFundingRunContent = string;

export type CliGenerateGithubFundingRunTargetPath = string;
