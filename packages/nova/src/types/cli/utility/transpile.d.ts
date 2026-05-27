import type {
  Diagnostic, EmitResult, ParsedCommandLine, Program,
} from 'typescript';

/**
 * CLI - Utility - Transpile - Emit Files.
 *
 * @since 0.14.0
 */
export type Cli_Utility_Transpile_Runner_EmitFiles_Program = Program;

export type Cli_Utility_Transpile_Runner_EmitFiles_Returns = EmitResult;

/**
 * CLI - Utility - Transpile - Filter Diagnostics.
 *
 * @since 0.14.0
 */
export type Cli_Utility_Transpile_Runner_FilterDiagnostics_Diagnostics = readonly Diagnostic[];

export type Cli_Utility_Transpile_Runner_FilterDiagnostics_Returns = Diagnostic[];

export type Cli_Utility_Transpile_Runner_FilterDiagnostics_CurrentDirectory = string;

export type Cli_Utility_Transpile_Runner_FilterDiagnostics_FileName = string;

/**
 * CLI - Utility - Transpile - Get Config Path.
 *
 * @since 0.14.0
 */
export type Cli_Utility_Transpile_Runner_GetConfigPath_Project = string | undefined;

export type Cli_Utility_Transpile_Runner_GetConfigPath_Returns = string | undefined;

export type Cli_Utility_Transpile_Runner_GetConfigPath_CurrentDirectory = string;

export type Cli_Utility_Transpile_Runner_GetConfigPath_Resolved = string;

/**
 * CLI - Utility - Transpile - Print Diagnostics.
 *
 * @since 0.14.0
 */
export type Cli_Utility_Transpile_Runner_PrintDiagnostics_FilteredDiagnostics = Diagnostic[];

export type Cli_Utility_Transpile_Runner_PrintDiagnostics_Returns = void;

export type Cli_Utility_Transpile_Runner_PrintDiagnostics_FileSet = Set<string>;

export type Cli_Utility_Transpile_Runner_PrintDiagnostics_FileName = string;

export type Cli_Utility_Transpile_Runner_PrintDiagnostics_Message = string;

export type Cli_Utility_Transpile_Runner_PrintDiagnostics_Position = import('typescript').LineAndCharacter;

export type Cli_Utility_Transpile_Runner_PrintDiagnostics_Line = number;

export type Cli_Utility_Transpile_Runner_PrintDiagnostics_Character = number;

/**
 * CLI - Utility - Transpile - Run.
 *
 * @since 0.14.0
 */
export type Cli_Utility_Transpile_Runner_Run_Options_Project = string;

export type Cli_Utility_Transpile_Runner_Run_Options = {
  project?: Cli_Utility_Transpile_Runner_Run_Options_Project;
};

export type Cli_Utility_Transpile_Runner_Run_Returns = void;

export type Cli_Utility_Transpile_Runner_Run_ConfigPath = string | undefined;

export type Cli_Utility_Transpile_Runner_Run_ConfigResult = {
  config?: unknown; error?: Diagnostic;
};

export type Cli_Utility_Transpile_Runner_Run_Config = unknown;

export type Cli_Utility_Transpile_Runner_Run_ConfigDirectory = string;

export type Cli_Utility_Transpile_Runner_Run_Parsed = ParsedCommandLine;

export type Cli_Utility_Transpile_Runner_Run_Program = Program;

export type Cli_Utility_Transpile_Runner_Run_EmitResult = EmitResult;

export type Cli_Utility_Transpile_Runner_Run_FilteredDiagnostics = Diagnostic[];
