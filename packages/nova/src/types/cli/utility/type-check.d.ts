/**
 * CLI - Utility - Type Check - Print Error.
 *
 * @since 0.26.0
 */
export type Cli_Utility_TypeCheck_Runner_PrintError_Message = string;

export type Cli_Utility_TypeCheck_Runner_PrintError_Returns = void;

/**
 * CLI - Utility - Type Check - Print Info.
 *
 * @since 0.26.0
 */
export type Cli_Utility_TypeCheck_Runner_PrintInfo_Message = string;

export type Cli_Utility_TypeCheck_Runner_PrintInfo_Returns = void;

/**
 * CLI - Utility - Type Check - Run.
 *
 * @since 0.13.0
 */
export type Cli_Utility_TypeCheck_Runner_Run_Options_Project = string;

export type Cli_Utility_TypeCheck_Runner_Run_Options = {
  project?: Cli_Utility_TypeCheck_Runner_Run_Options_Project;
};

export type Cli_Utility_TypeCheck_Runner_Run_Returns = void;

export type Cli_Utility_TypeCheck_Runner_Run_ExitCode = 0 | 1;
