import type { ChildProcess, ChildProcessWithoutNullStreams } from 'node:child_process';

import type {
  Shared_RunScriptsOptions_Buffer,
  Shared_RunScriptsOptions_Parallel,
  Shared_RunScriptsOptions_Pattern,
  Shared_RunScriptsOptions_Sequential,
} from '../shared.d.ts';

/**
 * Lib - Run Scripts - Get npm Command.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_GetNpmCommand_Returns = string;

/**
 * Lib - Run Scripts - Match Scripts.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_MatchScripts_Scripts = Record<string, string>;

export type Lib_RunScripts_Runner_MatchScripts_Pattern = string;

export type Lib_RunScripts_Runner_MatchScripts_Returns = string[];

export type Lib_RunScripts_Runner_MatchScripts_Prefix = string;

/**
 * Lib - Run Scripts - Read package.json.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_ReadPackageJson_Returns = Promise<Lib_RunScripts_Runner_ReadPackageJson_Parsed | undefined>;

export type Lib_RunScripts_Runner_ReadPackageJson_Parsed = Record<string, unknown>;

export type Lib_RunScripts_Runner_ReadPackageJson_PackageJsonPath = string;

export type Lib_RunScripts_Runner_ReadPackageJson_Raw = string;

/**
 * Lib - Run Scripts - Run.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_Run_Options_Pattern = Shared_RunScriptsOptions_Pattern | undefined;

export type Lib_RunScripts_Runner_Run_Options_Sequential = Shared_RunScriptsOptions_Sequential;

export type Lib_RunScripts_Runner_Run_Options_Parallel = Shared_RunScriptsOptions_Parallel;

export type Lib_RunScripts_Runner_Run_Options_Buffer = Shared_RunScriptsOptions_Buffer;

export type Lib_RunScripts_Runner_Run_Options_PrintError = (message: string) => void;

export type Lib_RunScripts_Runner_Run_Options_PrintInfo = (message: string) => void;

export type Lib_RunScripts_Runner_Run_Options_PrintWarn = (message: string) => void;

export type Lib_RunScripts_Runner_Run_Options_WriteStderr = (message: string) => void;

export type Lib_RunScripts_Runner_Run_Options_WriteStdout = (message: string) => void;

export type Lib_RunScripts_Runner_Run_Options = {
  pattern: Lib_RunScripts_Runner_Run_Options_Pattern;
  sequential: Lib_RunScripts_Runner_Run_Options_Sequential;
  parallel: Lib_RunScripts_Runner_Run_Options_Parallel;
  buffer: Lib_RunScripts_Runner_Run_Options_Buffer;
  printError: Lib_RunScripts_Runner_Run_Options_PrintError;
  printInfo: Lib_RunScripts_Runner_Run_Options_PrintInfo;
  printWarn: Lib_RunScripts_Runner_Run_Options_PrintWarn;
  writeStderr: Lib_RunScripts_Runner_Run_Options_WriteStderr;
  writeStdout: Lib_RunScripts_Runner_Run_Options_WriteStdout;
};

export type Lib_RunScripts_Runner_Run_Returns = Promise<0 | 1>;

export type Lib_RunScripts_Runner_Run_Pattern = string;

export type Lib_RunScripts_Runner_Run_PackageJson = Record<string, unknown> | undefined;

export type Lib_RunScripts_Runner_Run_Scripts = Record<string, string> | undefined;

export type Lib_RunScripts_Runner_Run_MatchedScripts = string[];

export type Lib_RunScripts_Runner_Run_ExitCode = number;

export type Lib_RunScripts_Runner_Run_SpawnErrorMessage = string;

export type Lib_RunScripts_Runner_Run_BufferMs = number;

export type Lib_RunScripts_Runner_Run_ParallelExitCode = 0 | 1;

/**
 * Lib - Run Scripts - Run Parallel.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_RunParallel_MatchedScripts = string[];

export type Lib_RunScripts_Runner_RunParallel_BufferMs = number;

export type Lib_RunScripts_Runner_RunParallel_WriteStderr = (message: string) => void;

export type Lib_RunScripts_Runner_RunParallel_WriteStdout = (message: string) => void;

export type Lib_RunScripts_Runner_RunParallel_Returns = Promise<0 | 1>;

export type Lib_RunScripts_Runner_RunParallel_NpmCommand = string;

export type Lib_RunScripts_Runner_RunParallel_ColorFunctions = ((text: string) => string)[];

export type Lib_RunScripts_Runner_RunParallel_Prefixes = Map<string, string>;

export type Lib_RunScripts_Runner_RunParallel_ColorIndex = number;

export type Lib_RunScripts_Runner_RunParallel_Script = string;

export type Lib_RunScripts_Runner_RunParallel_ColorFunction = (text: string) => string;

export type Lib_RunScripts_Runner_RunParallel_ColoredPrefix = string;

export type Lib_RunScripts_Runner_RunParallel_Queue_Script = string;

export type Lib_RunScripts_Runner_RunParallel_Queue_Stream = 'stdout' | 'stderr';

export type Lib_RunScripts_Runner_RunParallel_Queue_Line = string;

export type Lib_RunScripts_Runner_RunParallel_Queue = {
  script: Lib_RunScripts_Runner_RunParallel_Queue_Script;
  stream: Lib_RunScripts_Runner_RunParallel_Queue_Stream;
  line: Lib_RunScripts_Runner_RunParallel_Queue_Line;
}[];

export type Lib_RunScripts_Runner_RunParallel_PartialLines = Map<string, Lib_RunScripts_Runner_RunParallel_ScriptPartialLines>;

export type Lib_RunScripts_Runner_RunParallel_Children = ChildProcessWithoutNullStreams[];

export type Lib_RunScripts_Runner_RunParallel_ExitPromises = Promise<number>[];

export type Lib_RunScripts_Runner_RunParallel_LastFlushedScript = string;

export type Lib_RunScripts_Runner_RunParallel_FlushQueue = () => void;

export type Lib_RunScripts_Runner_RunParallel_Child = ChildProcessWithoutNullStreams;

export type Lib_RunScripts_Runner_RunParallel_ScriptPartialLines = Map<'stdout' | 'stderr', string>;

export type Lib_RunScripts_Runner_RunParallel_HandleData = (data: Buffer, stream: 'stdout' | 'stderr') => void;

export type Lib_RunScripts_Runner_RunParallel_ExitPromise = Promise<number>;

export type Lib_RunScripts_Runner_RunParallel_FlushInterval = ReturnType<typeof setInterval>;

export type Lib_RunScripts_Runner_RunParallel_ForwardSignal = (signal: NodeJS.Signals) => void;

export type Lib_RunScripts_Runner_RunParallel_SIGINT_Returns = void;

export type Lib_RunScripts_Runner_RunParallel_HandleSigint = () => void;

export type Lib_RunScripts_Runner_RunParallel_SIGTERM_Returns = void;

export type Lib_RunScripts_Runner_RunParallel_HandleSigterm = () => void;

export type Lib_RunScripts_Runner_RunParallel_ExitResults = PromiseSettledResult<number>[];

export type Lib_RunScripts_Runner_RunParallel_Failed = boolean;

/**
 * Lib - Run Scripts - Run Parallel - Close.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_RunParallel_Close_PartialLineStreams = Map<'stdout' | 'stderr', string>;

export type Lib_RunScripts_Runner_RunParallel_Close_StdoutPartial = string;

export type Lib_RunScripts_Runner_RunParallel_Close_StderrPartial = string;

/**
 * Lib - Run Scripts - Run Parallel - Data.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_RunParallel_Data_Returns = void;

/**
 * Lib - Run Scripts - Run Parallel - Error.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_RunParallel_Error_Returns = void;

/**
 * Lib - Run Scripts - Run Parallel - Flush Queue.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_RunParallel_FlushQueue_Prefix = string;

export type Lib_RunScripts_Runner_RunParallel_FlushQueue_FormattedLine = string;

/**
 * Lib - Run Scripts - Run Parallel - Forward Signal.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_RunParallel_ForwardSignal_Returns = void;

/**
 * Lib - Run Scripts - Run Parallel - Handle Data.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_RunParallel_HandleData_PartialLineStreams = Map<'stdout' | 'stderr', string>;

export type Lib_RunScripts_Runner_RunParallel_HandleData_Text = string;

export type Lib_RunScripts_Runner_RunParallel_HandleData_Lines = string[];

export type Lib_RunScripts_Runner_RunParallel_HandleData_Partial = string;

/**
 * Lib - Run Scripts - Run Parallel - Handle SIGINT.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_RunParallel_HandleSigint_Returns = void;

/**
 * Lib - Run Scripts - Run Parallel - Handle SIGTERM.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_RunParallel_HandleSigterm_Returns = void;

/**
 * Lib - Run Scripts - Spawn Script.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_SpawnScript_Script = string;

export type Lib_RunScripts_Runner_SpawnScript_Returns = Promise<number>;

export type Lib_RunScripts_Runner_SpawnScript_NpmCommand = string;

export type Lib_RunScripts_Runner_SpawnScript_Child = ChildProcess;

/**
 * Lib - Run Scripts - Spawn Script - Close.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_SpawnScript_Close_ExitCode = number;

/**
 * Lib - Run Scripts - Spawn Script - Error.
 *
 * @since 0.26.0
 */
export type Lib_RunScripts_Runner_SpawnScript_Error_Returns = void;
