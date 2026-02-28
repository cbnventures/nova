import { exec, spawn } from 'child_process';
import { promises as fs } from 'fs';
import { platform } from 'os';
import {
  dirname,
  join,
  parse,
  resolve,
} from 'path';
import { promisify } from 'util';

import { itemSkipDirectories } from '@/lib/item.js';
import {
  CHARACTER_DOUBLE_QUOTE,
  CHARACTER_SINGLE_QUOTE,
  LINEBREAK_CRLF_OR_LF,
  PATTERN_DOUBLE_QUOTED_STRING_CAPTURE,
  PATTERN_REGISTRY_QUERY_LINE,
} from '@/lib/regex.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CurrentTimestampPadLeftNumber,
  CurrentTimestampPadLeftReturns,
  CurrentTimestampPadLeftWidth,
  CurrentTimestampReturns,
  DetectShellReturns,
  DiscoverPathsWithFileDirection,
  DiscoverPathsWithFileFileName,
  DiscoverPathsWithFileRealDirectory,
  DiscoverPathsWithFileResults,
  DiscoverPathsWithFileReturns,
  DiscoverPathsWithFileSkipDirectories,
  DiscoverPathsWithFileVisited,
  ExecuteShellCommand,
  ExecuteShellQuotePosixString,
  ExecuteShellQuoteWindowsString,
  ExecuteShellReturns,
  IsCommandExistsCommand,
  IsCommandExistsReturns,
  IsExecuteShellErrorError,
  IsExecuteShellErrorObject,
  IsExecuteShellErrorTypeGuard,
  IsFileIdenticalExistingFilePath,
  IsFileIdenticalProposedContents,
  IsFileIdenticalReturns,
  IsPlainObjectTypeGuard,
  IsPlainObjectValue,
  IsProjectRootCurrentDirectory,
  IsProjectRootReturns,
  LoadWorkspaceManifestsOptions,
  LoadWorkspaceManifestsPackageJsons,
  LoadWorkspaceManifestsParsedFile,
  LoadWorkspaceManifestsReturns,
  ParseLinuxOsReleaseFileOsReleaseEntries,
  ParseLinuxOsReleaseFileReturns,
  ParseLinuxOsReleaseTextReturns,
  ParseLinuxOsReleaseTextText,
  ParseWindowsRegistryQueryRegistryKeys,
  ParseWindowsRegistryQueryRegistryPaths,
  ParseWindowsRegistryQueryReturns,
  ParseWindowsRegistryTextRegistryKeyType,
  ParseWindowsRegistryTextReturns,
  ParseWindowsRegistryTextText,
  PathExistsPath,
  PathExistsReturns,
  RenameFileWithDateOldPath,
  RenameFileWithDatePrefix,
  RenameFileWithDateReturns,
  RenameFileWithDateSuffix,
  SaveWorkspaceManifestReplaceFile,
  SaveWorkspaceManifestReturns,
  SaveWorkspaceManifestWorkspace,
} from '@/types/lib/utility.d.ts';

/**
 * Current timestamp.
 *
 * @returns {CurrentTimestampReturns}
 *
 * @since 1.0.0
 */
export function currentTimestamp(): CurrentTimestampReturns {
  const now = new Date();

  /**
   * Current timestamp - Pad left.
   *
   * @param {CurrentTimestampPadLeftNumber} number - Number.
   * @param {CurrentTimestampPadLeftWidth}  width  - Width.
   *
   * @private
   *
   * @returns {CurrentTimestampPadLeftReturns}
   *
   * @since 1.0.0
   */
  const padLeft = (number: CurrentTimestampPadLeftNumber, width: CurrentTimestampPadLeftWidth = 2): CurrentTimestampPadLeftReturns => {
    const currentWidth = (width < 2) ? 2 : width;

    return number.toString().padStart(currentWidth, '0');
  };

  const year = now.getFullYear();
  const month = padLeft(now.getMonth() + 1);
  const day = padLeft(now.getDate());
  const hour = padLeft(now.getHours());
  const minute = padLeft(now.getMinutes());
  const second = padLeft(now.getSeconds());
  const millisecond = now.getMilliseconds().toString().padStart(3, '0');

  const timezoneOffsetMinutes = -now.getTimezoneOffset();
  const timezoneSign = (timezoneOffsetMinutes >= 0) ? '+' : '-';
  const timezoneAbs = Math.abs(timezoneOffsetMinutes);
  const timezoneHours = padLeft(Math.trunc(timezoneAbs / 60));
  const timezoneMinutes = padLeft(timezoneAbs % 60);

  return `[${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond} ${timezoneSign}${timezoneHours}${timezoneMinutes}]`;
}

/**
 * Detect shell.
 *
 * @returns {DetectShellReturns}
 *
 * @since 1.0.0
 */
export function detectShell(): DetectShellReturns {
  const currentPlatform = platform();

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
  if (['aix', 'sunos'].includes(currentPlatform)) {
    return '/bin/ksh';
  }

  return '/bin/sh';
}

/**
 * Discover paths with file.
 *
 * @param {DiscoverPathsWithFileFileName}  fileName  - File name.
 * @param {DiscoverPathsWithFileDirection} direction - Direction.
 *
 * @returns {DiscoverPathsWithFileReturns}
 *
 * @since 1.0.0
 */
export async function discoverPathsWithFile(fileName: DiscoverPathsWithFileFileName, direction: DiscoverPathsWithFileDirection): DiscoverPathsWithFileReturns {
  const startDirectory = process.cwd();
  const results: DiscoverPathsWithFileResults = [];

  if (direction === 'backward') {
    const rootDirectory = parse(startDirectory).root;

    let currentDirectory = startDirectory;

    while (true) {
      const targetPath = join(currentDirectory, fileName);

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
    const queue = [startDirectory];
    const visited: DiscoverPathsWithFileVisited = new Set();
    const skipDirectories: DiscoverPathsWithFileSkipDirectories = new Set(itemSkipDirectories);

    while (queue.length > 0) {
      const currentDirectory = queue.shift();

      if (currentDirectory === undefined) {
        continue;
      }

      Logger.customize({
        name: 'discoverPathsWithFile',
        purpose: 'forward',
      }).debug(`Current directory: "${currentDirectory}"`);

      let realDirectory: DiscoverPathsWithFileRealDirectory;

      try {
        // Resolve symlinks to avoid visiting the same location multiple times.
        realDirectory = await fs.realpath(currentDirectory);
      } catch {
        continue;
      }

      if (visited.has(realDirectory)) {
        continue;
      }

      visited.add(realDirectory);

      let entries;

      try {
        // Attempt to read the directory contents.
        entries = await fs.readdir(realDirectory, { withFileTypes: true });
      } catch {
        continue;
      }

      let hasTargetFile = false;

      for (const entry of entries) {
        // If directory contains the target file.
        if (entry.isFile() && entry.name === fileName) {
          hasTargetFile = true;

          continue;
        }

        if (!entry.isDirectory()) {
          continue;
        }

        // Skips all dot-prefixed directory and what's listed in "skipDirectories".
        if (entry.name.startsWith('.') || skipDirectories.has(entry.name)) {
          continue;
        }

        const nextDirectory = join(realDirectory, entry.name);

        // Queue sub-directories for traversal.
        queue.push(nextDirectory);
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
 * Execute shell.
 *
 * @param {ExecuteShellCommand} command - Command.
 *
 * @returns {ExecuteShellReturns}
 *
 * @since 1.0.0
 */
export async function executeShell(command: ExecuteShellCommand): ExecuteShellReturns {
  const execAsync = promisify(exec);
  const shell = detectShell();

  let fullCommand = command;

  const quotePosix = (string: ExecuteShellQuotePosixString) => string.replace(new RegExp(CHARACTER_SINGLE_QUOTE, 'g'), '\'\\\'\'');
  const quoteWindows = (string: ExecuteShellQuoteWindowsString) => string.replace(new RegExp(CHARACTER_DOUBLE_QUOTE, 'g'), '"');

  // Windows.
  if (shell === 'cmd.exe') {
    fullCommand = `cmd.exe /d /s /c "${quoteWindows(fullCommand)}"`;
  }

  // macOS.
  if (shell === '/bin/zsh') {
    fullCommand = `/bin/zsh -l -i -c '${quotePosix(fullCommand)}'`;
  }

  // Linux.
  if (shell === '/bin/bash') {
    fullCommand = `setsid -w /bin/bash -l -i -c '${quotePosix(fullCommand)}' </dev/null`;
  }

  // Fallback.
  if (shell === '/bin/sh') {
    fullCommand = `/bin/sh -c '${quotePosix(fullCommand)}'`;
  }

  try {
    const { stdout, stderr } = await execAsync(fullCommand, {
      encoding: 'utf-8',
      windowsHide: true,
      timeout: 15000,
      env: {
        ...process.env,
        ...(await isCommandExists('corepack')) ? {
          COREPACK_ENABLE_STRICT: '0',
        } : {},
        ...(process.env['_VOLTA_TOOL_RECURSION'] !== undefined) ? {
          PATH: [
            ...(process.env['ProgramW6432']) ? [`${process.env['ProgramW6432']}\\Volta\\`] : [],
            ...(process.env['LOCALAPPDATA']) ? [`${process.env['LOCALAPPDATA']}\\Volta\\bin`] : [],
            ...(process.env['PATH']) ? [process.env['PATH']] : [],
          ].join(';'),
        } : {},
        ...(shell === '/bin/bash') ? {
          PAGER: 'cat',
        } : {},
      },
      cwd: process.cwd(),
      maxBuffer: 8 * 1024 * 1024, // 8 MB.
    });

    const output = {
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
    const output = {
      textOut: '',
      textError: '',
      code: 1,
    };

    if (isExecuteShellError(error)) {
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
 * Is command exists.
 *
 * @param {IsCommandExistsCommand} command - Command.
 *
 * @returns {IsCommandExistsReturns}
 *
 * @since 1.0.0
 */
export async function isCommandExists(command: IsCommandExistsCommand): IsCommandExistsReturns {
  const isWin = platform() === 'win32';
  const bin = (isWin) ? 'where' : 'sh';
  const args = (isWin) ? ['/Q', command] : ['-c', `command -v "${command}" >/dev/null 2>&1`];

  return new Promise((resolve) => {
    const childProcess = spawn(bin, args, {
      stdio: 'ignore',
    });

    // If the command is missing from PATH, Node emits an "error" (ENOENT).
    childProcess.once('error', () => {
      return resolve(false);
    });

    // If the command exists.
    childProcess.once('exit', (code) => {
      return resolve(code === 0);
    });
  });
}

/**
 * Is execute shell error.
 *
 * @param {IsExecuteShellErrorError} error - Error.
 *
 * @returns {boolean}
 *
 * @since 1.0.0
 */
export function isExecuteShellError(error: IsExecuteShellErrorError): error is IsExecuteShellErrorTypeGuard {
  if (error === null || typeof error !== 'object') {
    return false;
  }

  const object = error as IsExecuteShellErrorObject;
  const hasCmd = 'cmd' in object && typeof object['cmd'] === 'string';
  const hasKilled = 'killed' in object && typeof object['killed'] === 'boolean';
  const hasCode = 'code' in object && typeof object['code'] === 'number';
  const hasSignal = 'signal' in object && typeof object['signal'] === 'string';
  const hasStdout = 'stdout' in object && typeof object['stdout'] === 'string';
  const hasStderr = 'stderr' in object && typeof object['stderr'] === 'string';

  // Treat presence of any canonical "execAsync" fields as sufficient.
  return hasCmd || hasKilled || hasCode || hasSignal || hasStdout || hasStderr;
}

/**
 * Is file identical.
 *
 * @param {IsFileIdenticalExistingFilePath} existingFilePath - Existing file path.
 * @param {IsFileIdenticalProposedContents} proposedContents - Proposed contents.
 *
 * @returns {IsFileIdenticalReturns}
 *
 * @since 1.0.0
 */
export async function isFileIdentical(existingFilePath: IsFileIdenticalExistingFilePath, proposedContents: IsFileIdenticalProposedContents): IsFileIdenticalReturns {
  let oldFileContents;
  let newFileContents;

  if (typeof proposedContents === 'string') {
    newFileContents = proposedContents;
  } else {
    let serialized;

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

  const isIdentical = oldFileContents === newFileContents;

  const comparisonResult = (isIdentical) ? 'matches' : 'differs from';

  Logger.customize({
    name: 'isFileIdentical',
    purpose: (isIdentical) ? 'identical' : 'different',
  }).debug(`Existing file "${existingFilePath}" ${comparisonResult} proposed contents.`);

  return isIdentical;
}

/**
 * Is plain object.
 *
 * @param {IsPlainObjectValue} value - Value.
 *
 * @returns {boolean}
 *
 * @since 1.0.0
 */
export function isPlainObject(value: IsPlainObjectValue): value is IsPlainObjectTypeGuard {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  // Treat both ordinary object literals and prototype-less dictionaries (Object.create(null)) as "plain".
  return prototype === Object.prototype || prototype === null;
}

/**
 * Is project root.
 *
 * @param {IsProjectRootCurrentDirectory} currentDirectory - Current directory.
 *
 * @returns {IsProjectRootReturns}
 *
 * @since 1.0.0
 */
export async function isProjectRoot(currentDirectory: IsProjectRootCurrentDirectory): IsProjectRootReturns {
  const locations = await discoverPathsWithFile('package.json', 'backward');

  Logger.customize({
    name: 'isProjectRoot',
    purpose: 'detectedLocations',
  }).debug(locations);

  // If command was ran outside of project root directory.
  if (locations.length < 1) {
    Logger.customize({
      name: 'isProjectRoot',
      purpose: 'lessThanOne',
    }).error([
      'No "package.json" files were found. Re-run this command inside the project root directory.',
      `Current directory is "${currentDirectory}"`,
    ].join('\n'));

    return false;
  }

  // If command was ran inside a monorepo package.
  if (locations.length > 1) {
    Logger.customize({
      name: 'isProjectRoot',
      purpose: 'greaterThanOne',
    }).error([
      'Multiple "package.json" files were found. Re-run this command inside the project root directory.',
      `Current directory is "${currentDirectory}"`,
    ].join('\n'));

    return false;
  }

  // If command was ran outside the project root directory.
  if (locations.length === 1 && locations[0] !== currentDirectory) {
    Logger.customize({
      name: 'isProjectRoot',
      purpose: 'notProjectRootDir',
    }).error([
      'Must be run inside the project root directory.',
      `Current directory is "${currentDirectory}"`,
    ].join('\n'));

    return false;
  }

  return true;
}

/**
 * Load workspace manifests.
 *
 * @param {LoadWorkspaceManifestsOptions} options - Options.
 *
 * @returns {LoadWorkspaceManifestsReturns}
 *
 * @since 1.0.0
 */
export async function loadWorkspaceManifests(options: LoadWorkspaceManifestsOptions): LoadWorkspaceManifestsReturns {
  const { projectRoot, workspaces } = options;

  const packageJsons: LoadWorkspaceManifestsPackageJsons = [];

  for (const workspace of workspaces) {
    const relativeWorkspacePath = workspace[0];
    const workspaceManifest = workspace[1];

    const absoluteWorkspacePath = resolve(projectRoot, relativeWorkspacePath);
    const absolutePackageJsonPath = join(absoluteWorkspacePath, 'package.json');

    try {
      const rawFile = await fs.readFile(absolutePackageJsonPath, 'utf-8');
      const parsedFile: LoadWorkspaceManifestsParsedFile = JSON.parse(rawFile);

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
      Logger.customize({
        name: 'loadWorkspaceManifests',
        purpose: 'load',
      }).error([
        `Skipping workspace "${relativeWorkspacePath}" because the "package.json" file is inaccessible or invalid.`,
        error,
      ].join('\n'));
    }
  }

  return packageJsons;
}

/**
 * Parse linux os release file.
 *
 * @returns {ParseLinuxOsReleaseFileReturns}
 *
 * @since 1.0.0
 */
export async function parseLinuxOsReleaseFile(): ParseLinuxOsReleaseFileReturns {
  const query = await executeShell('cat /etc/os-release');

  return parseLinuxOsReleaseText(query.textOut);
}

/**
 * Parse linux os release text.
 *
 * @param {ParseLinuxOsReleaseTextText} text - Text.
 *
 * @returns {ParseLinuxOsReleaseTextReturns}
 *
 * @since 1.0.0
 */
export function parseLinuxOsReleaseText(text: ParseLinuxOsReleaseTextText): ParseLinuxOsReleaseTextReturns {
  const lines = text.split(LINEBREAK_CRLF_OR_LF);
  const osReleaseEntries: ParseLinuxOsReleaseFileOsReleaseEntries = {};

  for (const line of lines) {
    // Skip empty or commented lines.
    if (line === '' || line.startsWith('#')) {
      continue;
    }

    const [key, ...rest] = line.split('=');

    if (key === undefined) {
      continue;
    }

    // Rejoin in case value itself contains "=".
    let value = rest.join('=');

    // Strip wrapping quotes.
    value = value.replace(PATTERN_DOUBLE_QUOTED_STRING_CAPTURE, '$1');

    Reflect.set(osReleaseEntries, key, value);
  }

  return osReleaseEntries;
}

/**
 * Parse windows registry query.
 *
 * @param {ParseWindowsRegistryQueryRegistryPaths} registryPaths - Registry paths.
 *
 * @returns {ParseWindowsRegistryQueryReturns}
 *
 * @since 1.0.0
 */
export async function parseWindowsRegistryQuery(registryPaths: ParseWindowsRegistryQueryRegistryPaths): ParseWindowsRegistryQueryReturns {
  const paths = Array.isArray(registryPaths) ? registryPaths : [registryPaths];

  for (const path of paths) {
    const query = await executeShell(`reg query "${path}"`);
    const registryKeys = parseWindowsRegistryText(query.textOut);

    // If we parsed any keys for this path, return immediately (fallback behavior).
    if (Object.keys(registryKeys).length > 0) {
      return registryKeys;
    }
  }

  // No results.
  return {};
}

/**
 * Parse windows registry text.
 *
 * @param {ParseWindowsRegistryTextText} text - Text.
 *
 * @returns {ParseWindowsRegistryTextReturns}
 *
 * @since 1.0.0
 */
export function parseWindowsRegistryText(text: ParseWindowsRegistryTextText): ParseWindowsRegistryTextReturns {
  const lines = text.split(LINEBREAK_CRLF_OR_LF);
  const registryKeys: ParseWindowsRegistryQueryRegistryKeys = {};

  for (const line of lines) {
    const matches = line.match(PATTERN_REGISTRY_QUERY_LINE);

    if (matches !== null) {
      const registryKey = matches[1];
      const registryKeyType = matches[2];
      const registryKeyData = matches[3];

      if (
        registryKey !== undefined
        && registryKeyType !== undefined
        && registryKeyData !== undefined
      ) {
        Reflect.set(registryKeys, registryKey, {
          type: registryKeyType as ParseWindowsRegistryTextRegistryKeyType,
          data: registryKeyData.trim(),
        });
      }
    }
  }

  return registryKeys;
}

/**
 * Path exists.
 *
 * @param {PathExistsPath} path - Path.
 *
 * @returns {PathExistsReturns}
 *
 * @since 1.0.0
 */
export async function pathExists(path: PathExistsPath): PathExistsReturns {
  try {
    await fs.access(path);

    return true;
  } catch {
    return false;
  }
}

/**
 * Rename file with date.
 *
 * @param {RenameFileWithDateOldPath} oldPath - Old path.
 * @param {RenameFileWithDatePrefix}  prefix  - Prefix.
 * @param {RenameFileWithDateSuffix}  suffix  - Suffix.
 *
 * @returns {RenameFileWithDateReturns}
 *
 * @since 1.0.0
 */
export async function renameFileWithDate(oldPath: RenameFileWithDateOldPath, prefix: RenameFileWithDatePrefix, suffix: RenameFileWithDateSuffix): RenameFileWithDateReturns {
  const directory = dirname(oldPath);

  const now = new Date();
  const timestamp = [
    now.getUTCFullYear(),
    (now.getUTCMonth() + 1).toString().padStart(2, '0'),
    now.getUTCDate().toString().padStart(2, '0'),
  ].join('-');

  let counter = 1;

  while (true) {
    const counterLabel = counter.toString().padStart(4, '0');
    const newFileName = `${prefix}.${timestamp}_${counterLabel}.${suffix}`;
    const newPath = join(directory, newFileName);

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
 * Save workspace manifest.
 *
 * @param {SaveWorkspaceManifestWorkspace} workspace     - Workspace.
 * @param {SaveWorkspaceManifestReplaceFile} replaceFile - Replace file.
 *
 * @returns {SaveWorkspaceManifestReturns}
 *
 * @since 1.0.0
 */
export async function saveWorkspaceManifest(workspace: SaveWorkspaceManifestWorkspace, replaceFile: SaveWorkspaceManifestReplaceFile): SaveWorkspaceManifestReturns {
  // No changes detected, skip touching the filesystem.
  if (await isFileIdentical(workspace.filePath, workspace.fileContents)) {
    return;
  }

  // Rename existing file if user chooses not to replace file.
  if (replaceFile === false) {
    await renameFileWithDate(workspace.filePath, 'package', 'json');
  }

  const packageJson = JSON.stringify(workspace.fileContents, null, 2);
  const packageContents = `${packageJson}\n`;

  await fs.writeFile(
    workspace.filePath,
    packageContents,
    'utf-8',
  );
}
