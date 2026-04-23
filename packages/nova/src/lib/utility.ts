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
  LIB_REGEX_CHARACTER_DOUBLE_QUOTE,
  LIB_REGEX_CHARACTER_SINGLE_QUOTE,
  LIB_REGEX_LINEBREAK_CRLF_OR_LF,
  LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE,
  LIB_REGEX_PATTERN_LEADING_DOT,
  LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE,
} from './regex.js';

import type {
  LibUtilityBuildGeneratedFileHeaderBaseName,
  LibUtilityBuildGeneratedFileHeaderDocsUrl,
  LibUtilityBuildGeneratedFileHeaderExtension,
  LibUtilityBuildGeneratedFileHeaderIsHashStyle,
  LibUtilityBuildGeneratedFileHeaderIsMarkdownStyle,
  LibUtilityBuildGeneratedFileHeaderLines,
  LibUtilityBuildGeneratedFileHeaderOptions,
  LibUtilityBuildGeneratedFileHeaderReturns,
  LibUtilityBuildGeneratedFileHeaderRuleLine,
  LibUtilityCurrentTimestampDay,
  LibUtilityCurrentTimestampHour,
  LibUtilityCurrentTimestampMillisecond,
  LibUtilityCurrentTimestampMinute,
  LibUtilityCurrentTimestampMonth,
  LibUtilityCurrentTimestampNow,
  LibUtilityCurrentTimestampPadLeft,
  LibUtilityCurrentTimestampPadLeftCurrentWidth,
  LibUtilityCurrentTimestampPadLeftNumber,
  LibUtilityCurrentTimestampPadLeftReturns,
  LibUtilityCurrentTimestampPadLeftWidth,
  LibUtilityCurrentTimestampRawDate,
  LibUtilityCurrentTimestampRawHours,
  LibUtilityCurrentTimestampRawMinutes,
  LibUtilityCurrentTimestampRawMonth,
  LibUtilityCurrentTimestampRawSeconds,
  LibUtilityCurrentTimestampReturns,
  LibUtilityCurrentTimestampSecond,
  LibUtilityCurrentTimestampTimezoneAbs,
  LibUtilityCurrentTimestampTimezoneHours,
  LibUtilityCurrentTimestampTimezoneHoursTruncated,
  LibUtilityCurrentTimestampTimezoneMinutes,
  LibUtilityCurrentTimestampTimezoneOffsetMinutes,
  LibUtilityCurrentTimestampTimezoneSign,
  LibUtilityCurrentTimestampYear,
  LibUtilityDetectShellCurrentPlatform,
  LibUtilityDetectShellReturns,
  LibUtilityDiscoverPathsWithFileBackwardCurrentDirectory,
  LibUtilityDiscoverPathsWithFileDirection,
  LibUtilityDiscoverPathsWithFileEntries,
  LibUtilityDiscoverPathsWithFileFileName,
  LibUtilityDiscoverPathsWithFileForwardCurrentDirectory,
  LibUtilityDiscoverPathsWithFileHasTargetFile,
  LibUtilityDiscoverPathsWithFileQueue,
  LibUtilityDiscoverPathsWithFileRealDirectory,
  LibUtilityDiscoverPathsWithFileResults,
  LibUtilityDiscoverPathsWithFileReturns,
  LibUtilityDiscoverPathsWithFileRootDirectory,
  LibUtilityDiscoverPathsWithFileSkipDirectories,
  LibUtilityDiscoverPathsWithFileStartDirectory,
  LibUtilityDiscoverPathsWithFileTargetPath,
  LibUtilityDiscoverPathsWithFileVisited,
  LibUtilityExecuteShellCommand,
  LibUtilityExecuteShellCommandName,
  LibUtilityExecuteShellCommandOnPath,
  LibUtilityExecuteShellErrorOutput,
  LibUtilityExecuteShellExecAsync,
  LibUtilityExecuteShellExecResult,
  LibUtilityExecuteShellFullCommand,
  LibUtilityExecuteShellQuotePosix,
  LibUtilityExecuteShellQuotePosixPattern,
  LibUtilityExecuteShellQuotePosixReturns,
  LibUtilityExecuteShellQuotePosixString,
  LibUtilityExecuteShellQuoteWindows,
  LibUtilityExecuteShellQuoteWindowsPattern,
  LibUtilityExecuteShellQuoteWindowsReturns,
  LibUtilityExecuteShellQuoteWindowsString,
  LibUtilityExecuteShellReturns,
  LibUtilityExecuteShellShell,
  LibUtilityExecuteShellStderr,
  LibUtilityExecuteShellStdout,
  LibUtilityExecuteShellSuccessOutput,
  LibUtilityIsCommandExistsBin,
  LibUtilityIsCommandExistsChildProcess,
  LibUtilityIsCommandExistsCommand,
  LibUtilityIsCommandExistsCommandArguments,
  LibUtilityIsCommandExistsIsWin,
  LibUtilityIsCommandExistsReturns,
  LibUtilityIsExecuteShellErrorError,
  LibUtilityIsExecuteShellErrorHasCode,
  LibUtilityIsExecuteShellErrorHasCommand,
  LibUtilityIsExecuteShellErrorHasKilled,
  LibUtilityIsExecuteShellErrorHasSignal,
  LibUtilityIsExecuteShellErrorHasStderr,
  LibUtilityIsExecuteShellErrorHasStdout,
  LibUtilityIsExecuteShellErrorObject,
  LibUtilityIsExecuteShellErrorTypeGuard,
  LibUtilityIsFileIdenticalComparisonResult,
  LibUtilityIsFileIdenticalExistingFilePath,
  LibUtilityIsFileIdenticalIsIdentical,
  LibUtilityIsFileIdenticalNewFileContents,
  LibUtilityIsFileIdenticalOldFileContents,
  LibUtilityIsFileIdenticalProposedContents,
  LibUtilityIsFileIdenticalReturns,
  LibUtilityIsFileIdenticalSerialized,
  LibUtilityIsIgnoredFileFilename,
  LibUtilityIsIgnoredFileIgnoreFiles,
  LibUtilityIsIgnoredFileNormalizedFilename,
  LibUtilityIsIgnoredFileNormalizedPattern,
  LibUtilityIsIgnoredFileReturns,
  LibUtilityIsIgnoredFileStrippedPattern,
  LibUtilityIsIgnoredFileSuffix,
  LibUtilityIsPlainObjectPrototype,
  LibUtilityIsPlainObjectTypeGuard,
  LibUtilityIsPlainObjectValue,
  LibUtilityIsProjectRootCurrentDirectory,
  LibUtilityIsProjectRootGreaterThanOneMessage,
  LibUtilityIsProjectRootLessThanOneMessage,
  LibUtilityIsProjectRootLocations,
  LibUtilityIsProjectRootNotProjectRootDirectoryMessage,
  LibUtilityIsProjectRootReturns,
  LibUtilityLoadWorkspaceManifestsAbsolutePackageJsonPath,
  LibUtilityLoadWorkspaceManifestsAbsoluteWorkspacePath,
  LibUtilityLoadWorkspaceManifestsLoadErrorMessage,
  LibUtilityLoadWorkspaceManifestsOptions,
  LibUtilityLoadWorkspaceManifestsPackageJsons,
  LibUtilityLoadWorkspaceManifestsParsedFile,
  LibUtilityLoadWorkspaceManifestsProjectRoot,
  LibUtilityLoadWorkspaceManifestsRawFile,
  LibUtilityLoadWorkspaceManifestsRelativeWorkspacePath,
  LibUtilityLoadWorkspaceManifestsReturns,
  LibUtilityLoadWorkspaceManifestsWorkspaceManifest,
  LibUtilityLoadWorkspaceManifestsWorkspaces,
  LibUtilityParseLinuxOsReleaseFileReturns,
  LibUtilityParseLinuxOsReleaseTextKey,
  LibUtilityParseLinuxOsReleaseTextLines,
  LibUtilityParseLinuxOsReleaseTextOsReleaseEntries,
  LibUtilityParseLinuxOsReleaseTextParts,
  LibUtilityParseLinuxOsReleaseTextRest,
  LibUtilityParseLinuxOsReleaseTextReturns,
  LibUtilityParseLinuxOsReleaseTextText,
  LibUtilityParseLinuxOsReleaseTextValue,
  LibUtilityParseWindowsRegistryQueryPaths,
  LibUtilityParseWindowsRegistryQueryRegistryKeys,
  LibUtilityParseWindowsRegistryQueryRegistryPaths,
  LibUtilityParseWindowsRegistryQueryReturns,
  LibUtilityParseWindowsRegistryTextLines,
  LibUtilityParseWindowsRegistryTextMatches,
  LibUtilityParseWindowsRegistryTextRegistryKey,
  LibUtilityParseWindowsRegistryTextRegistryKeyData,
  LibUtilityParseWindowsRegistryTextRegistryKeys,
  LibUtilityParseWindowsRegistryTextRegistryKeyType,
  LibUtilityParseWindowsRegistryTextReturns,
  LibUtilityParseWindowsRegistryTextText,
  LibUtilityPathExistsPath,
  LibUtilityPathExistsReturns,
  LibUtilityRenameFileWithDateCounter,
  LibUtilityRenameFileWithDateCounterLabel,
  LibUtilityRenameFileWithDateDirectory,
  LibUtilityRenameFileWithDateNewFileName,
  LibUtilityRenameFileWithDateNewPath,
  LibUtilityRenameFileWithDateNow,
  LibUtilityRenameFileWithDateOldPath,
  LibUtilityRenameFileWithDateParsed,
  LibUtilityRenameFileWithDatePrefix,
  LibUtilityRenameFileWithDateReturns,
  LibUtilityRenameFileWithDateSuffix,
  LibUtilityRenameFileWithDateTimestamp,
  LibUtilityResolveTemplatePathCurrentDirectory,
  LibUtilityResolveTemplatePathFilePath,
  LibUtilityResolveTemplatePathImportMetaUrl,
  LibUtilityResolveTemplatePathReturns,
  LibUtilityResolveTemplatePathSubpath,
  LibUtilitySaveGeneratedFileContents,
  LibUtilitySaveGeneratedFileCurrentDirectory,
  LibUtilitySaveGeneratedFileDisplayName,
  LibUtilitySaveGeneratedFileHeader,
  LibUtilitySaveGeneratedFileHeaderBanner,
  LibUtilitySaveGeneratedFileParentDirectory,
  LibUtilitySaveGeneratedFilePrefixedContents,
  LibUtilitySaveGeneratedFileReplaceFile,
  LibUtilitySaveGeneratedFileReturns,
  LibUtilitySaveGeneratedFileTargetPath,
  LibUtilitySaveWorkspaceManifestReplaceFile,
  LibUtilitySaveWorkspaceManifestReturns,
  LibUtilitySaveWorkspaceManifestWorkspace,
} from '../types/lib/utility.d.ts';

/**
 * Lib - Utility - Current Timestamp.
 *
 * Produces an ISO-8601-style bracket timestamp used by Logger when the
 * LOG_TIME environment variable is enabled, including milliseconds and UTC offset.
 *
 * @returns {LibUtilityCurrentTimestampReturns}
 *
 * @since 0.11.0
 */
export function currentTimestamp(): LibUtilityCurrentTimestampReturns {
  const now: LibUtilityCurrentTimestampNow = new Date();

  /**
   * Lib - Utility - Current Timestamp - Pad Left.
   *
   * Zero-pads a numeric component to the requested width, enforcing a minimum of
   * two digits for month, day, hour, minute, and second.
   *
   * @param {LibUtilityCurrentTimestampPadLeftNumber} number - Number.
   * @param {LibUtilityCurrentTimestampPadLeftWidth}  width  - Width.
   *
   * @private
   *
   * @returns {LibUtilityCurrentTimestampPadLeftReturns}
   *
   * @since 0.11.0
   */
  const padLeft: LibUtilityCurrentTimestampPadLeft = (number: LibUtilityCurrentTimestampPadLeftNumber, width: LibUtilityCurrentTimestampPadLeftWidth = 2): LibUtilityCurrentTimestampPadLeftReturns => {
    const currentWidth: LibUtilityCurrentTimestampPadLeftCurrentWidth = (width < 2) ? 2 : width;

    return number.toString().padStart(currentWidth, '0');
  };

  const year: LibUtilityCurrentTimestampYear = now.getFullYear();
  const rawMonth: LibUtilityCurrentTimestampRawMonth = now.getMonth() + 1;
  const month: LibUtilityCurrentTimestampMonth = padLeft(rawMonth);
  const rawDate: LibUtilityCurrentTimestampRawDate = now.getDate();
  const day: LibUtilityCurrentTimestampDay = padLeft(rawDate);
  const rawHours: LibUtilityCurrentTimestampRawHours = now.getHours();
  const hour: LibUtilityCurrentTimestampHour = padLeft(rawHours);
  const rawMinutes: LibUtilityCurrentTimestampRawMinutes = now.getMinutes();
  const minute: LibUtilityCurrentTimestampMinute = padLeft(rawMinutes);
  const rawSeconds: LibUtilityCurrentTimestampRawSeconds = now.getSeconds();
  const second: LibUtilityCurrentTimestampSecond = padLeft(rawSeconds);
  const millisecond: LibUtilityCurrentTimestampMillisecond = now.getMilliseconds().toString().padStart(3, '0');

  const timezoneOffsetMinutes: LibUtilityCurrentTimestampTimezoneOffsetMinutes = -now.getTimezoneOffset();
  const timezoneSign: LibUtilityCurrentTimestampTimezoneSign = (timezoneOffsetMinutes >= 0) ? '+' : '-';
  const timezoneAbs: LibUtilityCurrentTimestampTimezoneAbs = Math.abs(timezoneOffsetMinutes);
  const timezoneHoursTruncated: LibUtilityCurrentTimestampTimezoneHoursTruncated = Math.trunc(timezoneAbs / 60);
  const timezoneHours: LibUtilityCurrentTimestampTimezoneHours = padLeft(timezoneHoursTruncated);
  const timezoneMinutes: LibUtilityCurrentTimestampTimezoneMinutes = padLeft(timezoneAbs % 60);

  return `[${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond} ${timezoneSign}${timezoneHours}${timezoneMinutes}]`;
}

/**
 * Lib - Utility - Detect Shell.
 *
 * Returns the default shell path for the current operating system
 * so executeShell can wrap commands with the correct invocation syntax.
 *
 * @returns {LibUtilityDetectShellReturns}
 *
 * @since 0.11.0
 */
export function detectShell(): LibUtilityDetectShellReturns {
  const currentPlatform: LibUtilityDetectShellCurrentPlatform = platform();

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
 * @param {LibUtilityDiscoverPathsWithFileFileName}  fileName  - File name.
 * @param {LibUtilityDiscoverPathsWithFileDirection} direction - Direction.
 *
 * @returns {LibUtilityDiscoverPathsWithFileReturns}
 *
 * @since 0.11.0
 */
export async function discoverPathsWithFile(fileName: LibUtilityDiscoverPathsWithFileFileName, direction: LibUtilityDiscoverPathsWithFileDirection): LibUtilityDiscoverPathsWithFileReturns {
  const startDirectory: LibUtilityDiscoverPathsWithFileStartDirectory = process.cwd();
  const results: LibUtilityDiscoverPathsWithFileResults = [];

  if (direction === 'backward') {
    const rootDirectory: LibUtilityDiscoverPathsWithFileRootDirectory = parse(startDirectory).root;

    let currentDirectory: LibUtilityDiscoverPathsWithFileBackwardCurrentDirectory = startDirectory;

    while (true) {
      const targetPath: LibUtilityDiscoverPathsWithFileTargetPath = join(currentDirectory, fileName);

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
    const queue: LibUtilityDiscoverPathsWithFileQueue = [startDirectory];
    const visited: LibUtilityDiscoverPathsWithFileVisited = new Set();
    const skipDirectories: LibUtilityDiscoverPathsWithFileSkipDirectories = new Set(libItemSkipDirectories);

    while (queue.length > 0) {
      const currentDirectory: LibUtilityDiscoverPathsWithFileForwardCurrentDirectory = queue.shift();

      if (currentDirectory === undefined) {
        continue;
      }

      Logger.customize({
        name: 'discoverPathsWithFile',
        purpose: 'forward',
      }).debug(`Current directory: "${currentDirectory}"`);

      let realDirectory: LibUtilityDiscoverPathsWithFileRealDirectory = undefined;

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

      let entries: LibUtilityDiscoverPathsWithFileEntries = undefined;

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

      let hasTargetFile: LibUtilityDiscoverPathsWithFileHasTargetFile = false;

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
 * @param {LibUtilityExecuteShellCommand} command - Command.
 *
 * @returns {LibUtilityExecuteShellReturns}
 *
 * @since 0.11.0
 */
export async function executeShell(command: LibUtilityExecuteShellCommand): LibUtilityExecuteShellReturns {
  const execAsync: LibUtilityExecuteShellExecAsync = promisify(exec);
  const shell: LibUtilityExecuteShellShell = detectShell();

  // Extract the command name (first token) to check PATH availability.
  const commandName: LibUtilityExecuteShellCommandName = command.split(' ')[0] ?? '';
  const commandOnPath: LibUtilityExecuteShellCommandOnPath = await isCommandExists(commandName);

  let fullCommand: LibUtilityExecuteShellFullCommand = command;

  /**
   * Lib - Utility - Execute Shell - Quote Posix.
   *
   * Escapes single quotes inside a command string so it can be safely wrapped in
   * single-quoted POSIX shell invocations for zsh, bash, and sh.
   *
   * @param {LibUtilityExecuteShellQuotePosixString} string - String.
   *
   * @private
   *
   * @returns {LibUtilityExecuteShellQuotePosixReturns}
   *
   * @since 0.11.0
   */
  const quotePosix: LibUtilityExecuteShellQuotePosix = (string: LibUtilityExecuteShellQuotePosixString): LibUtilityExecuteShellQuotePosixReturns => {
    const pattern: LibUtilityExecuteShellQuotePosixPattern = new RegExp(LIB_REGEX_CHARACTER_SINGLE_QUOTE.source, 'g');

    return string.replace(pattern, '\'\\\'\'');
  };

  /**
   * Lib - Utility - Execute Shell - Quote Windows.
   *
   * Escapes double quotes inside a command string so it can be
   * safely embedded in a cmd.exe /c invocation on Windows.
   *
   * @param {LibUtilityExecuteShellQuoteWindowsString} string - String.
   *
   * @private
   *
   * @returns {LibUtilityExecuteShellQuoteWindowsReturns}
   *
   * @since 0.11.0
   */
  const quoteWindows: LibUtilityExecuteShellQuoteWindows = (string: LibUtilityExecuteShellQuoteWindowsString): LibUtilityExecuteShellQuoteWindowsReturns => {
    const pattern: LibUtilityExecuteShellQuoteWindowsPattern = new RegExp(LIB_REGEX_CHARACTER_DOUBLE_QUOTE.source, 'g');

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
    const execResult: LibUtilityExecuteShellExecResult = await execAsync(fullCommand, {
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

    const stdout: LibUtilityExecuteShellStdout = execResult['stdout'];
    const stderr: LibUtilityExecuteShellStderr = execResult['stderr'];

    const output: LibUtilityExecuteShellSuccessOutput = {
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
    const output: LibUtilityExecuteShellErrorOutput = {
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
 * @param {LibUtilityIsCommandExistsCommand} command - Command.
 *
 * @returns {LibUtilityIsCommandExistsReturns}
 *
 * @since 0.11.0
 */
export async function isCommandExists(command: LibUtilityIsCommandExistsCommand): LibUtilityIsCommandExistsReturns {
  const isWin: LibUtilityIsCommandExistsIsWin = platform() === 'win32';
  const bin: LibUtilityIsCommandExistsBin = (isWin === true) ? 'where' : 'sh';
  const commandArguments: LibUtilityIsCommandExistsCommandArguments = (isWin === true) ? [
    '/Q',
    command,
  ] : [
    '-c',
    `command -v "${command}" >/dev/null 2>&1`,
  ];

  return new Promise((promiseResolve) => {
    const childProcess: LibUtilityIsCommandExistsChildProcess = spawn(bin, commandArguments, {
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
 * @param {LibUtilityIsExecuteShellErrorError} error - Error.
 *
 * @returns {boolean}
 *
 * @since 0.11.0
 */
export function isExecuteShellError(error: LibUtilityIsExecuteShellErrorError): error is LibUtilityIsExecuteShellErrorTypeGuard {
  if (error === null || typeof error !== 'object') {
    return false;
  }

  const object: LibUtilityIsExecuteShellErrorObject = error as LibUtilityIsExecuteShellErrorObject;
  const hasCommand: LibUtilityIsExecuteShellErrorHasCommand = 'cmd' in object && typeof object['cmd'] === 'string';
  const hasKilled: LibUtilityIsExecuteShellErrorHasKilled = 'killed' in object && typeof object['killed'] === 'boolean';
  const hasCode: LibUtilityIsExecuteShellErrorHasCode = 'code' in object && typeof object['code'] === 'number';
  const hasSignal: LibUtilityIsExecuteShellErrorHasSignal = 'signal' in object && typeof object['signal'] === 'string';
  const hasStdout: LibUtilityIsExecuteShellErrorHasStdout = 'stdout' in object && typeof object['stdout'] === 'string';
  const hasStderr: LibUtilityIsExecuteShellErrorHasStderr = 'stderr' in object && typeof object['stderr'] === 'string';

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
 * @param {LibUtilityIsFileIdenticalExistingFilePath} existingFilePath - Existing file path.
 * @param {LibUtilityIsFileIdenticalProposedContents} proposedContents - Proposed contents.
 *
 * @returns {LibUtilityIsFileIdenticalReturns}
 *
 * @since 0.13.0
 */
export async function isFileIdentical(existingFilePath: LibUtilityIsFileIdenticalExistingFilePath, proposedContents: LibUtilityIsFileIdenticalProposedContents): LibUtilityIsFileIdenticalReturns {
  let oldFileContents: LibUtilityIsFileIdenticalOldFileContents = undefined;
  let newFileContents: LibUtilityIsFileIdenticalNewFileContents = undefined;

  if (typeof proposedContents === 'string') {
    newFileContents = proposedContents;
  } else {
    let serialized: LibUtilityIsFileIdenticalSerialized = undefined;

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

  const isIdentical: LibUtilityIsFileIdenticalIsIdentical = oldFileContents === newFileContents;

  const comparisonResult: LibUtilityIsFileIdenticalComparisonResult = (isIdentical === true) ? 'matches' : 'differs from';

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
 * @param {LibUtilityIsIgnoredFileFilename}    filename    - Filename.
 * @param {LibUtilityIsIgnoredFileIgnoreFiles} ignoreFiles - Ignore files.
 *
 * @returns {LibUtilityIsIgnoredFileReturns}
 *
 * @since 0.11.0
 */
export function isIgnoredFile(filename: LibUtilityIsIgnoredFileFilename, ignoreFiles: LibUtilityIsIgnoredFileIgnoreFiles): LibUtilityIsIgnoredFileReturns {
  const normalizedFilename: LibUtilityIsIgnoredFileNormalizedFilename = filename.replaceAll('\\', '/');

  for (const pattern of ignoreFiles) {
    const strippedPattern: LibUtilityIsIgnoredFileStrippedPattern = (pattern.startsWith('./') === true) ? pattern.slice(2) : pattern;
    const normalizedPattern: LibUtilityIsIgnoredFileNormalizedPattern = strippedPattern.replaceAll('\\', '/');

    // Wildcard prefix pattern (e.g., "*.test.ts").
    if (normalizedPattern.startsWith('*') === true) {
      const suffix: LibUtilityIsIgnoredFileSuffix = normalizedPattern.slice(1);

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
 * @param {LibUtilityIsPlainObjectValue} value - Value.
 *
 * @returns {boolean}
 *
 * @since 0.13.0
 */
export function isPlainObject(value: LibUtilityIsPlainObjectValue): value is LibUtilityIsPlainObjectTypeGuard {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (Array.isArray(value) === true) {
    return false;
  }

  const prototype: LibUtilityIsPlainObjectPrototype = Object.getPrototypeOf(value);

  // Treat both ordinary object literals and prototype-less dictionaries (Object.create(null)) as "plain".
  return prototype === Object.prototype || prototype === null;
}

/**
 * Lib - Utility - Is Project Root.
 *
 * Validates that the working directory is the monorepo root by
 * scanning backward for exactly one package.json in the directory tree.
 *
 * @param {LibUtilityIsProjectRootCurrentDirectory} currentDirectory - Current directory.
 *
 * @returns {LibUtilityIsProjectRootReturns}
 *
 * @since 0.13.0
 */
export async function isProjectRoot(currentDirectory: LibUtilityIsProjectRootCurrentDirectory): LibUtilityIsProjectRootReturns {
  const locations: LibUtilityIsProjectRootLocations = await discoverPathsWithFile('package.json', 'backward');

  Logger.customize({
    name: 'isProjectRoot',
    purpose: 'detectedLocations',
  }).debug(locations);

  // If command was ran outside of project root directory.
  if (locations.length < 1) {
    const lessThanOneMessage: LibUtilityIsProjectRootLessThanOneMessage = [
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
    const greaterThanOneMessage: LibUtilityIsProjectRootGreaterThanOneMessage = [
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
    const notProjectRootDirectoryMessage: LibUtilityIsProjectRootNotProjectRootDirectoryMessage = [
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
 * @param {LibUtilityLoadWorkspaceManifestsOptions} options - Options.
 *
 * @returns {LibUtilityLoadWorkspaceManifestsReturns}
 *
 * @since 0.13.0
 */
export async function loadWorkspaceManifests(options: LibUtilityLoadWorkspaceManifestsOptions): LibUtilityLoadWorkspaceManifestsReturns {
  const projectRoot: LibUtilityLoadWorkspaceManifestsProjectRoot = options['projectRoot'];
  const workspaces: LibUtilityLoadWorkspaceManifestsWorkspaces = options['workspaces'];

  const packageJsons: LibUtilityLoadWorkspaceManifestsPackageJsons = [];

  for (const workspace of workspaces) {
    const relativeWorkspacePath: LibUtilityLoadWorkspaceManifestsRelativeWorkspacePath = workspace[0];
    const workspaceManifest: LibUtilityLoadWorkspaceManifestsWorkspaceManifest = workspace[1];

    const absoluteWorkspacePath: LibUtilityLoadWorkspaceManifestsAbsoluteWorkspacePath = resolve(projectRoot, relativeWorkspacePath);
    const absolutePackageJsonPath: LibUtilityLoadWorkspaceManifestsAbsolutePackageJsonPath = join(absoluteWorkspacePath, 'package.json');

    try {
      const rawFile: LibUtilityLoadWorkspaceManifestsRawFile = await fs.readFile(absolutePackageJsonPath, 'utf-8');
      const parsedFile: LibUtilityLoadWorkspaceManifestsParsedFile = JSON.parse(rawFile);

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
      const loadErrorMessage: LibUtilityLoadWorkspaceManifestsLoadErrorMessage = [
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
 * Lib - Utility - Parse Linux OS Release File.
 *
 * Reads /etc/os-release via executeShell and parses it into
 * key-value pairs, called by the version utility to display the Linux distro name.
 *
 * @returns {LibUtilityParseLinuxOsReleaseFileReturns}
 *
 * @since 0.13.0
 */
export async function parseLinuxOsReleaseFile(): LibUtilityParseLinuxOsReleaseFileReturns {
  return parseLinuxOsReleaseText((await executeShell('cat /etc/os-release'))['textOut']);
}

/**
 * Lib - Utility - Parse Linux OS Release Text.
 *
 * Splits raw os-release file content into a record of key-value
 * pairs, stripping comments and surrounding quotes from each value.
 *
 * @param {LibUtilityParseLinuxOsReleaseTextText} text - Text.
 *
 * @returns {LibUtilityParseLinuxOsReleaseTextReturns}
 *
 * @since 0.13.0
 */
export function parseLinuxOsReleaseText(text: LibUtilityParseLinuxOsReleaseTextText): LibUtilityParseLinuxOsReleaseTextReturns {
  const lines: LibUtilityParseLinuxOsReleaseTextLines = text.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);
  const osReleaseEntries: LibUtilityParseLinuxOsReleaseTextOsReleaseEntries = {};

  for (const line of lines) {
    // Skip empty or commented lines.
    if (line === '' || line.startsWith('#') === true) {
      continue;
    }

    const parts: LibUtilityParseLinuxOsReleaseTextParts = line.split('=');
    const key: LibUtilityParseLinuxOsReleaseTextKey = parts[0];
    const rest: LibUtilityParseLinuxOsReleaseTextRest = parts.slice(1);

    if (key === undefined) {
      continue;
    }

    // Rejoin in case value itself contains "=".
    let value: LibUtilityParseLinuxOsReleaseTextValue = rest.join('=');

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
 * @param {LibUtilityParseWindowsRegistryQueryRegistryPaths} registryPaths - Registry paths.
 *
 * @returns {LibUtilityParseWindowsRegistryQueryReturns}
 *
 * @since 0.13.0
 */
export async function parseWindowsRegistryQuery(registryPaths: LibUtilityParseWindowsRegistryQueryRegistryPaths): LibUtilityParseWindowsRegistryQueryReturns {
  const paths: LibUtilityParseWindowsRegistryQueryPaths = (Array.isArray(registryPaths) === true) ? registryPaths : [registryPaths];

  for (const path of paths) {
    const registryKeys: LibUtilityParseWindowsRegistryQueryRegistryKeys = parseWindowsRegistryText((await executeShell(`reg query "${path}"`))['textOut']);

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
 * @param {LibUtilityParseWindowsRegistryTextText} text - Text.
 *
 * @returns {LibUtilityParseWindowsRegistryTextReturns}
 *
 * @since 0.13.0
 */
export function parseWindowsRegistryText(text: LibUtilityParseWindowsRegistryTextText): LibUtilityParseWindowsRegistryTextReturns {
  const lines: LibUtilityParseWindowsRegistryTextLines = text.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);
  const registryKeys: LibUtilityParseWindowsRegistryTextRegistryKeys = {};

  for (const line of lines) {
    const matches: LibUtilityParseWindowsRegistryTextMatches = line.match(LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE);

    if (matches !== null) {
      const registryKey: LibUtilityParseWindowsRegistryTextRegistryKey = matches[1];
      const registryKeyType: LibUtilityParseWindowsRegistryTextRegistryKeyType = matches[2];
      const registryKeyData: LibUtilityParseWindowsRegistryTextRegistryKeyData = matches[3];

      if (
        registryKey !== undefined
        && registryKeyType !== undefined
        && registryKeyData !== undefined
      ) {
        Reflect.set(registryKeys, registryKey, {
          type: registryKeyType as LibUtilityParseWindowsRegistryTextRegistryKeyType,
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
 * @param {LibUtilityPathExistsPath} path - Path.
 *
 * @returns {LibUtilityPathExistsReturns}
 *
 * @since 0.11.0
 */
export async function pathExists(path: LibUtilityPathExistsPath): LibUtilityPathExistsReturns {
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
 * @param {LibUtilityRenameFileWithDateOldPath} oldPath - Old path.
 *
 * @returns {LibUtilityRenameFileWithDateReturns}
 *
 * @since 0.13.0
 */
export async function renameFileWithDate(oldPath: LibUtilityRenameFileWithDateOldPath): LibUtilityRenameFileWithDateReturns {
  const directory: LibUtilityRenameFileWithDateDirectory = dirname(oldPath);
  const parsed: LibUtilityRenameFileWithDateParsed = parse(oldPath);
  const prefix: LibUtilityRenameFileWithDatePrefix = (parsed.base.startsWith('.') === true) ? parsed.base : parsed.name;
  const suffix: LibUtilityRenameFileWithDateSuffix = (parsed.base.startsWith('.') === true) ? '' : parsed.ext.replace(LIB_REGEX_PATTERN_LEADING_DOT, '');

  const now: LibUtilityRenameFileWithDateNow = new Date();
  const timestamp: LibUtilityRenameFileWithDateTimestamp = [
    now.getUTCFullYear(),
    (now.getUTCMonth() + 1).toString().padStart(2, '0'),
    now.getUTCDate().toString().padStart(2, '0'),
  ].join('-');

  let counter: LibUtilityRenameFileWithDateCounter = 1;

  while (true) {
    const counterLabel: LibUtilityRenameFileWithDateCounterLabel = counter.toString().padStart(4, '0');
    const newFileName: LibUtilityRenameFileWithDateNewFileName = (suffix !== '') ? `${prefix}.${timestamp}_${counterLabel}.nova-backup.${suffix}` : `${prefix}.${timestamp}_${counterLabel}.nova-backup`;
    const newPath: LibUtilityRenameFileWithDateNewPath = join(directory, newFileName);

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
 * @param {LibUtilityResolveTemplatePathImportMetaUrl} importMetaUrl - Import meta url.
 * @param {LibUtilityResolveTemplatePathSubpath}       subpath       - Subpath.
 *
 * @returns {LibUtilityResolveTemplatePathReturns}
 *
 * @since 0.11.0
 */
export function resolveTemplatePath(importMetaUrl: LibUtilityResolveTemplatePathImportMetaUrl, subpath: LibUtilityResolveTemplatePathSubpath): LibUtilityResolveTemplatePathReturns {
  const filePath: LibUtilityResolveTemplatePathFilePath = fileURLToPath(importMetaUrl);
  const currentDirectory: LibUtilityResolveTemplatePathCurrentDirectory = dirname(filePath);

  return join(currentDirectory, '..', '..', '..', '..', 'templates', subpath);
}

/**
 * Lib - Utility - Build Generated File Header.
 *
 * Builds a banner string for a generated file; comment syntax is inferred
 * from targetPath; returned string ends with a trailing blank line.
 *
 * @param {LibUtilityBuildGeneratedFileHeaderOptions} options - Options.
 *
 * @returns {LibUtilityBuildGeneratedFileHeaderReturns}
 *
 * @since 0.16.3
 */
export function buildGeneratedFileHeader(options: LibUtilityBuildGeneratedFileHeaderOptions): LibUtilityBuildGeneratedFileHeaderReturns {
  const baseName: LibUtilityBuildGeneratedFileHeaderBaseName = basename(options['targetPath']);
  const extension: LibUtilityBuildGeneratedFileHeaderExtension = extname(options['targetPath']).toLowerCase();
  const docsUrl: LibUtilityBuildGeneratedFileHeaderDocsUrl = `${LIB_CONSTANTS_DOCS_BASE_URL}/docs/${options['docsSlug']}`;
  const ruleLine: LibUtilityBuildGeneratedFileHeaderRuleLine = (options['mode'] === 'fillable') ? 'You may fill in values for existing keys only — do not add, rename, or remove keys.' : 'Do not edit manually.';

  const isHashStyle: LibUtilityBuildGeneratedFileHeaderIsHashStyle = (
    extension === '.yml'
    || extension === '.yaml'
    || baseName === '.editorconfig'
    || baseName === '.gitignore'
    || baseName === '.env'
    || baseName.startsWith('.env.')
  );
  const isMarkdownStyle: LibUtilityBuildGeneratedFileHeaderIsMarkdownStyle = (extension === '.md');

  if (isHashStyle === true) {
    const lines: LibUtilityBuildGeneratedFileHeaderLines = [
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
    const lines: LibUtilityBuildGeneratedFileHeaderLines = [
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
 * @param {LibUtilitySaveGeneratedFileTargetPath}  targetPath  - Target path.
 * @param {LibUtilitySaveGeneratedFileContents}    contents    - Contents.
 * @param {LibUtilitySaveGeneratedFileReplaceFile} replaceFile - Replace file.
 * @param {LibUtilitySaveGeneratedFileHeader}      [header]    - Optional header metadata.
 *
 * @returns {LibUtilitySaveGeneratedFileReturns}
 *
 * @since 0.11.0
 */
export async function saveGeneratedFile(targetPath: LibUtilitySaveGeneratedFileTargetPath, contents: LibUtilitySaveGeneratedFileContents, replaceFile: LibUtilitySaveGeneratedFileReplaceFile, header?: LibUtilitySaveGeneratedFileHeader): LibUtilitySaveGeneratedFileReturns {
  const parentDirectory: LibUtilitySaveGeneratedFileParentDirectory = dirname(targetPath);
  const currentDirectory: LibUtilitySaveGeneratedFileCurrentDirectory = process.cwd();
  const displayName: LibUtilitySaveGeneratedFileDisplayName = relative(currentDirectory, targetPath);

  let prefixedContents: LibUtilitySaveGeneratedFilePrefixedContents = undefined;

  if (header !== undefined) {
    const headerBanner: LibUtilitySaveGeneratedFileHeaderBanner = buildGeneratedFileHeader({
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
 * @param {LibUtilitySaveWorkspaceManifestWorkspace}   workspace   - Workspace.
 * @param {LibUtilitySaveWorkspaceManifestReplaceFile} replaceFile - Replace file.
 *
 * @returns {LibUtilitySaveWorkspaceManifestReturns}
 *
 * @since 0.13.0
 */
export async function saveWorkspaceManifest(workspace: LibUtilitySaveWorkspaceManifestWorkspace, replaceFile: LibUtilitySaveWorkspaceManifestReplaceFile): LibUtilitySaveWorkspaceManifestReturns {
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
