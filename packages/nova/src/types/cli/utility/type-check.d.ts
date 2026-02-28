import type { Diagnostic, ParsedCommandLine } from 'typescript';

/**
 * CLI Utility - Type Check - Filter diagnostics.
 *
 * @since 1.0.0
 */
export type CLIUtilityTypeCheckFilterDiagnosticsDiagnostics = readonly Diagnostic[];

export type CLIUtilityTypeCheckFilterDiagnosticsReturns = Diagnostic[];

/**
 * CLI Utility - Type Check - Get config path.
 *
 * @since 1.0.0
 */
export type CLIUtilityTypeCheckGetConfigPathProject = string | undefined;

export type CLIUtilityTypeCheckGetConfigPathReturns = string | undefined;

/**
 * CLI Utility - Type Check - Get diagnostics.
 *
 * @since 1.0.0
 */
export type CLIUtilityTypeCheckGetDiagnosticsParsed = ParsedCommandLine;

export type CLIUtilityTypeCheckGetDiagnosticsReturns = readonly Diagnostic[];

/**
 * CLI Utility - Type Check - Print diagnostics.
 *
 * @since 1.0.0
 */
export type CLIUtilityTypeCheckPrintDiagnosticsFiltered = Diagnostic[];

export type CLIUtilityTypeCheckPrintDiagnosticsReturns = void;

export type CLIUtilityTypeCheckPrintDiagnosticsFileSet = Set<string>;

/**
 * CLI Utility - Type Check - Run.
 *
 * @since 1.0.0
 */
export type CLIUtilityTypeCheckRunOptionsProject = string;

export type CLIUtilityTypeCheckRunOptions = {
  project?: CLIUtilityTypeCheckRunOptionsProject;
};

export type CLIUtilityTypeCheckRunReturns = void;
