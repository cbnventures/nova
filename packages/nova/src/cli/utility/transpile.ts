import { dirname, resolve } from 'path';

import {
  createProgram,
  findConfigFile,
  flattenDiagnosticMessageText,
  parseJsonConfigFileContent,
  readConfigFile,
  sys,
} from 'typescript';

import { Logger } from '../../toolkit/index.js';

import type {
  CliUtilityTranspileEmitFilesProgram,
  CliUtilityTranspileEmitFilesReturns,
  CliUtilityTranspileFilterDiagnosticsCurrentDirectory,
  CliUtilityTranspileFilterDiagnosticsDiagnostics,
  CliUtilityTranspileFilterDiagnosticsFileName,
  CliUtilityTranspileFilterDiagnosticsReturns,
  CliUtilityTranspileGetConfigPathCurrentDirectory,
  CliUtilityTranspileGetConfigPathProject,
  CliUtilityTranspileGetConfigPathResolved,
  CliUtilityTranspileGetConfigPathReturns,
  CliUtilityTranspilePrintDiagnosticsCharacter,
  CliUtilityTranspilePrintDiagnosticsFileName,
  CliUtilityTranspilePrintDiagnosticsFileSet,
  CliUtilityTranspilePrintDiagnosticsFilteredDiagnostics,
  CliUtilityTranspilePrintDiagnosticsLine,
  CliUtilityTranspilePrintDiagnosticsMessage,
  CliUtilityTranspilePrintDiagnosticsPosition,
  CliUtilityTranspilePrintDiagnosticsReturns,
  CliUtilityTranspileRunConfig,
  CliUtilityTranspileRunConfigPath,
  CliUtilityTranspileRunFilteredDiagnostics,
  CliUtilityTranspileRunOptions,
  CliUtilityTranspileRunParsed,
  CliUtilityTranspileRunProgram,
  CliUtilityTranspileRunReturns,
} from '../../types/cli/utility/transpile.d.ts';

/**
 * CLI - Utility - Transpile.
 *
 * Compiles TypeScript to JavaScript and reports emit
 * diagnostics scoped to project-owned files. Shares the same pipeline as type-check.
 *
 * @since 0.14.0
 */
export class CliUtilityTranspile {
  /**
   * CLI - Utility - Transpile - Run.
   *
   * Locates tsconfig.json, creates a TypeScript program, emits output
   * files, filters diagnostics to project files, and prints compilation errors.
   *
   * @param {CliUtilityTranspileRunOptions} options - Options.
   *
   * @returns {CliUtilityTranspileRunReturns}
   *
   * @since 0.14.0
   */
  public static run(options: CliUtilityTranspileRunOptions): CliUtilityTranspileRunReturns {
    const configPath: CliUtilityTranspileRunConfigPath = CliUtilityTranspile.getConfigPath(options['project']);

    if (configPath === undefined) {
      Logger.error('No tsconfig.json found. Use --project to specify a path.');
      return;
    }

    const config: CliUtilityTranspileRunConfig = readConfigFile(configPath, sys.readFile)['config'];
    const parsed: CliUtilityTranspileRunParsed = parseJsonConfigFileContent(config, sys, dirname(configPath));
    const program: CliUtilityTranspileRunProgram = createProgram(parsed.fileNames, parsed.options);
    const filteredDiagnostics: CliUtilityTranspileRunFilteredDiagnostics = CliUtilityTranspile.filterDiagnostics(CliUtilityTranspile.emitFiles(program).diagnostics);

    CliUtilityTranspile.printDiagnostics(filteredDiagnostics);

    if (filteredDiagnostics.length > 0) {
      process.exitCode = 1;
    }

    return;
  }

  /**
   * CLI - Utility - Transpile - Get Config Path.
   *
   * Resolves the tsconfig.json path from the --project flag or
   * searches upward from the current directory. Returns undefined when not found.
   *
   * @param {CliUtilityTranspileGetConfigPathProject} project - Project.
   *
   * @private
   *
   * @returns {CliUtilityTranspileGetConfigPathReturns}
   *
   * @since 0.14.0
   */
  private static getConfigPath(project: CliUtilityTranspileGetConfigPathProject): CliUtilityTranspileGetConfigPathReturns {
    const currentDirectory: CliUtilityTranspileGetConfigPathCurrentDirectory = process.cwd();

    if (project !== undefined) {
      const resolved: CliUtilityTranspileGetConfigPathResolved = resolve(currentDirectory, project);
      return (sys.fileExists(resolved) === true) ? resolved : undefined;
    }

    return findConfigFile(currentDirectory, sys.fileExists, 'tsconfig.json');
  }

  /**
   * CLI - Utility - Transpile - Emit Files.
   *
   * Invokes program.emit to write compiled JavaScript and declaration
   * files to disk. Returns the emit result with diagnostics for reporting.
   *
   * @param {CliUtilityTranspileEmitFilesProgram} program - Program.
   *
   * @private
   *
   * @returns {CliUtilityTranspileEmitFilesReturns}
   *
   * @since 0.14.0
   */
  private static emitFiles(program: CliUtilityTranspileEmitFilesProgram): CliUtilityTranspileEmitFilesReturns {
    return program.emit();
  }

  /**
   * CLI - Utility - Transpile - Filter Diagnostics.
   *
   * Keeps only diagnostics originating from files under the current working directory and
   * excludes anything inside node_modules.
   *
   * @param {CliUtilityTranspileFilterDiagnosticsDiagnostics} diagnostics - Diagnostics.
   *
   * @private
   *
   * @returns {CliUtilityTranspileFilterDiagnosticsReturns}
   *
   * @since 0.14.0
   */
  private static filterDiagnostics(diagnostics: CliUtilityTranspileFilterDiagnosticsDiagnostics): CliUtilityTranspileFilterDiagnosticsReturns {
    const currentDirectory: CliUtilityTranspileFilterDiagnosticsCurrentDirectory = process.cwd();

    return diagnostics.filter((diagnostic) => {
      const fileName: CliUtilityTranspileFilterDiagnosticsFileName = (diagnostic.file !== undefined) ? diagnostic.file.fileName : '';
      return fileName.startsWith(currentDirectory) === true && fileName.includes('node_modules') === false;
    });
  }

  /**
   * CLI - Utility - Transpile - Print Diagnostics.
   *
   * Outputs each diagnostic with file, line, and column information
   * via Logger.error, then prints a summary of total errors and affected files.
   *
   * @param {CliUtilityTranspilePrintDiagnosticsFilteredDiagnostics} filteredDiagnostics - Filtered diagnostics.
   *
   * @private
   *
   * @returns {CliUtilityTranspilePrintDiagnosticsReturns}
   *
   * @since 0.14.0
   */
  private static printDiagnostics(filteredDiagnostics: CliUtilityTranspilePrintDiagnosticsFilteredDiagnostics): CliUtilityTranspilePrintDiagnosticsReturns {
    const fileSet: CliUtilityTranspilePrintDiagnosticsFileSet = new Set();

    for (const filteredDiagnostic of filteredDiagnostics) {
      const fileName: CliUtilityTranspilePrintDiagnosticsFileName = (filteredDiagnostic.file !== undefined) ? filteredDiagnostic.file.fileName : 'unknown';
      const message: CliUtilityTranspilePrintDiagnosticsMessage = flattenDiagnosticMessageText(filteredDiagnostic.messageText, '\n');

      fileSet.add(fileName);

      if (filteredDiagnostic.file !== undefined && filteredDiagnostic.start !== undefined) {
        const position: CliUtilityTranspilePrintDiagnosticsPosition = filteredDiagnostic.file.getLineAndCharacterOfPosition(filteredDiagnostic.start);
        const line: CliUtilityTranspilePrintDiagnosticsLine = position.line;
        const character: CliUtilityTranspilePrintDiagnosticsCharacter = position.character;

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
