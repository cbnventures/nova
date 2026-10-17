import type { Shared_RunWorkspacesOptions } from '../../shared.d.ts';

/**
 * CLI - Utility - Run Workspaces - Print Error.
 *
 * @since 0.32.0
 */
export type Cli_Utility_RunWorkspaces_Runner_PrintError_Message = string;

export type Cli_Utility_RunWorkspaces_Runner_PrintError_Returns = void;

/**
 * CLI - Utility - Run Workspaces - Print Info.
 *
 * @since 0.32.0
 */
export type Cli_Utility_RunWorkspaces_Runner_PrintInfo_Message = string;

export type Cli_Utility_RunWorkspaces_Runner_PrintInfo_Returns = void;

/**
 * CLI - Utility - Run Workspaces - Print Warn.
 *
 * @since 0.32.0
 */
export type Cli_Utility_RunWorkspaces_Runner_PrintWarn_Message = string;

export type Cli_Utility_RunWorkspaces_Runner_PrintWarn_Returns = void;

/**
 * CLI - Utility - Run Workspaces - Run.
 *
 * @since 0.32.0
 */
export type Cli_Utility_RunWorkspaces_Runner_Run_Options = Shared_RunWorkspacesOptions;

export type Cli_Utility_RunWorkspaces_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_RunWorkspaces_Runner_Run_ExitCode = 0 | 1;

/**
 * CLI - Utility - Run Workspaces - Write Stderr.
 *
 * @since 0.32.0
 */
export type Cli_Utility_RunWorkspaces_Runner_WriteStderr_Message = string;

export type Cli_Utility_RunWorkspaces_Runner_WriteStderr_Returns = void;

/**
 * CLI - Utility - Run Workspaces - Write Stdout.
 *
 * @since 0.32.0
 */
export type Cli_Utility_RunWorkspaces_Runner_WriteStdout_Message = string;

export type Cli_Utility_RunWorkspaces_Runner_WriteStdout_Returns = void;
