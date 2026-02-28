/**
 * CLI Utility - Version - Get browser version.
 *
 * @since 1.0.0
 */
export type CLIUtilityVersionGetBrowserVersionReturns = Promise<CLIUtilityVersionGetBrowserVersionBrowsers>;

export type CLIUtilityVersionGetBrowserVersionBrowsers = Record<string, string>;

export type CLIUtilityVersionGetBrowserVersionAppPath = string | null;

/**
 * CLI Utility - Version - Get environment manager version.
 *
 * @since 1.0.0
 */
export type CLIUtilityVersionGetEnvironmentManagerVersionReturns = Promise<CLIUtilityVersionGetEnvironmentManagerVersionManagers>;

export type CLIUtilityVersionGetEnvironmentManagerVersionManagers = Record<string, string>;

/**
 * CLI Utility - Version - Get interpreter version.
 *
 * @since 1.0.0
 */
export type CLIUtilityVersionGetInterpreterVersionReturns = Promise<CLIUtilityVersionGetInterpreterVersionInterpreters>;

export type CLIUtilityVersionGetInterpreterVersionInterpreters = Record<string, string>;

/**
 * CLI Utility - Version - Get node version.
 *
 * @since 1.0.0
 */
export type CLIUtilityVersionGetNodeVersionReturns = Promise<CLIUtilityVersionGetNodeVersionTools>;

export type CLIUtilityVersionGetNodeVersionTools = Record<string, string>;

/**
 * CLI Utility - Version - Get os version.
 *
 * @since 1.0.0
 */
export type CLIUtilityVersionGetOsVersionReturns = Promise<{
  name: CLIUtilityVersionGetOsVersionName;
  version: CLIUtilityVersionGetOsVersionVersion;
  architecture: CLIUtilityVersionGetOsVersionArchitecture;
  build: CLIUtilityVersionGetOsVersionBuild;
  kernel: CLIUtilityVersionGetOsVersionKernel;
}>;

export type CLIUtilityVersionGetOsVersionArchitecture = NodeJS.Architecture;

export type CLIUtilityVersionGetOsVersionKernel = string;

export type CLIUtilityVersionGetOsVersionName = NodeJS.Platform | string;

export type CLIUtilityVersionGetOsVersionVersion = string;

export type CLIUtilityVersionGetOsVersionBuild = string;

export type CLIUtilityVersionGetOsVersionCurrentBuild = string | undefined;

/**
 * CLI Utility - Version - Print.
 *
 * @since 1.0.0
 */
export type CLIUtilityVersionPrintList = Record<string, Record<string, string>>;

export type CLIUtilityVersionPrintReturns = void;

/**
 * CLI Utility - Version - Run.
 *
 * @since 1.0.0
 */
export type CLIUtilityVersionRunOptionsAll = true;

export type CLIUtilityVersionRunOptionsBrowser = true;

export type CLIUtilityVersionRunOptionsEnv = true;

export type CLIUtilityVersionRunOptionsInterpreter = true;

export type CLIUtilityVersionRunOptionsNode = true;

export type CLIUtilityVersionRunOptionsOs = true;

export type CLIUtilityVersionRunOptions = {
  all?: CLIUtilityVersionRunOptionsAll;
  browser?: CLIUtilityVersionRunOptionsBrowser;
  env?: CLIUtilityVersionRunOptionsEnv;
  interpreter?: CLIUtilityVersionRunOptionsInterpreter;
  node?: CLIUtilityVersionRunOptionsNode;
  os?: CLIUtilityVersionRunOptionsOs;
};

export type CLIUtilityVersionRunReturns = Promise<void>;

export type CLIUtilityVersionRunTasks = Promise<[keyof CLIUtilityVersionRunList, Record<string, string>]>[];

export type CLIUtilityVersionRunList = Record<string, Record<string, string>>;
