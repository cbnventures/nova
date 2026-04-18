import { dirname, resolve } from 'path';

import {
  createProgram,
  findConfigFile,
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics,
  parseJsonConfigFileContent,
  readConfigFile,
  sys,
} from 'typescript';

import { Logger } from '../../toolkit/index.js';

import type {
  CliUtilityTypeCheckFilterDiagnosticsCurrentDirectory,
  CliUtilityTypeCheckFilterDiagnosticsDiagnostics,
  CliUtilityTypeCheckFilterDiagnosticsFileName,
  CliUtilityTypeCheckFilterDiagnosticsReturns,
  CliUtilityTypeCheckGetConfigPathCurrentDirectory,
  CliUtilityTypeCheckGetConfigPathProject,
  CliUtilityTypeCheckGetConfigPathResolved,
  CliUtilityTypeCheckGetConfigPathReturns,
  CliUtilityTypeCheckGetDiagnosticsProgram,
  CliUtilityTypeCheckGetDiagnosticsReturns,
  CliUtilityTypeCheckPrintDiagnosticsCharacter,
  CliUtilityTypeCheckPrintDiagnosticsFileName,
  CliUtilityTypeCheckPrintDiagnosticsFileSet,
  CliUtilityTypeCheckPrintDiagnosticsFilteredDiagnostics,
  CliUtilityTypeCheckPrintDiagnosticsLine,
  CliUtilityTypeCheckPrintDiagnosticsMessage,
  CliUtilityTypeCheckPrintDiagnosticsPosition,
  CliUtilityTypeCheckPrintDiagnosticsReturns,
  CliUtilityTypeCheckRunConfig,
  CliUtilityTypeCheckRunConfigPath,
  CliUtilityTypeCheckRunFilteredDiagnostics,
  CliUtilityTypeCheckRunOptions,
  CliUtilityTypeCheckRunParsed,
  CliUtilityTypeCheckRunProgram,
  CliUtilityTypeCheckRunReturns,
} from '../../types/cli/utility/type-check.d.ts';

/**
 * CLI - Utility - Type Check.
 *
 * Runs the TypeScript compiler in type-check-only mode and filters
 * diagnostics to project-owned files, excluding node_modules.
 *
 * @since 0.13.0
 */
export class CliUtilityTypeCheck {
  /**
   * CLI - Utility - Type Check - Run.
   *
   * Locates tsconfig.json, creates a TypeScript program, collects
   * pre-emit diagnostics, filters them to project files, and prints errors found.
   *
   * @param {CliUtilityTypeCheckRunOptions} options - Options.
   *
   * @returns {CliUtilityTypeCheckRunReturns}
   *
   * @since 0.13.0
   */
  public static run(options: CliUtilityTypeCheckRunOptions): CliUtilityTypeCheckRunReturns {
    const configPath: CliUtilityTypeCheckRunConfigPath = CliUtilityTypeCheck.getConfigPath(options['project']);

    if (configPath === undefined) {
      Logger.error('No tsconfig.json found. Use --project to specify a path.');
      return;
    }

    const config: CliUtilityTypeCheckRunConfig = readConfigFile(configPath, sys.readFile)['config'];
    const parsed: CliUtilityTypeCheckRunParsed = parseJsonConfigFileContent(config, sys, dirname(configPath));
    const program: CliUtilityTypeCheckRunProgram = createProgram(parsed.fileNames, parsed.options);
    const filteredDiagnostics: CliUtilityTypeCheckRunFilteredDiagnostics = CliUtilityTypeCheck.filterDiagnostics(CliUtilityTypeCheck.getDiagnostics(program));

    CliUtilityTypeCheck.printDiagnostics(filteredDiagnostics);

    if (filteredDiagnostics.length > 0) {
      process.exitCode = 1;
    }

    return;
  }

  /**
   * CLI - Utility - Type Check - Get Config Path.
   *
   * Resolves the tsconfig.json path from the --project flag or
   * searches upward from the current directory. Returns undefined when not found.
   *
   * @param {CliUtilityTypeCheckGetConfigPathProject} project - Project.
   *
   * @private
   *
   * @returns {CliUtilityTypeCheckGetConfigPathReturns}
   *
   * @since 0.13.0
   */
  private static getConfigPath(project: CliUtilityTypeCheckGetConfigPathProject): CliUtilityTypeCheckGetConfigPathReturns {
    const currentDirectory: CliUtilityTypeCheckGetConfigPathCurrentDirectory = process.cwd();

    if (project !== undefined) {
      const resolved: CliUtilityTypeCheckGetConfigPathResolved = resolve(currentDirectory, project);
      return (sys.fileExists(resolved) === true) ? resolved : undefined;
    }

    return findConfigFile(currentDirectory, sys.fileExists, 'tsconfig.json');
  }

  /**
   * CLI - Utility - Type Check - Get Diagnostics.
   *
   * Extracts all pre-emit diagnostics from the TypeScript program
   * without emitting output files to disk. Wrapped for testability.
   *
   * @param {CliUtilityTypeCheckGetDiagnosticsProgram} program - Program.
   *
   * @private
   *
   * @returns {CliUtilityTypeCheckGetDiagnosticsReturns}
   *
   * @since 0.13.0
   */
  private static getDiagnostics(program: CliUtilityTypeCheckGetDiagnosticsProgram): CliUtilityTypeCheckGetDiagnosticsReturns {
    return getPreEmitDiagnostics(program);
  }

  /**
   * CLI - Utility - Type Check - Filter Diagnostics.
   *
   * Keeps only diagnostics originating from files under the current working directory and
   * excludes anything inside node_modules.
   *
   * @param {CliUtilityTypeCheckFilterDiagnosticsDiagnostics} diagnostics - Diagnostics.
   *
   * @private
   *
   * @returns {CliUtilityTypeCheckFilterDiagnosticsReturns}
   *
   * @since 0.13.0
   */
  private static filterDiagnostics(diagnostics: CliUtilityTypeCheckFilterDiagnosticsDiagnostics): CliUtilityTypeCheckFilterDiagnosticsReturns {
    const currentDirectory: CliUtilityTypeCheckFilterDiagnosticsCurrentDirectory = process.cwd();

    return diagnostics.filter((diagnostic) => {
      const fileName: CliUtilityTypeCheckFilterDiagnosticsFileName = (diagnostic.file !== undefined) ? diagnostic.file.fileName : '';
      return fileName.startsWith(currentDirectory) === true && fileName.includes('node_modules') === false;
    });
  }

  /**
   * CLI - Utility - Type Check - Print Diagnostics.
   *
   * Outputs each diagnostic with file, line, and column information
   * via Logger.error, then prints a summary of total errors and affected files.
   *
   * @param {CliUtilityTypeCheckPrintDiagnosticsFilteredDiagnostics} filteredDiagnostics - Filtered diagnostics.
   *
   * @private
   *
   * @returns {CliUtilityTypeCheckPrintDiagnosticsReturns}
   *
   * @since 0.13.0
   */
  private static printDiagnostics(filteredDiagnostics: CliUtilityTypeCheckPrintDiagnosticsFilteredDiagnostics): CliUtilityTypeCheckPrintDiagnosticsReturns {
    const fileSet: CliUtilityTypeCheckPrintDiagnosticsFileSet = new Set();

    for (const filteredDiagnostic of filteredDiagnostics) {
      const fileName: CliUtilityTypeCheckPrintDiagnosticsFileName = (filteredDiagnostic.file !== undefined) ? filteredDiagnostic.file.fileName : 'unknown';
      const message: CliUtilityTypeCheckPrintDiagnosticsMessage = flattenDiagnosticMessageText(filteredDiagnostic.messageText, '\n');

      fileSet.add(fileName);

      if (filteredDiagnostic.file !== undefined && filteredDiagnostic.start !== undefined) {
        const position: CliUtilityTypeCheckPrintDiagnosticsPosition = filteredDiagnostic.file.getLineAndCharacterOfPosition(filteredDiagnostic.start);
        const line: CliUtilityTypeCheckPrintDiagnosticsLine = position.line;
        const character: CliUtilityTypeCheckPrintDiagnosticsCharacter = position.character;

        Logger.error(`${fileName}:${line + 1}:${character + 1} - ${message}`);
      } else {
        Logger.error(message);
      }
    }

    if (filteredDiagnostics.length > 0) {
      Logger.info(`Found ${filteredDiagnostics.length} error(s) in ${fileSet.size} file(s).`);
    } else {
      Logger.info('No type errors found.');
    }

    return;
  }
}
