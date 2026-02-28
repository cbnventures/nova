import type { ExecException } from 'child_process';

import type {
  LinuxOsReleaseEntries,
  NovaConfigWorkspace,
  WindowsRegistryKeys,
  WorkspaceManifest,
  WorkspaceManifestFileContents,
} from '@/types/shared.d.ts';

/**
 * Current timestamp.
 *
 * @since 1.0.0
 */
export type CurrentTimestampReturns = string;

/**
 * Current timestamp - Pad left.
 *
 * @since 1.0.0
 */
export type CurrentTimestampPadLeftNumber = number;

export type CurrentTimestampPadLeftWidth = number;

export type CurrentTimestampPadLeftReturns = string;

/**
 * Detect shell.
 *
 * @since 1.0.0
 */
export type DetectShellReturns =
  'cmd.exe'
  | '/bin/bash'
  | '/bin/ksh'
  | '/bin/sh'
  | '/bin/zsh';

/**
 * Discover paths with file.
 *
 * @since 1.0.0
 */
export type DiscoverPathsWithFileFileName = string;

export type DiscoverPathsWithFileDirection = 'backward' | 'forward';

export type DiscoverPathsWithFileReturns = Promise<string[]>;

export type DiscoverPathsWithFileResults = string[];

export type DiscoverPathsWithFileVisited = Set<string>;

export type DiscoverPathsWithFileSkipDirectories = Set<string>;

export type DiscoverPathsWithFileRealDirectory = string;

/**
 * Execute shell.
 *
 * @since 1.0.0
 */
export type ExecuteShellCommand = string;

export type ExecuteShellReturnsOut = string;

export type ExecuteShellReturnsError = string;

export type ExecuteShellReturnsCode = number;

export type ExecuteShellReturns = Promise<{
  textOut: ExecuteShellReturnsOut;
  textError: ExecuteShellReturnsError;
  code: ExecuteShellReturnsCode;
}>;

export type ExecuteShellQuotePosixString = string;

export type ExecuteShellQuoteWindowsString = string;

/**
 * Is command exists.
 *
 * @since 1.0.0
 */
export type IsCommandExistsCommand = string;

export type IsCommandExistsReturns = Promise<boolean>;

/**
 * Is execute shell error.
 *
 * @since 1.0.0
 */
export type IsExecuteShellErrorError = unknown;

export type IsExecuteShellErrorTypeGuard = ExecException;

export type IsExecuteShellErrorObject = Record<string, unknown>;

/**
 * Is file identical.
 *
 * @since 1.0.0
 */
export type IsFileIdenticalExistingFilePath = string;

export type IsFileIdenticalProposedContents = unknown;

export type IsFileIdenticalReturns = Promise<boolean>;

/**
 * Is plain object.
 *
 * @since 1.0.0
 */
export type IsPlainObjectValue = unknown;

export type IsPlainObjectTypeGuard = Record<string, unknown>;

/**
 * Is project root.
 *
 * @since 1.0.0
 */
export type IsProjectRootCurrentDirectory = string;

export type IsProjectRootReturns = Promise<boolean>;

/**
 * Load workspace manifests.
 *
 * @since 1.0.0
 */
export type LoadWorkspaceManifestsOptionsProjectRoot = string;

export type LoadWorkspaceManifestsOptionsWorkspaces = [string, NovaConfigWorkspace][];

export type LoadWorkspaceManifestsOptions = {
  projectRoot: LoadWorkspaceManifestsOptionsProjectRoot;
  workspaces: LoadWorkspaceManifestsOptionsWorkspaces;
};

export type LoadWorkspaceManifestsReturns = Promise<LoadWorkspaceManifestsPackageJsons>;

export type LoadWorkspaceManifestsPackageJsons = WorkspaceManifest[];

export type LoadWorkspaceManifestsParsedFile = WorkspaceManifestFileContents;

/**
 * Parse linux os release file.
 *
 * @since 1.0.0
 */
export type ParseLinuxOsReleaseFileReturns = Promise<ParseLinuxOsReleaseFileOsReleaseEntries>;

export type ParseLinuxOsReleaseFileOsReleaseEntries = LinuxOsReleaseEntries;

/**
 * Parse linux os release text.
 *
 * @since 1.0.0
 */
export type ParseLinuxOsReleaseTextText = string;

export type ParseLinuxOsReleaseTextReturns = LinuxOsReleaseEntries;

/**
 * Parse windows registry query.
 *
 * @since 1.0.0
 */
export type ParseWindowsRegistryQueryRegistryPaths = string | string[];

export type ParseWindowsRegistryQueryReturns = Promise<ParseWindowsRegistryQueryRegistryKeys>;

export type ParseWindowsRegistryQueryRegistryKeys = WindowsRegistryKeys;

/**
 * Parse windows registry text.
 *
 * @since 1.0.0
 */
export type ParseWindowsRegistryTextText = string;

export type ParseWindowsRegistryTextReturns = WindowsRegistryKeys;

export type ParseWindowsRegistryTextRegistryKeyType = string;

/**
 * Path exists.
 *
 * @since 1.0.0
 */
export type PathExistsPath = string;

export type PathExistsReturns = Promise<boolean>;

/**
 * Rename file with date.
 *
 * @since 1.0.0
 */
export type RenameFileWithDateOldPath = string;

export type RenameFileWithDatePrefix = string;

export type RenameFileWithDateSuffix = string;

export type RenameFileWithDateReturns = Promise<boolean>;

/**
 * Save workspace manifest.
 *
 * @since 1.0.0
 */
export type SaveWorkspaceManifestWorkspace = WorkspaceManifest;

export type SaveWorkspaceManifestReplaceFile = boolean;

export type SaveWorkspaceManifestReturns = Promise<void>;
