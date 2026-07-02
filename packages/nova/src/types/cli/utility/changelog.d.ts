import type { PromptObject } from 'prompts';

import type { Runner as LibNovaConfig } from '../../../lib/nova-config.js';

import type {
  Shared_ChangelogEntry as SharedChangelogEntry,
  Shared_ChangelogEntry_Bump as SharedChangelogEntryBump,
  Shared_ChangelogEntry_Category as SharedChangelogEntryCategory,
  Shared_ChangelogEntry_Message as SharedChangelogEntryMessage,
  Shared_ChangelogEntry_Package as SharedChangelogEntryPackage,
  Shared_ChangelogOptions as SharedChangelogOptions,
  Shared_NovaConfig_Workspaces as SharedNovaConfigWorkspaces,
  Shared_NovaConfigConfig as SharedNovaConfigConfig,
  Shared_NovaConfigWorkspace as SharedNovaConfigWorkspace,
  Shared_PromptWithCancelReject as SharedPromptWithCancelReject,
  Shared_PromptWithCancelResolved as SharedPromptWithCancelResolved,
} from '../../shared.d.ts';

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
 * CLI - Utility - Changelog - Parse Entries.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_ParseEntries_Returns = Promise<SharedChangelogEntry[]>;

export type Cli_Utility_Changelog_Runner_ParseEntries_CurrentDirectory = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_ChangelogDirectory = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Entries = SharedChangelogEntry[];

export type Cli_Utility_Changelog_Runner_ParseEntries_EntryFiles = string[] | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_DirectoryEntries = string[];

export type Cli_Utility_Changelog_Runner_ParseEntries_FilePath = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Content = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Lines = string[];

export type Cli_Utility_Changelog_Runner_ParseEntries_EndIndex = number;

export type Cli_Utility_Changelog_Runner_ParseEntries_EntryPackage = SharedChangelogEntryPackage | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_EntryCategory = SharedChangelogEntryCategory | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_EntryBump = SharedChangelogEntryBump | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_Line = string | undefined;

export type Cli_Utility_Changelog_Runner_ParseEntries_ColonIndex = number;

export type Cli_Utility_Changelog_Runner_ParseEntries_Key = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Value = string;

export type Cli_Utility_Changelog_Runner_ParseEntries_Message = string;

/**
 * CLI - Utility - Changelog - Prompt With Cancel.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_PromptWithCancel_Questions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type Cli_Utility_Changelog_Runner_PromptWithCancel_Returns<Keys extends string, Result> = Promise<SharedPromptWithCancelResolved<Keys, Result> | SharedPromptWithCancelReject>;

export type Cli_Utility_Changelog_Runner_PromptWithCancel_Cancelled = boolean;

export type Cli_Utility_Changelog_Runner_PromptWithCancel_Result<Keys extends string, Result> = Record<Keys, Result>;

/**
 * CLI - Utility - Changelog - Record.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_Record_Options = SharedChangelogOptions;

export type Cli_Utility_Changelog_Runner_Record_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_Record_IsDryRun = boolean;

export type Cli_Utility_Changelog_Runner_Record_NovaConfig = LibNovaConfig;

export type Cli_Utility_Changelog_Runner_Record_Config = SharedNovaConfigConfig;

export type Cli_Utility_Changelog_Runner_Record_Workspaces = SharedNovaConfigWorkspaces;

export type Cli_Utility_Changelog_Runner_Record_EligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Utility_Changelog_Runner_Record_FilterWorkspaceConfig = SharedNovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Record_FilterWorkspaceConfigPolicy = SharedNovaConfigWorkspace['policy'];

export type Cli_Utility_Changelog_Runner_Record_SelectedPackage = SharedChangelogEntryPackage | undefined;

export type Cli_Utility_Changelog_Runner_Record_SelectedCategory = SharedChangelogEntryCategory | undefined;

export type Cli_Utility_Changelog_Runner_Record_SelectedBump = SharedChangelogEntryBump | undefined;

export type Cli_Utility_Changelog_Runner_Record_SelectedMessage = SharedChangelogEntryMessage | undefined;

export type Cli_Utility_Changelog_Runner_Record_ValidPackageEntry = [string, SharedNovaConfigWorkspace] | undefined;

export type Cli_Utility_Changelog_Runner_Record_FindEligibleWorkspaceConfig = SharedNovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Record_FindEligibleWorkspaceConfigName = string;

export type Cli_Utility_Changelog_Runner_Record_ValidPackage = string | undefined;

export type Cli_Utility_Changelog_Runner_Record_ValidCategory = SharedChangelogEntryCategory | undefined;

export type Cli_Utility_Changelog_Runner_Record_ValidBump = SharedChangelogEntryBump | undefined;

export type Cli_Utility_Changelog_Runner_Record_ValidMessage = string;

export type Cli_Utility_Changelog_Runner_Record_PackageOutputKey = 'package';

export type Cli_Utility_Changelog_Runner_Record_PackageOutputValue = SharedChangelogEntryPackage;

export type Cli_Utility_Changelog_Runner_Record_PackageOutput = SharedPromptWithCancelResolved<Cli_Utility_Changelog_Runner_Record_PackageOutputKey, Cli_Utility_Changelog_Runner_Record_PackageOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfig = SharedNovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigName = string;

export type Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigRole = SharedNovaConfigWorkspace['role'];

export type Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigPolicy = SharedNovaConfigWorkspace['policy'];

export type Cli_Utility_Changelog_Runner_Record_PackageOutputResult = Record<Cli_Utility_Changelog_Runner_Record_PackageOutputKey, Cli_Utility_Changelog_Runner_Record_PackageOutputValue>;

export type Cli_Utility_Changelog_Runner_Record_CategoryOutputKey = 'category';

export type Cli_Utility_Changelog_Runner_Record_CategoryOutputValue = SharedChangelogEntryCategory;

export type Cli_Utility_Changelog_Runner_Record_CategoryOutput = SharedPromptWithCancelResolved<Cli_Utility_Changelog_Runner_Record_CategoryOutputKey, Cli_Utility_Changelog_Runner_Record_CategoryOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Record_CategoryOutputResult = Record<Cli_Utility_Changelog_Runner_Record_CategoryOutputKey, Cli_Utility_Changelog_Runner_Record_CategoryOutputValue>;

export type Cli_Utility_Changelog_Runner_Record_MessageOutputKey = 'message';

export type Cli_Utility_Changelog_Runner_Record_MessageOutputValue = SharedChangelogEntryMessage;

export type Cli_Utility_Changelog_Runner_Record_MessageOutput = SharedPromptWithCancelResolved<Cli_Utility_Changelog_Runner_Record_MessageOutputKey, Cli_Utility_Changelog_Runner_Record_MessageOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Record_MessageOutputResult = Record<Cli_Utility_Changelog_Runner_Record_MessageOutputKey, Cli_Utility_Changelog_Runner_Record_MessageOutputValue>;

export type Cli_Utility_Changelog_Runner_Record_SuggestedBump = SharedChangelogEntryBump;

export type Cli_Utility_Changelog_Runner_Record_BumpOutputKey = 'bump';

export type Cli_Utility_Changelog_Runner_Record_BumpOutputValue = SharedChangelogEntryBump;

export type Cli_Utility_Changelog_Runner_Record_BumpOutput = SharedPromptWithCancelResolved<Cli_Utility_Changelog_Runner_Record_BumpOutputKey, Cli_Utility_Changelog_Runner_Record_BumpOutputValue> | SharedPromptWithCancelReject;

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
export type Cli_Utility_Changelog_Runner_Release_Options = SharedChangelogOptions;

export type Cli_Utility_Changelog_Runner_Release_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_Release_IsDryRun = boolean;

export type Cli_Utility_Changelog_Runner_Release_IsNonInteractive = boolean;

export type Cli_Utility_Changelog_Runner_Release_Entries = SharedChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_Groups = Map<SharedChangelogEntryPackage, SharedChangelogEntry[]>;

export type Cli_Utility_Changelog_Runner_Release_Existing = SharedChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_NovaConfig = LibNovaConfig;

export type Cli_Utility_Changelog_Runner_Release_Config = SharedNovaConfigConfig;

export type Cli_Utility_Changelog_Runner_Release_Workspaces = SharedNovaConfigWorkspaces;

export type Cli_Utility_Changelog_Runner_Release_BumpPriority = Record<SharedChangelogEntryBump, number>;

export type Cli_Utility_Changelog_Runner_Release_Release_PackageName = SharedChangelogEntryPackage;

export type Cli_Utility_Changelog_Runner_Release_Release_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_Release_CurrentVersion = string;

export type Cli_Utility_Changelog_Runner_Release_Release_NewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_Release_HighestBump = SharedChangelogEntryBump;

export type Cli_Utility_Changelog_Runner_Release_Release_Entries = SharedChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_Release = {
  packageName: Cli_Utility_Changelog_Runner_Release_Release_PackageName;
  packageDirectory: Cli_Utility_Changelog_Runner_Release_Release_PackageDirectory;
  currentVersion: Cli_Utility_Changelog_Runner_Release_Release_CurrentVersion;
  newVersion: Cli_Utility_Changelog_Runner_Release_Release_NewVersion;
  highestBump: Cli_Utility_Changelog_Runner_Release_Release_HighestBump;
  entries: Cli_Utility_Changelog_Runner_Release_Release_Entries;
};

export type Cli_Utility_Changelog_Runner_Release_Releases = Cli_Utility_Changelog_Runner_Release_Release[];

export type Cli_Utility_Changelog_Runner_Release_PackageName = SharedChangelogEntryPackage;

export type Cli_Utility_Changelog_Runner_Release_PackageEntries = SharedChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_WorkspaceEntry = [string, SharedNovaConfigWorkspace] | undefined;

export type Cli_Utility_Changelog_Runner_Release_FindWorkspaceConfig = SharedNovaConfigWorkspace;

export type Cli_Utility_Changelog_Runner_Release_FindWorkspaceConfigName = string;

export type Cli_Utility_Changelog_Runner_Release_WorkspacePath = string;

export type Cli_Utility_Changelog_Runner_Release_CurrentDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_PackageJsonPath = string;

export type Cli_Utility_Changelog_Runner_Release_PackageJsonRaw = string | undefined;

export type Cli_Utility_Changelog_Runner_Release_ParsedPackageJson = Record<string, unknown> | undefined;

export type Cli_Utility_Changelog_Runner_Release_CurrentVersion = string | undefined;

export type Cli_Utility_Changelog_Runner_Release_HighestBump = SharedChangelogEntryBump;

export type Cli_Utility_Changelog_Runner_Release_VersionParts = number[];

export type Cli_Utility_Changelog_Runner_Release_VersionPartsMajor = number;

export type Cli_Utility_Changelog_Runner_Release_VersionPartsMinor = number;

export type Cli_Utility_Changelog_Runner_Release_VersionPartsPatch = number;

export type Cli_Utility_Changelog_Runner_Release_NewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_CategoryOrder = string[];

export type Cli_Utility_Changelog_Runner_Release_SummaryReleasePackageName = string;

export type Cli_Utility_Changelog_Runner_Release_SummaryReleaseCurrentVersion = string;

export type Cli_Utility_Changelog_Runner_Release_SummaryReleaseNewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_SummaryReleaseHighestBump = SharedChangelogEntryBump;

export type Cli_Utility_Changelog_Runner_Release_SummaryReleaseEntries = SharedChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_CategoryEntries = SharedChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_CategoryLabel = string;

export type Cli_Utility_Changelog_Runner_Release_CategoryEntryMessage = SharedChangelogEntryMessage;

export type Cli_Utility_Changelog_Runner_Release_ConfirmOutputKey = 'confirm';

export type Cli_Utility_Changelog_Runner_Release_ConfirmOutputValue = boolean;

export type Cli_Utility_Changelog_Runner_Release_ConfirmOutput = SharedPromptWithCancelResolved<Cli_Utility_Changelog_Runner_Release_ConfirmOutputKey, Cli_Utility_Changelog_Runner_Release_ConfirmOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Release_ConfirmOutputResult = Record<Cli_Utility_Changelog_Runner_Release_ConfirmOutputKey, Cli_Utility_Changelog_Runner_Release_ConfirmOutputValue>;

export type Cli_Utility_Changelog_Runner_Release_ReleasedVersions = Map<string, string>;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageName = SharedChangelogEntryPackage;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleaseNewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleaseEntries = SharedChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_ApplyPackageJsonPath = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyPackageJsonRaw = string;

export type Cli_Utility_Changelog_Runner_Release_PackageJson = Record<string, unknown>;

export type Cli_Utility_Changelog_Runner_Release_ApplyUpdatedPackageJson = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyUpdatedContents = string;

/**
 * CLI - Utility - Changelog - Run.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_Run_Options = SharedChangelogOptions;

export type Cli_Utility_Changelog_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_Run_IsDryRun = boolean;

export type Cli_Utility_Changelog_Runner_Run_ModeOutputKey = 'action';

export type Cli_Utility_Changelog_Runner_Run_ModeOutputValue = 'record' | 'release';

export type Cli_Utility_Changelog_Runner_Run_ModeOutput = SharedPromptWithCancelResolved<Cli_Utility_Changelog_Runner_Run_ModeOutputKey, Cli_Utility_Changelog_Runner_Run_ModeOutputValue> | SharedPromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Run_ModeOutputResult = Record<Cli_Utility_Changelog_Runner_Run_ModeOutputKey, Cli_Utility_Changelog_Runner_Run_ModeOutputValue>;

/**
 * CLI - Utility - Changelog - Stamp Unreleased.
 *
 * @since 0.20.0
 */
export type Cli_Utility_Changelog_Runner_StampUnreleased_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_NewVersion = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_StampUnreleased_IsPrerelease = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_SrcDirectory = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_SourceFiles = string[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_RawPaths = string[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_RelativePaths = string[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_Rp = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_ReaddirError = unknown;

export type Cli_Utility_Changelog_Runner_StampUnreleased_ReaddirErrorCode = unknown;

export type Cli_Utility_Changelog_Runner_StampUnreleased_SincePattern = RegExp;

export type Cli_Utility_Changelog_Runner_StampUnreleased_DeprecatedPattern = RegExp;

export type Cli_Utility_Changelog_Runner_StampUnreleased_Fp = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_OriginalContent = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_HasSince = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_HasDeprecated = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_UpdatedContent = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_SurvivingFiles = string[];

export type Cli_Utility_Changelog_Runner_StampUnreleased_CheckFp = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_CheckContent = string;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StillHasSince = boolean;

export type Cli_Utility_Changelog_Runner_StampUnreleased_StillHasDeprecated = boolean;

/**
 * CLI - Utility - Changelog - Sync Package References.
 *
 * @since 0.20.0
 */
export type Cli_Utility_Changelog_Runner_SyncPackageReferences_ReleasedVersions = Map<string, string>;

export type Cli_Utility_Changelog_Runner_SyncPackageReferences_Workspaces = SharedNovaConfigWorkspaces;

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

export type Cli_Utility_Changelog_Runner_ValidateMessage_Returns = string | true;

/**
 * CLI - Utility - Changelog - Write Changelog.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_WriteChangelog_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_PackageName = SharedChangelogEntryPackage;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Version = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Entries = SharedChangelogEntry[];

export type Cli_Utility_Changelog_Runner_WriteChangelog_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_WriteChangelog_ChangelogPath = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Today = Date;

export type Cli_Utility_Changelog_Runner_WriteChangelog_DateString = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_ByCategory = Map<SharedChangelogEntryCategory, SharedChangelogEntryMessage[]>;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Existing = SharedChangelogEntryMessage[];

export type Cli_Utility_Changelog_Runner_WriteChangelog_CategoryOrder = SharedChangelogEntryCategory[];

export type Cli_Utility_Changelog_Runner_WriteChangelog_SectionParts = string[];

export type Cli_Utility_Changelog_Runner_WriteChangelog_Messages = SharedChangelogEntryMessage[] | undefined;

export type Cli_Utility_Changelog_Runner_WriteChangelog_NewSection = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_ExistingContent = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_PackageHeading = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_NewContent = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_AfterHeading = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_TrimmedAfterHeading = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_PrependedContent = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_PrependedWithHeadingContent = string;
