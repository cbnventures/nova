import type { Diagnostic, ParsedCommandLine, Program } from 'typescript';

/**
 * CLI - Utility - Type Check - Filter Diagnostics.
 *
 * @since 0.13.0
 */
export type CliUtilityTypeCheckFilterDiagnosticsDiagnostics = readonly Diagnostic[];

export type CliUtilityTypeCheckFilterDiagnosticsReturns = Diagnostic[];

export type CliUtilityTypeCheckFilterDiagnosticsCurrentDirectory = string;

export type CliUtilityTypeCheckFilterDiagnosticsFileName = string;

/**
 * CLI - Utility - Type Check - Get Config Path.
 *
 * @since 0.13.0
 */
export type CliUtilityTypeCheckGetConfigPathProject = string | undefined;

export type CliUtilityTypeCheckGetConfigPathReturns = string | undefined;

export type CliUtilityTypeCheckGetConfigPathCurrentDirectory = string;

export type CliUtilityTypeCheckGetConfigPathResolved = string;

/**
 * CLI - Utility - Type Check - Get Diagnostics.
 *
 * @since 0.13.0
 */
export type CliUtilityTypeCheckGetDiagnosticsProgram = Program;

export type CliUtilityTypeCheckGetDiagnosticsReturns = readonly Diagnostic[];

/**
 * CLI - Utility - Type Check - Print Diagnostics.
 *
 * @since 0.13.0
 */
export type CliUtilityTypeCheckPrintDiagnosticsFilteredDiagnostics = Diagnostic[];

export type CliUtilityTypeCheckPrintDiagnosticsReturns = void;

export type CliUtilityTypeCheckPrintDiagnosticsFileSet = Set<string>;

export type CliUtilityTypeCheckPrintDiagnosticsFileName = string;

export type CliUtilityTypeCheckPrintDiagnosticsMessage = string;

export type CliUtilityTypeCheckPrintDiagnosticsPosition = import('typescript').LineAndCharacter;

export type CliUtilityTypeCheckPrintDiagnosticsLine = number;

export type CliUtilityTypeCheckPrintDiagnosticsCharacter = number;

/**
 * CLI - Utility - Type Check - Run.
 *
 * @since 0.13.0
 */
export type CliUtilityTypeCheckRunOptionsProject = string;

export type CliUtilityTypeCheckRunOptions = {
  project?: CliUtilityTypeCheckRunOptionsProject;
};

export type CliUtilityTypeCheckRunReturns = void;

export type CliUtilityTypeCheckRunConfigPath = string | undefined;

export type CliUtilityTypeCheckRunConfigResult = {
  config?: unknown; error?: Diagnostic;
};

export type CliUtilityTypeCheckRunConfig = unknown;

export type CliUtilityTypeCheckRunConfigDirectory = string;

export type CliUtilityTypeCheckRunParsed = ParsedCommandLine;

export type CliUtilityTypeCheckRunProgram = Program;

export type CliUtilityTypeCheckRunDiagnostics = readonly Diagnostic[];

export type CliUtilityTypeCheckRunFilteredDiagnostics = Diagnostic[];
