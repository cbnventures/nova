import type MarkdownTable from '../../../toolkit/markdown-table.js';

import type {
  Shared_LinuxOsReleaseEntries as SharedLinuxOsReleaseEntries,
  Shared_ShellOutput as SharedShellOutput,
  Shared_WindowsRegistryKey as SharedWindowsRegistryKey,
  Shared_WindowsRegistryKeys as SharedWindowsRegistryKeys,
} from '../../shared.d.ts';

/**
 * CLI - Utility - Version - Get Browser Version.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Version_Runner_GetBrowserVersion_Returns = Promise<Cli_Utility_Version_Runner_GetBrowserVersion_Browsers>;

export type Cli_Utility_Version_Runner_GetBrowserVersion_CurrentPlatform = NodeJS.Platform;

export type Cli_Utility_Version_Runner_GetBrowserVersion_Browsers = Record<string, string>;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinSupportedBrowsers = Record<string, string>;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinPairs = PromiseSettledResult<readonly [string, string] | null>[];

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinKey = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinAppName = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinSystem = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinUser = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinPathResults = [boolean, boolean];

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinHasSystem = boolean;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinHasUser = boolean;

export type Cli_Utility_Version_Runner_GetBrowserVersion_AppPath = string | null;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinVersionResponse = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinMacosAppVersion = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_DarwinEntries = (readonly [string, string])[];

export type Cli_Utility_Version_Runner_GetBrowserVersion_WindowsSupportedBrowsers = Record<string, string>;

export type Cli_Utility_Version_Runner_GetBrowserVersion_WindowsPairs = PromiseSettledResult<readonly [string, string] | null>[];

export type Cli_Utility_Version_Runner_GetBrowserVersion_WindowsKey = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_WindowsExeName = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_WindowsQuery = SharedWindowsRegistryKeys;

export type Cli_Utility_Version_Runner_GetBrowserVersion_WindowsExePath = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_WindowsAppVersion = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_WindowsEntries = (readonly [string, string])[];

export type Cli_Utility_Version_Runner_GetBrowserVersion_LinuxSupportedBrowsers = Record<string, string>;

export type Cli_Utility_Version_Runner_GetBrowserVersion_LinuxPairs = PromiseSettledResult<readonly [string, string] | null>[];

export type Cli_Utility_Version_Runner_GetBrowserVersion_LinuxKey = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_LinuxCommandName = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_LinuxCommandResponse = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetBrowserVersion_LinuxVersionResponse = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetBrowserVersion_LinuxCliToolVersion = string;

export type Cli_Utility_Version_Runner_GetBrowserVersion_LinuxEntries = (readonly [string, string])[];

/**
 * CLI - Utility - Version - Get Environment Manager Version.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_Returns = Promise<Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_Managers>;

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_EnvResults = [SharedShellOutput, SharedShellOutput];

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_VoltaVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_Managers = Record<string, string>;

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmPosixMatchResult = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmPosixMatch = string | undefined;

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmWindowsMatchResult = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmWindowsMatch = string | undefined;

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_VoltaMatchResult = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_VoltaMatch = string | undefined;

/**
 * CLI - Utility - Version - Get Interpreter Version.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Version_Runner_GetInterpreterVersion_Returns = Promise<Cli_Utility_Version_Runner_GetInterpreterVersion_Interpreters>;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_InterpreterResults = [SharedShellOutput, SharedShellOutput];

export type Cli_Utility_Version_Runner_GetInterpreterVersion_JavaVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_RustVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_Interpreters = Record<string, string>;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatch = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatchVersion = string;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatchDistribution = string;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatchBuild = string;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatch = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchVersion = string;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchBuildHash = string;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchBuildDate = string;

export type Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchSource = string;

/**
 * CLI - Utility - Version - Get Node Version.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Version_Runner_GetNodeVersion_Returns = Promise<Cli_Utility_Version_Runner_GetNodeVersion_Tools>;

export type Cli_Utility_Version_Runner_GetNodeVersion_NodeResults = [SharedShellOutput, SharedShellOutput, SharedShellOutput, SharedShellOutput, SharedShellOutput];

export type Cli_Utility_Version_Runner_GetNodeVersion_NodeJsVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetNodeVersion_NpmVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetNodeVersion_YarnVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetNodeVersion_PnpmVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetNodeVersion_BunVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetNodeVersion_Tools = Record<string, string>;

export type Cli_Utility_Version_Runner_GetNodeVersion_NodeJsMatchResult = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetNodeVersion_NodeJsMatch = string | undefined;

export type Cli_Utility_Version_Runner_GetNodeVersion_NpmMatchResult = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetNodeVersion_NpmMatch = string | undefined;

export type Cli_Utility_Version_Runner_GetNodeVersion_YarnMatchResult = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetNodeVersion_YarnMatch = string | undefined;

export type Cli_Utility_Version_Runner_GetNodeVersion_PnpmMatchResult = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetNodeVersion_PnpmMatch = string | undefined;

export type Cli_Utility_Version_Runner_GetNodeVersion_BunMatchResult = RegExpMatchArray | null;

export type Cli_Utility_Version_Runner_GetNodeVersion_BunMatch = string | undefined;

/**
 * CLI - Utility - Version - Get OS Version.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Version_Runner_GetOsVersion_Returns = Promise<{
  name: Cli_Utility_Version_Runner_GetOsVersion_Name;
  version: Cli_Utility_Version_Runner_GetOsVersion_CurrentVersion;
  architecture: Cli_Utility_Version_Runner_GetOsVersion_Architecture;
  build: Cli_Utility_Version_Runner_GetOsVersion_Build;
  kernel: Cli_Utility_Version_Runner_GetOsVersion_Kernel;
}>;

export type Cli_Utility_Version_Runner_GetOsVersion_CurrentPlatform = NodeJS.Platform;

export type Cli_Utility_Version_Runner_GetOsVersion_Architecture = NodeJS.Architecture;

export type Cli_Utility_Version_Runner_GetOsVersion_Kernel = string;

export type Cli_Utility_Version_Runner_GetOsVersion_Name = NodeJS.Platform | string;

export type Cli_Utility_Version_Runner_GetOsVersion_CurrentVersion = string;

export type Cli_Utility_Version_Runner_GetOsVersion_Build = string;

export type Cli_Utility_Version_Runner_GetOsVersion_DarwinResults = [SharedShellOutput, SharedShellOutput, SharedShellOutput];

export type Cli_Utility_Version_Runner_GetOsVersion_ProductName = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetOsVersion_ProductVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetOsVersion_BuildVersion = SharedShellOutput;

export type Cli_Utility_Version_Runner_GetOsVersion_RegistryQuery = SharedWindowsRegistryKeys;

export type Cli_Utility_Version_Runner_GetOsVersion_CurrentBuildEntry = SharedWindowsRegistryKey | undefined;

export type Cli_Utility_Version_Runner_GetOsVersion_CurrentBuildNumberEntry = SharedWindowsRegistryKey | undefined;

export type Cli_Utility_Version_Runner_GetOsVersion_UpdateBuildRevisionEntry = SharedWindowsRegistryKey | undefined;

export type Cli_Utility_Version_Runner_GetOsVersion_ProductNameEntry = SharedWindowsRegistryKey | undefined;

export type Cli_Utility_Version_Runner_GetOsVersion_DisplayVersionEntry = SharedWindowsRegistryKey | undefined;

export type Cli_Utility_Version_Runner_GetOsVersion_ReleaseIdEntry = SharedWindowsRegistryKey | undefined;

export type Cli_Utility_Version_Runner_GetOsVersion_CurrentBuild = string | undefined;

export type Cli_Utility_Version_Runner_GetOsVersion_UpdateBuildRevision = string | undefined;

export type Cli_Utility_Version_Runner_GetOsVersion_OsRelease = SharedLinuxOsReleaseEntries;

/**
 * CLI - Utility - Version - Print.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Version_Runner_Print_List = Record<string, Record<string, string>>;

export type Cli_Utility_Version_Runner_Print_Returns = void;

export type Cli_Utility_Version_Runner_Print_Category = string;

export type Cli_Utility_Version_Runner_Print_RowsByKey = Record<string, string>;

export type Cli_Utility_Version_Runner_Print_Table = MarkdownTable;

export type Cli_Utility_Version_Runner_Print_RowKey = string;

export type Cli_Utility_Version_Runner_Print_RowValue = string;

export type Cli_Utility_Version_Runner_Print_CategoryLabel = string;

/**
 * CLI - Utility - Version - Run.
 *
 * @since 0.11.0
 */
export type Cli_Utility_Version_Runner_Run_Options_All = true;

export type Cli_Utility_Version_Runner_Run_Options_Browser = true;

export type Cli_Utility_Version_Runner_Run_Options_Env = true;

export type Cli_Utility_Version_Runner_Run_Options_Interpreter = true;

export type Cli_Utility_Version_Runner_Run_Options_Node = true;

export type Cli_Utility_Version_Runner_Run_Options_Os = true;

export type Cli_Utility_Version_Runner_Run_Options = {
  all?: Cli_Utility_Version_Runner_Run_Options_All;
  browser?: Cli_Utility_Version_Runner_Run_Options_Browser;
  env?: Cli_Utility_Version_Runner_Run_Options_Env;
  interpreter?: Cli_Utility_Version_Runner_Run_Options_Interpreter;
  node?: Cli_Utility_Version_Runner_Run_Options_Node;
  os?: Cli_Utility_Version_Runner_Run_Options_Os;
};

export type Cli_Utility_Version_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_Version_Runner_Run_Tasks = Promise<[keyof Cli_Utility_Version_Runner_Run_List, Record<string, string>]>[];

export type Cli_Utility_Version_Runner_Run_Results = [keyof Cli_Utility_Version_Runner_Run_List, Record<string, string>][];

export type Cli_Utility_Version_Runner_Run_List = Record<string, Record<string, string>>;
