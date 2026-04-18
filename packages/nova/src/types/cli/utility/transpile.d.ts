import type {
  Diagnostic, EmitResult, ParsedCommandLine, Program,
} from 'typescript';

/**
 * CLI - Utility - Transpile - Emit Files.
 *
 * @since 0.14.0
 */
export type CliUtilityTranspileEmitFilesProgram = Program;

export type CliUtilityTranspileEmitFilesReturns = EmitResult;

/**
 * CLI - Utility - Transpile - Filter Diagnostics.
 *
 * @since 0.14.0
 */
export type CliUtilityTranspileFilterDiagnosticsDiagnostics = readonly Diagnostic[];

export type CliUtilityTranspileFilterDiagnosticsReturns = Diagnostic[];

export type CliUtilityTranspileFilterDiagnosticsCurrentDirectory = string;

export type CliUtilityTranspileFilterDiagnosticsFileName = string;

/**
 * CLI - Utility - Transpile - Get Config Path.
 *
 * @since 0.14.0
 */
export type CliUtilityTranspileGetConfigPathProject = string | undefined;

export type CliUtilityTranspileGetConfigPathReturns = string | undefined;

export type CliUtilityTranspileGetConfigPathCurrentDirectory = string;

export type CliUtilityTranspileGetConfigPathResolved = string;

/**
 * CLI - Utility - Transpile - Print Diagnostics.
 *
 * @since 0.14.0
 */
export type CliUtilityTranspilePrintDiagnosticsFilteredDiagnostics = Diagnostic[];

export type CliUtilityTranspilePrintDiagnosticsReturns = void;

export type CliUtilityTranspilePrintDiagnosticsFileSet = Set<string>;

export type CliUtilityTranspilePrintDiagnosticsFileName = string;

export type CliUtilityTranspilePrintDiagnosticsMessage = string;

export type CliUtilityTranspilePrintDiagnosticsPosition = import('typescript').LineAndCharacter;

export type CliUtilityTranspilePrintDiagnosticsLine = number;

export type CliUtilityTranspilePrintDiagnosticsCharacter = number;

/**
 * CLI - Utility - Transpile - Run.
 *
 * @since 0.14.0
 */
export type CliUtilityTranspileRunOptionsProject = string;

export type CliUtilityTranspileRunOptions = {
  project?: CliUtilityTranspileRunOptionsProject;
};

export type CliUtilityTranspileRunReturns = void;

export type CliUtilityTranspileRunConfigPath = string | undefined;

export type CliUtilityTranspileRunConfigResult = {
  config?: unknown; error?: Diagnostic;
};

export type CliUtilityTranspileRunConfig = unknown;

export type CliUtilityTranspileRunConfigDirectory = string;

export type CliUtilityTranspileRunParsed = ParsedCommandLine;

export type CliUtilityTranspileRunProgram = Program;

export type CliUtilityTranspileRunEmitResult = EmitResult;

export type CliUtilityTranspileRunFilteredDiagnostics = Diagnostic[];
