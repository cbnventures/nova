import { execFileSync } from 'node:child_process';
import {
  existsSync,
  readdirSync,
  unlinkSync,
} from 'node:fs';
import {
  join,
  relative,
  sep,
} from 'node:path';

import { libItemOperatingSystemFilesByPlatform, libItemSkipDirectories } from '../../../lib/item.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { isProjectRoot } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_CurrentDirectory,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_EnabledFileNames,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Entries,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_EntryPath,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Files,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Queue,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Returns,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_RootDirectory,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_SkipDirectories,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_EnabledFileNames,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_FileValue,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Platforms,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_PlatformSettings,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Returns,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Settings,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_SupportedFileNames,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_GitDirectory,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_GitOutput,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_Returns,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_RootDirectory,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_TrackedPaths,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileName,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileNameLower,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileToggle,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_Returns,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Action,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Config,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_CurrentDirectory,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Diagnostics,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_EnabledFileNames,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_FilePaths,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_MiscellaneousRecipes,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_NovaConfig,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Options,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_RelativePath,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_RemovedCount,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_RemoveOperatingSystemFiles,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Returns,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Settings,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_TrackedPaths,
  Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_TrackedSkippedCount,
} from '../../../types/cli/recipe/miscellaneous/remove-operating-system-files.d.ts';

/**
 * CLI - Recipe - Miscellaneous - Remove Operating System Files.
 *
 * Removes only explicitly enabled, reviewed operating-system artifacts while
 * protecting symlinks, Git metadata, dependencies, and tracked project files.
 *
 * @since 0.32.0
 */
export class Runner {
  /**
   * CLI - Recipe - Miscellaneous - Remove Operating System Files - Run.
   *
   * Loads the closed cleanup configuration, discovers matching regular files in
   * the project root, and removes or previews only untracked candidates.
   *
   * @param {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Returns}
   *
   * @since 0.32.0
   */
  public static async run(options: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Options): Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const novaConfig: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_NovaConfig = new LibNovaConfig();
    const config: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Config = await novaConfig.load();
    const diagnostics: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Diagnostics = novaConfig.diagnostics();

    if (diagnostics.some((diagnostic) => diagnostic['severity'] === 'error') === true) {
      Logger.error('Unable to remove operating-system files because "nova.config.json" is invalid.');

      process.exitCode = 1;

      return;
    }

    const miscellaneousRecipes: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_MiscellaneousRecipes = (config['recipes'] !== undefined) ? config['recipes']['miscellaneous'] : undefined;
    const removeOperatingSystemFiles: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_RemoveOperatingSystemFiles = (miscellaneousRecipes !== undefined) ? miscellaneousRecipes['remove-operating-system-files'] : undefined;

    if (removeOperatingSystemFiles === undefined || removeOperatingSystemFiles['enabled'] !== true) {
      Logger.warn('Skipping remove-operating-system-files. The recipe is not enabled in the "nova.config.json" file.');

      return;
    }

    const settings: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Settings = removeOperatingSystemFiles['settings'] ?? {};
    const enabledFileNames: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_EnabledFileNames = Runner.getEnabledFileNames(settings);

    if (enabledFileNames.length === 0) {
      Logger.info('No operating-system files are enabled for removal.');

      return;
    }

    const trackedPaths: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_TrackedPaths = Runner.getTrackedPaths(currentDirectory);

    if (trackedPaths === undefined) {
      process.exitCode = 1;

      return;
    }

    const filePaths: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_FilePaths = Runner.discoverFiles(currentDirectory, enabledFileNames);
    let removedCount: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_RemovedCount = 0;
    let trackedSkippedCount: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_TrackedSkippedCount = 0;

    for (const filePath of filePaths) {
      const relativePath: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_RelativePath = relative(currentDirectory, filePath).split(sep).join('/');

      if (trackedPaths.has(relativePath) === true) {
        Logger.warn(`Skipping Git-tracked operating-system file "${relativePath}".`);

        trackedSkippedCount += 1;

        continue;
      }

      if (options['dryRun'] === true) {
        Logger.info(`Would remove operating-system file "${relativePath}".`);

        removedCount += 1;

        continue;
      }

      unlinkSync(filePath);

      Logger.info(`Removed operating-system file "${relativePath}".`);

      removedCount += 1;
    }

    if (removedCount === 0 && trackedSkippedCount === 0) {
      Logger.info('No enabled operating-system files were found.');

      return;
    }

    const action: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Action = (options['dryRun'] === true) ? 'would be removed' : 'removed';

    Logger.info(`${removedCount} operating-system file(s) ${action}; ${trackedSkippedCount} Git-tracked file(s) protected.`);

    return;
  }

  /**
   * CLI - Recipe - Miscellaneous - Remove Operating System Files - Discover Files.
   *
   * Walks project-owned directories without following symbolic links and returns
   * regular files matching one of the enabled closed file toggles.
   *
   * @param {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_RootDirectory}    rootDirectory    - Root directory.
   * @param {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_EnabledFileNames} enabledFileNames - Enabled file names.
   *
   * @private
   *
   * @returns {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Returns}
   *
   * @since 0.32.0
   */
  private static discoverFiles(rootDirectory: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_RootDirectory, enabledFileNames: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_EnabledFileNames): Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Returns {
    const skipDirectories: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_SkipDirectories = new Set([
      '.git',
      ...libItemSkipDirectories,
    ]);
    const queue: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Queue = [rootDirectory];
    const files: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Files = [];

    while (queue.length > 0) {
      const currentDirectory: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_CurrentDirectory = queue.shift();

      if (currentDirectory === undefined) {
        continue;
      }

      const entries: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Entries = readdirSync(currentDirectory, { withFileTypes: true });

      for (const entry of entries) {
        const entryPath: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_EntryPath = join(currentDirectory, entry.name);

        if (entry.isSymbolicLink() === true) {
          continue;
        }

        if (entry.isDirectory() === true) {
          if (skipDirectories.has(entry.name) === false) {
            queue.push(entryPath);
          }

          continue;
        }

        if (entry.isFile() === true && enabledFileNames.some((enabledFileName) => Runner.isMatchingFile(entry.name, enabledFileName)) === true) {
          files.push(entryPath);
        }
      }
    }

    return files.sort((filePathA, filePathB) => filePathA.localeCompare(filePathB));
  }

  /**
   * CLI - Recipe - Miscellaneous - Remove Operating System Files - Get Enabled File Names.
   *
   * Flattens the closed platform settings into the exact file-toggle names that the
   * discovery walk should recognize on any host operating system.
   *
   * @param {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Settings} settings - Settings.
   *
   * @private
   *
   * @returns {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Returns}
   *
   * @since 0.32.0
   */
  private static getEnabledFileNames(settings: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Settings): Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Returns {
    const enabledFileNames: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_EnabledFileNames = [];
    const platforms: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Platforms = Object.keys(libItemOperatingSystemFilesByPlatform) as Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Platforms;

    for (const platform of platforms) {
      const platformSettings: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_PlatformSettings = settings[platform];

      if (platformSettings === undefined) {
        continue;
      }

      const supportedFileNames: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_SupportedFileNames = libItemOperatingSystemFilesByPlatform[platform];

      for (const supportedFileName of supportedFileNames) {
        const fileValue: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_FileValue = Reflect.get(platformSettings, supportedFileName);

        if (fileValue === true) {
          enabledFileNames.push(supportedFileName);
        }
      }
    }

    return enabledFileNames;
  }

  /**
   * CLI - Recipe - Miscellaneous - Remove Operating System Files - Get Tracked Paths.
   *
   * Reads Git's tracked-file index when the project has repository metadata and
   * refuses cleanup entirely when that protection list cannot be determined.
   *
   * @param {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_RootDirectory} rootDirectory - Root directory.
   *
   * @private
   *
   * @returns {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_Returns}
   *
   * @since 0.32.0
   */
  private static getTrackedPaths(rootDirectory: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_RootDirectory): Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_Returns {
    const trackedPaths: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_TrackedPaths = new Set();
    const gitDirectory: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_GitDirectory = join(rootDirectory, '.git');

    if (existsSync(gitDirectory) === false) {
      return trackedPaths;
    }

    try {
      const gitOutput: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_GitOutput = execFileSync('git', [
        '-C',
        rootDirectory,
        'ls-files',
        '-z',
      ], {
        encoding: 'utf-8',
        stdio: [
          'ignore',
          'pipe',
          'ignore',
        ],
      });

      for (const trackedPath of gitOutput.split('\0')) {
        if (trackedPath.length > 0) {
          trackedPaths.add(trackedPath);
        }
      }

      return trackedPaths;
    } catch (error) {
      Logger.error(`Unable to read Git's tracked-file index: ${String(error)}`);

      return undefined;
    }
  }

  /**
   * CLI - Recipe - Miscellaneous - Remove Operating System Files - Is Matching File.
   *
   * Maps each closed configuration toggle to the exact documented artifact name or
   * AppleDouble prefix without accepting caller-provided patterns.
   *
   * @param {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileName}   fileName   - File name.
   * @param {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileToggle} fileToggle - File toggle.
   *
   * @private
   *
   * @returns {Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_Returns}
   *
   * @since 0.32.0
   */
  private static isMatchingFile(fileName: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileName, fileToggle: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileToggle): Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_Returns {
    const fileNameLower: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileNameLower = fileName.toLowerCase();

    switch (fileToggle) {
      case 'appleDouble': {
        return fileName.startsWith('._');
      }

      case 'desktopServicesStore': {
        return fileName === '.DS_Store';
      }

      case 'enhancedThumbnailDatabase': {
        return fileNameLower === 'ehthumbs.db';
      }

      case 'enhancedVistaThumbnailDatabase': {
        return fileNameLower === 'ehthumbs_vista.db';
      }

      case 'thumbnailDatabase': {
        return fileNameLower === 'thumbs.db';
      }

      default: {
        return false;
      }
    }
  }
}
