import type { Diagnostic, ParsedCommandLine, Program } from 'typescript';

/**
 * CLI - Utility - Type Check - Filter Diagnostics.
 *
 * @since 0.13.0
 */
export type Cli_Utility_TypeCheck_Runner_FilterDiagnostics_Diagnostics = readonly Diagnostic[];

export type Cli_Utility_TypeCheck_Runner_FilterDiagnostics_Returns = Diagnostic[];

export type Cli_Utility_TypeCheck_Runner_FilterDiagnostics_CurrentDirectory = string;

export type Cli_Utility_TypeCheck_Runner_FilterDiagnostics_FileName = string;

/**
 * CLI - Utility - Type Check - Get Config Path.
 *
 * @since 0.13.0
 */
export type Cli_Utility_TypeCheck_Runner_GetConfigPath_Project = string | undefined;

export type Cli_Utility_TypeCheck_Runner_GetConfigPath_Returns = string | undefined;

export type Cli_Utility_TypeCheck_Runner_GetConfigPath_CurrentDirectory = string;

export type Cli_Utility_TypeCheck_Runner_GetConfigPath_Resolved = string;

/**
 * CLI - Utility - Type Check - Get Diagnostics.
 *
 * @since 0.13.0
 */
export type Cli_Utility_TypeCheck_Runner_GetDiagnostics_Program = Program;

export type Cli_Utility_TypeCheck_Runner_GetDiagnostics_Returns = readonly Diagnostic[];

/**
 * CLI - Utility - Type Check - Print Diagnostics.
 *
 * @since 0.13.0
 */
export type Cli_Utility_TypeCheck_Runner_PrintDiagnostics_FilteredDiagnostics = Diagnostic[];

export type Cli_Utility_TypeCheck_Runner_PrintDiagnostics_Returns = void;

export type Cli_Utility_TypeCheck_Runner_PrintDiagnostics_FileSet = Set<string>;

export type Cli_Utility_TypeCheck_Runner_PrintDiagnostics_FileName = string;

export type Cli_Utility_TypeCheck_Runner_PrintDiagnostics_Message = string;

export type Cli_Utility_TypeCheck_Runner_PrintDiagnostics_Position = import('typescript').LineAndCharacter;

export type Cli_Utility_TypeCheck_Runner_PrintDiagnostics_Line = number;

export type Cli_Utility_TypeCheck_Runner_PrintDiagnostics_Character = number;

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

export type Cli_Utility_TypeCheck_Runner_Run_ConfigPath = string | undefined;

export type Cli_Utility_TypeCheck_Runner_Run_ConfigResult = {
  config?: unknown; error?: Diagnostic;
};

export type Cli_Utility_TypeCheck_Runner_Run_Config = unknown;

export type Cli_Utility_TypeCheck_Runner_Run_ConfigDirectory = string;

export type Cli_Utility_TypeCheck_Runner_Run_Parsed = ParsedCommandLine;

export type Cli_Utility_TypeCheck_Runner_Run_Program = Program;

export type Cli_Utility_TypeCheck_Runner_Run_Diagnostics = readonly Diagnostic[];

export type Cli_Utility_TypeCheck_Runner_Run_FilteredDiagnostics = Diagnostic[];
