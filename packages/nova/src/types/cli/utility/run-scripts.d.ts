import type { ChildProcess, ChildProcessWithoutNullStreams } from 'child_process';

import type { SharedLogQueueEntry, SharedRunScriptsOptions } from '../../shared.d.ts';

/**
 * CLI - Utility - Run Scripts - Get npm Command.
 *
 * @since 0.14.0
 */
export type CliUtilityRunScriptsGetNpmCommandReturns = string;

/**
 * CLI - Utility - Run Scripts - Match Scripts.
 *
 * @since 0.14.0
 */
export type CliUtilityRunScriptsMatchScriptsScripts = Record<string, string>;

export type CliUtilityRunScriptsMatchScriptsPattern = string;

export type CliUtilityRunScriptsMatchScriptsReturns = string[];

export type CliUtilityRunScriptsMatchScriptsPrefix = string;

/**
 * CLI - Utility - Run Scripts - Read package.json.
 *
 * @since 0.14.0
 */
export type CliUtilityRunScriptsReadPackageJsonReturns = Promise<CliUtilityRunScriptsReadPackageJsonParsed | undefined>;

export type CliUtilityRunScriptsReadPackageJsonParsed = Record<string, unknown>;

export type CliUtilityRunScriptsReadPackageJsonCurrentDirectory = string;

export type CliUtilityRunScriptsReadPackageJsonPackageJsonPath = string;

export type CliUtilityRunScriptsReadPackageJsonRaw = string;

/**
 * CLI - Utility - Run Scripts - Run.
 *
 * @since 0.14.0
 */
export type CliUtilityRunScriptsRunOptions = SharedRunScriptsOptions;

export type CliUtilityRunScriptsRunReturns = Promise<void>;

export type CliUtilityRunScriptsRunPattern = string;

export type CliUtilityRunScriptsRunPackageJson = Record<string, unknown> | undefined;

export type CliUtilityRunScriptsRunScripts = Record<string, string> | undefined;

export type CliUtilityRunScriptsRunMatchedScripts = string[];

export type CliUtilityRunScriptsRunExitCode = number;

export type CliUtilityRunScriptsRunBufferMs = number;

/**
 * CLI - Utility - Run Scripts - Run Parallel.
 *
 * @since 0.15.0
 */
export type CliUtilityRunScriptsRunParallelMatchedScripts = string[];

export type CliUtilityRunScriptsRunParallelBufferMs = number;

export type CliUtilityRunScriptsRunParallelReturns = Promise<void>;

export type CliUtilityRunScriptsRunParallelNpmCommand = string;

export type CliUtilityRunScriptsRunParallelColorFunctions = ((text: string) => string)[];

export type CliUtilityRunScriptsRunParallelPrefixes = Map<string, string>;

export type CliUtilityRunScriptsRunParallelColorIndex = number;

export type CliUtilityRunScriptsRunParallelScript = string;

export type CliUtilityRunScriptsRunParallelColorFunction = (text: string) => string;

export type CliUtilityRunScriptsRunParallelColoredPrefix = string;

export type CliUtilityRunScriptsRunParallelQueue = SharedLogQueueEntry[];

export type CliUtilityRunScriptsRunParallelPartialLines = Map<string, string>;

export type CliUtilityRunScriptsRunParallelChildren = ChildProcessWithoutNullStreams[];

export type CliUtilityRunScriptsRunParallelExitPromises = Promise<number>[];

export type CliUtilityRunScriptsRunParallelLastFlushedScript = string;

export type CliUtilityRunScriptsRunParallelFlushQueue = () => void;

export type CliUtilityRunScriptsRunParallelPrefix = string;

export type CliUtilityRunScriptsRunParallelFormattedLine = string;

export type CliUtilityRunScriptsRunParallelChild = ChildProcessWithoutNullStreams;

export type CliUtilityRunScriptsRunParallelHandleData = (data: Buffer, stream: 'stdout' | 'stderr') => void;

export type CliUtilityRunScriptsRunParallelText = string;

export type CliUtilityRunScriptsRunParallelLines = string[];

export type CliUtilityRunScriptsRunParallelPartial = string;

export type CliUtilityRunScriptsRunParallelExitPromise = Promise<number>;

export type CliUtilityRunScriptsRunParallelFlushInterval = ReturnType<typeof setInterval>;

export type CliUtilityRunScriptsRunParallelForwardSignal = (signal: NodeJS.Signals) => void;

export type CliUtilityRunScriptsRunParallelExitResults = PromiseSettledResult<number>[];

export type CliUtilityRunScriptsRunParallelFailed = boolean;

/**
 * CLI - Utility - Run Scripts - Spawn Script.
 *
 * @since 0.14.0
 */
export type CliUtilityRunScriptsSpawnScriptScript = string;

export type CliUtilityRunScriptsSpawnScriptReturns = Promise<number>;

export type CliUtilityRunScriptsSpawnScriptNpmCommand = string;

export type CliUtilityRunScriptsSpawnScriptChild = ChildProcess;
