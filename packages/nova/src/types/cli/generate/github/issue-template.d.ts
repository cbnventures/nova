import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_GeneratorRunResult as SharedGeneratorRunResult,
  Shared_NovaConfig as SharedNovaConfig,
  Shared_NovaConfig_Github_IssueTemplate as SharedNovaConfigGithubIssueTemplate,
  Shared_NovaConfig_Github_IssueTemplate_BugReportFields as SharedNovaConfigGithubIssueTemplateBugReportFields,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - GitHub - Issue Template - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_Github_IssueTemplate_Runner_Run_Options_DryRun = true;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Options = {
  dryRun?: Cli_Generate_Github_IssueTemplate_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_Github_IssueTemplate_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_WorkingFile = SharedNovaConfig;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Project = SharedNovaConfig['project'];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Pronouns = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_We = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Us = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Our = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Urls = SharedNovaConfig['urls'];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Github = SharedNovaConfig['github'];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_IssueTemplate = SharedNovaConfigGithubIssueTemplate | undefined;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_ConfigBugReportFields = SharedNovaConfigGithubIssueTemplateBugReportFields;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_GithubOwner = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepoName = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepo = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_PrivacyPolicy = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_TermsOfUse = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_FundSources = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_GithubSponsor = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Platforms = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectMappingKey = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectMappingValue = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectMapping = Record<Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectMappingKey, Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectMappingValue>;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectedFiles = Set<string>;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_File = string | undefined;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_SelectedFiles = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_PlatformFieldsDirectory = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalAgreementsDirectory = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_PlatformFieldParts = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_PlatformFieldsContent = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMappingKey = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMappingValue = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMapping = Record<Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMappingKey, Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMappingValue>;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Files = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_HeaderOptions_Command = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_HeaderOptions_DocsSlug = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_HeaderOptions_Mode = 'strict' | 'fillable';

export type Cli_Generate_Github_IssueTemplate_Runner_Run_HeaderOptions = {
  command: Cli_Generate_Github_IssueTemplate_Runner_Run_HeaderOptions_Command;
  docsSlug: Cli_Generate_Github_IssueTemplate_Runner_Run_HeaderOptions_DocsSlug;
  mode: Cli_Generate_Github_IssueTemplate_Runner_Run_HeaderOptions_Mode;
};

export type Cli_Generate_Github_IssueTemplate_Runner_Run_TemplatePath = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_TargetPath = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Template = string | undefined;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Stripped = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFile = string | undefined;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalContent = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLinkParts = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLabelParts = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalRaw = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLinksText = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLabelText = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Content = string;
