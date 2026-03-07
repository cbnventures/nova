import type { Diagnostic, EmitResult, Program } from 'typescript';

/**
 * CLI Utility - Transpile - Emit files.
 *
 * @since 1.0.0
 */
export type CLIUtilityTranspileEmitFilesProgram = Program;

export type CLIUtilityTranspileEmitFilesReturns = EmitResult;

/**
 * CLI Utility - Transpile - Filter diagnostics.
 *
 * @since 1.0.0
 */
export type CLIUtilityTranspileFilterDiagnosticsDiagnostics = readonly Diagnostic[];

export type CLIUtilityTranspileFilterDiagnosticsReturns = Diagnostic[];

/**
 * CLI Utility - Transpile - Get config path.
 *
 * @since 1.0.0
 */
export type CLIUtilityTranspileGetConfigPathProject = string | undefined;

export type CLIUtilityTranspileGetConfigPathReturns = string | undefined;

/**
 * CLI Utility - Transpile - Print diagnostics.
 *
 * @since 1.0.0
 */
export type CLIUtilityTranspilePrintDiagnosticsFiltered = Diagnostic[];

export type CLIUtilityTranspilePrintDiagnosticsReturns = void;

export type CLIUtilityTranspilePrintDiagnosticsFileSet = Set<string>;

/**
 * CLI Utility - Transpile - Run.
 *
 * @since 1.0.0
 */
export type CLIUtilityTranspileRunOptionsProject = string;

export type CLIUtilityTranspileRunOptions = {
  project?: CLIUtilityTranspileRunOptionsProject;
};

export type CLIUtilityTranspileRunReturns = void;
