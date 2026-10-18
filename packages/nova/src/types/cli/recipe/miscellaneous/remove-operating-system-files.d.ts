import type { Dirent } from 'node:fs';

import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Recipes_Miscellaneous,
  Shared_NovaConfigOperatingSystemFileName,
  Shared_NovaConfigOperatingSystemFilePlatform,
  Shared_NovaConfigOperatingSystemFileRecipeEntry,
  Shared_NovaConfigOperatingSystemFileSettings,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - Miscellaneous - Remove Operating System Files - Discover Files.
 *
 * @since 0.32.0
 */
export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_RootDirectory = string;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_EnabledFileNames = Shared_NovaConfigOperatingSystemFileName[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Returns = string[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_SkipDirectories = Set<string>;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Queue = string[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Files = string[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_CurrentDirectory = string | undefined;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_Entries = Dirent[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_DiscoverFiles_EntryPath = string;

/**
 * CLI - Recipe - Miscellaneous - Remove Operating System Files - Get Enabled File Names.
 *
 * @since 0.32.0
 */
export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Settings = Shared_NovaConfigOperatingSystemFileSettings;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Returns = Shared_NovaConfigOperatingSystemFileName[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_EnabledFileNames = Shared_NovaConfigOperatingSystemFileName[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_Platforms = Shared_NovaConfigOperatingSystemFilePlatform[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_PlatformSettings = Shared_NovaConfigOperatingSystemFileSettings[Shared_NovaConfigOperatingSystemFilePlatform];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_SupportedFileNames = readonly Shared_NovaConfigOperatingSystemFileName[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetEnabledFileNames_FileValue = unknown;

/**
 * CLI - Recipe - Miscellaneous - Remove Operating System Files - Get Tracked Paths.
 *
 * @since 0.32.0
 */
export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_RootDirectory = string;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_Returns = Set<string> | undefined;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_TrackedPaths = Set<string>;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_GitDirectory = string;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_GetTrackedPaths_GitOutput = string;

/**
 * CLI - Recipe - Miscellaneous - Remove Operating System Files - Is Matching File.
 *
 * @since 0.32.0
 */
export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileName = string;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileToggle = Shared_NovaConfigOperatingSystemFileName;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_Returns = boolean;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_IsMatchingFile_FileNameLower = string;

/**
 * CLI - Recipe - Miscellaneous - Remove Operating System Files - Run.
 *
 * @since 0.32.0
 */
export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Options_DryRun = boolean | undefined;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Config = Shared_NovaConfig;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Diagnostics_Item_Severity = 'error' | 'warning';

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Diagnostics_Item_Message = string;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Diagnostics_Item = {
  severity: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Diagnostics_Item_Severity;
  message: Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Diagnostics_Item_Message;
};

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Diagnostics = Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Diagnostics_Item[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_MiscellaneousRecipes = Shared_NovaConfig_Recipes_Miscellaneous | undefined;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_RemoveOperatingSystemFiles = Shared_NovaConfigOperatingSystemFileRecipeEntry | undefined;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Settings = Shared_NovaConfigOperatingSystemFileSettings;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_EnabledFileNames = Shared_NovaConfigOperatingSystemFileName[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_TrackedPaths = Set<string> | undefined;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_FilePaths = string[];

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_RemovedCount = number;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_TrackedSkippedCount = number;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_RelativePath = string;

export type Cli_Recipe_Miscellaneous_RemoveOperatingSystemFiles_Runner_Run_Action = string;
