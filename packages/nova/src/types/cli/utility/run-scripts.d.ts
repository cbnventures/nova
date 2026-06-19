import type { ChildProcess, ChildProcessWithoutNullStreams } from 'child_process';

import type { Shared_RunScriptsOptions } from '../../shared.d.ts';

/**
 * CLI - Utility - Run Scripts - Get npm Command.
 *
 * @since 0.14.0
 */
export type Cli_Utility_RunScripts_Runner_GetNpmCommand_Returns = string;

/**
 * CLI - Utility - Run Scripts - Match Scripts.
 *
 * @since 0.14.0
 */
export type Cli_Utility_RunScripts_Runner_MatchScripts_Scripts = Record<string, string>;

export type Cli_Utility_RunScripts_Runner_MatchScripts_Pattern = string;

export type Cli_Utility_RunScripts_Runner_MatchScripts_Returns = string[];

export type Cli_Utility_RunScripts_Runner_MatchScripts_Prefix = string;

/**
 * CLI - Utility - Run Scripts - Read package.json.
 *
 * @since 0.14.0
 */
export type Cli_Utility_RunScripts_Runner_ReadPackageJson_Returns = Promise<Cli_Utility_RunScripts_Runner_ReadPackageJson_Parsed | undefined>;

export type Cli_Utility_RunScripts_Runner_ReadPackageJson_Parsed = Record<string, unknown>;

export type Cli_Utility_RunScripts_Runner_ReadPackageJson_PackageJsonPath = string;

export type Cli_Utility_RunScripts_Runner_ReadPackageJson_Raw = string;

/**
 * CLI - Utility - Run Scripts - Run.
 *
 * @since 0.14.0
 */
export type Cli_Utility_RunScripts_Runner_Run_Options = Shared_RunScriptsOptions;

export type Cli_Utility_RunScripts_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_RunScripts_Runner_Run_Pattern = string;

export type Cli_Utility_RunScripts_Runner_Run_PackageJson = Record<string, unknown> | undefined;

export type Cli_Utility_RunScripts_Runner_Run_Scripts = Record<string, string> | undefined;

export type Cli_Utility_RunScripts_Runner_Run_MatchedScripts = string[];

export type Cli_Utility_RunScripts_Runner_Run_ExitCode = number;

export type Cli_Utility_RunScripts_Runner_Run_BufferMs = number;

/**
 * CLI - Utility - Run Scripts - Run Parallel.
 *
 * @since 0.15.0
 */
export type Cli_Utility_RunScripts_Runner_RunParallel_MatchedScripts = string[];

export type Cli_Utility_RunScripts_Runner_RunParallel_BufferMs = number;

export type Cli_Utility_RunScripts_Runner_RunParallel_Returns = Promise<void>;

export type Cli_Utility_RunScripts_Runner_RunParallel_NpmCommand = string;

export type Cli_Utility_RunScripts_Runner_RunParallel_ColorFunctions = ((text: string) => string)[];

export type Cli_Utility_RunScripts_Runner_RunParallel_Prefixes = Map<string, string>;

export type Cli_Utility_RunScripts_Runner_RunParallel_ColorIndex = number;

export type Cli_Utility_RunScripts_Runner_RunParallel_Script = string;

export type Cli_Utility_RunScripts_Runner_RunParallel_ColorFunction = (text: string) => string;

export type Cli_Utility_RunScripts_Runner_RunParallel_ColoredPrefix = string;

export type Cli_Utility_RunScripts_Runner_RunParallel_Queue_Script = string;

export type Cli_Utility_RunScripts_Runner_RunParallel_Queue_Stream = 'stdout' | 'stderr';

export type Cli_Utility_RunScripts_Runner_RunParallel_Queue_Line = string;

export type Cli_Utility_RunScripts_Runner_RunParallel_Queue = {
  script: Cli_Utility_RunScripts_Runner_RunParallel_Queue_Script;
  stream: Cli_Utility_RunScripts_Runner_RunParallel_Queue_Stream;
  line: Cli_Utility_RunScripts_Runner_RunParallel_Queue_Line;
}[];

export type Cli_Utility_RunScripts_Runner_RunParallel_PartialLines = Map<string, string>;

export type Cli_Utility_RunScripts_Runner_RunParallel_Children = ChildProcessWithoutNullStreams[];

export type Cli_Utility_RunScripts_Runner_RunParallel_ExitPromises = Promise<number>[];

export type Cli_Utility_RunScripts_Runner_RunParallel_LastFlushedScript = string;

export type Cli_Utility_RunScripts_Runner_RunParallel_FlushQueue = () => void;

export type Cli_Utility_RunScripts_Runner_RunParallel_Child = ChildProcessWithoutNullStreams;

export type Cli_Utility_RunScripts_Runner_RunParallel_HandleData = (data: Buffer, stream: 'stdout' | 'stderr') => void;

export type Cli_Utility_RunScripts_Runner_RunParallel_ExitPromise = Promise<number>;

export type Cli_Utility_RunScripts_Runner_RunParallel_FlushInterval = ReturnType<typeof setInterval>;

export type Cli_Utility_RunScripts_Runner_RunParallel_ForwardSignal = (signal: NodeJS.Signals) => void;

export type Cli_Utility_RunScripts_Runner_RunParallel_ExitResults = PromiseSettledResult<number>[];

export type Cli_Utility_RunScripts_Runner_RunParallel_Failed = boolean;

/**
 * CLI - Utility - Run Scripts - Run Parallel - Close.
 *
 * @since 0.15.0
 */
export type Cli_Utility_RunScripts_Runner_RunParallel_Close_Partial = string;

/**
 * CLI - Utility - Run Scripts - Run Parallel - Data.
 *
 * @since 0.15.0
 */
export type Cli_Utility_RunScripts_Runner_RunParallel_Data_Returns = void;

/**
 * CLI - Utility - Run Scripts - Run Parallel - Error.
 *
 * @since 0.15.0
 */
export type Cli_Utility_RunScripts_Runner_RunParallel_Error_Returns = void;

/**
 * CLI - Utility - Run Scripts - Run Parallel - Flush Queue.
 *
 * @since 0.15.0
 */
export type Cli_Utility_RunScripts_Runner_RunParallel_FlushQueue_Prefix = string;

export type Cli_Utility_RunScripts_Runner_RunParallel_FlushQueue_FormattedLine = string;

/**
 * CLI - Utility - Run Scripts - Run Parallel - Forward Signal.
 *
 * @since 0.15.0
 */
export type Cli_Utility_RunScripts_Runner_RunParallel_ForwardSignal_Returns = void;

/**
 * CLI - Utility - Run Scripts - Run Parallel - Handle Data.
 *
 * @since 0.15.0
 */
export type Cli_Utility_RunScripts_Runner_RunParallel_HandleData_Text = string;

export type Cli_Utility_RunScripts_Runner_RunParallel_HandleData_Lines = string[];

export type Cli_Utility_RunScripts_Runner_RunParallel_HandleData_Partial = string;

/**
 * CLI - Utility - Run Scripts - Run Parallel - SIGINT.
 *
 * @since 0.15.0
 */
export type Cli_Utility_RunScripts_Runner_RunParallel_SIGINT_Returns = void;

/**
 * CLI - Utility - Run Scripts - Run Parallel - SIGTERM.
 *
 * @since 0.15.0
 */
export type Cli_Utility_RunScripts_Runner_RunParallel_SIGTERM_Returns = void;

/**
 * CLI - Utility - Run Scripts - Spawn Script.
 *
 * @since 0.14.0
 */
export type Cli_Utility_RunScripts_Runner_SpawnScript_Script = string;

export type Cli_Utility_RunScripts_Runner_SpawnScript_Returns = Promise<number>;

export type Cli_Utility_RunScripts_Runner_SpawnScript_NpmCommand = string;

export type Cli_Utility_RunScripts_Runner_SpawnScript_Child = ChildProcess;

/**
 * CLI - Utility - Run Scripts - Spawn Script - Close.
 *
 * @since 0.14.0
 */
export type Cli_Utility_RunScripts_Runner_SpawnScript_Close_ExitCode = number;

/**
 * CLI - Utility - Run Scripts - Spawn Script - Error.
 *
 * @since 0.14.0
 */
export type Cli_Utility_RunScripts_Runner_SpawnScript_Error_Returns = void;
