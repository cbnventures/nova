import type { Shared_TranspileResult } from '../../shared.d.ts';

/**
 * CLI - Utility - Transpile - Print Error.
 *
 * @since 0.30.0
 */
export type Cli_Utility_Transpile_Runner_PrintError_Message = string;

export type Cli_Utility_Transpile_Runner_PrintError_Returns = void;

/**
 * CLI - Utility - Transpile - Print Info.
 *
 * @since 0.30.0
 */
export type Cli_Utility_Transpile_Runner_PrintInfo_Message = string;

export type Cli_Utility_Transpile_Runner_PrintInfo_Returns = void;

/**
 * CLI - Utility - Transpile - Run.
 *
 * @since 0.14.0
 */
export type Cli_Utility_Transpile_Runner_Run_Options_Project = string;

export type Cli_Utility_Transpile_Runner_Run_Options_Watch = boolean;

export type Cli_Utility_Transpile_Runner_Run_Options = {
  project?: Cli_Utility_Transpile_Runner_Run_Options_Project;
  watch?: Cli_Utility_Transpile_Runner_Run_Options_Watch;
};

export type Cli_Utility_Transpile_Runner_Run_Returns = void;

export type Cli_Utility_Transpile_Runner_Run_Result = Shared_TranspileResult;
