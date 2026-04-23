import type { Stats } from 'node:fs';

import type {
  SharedLinuxOsReleaseEntries,
  SharedShellOutput,
  SharedWindowsRegistryKey,
  SharedWindowsRegistryKeys,
  SharedWorkspaceManifest,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Utility - Build Generated File Header.
 *
 * @since 0.16.3
 */
export type TestsLibUtilityBuildGeneratedFileHeaderResult = string;

export type TestsLibUtilityBuildGeneratedFileHeaderThrew = boolean;

/**
 * Tests - Lib - Utility - Current Timestamp.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityCurrentTimestampResult = string;

export type TestsLibUtilityCurrentTimestampStartsWithBracket = boolean;

export type TestsLibUtilityCurrentTimestampEndsWithBracket = boolean;

export type TestsLibUtilityCurrentTimestampPattern = RegExp;

export type TestsLibUtilityCurrentTimestampResults = Set<string>;

export type TestsLibUtilityCurrentTimestampTimestamp = string;

/**
 * Tests - Lib - Utility - Detect Shell.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityDetectShellResult = string;

export type TestsLibUtilityDetectShellKnownShells = string[];

export type TestsLibUtilityDetectShellIsKnownShell = boolean;

/**
 * Tests - Lib - Utility - Discover Paths With File.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityDiscoverPathsWithFileOriginalCwd = string;

export type TestsLibUtilityDiscoverPathsWithFileTemporaryDirectory = string;

export type TestsLibUtilityDiscoverPathsWithFileSandboxPrefix = string;

export type TestsLibUtilityDiscoverPathsWithFileSandboxRoot = string;

export type TestsLibUtilityDiscoverPathsWithFileProjectRoot = string;

export type TestsLibUtilityDiscoverPathsWithFileAppRoot = string;

export type TestsLibUtilityDiscoverPathsWithFilePackageRoot = string;

export type TestsLibUtilityDiscoverPathsWithFileNodeRoot = string;

export type TestsLibUtilityDiscoverPathsWithFileDotHiddenRoot = string;

export type TestsLibUtilityDiscoverPathsWithFileProjectPackage = string;

export type TestsLibUtilityDiscoverPathsWithFileAppPackage = string;

export type TestsLibUtilityDiscoverPathsWithFilePackagePackage = string;

export type TestsLibUtilityDiscoverPathsWithFileNodePackage = string;

export type TestsLibUtilityDiscoverPathsWithFileDotHiddenPackage = string;

export type TestsLibUtilityDiscoverPathsWithFileRealProjectRoot = string;

export type TestsLibUtilityDiscoverPathsWithFileAbsolutePaths = string[];

export type TestsLibUtilityDiscoverPathsWithFileRelativePaths = string[];

export type TestsLibUtilityDiscoverPathsWithFileAppStuffRoot = string;

export type TestsLibUtilityDiscoverPathsWithFileRealAppStuffRoot = string;

/**
 * Tests - Lib - Utility - Execute Shell.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityExecuteShellResult = SharedShellOutput;

export type TestsLibUtilityExecuteShellIncludesHello = boolean;

/**
 * Tests - Lib - Utility - Is Command Exists.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityIsCommandExistsResult = boolean;

/**
 * Tests - Lib - Utility - Is Execute Shell Error.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityIsExecuteShellErrorResult = boolean;

export type TestsLibUtilityIsExecuteShellErrorError = Record<string, unknown>;

/**
 * Tests - Lib - Utility - Is File Identical.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityIsFileIdenticalTemporaryDirectory = string;

export type TestsLibUtilityIsFileIdenticalSandboxPrefix = string;

export type TestsLibUtilityIsFileIdenticalSandboxRoot = string;

export type TestsLibUtilityIsFileIdenticalFilePath = string;

export type TestsLibUtilityIsFileIdenticalResult = boolean;

export type TestsLibUtilityIsFileIdenticalContents = Record<string, unknown>;

export type TestsLibUtilityIsFileIdenticalContentsJson = string;

export type TestsLibUtilityIsFileIdenticalExistingContents = Record<string, unknown>;

export type TestsLibUtilityIsFileIdenticalProposedContents = Record<string, unknown>;

export type TestsLibUtilityIsFileIdenticalExistingJson = string;

/**
 * Tests - Lib - Utility - Is Plain Object.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityIsPlainObjectResult = boolean;

export type TestsLibUtilityIsPlainObjectPlainObject = Record<string, unknown>;

export type TestsLibUtilityIsPlainObjectNullPrototypeObject = Record<string, unknown>;

/**
 * Tests - Lib - Utility - Is Project Root.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityIsProjectRootOriginalCwd = string;

export type TestsLibUtilityIsProjectRootTemporaryDirectory = string;

export type TestsLibUtilityIsProjectRootSandboxPrefix = string;

export type TestsLibUtilityIsProjectRootSandboxRoot = string;

export type TestsLibUtilityIsProjectRootProjectRoot = string;

export type TestsLibUtilityIsProjectRootPackageJsonPath = string;

export type TestsLibUtilityIsProjectRootRealProjectRoot = string;

export type TestsLibUtilityIsProjectRootResult = boolean;

export type TestsLibUtilityIsProjectRootEmptyDirectory = string;

export type TestsLibUtilityIsProjectRootRealEmptyDirectory = string;

export type TestsLibUtilityIsProjectRootAppRoot = string;

export type TestsLibUtilityIsProjectRootProjectPackage = string;

export type TestsLibUtilityIsProjectRootAppPackage = string;

export type TestsLibUtilityIsProjectRootRealAppRoot = string;

/**
 * Tests - Lib - Utility - Load Workspace Manifests.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityLoadWorkspaceManifestsTemporaryDirectory = string;

export type TestsLibUtilityLoadWorkspaceManifestsSandboxPrefix = string;

export type TestsLibUtilityLoadWorkspaceManifestsSandboxRoot = string;

export type TestsLibUtilityLoadWorkspaceManifestsProjectRoot = string;

export type TestsLibUtilityLoadWorkspaceManifestsPackageDirectory = string;

export type TestsLibUtilityLoadWorkspaceManifestsRootPackageJson = string;

export type TestsLibUtilityLoadWorkspaceManifestsCorePackageJson = string;

export type TestsLibUtilityLoadWorkspaceManifestsRootPackagePath = string;

export type TestsLibUtilityLoadWorkspaceManifestsCorePackagePath = string;

export type TestsLibUtilityLoadWorkspaceManifestsResult = SharedWorkspaceManifest[];

export type TestsLibUtilityLoadWorkspaceManifestsFirstWorkspace = SharedWorkspaceManifest | undefined;

export type TestsLibUtilityLoadWorkspaceManifestsSecondWorkspace = SharedWorkspaceManifest | undefined;

export type TestsLibUtilityLoadWorkspaceManifestsOnlyWorkspace = SharedWorkspaceManifest | undefined;

/**
 * Tests - Lib - Utility - Parse Linux OS Release Text.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityParseLinuxOsReleaseTextText = string;

export type TestsLibUtilityParseLinuxOsReleaseTextResult = SharedLinuxOsReleaseEntries;

export type TestsLibUtilityParseLinuxOsReleaseTextResultKeys = string[];

/**
 * Tests - Lib - Utility - Parse Windows Registry Text.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityParseWindowsRegistryTextText = string;

export type TestsLibUtilityParseWindowsRegistryTextResult = SharedWindowsRegistryKeys;

export type TestsLibUtilityParseWindowsRegistryTextProductName = SharedWindowsRegistryKey | undefined;

export type TestsLibUtilityParseWindowsRegistryTextCurrentMajorVersionNumber = SharedWindowsRegistryKey | undefined;

export type TestsLibUtilityParseWindowsRegistryTextResultKeys = string[];

export type TestsLibUtilityParseWindowsRegistryTextCurrentBuild = SharedWindowsRegistryKey | undefined;

/**
 * Tests - Lib - Utility - Path Exists.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityPathExistsTemporaryDirectory = string;

export type TestsLibUtilityPathExistsTemporaryPrefix = string;

export type TestsLibUtilityPathExistsSandboxDirectory = string;

export type TestsLibUtilityPathExistsTemporaryFile = string;

export type TestsLibUtilityPathExistsResult = boolean;

export type TestsLibUtilityPathExistsNonExistentPath = string;

/**
 * Tests - Lib - Utility - Rename File With Date.
 *
 * @since 0.12.0
 */
export type TestsLibUtilityRenameFileWithDateTemporaryDirectory = string;

export type TestsLibUtilityRenameFileWithDateSandboxPrefix = string;

export type TestsLibUtilityRenameFileWithDateSandboxRoot = string;

export type TestsLibUtilityRenameFileWithDateFilePath = string;

export type TestsLibUtilityRenameFileWithDateResult = boolean;

export type TestsLibUtilityRenameFileWithDateOriginalExists = boolean;

export type TestsLibUtilityRenameFileWithDateFiles = string[];

export type TestsLibUtilityRenameFileWithDateRenamedFile = string | undefined;

export type TestsLibUtilityRenameFileWithDateMatchesBackupPattern = boolean;

export type TestsLibUtilityRenameFileWithDateSubDirectory = string;

export type TestsLibUtilityRenameFileWithDateNow = Date;

export type TestsLibUtilityRenameFileWithDateTimestamp = string;

export type TestsLibUtilityRenameFileWithDateExistingName = string;

export type TestsLibUtilityRenameFileWithDateExistingFilePath = string;

export type TestsLibUtilityRenameFileWithDateSecondFile = string | undefined;

/**
 * Tests - Lib - Utility - SaveGeneratedFile (with Header).
 *
 * @since 0.16.3
 */
export type TestsLibUtilitySaveGeneratedFileWithHeaderOriginalCwd = string;

export type TestsLibUtilitySaveGeneratedFileWithHeaderSandboxRoot = string;

export type TestsLibUtilitySaveGeneratedFileWithHeaderProjectDirectory = string;

export type TestsLibUtilitySaveGeneratedFileWithHeaderTargetPath = string;

export type TestsLibUtilitySaveGeneratedFileWithHeaderWritten = string;

export type TestsLibUtilitySaveGeneratedFileWithHeaderExpectedHeader = string;

export type TestsLibUtilitySaveGeneratedFileWithHeaderHeaderOptionsCommand = string;

export type TestsLibUtilitySaveGeneratedFileWithHeaderHeaderOptionsDocsSlug = string;

export type TestsLibUtilitySaveGeneratedFileWithHeaderHeaderOptionsMode = 'strict' | 'fillable';

export type TestsLibUtilitySaveGeneratedFileWithHeaderHeaderOptions = {
  command: TestsLibUtilitySaveGeneratedFileWithHeaderHeaderOptionsCommand;
  docsSlug: TestsLibUtilitySaveGeneratedFileWithHeaderHeaderOptionsDocsSlug;
  mode: TestsLibUtilitySaveGeneratedFileWithHeaderHeaderOptionsMode;
};

export type TestsLibUtilitySaveGeneratedFileWithHeaderFirstWrite = Stats;

export type TestsLibUtilitySaveGeneratedFileWithHeaderSecondWrite = Stats;

/**
 * Tests - Lib - Utility - Save Workspace Manifest.
 *
 * @since 0.12.0
 */
export type TestsLibUtilitySaveWorkspaceManifestTemporaryDirectory = string;

export type TestsLibUtilitySaveWorkspaceManifestSandboxPrefix = string;

export type TestsLibUtilitySaveWorkspaceManifestSandboxRoot = string;

export type TestsLibUtilitySaveWorkspaceManifestFilePath = string;

export type TestsLibUtilitySaveWorkspaceManifestFileDirectory = string;

export type TestsLibUtilitySaveWorkspaceManifestOriginal = Record<string, unknown>;

export type TestsLibUtilitySaveWorkspaceManifestOriginalJson = string;

export type TestsLibUtilitySaveWorkspaceManifestModified = Record<string, unknown>;

export type TestsLibUtilitySaveWorkspaceManifestWrittenRaw = string;

export type TestsLibUtilitySaveWorkspaceManifestWritten = Record<string, unknown>;

export type TestsLibUtilitySaveWorkspaceManifestContents = Record<string, unknown>;

export type TestsLibUtilitySaveWorkspaceManifestContentsJson = string;

export type TestsLibUtilitySaveWorkspaceManifestStatBefore = Stats;

export type TestsLibUtilitySaveWorkspaceManifestStatAfter = Stats;

export type TestsLibUtilitySaveWorkspaceManifestSubDirectory = string;

export type TestsLibUtilitySaveWorkspaceManifestFiles = string[];

export type TestsLibUtilitySaveWorkspaceManifestBackupFile = string | undefined;
