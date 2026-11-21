import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_GeneratorRunResult,
  Shared_GithubIssueFormQuestions,
  Shared_NovaConfig,
  Shared_NovaConfig_Github_IssueTemplate,
  Shared_NovaConfig_Github_IssueTemplate_BugReportField,
  Shared_NovaConfig_Github_IssueTemplate_BugReportFields,
  Shared_NovaConfig_Github_IssueTemplate_CustomQuestions,
  Shared_NovaConfig_Workflows,
  Shared_NovaConfigGithubIssueTemplateForm,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - GitHub - Issue Template - Build Question Fields.
 *
 * @since 0.49.0
 */
export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TemplateDirectory = string;

export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_FormSlug = string;

export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeNames = Shared_NovaConfig_Github_IssueTemplate_BugReportFields;

export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_CustomQuestions = Shared_GithubIssueFormQuestions;

export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_Returns = Promise<string>;

export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_FieldFileMapping = Record<Shared_NovaConfig_Github_IssueTemplate_BugReportField, string>;

export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_GlobalFragment = string;

export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeFragments = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeFragment = string;

export type Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_Parts = string[];

/**
 * CLI - Generate - GitHub - Issue Template - Find Duplicate Ids.
 *
 * @since 0.49.0
 */
export type Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Content = string;

export type Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Returns = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Parsed = Record<string, unknown> | null;

export type Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Body = unknown[];

export type Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_SeenIds = Set<string>;

export type Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Duplicates = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Id = unknown;

/**
 * CLI - Generate - GitHub - Issue Template - Read Fragment.
 *
 * @since 0.49.0
 */
export type Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_FilePath = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_IsRequired = boolean;

export type Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_Returns = Promise<string>;

export type Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_Raw = string;

/**
 * CLI - Generate - GitHub - Issue Template - Replace Pronoun.
 *
 * @since 0.30.0
 */
export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Content = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Placeholder = RegExp;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Value = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Returns = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_CapitalizedValue = string;

/**
 * CLI - Generate - GitHub - Issue Template - Replace Pronoun - Resolve Replacement.
 *
 * @since 0.30.0
 */
export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Match = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Offset = number;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Returns = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Prefix = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_CurrentLinePrefix = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_PreviousCharacter = string | undefined;

export type Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_IsSentenceStart = boolean;

/**
 * CLI - Generate - GitHub - Issue Template - Resolve Documentation URL.
 *
 * @since 0.49.0
 */
export type Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Urls = Shared_NovaConfig['urls'];

export type Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_GithubRepo = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Returns = string;

export type Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Documentation = string;

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

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Returns = Promise<Shared_GeneratorRunResult>;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_WorkingFile = Shared_NovaConfig;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Project = Shared_NovaConfig['project'];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Pronouns = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_We = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Us = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Our = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Urls = Shared_NovaConfig['urls'];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Github = Shared_NovaConfig['github'];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_IssueTemplate = Shared_NovaConfig_Github_IssueTemplate | undefined;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_ConfigBugReportFields = Shared_NovaConfig_Github_IssueTemplate_BugReportFields;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_CustomQuestions = Shared_NovaConfig_Github_IssueTemplate_CustomQuestions;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_GithubOwner = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepoName = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepo = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_PrivacyPolicy = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_TermsOfUse = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_DocumentationUrl = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_FundSources = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_GithubSponsor = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Workflows = Shared_NovaConfig_Workflows;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_IsSponsorGated = boolean;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_ConditionalFieldsDirectory = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalAgreementsDirectory = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_DocumentationCheck = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_SponsorNotice = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_SponsorCheck = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_ContributorsNote = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMappingKey = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMappingValue = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMapping = Record<Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMappingKey, Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMappingValue>;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_FileForms_Entry_Slug = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_FileForms_Entry_Custom = Shared_NovaConfigGithubIssueTemplateForm;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_FileForms_Entry = {
  slug: Cli_Generate_Github_IssueTemplate_Runner_Run_FileForms_Entry_Slug;
  custom: Cli_Generate_Github_IssueTemplate_Runner_Run_FileForms_Entry_Custom;
};

export type Cli_Generate_Github_IssueTemplate_Runner_Run_FileForms = Record<string, Cli_Generate_Github_IssueTemplate_Runner_Run_FileForms_Entry>;

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

export type Cli_Generate_Github_IssueTemplate_Runner_Run_FileForm_Slug = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_FileForm_Custom = Shared_NovaConfigGithubIssueTemplateForm;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_FileForm = {
  slug: Cli_Generate_Github_IssueTemplate_Runner_Run_FileForm_Slug;
  custom: Cli_Generate_Github_IssueTemplate_Runner_Run_FileForm_Custom;
} | undefined;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_QuestionFields = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFile = string | undefined;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalContent = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLinkParts = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLabelParts = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalRaw = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLinksText = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLabelText = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_Content = string;

export type Cli_Generate_Github_IssueTemplate_Runner_Run_DuplicateIds = string[];

/**
 * CLI - Generate - GitHub - Issue Template - Serialize Questions.
 *
 * @since 0.49.0
 */
export type Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Questions = Shared_GithubIssueFormQuestions;

export type Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Returns = string;

export type Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_AttributeKeys = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Lines = string[];

export type Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_AttributeValue = unknown;
