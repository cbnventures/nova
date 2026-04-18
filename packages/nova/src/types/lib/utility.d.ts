import type { ChildProcess, ExecException, ExecOptions } from 'child_process';
import type { Dirent } from 'fs';
import type { ParsedPath } from 'path';

import type {
  SharedLinuxOsReleaseEntries,
  SharedNovaConfigWorkspace,
  SharedShellOutput,
  SharedWindowsRegistryKeys,
  SharedWorkspaceManifest,
  SharedWorkspaceManifestFileContents,
} from '../shared.d.ts';

/**
 * Lib - Utility - Current Timestamp.
 *
 * @since 0.11.0
 */
export type LibUtilityCurrentTimestampReturns = string;

export type LibUtilityCurrentTimestampNow = Date;

export type LibUtilityCurrentTimestampYear = number;

export type LibUtilityCurrentTimestampMonth = string;

export type LibUtilityCurrentTimestampDay = string;

export type LibUtilityCurrentTimestampHour = string;

export type LibUtilityCurrentTimestampMinute = string;

export type LibUtilityCurrentTimestampSecond = string;

export type LibUtilityCurrentTimestampMillisecond = string;

export type LibUtilityCurrentTimestampTimezoneOffsetMinutes = number;

export type LibUtilityCurrentTimestampTimezoneSign = string;

export type LibUtilityCurrentTimestampTimezoneAbs = number;

export type LibUtilityCurrentTimestampTimezoneHoursTruncated = number;

export type LibUtilityCurrentTimestampTimezoneHours = string;

export type LibUtilityCurrentTimestampTimezoneMinutes = string;

/**
 * Lib - Utility - Current Timestamp - Pad Left.
 *
 * @since 0.11.0
 */
export type LibUtilityCurrentTimestampPadLeftNumber = number;

export type LibUtilityCurrentTimestampPadLeftWidth = number;

export type LibUtilityCurrentTimestampPadLeftReturns = string;

export type LibUtilityCurrentTimestampPadLeft = (number: LibUtilityCurrentTimestampPadLeftNumber, width?: LibUtilityCurrentTimestampPadLeftWidth) => LibUtilityCurrentTimestampPadLeftReturns;

export type LibUtilityCurrentTimestampPadLeftCurrentWidth = number;

export type LibUtilityCurrentTimestampRawMonth = number;

export type LibUtilityCurrentTimestampRawDate = number;

export type LibUtilityCurrentTimestampRawHours = number;

export type LibUtilityCurrentTimestampRawMinutes = number;

export type LibUtilityCurrentTimestampRawSeconds = number;

/**
 * Lib - Utility - Detect Shell.
 *
 * @since 0.11.0
 */
export type LibUtilityDetectShellReturns =
  'cmd.exe'
  | '/bin/bash'
  | '/bin/ksh'
  | '/bin/sh'
  | '/bin/zsh';

export type LibUtilityDetectShellCurrentPlatform = NodeJS.Platform;

/**
 * Lib - Utility - Discover Paths With File.
 *
 * @since 0.11.0
 */
export type LibUtilityDiscoverPathsWithFileFileName = string;

export type LibUtilityDiscoverPathsWithFileDirection = 'backward' | 'forward';

export type LibUtilityDiscoverPathsWithFileReturns = Promise<string[]>;

export type LibUtilityDiscoverPathsWithFileStartDirectory = string;

export type LibUtilityDiscoverPathsWithFileResults = string[];

export type LibUtilityDiscoverPathsWithFileRootDirectory = string;

export type LibUtilityDiscoverPathsWithFileBackwardCurrentDirectory = string;

export type LibUtilityDiscoverPathsWithFileTargetPath = string;

export type LibUtilityDiscoverPathsWithFileQueue = string[];

export type LibUtilityDiscoverPathsWithFileVisited = Set<string>;

export type LibUtilityDiscoverPathsWithFileSkipDirectories = Set<string>;

export type LibUtilityDiscoverPathsWithFileForwardCurrentDirectory = string | undefined;

export type LibUtilityDiscoverPathsWithFileRealDirectory = string | undefined;

export type LibUtilityDiscoverPathsWithFileEntries = Dirent[] | undefined;

export type LibUtilityDiscoverPathsWithFileHasTargetFile = boolean;

export type LibUtilityDiscoverPathsWithFileNextDirectory = string;

/**
 * Lib - Utility - Execute Shell.
 *
 * @since 0.11.0
 */
export type LibUtilityExecuteShellCommand = string;

export type LibUtilityExecuteShellReturns = Promise<SharedShellOutput>;

export type LibUtilityExecuteShellExecAsync = (command: string, options: ExecOptions) => Promise<{
  stdout: string; stderr: string;
}>;

export type LibUtilityExecuteShellShell = string;

export type LibUtilityExecuteShellCommandName = string;

export type LibUtilityExecuteShellCommandOnPath = boolean;

export type LibUtilityExecuteShellFullCommand = string;

export type LibUtilityExecuteShellExecResultStdout = string;

export type LibUtilityExecuteShellExecResultStderr = string;

export type LibUtilityExecuteShellExecResult = {
  stdout: LibUtilityExecuteShellExecResultStdout;
  stderr: LibUtilityExecuteShellExecResultStderr;
};

export type LibUtilityExecuteShellStdout = string;

export type LibUtilityExecuteShellStderr = string;

export type LibUtilityExecuteShellSuccessOutput = SharedShellOutput;

export type LibUtilityExecuteShellErrorOutput = SharedShellOutput;

/**
 * Lib - Utility - Execute Shell - Quote Posix.
 *
 * @since 0.11.0
 */
export type LibUtilityExecuteShellQuotePosixString = string;

export type LibUtilityExecuteShellQuotePosixReturns = string;

export type LibUtilityExecuteShellQuotePosix = (string: LibUtilityExecuteShellQuotePosixString) => LibUtilityExecuteShellQuotePosixReturns;

export type LibUtilityExecuteShellQuotePosixPattern = RegExp;

/**
 * Lib - Utility - Execute Shell - Quote Windows.
 *
 * @since 0.11.0
 */
export type LibUtilityExecuteShellQuoteWindowsString = string;

export type LibUtilityExecuteShellQuoteWindowsReturns = string;

export type LibUtilityExecuteShellQuoteWindows = (string: LibUtilityExecuteShellQuoteWindowsString) => LibUtilityExecuteShellQuoteWindowsReturns;

export type LibUtilityExecuteShellQuoteWindowsPattern = RegExp;

/**
 * Lib - Utility - Is Command Exists.
 *
 * @since 0.11.0
 */
export type LibUtilityIsCommandExistsCommand = string;

export type LibUtilityIsCommandExistsReturns = Promise<boolean>;

export type LibUtilityIsCommandExistsIsWin = boolean;

export type LibUtilityIsCommandExistsBin = string;

export type LibUtilityIsCommandExistsCommandArguments = string[];

export type LibUtilityIsCommandExistsChildProcess = ChildProcess;

/**
 * Lib - Utility - Is Execute Shell Error.
 *
 * @since 0.11.0
 */
export type LibUtilityIsExecuteShellErrorError = unknown;

export type LibUtilityIsExecuteShellErrorTypeGuard = ExecException;

export type LibUtilityIsExecuteShellErrorObject = Record<string, unknown>;

export type LibUtilityIsExecuteShellErrorHasCommand = boolean;

export type LibUtilityIsExecuteShellErrorHasKilled = boolean;

export type LibUtilityIsExecuteShellErrorHasCode = boolean;

export type LibUtilityIsExecuteShellErrorHasSignal = boolean;

export type LibUtilityIsExecuteShellErrorHasStdout = boolean;

export type LibUtilityIsExecuteShellErrorHasStderr = boolean;

/**
 * Lib - Utility - Is File Identical.
 *
 * @since 0.13.0
 */
export type LibUtilityIsFileIdenticalExistingFilePath = string;

export type LibUtilityIsFileIdenticalProposedContents = unknown;

export type LibUtilityIsFileIdenticalReturns = Promise<boolean>;

export type LibUtilityIsFileIdenticalOldFileContents = string | undefined;

export type LibUtilityIsFileIdenticalNewFileContents = string | undefined;

export type LibUtilityIsFileIdenticalSerialized = string | undefined;

export type LibUtilityIsFileIdenticalIsIdentical = boolean;

export type LibUtilityIsFileIdenticalComparisonResult = string;

/**
 * Lib - Utility - Is Ignored File.
 *
 * @since 0.11.0
 */
export type LibUtilityIsIgnoredFileFilename = string;

export type LibUtilityIsIgnoredFileIgnoreFiles = string[];

export type LibUtilityIsIgnoredFileReturns = boolean;

export type LibUtilityIsIgnoredFileNormalizedFilename = string;

export type LibUtilityIsIgnoredFileStrippedPattern = string;

export type LibUtilityIsIgnoredFileNormalizedPattern = string;

export type LibUtilityIsIgnoredFileSuffix = string;

/**
 * Lib - Utility - Is Plain Object.
 *
 * @since 0.13.0
 */
export type LibUtilityIsPlainObjectValue = unknown;

export type LibUtilityIsPlainObjectTypeGuard = Record<string, unknown>;

export type LibUtilityIsPlainObjectPrototype = object | null;

/**
 * Lib - Utility - Is Project Root.
 *
 * @since 0.13.0
 */
export type LibUtilityIsProjectRootCurrentDirectory = string;

export type LibUtilityIsProjectRootReturns = Promise<boolean>;

export type LibUtilityIsProjectRootLocations = string[];

export type LibUtilityIsProjectRootLessThanOneMessage = string;

export type LibUtilityIsProjectRootGreaterThanOneMessage = string;

export type LibUtilityIsProjectRootNotProjectRootDirectoryMessage = string;

/**
 * Lib - Utility - Load Workspace Manifests.
 *
 * @since 0.13.0
 */
export type LibUtilityLoadWorkspaceManifestsOptionsProjectRoot = string;

export type LibUtilityLoadWorkspaceManifestsOptionsWorkspaces = [string, SharedNovaConfigWorkspace][];

export type LibUtilityLoadWorkspaceManifestsOptions = {
  projectRoot: LibUtilityLoadWorkspaceManifestsOptionsProjectRoot;
  workspaces: LibUtilityLoadWorkspaceManifestsOptionsWorkspaces;
};

export type LibUtilityLoadWorkspaceManifestsReturns = Promise<LibUtilityLoadWorkspaceManifestsPackageJsons>;

export type LibUtilityLoadWorkspaceManifestsProjectRoot = string;

export type LibUtilityLoadWorkspaceManifestsWorkspaces = [string, SharedNovaConfigWorkspace][];

export type LibUtilityLoadWorkspaceManifestsPackageJsons = SharedWorkspaceManifest[];

export type LibUtilityLoadWorkspaceManifestsRelativeWorkspacePath = string;

export type LibUtilityLoadWorkspaceManifestsWorkspaceManifest = SharedNovaConfigWorkspace;

export type LibUtilityLoadWorkspaceManifestsAbsoluteWorkspacePath = string;

export type LibUtilityLoadWorkspaceManifestsAbsolutePackageJsonPath = string;

export type LibUtilityLoadWorkspaceManifestsRawFile = string;

export type LibUtilityLoadWorkspaceManifestsParsedFile = SharedWorkspaceManifestFileContents;

export type LibUtilityLoadWorkspaceManifestsLoadErrorMessage = string;

/**
 * Lib - Utility - Parse Linux OS Release File.
 *
 * @since 0.13.0
 */
export type LibUtilityParseLinuxOsReleaseFileReturns = Promise<LibUtilityParseLinuxOsReleaseFileOsReleaseEntries>;

export type LibUtilityParseLinuxOsReleaseFileOsReleaseEntries = SharedLinuxOsReleaseEntries;

export type LibUtilityParseLinuxOsReleaseFileQuery = SharedShellOutput;

/**
 * Lib - Utility - Parse Linux OS Release Text.
 *
 * @since 0.13.0
 */
export type LibUtilityParseLinuxOsReleaseTextText = string;

export type LibUtilityParseLinuxOsReleaseTextReturns = SharedLinuxOsReleaseEntries;

export type LibUtilityParseLinuxOsReleaseTextLines = string[];

export type LibUtilityParseLinuxOsReleaseTextOsReleaseEntries = SharedLinuxOsReleaseEntries;

export type LibUtilityParseLinuxOsReleaseTextParts = string[];

export type LibUtilityParseLinuxOsReleaseTextKey = string | undefined;

export type LibUtilityParseLinuxOsReleaseTextRest = string[];

export type LibUtilityParseLinuxOsReleaseTextValue = string;

/**
 * Lib - Utility - Parse Windows Registry Query.
 *
 * @since 0.13.0
 */
export type LibUtilityParseWindowsRegistryQueryRegistryPaths = string | string[];

export type LibUtilityParseWindowsRegistryQueryReturns = Promise<LibUtilityParseWindowsRegistryQueryRegistryKeys>;

export type LibUtilityParseWindowsRegistryQueryPaths = string[];

export type LibUtilityParseWindowsRegistryQueryQuery = SharedShellOutput;

export type LibUtilityParseWindowsRegistryQueryRegistryKeys = SharedWindowsRegistryKeys;

/**
 * Lib - Utility - Parse Windows Registry Text.
 *
 * @since 0.13.0
 */
export type LibUtilityParseWindowsRegistryTextText = string;

export type LibUtilityParseWindowsRegistryTextReturns = SharedWindowsRegistryKeys;

export type LibUtilityParseWindowsRegistryTextLines = string[];

export type LibUtilityParseWindowsRegistryTextRegistryKeys = SharedWindowsRegistryKeys;

export type LibUtilityParseWindowsRegistryTextMatches = RegExpMatchArray | null;

export type LibUtilityParseWindowsRegistryTextRegistryKey = string | undefined;

export type LibUtilityParseWindowsRegistryTextRegistryKeyType = string | undefined;

export type LibUtilityParseWindowsRegistryTextRegistryKeyData = string | undefined;

/**
 * Lib - Utility - Path Exists.
 *
 * @since 0.11.0
 */
export type LibUtilityPathExistsPath = string;

export type LibUtilityPathExistsReturns = Promise<boolean>;

/**
 * Lib - Utility - Rename File With Date.
 *
 * @since 0.13.0
 */
export type LibUtilityRenameFileWithDateOldPath = string;

export type LibUtilityRenameFileWithDateReturns = Promise<boolean>;

export type LibUtilityRenameFileWithDateDirectory = string;

export type LibUtilityRenameFileWithDateParsed = ParsedPath;

export type LibUtilityRenameFileWithDatePrefix = string;

export type LibUtilityRenameFileWithDateSuffix = string;

export type LibUtilityRenameFileWithDateNow = Date;

export type LibUtilityRenameFileWithDateTimestamp = string;

export type LibUtilityRenameFileWithDateCounter = number;

export type LibUtilityRenameFileWithDateCounterLabel = string;

export type LibUtilityRenameFileWithDateNewFileName = string;

export type LibUtilityRenameFileWithDateNewPath = string;

/**
 * Lib - Utility - Resolve Template Path.
 *
 * @since 0.11.0
 */
export type LibUtilityResolveTemplatePathImportMetaUrl = string;

export type LibUtilityResolveTemplatePathSubpath = string;

export type LibUtilityResolveTemplatePathReturns = string;

export type LibUtilityResolveTemplatePathFilePath = string;

export type LibUtilityResolveTemplatePathCurrentDirectory = string;

/**
 * Lib - Utility - Save Generated File.
 *
 * @since 0.11.0
 */
export type LibUtilitySaveGeneratedFileTargetPath = string;

export type LibUtilitySaveGeneratedFileContents = string;

export type LibUtilitySaveGeneratedFileReplaceFile = boolean;

export type LibUtilitySaveGeneratedFileReturns = Promise<void>;

export type LibUtilitySaveGeneratedFileParentDirectory = string;

export type LibUtilitySaveGeneratedFileCurrentDirectory = string;

export type LibUtilitySaveGeneratedFileDisplayName = string;

/**
 * Lib - Utility - Save Workspace Manifest.
 *
 * @since 0.13.0
 */
export type LibUtilitySaveWorkspaceManifestWorkspace = SharedWorkspaceManifest;

export type LibUtilitySaveWorkspaceManifestReplaceFile = boolean;

export type LibUtilitySaveWorkspaceManifestReturns = Promise<void>;

export type LibUtilitySaveWorkspaceManifestPackageJson = string;

export type LibUtilitySaveWorkspaceManifestPackageContents = string;
