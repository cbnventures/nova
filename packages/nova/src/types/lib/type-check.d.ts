import type {
  Diagnostic,
  LineAndCharacter,
  ParsedCommandLine,
  Program,
} from 'typescript';

/**
 * Lib - Type Check - Filter Diagnostics.
 *
 * @since 0.26.0
 */
export type Lib_TypeCheck_FilterDiagnostics_Diagnostics = readonly Diagnostic[];

export type Lib_TypeCheck_FilterDiagnostics_CurrentDirectory = string;

export type Lib_TypeCheck_FilterDiagnostics_Returns = Diagnostic[];

export type Lib_TypeCheck_FilterDiagnostics_FileName = string;

/**
 * Lib - Type Check - Get Config Path.
 *
 * @since 0.26.0
 */
export type Lib_TypeCheck_GetConfigPath_Project = string | undefined;

export type Lib_TypeCheck_GetConfigPath_CurrentDirectory = string;

export type Lib_TypeCheck_GetConfigPath_Returns = string | undefined;

export type Lib_TypeCheck_GetConfigPath_Resolved = string;

/**
 * Lib - Type Check - Get Diagnostics.
 *
 * @since 0.26.0
 */
export type Lib_TypeCheck_GetDiagnostics_Program = Program;

export type Lib_TypeCheck_GetDiagnostics_Returns = readonly Diagnostic[];

/**
 * Lib - Type Check - Print Diagnostics.
 *
 * @since 0.26.0
 */
export type Lib_TypeCheck_PrintDiagnostics_Diagnostics = readonly Diagnostic[];

export type Lib_TypeCheck_PrintDiagnostics_PrintError = (message: string) => void;

export type Lib_TypeCheck_PrintDiagnostics_PrintInfo = (message: string) => void;

export type Lib_TypeCheck_PrintDiagnostics_Returns = void;

export type Lib_TypeCheck_PrintDiagnostics_FileSet = Set<string>;

export type Lib_TypeCheck_PrintDiagnostics_FileName = string;

export type Lib_TypeCheck_PrintDiagnostics_Message = string;

export type Lib_TypeCheck_PrintDiagnostics_Position = LineAndCharacter;

export type Lib_TypeCheck_PrintDiagnostics_Line = number;

export type Lib_TypeCheck_PrintDiagnostics_Character = number;

/**
 * Lib - Type Check - Run Type Check.
 *
 * @since 0.26.0
 */
export type Lib_TypeCheck_RunTypeCheck_Options_Project = string | undefined;

export type Lib_TypeCheck_RunTypeCheck_Options_PrintError = (message: string) => void;

export type Lib_TypeCheck_RunTypeCheck_Options_PrintInfo = (message: string) => void;

export type Lib_TypeCheck_RunTypeCheck_Options = {
  project: Lib_TypeCheck_RunTypeCheck_Options_Project;
  printError: Lib_TypeCheck_RunTypeCheck_Options_PrintError;
  printInfo: Lib_TypeCheck_RunTypeCheck_Options_PrintInfo;
};

export type Lib_TypeCheck_RunTypeCheck_Returns = 0 | 1;

export type Lib_TypeCheck_RunTypeCheck_CurrentDirectory = string;

export type Lib_TypeCheck_RunTypeCheck_ConfigPath = string | undefined;

export type Lib_TypeCheck_RunTypeCheck_ConfigResult = {
  config?: unknown;
  error?: Diagnostic;
};

export type Lib_TypeCheck_RunTypeCheck_Config = unknown;

export type Lib_TypeCheck_RunTypeCheck_Parsed = ParsedCommandLine;

export type Lib_TypeCheck_RunTypeCheck_Program = Program;

export type Lib_TypeCheck_RunTypeCheck_FilteredDiagnostics = Diagnostic[];
