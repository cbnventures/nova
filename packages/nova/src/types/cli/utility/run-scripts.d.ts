/**
 * CLI Utility - Run Scripts - Get npm command.
 *
 * @since 1.0.0
 */
export type CLIUtilityRunScriptsGetNpmCommandReturns = string;

/**
 * CLI Utility - Run Scripts - Match scripts.
 *
 * @since 1.0.0
 */
export type CLIUtilityRunScriptsMatchScriptsScripts = Record<string, string>;

export type CLIUtilityRunScriptsMatchScriptsPattern = string;

export type CLIUtilityRunScriptsMatchScriptsReturns = string[];

/**
 * CLI Utility - Run Scripts - Read package.json.
 *
 * @since 1.0.0
 */
export type CLIUtilityRunScriptsReadPackageJsonReturns = Promise<CLIUtilityRunScriptsReadPackageJsonParsed | undefined>;

export type CLIUtilityRunScriptsReadPackageJsonParsed = Record<string, unknown>;

/**
 * CLI Utility - Run Scripts - Run.
 *
 * @since 1.0.0
 */
export type CLIUtilityRunScriptsRunOptionsPattern = string;

export type CLIUtilityRunScriptsRunOptionsSequential = true | undefined;

export type CLIUtilityRunScriptsRunOptionsParallel = true | undefined;

export type CLIUtilityRunScriptsRunOptions = {
  pattern?: CLIUtilityRunScriptsRunOptionsPattern;
  sequential?: CLIUtilityRunScriptsRunOptionsSequential;
  parallel?: CLIUtilityRunScriptsRunOptionsParallel;
};

export type CLIUtilityRunScriptsRunScripts = Record<string, string> | undefined;

export type CLIUtilityRunScriptsRunReturns = Promise<void>;

/**
 * CLI Utility - Run Scripts - Spawn script.
 *
 * @since 1.0.0
 */
export type CLIUtilityRunScriptsSpawnScriptScript = string;

export type CLIUtilityRunScriptsSpawnScriptReturns = Promise<number>;

/**
 * CLI Utility - Run Scripts - Spawn script buffered.
 *
 * @since 1.0.0
 */
export type CLIUtilityRunScriptsSpawnScriptBufferedScript = string;

export type CLIUtilityRunScriptsSpawnScriptBufferedResultExitCode = number;

export type CLIUtilityRunScriptsSpawnScriptBufferedResultStdout = string;

export type CLIUtilityRunScriptsSpawnScriptBufferedResultStderr = string;

export type CLIUtilityRunScriptsSpawnScriptBufferedResult = {
  exitCode: CLIUtilityRunScriptsSpawnScriptBufferedResultExitCode;
  stdout: CLIUtilityRunScriptsSpawnScriptBufferedResultStdout;
  stderr: CLIUtilityRunScriptsSpawnScriptBufferedResultStderr;
};

export type CLIUtilityRunScriptsSpawnScriptBufferedReturns = Promise<CLIUtilityRunScriptsSpawnScriptBufferedResult>;
