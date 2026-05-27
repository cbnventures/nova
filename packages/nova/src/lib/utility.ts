import { exec, spawn } from 'child_process';
import { promises as fs } from 'fs';
import { platform } from 'os';
import {
  basename,
  dirname,
  extname,
  join,
  parse,
  relative,
  resolve,
} from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

import chalk from 'chalk';

import { Logger } from '../toolkit/index.js';
import { LIB_CONSTANTS_DOCS_BASE_URL } from './constants.js';
import { libItemSkipDirectories } from './item.js';
import {
  LIB_REGEX_CHARACTER_BACKSLASH,
  LIB_REGEX_CHARACTER_BACKTICK,
  LIB_REGEX_CHARACTER_DOLLAR,
  LIB_REGEX_CHARACTER_DOUBLE_QUOTE,
  LIB_REGEX_CHARACTER_SINGLE_QUOTE,
  LIB_REGEX_LINEBREAK_CRLF_OR_LF,
  LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE,
  LIB_REGEX_PATTERN_LEADING_DOT,
  LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE,
} from './regex.js';

import type {
  Lib_Utility_BuildGeneratedFileHeader_BaseName,
  Lib_Utility_BuildGeneratedFileHeader_DocsUrl,
  Lib_Utility_BuildGeneratedFileHeader_Extension,
  Lib_Utility_BuildGeneratedFileHeader_IsHashStyle,
  Lib_Utility_BuildGeneratedFileHeader_IsMarkdownStyle,
  Lib_Utility_BuildGeneratedFileHeader_Lines,
  Lib_Utility_BuildGeneratedFileHeader_Options,
  Lib_Utility_BuildGeneratedFileHeader_Returns,
  Lib_Utility_BuildGeneratedFileHeader_RuleLine,
  Lib_Utility_CollectConsumerWorkspacePaths_CurrentDirectory,
  Lib_Utility_CollectConsumerWorkspacePaths_Filename,
  Lib_Utility_CollectConsumerWorkspacePaths_Path,
  Lib_Utility_CollectConsumerWorkspacePaths_Paths,
  Lib_Utility_CollectConsumerWorkspacePaths_Returns,
  Lib_Utility_CollectConsumerWorkspacePaths_SafeWorkspaces,
  Lib_Utility_CollectConsumerWorkspacePaths_Workspace,
  Lib_Utility_CollectConsumerWorkspacePaths_WorkspacePath,
  Lib_Utility_CollectConsumerWorkspacePaths_Workspaces,
  Lib_Utility_CompareSemver_A,
  Lib_Utility_CompareSemver_B,
  Lib_Utility_CompareSemver_Length,
  Lib_Utility_CompareSemver_PartsA,
  Lib_Utility_CompareSemver_PartsB,
  Lib_Utility_CompareSemver_Returns,
  Lib_Utility_CompareSemver_ValA,
  Lib_Utility_CompareSemver_ValB,
  Lib_Utility_CurrentTimestamp_Day,
  Lib_Utility_CurrentTimestamp_Hour,
  Lib_Utility_CurrentTimestamp_Millisecond,
  Lib_Utility_CurrentTimestamp_Minute,
  Lib_Utility_CurrentTimestamp_Month,
  Lib_Utility_CurrentTimestamp_Now,
  Lib_Utility_CurrentTimestamp_PadLeft,
  Lib_Utility_CurrentTimestamp_PadLeft_CurrentWidth,
  Lib_Utility_CurrentTimestamp_PadLeft_Number,
  Lib_Utility_CurrentTimestamp_PadLeft_Returns,
  Lib_Utility_CurrentTimestamp_PadLeft_Width,
  Lib_Utility_CurrentTimestamp_RawDate,
  Lib_Utility_CurrentTimestamp_RawHours,
  Lib_Utility_CurrentTimestamp_RawMinutes,
  Lib_Utility_CurrentTimestamp_RawMonth,
  Lib_Utility_CurrentTimestamp_RawSeconds,
  Lib_Utility_CurrentTimestamp_Returns,
  Lib_Utility_CurrentTimestamp_Second,
  Lib_Utility_CurrentTimestamp_TimezoneAbs,
  Lib_Utility_CurrentTimestamp_TimezoneHours,
  Lib_Utility_CurrentTimestamp_TimezoneHoursTruncated,
  Lib_Utility_CurrentTimestamp_TimezoneMinutes,
  Lib_Utility_CurrentTimestamp_TimezoneOffsetMinutes,
  Lib_Utility_CurrentTimestamp_TimezoneSign,
  Lib_Utility_CurrentTimestamp_Year,
  Lib_Utility_DetectShell_CurrentPlatform,
  Lib_Utility_DetectShell_Returns,
  Lib_Utility_DiscoverPathsWithFile_BackwardCurrentDirectory,
  Lib_Utility_DiscoverPathsWithFile_Direction,
  Lib_Utility_DiscoverPathsWithFile_Entries,
  Lib_Utility_DiscoverPathsWithFile_FileName,
  Lib_Utility_DiscoverPathsWithFile_ForwardCurrentDirectory,
  Lib_Utility_DiscoverPathsWithFile_HasTargetFile,
  Lib_Utility_DiscoverPathsWithFile_Queue,
  Lib_Utility_DiscoverPathsWithFile_RealDirectory,
  Lib_Utility_DiscoverPathsWithFile_Results,
  Lib_Utility_DiscoverPathsWithFile_Returns,
  Lib_Utility_DiscoverPathsWithFile_RootDirectory,
  Lib_Utility_DiscoverPathsWithFile_SkipDirectories,
  Lib_Utility_DiscoverPathsWithFile_StartDirectory,
  Lib_Utility_DiscoverPathsWithFile_TargetPath,
  Lib_Utility_DiscoverPathsWithFile_Visited,
  Lib_Utility_ExecuteShell_Command,
  Lib_Utility_ExecuteShell_CommandName,
  Lib_Utility_ExecuteShell_CommandOnPath,
  Lib_Utility_ExecuteShell_ErrorOutput,
  Lib_Utility_ExecuteShell_ExecAsync,
  Lib_Utility_ExecuteShell_ExecResult,
  Lib_Utility_ExecuteShell_FullCommand,
  Lib_Utility_ExecuteShell_QuotePosix,
  Lib_Utility_ExecuteShell_QuotePosix_Pattern,
  Lib_Utility_ExecuteShell_QuotePosix_Returns,
  Lib_Utility_ExecuteShell_QuotePosix_String,
  Lib_Utility_ExecuteShell_QuoteWindows,
  Lib_Utility_ExecuteShell_QuoteWindows_Pattern,
  Lib_Utility_ExecuteShell_QuoteWindows_Returns,
  Lib_Utility_ExecuteShell_QuoteWindows_String,
  Lib_Utility_ExecuteShell_Returns,
  Lib_Utility_ExecuteShell_Shell,
  Lib_Utility_ExecuteShell_Stderr,
  Lib_Utility_ExecuteShell_Stdout,
  Lib_Utility_ExecuteShell_SuccessOutput,
  Lib_Utility_IsCommandExists_Bin,
  Lib_Utility_IsCommandExists_ChildProcess,
  Lib_Utility_IsCommandExists_Command,
  Lib_Utility_IsCommandExists_CommandArguments,
  Lib_Utility_IsCommandExists_IsWin,
  Lib_Utility_IsCommandExists_Returns,
  Lib_Utility_IsExecuteShellError_Error,
  Lib_Utility_IsExecuteShellError_HasCode,
  Lib_Utility_IsExecuteShellError_HasCommand,
  Lib_Utility_IsExecuteShellError_HasKilled,
  Lib_Utility_IsExecuteShellError_HasSignal,
  Lib_Utility_IsExecuteShellError_HasStderr,
  Lib_Utility_IsExecuteShellError_HasStdout,
  Lib_Utility_IsExecuteShellError_Object,
  Lib_Utility_IsExecuteShellError_TypeGuard,
  Lib_Utility_IsFileIdentical_ComparisonResult,
  Lib_Utility_IsFileIdentical_ExistingFilePath,
  Lib_Utility_IsFileIdentical_IsIdentical,
  Lib_Utility_IsFileIdentical_NewFileContents,
  Lib_Utility_IsFileIdentical_OldFileContents,
  Lib_Utility_IsFileIdentical_ProposedContents,
  Lib_Utility_IsFileIdentical_Returns,
  Lib_Utility_IsFileIdentical_Serialized,
  Lib_Utility_IsIgnoredFile_Filename,
  Lib_Utility_IsIgnoredFile_IgnoreFiles,
  Lib_Utility_IsIgnoredFile_NormalizedFilename,
  Lib_Utility_IsIgnoredFile_NormalizedPattern,
  Lib_Utility_IsIgnoredFile_Returns,
  Lib_Utility_IsIgnoredFile_StrippedPattern,
  Lib_Utility_IsIgnoredFile_Suffix,
  Lib_Utility_IsPlainObject_Prototype,
  Lib_Utility_IsPlainObject_TypeGuard,
  Lib_Utility_IsPlainObject_Value,
  Lib_Utility_IsProjectRoot_CurrentDirectory,
  Lib_Utility_IsProjectRoot_GreaterThanOneMessage,
  Lib_Utility_IsProjectRoot_LessThanOneMessage,
  Lib_Utility_IsProjectRoot_Locations,
  Lib_Utility_IsProjectRoot_NotProjectRootDirectoryMessage,
  Lib_Utility_IsProjectRoot_Returns,
  Lib_Utility_LoadWorkspaceManifests_AbsolutePackageJsonPath,
  Lib_Utility_LoadWorkspaceManifests_AbsoluteWorkspacePath,
  Lib_Utility_LoadWorkspaceManifests_LoadErrorMessage,
  Lib_Utility_LoadWorkspaceManifests_Options,
  Lib_Utility_LoadWorkspaceManifests_PackageJsons,
  Lib_Utility_LoadWorkspaceManifests_ParsedFile,
  Lib_Utility_LoadWorkspaceManifests_ProjectRoot,
  Lib_Utility_LoadWorkspaceManifests_RawFile,
  Lib_Utility_LoadWorkspaceManifests_RelativeWorkspacePath,
  Lib_Utility_LoadWorkspaceManifests_Returns,
  Lib_Utility_LoadWorkspaceManifests_WorkspaceManifest,
  Lib_Utility_LoadWorkspaceManifests_Workspaces,
  Lib_Utility_NormalizeRouteSegment_Inner,
  Lib_Utility_NormalizeRouteSegment_Match,
  Lib_Utility_NormalizeRouteSegment_Patterns,
  Lib_Utility_NormalizeRouteSegment_Returns,
  Lib_Utility_NormalizeRouteSegment_Scrubbed,
  Lib_Utility_NormalizeRouteSegment_Segment,
  Lib_Utility_ParseLinuxOsReleaseFile_Returns,
  Lib_Utility_ParseLinuxOsReleaseText_Key,
  Lib_Utility_ParseLinuxOsReleaseText_Lines,
  Lib_Utility_ParseLinuxOsReleaseText_OsReleaseEntries,
  Lib_Utility_ParseLinuxOsReleaseText_Parts,
  Lib_Utility_ParseLinuxOsReleaseText_Rest,
  Lib_Utility_ParseLinuxOsReleaseText_Returns,
  Lib_Utility_ParseLinuxOsReleaseText_Text,
  Lib_Utility_ParseLinuxOsReleaseText_Value,
  Lib_Utility_ParseWindowsRegistryQuery_Paths,
  Lib_Utility_ParseWindowsRegistryQuery_RegistryKeys,
  Lib_Utility_ParseWindowsRegistryQuery_RegistryPaths,
  Lib_Utility_ParseWindowsRegistryQuery_Returns,
  Lib_Utility_ParseWindowsRegistryText_Lines,
  Lib_Utility_ParseWindowsRegistryText_Matches,
  Lib_Utility_ParseWindowsRegistryText_RegistryKey,
  Lib_Utility_ParseWindowsRegistryText_RegistryKeyData,
  Lib_Utility_ParseWindowsRegistryText_RegistryKeys,
  Lib_Utility_ParseWindowsRegistryText_RegistryKeyType,
  Lib_Utility_ParseWindowsRegistryText_Returns,
  Lib_Utility_ParseWindowsRegistryText_Text,
  Lib_Utility_PathExists_Path,
  Lib_Utility_PathExists_Returns,
  Lib_Utility_RenameFileWithDate_Counter,
  Lib_Utility_RenameFileWithDate_CounterLabel,
  Lib_Utility_RenameFileWithDate_Directory,
  Lib_Utility_RenameFileWithDate_NewFileName,
  Lib_Utility_RenameFileWithDate_NewPath,
  Lib_Utility_RenameFileWithDate_Now,
  Lib_Utility_RenameFileWithDate_OldPath,
  Lib_Utility_RenameFileWithDate_Parsed,
  Lib_Utility_RenameFileWithDate_Prefix,
  Lib_Utility_RenameFileWithDate_Returns,
  Lib_Utility_RenameFileWithDate_Suffix,
  Lib_Utility_RenameFileWithDate_Timestamp,
  Lib_Utility_ResolveTemplatePath_CurrentDirectory,
  Lib_Utility_ResolveTemplatePath_FilePath,
  Lib_Utility_ResolveTemplatePath_ImportMetaUrl,
  Lib_Utility_ResolveTemplatePath_Returns,
  Lib_Utility_ResolveTemplatePath_Subpath,
  Lib_Utility_SaveGeneratedFile_Contents,
  Lib_Utility_SaveGeneratedFile_CurrentDirectory,
  Lib_Utility_SaveGeneratedFile_DisplayName,
  Lib_Utility_SaveGeneratedFile_Header,
  Lib_Utility_SaveGeneratedFile_HeaderBanner,
  Lib_Utility_SaveGeneratedFile_ParentDirectory,
  Lib_Utility_SaveGeneratedFile_PrefixedContents,
  Lib_Utility_SaveGeneratedFile_ReplaceFile,
  Lib_Utility_SaveGeneratedFile_Returns,
  Lib_Utility_SaveGeneratedFile_TargetPath,
  Lib_Utility_SaveWorkspaceManifest_ReplaceFile,
  Lib_Utility_SaveWorkspaceManifest_Returns,
  Lib_Utility_SaveWorkspaceManifest_Workspace,
  Lib_Utility_ShellQuote_BackslashPattern,
  Lib_Utility_ShellQuote_BacktickPattern,
  Lib_Utility_ShellQuote_DollarPattern,
  Lib_Utility_ShellQuote_DoubleQuotePattern,
  Lib_Utility_ShellQuote_Escaped,
  Lib_Utility_ShellQuote_Returns,
  Lib_Utility_ShellQuote_Value,
} from '../types/lib/utility.d.ts';

/**
 * Lib - Utility - Collect Consumer Workspace Paths.
 *
 * Iterates the workspaces map and returns one absolute file path per consumer-facing
 * workspace (role in 'app', 'package', 'tool', 'config'). Used by must-have generators
 * to fan out a single template into every workspace that ships to consumers.
 *
 * @param {Lib_Utility_CollectConsumerWorkspacePaths_CurrentDirectory} currentDirectory - Current directory.
 * @param {Lib_Utility_CollectConsumerWorkspacePaths_Workspaces}       workspaces       - Workspaces.
 * @param {Lib_Utility_CollectConsumerWorkspacePaths_Filename}         filename         - Filename.
 *
 * @returns {Lib_Utility_CollectConsumerWorkspacePaths_Returns}
 *
 * @since 0.18.0
 */
export function collectConsumerWorkspacePaths(currentDirectory: Lib_Utility_CollectConsumerWorkspacePaths_CurrentDirectory, workspaces: Lib_Utility_CollectConsumerWorkspacePaths_Workspaces, filename: Lib_Utility_CollectConsumerWorkspacePaths_Filename): Lib_Utility_CollectConsumerWorkspacePaths_Returns {
  const paths: Lib_Utility_CollectConsumerWorkspacePaths_Paths = [];
  const safeWorkspaces: Lib_Utility_CollectConsumerWorkspacePaths_SafeWorkspaces = workspaces ?? {};

  for (const workspacesEntry of Object.entries(safeWorkspaces)) {
    const workspacePath: Lib_Utility_CollectConsumerWorkspacePaths_WorkspacePath = workspacesEntry[0];
    const workspace: Lib_Utility_CollectConsumerWorkspacePaths_Workspace = workspacesEntry[1];

    if (
      [
        'app',
        'package',
        'tool',
        'config',
      ].includes(workspace['role']) === true
      && workspacePath !== './'
    ) {
      const path: Lib_Utility_CollectConsumerWorkspacePaths_Path = join(currentDirectory, workspacePath, filename);

      paths.push(path);
    }
  }

  return paths;
}

/**
 * Lib - Utility - Compare Semver.
 *
 * Returns negative when a < b, positive when a > b, zero when equal.
 * Compares dot-separated version strings numerically (e.g., "2.40.0" vs "2.5.1").
 *
 * @param {Lib_Utility_CompareSemver_A} a - A.
 * @param {Lib_Utility_CompareSemver_B} b - B.
 *
 * @returns {Lib_Utility_CompareSemver_Returns}
 *
 * @since 0.18.0
 */
export function compareSemver(a: Lib_Utility_CompareSemver_A, b: Lib_Utility_CompareSemver_B): Lib_Utility_CompareSemver_Returns {
  const partsA: Lib_Utility_CompareSemver_PartsA = a.split('.').map((part) => parseInt(part, 10));
  const partsB: Lib_Utility_CompareSemver_PartsB = b.split('.').map((part) => parseInt(part, 10));
  const length: Lib_Utility_CompareSemver_Length = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < length; i += 1) {
    const valA: Lib_Utility_CompareSemver_ValA = partsA[i] ?? 0;
    const valB: Lib_Utility_CompareSemver_ValB = partsB[i] ?? 0;

    if (valA !== valB) {
      return valA - valB;
    }
  }

  return 0;
}

/**
 * Lib - Utility - Current Timestamp.
 *
 * Produces an ISO-8601-style bracket timestamp used by Logger when the
 * LOG_TIME environment variable is enabled, including milliseconds and UTC offset.
 *
 * @returns {Lib_Utility_CurrentTimestamp_Returns}
 *
 * @since 0.11.0
 */
export function currentTimestamp(): Lib_Utility_CurrentTimestamp_Returns {
  const now: Lib_Utility_CurrentTimestamp_Now = new Date();

  /**
   * Lib - Utility - Current Timestamp - Pad Left.
   *
   * Zero-pads a numeric component to the requested width, enforcing a minimum of
   * two digits for month, day, hour, minute, and second.
   *
   * @param {Lib_Utility_CurrentTimestamp_PadLeft_Number} number - Number.
   * @param {Lib_Utility_CurrentTimestamp_PadLeft_Width}  width  - Width.
   *
   * @private
   *
   * @returns {Lib_Utility_CurrentTimestamp_PadLeft_Returns}
   *
   * @since 0.11.0
   */
  const padLeft: Lib_Utility_CurrentTimestamp_PadLeft = (number: Lib_Utility_CurrentTimestamp_PadLeft_Number, width: Lib_Utility_CurrentTimestamp_PadLeft_Width = 2): Lib_Utility_CurrentTimestamp_PadLeft_Returns => {
    const currentWidth: Lib_Utility_CurrentTimestamp_PadLeft_CurrentWidth = (width < 2) ? 2 : width;

    return number.toString().padStart(currentWidth, '0');
  };

  const year: Lib_Utility_CurrentTimestamp_Year = now.getFullYear();
  const rawMonth: Lib_Utility_CurrentTimestamp_RawMonth = now.getMonth() + 1;
  const month: Lib_Utility_CurrentTimestamp_Month = padLeft(rawMonth);
  const rawDate: Lib_Utility_CurrentTimestamp_RawDate = now.getDate();
  const day: Lib_Utility_CurrentTimestamp_Day = padLeft(rawDate);
  const rawHours: Lib_Utility_CurrentTimestamp_RawHours = now.getHours();
  const hour: Lib_Utility_CurrentTimestamp_Hour = padLeft(rawHours);
  const rawMinutes: Lib_Utility_CurrentTimestamp_RawMinutes = now.getMinutes();
  const minute: Lib_Utility_CurrentTimestamp_Minute = padLeft(rawMinutes);
  const rawSeconds: Lib_Utility_CurrentTimestamp_RawSeconds = now.getSeconds();
  const second: Lib_Utility_CurrentTimestamp_Second = padLeft(rawSeconds);
  const millisecond: Lib_Utility_CurrentTimestamp_Millisecond = now.getMilliseconds().toString().padStart(3, '0');

  const timezoneOffsetMinutes: Lib_Utility_CurrentTimestamp_TimezoneOffsetMinutes = -now.getTimezoneOffset();
  const timezoneSign: Lib_Utility_CurrentTimestamp_TimezoneSign = (timezoneOffsetMinutes >= 0) ? '+' : '-';
  const timezoneAbs: Lib_Utility_CurrentTimestamp_TimezoneAbs = Math.abs(timezoneOffsetMinutes);
  const timezoneHoursTruncated: Lib_Utility_CurrentTimestamp_TimezoneHoursTruncated = Math.trunc(timezoneAbs / 60);
  const timezoneHours: Lib_Utility_CurrentTimestamp_TimezoneHours = padLeft(timezoneHoursTruncated);
  const timezoneMinutes: Lib_Utility_CurrentTimestamp_TimezoneMinutes = padLeft(timezoneAbs % 60);

  return `[${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond} ${timezoneSign}${timezoneHours}${timezoneMinutes}]`;
}

/**
 * Lib - Utility - Detect Shell.
 *
 * Returns the default shell path for the current operating system
 * so executeShell can wrap commands with the correct invocation syntax.
 *
 * @returns {Lib_Utility_DetectShell_Returns}
 *
 * @since 0.11.0
 */
export function detectShell(): Lib_Utility_DetectShell_Returns {
  const currentPlatform: Lib_Utility_DetectShell_CurrentPlatform = platform();

  // Windows.
  if (currentPlatform === 'win32') {
    return 'cmd.exe';
  }

  // macOS.
  if (currentPlatform === 'darwin') {
    return '/bin/zsh';
  }

  // Linux.
  if (currentPlatform === 'linux') {
    return '/bin/bash';
  }

  // AIX / Solaris.
  if ([
    'aix',
    'sunos',
  ].includes(currentPlatform) === true) {
    return '/bin/ksh';
  }

  return '/bin/sh';
}

/**
 * Lib - Utility - Discover Paths With File.
 *
 * Walks the filesystem either upward or downward from the working
 * directory to collect every path containing the named file.
 *
 * @param {Lib_Utility_DiscoverPathsWithFile_FileName}  fileName  - File name.
 * @param {Lib_Utility_DiscoverPathsWithFile_Direction} direction - Direction.
 *
 * @returns {Lib_Utility_DiscoverPathsWithFile_Returns}
 *
 * @since 0.11.0
 */
export async function discoverPathsWithFile(fileName: Lib_Utility_DiscoverPathsWithFile_FileName, direction: Lib_Utility_DiscoverPathsWithFile_Direction): Lib_Utility_DiscoverPathsWithFile_Returns {
  const startDirectory: Lib_Utility_DiscoverPathsWithFile_StartDirectory = process.cwd();
  const results: Lib_Utility_DiscoverPathsWithFile_Results = [];

  if (direction === 'backward') {
    const rootDirectory: Lib_Utility_DiscoverPathsWithFile_RootDirectory = parse(startDirectory).root;

    let currentDirectory: Lib_Utility_DiscoverPathsWithFile_BackwardCurrentDirectory = startDirectory;

    while (true) {
      const targetPath: Lib_Utility_DiscoverPathsWithFile_TargetPath = join(currentDirectory, fileName);

      try {
        Logger.customize({
          name: 'discoverPathsWithFile',
          purpose: 'backward',
        }).debug(`Current directory: "${currentDirectory}"`);

        // Attempt to access the specified file.
        await fs.access(targetPath);

        // If specified file is found, the current directory is noted.
        results.push(currentDirectory);
      } catch {
        /* empty */
      }

      // Stop if current directory is the root directory.
      if (currentDirectory === rootDirectory) {
        break;
      }

      // Traverse towards the root directory.
      currentDirectory = dirname(currentDirectory);
    }
  }

  if (direction === 'forward') {
    const queue: Lib_Utility_DiscoverPathsWithFile_Queue = [startDirectory];
    const visited: Lib_Utility_DiscoverPathsWithFile_Visited = new Set();
    const skipDirectories: Lib_Utility_DiscoverPathsWithFile_SkipDirectories = new Set(libItemSkipDirectories);

    while (queue.length > 0) {
      const currentDirectory: Lib_Utility_DiscoverPathsWithFile_ForwardCurrentDirectory = queue.shift();

      if (currentDirectory === undefined) {
        continue;
      }

      Logger.customize({
        name: 'discoverPathsWithFile',
        purpose: 'forward',
      }).debug(`Current directory: "${currentDirectory}"`);

      let realDirectory: Lib_Utility_DiscoverPathsWithFile_RealDirectory = undefined;

      try {
        // Resolve symlinks to avoid visiting the same location multiple times.
        realDirectory = await fs.realpath(currentDirectory);
      } catch {
        continue;
      }

      if (visited.has(realDirectory) === true) {
        continue;
      }

      visited.add(realDirectory);

      let entries: Lib_Utility_DiscoverPathsWithFile_Entries = undefined;

      try {
        // Attempt to read the directory contents.
        entries = await fs.readdir(realDirectory, { withFileTypes: true });
      } catch {
        continue;
      }

      // If directory contains the ignore marker, skip this entire tree.
      if (entries.some((entry) => entry.isFile() === true && entry.name === '.novaignore') === true) {
        continue;
      }

      let hasTargetFile: Lib_Utility_DiscoverPathsWithFile_HasTargetFile = false;

      for (const entry of entries) {
        // If directory contains the target file.
        if (entry.isFile() === true && entry.name === fileName) {
          hasTargetFile = true;

          continue;
        }

        if (entry.isDirectory() === false) {
          continue;
        }

        // Skips all dot-prefixed directory and what's listed in "skipDirectories".
        if (entry.name.startsWith('.') === true || skipDirectories.has(entry.name) === true) {
          continue;
        }

        // Queue sub-directories for traversal.
        queue.push(join(realDirectory, entry.name));
      }

      if (hasTargetFile === true) {
        // Record directories that include the target file.
        results.push(realDirectory);
      }
    }
  }

  return results;
}

/**
 * Lib - Utility - Execute Shell.
 *
 * Runs a shell command through the platform-detected shell with proper quoting,
 * used by the version utility and registry/OS-release parsers.
 *
 * @param {Lib_Utility_ExecuteShell_Command} command - Command.
 *
 * @returns {Lib_Utility_ExecuteShell_Returns}
 *
 * @since 0.11.0
 */
export async function executeShell(command: Lib_Utility_ExecuteShell_Command): Lib_Utility_ExecuteShell_Returns {
  const execAsync: Lib_Utility_ExecuteShell_ExecAsync = promisify(exec);
  const shell: Lib_Utility_ExecuteShell_Shell = detectShell();

  // Extract the command name (first token) to check PATH availability.
  const commandName: Lib_Utility_ExecuteShell_CommandName = command.split(' ')[0] ?? '';
  const commandOnPath: Lib_Utility_ExecuteShell_CommandOnPath = await isCommandExists(commandName);

  let fullCommand: Lib_Utility_ExecuteShell_FullCommand = command;

  /**
   * Lib - Utility - Execute Shell - Quote Posix.
   *
   * Escapes single quotes inside a command string so it can be safely wrapped in
   * single-quoted POSIX shell invocations for zsh, bash, and sh.
   *
   * @param {Lib_Utility_ExecuteShell_QuotePosix_String} string - String.
   *
   * @private
   *
   * @returns {Lib_Utility_ExecuteShell_QuotePosix_Returns}
   *
   * @since 0.11.0
   */
  const quotePosix: Lib_Utility_ExecuteShell_QuotePosix = (string: Lib_Utility_ExecuteShell_QuotePosix_String): Lib_Utility_ExecuteShell_QuotePosix_Returns => {
    const pattern: Lib_Utility_ExecuteShell_QuotePosix_Pattern = new RegExp(LIB_REGEX_CHARACTER_SINGLE_QUOTE.source, 'g');

    return string.replace(pattern, '\'\\\'\'');
  };

  /**
   * Lib - Utility - Execute Shell - Quote Windows.
   *
   * Escapes double quotes inside a command string so it can be
   * safely embedded in a cmd.exe /c invocation on Windows.
   *
   * @param {Lib_Utility_ExecuteShell_QuoteWindows_String} string - String.
   *
   * @private
   *
   * @returns {Lib_Utility_ExecuteShell_QuoteWindows_Returns}
   *
   * @since 0.11.0
   */
  const quoteWindows: Lib_Utility_ExecuteShell_QuoteWindows = (string: Lib_Utility_ExecuteShell_QuoteWindows_String): Lib_Utility_ExecuteShell_QuoteWindows_Returns => {
    const pattern: Lib_Utility_ExecuteShell_QuoteWindows_Pattern = new RegExp(LIB_REGEX_CHARACTER_DOUBLE_QUOTE.source, 'g');

    return string.replace(pattern, '"');
  };

  // Windows.
  if (shell === 'cmd.exe') {
    fullCommand = `cmd.exe /d /s /c "${quoteWindows(fullCommand)}"`;
  }

  // macOS.
  if (shell === '/bin/zsh' && commandOnPath === true) {
    fullCommand = `/bin/zsh -c '${quotePosix(fullCommand)}'`;
  }

  if (shell === '/bin/zsh' && commandOnPath === false) {
    fullCommand = `/bin/zsh -l -i -c '${quotePosix(fullCommand)}'`;
  }

  // Linux.
  if (shell === '/bin/bash' && commandOnPath === true) {
    fullCommand = `setsid -w /bin/bash -c '${quotePosix(fullCommand)}' </dev/null`;
  }

  if (shell === '/bin/bash' && commandOnPath === false) {
    fullCommand = `setsid -w /bin/bash -l -i -c '${quotePosix(fullCommand)}' </dev/null`;
  }

  // Fallback.
  if (shell === '/bin/sh') {
    fullCommand = `/bin/sh -c '${quotePosix(fullCommand)}'`;
  }

  try {
    const execResult: Lib_Utility_ExecuteShell_ExecResult = await execAsync(fullCommand, {
      encoding: 'utf-8',
      windowsHide: true,
      timeout: 15000,
      env: {
        ...process.env,
        SHELL_SESSIONS_DISABLE: '1',
        ...(await isCommandExists('corepack') === true) ? {
          COREPACK_ENABLE_STRICT: '0',
        } : {},
        ...(process.env['_VOLTA_TOOL_RECURSION'] !== undefined) ? {
          PATH: [
            ...(process.env['ProgramW6432'] !== undefined) ? [`${process.env['ProgramW6432']}\\Volta\\`] : [],
            ...(process.env['LOCALAPPDATA'] !== undefined) ? [`${process.env['LOCALAPPDATA']}\\Volta\\bin`] : [],
            ...(process.env['PATH'] !== undefined) ? [process.env['PATH']] : [],
          ].join(';'),
        } : {},
        ...(shell === '/bin/bash') ? {
          PAGER: 'cat',
        } : {},
      },
      cwd: process.cwd(),
      maxBuffer: 8 * 1024 * 1024,

      // 8 MB.
    });

    const stdout: Lib_Utility_ExecuteShell_Stdout = execResult['stdout'];
    const stderr: Lib_Utility_ExecuteShell_Stderr = execResult['stderr'];

    const output: Lib_Utility_ExecuteShell_SuccessOutput = {
      textOut: stdout.trim(),
      textError: stderr.trim(),
      code: 0,
    };

    Logger.customize({
      name: 'executeShell',
      purpose: 'command',
    }).debug(fullCommand);

    Logger.customize({
      name: 'executeShell',
      purpose: 'output',
    }).debug(output);

    return output;
  } catch (error) {
    const output: Lib_Utility_ExecuteShell_ErrorOutput = {
      textOut: '',
      textError: '',
      code: 1,
    };

    if (isExecuteShellError(error) === true) {
      if (error.stdout !== undefined) {
        output.textOut = `${error.stdout}`;
      }

      if (error.stderr !== undefined) {
        output.textError = `${error.stderr}`;
      }

      if (error.code !== undefined) {
        output.code = error.code;
      }
    }

    Logger.customize({
      name: 'executeShell',
      purpose: 'command',
    }).debug(fullCommand);

    Logger.customize({
      name: 'executeShell',
      purpose: 'output',
    }).debug(output);

    return output;
  }
}

/**
 * Lib - Utility - Is Command Exists.
 *
 * Spawns a lightweight child process to probe whether a CLI binary
 * is available on PATH, used by executeShell to conditionally set corepack env.
 *
 * @param {Lib_Utility_IsCommandExists_Command} command - Command.
 *
 * @returns {Lib_Utility_IsCommandExists_Returns}
 *
 * @since 0.11.0
 */
export async function isCommandExists(command: Lib_Utility_IsCommandExists_Command): Lib_Utility_IsCommandExists_Returns {
  const isWin: Lib_Utility_IsCommandExists_IsWin = platform() === 'win32';
  const bin: Lib_Utility_IsCommandExists_Bin = (isWin === true) ? 'where' : 'sh';
  const commandArguments: Lib_Utility_IsCommandExists_CommandArguments = (isWin === true) ? [
    '/Q',
    command,
  ] : [
    '-c',
    `command -v "${command}" >/dev/null 2>&1`,
  ];

  return new Promise((promiseResolve) => {
    const childProcess: Lib_Utility_IsCommandExists_ChildProcess = spawn(bin, commandArguments, {
      stdio: 'ignore',
    });

    // If the command is missing from PATH, Node emits an "error" (ENOENT).
    childProcess.once('error', () => {
      return promiseResolve(false);
    });

    // If the command exists.
    childProcess.once('exit', (code) => {
      return promiseResolve(code === 0);
    });

    return;
  });
}

/**
 * Lib - Utility - Is Execute Shell Error.
 *
 * Type guard that narrows an unknown catch value to the shape
 * emitted by Node execAsync failures, so executeShell can safely extract stdout/stderr.
 *
 * @param {Lib_Utility_IsExecuteShellError_Error} error - Error.
 *
 * @returns {boolean}
 *
 * @since 0.11.0
 */
export function isExecuteShellError(error: Lib_Utility_IsExecuteShellError_Error): error is Lib_Utility_IsExecuteShellError_TypeGuard {
  if (error === null || typeof error !== 'object') {
    return false;
  }

  const object: Lib_Utility_IsExecuteShellError_Object = error as Lib_Utility_IsExecuteShellError_Object;
  const hasCommand: Lib_Utility_IsExecuteShellError_HasCommand = 'cmd' in object && typeof object['cmd'] === 'string';
  const hasKilled: Lib_Utility_IsExecuteShellError_HasKilled = 'killed' in object && typeof object['killed'] === 'boolean';
  const hasCode: Lib_Utility_IsExecuteShellError_HasCode = 'code' in object && typeof object['code'] === 'number';
  const hasSignal: Lib_Utility_IsExecuteShellError_HasSignal = 'signal' in object && typeof object['signal'] === 'string';
  const hasStdout: Lib_Utility_IsExecuteShellError_HasStdout = 'stdout' in object && typeof object['stdout'] === 'string';
  const hasStderr: Lib_Utility_IsExecuteShellError_HasStderr = 'stderr' in object && typeof object['stderr'] === 'string';

  // Treat presence of any canonical "execAsync" fields as sufficient.
  return (
    hasCommand === true
    || hasKilled === true
    || hasCode === true
    || hasSignal === true
    || hasStdout === true
    || hasStderr === true
  );
}

/**
 * Lib - Utility - Is File Identical.
 *
 * Compares proposed content against an existing file on disk, used by saveGeneratedFile,
 * nova-config save, and agent-conventions to skip redundant writes.
 *
 * @param {Lib_Utility_IsFileIdentical_ExistingFilePath} existingFilePath - Existing file path.
 * @param {Lib_Utility_IsFileIdentical_ProposedContents} proposedContents - Proposed contents.
 *
 * @returns {Lib_Utility_IsFileIdentical_Returns}
 *
 * @since 0.13.0
 */
export async function isFileIdentical(existingFilePath: Lib_Utility_IsFileIdentical_ExistingFilePath, proposedContents: Lib_Utility_IsFileIdentical_ProposedContents): Lib_Utility_IsFileIdentical_Returns {
  let oldFileContents: Lib_Utility_IsFileIdentical_OldFileContents = undefined;
  let newFileContents: Lib_Utility_IsFileIdentical_NewFileContents = undefined;

  if (typeof proposedContents === 'string') {
    newFileContents = proposedContents;
  } else {
    let serialized: Lib_Utility_IsFileIdentical_Serialized = undefined;

    try {
      serialized = JSON.stringify(proposedContents, null, 2);
    } catch {
      Logger.customize({
        name: 'isFileIdentical',
        purpose: 'serialize',
      }).error(`Failed to serialize proposed contents for "${existingFilePath}".`);

      return false;
    }

    if (serialized === undefined) {
      Logger.customize({
        name: 'isFileIdentical',
        purpose: 'serialize',
      }).warn(`Serialization produced undefined for "${existingFilePath}".`);

      return false;
    }

    newFileContents = `${serialized}\n`;
  }

  try {
    oldFileContents = await fs.readFile(existingFilePath, 'utf-8');
  } catch {
    Logger.customize({
      name: 'isFileIdentical',
      purpose: 'read',
    }).error(`Unable to read existing file "${existingFilePath}".`);

    return false;
  }

  const isIdentical: Lib_Utility_IsFileIdentical_IsIdentical = oldFileContents === newFileContents;

  const comparisonResult: Lib_Utility_IsFileIdentical_ComparisonResult = (isIdentical === true) ? 'matches' : 'differs from';

  Logger.customize({
    name: 'isFileIdentical',
    purpose: (isIdentical === true) ? 'identical' : 'different',
  }).debug(`Existing file "${existingFilePath}" ${comparisonResult} proposed contents.`);

  return isIdentical;
}

/**
 * Lib - Utility - Is Ignored File.
 *
 * Checks whether a filename matches any pattern in the ignoreFiles
 * list, called by every custom ESLint rule to skip files excluded from linting.
 *
 * @param {Lib_Utility_IsIgnoredFile_Filename}    filename    - Filename.
 * @param {Lib_Utility_IsIgnoredFile_IgnoreFiles} ignoreFiles - Ignore files.
 *
 * @returns {Lib_Utility_IsIgnoredFile_Returns}
 *
 * @since 0.11.0
 */
export function isIgnoredFile(filename: Lib_Utility_IsIgnoredFile_Filename, ignoreFiles: Lib_Utility_IsIgnoredFile_IgnoreFiles): Lib_Utility_IsIgnoredFile_Returns {
  const normalizedFilename: Lib_Utility_IsIgnoredFile_NormalizedFilename = filename.replaceAll('\\', '/');

  for (const pattern of ignoreFiles) {
    const strippedPattern: Lib_Utility_IsIgnoredFile_StrippedPattern = (pattern.startsWith('./') === true) ? pattern.slice(2) : pattern;
    const normalizedPattern: Lib_Utility_IsIgnoredFile_NormalizedPattern = strippedPattern.replaceAll('\\', '/');

    // Wildcard prefix pattern (e.g., "*.test.ts").
    if (normalizedPattern.startsWith('*') === true) {
      const suffix: Lib_Utility_IsIgnoredFile_Suffix = normalizedPattern.slice(1);

      if (normalizedFilename.endsWith(suffix) === true) {
        return true;
      }

      continue;
    }

    if (
      normalizedFilename === normalizedPattern
      || normalizedFilename.endsWith(`/${normalizedPattern}`) === true
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Lib - Utility - Is Plain Object.
 *
 * Type guard that accepts only literal objects and Object.create(null)
 * dictionaries, used by LibNovaConfig to validate parsed config values.
 *
 * @param {Lib_Utility_IsPlainObject_Value} value - Value.
 *
 * @returns {boolean}
 *
 * @since 0.13.0
 */
export function isPlainObject(value: Lib_Utility_IsPlainObject_Value): value is Lib_Utility_IsPlainObject_TypeGuard {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (Array.isArray(value) === true) {
    return false;
  }

  const prototype: Lib_Utility_IsPlainObject_Prototype = Object.getPrototypeOf(value);

  // Treat both ordinary object literals and prototype-less dictionaries (Object.create(null)) as "plain".
  return prototype === Object.prototype || prototype === null;
}

/**
 * Lib - Utility - Is Project Root.
 *
 * Validates that the working directory is the monorepo root by
 * scanning backward for exactly one package.json in the directory tree.
 *
 * @param {Lib_Utility_IsProjectRoot_CurrentDirectory} currentDirectory - Current directory.
 *
 * @returns {Lib_Utility_IsProjectRoot_Returns}
 *
 * @since 0.13.0
 */
export async function isProjectRoot(currentDirectory: Lib_Utility_IsProjectRoot_CurrentDirectory): Lib_Utility_IsProjectRoot_Returns {
  const locations: Lib_Utility_IsProjectRoot_Locations = await discoverPathsWithFile('package.json', 'backward');

  Logger.customize({
    name: 'isProjectRoot',
    purpose: 'detectedLocations',
  }).debug(locations);

  // If command was ran outside of project root directory.
  if (locations.length < 1) {
    const lessThanOneMessage: Lib_Utility_IsProjectRoot_LessThanOneMessage = [
      'No "package.json" files were found. Re-run this command inside the project root directory.',
      `Current directory is "${currentDirectory}"`,
    ].join('\n');

    Logger.customize({
      name: 'isProjectRoot',
      purpose: 'lessThanOne',
    }).error(lessThanOneMessage);

    return false;
  }

  // If command was ran inside a monorepo package.
  if (locations.length > 1) {
    const greaterThanOneMessage: Lib_Utility_IsProjectRoot_GreaterThanOneMessage = [
      'Multiple "package.json" files were found. Re-run this command inside the project root directory.',
      `Current directory is "${currentDirectory}"`,
    ].join('\n');

    Logger.customize({
      name: 'isProjectRoot',
      purpose: 'greaterThanOne',
    }).error(greaterThanOneMessage);

    return false;
  }

  // If command was ran outside the project root directory.
  if (locations.length === 1 && locations[0] !== currentDirectory) {
    const notProjectRootDirectoryMessage: Lib_Utility_IsProjectRoot_NotProjectRootDirectoryMessage = [
      'Must be run inside the project root directory.',
      `Current directory is "${currentDirectory}"`,
    ].join('\n');

    Logger.customize({
      name: 'isProjectRoot',
      purpose: 'notProjectRootDirectory',
    }).error(notProjectRootDirectoryMessage);

    return false;
  }

  return true;
}

/**
 * Lib - Utility - Load Workspace Manifests.
 *
 * Reads and parses the package.json for each workspace path
 * defined in nova.config.json, called by package-json recipes before applying transforms.
 *
 * @param {Lib_Utility_LoadWorkspaceManifests_Options} options - Options.
 *
 * @returns {Lib_Utility_LoadWorkspaceManifests_Returns}
 *
 * @since 0.13.0
 */
export async function loadWorkspaceManifests(options: Lib_Utility_LoadWorkspaceManifests_Options): Lib_Utility_LoadWorkspaceManifests_Returns {
  const projectRoot: Lib_Utility_LoadWorkspaceManifests_ProjectRoot = options['projectRoot'];
  const workspaces: Lib_Utility_LoadWorkspaceManifests_Workspaces = options['workspaces'];

  const packageJsons: Lib_Utility_LoadWorkspaceManifests_PackageJsons = [];

  for (const workspace of workspaces) {
    const relativeWorkspacePath: Lib_Utility_LoadWorkspaceManifests_RelativeWorkspacePath = workspace[0];
    const workspaceManifest: Lib_Utility_LoadWorkspaceManifests_WorkspaceManifest = workspace[1];

    const absoluteWorkspacePath: Lib_Utility_LoadWorkspaceManifests_AbsoluteWorkspacePath = resolve(projectRoot, relativeWorkspacePath);
    const absolutePackageJsonPath: Lib_Utility_LoadWorkspaceManifests_AbsolutePackageJsonPath = join(absoluteWorkspacePath, 'package.json');

    try {
      const rawFile: Lib_Utility_LoadWorkspaceManifests_RawFile = await fs.readFile(absolutePackageJsonPath, 'utf-8');
      const parsedFile: Lib_Utility_LoadWorkspaceManifests_ParsedFile = JSON.parse(rawFile);

      packageJsons.push({
        manifest: workspaceManifest,
        filePath: absolutePackageJsonPath,
        fileContents: parsedFile,
      });

      Logger.customize({
        name: 'loadWorkspaceManifests',
        purpose: 'load',
      }).debug(`Loaded package manifest for workspace "${relativeWorkspacePath}".`);
    } catch (error) {
      const loadErrorMessage: Lib_Utility_LoadWorkspaceManifests_LoadErrorMessage = [
        `Skipping workspace "${relativeWorkspacePath}" because the "package.json" file is inaccessible or invalid.`,
        error,
      ].join('\n');

      Logger.customize({
        name: 'loadWorkspaceManifests',
        purpose: 'load',
      }).error(loadErrorMessage);
    }
  }

  return packageJsons;
}

/**
 * Lib - Utility - Normalize Route Segment.
 *
 * Cleans a single path segment for downstream hyphen-split title-casing.
 * Unwraps Next.js-style routing patterns (dynamic, catch-all, route groups,
 * parallel routes) and dash-replaces residual non-identifier characters.
 *
 * @param {Lib_Utility_NormalizeRouteSegment_Segment} segment - Segment.
 *
 * @returns {Lib_Utility_NormalizeRouteSegment_Returns}
 *
 * @since 0.17.1
 */
export function normalizeRouteSegment(segment: Lib_Utility_NormalizeRouteSegment_Segment): Lib_Utility_NormalizeRouteSegment_Returns {
  const patterns: Lib_Utility_NormalizeRouteSegment_Patterns = [
    new RegExp('^\\[\\[\\.\\.\\.(.+)\\]\\]$'),
    new RegExp('^\\[\\.\\.\\.(.+)\\]$'),
    new RegExp('^\\[(.+)\\]$'),
    new RegExp('^\\((.+)\\)$'),
    new RegExp('^@(.+)$'),
  ];

  let inner: Lib_Utility_NormalizeRouteSegment_Inner = segment;

  for (const pattern of patterns) {
    const match: Lib_Utility_NormalizeRouteSegment_Match = inner.match(pattern);

    if (match !== null && match[1] !== undefined) {
      inner = match[1];

      break;
    }
  }

  const scrubbed: Lib_Utility_NormalizeRouteSegment_Scrubbed = inner.replace(new RegExp('[^A-Za-z0-9_-]', 'g'), '-');

  if (new RegExp('[A-Za-z0-9_]').test(scrubbed) === false) {
    return '';
  }

  return scrubbed;
}

/**
 * Lib - Utility - Parse Linux OS Release File.
 *
 * Reads /etc/os-release via executeShell and parses it into
 * key-value pairs, called by the version utility to display the Linux distro name.
 *
 * @returns {Lib_Utility_ParseLinuxOsReleaseFile_Returns}
 *
 * @since 0.13.0
 */
export async function parseLinuxOsReleaseFile(): Lib_Utility_ParseLinuxOsReleaseFile_Returns {
  return parseLinuxOsReleaseText((await executeShell('cat /etc/os-release'))['textOut']);
}

/**
 * Lib - Utility - Parse Linux OS Release Text.
 *
 * Splits raw os-release file content into a record of key-value
 * pairs, stripping comments and surrounding quotes from each value.
 *
 * @param {Lib_Utility_ParseLinuxOsReleaseText_Text} text - Text.
 *
 * @returns {Lib_Utility_ParseLinuxOsReleaseText_Returns}
 *
 * @since 0.13.0
 */
export function parseLinuxOsReleaseText(text: Lib_Utility_ParseLinuxOsReleaseText_Text): Lib_Utility_ParseLinuxOsReleaseText_Returns {
  const lines: Lib_Utility_ParseLinuxOsReleaseText_Lines = text.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);
  const osReleaseEntries: Lib_Utility_ParseLinuxOsReleaseText_OsReleaseEntries = {};

  for (const line of lines) {
    // Skip empty or commented lines.
    if (line === '' || line.startsWith('#') === true) {
      continue;
    }

    const parts: Lib_Utility_ParseLinuxOsReleaseText_Parts = line.split('=');
    const key: Lib_Utility_ParseLinuxOsReleaseText_Key = parts[0];
    const rest: Lib_Utility_ParseLinuxOsReleaseText_Rest = parts.slice(1);

    if (key === undefined) {
      continue;
    }

    // Rejoin in case value itself contains "=".
    let value: Lib_Utility_ParseLinuxOsReleaseText_Value = rest.join('=');

    // Strip wrapping quotes.
    value = value.replace(LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE, '$1');

    Reflect.set(osReleaseEntries, key, value);
  }

  return osReleaseEntries;
}

/**
 * Lib - Utility - Parse Windows Registry Query.
 *
 * Runs reg query against one or more registry paths and returns
 * the first set of parsed keys, used by the version utility for OS detection.
 *
 * @param {Lib_Utility_ParseWindowsRegistryQuery_RegistryPaths} registryPaths - Registry paths.
 *
 * @returns {Lib_Utility_ParseWindowsRegistryQuery_Returns}
 *
 * @since 0.13.0
 */
export async function parseWindowsRegistryQuery(registryPaths: Lib_Utility_ParseWindowsRegistryQuery_RegistryPaths): Lib_Utility_ParseWindowsRegistryQuery_Returns {
  const paths: Lib_Utility_ParseWindowsRegistryQuery_Paths = (Array.isArray(registryPaths) === true) ? registryPaths : [registryPaths];

  for (const path of paths) {
    const registryKeys: Lib_Utility_ParseWindowsRegistryQuery_RegistryKeys = parseWindowsRegistryText((await executeShell(`reg query "${path}"`))['textOut']);

    // If we parsed any keys for this path, return immediately (fallback behavior).
    if (Object.keys(registryKeys).length > 0) {
      return registryKeys;
    }
  }

  // No results.
  return {};
}

/**
 * Lib - Utility - Parse Windows Registry Text.
 *
 * Extracts registry key names, types, and data from raw reg query
 * output by matching each line against the registry query line regex pattern.
 *
 * @param {Lib_Utility_ParseWindowsRegistryText_Text} text - Text.
 *
 * @returns {Lib_Utility_ParseWindowsRegistryText_Returns}
 *
 * @since 0.13.0
 */
export function parseWindowsRegistryText(text: Lib_Utility_ParseWindowsRegistryText_Text): Lib_Utility_ParseWindowsRegistryText_Returns {
  const lines: Lib_Utility_ParseWindowsRegistryText_Lines = text.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);
  const registryKeys: Lib_Utility_ParseWindowsRegistryText_RegistryKeys = {};

  for (const line of lines) {
    const matches: Lib_Utility_ParseWindowsRegistryText_Matches = line.match(LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE);

    if (matches !== null) {
      const registryKey: Lib_Utility_ParseWindowsRegistryText_RegistryKey = matches[1];
      const registryKeyType: Lib_Utility_ParseWindowsRegistryText_RegistryKeyType = matches[2];
      const registryKeyData: Lib_Utility_ParseWindowsRegistryText_RegistryKeyData = matches[3];

      if (
        registryKey !== undefined
        && registryKeyType !== undefined
        && registryKeyData !== undefined
      ) {
        Reflect.set(registryKeys, registryKey, {
          type: registryKeyType as Lib_Utility_ParseWindowsRegistryText_RegistryKeyType,
          data: registryKeyData.trim(),
        });
      }
    }
  }

  return registryKeys;
}

/**
 * Lib - Utility - Path Exists.
 *
 * Wraps fs.access in a boolean try-catch, used by saveGeneratedFile
 * and agent-conventions to check whether a target file already exists on disk.
 *
 * @param {Lib_Utility_PathExists_Path} path - Path.
 *
 * @returns {Lib_Utility_PathExists_Returns}
 *
 * @since 0.11.0
 */
export async function pathExists(path: Lib_Utility_PathExists_Path): Lib_Utility_PathExists_Returns {
  try {
    await fs.access(path);

    return true;
  } catch {
    return false;
  }
}

/**
 * Lib - Utility - Rename File With Date.
 *
 * Renames an existing file to a timestamped backup name with an
 * auto-incrementing counter, called by saveGeneratedFile and nova-config.
 *
 * @param {Lib_Utility_RenameFileWithDate_OldPath} oldPath - Old path.
 *
 * @returns {Lib_Utility_RenameFileWithDate_Returns}
 *
 * @since 0.13.0
 */
export async function renameFileWithDate(oldPath: Lib_Utility_RenameFileWithDate_OldPath): Lib_Utility_RenameFileWithDate_Returns {
  const directory: Lib_Utility_RenameFileWithDate_Directory = dirname(oldPath);
  const parsed: Lib_Utility_RenameFileWithDate_Parsed = parse(oldPath);
  const prefix: Lib_Utility_RenameFileWithDate_Prefix = (parsed.base.startsWith('.') === true) ? parsed.base : parsed.name;
  const suffix: Lib_Utility_RenameFileWithDate_Suffix = (parsed.base.startsWith('.') === true) ? '' : parsed.ext.replace(LIB_REGEX_PATTERN_LEADING_DOT, '');

  const now: Lib_Utility_RenameFileWithDate_Now = new Date();
  const timestamp: Lib_Utility_RenameFileWithDate_Timestamp = [
    now.getUTCFullYear(),
    (now.getUTCMonth() + 1).toString().padStart(2, '0'),
    now.getUTCDate().toString().padStart(2, '0'),
  ].join('-');

  let counter: Lib_Utility_RenameFileWithDate_Counter = 1;

  while (true) {
    const counterLabel: Lib_Utility_RenameFileWithDate_CounterLabel = counter.toString().padStart(4, '0');
    const newFileName: Lib_Utility_RenameFileWithDate_NewFileName = (suffix !== '') ? `${prefix}.${timestamp}_${counterLabel}.nova-backup.${suffix}` : `${prefix}.${timestamp}_${counterLabel}.nova-backup`;
    const newPath: Lib_Utility_RenameFileWithDate_NewPath = join(directory, newFileName);

    // Keep trying until file does not exist.
    try {
      await fs.access(newPath);

      Logger.customize({
        name: 'renameFileWithDate',
        purpose: 'candidateExists',
      }).debug(`Candidate "${newPath}" already exists, trying next suffix.`);

      counter += 1;
    } catch {
      // Attempt to rename file.
      try {
        await fs.rename(oldPath, newPath);

        Logger.customize({
          name: 'renameFileWithDate',
          purpose: 'renameSuccess',
        }).debug(`Renamed "${oldPath}" to "${newPath}".`);

        return true;
      } catch {
        Logger.customize({
          name: 'renameFileWithDate',
          purpose: 'renameFailure',
        }).error(`Failed to rename "${oldPath}" to "${newPath}".`);

        return false;
      }
    }
  }
}

/**
 * Lib - Utility - Resolve Template Path.
 *
 * Converts an import.meta.url into an absolute path under the
 * templates directory, called by every generator and scaffold command to locate assets.
 *
 * @param {Lib_Utility_ResolveTemplatePath_ImportMetaUrl} importMetaUrl - Import meta url.
 * @param {Lib_Utility_ResolveTemplatePath_Subpath}       subpath       - Subpath.
 *
 * @returns {Lib_Utility_ResolveTemplatePath_Returns}
 *
 * @since 0.11.0
 */
export function resolveTemplatePath(importMetaUrl: Lib_Utility_ResolveTemplatePath_ImportMetaUrl, subpath: Lib_Utility_ResolveTemplatePath_Subpath): Lib_Utility_ResolveTemplatePath_Returns {
  const filePath: Lib_Utility_ResolveTemplatePath_FilePath = fileURLToPath(importMetaUrl);
  const currentDirectory: Lib_Utility_ResolveTemplatePath_CurrentDirectory = dirname(filePath);

  return join(currentDirectory, '..', '..', '..', '..', 'templates', subpath);
}

/**
 * Lib - Utility - Build Generated File Header.
 *
 * Builds a banner string for a generated file; comment syntax is inferred
 * from targetPath; returned string ends with a trailing blank line.
 *
 * @param {Lib_Utility_BuildGeneratedFileHeader_Options} options - Options.
 *
 * @returns {Lib_Utility_BuildGeneratedFileHeader_Returns}
 *
 * @since 0.16.3
 */
export function buildGeneratedFileHeader(options: Lib_Utility_BuildGeneratedFileHeader_Options): Lib_Utility_BuildGeneratedFileHeader_Returns {
  const baseName: Lib_Utility_BuildGeneratedFileHeader_BaseName = basename(options['targetPath']);
  const extension: Lib_Utility_BuildGeneratedFileHeader_Extension = extname(options['targetPath']).toLowerCase();
  const docsUrl: Lib_Utility_BuildGeneratedFileHeader_DocsUrl = `${LIB_CONSTANTS_DOCS_BASE_URL}/docs/${options['docsSlug']}`;
  const ruleLine: Lib_Utility_BuildGeneratedFileHeader_RuleLine = (options['mode'] === 'fillable') ? 'You may fill in values for existing keys only — do not add, rename, or remove keys.' : 'Do not edit manually.';

  const isHashStyle: Lib_Utility_BuildGeneratedFileHeader_IsHashStyle = (
    extension === '.yml'
    || extension === '.yaml'
    || baseName === '.editorconfig'
    || baseName === '.gitignore'
    || baseName === '.env'
    || baseName.startsWith('.env.')
  );
  const isMarkdownStyle: Lib_Utility_BuildGeneratedFileHeader_IsMarkdownStyle = (extension === '.md');

  if (isHashStyle === true) {
    const lines: Lib_Utility_BuildGeneratedFileHeader_Lines = [
      '# This file is generated by @cbnventures/nova.',
      `# ${ruleLine}`,
      '#',
      `# Run \`${options['command']}\` to regenerate.`,
      `# See: ${docsUrl}`,
      '',
      '',
    ];

    return lines.join('\n');
  }

  if (isMarkdownStyle === true) {
    const lines: Lib_Utility_BuildGeneratedFileHeader_Lines = [
      '<!--',
      '  This file is generated by @cbnventures/nova.',
      `  ${ruleLine}`,
      '',
      `  Run \`${options['command']}\` to regenerate.`,
      `  See: ${docsUrl}`,
      '-->',
      '',
      '',
    ];

    return lines.join('\n');
  }

  throw new Error(`buildGeneratedFileHeader: unsupported targetPath '${options['targetPath']}'`);
}

/**
 * Lib - Utility - Save Generated File.
 *
 * Writes content to disk after creating parent directories,
 * skipping identical files, and backing up existing files when replaceFile is false.
 * When header is supplied, the banner is prepended before the identity check and write.
 *
 * @param {Lib_Utility_SaveGeneratedFile_TargetPath}  targetPath  - Target path.
 * @param {Lib_Utility_SaveGeneratedFile_Contents}    contents    - Contents.
 * @param {Lib_Utility_SaveGeneratedFile_ReplaceFile} replaceFile - Replace file.
 * @param {Lib_Utility_SaveGeneratedFile_Header}      [header]    - Optional header metadata.
 *
 * @returns {Lib_Utility_SaveGeneratedFile_Returns}
 *
 * @since 0.11.0
 */
export async function saveGeneratedFile(targetPath: Lib_Utility_SaveGeneratedFile_TargetPath, contents: Lib_Utility_SaveGeneratedFile_Contents, replaceFile: Lib_Utility_SaveGeneratedFile_ReplaceFile, header?: Lib_Utility_SaveGeneratedFile_Header): Lib_Utility_SaveGeneratedFile_Returns {
  const parentDirectory: Lib_Utility_SaveGeneratedFile_ParentDirectory = dirname(targetPath);
  const currentDirectory: Lib_Utility_SaveGeneratedFile_CurrentDirectory = process.cwd();
  const displayName: Lib_Utility_SaveGeneratedFile_DisplayName = relative(currentDirectory, targetPath);

  let prefixedContents: Lib_Utility_SaveGeneratedFile_PrefixedContents = undefined;

  if (header !== undefined) {
    const headerBanner: Lib_Utility_SaveGeneratedFile_HeaderBanner = buildGeneratedFileHeader({
      command: header['command'],
      docsSlug: header['docsSlug'],
      targetPath,
      mode: header['mode'],
    });

    prefixedContents = `${headerBanner}${contents}`;
  } else {
    prefixedContents = contents;
  }

  // Ensure parent directory exists.
  await fs.mkdir(parentDirectory, { recursive: true });

  // Check if existing file is identical.
  if (await pathExists(targetPath) === true) {
    if (await isFileIdentical(targetPath, prefixedContents) === true) {
      Logger.customize({
        name: 'saveGeneratedFile',
        purpose: 'identical',
      }).info(`Skipping ${chalk.cyan(`"${displayName}"`)} (identical content).`);

      return;
    }

    // Rename existing file if user chooses not to replace file.
    if (replaceFile === false) {
      await renameFileWithDate(targetPath);
    }
  }

  await fs.writeFile(targetPath, prefixedContents, 'utf-8');

  Logger.customize({
    name: 'saveGeneratedFile',
    purpose: 'generated',
  }).info(`Generated ${chalk.cyan(`"${displayName}"`)}.`);

  return;
}

/**
 * Lib - Utility - Save Workspace Manifest.
 *
 * Persists a modified package.json for a single workspace, called
 * by each package-json recipe after applying field-level transformations.
 *
 * @param {Lib_Utility_SaveWorkspaceManifest_Workspace}   workspace   - Workspace.
 * @param {Lib_Utility_SaveWorkspaceManifest_ReplaceFile} replaceFile - Replace file.
 *
 * @returns {Lib_Utility_SaveWorkspaceManifest_Returns}
 *
 * @since 0.13.0
 */
export async function saveWorkspaceManifest(workspace: Lib_Utility_SaveWorkspaceManifest_Workspace, replaceFile: Lib_Utility_SaveWorkspaceManifest_ReplaceFile): Lib_Utility_SaveWorkspaceManifest_Returns {
  // No changes detected, skip touching the filesystem.
  if (await isFileIdentical(workspace['filePath'], workspace['fileContents']) === true) {
    return;
  }

  // Rename existing file if user chooses not to replace file.
  if (replaceFile === false) {
    await renameFileWithDate(workspace['filePath']);
  }

  await fs.writeFile(
    workspace['filePath'],
    `${JSON.stringify(workspace['fileContents'], null, 2)}\n`,
    'utf-8',
  );

  return;
}

/**
 * Lib - Utility - Shell Quote.
 *
 * Wraps a value in double quotes and escapes embedded double quotes,
 * making it safe to interpolate into a shell command string.
 *
 * @param {Lib_Utility_ShellQuote_Value} value - Value.
 *
 * @returns {Lib_Utility_ShellQuote_Returns}
 *
 * @since 0.18.0
 */
export function shellQuote(value: Lib_Utility_ShellQuote_Value): Lib_Utility_ShellQuote_Returns {
  const backslashPattern: Lib_Utility_ShellQuote_BackslashPattern = new RegExp(LIB_REGEX_CHARACTER_BACKSLASH.source, 'g');
  const backtickPattern: Lib_Utility_ShellQuote_BacktickPattern = new RegExp(LIB_REGEX_CHARACTER_BACKTICK.source, 'g');
  const dollarPattern: Lib_Utility_ShellQuote_DollarPattern = new RegExp(LIB_REGEX_CHARACTER_DOLLAR.source, 'g');
  const doubleQuotePattern: Lib_Utility_ShellQuote_DoubleQuotePattern = new RegExp(LIB_REGEX_CHARACTER_DOUBLE_QUOTE.source, 'g');

  const escaped: Lib_Utility_ShellQuote_Escaped = value
    .replace(backslashPattern, '\\\\')
    .replace(backtickPattern, '\\`')
    .replace(dollarPattern, '\\$')
    .replace(doubleQuotePattern, '\\"');

  return `"${escaped}"`;
}
