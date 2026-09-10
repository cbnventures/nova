import type { Shared_RunScriptsOptions } from '../../shared.d.ts';

/**
 * CLI - Utility - Run Scripts - Print Error.
 *
 * @since 0.26.0
 */
export type Cli_Utility_RunScripts_Runner_PrintError_Message = string;

export type Cli_Utility_RunScripts_Runner_PrintError_Returns = void;

/**
 * CLI - Utility - Run Scripts - Print Info.
 *
 * @since 0.26.0
 */
export type Cli_Utility_RunScripts_Runner_PrintInfo_Message = string;

export type Cli_Utility_RunScripts_Runner_PrintInfo_Returns = void;

/**
 * CLI - Utility - Run Scripts - Print Warn.
 *
 * @since 0.26.0
 */
export type Cli_Utility_RunScripts_Runner_PrintWarn_Message = string;

export type Cli_Utility_RunScripts_Runner_PrintWarn_Returns = void;

/**
 * CLI - Utility - Run Scripts - Run.
 *
 * @since 0.14.0
 */
export type Cli_Utility_RunScripts_Runner_Run_Options = Shared_RunScriptsOptions;

export type Cli_Utility_RunScripts_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_RunScripts_Runner_Run_ExitCode = 0 | 1;

/**
 * CLI - Utility - Run Scripts - Write Stderr.
 *
 * @since 0.26.0
 */
export type Cli_Utility_RunScripts_Runner_WriteStderr_Message = string;

export type Cli_Utility_RunScripts_Runner_WriteStderr_Returns = void;

/**
 * CLI - Utility - Run Scripts - Write Stdout.
 *
 * @since 0.26.0
 */
export type Cli_Utility_RunScripts_Runner_WriteStdout_Message = string;

export type Cli_Utility_RunScripts_Runner_WriteStdout_Returns = void;
