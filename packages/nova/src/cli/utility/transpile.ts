import { dirname, resolve } from 'path';

import {
  createProgram,
  findConfigFile,
  flattenDiagnosticMessageText,
  parseJsonConfigFileContent,
  readConfigFile,
  sys,
} from 'typescript';

import { Logger } from '@/toolkit/index.js';

import type {
  CLIUtilityTranspileEmitFilesProgram,
  CLIUtilityTranspileEmitFilesReturns,
  CLIUtilityTranspileFilterDiagnosticsDiagnostics,
  CLIUtilityTranspileFilterDiagnosticsReturns,
  CLIUtilityTranspileGetConfigPathProject,
  CLIUtilityTranspileGetConfigPathReturns,
  CLIUtilityTranspilePrintDiagnosticsFileSet,
  CLIUtilityTranspilePrintDiagnosticsFiltered,
  CLIUtilityTranspilePrintDiagnosticsReturns,
  CLIUtilityTranspileRunOptions,
  CLIUtilityTranspileRunReturns,
} from '@/types/cli/utility/transpile.d.ts';

/**
 * CLI Utility - Transpile.
 *
 * @since 1.0.0
 */
export class CLIUtilityTranspile {
  /**
   * CLI Utility - Transpile - Run.
   *
   * @param {CLIUtilityTranspileRunOptions} options - Options.
   *
   * @returns {CLIUtilityTranspileRunReturns}
   *
   * @since 1.0.0
   */
  public static run(options: CLIUtilityTranspileRunOptions): CLIUtilityTranspileRunReturns {
    const configPath = CLIUtilityTranspile.getConfigPath(options.project);

    if (configPath === undefined) {
      Logger.error('No tsconfig.json found. Use --project to specify a path.');
      return;
    }

    const { config } = readConfigFile(configPath, sys.readFile);
    const parsed = parseJsonConfigFileContent(config, sys, dirname(configPath));
    const program = createProgram(parsed.fileNames, parsed.options);
    const emitResult = CLIUtilityTranspile.emitFiles(program);
    const filtered = CLIUtilityTranspile.filterDiagnostics(emitResult.diagnostics);

    CLIUtilityTranspile.printDiagnostics(filtered);

    if (filtered.length > 0) {
      process.exitCode = 1;
    }
  }

  /**
   * CLI Utility - Transpile - Get config path.
   *
   * @param {CLIUtilityTranspileGetConfigPathProject} project - Project.
   *
   * @private
   *
   * @returns {CLIUtilityTranspileGetConfigPathReturns}
   *
   * @since 1.0.0
   */
  private static getConfigPath(project: CLIUtilityTranspileGetConfigPathProject): CLIUtilityTranspileGetConfigPathReturns {
    if (project !== undefined) {
      const resolved = resolve(process.cwd(), project);
      return (sys.fileExists(resolved)) ? resolved : undefined;
    }

    return findConfigFile(process.cwd(), sys.fileExists, 'tsconfig.json');
  }

  /**
   * CLI Utility - Transpile - Emit files.
   *
   * @param {CLIUtilityTranspileEmitFilesProgram} program - Program.
   *
   * @private
   *
   * @returns {CLIUtilityTranspileEmitFilesReturns}
   *
   * @since 1.0.0
   */
  private static emitFiles(program: CLIUtilityTranspileEmitFilesProgram): CLIUtilityTranspileEmitFilesReturns {
    return program.emit();
  }

  /**
   * CLI Utility - Transpile - Filter diagnostics.
   *
   * @param {CLIUtilityTranspileFilterDiagnosticsDiagnostics} diagnostics - Diagnostics.
   *
   * @private
   *
   * @returns {CLIUtilityTranspileFilterDiagnosticsReturns}
   *
   * @since 1.0.0
   */
  private static filterDiagnostics(diagnostics: CLIUtilityTranspileFilterDiagnosticsDiagnostics): CLIUtilityTranspileFilterDiagnosticsReturns {
    return diagnostics.filter((diagnostic) => {
      const fileName = (diagnostic.file !== undefined) ? diagnostic.file.fileName : '';
      return fileName.startsWith(process.cwd()) && !fileName.includes('node_modules');
    });
  }

  /**
   * CLI Utility - Transpile - Print diagnostics.
   *
   * @param {CLIUtilityTranspilePrintDiagnosticsFiltered} filtered - Filtered.
   *
   * @private
   *
   * @returns {CLIUtilityTranspilePrintDiagnosticsReturns}
   *
   * @since 1.0.0
   */
  private static printDiagnostics(filtered: CLIUtilityTranspilePrintDiagnosticsFiltered): CLIUtilityTranspilePrintDiagnosticsReturns {
    const fileSet: CLIUtilityTranspilePrintDiagnosticsFileSet = new Set();

    for (const diagnostic of filtered) {
      const fileName = (diagnostic.file !== undefined) ? diagnostic.file.fileName : 'unknown';
      const message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');

      fileSet.add(fileName);

      if (diagnostic.file !== undefined && diagnostic.start !== undefined) {
        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        Logger.error(`${fileName}:${line + 1}:${character + 1} - ${message}`);
      } else {
        Logger.error(message);
      }
    }

    if (filtered.length > 0) {
      Logger.info(`Found ${filtered.length} error(s) in ${fileSet.size} file(s).`);
    } else {
      Logger.info('No type errors found.');
    }
  }
}
