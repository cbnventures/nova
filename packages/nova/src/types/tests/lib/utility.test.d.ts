import type { Stats } from 'node:fs';

import type {
  Shared_LinuxOsReleaseEntries,
  Shared_ShellOutput,
  Shared_WindowsRegistryKey,
  Shared_WindowsRegistryKeys,
  Shared_WorkspaceManifest,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Utility - Build Generated File Header.
 *
 * @since 0.16.3
 */
export type Tests_Lib_Utility_BuildGeneratedFileHeader_Result = string;

export type Tests_Lib_Utility_BuildGeneratedFileHeader_Threw = boolean;

/**
 * Tests - Lib - Utility - Compare Semver.
 *
 * @since 0.18.0
 */

/**
 * Tests - Lib - Utility - Current Timestamp.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_CurrentTimestamp_Result = string;

export type Tests_Lib_Utility_CurrentTimestamp_StartsWithBracket = boolean;

export type Tests_Lib_Utility_CurrentTimestamp_EndsWithBracket = boolean;

export type Tests_Lib_Utility_CurrentTimestamp_Pattern = RegExp;

export type Tests_Lib_Utility_CurrentTimestamp_Results = Set<string>;

export type Tests_Lib_Utility_CurrentTimestamp_Timestamp = string;

/**
 * Tests - Lib - Utility - Detect Shell.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_DetectShell_Result = string;

export type Tests_Lib_Utility_DetectShell_KnownShells = string[];

export type Tests_Lib_Utility_DetectShell_IsKnownShell = boolean;

/**
 * Tests - Lib - Utility - Discover Paths With File.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_DiscoverPathsWithFile_OriginalCwd = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_TemporaryDirectory = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_SandboxPrefix = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_SandboxRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_ProjectRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_AppRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_PackageRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_NodeRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_DotHiddenRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_ProjectPackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_AppPackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_PackagePackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_NodePackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_DotHiddenPackage = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_RealProjectRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_AbsolutePaths = string[];

export type Tests_Lib_Utility_DiscoverPathsWithFile_RelativePaths = string[];

export type Tests_Lib_Utility_DiscoverPathsWithFile_AppStuffRoot = string;

export type Tests_Lib_Utility_DiscoverPathsWithFile_RealAppStuffRoot = string;

/**
 * Tests - Lib - Utility - Execute Shell.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ExecuteShell_Result = Shared_ShellOutput;

export type Tests_Lib_Utility_ExecuteShell_IncludesHello = boolean;

/**
 * Tests - Lib - Utility - Is Command Exists.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsCommandExists_Result = boolean;

/**
 * Tests - Lib - Utility - Is Execute Shell Error.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsExecuteShellError_Result = boolean;

export type Tests_Lib_Utility_IsExecuteShellError_Error = Record<string, unknown>;

/**
 * Tests - Lib - Utility - Is File Identical.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsFileIdentical_TemporaryDirectory = string;

export type Tests_Lib_Utility_IsFileIdentical_SandboxPrefix = string;

export type Tests_Lib_Utility_IsFileIdentical_SandboxRoot = string;

export type Tests_Lib_Utility_IsFileIdentical_FilePath = string;

export type Tests_Lib_Utility_IsFileIdentical_Result = boolean;

export type Tests_Lib_Utility_IsFileIdentical_Contents = Record<string, unknown>;

export type Tests_Lib_Utility_IsFileIdentical_ContentsJson = string;

export type Tests_Lib_Utility_IsFileIdentical_ExistingContents = Record<string, unknown>;

export type Tests_Lib_Utility_IsFileIdentical_ProposedContents = Record<string, unknown>;

export type Tests_Lib_Utility_IsFileIdentical_ExistingJson = string;

/**
 * Tests - Lib - Utility - Is Plain Object.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsPlainObject_Result = boolean;

export type Tests_Lib_Utility_IsPlainObject_PlainObject = Record<string, unknown>;

export type Tests_Lib_Utility_IsPlainObject_NullPrototypeObject = Record<string, unknown>;

/**
 * Tests - Lib - Utility - Is Project Root.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_IsProjectRoot_OriginalCwd = string;

export type Tests_Lib_Utility_IsProjectRoot_TemporaryDirectory = string;

export type Tests_Lib_Utility_IsProjectRoot_SandboxPrefix = string;

export type Tests_Lib_Utility_IsProjectRoot_SandboxRoot = string;

export type Tests_Lib_Utility_IsProjectRoot_ProjectRoot = string;

export type Tests_Lib_Utility_IsProjectRoot_PackageJsonPath = string;

export type Tests_Lib_Utility_IsProjectRoot_RealProjectRoot = string;

export type Tests_Lib_Utility_IsProjectRoot_Result = boolean;

export type Tests_Lib_Utility_IsProjectRoot_EmptyDirectory = string;

export type Tests_Lib_Utility_IsProjectRoot_RealEmptyDirectory = string;

export type Tests_Lib_Utility_IsProjectRoot_AppRoot = string;

export type Tests_Lib_Utility_IsProjectRoot_ProjectPackage = string;

export type Tests_Lib_Utility_IsProjectRoot_AppPackage = string;

export type Tests_Lib_Utility_IsProjectRoot_RealAppRoot = string;

/**
 * Tests - Lib - Utility - Load Workspace Manifests.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_LoadWorkspaceManifests_TemporaryDirectory = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SandboxPrefix = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SandboxRoot = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_ProjectRoot = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_PackageDirectory = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_RootPackageJson = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_CorePackageJson = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_RootPackagePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_CorePackagePath = string;

export type Tests_Lib_Utility_LoadWorkspaceManifests_Result = Shared_WorkspaceManifest[];

export type Tests_Lib_Utility_LoadWorkspaceManifests_FirstWorkspace = Shared_WorkspaceManifest | undefined;

export type Tests_Lib_Utility_LoadWorkspaceManifests_SecondWorkspace = Shared_WorkspaceManifest | undefined;

export type Tests_Lib_Utility_LoadWorkspaceManifests_OnlyWorkspace = Shared_WorkspaceManifest | undefined;

/**
 * Tests - Lib - Utility - Normalize Route Segment.
 *
 * @since 0.17.1
 */
export type Tests_Lib_Utility_NormalizeRouteSegment_Case_Input = string;

export type Tests_Lib_Utility_NormalizeRouteSegment_Case_Expected = string;

export type Tests_Lib_Utility_NormalizeRouteSegment_Case_Description = string;

export type Tests_Lib_Utility_NormalizeRouteSegment_Case = {
  input: Tests_Lib_Utility_NormalizeRouteSegment_Case_Input;
  expected: Tests_Lib_Utility_NormalizeRouteSegment_Case_Expected;
  description: Tests_Lib_Utility_NormalizeRouteSegment_Case_Description;
};

export type Tests_Lib_Utility_NormalizeRouteSegment_Cases = ReadonlyArray<Tests_Lib_Utility_NormalizeRouteSegment_Case>;

export type Tests_Lib_Utility_NormalizeRouteSegment_Result = string;

/**
 * Tests - Lib - Utility - Parse Linux OS Release Text.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseLinuxOsReleaseText_Text = string;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_Result = Shared_LinuxOsReleaseEntries;

export type Tests_Lib_Utility_ParseLinuxOsReleaseText_ResultKeys = string[];

/**
 * Tests - Lib - Utility - Parse Windows Registry Text.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_ParseWindowsRegistryText_Text = string;

export type Tests_Lib_Utility_ParseWindowsRegistryText_Result = Shared_WindowsRegistryKeys;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ProductName = Shared_WindowsRegistryKey | undefined;

export type Tests_Lib_Utility_ParseWindowsRegistryText_CurrentMajorVersionNumber = Shared_WindowsRegistryKey | undefined;

export type Tests_Lib_Utility_ParseWindowsRegistryText_ResultKeys = string[];

export type Tests_Lib_Utility_ParseWindowsRegistryText_CurrentBuild = Shared_WindowsRegistryKey | undefined;

/**
 * Tests - Lib - Utility - Path Exists.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_PathExists_TemporaryDirectory = string;

export type Tests_Lib_Utility_PathExists_TemporaryPrefix = string;

export type Tests_Lib_Utility_PathExists_SandboxDirectory = string;

export type Tests_Lib_Utility_PathExists_TemporaryFile = string;

export type Tests_Lib_Utility_PathExists_Result = boolean;

export type Tests_Lib_Utility_PathExists_NonExistentPath = string;

/**
 * Tests - Lib - Utility - Rename File With Date.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_RenameFileWithDate_TemporaryDirectory = string;

export type Tests_Lib_Utility_RenameFileWithDate_SandboxPrefix = string;

export type Tests_Lib_Utility_RenameFileWithDate_SandboxRoot = string;

export type Tests_Lib_Utility_RenameFileWithDate_FilePath = string;

export type Tests_Lib_Utility_RenameFileWithDate_Result = boolean;

export type Tests_Lib_Utility_RenameFileWithDate_OriginalExists = boolean;

export type Tests_Lib_Utility_RenameFileWithDate_Files = string[];

export type Tests_Lib_Utility_RenameFileWithDate_RenamedFile = string | undefined;

export type Tests_Lib_Utility_RenameFileWithDate_MatchesBackupPattern = boolean;

export type Tests_Lib_Utility_RenameFileWithDate_SubDirectory = string;

export type Tests_Lib_Utility_RenameFileWithDate_Now = Date;

export type Tests_Lib_Utility_RenameFileWithDate_Timestamp = string;

export type Tests_Lib_Utility_RenameFileWithDate_ExistingName = string;

export type Tests_Lib_Utility_RenameFileWithDate_ExistingFilePath = string;

export type Tests_Lib_Utility_RenameFileWithDate_SecondFile = string | undefined;

/**
 * Tests - Lib - Utility - SaveGeneratedFile (with Header).
 *
 * @since 0.16.3
 */
export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_OriginalCwd = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SandboxRoot = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_ProjectDirectory = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_TargetPath = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_Written = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_ExpectedHeader = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_HeaderOptions_Command = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_HeaderOptions_DocsSlug = string;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_HeaderOptions_Mode = 'strict' | 'fillable';

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_HeaderOptions = {
  command: Tests_Lib_Utility_SaveGeneratedFileWithHeader_HeaderOptions_Command;
  docsSlug: Tests_Lib_Utility_SaveGeneratedFileWithHeader_HeaderOptions_DocsSlug;
  mode: Tests_Lib_Utility_SaveGeneratedFileWithHeader_HeaderOptions_Mode;
};

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_FirstWrite = Stats;

export type Tests_Lib_Utility_SaveGeneratedFileWithHeader_SecondWrite = Stats;

/**
 * Tests - Lib - Utility - Save Workspace Manifest.
 *
 * @since 0.12.0
 */
export type Tests_Lib_Utility_SaveWorkspaceManifest_TemporaryDirectory = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SandboxPrefix = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SandboxRoot = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_FilePath = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_FileDirectory = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_Original = Record<string, unknown>;

export type Tests_Lib_Utility_SaveWorkspaceManifest_OriginalJson = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_Modified = Record<string, unknown>;

export type Tests_Lib_Utility_SaveWorkspaceManifest_WrittenRaw = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_Written = Record<string, unknown>;

export type Tests_Lib_Utility_SaveWorkspaceManifest_Contents = Record<string, unknown>;

export type Tests_Lib_Utility_SaveWorkspaceManifest_ContentsJson = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_StatBefore = Stats;

export type Tests_Lib_Utility_SaveWorkspaceManifest_StatAfter = Stats;

export type Tests_Lib_Utility_SaveWorkspaceManifest_SubDirectory = string;

export type Tests_Lib_Utility_SaveWorkspaceManifest_Files = string[];

export type Tests_Lib_Utility_SaveWorkspaceManifest_BackupFile = string | undefined;

/**
 * Tests - Lib - Utility - Shell Quote.
 *
 * @since 0.18.0
 */
