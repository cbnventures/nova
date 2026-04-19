import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type { SharedGeneratorRunResult, SharedNovaConfig } from '../../../shared.d.ts';

/**
 * CLI - Generate - GitHub - Issue Template - Run.
 *
 * @since 0.15.0
 */
export type CliGenerateGithubIssueTemplateRunOptionsDryRun = true;

export type CliGenerateGithubIssueTemplateRunOptionsReplaceFile = true;

export type CliGenerateGithubIssueTemplateRunOptions = {
  dryRun?: CliGenerateGithubIssueTemplateRunOptionsDryRun;
  replaceFile?: CliGenerateGithubIssueTemplateRunOptionsReplaceFile;
};

export type CliGenerateGithubIssueTemplateRunReturns = Promise<SharedGeneratorRunResult>;

export type CliGenerateGithubIssueTemplateRunCurrentDirectory = string;

export type CliGenerateGithubIssueTemplateRunIsAtProjectRoot = boolean;

export type CliGenerateGithubIssueTemplateRunIsDryRun = boolean;

export type CliGenerateGithubIssueTemplateRunIsReplaceFile = boolean;

export type CliGenerateGithubIssueTemplateRunReplaceFileNotice = string;

export type CliGenerateGithubIssueTemplateRunNovaConfig = LibNovaConfig;

export type CliGenerateGithubIssueTemplateRunWorkingFile = SharedNovaConfig;

export type CliGenerateGithubIssueTemplateRunProject = SharedNovaConfig['project'];

export type CliGenerateGithubIssueTemplateRunPronouns = string;

export type CliGenerateGithubIssueTemplateRunWe = string;

export type CliGenerateGithubIssueTemplateRunUs = string;

export type CliGenerateGithubIssueTemplateRunOur = string;

export type CliGenerateGithubIssueTemplateRunUrls = SharedNovaConfig['urls'];

export type CliGenerateGithubIssueTemplateRunUrlsGithub = string;

export type CliGenerateGithubIssueTemplateRunGithubRepo = string;

export type CliGenerateGithubIssueTemplateRunPrivacyPolicy = string;

export type CliGenerateGithubIssueTemplateRunTermsOfUse = string;

export type CliGenerateGithubIssueTemplateRunFundSources = string[];

export type CliGenerateGithubIssueTemplateRunGithubSponsor = string;

export type CliGenerateGithubIssueTemplateRunPlatforms = string[];

export type CliGenerateGithubIssueTemplateRunChoiceTitle = string;

export type CliGenerateGithubIssueTemplateRunChoiceDescription = string;

export type CliGenerateGithubIssueTemplateRunChoiceValue = string;

export type CliGenerateGithubIssueTemplateRunChoiceSelected = boolean;

export type CliGenerateGithubIssueTemplateRunChoice = {
  title: CliGenerateGithubIssueTemplateRunChoiceTitle;
  description: CliGenerateGithubIssueTemplateRunChoiceDescription;
  value: CliGenerateGithubIssueTemplateRunChoiceValue;
  selected: CliGenerateGithubIssueTemplateRunChoiceSelected;
};

export type CliGenerateGithubIssueTemplateRunPreSelectMappingKey = string;

export type CliGenerateGithubIssueTemplateRunPreSelectMappingValue = string;

export type CliGenerateGithubIssueTemplateRunPreSelectMapping = Record<CliGenerateGithubIssueTemplateRunPreSelectMappingKey, CliGenerateGithubIssueTemplateRunPreSelectMappingValue>;

export type CliGenerateGithubIssueTemplateRunPreSelectedFiles = Set<string>;

export type CliGenerateGithubIssueTemplateRunFile = string | undefined;

export type CliGenerateGithubIssueTemplateRunChoices = CliGenerateGithubIssueTemplateRunChoice[];

export type CliGenerateGithubIssueTemplateRunCancelled = boolean;

export type CliGenerateGithubIssueTemplateRunAnswers = Record<string, unknown>;

export type CliGenerateGithubIssueTemplateRunSelectedFiles = string[];

export type CliGenerateGithubIssueTemplateRunTemplateDirectory = string;

export type CliGenerateGithubIssueTemplateRunPlatformFieldsDirectory = string;

export type CliGenerateGithubIssueTemplateRunLegalAgreementsDirectory = string;

export type CliGenerateGithubIssueTemplateRunPlatformFieldParts = string[];

export type CliGenerateGithubIssueTemplateRunFieldPath = string;

export type CliGenerateGithubIssueTemplateRunFieldContent = string;

export type CliGenerateGithubIssueTemplateRunTrimmedFieldContent = string;

export type CliGenerateGithubIssueTemplateRunPlatformFieldsContent = string;

export type CliGenerateGithubIssueTemplateRunLegalFileMappingKey = string;

export type CliGenerateGithubIssueTemplateRunLegalFileMappingValue = string;

export type CliGenerateGithubIssueTemplateRunLegalFileMapping = Record<CliGenerateGithubIssueTemplateRunLegalFileMappingKey, CliGenerateGithubIssueTemplateRunLegalFileMappingValue>;

export type CliGenerateGithubIssueTemplateRunFiles = string[];

export type CliGenerateGithubIssueTemplateRunTemplatePath = string;

export type CliGenerateGithubIssueTemplateRunTargetPath = string;

export type CliGenerateGithubIssueTemplateRunTemplate = string | undefined;

export type CliGenerateGithubIssueTemplateRunStripped = string;

export type CliGenerateGithubIssueTemplateRunLegalFile = string | undefined;

export type CliGenerateGithubIssueTemplateRunLegalContent = string;

export type CliGenerateGithubIssueTemplateRunLegalLinkParts = string[];

export type CliGenerateGithubIssueTemplateRunLegalLabelParts = string[];

export type CliGenerateGithubIssueTemplateRunLegalPath = string;

export type CliGenerateGithubIssueTemplateRunLegalRaw = string;

export type CliGenerateGithubIssueTemplateRunLegalLinksText = string;

export type CliGenerateGithubIssueTemplateRunLegalLabelText = string;

export type CliGenerateGithubIssueTemplateRunContent = string;
