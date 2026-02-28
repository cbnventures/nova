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

import { Logger } from '@/toolkit/index.js';

import type {
  CLIUtilityTypeCheckFilterDiagnosticsDiagnostics,
  CLIUtilityTypeCheckFilterDiagnosticsReturns,
  CLIUtilityTypeCheckGetConfigPathProject,
  CLIUtilityTypeCheckGetConfigPathReturns,
  CLIUtilityTypeCheckGetDiagnosticsParsed,
  CLIUtilityTypeCheckGetDiagnosticsReturns,
  CLIUtilityTypeCheckPrintDiagnosticsFileSet,
  CLIUtilityTypeCheckPrintDiagnosticsFiltered,
  CLIUtilityTypeCheckPrintDiagnosticsReturns,
  CLIUtilityTypeCheckRunOptions,
  CLIUtilityTypeCheckRunReturns,
} from '@/types/cli/utility/type-check.d.ts';

/**
 * CLI Utility - Type Check.
 *
 * @since 1.0.0
 */
export class CLIUtilityTypeCheck {
  /**
   * CLI Utility - Type Check - Run.
   *
   * @param {CLIUtilityTypeCheckRunOptions} options - Options.
   *
   * @returns {CLIUtilityTypeCheckRunReturns}
   *
   * @since 1.0.0
   */
  public static run(options: CLIUtilityTypeCheckRunOptions): CLIUtilityTypeCheckRunReturns {
    const configPath = CLIUtilityTypeCheck.getConfigPath(options.project);

    if (configPath === undefined) {
      Logger.error('No tsconfig.json found. Use --project to specify a path.');
      return;
    }

    const { config } = readConfigFile(configPath, sys.readFile);
    const parsed = parseJsonConfigFileContent(config, sys, dirname(configPath));

    const diagnostics = CLIUtilityTypeCheck.getDiagnostics(parsed);
    const filtered = CLIUtilityTypeCheck.filterDiagnostics(diagnostics);

    CLIUtilityTypeCheck.printDiagnostics(filtered);

    if (filtered.length > 0) {
      process.exitCode = 1;
    }
  }

  /**
   * CLI Utility - Type Check - Get config path.
   *
   * @param {CLIUtilityTypeCheckGetConfigPathProject} project - Project.
   *
   * @private
   *
   * @returns {CLIUtilityTypeCheckGetConfigPathReturns}
   *
   * @since 1.0.0
   */
  private static getConfigPath(project: CLIUtilityTypeCheckGetConfigPathProject): CLIUtilityTypeCheckGetConfigPathReturns {
    if (project !== undefined) {
      const resolved = resolve(process.cwd(), project);
      return (sys.fileExists(resolved)) ? resolved : undefined;
    }

    return findConfigFile(process.cwd(), sys.fileExists, 'tsconfig.json');
  }

  /**
   * CLI Utility - Type Check - Get diagnostics.
   *
   * @param {CLIUtilityTypeCheckGetDiagnosticsParsed} parsed - Parsed.
   *
   * @private
   *
   * @returns {CLIUtilityTypeCheckGetDiagnosticsReturns}
   *
   * @since 1.0.0
   */
  private static getDiagnostics(parsed: CLIUtilityTypeCheckGetDiagnosticsParsed): CLIUtilityTypeCheckGetDiagnosticsReturns {
    const program = createProgram(parsed.fileNames, parsed.options);
    return getPreEmitDiagnostics(program);
  }

  /**
   * CLI Utility - Type Check - Filter diagnostics.
   *
   * @param {CLIUtilityTypeCheckFilterDiagnosticsDiagnostics} diagnostics - Diagnostics.
   *
   * @private
   *
   * @returns {CLIUtilityTypeCheckFilterDiagnosticsReturns}
   *
   * @since 1.0.0
   */
  private static filterDiagnostics(diagnostics: CLIUtilityTypeCheckFilterDiagnosticsDiagnostics): CLIUtilityTypeCheckFilterDiagnosticsReturns {
    return diagnostics.filter((diagnostic) => {
      const fileName = (diagnostic.file !== undefined) ? diagnostic.file.fileName : '';
      return fileName.startsWith(process.cwd()) && !fileName.includes('node_modules');
    });
  }

  /**
   * CLI Utility - Type Check - Print diagnostics.
   *
   * @param {CLIUtilityTypeCheckPrintDiagnosticsFiltered} filtered - Filtered.
   *
   * @private
   *
   * @returns {CLIUtilityTypeCheckPrintDiagnosticsReturns}
   *
   * @since 1.0.0
   */
  private static printDiagnostics(filtered: CLIUtilityTypeCheckPrintDiagnosticsFiltered): CLIUtilityTypeCheckPrintDiagnosticsReturns {
    const fileSet: CLIUtilityTypeCheckPrintDiagnosticsFileSet = new Set();

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
