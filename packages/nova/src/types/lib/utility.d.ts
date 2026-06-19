import type { ChildProcess, ExecException, ExecOptions } from 'child_process';
import type { Dirent } from 'fs';
import type { ParsedPath } from 'path';

import type {
  Shared_LinuxOsReleaseEntries,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigWorkspace,
  Shared_ShellOutput,
  Shared_WindowsRegistryKey,
  Shared_WindowsRegistryKeys,
  Shared_WorkspaceManifest,
} from '../shared.d.ts';

/**
 * Lib - Utility - Build Generated File Header.
 *
 * @since 0.16.3
 */
export type Lib_Utility_BuildGeneratedFileHeader_Options_Command = string;

export type Lib_Utility_BuildGeneratedFileHeader_Options_DocsSlug = string;

export type Lib_Utility_BuildGeneratedFileHeader_Options_TargetPath = string;

export type Lib_Utility_BuildGeneratedFileHeader_Options_Mode = 'strict' | 'fillable';

export type Lib_Utility_BuildGeneratedFileHeader_Options = {
  command: Lib_Utility_BuildGeneratedFileHeader_Options_Command;
  docsSlug: Lib_Utility_BuildGeneratedFileHeader_Options_DocsSlug;
  targetPath: Lib_Utility_BuildGeneratedFileHeader_Options_TargetPath;
  mode: Lib_Utility_BuildGeneratedFileHeader_Options_Mode;
};

export type Lib_Utility_BuildGeneratedFileHeader_Returns = string;

export type Lib_Utility_BuildGeneratedFileHeader_BaseName = string;

export type Lib_Utility_BuildGeneratedFileHeader_Extension = string;

export type Lib_Utility_BuildGeneratedFileHeader_DocsUrl = string;

export type Lib_Utility_BuildGeneratedFileHeader_RuleLine = string;

export type Lib_Utility_BuildGeneratedFileHeader_IsHashStyle = boolean;

export type Lib_Utility_BuildGeneratedFileHeader_IsMarkdownStyle = boolean;

export type Lib_Utility_BuildGeneratedFileHeader_Lines = string[];

export type Lib_Utility_BuildGeneratedFileHeader_MarkdownLines = string[];

/**
 * Lib - Utility - Collect Consumer Workspace Paths.
 *
 * @since 0.18.0
 */
export type Lib_Utility_CollectConsumerWorkspacePaths_CurrentDirectory = string;

export type Lib_Utility_CollectConsumerWorkspacePaths_Workspaces = Shared_NovaConfig_Workspaces | undefined;

export type Lib_Utility_CollectConsumerWorkspacePaths_Filename = string;

export type Lib_Utility_CollectConsumerWorkspacePaths_Returns = string[];

export type Lib_Utility_CollectConsumerWorkspacePaths_Paths = string[];

export type Lib_Utility_CollectConsumerWorkspacePaths_SafeWorkspaces = {
  [key: string]: Shared_NovaConfigWorkspace;
};

export type Lib_Utility_CollectConsumerWorkspacePaths_WorkspacePath = string;

export type Lib_Utility_CollectConsumerWorkspacePaths_Workspace = Shared_NovaConfig_Workspaces[string];

export type Lib_Utility_CollectConsumerWorkspacePaths_Path = string;

/**
 * Lib - Utility - Compare Semver.
 *
 * @since 0.18.0
 */

/**
 * Lib - Utility - Compare Semver - A.
 *
 * @since 0.18.0
 */
export type Lib_Utility_CompareSemver_A = string;

/**
 * Lib - Utility - Compare Semver - B.
 *
 * @since 0.18.0
 */
export type Lib_Utility_CompareSemver_B = string;

/**
 * Lib - Utility - Compare Semver - Returns.
 *
 * @since 0.18.0
 */
export type Lib_Utility_CompareSemver_Returns = number;

/**
 * Lib - Utility - Compare Semver - Parts A.
 *
 * @since 0.18.0
 */
export type Lib_Utility_CompareSemver_PartsA = number[];

/**
 * Lib - Utility - Compare Semver - Parts B.
 *
 * @since 0.18.0
 */
export type Lib_Utility_CompareSemver_PartsB = number[];

/**
 * Lib - Utility - Compare Semver - Length.
 *
 * @since 0.18.0
 */
export type Lib_Utility_CompareSemver_Length = number;

/**
 * Lib - Utility - Compare Semver - Val A.
 *
 * @since 0.18.0
 */
export type Lib_Utility_CompareSemver_ValA = number;

/**
 * Lib - Utility - Compare Semver - Val B.
 *
 * @since 0.18.0
 */
export type Lib_Utility_CompareSemver_ValB = number;

/**
 * Lib - Utility - Current Timestamp.
 *
 * @since 0.11.0
 */
export type Lib_Utility_CurrentTimestamp_Returns = string;

export type Lib_Utility_CurrentTimestamp_Now = Date;

export type Lib_Utility_CurrentTimestamp_Number = number;

export type Lib_Utility_CurrentTimestamp_Width = number;

export type Lib_Utility_CurrentTimestamp_PadLeft_Returns = string;

export type Lib_Utility_CurrentTimestamp_PadLeft = (number: number, width?: number) => Lib_Utility_CurrentTimestamp_PadLeft_Returns;

export type Lib_Utility_CurrentTimestamp_PadLeft_CurrentWidth = number;

export type Lib_Utility_CurrentTimestamp_Year = number;

export type Lib_Utility_CurrentTimestamp_RawMonth = number;

export type Lib_Utility_CurrentTimestamp_Month = string;

export type Lib_Utility_CurrentTimestamp_RawDate = number;

export type Lib_Utility_CurrentTimestamp_Day = string;

export type Lib_Utility_CurrentTimestamp_RawHours = number;

export type Lib_Utility_CurrentTimestamp_Hour = string;

export type Lib_Utility_CurrentTimestamp_RawMinutes = number;

export type Lib_Utility_CurrentTimestamp_Minute = string;

export type Lib_Utility_CurrentTimestamp_RawSeconds = number;

export type Lib_Utility_CurrentTimestamp_Second = string;

export type Lib_Utility_CurrentTimestamp_Millisecond = string;

export type Lib_Utility_CurrentTimestamp_TimezoneOffsetMinutes = number;

export type Lib_Utility_CurrentTimestamp_TimezoneSign = string;

export type Lib_Utility_CurrentTimestamp_TimezoneAbs = number;

export type Lib_Utility_CurrentTimestamp_TimezoneHoursTruncated = number;

export type Lib_Utility_CurrentTimestamp_TimezoneHours = string;

export type Lib_Utility_CurrentTimestamp_TimezoneMinutes = string;

/**
 * Lib - Utility - Detect Shell.
 *
 * @since 0.11.0
 */
export type Lib_Utility_DetectShell_Returns =
  'cmd.exe'
  | '/bin/bash'
  | '/bin/ksh'
  | '/bin/sh'
  | '/bin/zsh';

export type Lib_Utility_DetectShell_CurrentPlatform = NodeJS.Platform;

/**
 * Lib - Utility - Discover Paths With File.
 *
 * @since 0.11.0
 */
export type Lib_Utility_DiscoverPathsWithFile_FileName = string;

export type Lib_Utility_DiscoverPathsWithFile_Direction = 'backward' | 'forward';

export type Lib_Utility_DiscoverPathsWithFile_Returns = Promise<string[]>;

export type Lib_Utility_DiscoverPathsWithFile_StartDirectory = string;

export type Lib_Utility_DiscoverPathsWithFile_Results = string[];

export type Lib_Utility_DiscoverPathsWithFile_RootDirectory = string;

export type Lib_Utility_DiscoverPathsWithFile_CurrentDirectory = string;

export type Lib_Utility_DiscoverPathsWithFile_TargetPath = string;

export type Lib_Utility_DiscoverPathsWithFile_Queue = string[];

export type Lib_Utility_DiscoverPathsWithFile_Visited = Set<string>;

export type Lib_Utility_DiscoverPathsWithFile_SkipDirectories = Set<string>;

export type Lib_Utility_DiscoverPathsWithFile_ForwardDirectory = string | undefined;

export type Lib_Utility_DiscoverPathsWithFile_RealDirectory = string | undefined;

export type Lib_Utility_DiscoverPathsWithFile_Entries = Dirent[] | undefined;

export type Lib_Utility_DiscoverPathsWithFile_HasTargetFile = boolean;

export type Lib_Utility_DiscoverPathsWithFile_NextDirectory = string;

/**
 * Lib - Utility - Execute Shell.
 *
 * @since 0.11.0
 */
export type Lib_Utility_ExecuteShell_Command = string;

export type Lib_Utility_ExecuteShell_Returns = Promise<Shared_ShellOutput>;

export type Lib_Utility_ExecuteShell_ExecAsync = (command: string, options: ExecOptions) => Promise<{
  stdout: string; stderr: string;
}>;

export type Lib_Utility_ExecuteShell_Shell = string;

export type Lib_Utility_ExecuteShell_CommandName = string;

export type Lib_Utility_ExecuteShell_CommandOnPath = boolean;

export type Lib_Utility_ExecuteShell_FullCommand = string;

/**
 * Lib - Utility - Execute Shell - Quote Posix.
 *
 * @since 0.11.0
 */
export type Lib_Utility_ExecuteShell_PosixString = string;

export type Lib_Utility_ExecuteShell_QuotePosix_Returns = string;

export type Lib_Utility_ExecuteShell_QuotePosix = (posixString: Lib_Utility_ExecuteShell_PosixString) => Lib_Utility_ExecuteShell_QuotePosix_Returns;

export type Lib_Utility_ExecuteShell_QuotePosix_Pattern = RegExp;

/**
 * Lib - Utility - Execute Shell - Quote Windows.
 *
 * @since 0.11.0
 */
export type Lib_Utility_ExecuteShell_WindowsString = string;

export type Lib_Utility_ExecuteShell_QuoteWindows_Returns = string;

export type Lib_Utility_ExecuteShell_QuoteWindows = (windowsString: Lib_Utility_ExecuteShell_WindowsString) => Lib_Utility_ExecuteShell_QuoteWindows_Returns;

export type Lib_Utility_ExecuteShell_QuoteWindows_Pattern = RegExp;

export type Lib_Utility_ExecuteShell_ExecResult_Stdout = string;

export type Lib_Utility_ExecuteShell_ExecResult_Stderr = string;

export type Lib_Utility_ExecuteShell_ExecResult = {
  stdout: Lib_Utility_ExecuteShell_ExecResult_Stdout;
  stderr: Lib_Utility_ExecuteShell_ExecResult_Stderr;
};

export type Lib_Utility_ExecuteShell_Stdout = string;

export type Lib_Utility_ExecuteShell_Stderr = string;

export type Lib_Utility_ExecuteShell_Output_TextOut = string;

export type Lib_Utility_ExecuteShell_Output_TextError = string;

export type Lib_Utility_ExecuteShell_Output_Code = number;

export type Lib_Utility_ExecuteShell_Output = {
  textOut: Lib_Utility_ExecuteShell_Output_TextOut;
  textError: Lib_Utility_ExecuteShell_Output_TextError;
  code: Lib_Utility_ExecuteShell_Output_Code;
};

export type Lib_Utility_ExecuteShell_ErrorOutput = Lib_Utility_ExecuteShell_Output;

/**
 * Lib - Utility - Is Command Exists.
 *
 * @since 0.11.0
 */
export type Lib_Utility_IsCommandExists_Command = string;

export type Lib_Utility_IsCommandExists_Returns = Promise<boolean>;

export type Lib_Utility_IsCommandExists_IsWin = boolean;

export type Lib_Utility_IsCommandExists_Bin = string;

export type Lib_Utility_IsCommandExists_CommandArguments = string[];

export type Lib_Utility_IsCommandExists_ChildProcess = ChildProcess;

/**
 * Lib - Utility - Is Command Exists - Error.
 *
 * @since 0.11.0
 */
export type Lib_Utility_IsCommandExists_Error_Returns = void;

/**
 * Lib - Utility - Is Command Exists - Exit.
 *
 * @since 0.11.0
 */
export type Lib_Utility_IsCommandExists_Exit_Returns = void;

/**
 * Lib - Utility - Is Execute Shell Error.
 *
 * @since 0.11.0
 */
export type Lib_Utility_IsExecuteShellError_Error = unknown;

export type Lib_Utility_IsExecuteShellError_TypeGuard = ExecException;

export type Lib_Utility_IsExecuteShellError_Object = Record<string, unknown>;

export type Lib_Utility_IsExecuteShellError_HasCommand = boolean;

export type Lib_Utility_IsExecuteShellError_HasKilled = boolean;

export type Lib_Utility_IsExecuteShellError_HasCode = boolean;

export type Lib_Utility_IsExecuteShellError_HasSignal = boolean;

export type Lib_Utility_IsExecuteShellError_HasStdout = boolean;

export type Lib_Utility_IsExecuteShellError_HasStderr = boolean;

/**
 * Lib - Utility - Is File Identical.
 *
 * @since 0.13.0
 */
export type Lib_Utility_IsFileIdentical_ExistingFilePath = string;

export type Lib_Utility_IsFileIdentical_ProposedContents = unknown;

export type Lib_Utility_IsFileIdentical_Returns = Promise<boolean>;

export type Lib_Utility_IsFileIdentical_OldFileContents = string | undefined;

export type Lib_Utility_IsFileIdentical_NewFileContents = string | undefined;

export type Lib_Utility_IsFileIdentical_Serialized = string | undefined;

export type Lib_Utility_IsFileIdentical_IsIdentical = boolean;

export type Lib_Utility_IsFileIdentical_ComparisonResult = string;

/**
 * Lib - Utility - Is Ignored File.
 *
 * @since 0.11.0
 */
export type Lib_Utility_IsIgnoredFile_Filename = string;

export type Lib_Utility_IsIgnoredFile_IgnoreFiles = string[];

export type Lib_Utility_IsIgnoredFile_Returns = boolean;

export type Lib_Utility_IsIgnoredFile_NormalizedFilename = string;

export type Lib_Utility_IsIgnoredFile_StrippedPattern = string;

export type Lib_Utility_IsIgnoredFile_NormalizedPattern = string;

export type Lib_Utility_IsIgnoredFile_Suffix = string;

/**
 * Lib - Utility - Is Plain Object.
 *
 * @since 0.13.0
 */
export type Lib_Utility_IsPlainObject_Value = unknown;

export type Lib_Utility_IsPlainObject_TypeGuard = Record<string, unknown>;

export type Lib_Utility_IsPlainObject_Prototype = object | null;

/**
 * Lib - Utility - Is Project Root.
 *
 * @since 0.13.0
 */
export type Lib_Utility_IsProjectRoot_CurrentDirectory = string;

export type Lib_Utility_IsProjectRoot_Returns = Promise<boolean>;

export type Lib_Utility_IsProjectRoot_Locations = string[];

export type Lib_Utility_IsProjectRoot_LessThanOneMessage = string;

export type Lib_Utility_IsProjectRoot_GreaterThanOneMessage = string;

export type Lib_Utility_IsProjectRoot_NotProjectRootDirectoryMessage = string;

/**
 * Lib - Utility - Load Workspace Manifests.
 *
 * @since 0.13.0
 */
export type Lib_Utility_LoadWorkspaceManifests_Options_ProjectRoot = string;

export type Lib_Utility_LoadWorkspaceManifests_Options_Workspaces = [string, Shared_NovaConfigWorkspace][];

export type Lib_Utility_LoadWorkspaceManifests_Options = {
  projectRoot: Lib_Utility_LoadWorkspaceManifests_Options_ProjectRoot;
  workspaces: Lib_Utility_LoadWorkspaceManifests_Options_Workspaces;
};

export type Lib_Utility_LoadWorkspaceManifests_PackageJson = Shared_WorkspaceManifest;

export type Lib_Utility_LoadWorkspaceManifests_Returns = Promise<Lib_Utility_LoadWorkspaceManifests_PackageJson[]>;

export type Lib_Utility_LoadWorkspaceManifests_ProjectRoot = string;

export type Lib_Utility_LoadWorkspaceManifests_Workspaces = [string, Shared_NovaConfigWorkspace][];

export type Lib_Utility_LoadWorkspaceManifests_PackageJsons = Lib_Utility_LoadWorkspaceManifests_PackageJson[];

export type Lib_Utility_LoadWorkspaceManifests_RelativeWorkspacePath = string;

export type Lib_Utility_LoadWorkspaceManifests_WorkspaceManifest = Lib_Utility_LoadWorkspaceManifests_Workspaces[number][1];

export type Lib_Utility_LoadWorkspaceManifests_AbsoluteWorkspacePath = string;

export type Lib_Utility_LoadWorkspaceManifests_AbsolutePackageJsonPath = string;

export type Lib_Utility_LoadWorkspaceManifests_RawFile = string;

export type Lib_Utility_LoadWorkspaceManifests_ParsedFile = Record<string, unknown>;

export type Lib_Utility_LoadWorkspaceManifests_LoadErrorMessage = string;

/**
 * Lib - Utility - Normalize Route Segment.
 *
 * @since 0.17.1
 */
export type Lib_Utility_NormalizeRouteSegment_Segment = string;

export type Lib_Utility_NormalizeRouteSegment_Returns = string;

export type Lib_Utility_NormalizeRouteSegment_Patterns = ReadonlyArray<RegExp>;

export type Lib_Utility_NormalizeRouteSegment_Inner = string;

export type Lib_Utility_NormalizeRouteSegment_Match = RegExpMatchArray | null;

export type Lib_Utility_NormalizeRouteSegment_Scrubbed = string;

/**
 * Lib - Utility - Parse Linux OS Release File.
 *
 * @since 0.13.0
 */
export type Lib_Utility_ParseLinuxOsReleaseFile_Returns = Promise<Lib_Utility_ParseLinuxOsReleaseFile_OsReleaseEntries>;

export type Lib_Utility_ParseLinuxOsReleaseFile_OsReleaseEntries = Shared_LinuxOsReleaseEntries;

export type Lib_Utility_ParseLinuxOsReleaseFile_Query = Shared_ShellOutput;

/**
 * Lib - Utility - Parse Linux OS Release Text.
 *
 * @since 0.13.0
 */
export type Lib_Utility_ParseLinuxOsReleaseText_Text = string;

export type Lib_Utility_ParseLinuxOsReleaseText_Returns = Shared_LinuxOsReleaseEntries;

export type Lib_Utility_ParseLinuxOsReleaseText_Lines = string[];

export type Lib_Utility_ParseLinuxOsReleaseText_OsReleaseEntries = Lib_Utility_ParseLinuxOsReleaseText_Returns;

export type Lib_Utility_ParseLinuxOsReleaseText_Parts = string[];

export type Lib_Utility_ParseLinuxOsReleaseText_Key = string | undefined;

export type Lib_Utility_ParseLinuxOsReleaseText_Rest = string[];

export type Lib_Utility_ParseLinuxOsReleaseText_Value = string;

/**
 * Lib - Utility - Parse Windows Registry Query.
 *
 * @since 0.13.0
 */
export type Lib_Utility_ParseWindowsRegistryQuery_RegistryPaths = string | string[];

export type Lib_Utility_ParseWindowsRegistryQuery_Returns = Promise<Lib_Utility_ParseWindowsRegistryQuery_RegistryKeys>;

export type Lib_Utility_ParseWindowsRegistryQuery_Paths = string[];

export type Lib_Utility_ParseWindowsRegistryQuery_Query = Shared_ShellOutput;

export type Lib_Utility_ParseWindowsRegistryQuery_RegistryKeys = {
  [key: string]: Shared_WindowsRegistryKey;
};

/**
 * Lib - Utility - Parse Windows Registry Text.
 *
 * @since 0.13.0
 */
export type Lib_Utility_ParseWindowsRegistryText_Text = string;

export type Lib_Utility_ParseWindowsRegistryText_Returns = Shared_WindowsRegistryKeys;

export type Lib_Utility_ParseWindowsRegistryText_Lines = string[];

export type Lib_Utility_ParseWindowsRegistryText_RegistryKeys = Lib_Utility_ParseWindowsRegistryText_Returns;

export type Lib_Utility_ParseWindowsRegistryText_Matches = RegExpMatchArray | null;

export type Lib_Utility_ParseWindowsRegistryText_RegistryKey = string | undefined;

export type Lib_Utility_ParseWindowsRegistryText_RegistryKeyType = string | undefined;

export type Lib_Utility_ParseWindowsRegistryText_RegistryKeyData = string | undefined;

/**
 * Lib - Utility - Path Exists.
 *
 * @since 0.11.0
 */
export type Lib_Utility_PathExists_Path = string;

export type Lib_Utility_PathExists_Returns = Promise<boolean>;

/**
 * Lib - Utility - Rename File With Date.
 *
 * @since 0.13.0
 */
export type Lib_Utility_RenameFileWithDate_OldPath = string;

export type Lib_Utility_RenameFileWithDate_Returns = Promise<boolean>;

export type Lib_Utility_RenameFileWithDate_Directory = string;

export type Lib_Utility_RenameFileWithDate_Parsed = ParsedPath;

export type Lib_Utility_RenameFileWithDate_Prefix = string;

export type Lib_Utility_RenameFileWithDate_Suffix = string;

export type Lib_Utility_RenameFileWithDate_Now = Date;

export type Lib_Utility_RenameFileWithDate_Timestamp = string;

export type Lib_Utility_RenameFileWithDate_Counter = number;

export type Lib_Utility_RenameFileWithDate_CounterLabel = string;

export type Lib_Utility_RenameFileWithDate_NewFileName = string;

export type Lib_Utility_RenameFileWithDate_NewPath = string;

/**
 * Lib - Utility - Resolve Template Path.
 *
 * @since 0.11.0
 */
export type Lib_Utility_ResolveTemplatePath_ImportMetaUrl = string;

export type Lib_Utility_ResolveTemplatePath_Subpath = string;

export type Lib_Utility_ResolveTemplatePath_Returns = string;

export type Lib_Utility_ResolveTemplatePath_FilePath = string;

export type Lib_Utility_ResolveTemplatePath_CurrentDirectory = string;

/**
 * Lib - Utility - Save Generated File.
 *
 * @since 0.11.0
 */
export type Lib_Utility_SaveGeneratedFile_TargetPath = string;

export type Lib_Utility_SaveGeneratedFile_Contents = string;

export type Lib_Utility_SaveGeneratedFile_ReplaceFile = boolean;

export type Lib_Utility_SaveGeneratedFile_Header_Command = string;

export type Lib_Utility_SaveGeneratedFile_Header_DocsSlug = string;

export type Lib_Utility_SaveGeneratedFile_Header_Mode = 'strict' | 'fillable';

export type Lib_Utility_SaveGeneratedFile_Header = {
  command: Lib_Utility_SaveGeneratedFile_Header_Command;
  docsSlug: Lib_Utility_SaveGeneratedFile_Header_DocsSlug;
  mode: Lib_Utility_SaveGeneratedFile_Header_Mode;
};

export type Lib_Utility_SaveGeneratedFile_Returns = Promise<void>;

export type Lib_Utility_SaveGeneratedFile_ParentDirectory = string;

export type Lib_Utility_SaveGeneratedFile_CurrentDirectory = string;

export type Lib_Utility_SaveGeneratedFile_DisplayName = string;

export type Lib_Utility_SaveGeneratedFile_PrefixedContents = string | undefined;

export type Lib_Utility_SaveGeneratedFile_HeaderBanner = string;

/**
 * Lib - Utility - Save Workspace Manifest.
 *
 * @since 0.13.0
 */
export type Lib_Utility_SaveWorkspaceManifest_Workspace = Shared_WorkspaceManifest;

export type Lib_Utility_SaveWorkspaceManifest_ReplaceFile = boolean;

export type Lib_Utility_SaveWorkspaceManifest_Returns = Promise<void>;

export type Lib_Utility_SaveWorkspaceManifest_PackageJson = string;

export type Lib_Utility_SaveWorkspaceManifest_PackageContents = string;

/**
 * Lib - Utility - Shell Quote.
 *
 * @since 0.18.0
 */
export type Lib_Utility_ShellQuote_Value = string;

export type Lib_Utility_ShellQuote_Returns = string;

export type Lib_Utility_ShellQuote_BackslashPattern = RegExp;

export type Lib_Utility_ShellQuote_BacktickPattern = RegExp;

export type Lib_Utility_ShellQuote_DollarPattern = RegExp;

export type Lib_Utility_ShellQuote_DoubleQuotePattern = RegExp;

export type Lib_Utility_ShellQuote_Escaped = string;
