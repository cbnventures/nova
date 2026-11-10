import type { Dirent } from 'node:fs';
import type { FileHandle } from 'node:fs/promises';

import type { PromptObject } from 'prompts';

import type { Runner as LibNovaConfig } from '../../../lib/nova-config.js';

import type {
  Shared_ChangelogDocument,
  Shared_ChangelogEntry,
  Shared_ChangelogEntry_Bump,
  Shared_ChangelogEntry_Category,
  Shared_ChangelogEntry_Message,
  Shared_ChangelogEntry_Package,
  Shared_ChangelogFoldAction,
  Shared_ChangelogOptions,
  Shared_ChangelogSection,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigConfig,
  Shared_NovaConfigSettings_VersionStrategy,
  Shared_NovaConfigWorkspace,
  Shared_PromptWithCancelReject,
  Shared_PromptWithCancelResolved,
} from '../../shared.d.ts';

/**
 * CLI - Utility - Changelog - Fail Fold.
 *
 * @since 0.39.0
 */
export type Cli_Utility_Changelog_Runner_FailFold_Message = string;

export type Cli_Utility_Changelog_Runner_FailFold_Returns = void;

/**
 * CLI - Utility - Changelog - Fold.
 *
 * @since 0.39.0
 */
export type Cli_Utility_Changelog_Runner_Fold_Options = Shared_ChangelogOptions;

export type Cli_Utility_Changelog_Runner_Fold_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_Fold_IsDryRun = boolean;

export type Cli_Utility_Changelog_Runner_Fold_Config = Shared_NovaConfigConfig;

export type Cli_Utility_Changelog_Runner_Fold_Workspaces = Shared_NovaConfig_Workspaces;

export type Cli_Utility_Changelog_Runner_Fold_VersionStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Cli_Utility_Changelog_Runner_Fold_EligibleWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Utility_Changelog_Runner_Fold_FilterWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Fold_FilterWorkspaceConfigPolicy = Shared_NovaConfigWorkspace['policy'];

export type Cli_Utility_Changelog_Runner_Fold_SelectedPackage = string | undefined;

export type Cli_Utility_Changelog_Runner_Fold_ValidPackageEntry = [string, Shared_NovaConfigWorkspace] | undefined;

export type Cli_Utility_Changelog_Runner_Fold_FindEligibleWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Fold_FindEligibleWorkspaceConfigName = string;

export type Cli_Utility_Changelog_Runner_Fold_PackageOutputKey = 'package';

export type Cli_Utility_Changelog_Runner_Fold_PackageOutputValue = string;

export type Cli_Utility_Changelog_Runner_Fold_PackageOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Fold_PackageOutputKey, Cli_Utility_Changelog_Runner_Fold_PackageOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Fold_MapEligibleWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Fold_MapEligibleWorkspaceConfigName = string;

export type Cli_Utility_Changelog_Runner_Fold_MapEligibleWorkspaceConfigRole = Shared_NovaConfigWorkspace['role'];

export type Cli_Utility_Changelog_Runner_Fold_MapEligibleWorkspaceConfigPolicy = Shared_NovaConfigWorkspace['policy'];

export type Cli_Utility_Changelog_Runner_Fold_PackageOutputResult = Record<Cli_Utility_Changelog_Runner_Fold_PackageOutputKey, Cli_Utility_Changelog_Runner_Fold_PackageOutputValue>;

export type Cli_Utility_Changelog_Runner_Fold_WorkspaceEntry = [string, Shared_NovaConfigWorkspace] | undefined;

export type Cli_Utility_Changelog_Runner_Fold_FindWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Fold_FindWorkspaceConfigName = string;

export type Cli_Utility_Changelog_Runner_Fold_WorkspacePath = string;

export type Cli_Utility_Changelog_Runner_Fold_CurrentDirectory = string;

export type Cli_Utility_Changelog_Runner_Fold_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Fold_PackageJsonPath = string;

export type Cli_Utility_Changelog_Runner_Fold_ChangelogPath = string;

export type Cli_Utility_Changelog_Runner_Fold_FileContents = [string, string] | undefined;

export type Cli_Utility_Changelog_Runner_Fold_PackageJsonRaw = string;

export type Cli_Utility_Changelog_Runner_Fold_ExistingContent = string;

export type Cli_Utility_Changelog_Runner_Fold_PackageJson = Record<string, unknown> | undefined;

export type Cli_Utility_Changelog_Runner_Fold_Document = Shared_ChangelogDocument | undefined;

export type Cli_Utility_Changelog_Runner_Fold_CurrentVersion = string | undefined;

export type Cli_Utility_Changelog_Runner_Fold_TargetVersion = string;

export type Cli_Utility_Changelog_Runner_Fold_TargetSections = Shared_ChangelogSection[];

export type Cli_Utility_Changelog_Runner_Fold_TargetSection = Shared_ChangelogSection;

export type Cli_Utility_Changelog_Runner_Fold_RequestedActions = Shared_ChangelogFoldAction[];

export type Cli_Utility_Changelog_Runner_Fold_Action = Shared_ChangelogFoldAction | undefined;

export type Cli_Utility_Changelog_Runner_Fold_ActionOutputKey = 'action';

export type Cli_Utility_Changelog_Runner_Fold_ActionOutputValue = Shared_ChangelogFoldAction;

export type Cli_Utility_Changelog_Runner_Fold_ActionOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Fold_ActionOutputKey, Cli_Utility_Changelog_Runner_Fold_ActionOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Fold_ActionOutputResult = Record<Cli_Utility_Changelog_Runner_Fold_ActionOutputKey, Cli_Utility_Changelog_Runner_Fold_ActionOutputValue>;

export type Cli_Utility_Changelog_Runner_Fold_BeforeSections = Shared_ChangelogSection[];

export type Cli_Utility_Changelog_Runner_Fold_BeforeSectionContent = string;

export type Cli_Utility_Changelog_Runner_Fold_SourceVersions = string[];

export type Cli_Utility_Changelog_Runner_Fold_MergeOutputKey = 'versions';

export type Cli_Utility_Changelog_Runner_Fold_MergeOutputValue = string[];

export type Cli_Utility_Changelog_Runner_Fold_MergeOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Fold_MergeOutputKey, Cli_Utility_Changelog_Runner_Fold_MergeOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Fold_MergeOutputResult = Record<Cli_Utility_Changelog_Runner_Fold_MergeOutputKey, Cli_Utility_Changelog_Runner_Fold_MergeOutputValue>;

export type Cli_Utility_Changelog_Runner_Fold_UniqueSourceVersions = string[];

export type Cli_Utility_Changelog_Runner_Fold_SourceSections = Shared_ChangelogSection[];

export type Cli_Utility_Changelog_Runner_Fold_MatchingSections = Shared_ChangelogSection[];

export type Cli_Utility_Changelog_Runner_Fold_UncategorizedCategory = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_Fold_ValidUncategorizedCategory = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_Fold_UncategorizedSections = Shared_ChangelogSection[];

export type Cli_Utility_Changelog_Runner_Fold_UncategorizedOutputKey = 'uncategorizedAs';

export type Cli_Utility_Changelog_Runner_Fold_UncategorizedOutputValue = Shared_ChangelogEntry_Category;

export type Cli_Utility_Changelog_Runner_Fold_UncategorizedOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Fold_UncategorizedOutputKey, Cli_Utility_Changelog_Runner_Fold_UncategorizedOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Fold_UncategorizedOutputResult = Record<Cli_Utility_Changelog_Runner_Fold_UncategorizedOutputKey, Cli_Utility_Changelog_Runner_Fold_UncategorizedOutputValue>;

export type Cli_Utility_Changelog_Runner_Fold_UncategorizedMessages = Shared_ChangelogEntry_Message[];

export type Cli_Utility_Changelog_Runner_Fold_TargetMessages = Shared_ChangelogEntry_Message[];

export type Cli_Utility_Changelog_Runner_Fold_DeduplicatedMessages = Shared_ChangelogEntry_Message[];

export type Cli_Utility_Changelog_Runner_Fold_SeenMessages = Set<Shared_ChangelogEntry_Message>;

export type Cli_Utility_Changelog_Runner_Fold_SourceMessages = Shared_ChangelogEntry_Message[];

export type Cli_Utility_Changelog_Runner_Fold_Category = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_Fold_ValidCategory = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_Fold_CategoryOutputKey = 'category';

export type Cli_Utility_Changelog_Runner_Fold_CategoryOutputValue = Shared_ChangelogEntry_Category;

export type Cli_Utility_Changelog_Runner_Fold_CategoryOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Fold_CategoryOutputKey, Cli_Utility_Changelog_Runner_Fold_CategoryOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Fold_CategoryOutputResult = Record<Cli_Utility_Changelog_Runner_Fold_CategoryOutputKey, Cli_Utility_Changelog_Runner_Fold_CategoryOutputValue>;

export type Cli_Utility_Changelog_Runner_Fold_Messages = Shared_ChangelogEntry_Message[];

export type Cli_Utility_Changelog_Runner_Fold_SelectedIndex = number | undefined;

export type Cli_Utility_Changelog_Runner_Fold_ParsedEntryNumber = number;

export type Cli_Utility_Changelog_Runner_Fold_MatchingIndexes = number[];

export type Cli_Utility_Changelog_Runner_Fold_EntryOutputKey = 'entry';

export type Cli_Utility_Changelog_Runner_Fold_EntryOutputValue = number;

export type Cli_Utility_Changelog_Runner_Fold_EntryOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Fold_EntryOutputKey, Cli_Utility_Changelog_Runner_Fold_EntryOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Fold_EntryOutputResult = Record<Cli_Utility_Changelog_Runner_Fold_EntryOutputKey, Cli_Utility_Changelog_Runner_Fold_EntryOutputValue>;

export type Cli_Utility_Changelog_Runner_Fold_Message = Shared_ChangelogEntry_Message | undefined;

export type Cli_Utility_Changelog_Runner_Fold_MessageValidation = string | true;

export type Cli_Utility_Changelog_Runner_Fold_MessageOutputKey = 'message';

export type Cli_Utility_Changelog_Runner_Fold_MessageOutputValue = Shared_ChangelogEntry_Message;

export type Cli_Utility_Changelog_Runner_Fold_MessageOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Fold_MessageOutputKey, Cli_Utility_Changelog_Runner_Fold_MessageOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Fold_MessageOutputResult = Record<Cli_Utility_Changelog_Runner_Fold_MessageOutputKey, Cli_Utility_Changelog_Runner_Fold_MessageOutputValue>;

export type Cli_Utility_Changelog_Runner_Fold_AndroidBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_Fold_AppleBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_Fold_NativeBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_Fold_NativeBuilds = [number | undefined, number | undefined];

export type Cli_Utility_Changelog_Runner_Fold_NextContent = string;

export type Cli_Utility_Changelog_Runner_Fold_AfterSectionContent = string;

export type Cli_Utility_Changelog_Runner_Fold_Diff = string;

export type Cli_Utility_Changelog_Runner_Fold_BuildSummary = string;

export type Cli_Utility_Changelog_Runner_Fold_DryRunLines = string[];

export type Cli_Utility_Changelog_Runner_Fold_ActionVerb = string;

/**
 * CLI - Utility - Changelog - Format Changelog Diff.
 *
 * @since 0.39.0
 */
export type Cli_Utility_Changelog_Runner_FormatChangelogDiff_ChangelogPath = string;

export type Cli_Utility_Changelog_Runner_FormatChangelogDiff_BeforeContent = string;

export type Cli_Utility_Changelog_Runner_FormatChangelogDiff_AfterContent = string;

export type Cli_Utility_Changelog_Runner_FormatChangelogDiff_Returns = string;

export type Cli_Utility_Changelog_Runner_FormatChangelogDiff_BeforeLines = string[];

export type Cli_Utility_Changelog_Runner_FormatChangelogDiff_AfterLines = string[];

export type Cli_Utility_Changelog_Runner_FormatChangelogDiff_DiffLines = string[];

/**
 * CLI - Utility - Changelog - Format Changelog Header.
 *
 * @since 0.39.0
 */
export type Cli_Utility_Changelog_Runner_FormatChangelogHeader_Section = Shared_ChangelogSection;

export type Cli_Utility_Changelog_Runner_FormatChangelogHeader_NativeBuild = number;

export type Cli_Utility_Changelog_Runner_FormatChangelogHeader_Returns = string;

export type Cli_Utility_Changelog_Runner_FormatChangelogHeader_HeaderPrefix = string;

export type Cli_Utility_Changelog_Runner_FormatChangelogHeader_HeaderSuffix = string;

export type Cli_Utility_Changelog_Runner_FormatChangelogHeader_BuildEndIndex = number;

export type Cli_Utility_Changelog_Runner_FormatChangelogHeader_SuffixAfterBuild = string;

/**
 * CLI - Utility - Changelog - Format Changelog Section.
 *
 * @since 0.39.0
 */
export type Cli_Utility_Changelog_Runner_FormatChangelogSection_Section = Shared_ChangelogSection;

export type Cli_Utility_Changelog_Runner_FormatChangelogSection_Returns = string;

export type Cli_Utility_Changelog_Runner_FormatChangelogSection_SectionParts = string[];

export type Cli_Utility_Changelog_Runner_FormatChangelogSection_CategoryOrder = Shared_ChangelogEntry_Category[];

export type Cli_Utility_Changelog_Runner_FormatChangelogSection_Messages = Shared_ChangelogEntry_Message[] | undefined;

/**
 * CLI - Utility - Changelog - Generate File Name.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_GenerateFileName_Returns = string;

export type Cli_Utility_Changelog_Runner_GenerateFileName_Adjective = string | undefined;

export type Cli_Utility_Changelog_Runner_GenerateFileName_Noun = string | undefined;

export type Cli_Utility_Changelog_Runner_GenerateFileName_Verb = string | undefined;

/**
 * CLI - Utility - Changelog - Parse Changelog.
 *
 * @since 0.39.0
 */
export type Cli_Utility_Changelog_Runner_ParseChangelog_Content = string;

export type Cli_Utility_Changelog_Runner_ParseChangelog_Returns = Shared_ChangelogDocument;

export type Cli_Utility_Changelog_Runner_ParseChangelog_Lines = string[];

export type Cli_Utility_Changelog_Runner_ParseChangelog_PackageHeading = string | undefined;

export type Cli_Utility_Changelog_Runner_ParseChangelog_Sections = Shared_ChangelogSection[];

export type Cli_Utility_Changelog_Runner_ParseChangelog_CurrentSection = Shared_ChangelogSection | undefined;

export type Cli_Utility_Changelog_Runner_ParseChangelog_CurrentCategory = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_ParseChangelog_HeaderBody = string;

export type Cli_Utility_Changelog_Runner_ParseChangelog_VersionSeparatorIndex = number;

export type Cli_Utility_Changelog_Runner_ParseChangelog_Version = string;

export type Cli_Utility_Changelog_Runner_ParseChangelog_Section = Shared_ChangelogSection;

export type Cli_Utility_Changelog_Runner_ParseChangelog_BuildPrefix = string;

export type Cli_Utility_Changelog_Runner_ParseChangelog_BuildEndIndex = number;

export type Cli_Utility_Changelog_Runner_ParseChangelog_BuildValue = string;

export type Cli_Utility_Changelog_Runner_ParseChangelog_ParsedBuild = number;

export type Cli_Utility_Changelog_Runner_ParseChangelog_CategoryValue = string;

export type Cli_Utility_Changelog_Runner_ParseChangelog_Category = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_ParseChangelog_Message = Shared_ChangelogEntry_Message;

export type Cli_Utility_Changelog_Runner_ParseChangelog_Messages = Shared_ChangelogEntry_Message[];

/**
 * CLI - Utility - Changelog - Parse Entries.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_ParseEntries_Returns = Promise<Shared_ChangelogEntry[]>;

export type Cli_Utility_Changelog_Runner_ParseEntries_CurrentDirectory = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_ChangelogDirectory = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Entries = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_ParseEntries_EntryFiles = string[] | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_DirectoryEntries = string[];

export type Cli_Utility_Changelog_Runner_ParseEntries_FilePath = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Content = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Lines = string[];

export type Cli_Utility_Changelog_Runner_ParseEntries_EndIndex = number;

export type Cli_Utility_Changelog_Runner_ParseEntries_EntryPackage = Shared_ChangelogEntry_Package | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_EntryCategory = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_EntryBump = Shared_ChangelogEntry_Bump | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_Line = string | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_ColonIndex = number;

export type Cli_Utility_Changelog_Runner_ParseEntries_Key = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Value = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Message = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Entry = Shared_ChangelogEntry;

/**
 * CLI - Utility - Changelog - Prompt With Cancel.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_PromptWithCancel_Questions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type Cli_Utility_Changelog_Runner_PromptWithCancel_Returns<Keys extends string, Result> = Promise<Shared_PromptWithCancelResolved<Keys, Result> | Shared_PromptWithCancelReject>;

export type Cli_Utility_Changelog_Runner_PromptWithCancel_Cancelled = boolean;

export type Cli_Utility_Changelog_Runner_PromptWithCancel_Result<Keys extends string, Result> = Record<Keys, Result>;

/**
 * CLI - Utility - Changelog - Record.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_Record_Options = Shared_ChangelogOptions;

export type Cli_Utility_Changelog_Runner_Record_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_Record_IsDryRun = boolean;

export type Cli_Utility_Changelog_Runner_Record_NovaConfig = LibNovaConfig;

export type Cli_Utility_Changelog_Runner_Record_Config = Shared_NovaConfigConfig;

export type Cli_Utility_Changelog_Runner_Record_Workspaces = Shared_NovaConfig_Workspaces;

export type Cli_Utility_Changelog_Runner_Record_VersionStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Cli_Utility_Changelog_Runner_Record_EligibleWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Utility_Changelog_Runner_Record_FilterWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Record_FilterWorkspaceConfigPolicy = Shared_NovaConfigWorkspace['policy'];

export type Cli_Utility_Changelog_Runner_Record_SelectedPackage = Shared_ChangelogEntry_Package | undefined;

export type Cli_Utility_Changelog_Runner_Record_SelectedCategory = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_Record_SelectedBump = Shared_ChangelogEntry_Bump | undefined;

export type Cli_Utility_Changelog_Runner_Record_SelectedMessage = Shared_ChangelogEntry_Message | undefined;

export type Cli_Utility_Changelog_Runner_Record_ValidPackageEntry = [string, Shared_NovaConfigWorkspace] | undefined;

export type Cli_Utility_Changelog_Runner_Record_FindEligibleWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Record_FindEligibleWorkspaceConfigName = string;

export type Cli_Utility_Changelog_Runner_Record_ValidPackage = string | undefined;

export type Cli_Utility_Changelog_Runner_Record_ValidCategory = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_Record_ValidBump = Shared_ChangelogEntry_Bump | undefined;

export type Cli_Utility_Changelog_Runner_Record_ValidMessage = string;

export type Cli_Utility_Changelog_Runner_Record_MessageValidation = string | true;

export type Cli_Utility_Changelog_Runner_Record_PackageOutputKey = 'package';

export type Cli_Utility_Changelog_Runner_Record_PackageOutputValue = Shared_ChangelogEntry_Package;

export type Cli_Utility_Changelog_Runner_Record_PackageOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Record_PackageOutputKey, Cli_Utility_Changelog_Runner_Record_PackageOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigName = string;

export type Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigRole = Shared_NovaConfigWorkspace['role'];

export type Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigPolicy = Shared_NovaConfigWorkspace['policy'];

export type Cli_Utility_Changelog_Runner_Record_PackageOutputResult = Record<Cli_Utility_Changelog_Runner_Record_PackageOutputKey, Cli_Utility_Changelog_Runner_Record_PackageOutputValue>;

export type Cli_Utility_Changelog_Runner_Record_CategoryOutputKey = 'category';

export type Cli_Utility_Changelog_Runner_Record_CategoryOutputValue = Shared_ChangelogEntry_Category;

export type Cli_Utility_Changelog_Runner_Record_CategoryOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Record_CategoryOutputKey, Cli_Utility_Changelog_Runner_Record_CategoryOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Record_CategoryOutputResult = Record<Cli_Utility_Changelog_Runner_Record_CategoryOutputKey, Cli_Utility_Changelog_Runner_Record_CategoryOutputValue>;

export type Cli_Utility_Changelog_Runner_Record_MessageOutputKey = 'message';

export type Cli_Utility_Changelog_Runner_Record_MessageOutputValue = Shared_ChangelogEntry_Message;

export type Cli_Utility_Changelog_Runner_Record_MessageOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Record_MessageOutputKey, Cli_Utility_Changelog_Runner_Record_MessageOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Record_MessageOutputResult = Record<Cli_Utility_Changelog_Runner_Record_MessageOutputKey, Cli_Utility_Changelog_Runner_Record_MessageOutputValue>;

export type Cli_Utility_Changelog_Runner_Record_SuggestedBump = Shared_ChangelogEntry_Bump;

export type Cli_Utility_Changelog_Runner_Record_BumpOutputKey = 'bump';

export type Cli_Utility_Changelog_Runner_Record_BumpOutputValue = Shared_ChangelogEntry_Bump;

export type Cli_Utility_Changelog_Runner_Record_BumpOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Record_BumpOutputKey, Cli_Utility_Changelog_Runner_Record_BumpOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Record_BumpOutputResult = Record<Cli_Utility_Changelog_Runner_Record_BumpOutputKey, Cli_Utility_Changelog_Runner_Record_BumpOutputValue>;

export type Cli_Utility_Changelog_Runner_Record_FileName = string;

export type Cli_Utility_Changelog_Runner_Record_CurrentDirectory = string;

export type Cli_Utility_Changelog_Runner_Record_ChangelogDirectory = string;

export type Cli_Utility_Changelog_Runner_Record_FilePath = string;

export type Cli_Utility_Changelog_Runner_Record_Content = string;

export type Cli_Utility_Changelog_Runner_Record_ReadmePath = string;

export type Cli_Utility_Changelog_Runner_Record_ReadmeContent = string;

/**
 * CLI - Utility - Changelog - Release.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_Release_Options = Shared_ChangelogOptions;

export type Cli_Utility_Changelog_Runner_Release_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_Release_IsDryRun = boolean;

export type Cli_Utility_Changelog_Runner_Release_IsNonInteractive = boolean;

export type Cli_Utility_Changelog_Runner_Release_Entries = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_Config = Shared_NovaConfigConfig;

export type Cli_Utility_Changelog_Runner_Release_Workspaces = Shared_NovaConfig_Workspaces;

export type Cli_Utility_Changelog_Runner_Release_WorkspaceDirectories = string[];

export type Cli_Utility_Changelog_Runner_Release_VersionStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Cli_Utility_Changelog_Runner_Release_FreezableWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Utility_Changelog_Runner_Release_FilterFreezableWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Release_FilterFreezableWorkspacePolicy = Shared_NovaConfigWorkspace['policy'];

export type Cli_Utility_Changelog_Runner_Release_EmptyWorkspacePath = string;

export type Cli_Utility_Changelog_Runner_Release_EmptyWorkspacePolicy = Shared_NovaConfigWorkspace['policy'];

export type Cli_Utility_Changelog_Runner_Release_EmptyWorkspaceDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_EmptyWorkspaceStampVersion = string;

export type Cli_Utility_Changelog_Runner_Release_EmptyWorkspacePackageJsonPath = string;

export type Cli_Utility_Changelog_Runner_Release_EmptyWorkspacePackageJsonRaw = string | undefined;

export type Cli_Utility_Changelog_Runner_Release_EmptyWorkspaceParsedPackageJson = Record<string, unknown> | undefined;

export type Cli_Utility_Changelog_Runner_Release_EmptyWorkspaceCurrentVersion = string | undefined;

export type Cli_Utility_Changelog_Runner_Release_EmptyWorkspaceStampSucceeded = boolean;

export type Cli_Utility_Changelog_Runner_Release_EmptyFreezableWorkspacePath = string;

export type Cli_Utility_Changelog_Runner_Release_EmptyFreezableWorkspaceDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_EmptyFreezableStampSucceeded = boolean;

export type Cli_Utility_Changelog_Runner_Release_Groups = Map<Shared_ChangelogEntry_Package, Shared_ChangelogEntry[]>;

export type Cli_Utility_Changelog_Runner_Release_Existing = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_NovaConfig = LibNovaConfig;

export type Cli_Utility_Changelog_Runner_Release_LockStepVersioning = boolean;

export type Cli_Utility_Changelog_Runner_Release_LockStepPackage_PackageName = string;

export type Cli_Utility_Changelog_Runner_Release_LockStepPackage_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_LockStepPackage_CurrentVersion = string;

export type Cli_Utility_Changelog_Runner_Release_LockStepPackage = {
  packageName: Cli_Utility_Changelog_Runner_Release_LockStepPackage_PackageName;
  packageDirectory: Cli_Utility_Changelog_Runner_Release_LockStepPackage_PackageDirectory;
  currentVersion: Cli_Utility_Changelog_Runner_Release_LockStepPackage_CurrentVersion;
};

export type Cli_Utility_Changelog_Runner_Release_LockStepPackages = Cli_Utility_Changelog_Runner_Release_LockStepPackage[];

export type Cli_Utility_Changelog_Runner_Release_LockStepWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Utility_Changelog_Runner_Release_FilterLockStepWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Release_FilterLockStepWorkspacePolicy = Shared_NovaConfigWorkspace['policy'];

export type Cli_Utility_Changelog_Runner_Release_LockStepWorkspacePath = string;

export type Cli_Utility_Changelog_Runner_Release_LockStepWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Release_LockStepWorkspaceName = string;

export type Cli_Utility_Changelog_Runner_Release_LockStepCurrentDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_LockStepPackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_LockStepPackageJsonPath = string;

export type Cli_Utility_Changelog_Runner_Release_LockStepPackageJsonRaw = string | undefined;

export type Cli_Utility_Changelog_Runner_Release_LockStepParsedPackageJson = Record<string, unknown> | undefined;

export type Cli_Utility_Changelog_Runner_Release_LockStepCurrentVersion = string | undefined;

export type Cli_Utility_Changelog_Runner_Release_LockStepVersions = Set<string>;

export type Cli_Utility_Changelog_Runner_Release_LockStepVersionRows = string[];

export type Cli_Utility_Changelog_Runner_Release_LockStepErrorLines = string[];

export type Cli_Utility_Changelog_Runner_Release_BumpPriority = Record<Shared_ChangelogEntry_Bump, number>;

export type Cli_Utility_Changelog_Runner_Release_Release_PackageName = Shared_ChangelogEntry_Package;

export type Cli_Utility_Changelog_Runner_Release_Release_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_Release_CurrentVersion = string;

export type Cli_Utility_Changelog_Runner_Release_Release_NewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_Release_HighestBump = Shared_ChangelogEntry_Bump;

export type Cli_Utility_Changelog_Runner_Release_Release_Entries = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_Release = {
  packageName: Cli_Utility_Changelog_Runner_Release_Release_PackageName;
  packageDirectory: Cli_Utility_Changelog_Runner_Release_Release_PackageDirectory;
  currentVersion: Cli_Utility_Changelog_Runner_Release_Release_CurrentVersion;
  newVersion: Cli_Utility_Changelog_Runner_Release_Release_NewVersion;
  highestBump: Cli_Utility_Changelog_Runner_Release_Release_HighestBump;
  entries: Cli_Utility_Changelog_Runner_Release_Release_Entries;
};

export type Cli_Utility_Changelog_Runner_Release_Releases = Cli_Utility_Changelog_Runner_Release_Release[];

export type Cli_Utility_Changelog_Runner_Release_PackageName = Shared_ChangelogEntry_Package;

export type Cli_Utility_Changelog_Runner_Release_PackageEntries = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_WorkspaceEntry = [string, Shared_NovaConfigWorkspace] | undefined;

export type Cli_Utility_Changelog_Runner_Release_FindWorkspaceConfig = Shared_NovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Release_FindWorkspaceConfigName = string;

export type Cli_Utility_Changelog_Runner_Release_WorkspacePath = string;

export type Cli_Utility_Changelog_Runner_Release_CurrentDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_PackageJsonPath = string;

export type Cli_Utility_Changelog_Runner_Release_PackageJsonRaw = string | undefined;

export type Cli_Utility_Changelog_Runner_Release_ParsedPackageJson = Record<string, unknown> | undefined;

export type Cli_Utility_Changelog_Runner_Release_CurrentVersion = string | undefined;

export type Cli_Utility_Changelog_Runner_Release_HighestBump = Shared_ChangelogEntry_Bump;

export type Cli_Utility_Changelog_Runner_Release_NewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_HasReleaseHistory = boolean;

export type Cli_Utility_Changelog_Runner_Release_CalverToday = Date;

export type Cli_Utility_Changelog_Runner_Release_CalverYear = number;

export type Cli_Utility_Changelog_Runner_Release_CalverMonth = number;

export type Cli_Utility_Changelog_Runner_Release_CalverCurrentParts = number[];

export type Cli_Utility_Changelog_Runner_Release_CalverCurrentYear = number;

export type Cli_Utility_Changelog_Runner_Release_CalverCurrentMonth = number;

export type Cli_Utility_Changelog_Runner_Release_CalverCurrentMicro = number;

export type Cli_Utility_Changelog_Runner_Release_VersionParts = number[];

export type Cli_Utility_Changelog_Runner_Release_VersionPartsMajor = number;

export type Cli_Utility_Changelog_Runner_Release_VersionPartsMinor = number;

export type Cli_Utility_Changelog_Runner_Release_VersionPartsPatch = number;

export type Cli_Utility_Changelog_Runner_Release_HighestNewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_ReleaseParts = number[];

export type Cli_Utility_Changelog_Runner_Release_HighestParts = number[];

export type Cli_Utility_Changelog_Runner_Release_LockStepI = number;

export type Cli_Utility_Changelog_Runner_Release_ReleasedNames = Set<string>;

export type Cli_Utility_Changelog_Runner_Release_ValidationAndroidBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_Release_ValidationAppleBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_Release_CategoryOrder = string[];

export type Cli_Utility_Changelog_Runner_Release_SummaryReleasePackageName = string;

export type Cli_Utility_Changelog_Runner_Release_SummaryReleaseCurrentVersion = string;

export type Cli_Utility_Changelog_Runner_Release_SummaryReleaseNewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_SummaryReleaseHighestBump = Shared_ChangelogEntry_Bump;

export type Cli_Utility_Changelog_Runner_Release_SummaryReleaseEntries = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_CategoryEntries = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_CategoryLabel = string;

export type Cli_Utility_Changelog_Runner_Release_CategoryEntryMessage = Shared_ChangelogEntry_Message;

export type Cli_Utility_Changelog_Runner_Release_ConfirmOutputKey = 'confirm';

export type Cli_Utility_Changelog_Runner_Release_ConfirmOutputValue = boolean;

export type Cli_Utility_Changelog_Runner_Release_ConfirmOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Release_ConfirmOutputKey, Cli_Utility_Changelog_Runner_Release_ConfirmOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Release_ConfirmOutputResult = Record<Cli_Utility_Changelog_Runner_Release_ConfirmOutputKey, Cli_Utility_Changelog_Runner_Release_ConfirmOutputValue>;

export type Cli_Utility_Changelog_Runner_Release_ReleasedVersions = Map<string, string>;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageName = Shared_ChangelogEntry_Package;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleaseNewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleaseEntries = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_ApplyPackageJsonPath = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyPackageJsonRaw = string;

export type Cli_Utility_Changelog_Runner_Release_PackageJson = Record<string, unknown>;

export type Cli_Utility_Changelog_Runner_Release_AndroidBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_Release_AppleBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_Release_NativeBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_Release_ApplyUpdatedPackageJson = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyUpdatedContents = string;

export type Cli_Utility_Changelog_Runner_Release_StampSucceeded = boolean;

export type Cli_Utility_Changelog_Runner_Release_FreezableWorkspacePath = string;

export type Cli_Utility_Changelog_Runner_Release_FreezableWorkspaceDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_FreezableStampSucceeded = boolean;

/**
 * CLI - Utility - Changelog - Render Changelog.
 *
 * @since 0.39.0
 */
export type Cli_Utility_Changelog_Runner_RenderChangelog_Document = Shared_ChangelogDocument;

export type Cli_Utility_Changelog_Runner_RenderChangelog_Returns = string;

export type Cli_Utility_Changelog_Runner_RenderChangelog_SectionContents = string[];

export type Cli_Utility_Changelog_Runner_RenderChangelog_Parts = string[];

/**
 * CLI - Utility - Changelog - Run.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_Run_Options = Shared_ChangelogOptions;

export type Cli_Utility_Changelog_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_Run_IsDryRun = boolean;

export type Cli_Utility_Changelog_Runner_Run_ModeOutputKey = 'action';

export type Cli_Utility_Changelog_Runner_Run_ModeOutputValue = 'record' | 'release' | 'fold';

export type Cli_Utility_Changelog_Runner_Run_ModeOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Run_ModeOutputKey, Cli_Utility_Changelog_Runner_Run_ModeOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Run_ModeOutputResult = Record<Cli_Utility_Changelog_Runner_Run_ModeOutputKey, Cli_Utility_Changelog_Runner_Run_ModeOutputValue>;

/**
 * CLI - Utility - Changelog - Stamp Unreleased.
 *
 * @since 0.20.0
 */
export type Cli_Utility_Changelog_Runner_StampUnreleased_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_NewVersion = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_WorkspaceDirectories = string[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_Returns = Promise<boolean>;

export type Cli_Utility_Changelog_Runner_StampUnreleased_IsPrerelease = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_SourceFiles = string[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_SupportedExtensions = string[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_LanguageSincePatterns = Record<string, RegExp>;

export type Cli_Utility_Changelog_Runner_StampUnreleased_NestedWorkspaceDirectories = Set<string>;

export type Cli_Utility_Changelog_Runner_StampUnreleased_SkipDirectories = Set<string>;

export type Cli_Utility_Changelog_Runner_StampUnreleased_ExcludedRootDirectories = Set<string>;

export type Cli_Utility_Changelog_Runner_StampUnreleased_ExcludedNestedDirectories = Set<string>;

export type Cli_Utility_Changelog_Runner_StampUnreleased_PendingDirectories = string[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_CurrentDirectory = string | undefined;

export type Cli_Utility_Changelog_Runner_StampUnreleased_DirectoryEntries = Dirent[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_HasEmbeddedRepository = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CandidatePath = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_DiscoveredExtension = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CandidateFileHandle = FileHandle;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CandidatePrefix = Buffer;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CandidateBytesRead = number;

export type Cli_Utility_Changelog_Runner_StampUnreleased_ReaddirError = unknown;

export type Cli_Utility_Changelog_Runner_StampUnreleased_ReaddirErrorMessage = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_SincePattern = RegExp;

export type Cli_Utility_Changelog_Runner_StampUnreleased_DeprecatedPattern = RegExp;

export type Cli_Utility_Changelog_Runner_StampUnreleased_InlineSincePattern = RegExp;

export type Cli_Utility_Changelog_Runner_StampUnreleased_InlineDeprecatedPattern = RegExp;

export type Cli_Utility_Changelog_Runner_StampUnreleased_Fp = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_OriginalContent = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StampExtension = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StampLanguageSincePattern = RegExp | undefined;

export type Cli_Utility_Changelog_Runner_StampUnreleased_HasSince = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_HasDeprecated = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_HasInlineSince = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_HasInlineDeprecated = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_HasLanguageSince = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_UpdatedContent = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StampLanguageSinceReplacePattern = RegExp;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StampError = unknown;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StampErrorMessage = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_SurvivingFiles = string[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_CheckFp = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CheckContent = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CheckExtension = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CheckLanguageSincePattern = RegExp | undefined;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StillHasSince = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StillHasDeprecated = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StillHasInlineSince = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StillHasInlineDeprecated = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StillHasLanguageSince = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CheckError = unknown;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CheckErrorMessage = string;

/**
 * CLI - Utility - Changelog - Sync Android Version.
 *
 * @since 0.34.0
 */
export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_CurrentVersion = string;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_NewVersion = string;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_EntryCount = number;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_ShouldWrite = boolean;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_Returns = Promise<number | undefined>;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionFilePaths = string[];

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionFile_Path = string;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionFile_Content = string;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionFile = {
  path: Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionFile_Path;
  content: Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionFile_Content;
};

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionFiles = Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionFile[];

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionNames = Set<string>;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionCodes = Set<number>;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionFileContent = string;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionNamePattern = RegExp;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionCodePattern = RegExp;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_HasVersionName = boolean;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_HasVersionCode = boolean;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionNameValue = string | undefined;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_VersionCodeValue = string | undefined;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_ParsedVersionCode = number;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_CurrentVersionName = string | undefined;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_CurrentVersionCode = number | undefined;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_NewVersionCode = number;

export type Cli_Utility_Changelog_Runner_SyncAndroidVersion_UpdatedContent = string;

/**
 * CLI - Utility - Changelog - Sync Apple Version.
 *
 * @since 0.34.0
 */
export type Cli_Utility_Changelog_Runner_SyncAppleVersion_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_CurrentVersion = string;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_NewVersion = string;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_EntryCount = number;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_ShouldWrite = boolean;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_Returns = Promise<number | undefined>;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_DirectoryEntries = Dirent[];

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFilePaths = string[];

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_HasXcodeGenProject = boolean;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFile_Path = string;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFile_Content = string;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFile_IsXcodeGen = boolean;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFile = {
  path: Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFile_Path;
  content: Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFile_Content;
  isXcodeGen: Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFile_IsXcodeGen;
};

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_MarketingVersions = Set<string>;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_BuildVersions = Set<number>;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFiles = Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFile[];

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_VersionFileContent = string;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_IsXcodeGen = boolean;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_MarketingPattern = RegExp;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_BuildPattern = RegExp;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_HasMarketingVersion = boolean;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_HasBuildVersion = boolean;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_TypedMarketingMatch = RegExpMatchArray;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_MarketingValue = string | undefined;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_TypedBuildMatch = RegExpMatchArray;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_BuildValue = string | undefined;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_ParsedBuild = number;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_CurrentMarketingVersion = string | undefined;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_CurrentBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_NewBuild = number;

export type Cli_Utility_Changelog_Runner_SyncAppleVersion_UpdatedContent = string;

/**
 * CLI - Utility - Changelog - Sync Package References.
 *
 * @since 0.20.0
 */
export type Cli_Utility_Changelog_Runner_SyncPackageReferences_ReleasedVersions = Map<string, string>;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_Workspaces = Shared_NovaConfig_Workspaces;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_IsDryRun = boolean;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_CurrentDirectory = string;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_CandidatePaths = Set<string>;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_WorkspaceDirectory = string;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_TemplatesDirectory = string;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_TemplateEntries = string[];

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_Sections = string[];

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_ActionVerb = string;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_CandidateRaw = string | undefined;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_CandidateParsed = Record<string, unknown> | undefined;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_CandidateChanged = boolean;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_SectionObject = unknown;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_DependencyNewVersion = string | undefined;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_DependencyValue = unknown;

/**
 * CLI - Utility - Changelog - Validate Message.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_ValidateMessage_MessageValue = unknown;

export type Cli_Utility_Changelog_Runner_ValidateMessage_Category = Shared_ChangelogEntry_Category | undefined;

export type Cli_Utility_Changelog_Runner_ValidateMessage_Returns = string | true;

export type Cli_Utility_Changelog_Runner_ValidateMessage_FirstWordMatch = RegExpMatchArray | null;

export type Cli_Utility_Changelog_Runner_ValidateMessage_FirstWord = string;

/**
 * CLI - Utility - Changelog - Validate Version.
 *
 * @since 0.26.0
 */
export type Cli_Utility_Changelog_Runner_ValidateVersion_CurrentVersion = string;

export type Cli_Utility_Changelog_Runner_ValidateVersion_VersionStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Cli_Utility_Changelog_Runner_ValidateVersion_PackageJsonPath = string;

export type Cli_Utility_Changelog_Runner_ValidateVersion_Returns = void;

export type Cli_Utility_Changelog_Runner_ValidateVersion_CalverParts = number[];

export type Cli_Utility_Changelog_Runner_ValidateVersion_CalverToday = Date;

export type Cli_Utility_Changelog_Runner_ValidateVersion_CalverYear = number;

export type Cli_Utility_Changelog_Runner_ValidateVersion_CalverMonth = number;

export type Cli_Utility_Changelog_Runner_ValidateVersion_CalverCurrentYear = number;

export type Cli_Utility_Changelog_Runner_ValidateVersion_CalverCurrentMonth = number;

export type Cli_Utility_Changelog_Runner_ValidateVersion_SemverParts = number[];

/**
 * CLI - Utility - Changelog - Write Changelog.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_WriteChangelog_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_PackageName = Shared_ChangelogEntry_Package;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Version = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Entries = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_WriteChangelog_VersionStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Cli_Utility_Changelog_Runner_WriteChangelog_NativeBuild = number | undefined;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_WriteChangelog_ChangelogPath = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Today = Date;

export type Cli_Utility_Changelog_Runner_WriteChangelog_DateString = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_ByCategory = Map<Shared_ChangelogEntry_Category, Shared_ChangelogEntry_Message[]>;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Existing = Shared_ChangelogEntry_Message[];

export type Cli_Utility_Changelog_Runner_WriteChangelog_CategoryOrder = Shared_ChangelogEntry_Category[];

export type Cli_Utility_Changelog_Runner_WriteChangelog_SectionParts = string[];

export type Cli_Utility_Changelog_Runner_WriteChangelog_Messages = Shared_ChangelogEntry_Message[] | undefined;

export type Cli_Utility_Changelog_Runner_WriteChangelog_NewSection = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_ExistingContent = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_PackageHeading = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_NewContent = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_AfterHeading = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_TrimmedAfterHeading = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_PrependedContent = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_PrependedWithHeadingContent = string;
