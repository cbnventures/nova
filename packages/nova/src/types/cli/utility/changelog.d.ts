import type { PromptObject } from 'prompts';

import type { LibNovaConfig } from '../../../lib/nova-config.js';

import type {
  SharedChangelogEntry,
  SharedChangelogEntryBump,
  SharedChangelogEntryCategory,
  SharedChangelogEntryMessage,
  SharedChangelogEntryPackage,
  SharedChangelogOptions,
  SharedNovaConfigConfig,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspaces,
  SharedPromptWithCancelReject,
  SharedPromptWithCancelResolved,
} from '../../shared.d.ts';

/**
 * CLI - Utility - Changelog - Generate File Name.
 *
 * @since 0.13.0
 */
export type CliUtilityChangelogGenerateFileNameReturns = string;

export type CliUtilityChangelogGenerateFileNameAdjective = string | undefined;

export type CliUtilityChangelogGenerateFileNameNoun = string | undefined;

export type CliUtilityChangelogGenerateFileNameVerb = string | undefined;

/**
 * CLI - Utility - Changelog - Parse Entries.
 *
 * @since 0.13.0
 */
export type CliUtilityChangelogParseEntriesReturns = Promise<SharedChangelogEntry[]>;

export type CliUtilityChangelogParseEntriesCurrentDirectory = string;

export type CliUtilityChangelogParseEntriesChangelogDirectory = string;

export type CliUtilityChangelogParseEntriesEntries = SharedChangelogEntry[];

export type CliUtilityChangelogParseEntriesEntryFiles = string[] | undefined;

export type CliUtilityChangelogParseEntriesDirectoryEntries = string[];

export type CliUtilityChangelogParseEntriesFilePath = string;

export type CliUtilityChangelogParseEntriesContent = string;

export type CliUtilityChangelogParseEntriesLines = string[];

export type CliUtilityChangelogParseEntriesEndIndex = number;

export type CliUtilityChangelogParseEntriesEntryPackage = SharedChangelogEntryPackage | undefined;

export type CliUtilityChangelogParseEntriesEntryCategory = SharedChangelogEntryCategory | undefined;

export type CliUtilityChangelogParseEntriesEntryBump = SharedChangelogEntryBump | undefined;

export type CliUtilityChangelogParseEntriesLine = string | undefined;

export type CliUtilityChangelogParseEntriesColonIndex = number;

export type CliUtilityChangelogParseEntriesKey = string;

export type CliUtilityChangelogParseEntriesValue = string;

export type CliUtilityChangelogParseEntriesMessage = string;

/**
 * CLI - Utility - Changelog - Prompt With Cancel.
 *
 * @since 0.13.0
 */
export type CliUtilityChangelogPromptWithCancelQuestions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type CliUtilityChangelogPromptWithCancelReturns<Keys extends string, Result> = Promise<SharedPromptWithCancelResolved<Keys, Result> | SharedPromptWithCancelReject>;

export type CliUtilityChangelogPromptWithCancelCancelled = boolean;

export type CliUtilityChangelogPromptWithCancelResult<Keys extends string, Result> = Record<Keys, Result>;

/**
 * CLI - Utility - Changelog - Record.
 *
 * @since 0.13.0
 */
export type CliUtilityChangelogRecordOptions = SharedChangelogOptions;

export type CliUtilityChangelogRecordReturns = Promise<void>;

export type CliUtilityChangelogRecordIsDryRun = boolean;

export type CliUtilityChangelogRecordNovaConfig = LibNovaConfig;

export type CliUtilityChangelogRecordConfig = SharedNovaConfigConfig;

export type CliUtilityChangelogRecordWorkspaces = SharedNovaConfigWorkspaces;

export type CliUtilityChangelogRecordEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliUtilityChangelogRecordFilterWorkspaceConfig = SharedNovaConfigWorkspace;

export type CliUtilityChangelogRecordFilterWorkspaceConfigPolicy = SharedNovaConfigWorkspace['policy'];

export type CliUtilityChangelogRecordSelectedPackage = SharedChangelogEntryPackage | undefined;

export type CliUtilityChangelogRecordSelectedCategory = SharedChangelogEntryCategory | undefined;

export type CliUtilityChangelogRecordSelectedBump = SharedChangelogEntryBump | undefined;

export type CliUtilityChangelogRecordSelectedMessage = SharedChangelogEntryMessage | undefined;

export type CliUtilityChangelogRecordValidPackageEntry = [string, SharedNovaConfigWorkspace] | undefined;

export type CliUtilityChangelogRecordFindEligibleWorkspaceConfig = SharedNovaConfigWorkspace;

export type CliUtilityChangelogRecordFindEligibleWorkspaceConfigName = string;

export type CliUtilityChangelogRecordValidPackage = string | undefined;

export type CliUtilityChangelogRecordValidCategory = SharedChangelogEntryCategory | undefined;

export type CliUtilityChangelogRecordValidBump = SharedChangelogEntryBump | undefined;

export type CliUtilityChangelogRecordValidMessage = string;

export type CliUtilityChangelogRecordPackageOutputKey = 'package';

export type CliUtilityChangelogRecordPackageOutputValue = SharedChangelogEntryPackage;

export type CliUtilityChangelogRecordPackageOutput = SharedPromptWithCancelResolved<CliUtilityChangelogRecordPackageOutputKey, CliUtilityChangelogRecordPackageOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityChangelogRecordMapEligibleWorkspaceConfig = SharedNovaConfigWorkspace;

export type CliUtilityChangelogRecordMapEligibleWorkspaceConfigName = string;

export type CliUtilityChangelogRecordMapEligibleWorkspaceConfigRole = SharedNovaConfigWorkspace['role'];

export type CliUtilityChangelogRecordMapEligibleWorkspaceConfigPolicy = SharedNovaConfigWorkspace['policy'];

export type CliUtilityChangelogRecordPackageOutputResult = Record<CliUtilityChangelogRecordPackageOutputKey, CliUtilityChangelogRecordPackageOutputValue>;

export type CliUtilityChangelogRecordCategoryOutputKey = 'category';

export type CliUtilityChangelogRecordCategoryOutputValue = SharedChangelogEntryCategory;

export type CliUtilityChangelogRecordCategoryOutput = SharedPromptWithCancelResolved<CliUtilityChangelogRecordCategoryOutputKey, CliUtilityChangelogRecordCategoryOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityChangelogRecordCategoryOutputResult = Record<CliUtilityChangelogRecordCategoryOutputKey, CliUtilityChangelogRecordCategoryOutputValue>;

export type CliUtilityChangelogRecordMessageOutputKey = 'message';

export type CliUtilityChangelogRecordMessageOutputValue = SharedChangelogEntryMessage;

export type CliUtilityChangelogRecordMessageOutput = SharedPromptWithCancelResolved<CliUtilityChangelogRecordMessageOutputKey, CliUtilityChangelogRecordMessageOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityChangelogRecordMessageValidateValue = unknown;

export type CliUtilityChangelogRecordMessageOutputResult = Record<CliUtilityChangelogRecordMessageOutputKey, CliUtilityChangelogRecordMessageOutputValue>;

export type CliUtilityChangelogRecordSuggestedBump = SharedChangelogEntryBump;

export type CliUtilityChangelogRecordBumpOutputKey = 'bump';

export type CliUtilityChangelogRecordBumpOutputValue = SharedChangelogEntryBump;

export type CliUtilityChangelogRecordBumpOutput = SharedPromptWithCancelResolved<CliUtilityChangelogRecordBumpOutputKey, CliUtilityChangelogRecordBumpOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityChangelogRecordBumpOutputResult = Record<CliUtilityChangelogRecordBumpOutputKey, CliUtilityChangelogRecordBumpOutputValue>;

export type CliUtilityChangelogRecordFileName = string;

export type CliUtilityChangelogRecordCurrentDirectory = string;

export type CliUtilityChangelogRecordChangelogDirectory = string;

export type CliUtilityChangelogRecordFilePath = string;

export type CliUtilityChangelogRecordContent = string;

export type CliUtilityChangelogRecordReadmePath = string;

export type CliUtilityChangelogRecordReadmeContent = string;

/**
 * CLI - Utility - Changelog - Release.
 *
 * @since 0.13.0
 */
export type CliUtilityChangelogReleaseOptions = SharedChangelogOptions;

export type CliUtilityChangelogReleaseReturns = Promise<void>;

export type CliUtilityChangelogReleaseIsDryRun = boolean;

export type CliUtilityChangelogReleaseIsNonInteractive = boolean;

export type CliUtilityChangelogReleaseEntries = SharedChangelogEntry[];

export type CliUtilityChangelogReleaseGroups = Map<SharedChangelogEntryPackage, SharedChangelogEntry[]>;

export type CliUtilityChangelogReleaseExisting = SharedChangelogEntry[];

export type CliUtilityChangelogReleaseNovaConfig = LibNovaConfig;

export type CliUtilityChangelogReleaseConfig = SharedNovaConfigConfig;

export type CliUtilityChangelogReleaseWorkspaces = SharedNovaConfigWorkspaces;

export type CliUtilityChangelogReleaseBumpPriority = Record<SharedChangelogEntryBump, number>;

export type CliUtilityChangelogReleaseReleasePackageName = SharedChangelogEntryPackage;

export type CliUtilityChangelogReleaseReleasePackageDirectory = string;

export type CliUtilityChangelogReleaseReleaseCurrentVersion = string;

export type CliUtilityChangelogReleaseReleaseNewVersion = string;

export type CliUtilityChangelogReleaseReleaseHighestBump = SharedChangelogEntryBump;

export type CliUtilityChangelogReleaseReleaseEntries = SharedChangelogEntry[];

export type CliUtilityChangelogReleaseRelease = {
  packageName: CliUtilityChangelogReleaseReleasePackageName;
  packageDirectory: CliUtilityChangelogReleaseReleasePackageDirectory;
  currentVersion: CliUtilityChangelogReleaseReleaseCurrentVersion;
  newVersion: CliUtilityChangelogReleaseReleaseNewVersion;
  highestBump: CliUtilityChangelogReleaseReleaseHighestBump;
  entries: CliUtilityChangelogReleaseReleaseEntries;
};

export type CliUtilityChangelogReleaseReleases = CliUtilityChangelogReleaseRelease[];

export type CliUtilityChangelogReleasePackageName = SharedChangelogEntryPackage;

export type CliUtilityChangelogReleasePackageEntries = SharedChangelogEntry[];

export type CliUtilityChangelogReleaseWorkspaceEntry = [string, SharedNovaConfigWorkspace] | undefined;

export type CliUtilityChangelogReleaseFindWorkspaceConfig = SharedNovaConfigWorkspace;

export type CliUtilityChangelogReleaseFindWorkspaceConfigName = string;

export type CliUtilityChangelogReleaseWorkspacePath = string;

export type CliUtilityChangelogReleaseCurrentDirectory = string;

export type CliUtilityChangelogReleasePackageDirectory = string;

export type CliUtilityChangelogReleasePackageJsonPath = string;

export type CliUtilityChangelogReleasePackageJsonRaw = string | undefined;

export type CliUtilityChangelogReleaseParsedPackageJson = Record<string, unknown> | undefined;

export type CliUtilityChangelogReleaseCurrentVersion = string | undefined;

export type CliUtilityChangelogReleaseHighestBump = SharedChangelogEntryBump;

export type CliUtilityChangelogReleaseVersionParts = number[];

export type CliUtilityChangelogReleaseVersionPartsMajor = number;

export type CliUtilityChangelogReleaseVersionPartsMinor = number;

export type CliUtilityChangelogReleaseVersionPartsPatch = number;

export type CliUtilityChangelogReleaseNewVersion = string;

export type CliUtilityChangelogReleaseCategoryOrder = string[];

export type CliUtilityChangelogReleaseSummaryReleasePackageName = string;

export type CliUtilityChangelogReleaseSummaryReleaseCurrentVersion = string;

export type CliUtilityChangelogReleaseSummaryReleaseNewVersion = string;

export type CliUtilityChangelogReleaseSummaryReleaseHighestBump = SharedChangelogEntryBump;

export type CliUtilityChangelogReleaseSummaryReleaseEntries = SharedChangelogEntry[];

export type CliUtilityChangelogReleaseCategoryEntries = SharedChangelogEntry[];

export type CliUtilityChangelogReleaseCategoryLabel = string;

export type CliUtilityChangelogReleaseCategoryEntryMessage = SharedChangelogEntryMessage;

export type CliUtilityChangelogReleaseConfirmOutputKey = 'confirm';

export type CliUtilityChangelogReleaseConfirmOutputValue = boolean;

export type CliUtilityChangelogReleaseConfirmOutput = SharedPromptWithCancelResolved<CliUtilityChangelogReleaseConfirmOutputKey, CliUtilityChangelogReleaseConfirmOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityChangelogReleaseConfirmOutputResult = Record<CliUtilityChangelogReleaseConfirmOutputKey, CliUtilityChangelogReleaseConfirmOutputValue>;

export type CliUtilityChangelogReleaseApplyReleasePackageName = SharedChangelogEntryPackage;

export type CliUtilityChangelogReleaseApplyReleasePackageDirectory = string;

export type CliUtilityChangelogReleaseApplyReleaseNewVersion = string;

export type CliUtilityChangelogReleaseApplyReleaseEntries = SharedChangelogEntry[];

export type CliUtilityChangelogReleaseApplyPackageJsonPath = string;

export type CliUtilityChangelogReleaseApplyPackageJsonRaw = string;

export type CliUtilityChangelogReleasePackageJson = Record<string, unknown>;

export type CliUtilityChangelogReleaseApplyUpdatedPackageJson = string;

export type CliUtilityChangelogReleaseApplyUpdatedContents = string;

/**
 * CLI - Utility - Changelog - Run.
 *
 * @since 0.13.0
 */
export type CliUtilityChangelogRunOptions = SharedChangelogOptions;

export type CliUtilityChangelogRunReturns = Promise<void>;

export type CliUtilityChangelogRunIsDryRun = boolean;

export type CliUtilityChangelogRunModeOutputKey = 'action';

export type CliUtilityChangelogRunModeOutputValue = 'record' | 'release';

export type CliUtilityChangelogRunModeOutput = SharedPromptWithCancelResolved<CliUtilityChangelogRunModeOutputKey, CliUtilityChangelogRunModeOutputValue> | SharedPromptWithCancelReject;

export type CliUtilityChangelogRunModeOutputResult = Record<CliUtilityChangelogRunModeOutputKey, CliUtilityChangelogRunModeOutputValue>;

/**
 * CLI - Utility - Changelog - Write Changelog.
 *
 * @since 0.13.0
 */
export type CliUtilityChangelogWriteChangelogPackageDirectory = string;

export type CliUtilityChangelogWriteChangelogPackageName = SharedChangelogEntryPackage;

export type CliUtilityChangelogWriteChangelogVersion = string;

export type CliUtilityChangelogWriteChangelogEntries = SharedChangelogEntry[];

export type CliUtilityChangelogWriteChangelogReturns = Promise<void>;

export type CliUtilityChangelogWriteChangelogChangelogPath = string;

export type CliUtilityChangelogWriteChangelogToday = Date;

export type CliUtilityChangelogWriteChangelogDateString = string;

export type CliUtilityChangelogWriteChangelogByCategory = Map<SharedChangelogEntryCategory, SharedChangelogEntryMessage[]>;

export type CliUtilityChangelogWriteChangelogExisting = SharedChangelogEntryMessage[];

export type CliUtilityChangelogWriteChangelogCategoryOrder = SharedChangelogEntryCategory[];

export type CliUtilityChangelogWriteChangelogSectionParts = string[];

export type CliUtilityChangelogWriteChangelogMessages = SharedChangelogEntryMessage[] | undefined;

export type CliUtilityChangelogWriteChangelogNewSection = string;

export type CliUtilityChangelogWriteChangelogExistingContent = string;

export type CliUtilityChangelogWriteChangelogPackageHeading = string;

export type CliUtilityChangelogWriteChangelogNewContent = string;

export type CliUtilityChangelogWriteChangelogAfterHeading = string;

export type CliUtilityChangelogWriteChangelogTrimmedAfterHeading = string;

export type CliUtilityChangelogWriteChangelogPrependedContent = string;
