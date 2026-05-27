import type { PromptObject } from 'prompts';

import type { Runner as LibNovaConfig } from '../../../lib/nova-config.js';

import type {
  Shared_ChangelogEntry,
  Shared_ChangelogEntry_Bump,
  Shared_ChangelogEntry_Category,
  Shared_ChangelogEntry_Message,
  Shared_ChangelogEntry_Package,
  Shared_ChangelogOptions,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigConfig,
  Shared_NovaConfigWorkspace,
  Shared_PromptWithCancelReject,
  Shared_PromptWithCancelResolved,
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

export type Cli_Utility_Changelog_Runner_Record_MessageValidateValue = unknown;

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

export type Cli_Utility_Changelog_Runner_Release_Groups = Map<Shared_ChangelogEntry_Package, Shared_ChangelogEntry[]>;

export type Cli_Utility_Changelog_Runner_Release_Existing = Shared_ChangelogEntry[];

export type Cli_Utility_Changelog_Runner_Release_NovaConfig = LibNovaConfig;

export type Cli_Utility_Changelog_Runner_Release_Config = Shared_NovaConfigConfig;

export type Cli_Utility_Changelog_Runner_Release_Workspaces = Shared_NovaConfig_Workspaces;

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

export type Cli_Utility_Changelog_Runner_Release_VersionParts = number[];

export type Cli_Utility_Changelog_Runner_Release_VersionPartsMajor = number;

export type Cli_Utility_Changelog_Runner_Release_VersionPartsMinor = number;

export type Cli_Utility_Changelog_Runner_Release_VersionPartsPatch = number;

export type Cli_Utility_Changelog_Runner_Release_NewVersion = string;

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

export type Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageName = Shared_ChangelogEntry_Package;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageDirectory = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleaseNewVersion = string;

export type Cli_Utility_Changelog_Runner_Release_ApplyReleaseEntries = Shared_ChangelogEntry[];

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
export type Cli_Utility_Changelog_Runner_Run_Options = Shared_ChangelogOptions;

export type Cli_Utility_Changelog_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_Changelog_Runner_Run_IsDryRun = boolean;

export type Cli_Utility_Changelog_Runner_Run_ModeOutputKey = 'action';

export type Cli_Utility_Changelog_Runner_Run_ModeOutputValue = 'record' | 'release';

export type Cli_Utility_Changelog_Runner_Run_ModeOutput = Shared_PromptWithCancelResolved<Cli_Utility_Changelog_Runner_Run_ModeOutputKey, Cli_Utility_Changelog_Runner_Run_ModeOutputValue> | Shared_PromptWithCancelReject;

export type Cli_Utility_Changelog_Runner_Run_ModeOutputResult = Record<Cli_Utility_Changelog_Runner_Run_ModeOutputKey, Cli_Utility_Changelog_Runner_Run_ModeOutputValue>;

/**
 * CLI - Utility - Changelog - Write Changelog.
 *
 * @since 0.13.0
 */
export type Cli_Utility_Changelog_Runner_WriteChangelog_PackageDirectory = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_PackageName = Shared_ChangelogEntry_Package;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Version = string;

export type Cli_Utility_Changelog_Runner_WriteChangelog_Entries = Shared_ChangelogEntry[];

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
