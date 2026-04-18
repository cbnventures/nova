import type MarkdownTable from '../../../toolkit/markdown-table.js';

import type {
  SharedLinuxOsReleaseEntries,
  SharedShellOutput,
  SharedWindowsRegistryKey,
  SharedWindowsRegistryKeys,
} from '../../shared.d.ts';

/**
 * CLI - Utility - Version - Get Browser Version.
 *
 * @since 0.11.0
 */
export type CliUtilityVersionGetBrowserVersionReturns = Promise<CliUtilityVersionGetBrowserVersionBrowsers>;

export type CliUtilityVersionGetBrowserVersionCurrentPlatform = NodeJS.Platform;

export type CliUtilityVersionGetBrowserVersionBrowsers = Record<string, string>;

export type CliUtilityVersionGetBrowserVersionDarwinSupportedBrowsers = Record<string, string>;

export type CliUtilityVersionGetBrowserVersionDarwinPairs = PromiseSettledResult<readonly [string, string] | null>[];

export type CliUtilityVersionGetBrowserVersionDarwinKey = string;

export type CliUtilityVersionGetBrowserVersionDarwinAppName = string;

export type CliUtilityVersionGetBrowserVersionDarwinSystem = string;

export type CliUtilityVersionGetBrowserVersionDarwinUser = string;

export type CliUtilityVersionGetBrowserVersionDarwinPathResults = [boolean, boolean];

export type CliUtilityVersionGetBrowserVersionDarwinHasSystem = boolean;

export type CliUtilityVersionGetBrowserVersionDarwinHasUser = boolean;

export type CliUtilityVersionGetBrowserVersionAppPath = string | null;

export type CliUtilityVersionGetBrowserVersionDarwinVersionResponse = SharedShellOutput;

export type CliUtilityVersionGetBrowserVersionDarwinMacosAppVersion = string;

export type CliUtilityVersionGetBrowserVersionDarwinEntries = (readonly [string, string])[];

export type CliUtilityVersionGetBrowserVersionWindowsSupportedBrowsers = Record<string, string>;

export type CliUtilityVersionGetBrowserVersionWindowsPairs = PromiseSettledResult<readonly [string, string] | null>[];

export type CliUtilityVersionGetBrowserVersionWindowsKey = string;

export type CliUtilityVersionGetBrowserVersionWindowsExeName = string;

export type CliUtilityVersionGetBrowserVersionWindowsQuery = SharedWindowsRegistryKeys;

export type CliUtilityVersionGetBrowserVersionWindowsExePath = string;

export type CliUtilityVersionGetBrowserVersionWindowsWindowsAppVersion = string;

export type CliUtilityVersionGetBrowserVersionWindowsEntries = (readonly [string, string])[];

export type CliUtilityVersionGetBrowserVersionLinuxSupportedBrowsers = Record<string, string>;

export type CliUtilityVersionGetBrowserVersionLinuxPairs = PromiseSettledResult<readonly [string, string] | null>[];

export type CliUtilityVersionGetBrowserVersionLinuxKey = string;

export type CliUtilityVersionGetBrowserVersionLinuxCommandName = string;

export type CliUtilityVersionGetBrowserVersionLinuxCommandResponse = SharedShellOutput;

export type CliUtilityVersionGetBrowserVersionLinuxVersionResponse = SharedShellOutput;

export type CliUtilityVersionGetBrowserVersionLinuxCliToolVersion = string;

export type CliUtilityVersionGetBrowserVersionLinuxEntries = (readonly [string, string])[];

/**
 * CLI - Utility - Version - Get Environment Manager Version.
 *
 * @since 0.11.0
 */
export type CliUtilityVersionGetEnvironmentManagerVersionReturns = Promise<CliUtilityVersionGetEnvironmentManagerVersionManagers>;

export type CliUtilityVersionGetEnvironmentManagerVersionEnvResults = [SharedShellOutput, SharedShellOutput];

export type CliUtilityVersionGetEnvironmentManagerVersionNvmVersion = SharedShellOutput;

export type CliUtilityVersionGetEnvironmentManagerVersionVoltaVersion = SharedShellOutput;

export type CliUtilityVersionGetEnvironmentManagerVersionManagers = Record<string, string>;

export type CliUtilityVersionGetEnvironmentManagerVersionNvmPosixMatchResult = RegExpMatchArray | null;

export type CliUtilityVersionGetEnvironmentManagerVersionNvmPosixMatch = string | undefined;

export type CliUtilityVersionGetEnvironmentManagerVersionNvmWindowsMatchResult = RegExpMatchArray | null;

export type CliUtilityVersionGetEnvironmentManagerVersionNvmWindowsMatch = string | undefined;

export type CliUtilityVersionGetEnvironmentManagerVersionVoltaMatchResult = RegExpMatchArray | null;

export type CliUtilityVersionGetEnvironmentManagerVersionVoltaMatch = string | undefined;

/**
 * CLI - Utility - Version - Get Interpreter Version.
 *
 * @since 0.11.0
 */
export type CliUtilityVersionGetInterpreterVersionReturns = Promise<CliUtilityVersionGetInterpreterVersionInterpreters>;

export type CliUtilityVersionGetInterpreterVersionInterpreterResults = [SharedShellOutput, SharedShellOutput];

export type CliUtilityVersionGetInterpreterVersionJavaVersion = SharedShellOutput;

export type CliUtilityVersionGetInterpreterVersionRustVersion = SharedShellOutput;

export type CliUtilityVersionGetInterpreterVersionInterpreters = Record<string, string>;

export type CliUtilityVersionGetInterpreterVersionJavaMatch = RegExpMatchArray | null;

export type CliUtilityVersionGetInterpreterVersionJavaMatchVersion = string;

export type CliUtilityVersionGetInterpreterVersionJavaMatchDistribution = string;

export type CliUtilityVersionGetInterpreterVersionJavaMatchBuild = string;

export type CliUtilityVersionGetInterpreterVersionRustMatch = RegExpMatchArray | null;

export type CliUtilityVersionGetInterpreterVersionRustMatchVersion = string;

export type CliUtilityVersionGetInterpreterVersionRustMatchBuildHash = string;

export type CliUtilityVersionGetInterpreterVersionRustMatchBuildDate = string;

export type CliUtilityVersionGetInterpreterVersionRustMatchSource = string;

/**
 * CLI - Utility - Version - Get Node Version.
 *
 * @since 0.11.0
 */
export type CliUtilityVersionGetNodeVersionReturns = Promise<CliUtilityVersionGetNodeVersionTools>;

export type CliUtilityVersionGetNodeVersionNodeResults = [SharedShellOutput, SharedShellOutput, SharedShellOutput, SharedShellOutput, SharedShellOutput];

export type CliUtilityVersionGetNodeVersionNodeJsVersion = SharedShellOutput;

export type CliUtilityVersionGetNodeVersionNpmVersion = SharedShellOutput;

export type CliUtilityVersionGetNodeVersionYarnVersion = SharedShellOutput;

export type CliUtilityVersionGetNodeVersionPnpmVersion = SharedShellOutput;

export type CliUtilityVersionGetNodeVersionBunVersion = SharedShellOutput;

export type CliUtilityVersionGetNodeVersionTools = Record<string, string>;

export type CliUtilityVersionGetNodeVersionNodeJsMatchResult = RegExpMatchArray | null;

export type CliUtilityVersionGetNodeVersionNodeJsMatch = string | undefined;

export type CliUtilityVersionGetNodeVersionNpmMatchResult = RegExpMatchArray | null;

export type CliUtilityVersionGetNodeVersionNpmMatch = string | undefined;

export type CliUtilityVersionGetNodeVersionYarnMatchResult = RegExpMatchArray | null;

export type CliUtilityVersionGetNodeVersionYarnMatch = string | undefined;

export type CliUtilityVersionGetNodeVersionPnpmMatchResult = RegExpMatchArray | null;

export type CliUtilityVersionGetNodeVersionPnpmMatch = string | undefined;

export type CliUtilityVersionGetNodeVersionBunMatchResult = RegExpMatchArray | null;

export type CliUtilityVersionGetNodeVersionBunMatch = string | undefined;

/**
 * CLI - Utility - Version - Get OS Version.
 *
 * @since 0.11.0
 */
export type CliUtilityVersionGetOsVersionReturns = Promise<{
  name: CliUtilityVersionGetOsVersionName;
  version: CliUtilityVersionGetOsVersionCurrentVersion;
  architecture: CliUtilityVersionGetOsVersionArchitecture;
  build: CliUtilityVersionGetOsVersionBuild;
  kernel: CliUtilityVersionGetOsVersionKernel;
}>;

export type CliUtilityVersionGetOsVersionCurrentPlatform = NodeJS.Platform;

export type CliUtilityVersionGetOsVersionArchitecture = NodeJS.Architecture;

export type CliUtilityVersionGetOsVersionKernel = string;

export type CliUtilityVersionGetOsVersionName = NodeJS.Platform | string;

export type CliUtilityVersionGetOsVersionCurrentVersion = string;

export type CliUtilityVersionGetOsVersionBuild = string;

export type CliUtilityVersionGetOsVersionDarwinResults = [SharedShellOutput, SharedShellOutput, SharedShellOutput];

export type CliUtilityVersionGetOsVersionProductName = SharedShellOutput;

export type CliUtilityVersionGetOsVersionProductVersion = SharedShellOutput;

export type CliUtilityVersionGetOsVersionBuildVersion = SharedShellOutput;

export type CliUtilityVersionGetOsVersionRegistryQuery = SharedWindowsRegistryKeys;

export type CliUtilityVersionGetOsVersionCurrentBuildEntry = SharedWindowsRegistryKey | undefined;

export type CliUtilityVersionGetOsVersionCurrentBuildNumberEntry = SharedWindowsRegistryKey | undefined;

export type CliUtilityVersionGetOsVersionUpdateBuildRevisionEntry = SharedWindowsRegistryKey | undefined;

export type CliUtilityVersionGetOsVersionProductNameEntry = SharedWindowsRegistryKey | undefined;

export type CliUtilityVersionGetOsVersionDisplayVersionEntry = SharedWindowsRegistryKey | undefined;

export type CliUtilityVersionGetOsVersionReleaseIdEntry = SharedWindowsRegistryKey | undefined;

export type CliUtilityVersionGetOsVersionCurrentBuild = string | undefined;

export type CliUtilityVersionGetOsVersionUpdateBuildRevision = string | undefined;

export type CliUtilityVersionGetOsVersionOsRelease = SharedLinuxOsReleaseEntries;

/**
 * CLI - Utility - Version - Print.
 *
 * @since 0.11.0
 */
export type CliUtilityVersionPrintList = Record<string, Record<string, string>>;

export type CliUtilityVersionPrintReturns = void;

export type CliUtilityVersionPrintCategory = string;

export type CliUtilityVersionPrintRowsByKey = Record<string, string>;

export type CliUtilityVersionPrintTable = MarkdownTable;

export type CliUtilityVersionPrintRowKey = string;

export type CliUtilityVersionPrintRowValue = string;

export type CliUtilityVersionPrintCategoryLabel = string;

/**
 * CLI - Utility - Version - Run.
 *
 * @since 0.11.0
 */
export type CliUtilityVersionRunOptionsAll = true;

export type CliUtilityVersionRunOptionsBrowser = true;

export type CliUtilityVersionRunOptionsEnv = true;

export type CliUtilityVersionRunOptionsInterpreter = true;

export type CliUtilityVersionRunOptionsNode = true;

export type CliUtilityVersionRunOptionsOs = true;

export type CliUtilityVersionRunOptions = {
  all?: CliUtilityVersionRunOptionsAll;
  browser?: CliUtilityVersionRunOptionsBrowser;
  env?: CliUtilityVersionRunOptionsEnv;
  interpreter?: CliUtilityVersionRunOptionsInterpreter;
  node?: CliUtilityVersionRunOptionsNode;
  os?: CliUtilityVersionRunOptionsOs;
};

export type CliUtilityVersionRunReturns = Promise<void>;

export type CliUtilityVersionRunTasks = Promise<[keyof CliUtilityVersionRunList, Record<string, string>]>[];

export type CliUtilityVersionRunResults = [keyof CliUtilityVersionRunList, Record<string, string>][];

export type CliUtilityVersionRunList = Record<string, Record<string, string>>;
