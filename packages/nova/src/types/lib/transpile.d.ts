import type {
  CompilerOptions,
  Diagnostic,
  EmitAndSemanticDiagnosticsBuilderProgram,
  EmitResult,
  LineAndCharacter,
  ParsedCommandLine,
  Program,
  WatchCompilerHostOfConfigFile,
} from 'typescript';

import type {
  Shared_TranspileOptions,
  Shared_TranspileResult,
  Shared_TranspileWatcher,
} from '../shared.d.ts';

/**
 * Lib - Transpile - Compile.
 *
 * @since 0.30.0
 */
export type Lib_Transpile_Compile_ConfigPath = string;

export type Lib_Transpile_Compile_CurrentDirectory = string;

export type Lib_Transpile_Compile_Options = Shared_TranspileOptions;

export type Lib_Transpile_Compile_Returns = number;

export type Lib_Transpile_Compile_ConfigResult_Config = unknown;

export type Lib_Transpile_Compile_ConfigResult_Error = Diagnostic;

export type Lib_Transpile_Compile_ConfigResult = {
  config?: Lib_Transpile_Compile_ConfigResult_Config;
  error?: Lib_Transpile_Compile_ConfigResult_Error;
};

export type Lib_Transpile_Compile_ConfigReadDiagnostics = readonly Diagnostic[];

export type Lib_Transpile_Compile_Config = unknown;

export type Lib_Transpile_Compile_Parsed = ParsedCommandLine;

export type Lib_Transpile_Compile_ConfigParseDiagnostics = readonly Diagnostic[];

export type Lib_Transpile_Compile_CompilerOptions = CompilerOptions;

export type Lib_Transpile_Compile_Program = Program;

export type Lib_Transpile_Compile_PreEmitDiagnostics = Diagnostic[];

export type Lib_Transpile_Compile_ShouldBlockEmit = boolean;

export type Lib_Transpile_Compile_EmitResult = EmitResult | undefined;

export type Lib_Transpile_Compile_EmitDiagnostics = Diagnostic[];

export type Lib_Transpile_Compile_Diagnostics = Diagnostic[];

/**
 * Lib - Transpile - Filter Diagnostics.
 *
 * @since 0.30.0
 */
export type Lib_Transpile_FilterDiagnostics_Diagnostics = readonly Diagnostic[];

export type Lib_Transpile_FilterDiagnostics_CurrentDirectory = string;

export type Lib_Transpile_FilterDiagnostics_Returns = Diagnostic[];

export type Lib_Transpile_FilterDiagnostics_FileName = string;

/**
 * Lib - Transpile - Get Config Path.
 *
 * @since 0.30.0
 */
export type Lib_Transpile_GetConfigPath_Project = string | undefined;

export type Lib_Transpile_GetConfigPath_CurrentDirectory = string;

export type Lib_Transpile_GetConfigPath_Returns = string | undefined;

export type Lib_Transpile_GetConfigPath_Resolved = string;

export type Lib_Transpile_GetConfigPath_Discovered = string | undefined;

/**
 * Lib - Transpile - Print Diagnostics.
 *
 * @since 0.30.0
 */
export type Lib_Transpile_PrintDiagnostics_Diagnostics = readonly Diagnostic[];

export type Lib_Transpile_PrintDiagnostics_PrintError = (message: string) => void;

export type Lib_Transpile_PrintDiagnostics_PrintInfo = (message: string) => void;

export type Lib_Transpile_PrintDiagnostics_Returns = void;

export type Lib_Transpile_PrintDiagnostics_FileSet = Set<string>;

export type Lib_Transpile_PrintDiagnostics_FileName = string;

export type Lib_Transpile_PrintDiagnostics_Message = string;

export type Lib_Transpile_PrintDiagnostics_Position = LineAndCharacter;

export type Lib_Transpile_PrintDiagnostics_Line = number;

export type Lib_Transpile_PrintDiagnostics_Character = number;

/**
 * Lib - Transpile - Run Transpile.
 *
 * @since 0.30.0
 */
export type Lib_Transpile_RunTranspile_Options = Shared_TranspileOptions;

export type Lib_Transpile_RunTranspile_Returns = Shared_TranspileResult;

export type Lib_Transpile_RunTranspile_CurrentDirectory = string;

export type Lib_Transpile_RunTranspile_ConfigPath = string | undefined;

/**
 * Lib - Transpile - Start Watch.
 *
 * @since 0.30.0
 */
export type Lib_Transpile_StartWatch_ConfigPath = string;

export type Lib_Transpile_StartWatch_CurrentDirectory = string;

export type Lib_Transpile_StartWatch_Options = Shared_TranspileOptions;

export type Lib_Transpile_StartWatch_Returns = Shared_TranspileWatcher;

export type Lib_Transpile_StartWatch_Host = WatchCompilerHostOfConfigFile<EmitAndSemanticDiagnosticsBuilderProgram>;

export type Lib_Transpile_StartWatch_WatchDiagnostics = Diagnostic[];

export type Lib_Transpile_StartWatch_StatusMessage = string;

/**
 * Lib - Transpile - Start Watch - After Program Create.
 *
 * @since 0.30.0
 */
export type Lib_Transpile_StartWatch_AfterProgramCreate_BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram;

export type Lib_Transpile_StartWatch_AfterProgramCreate_Returns = void;

export type Lib_Transpile_StartWatch_AfterProgramCreate_Program = Program;

export type Lib_Transpile_StartWatch_AfterProgramCreate_PreEmitDiagnostics = Diagnostic[];

export type Lib_Transpile_StartWatch_AfterProgramCreate_ConfigResult_Config = unknown;

export type Lib_Transpile_StartWatch_AfterProgramCreate_ConfigResult_Error = Diagnostic;

export type Lib_Transpile_StartWatch_AfterProgramCreate_ConfigResult = {
  config?: Lib_Transpile_StartWatch_AfterProgramCreate_ConfigResult_Config;
  error?: Lib_Transpile_StartWatch_AfterProgramCreate_ConfigResult_Error;
};

export type Lib_Transpile_StartWatch_AfterProgramCreate_CurrentConfig = ParsedCommandLine | undefined;

export type Lib_Transpile_StartWatch_AfterProgramCreate_ShouldBlockEmit = boolean;

export type Lib_Transpile_StartWatch_AfterProgramCreate_EmitResult = EmitResult | undefined;

export type Lib_Transpile_StartWatch_AfterProgramCreate_EmitDiagnostics = Diagnostic[];

export type Lib_Transpile_StartWatch_AfterProgramCreate_Diagnostics = Diagnostic[];
