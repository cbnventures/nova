import type { PromptObject } from 'prompts';

import type {
  ChangelogEntry,
  ChangelogEntryBump,
  ChangelogEntryCategory,
  ChangelogEntryMessage,
  ChangelogEntryPackage,
  ChangelogOptions,
} from '@/types/shared.d.ts';

/**
 * CLI Utility - Changelog - Generate file name.
 *
 * @since 1.0.0
 */
export type CLIUtilityChangelogGenerateFileNameReturns = string;

/**
 * CLI Utility - Changelog - Parse entries.
 *
 * @since 1.0.0
 */
export type CLIUtilityChangelogParseEntriesReturns = Promise<ChangelogEntry[]>;

export type CLIUtilityChangelogParseEntriesEntries = ChangelogEntry[];

export type CLIUtilityChangelogParseEntriesFiles = string[];

export type CLIUtilityChangelogParseEntriesEntryPackage = ChangelogEntryPackage | undefined;

export type CLIUtilityChangelogParseEntriesEntryCategory = ChangelogEntryCategory | undefined;

export type CLIUtilityChangelogParseEntriesEntryBump = ChangelogEntryBump | undefined;

/**
 * CLI Utility - Changelog - Prompt with cancel.
 *
 * @since 1.0.0
 */
export type CLIUtilityChangelogPromptWithCancelQuestions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type CLIUtilityChangelogPromptWithCancelReturnsResolvedCancelled = false;

export type CLIUtilityChangelogPromptWithCancelReturnsResolvedResult<Keys extends string, Result> = Record<Keys, Result>;

export type CLIUtilityChangelogPromptWithCancelReturnsResolved<Keys extends string, Result> = {
  cancelled: CLIUtilityChangelogPromptWithCancelReturnsResolvedCancelled;
  result: CLIUtilityChangelogPromptWithCancelReturnsResolvedResult<Keys, Result>;
};

export type CLIUtilityChangelogPromptWithCancelReturnsRejectCancelled = true;

export type CLIUtilityChangelogPromptWithCancelReturnsReject = {
  cancelled: CLIUtilityChangelogPromptWithCancelReturnsRejectCancelled;
};

export type CLIUtilityChangelogPromptWithCancelReturns<Keys extends string, Result> = Promise<CLIUtilityChangelogPromptWithCancelReturnsResolved<Keys, Result> | CLIUtilityChangelogPromptWithCancelReturnsReject>;

/**
 * CLI Utility - Changelog - Record.
 *
 * @since 1.0.0
 */
export type CLIUtilityChangelogRecordOptions = ChangelogOptions;

export type CLIUtilityChangelogRecordReturns = Promise<void>;

export type CLIUtilityChangelogRecordSelectedPackage = ChangelogEntryPackage;

export type CLIUtilityChangelogRecordSelectedCategory = ChangelogEntryCategory;

export type CLIUtilityChangelogRecordSelectedBump = ChangelogEntryBump;

export type CLIUtilityChangelogRecordSelectedMessage = ChangelogEntryMessage;

export type CLIUtilityChangelogRecordPackageOutputKey = 'package';

export type CLIUtilityChangelogRecordPackageOutputValue = ChangelogEntryPackage;

export type CLIUtilityChangelogRecordCategoryOutputKey = 'category';

export type CLIUtilityChangelogRecordCategoryOutputValue = ChangelogEntryCategory;

export type CLIUtilityChangelogRecordMessageOutputKey = 'message';

export type CLIUtilityChangelogRecordMessageOutputValue = ChangelogEntryMessage;

export type CLIUtilityChangelogRecordBumpOutputKey = 'bump';

export type CLIUtilityChangelogRecordBumpOutputValue = ChangelogEntryBump;

/**
 * CLI Utility - Changelog - Release.
 *
 * @since 1.0.0
 */
export type CLIUtilityChangelogReleaseOptions = ChangelogOptions;

export type CLIUtilityChangelogReleaseReturns = Promise<void>;

export type CLIUtilityChangelogReleaseGrouped = Map<ChangelogEntryPackage, ChangelogEntry[]>;

export type CLIUtilityChangelogReleaseBumpPriority = Record<ChangelogEntryBump, number>;

export type CLIUtilityChangelogReleaseReleasePackageName = ChangelogEntryPackage;

export type CLIUtilityChangelogReleaseReleasePackageDir = string;

export type CLIUtilityChangelogReleaseReleaseCurrentVersion = string;

export type CLIUtilityChangelogReleaseReleaseNewVersion = string;

export type CLIUtilityChangelogReleaseReleaseHighestBump = ChangelogEntryBump;

export type CLIUtilityChangelogReleaseReleaseEntries = ChangelogEntry[];

export type CLIUtilityChangelogReleaseRelease = {
  packageName: CLIUtilityChangelogReleaseReleasePackageName;
  packageDir: CLIUtilityChangelogReleaseReleasePackageDir;
  currentVersion: CLIUtilityChangelogReleaseReleaseCurrentVersion;
  newVersion: CLIUtilityChangelogReleaseReleaseNewVersion;
  highestBump: CLIUtilityChangelogReleaseReleaseHighestBump;
  entries: CLIUtilityChangelogReleaseReleaseEntries;
};

export type CLIUtilityChangelogReleaseReleases = CLIUtilityChangelogReleaseRelease[];

export type CLIUtilityChangelogReleasePackageJson = Record<string, unknown>;

export type CLIUtilityChangelogReleaseHighestBump = ChangelogEntryBump;

export type CLIUtilityChangelogReleaseConfirmOutputKey = 'confirm';

export type CLIUtilityChangelogReleaseConfirmOutputValue = boolean;

/**
 * CLI Utility - Changelog - Run.
 *
 * @since 1.0.0
 */
export type CLIUtilityChangelogRunOptions = ChangelogOptions;

export type CLIUtilityChangelogRunReturns = Promise<void>;

export type CLIUtilityChangelogRunModeOutputKey = 'action';

export type CLIUtilityChangelogRunModeOutputValue = 'record' | 'release';

/**
 * CLI Utility - Changelog - Write changelog.
 *
 * @since 1.0.0
 */
export type CLIUtilityChangelogWriteChangelogPackageDir = string;

export type CLIUtilityChangelogWriteChangelogPackageName = ChangelogEntryPackage;

export type CLIUtilityChangelogWriteChangelogVersion = string;

export type CLIUtilityChangelogWriteChangelogEntries = ChangelogEntry[];

export type CLIUtilityChangelogWriteChangelogReturns = Promise<void>;

export type CLIUtilityChangelogWriteChangelogByCategory = Map<ChangelogEntryCategory, ChangelogEntryMessage[]>;

export type CLIUtilityChangelogWriteChangelogCategoryOrder = ChangelogEntryCategory[];

export type CLIUtilityChangelogWriteChangelogSectionParts = string[];
