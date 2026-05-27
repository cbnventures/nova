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
  Cli_Utility_Transpile_Runner_EmitFiles_Program,
  Cli_Utility_Transpile_Runner_EmitFiles_Returns,
  Cli_Utility_Transpile_Runner_FilterDiagnostics_CurrentDirectory,
  Cli_Utility_Transpile_Runner_FilterDiagnostics_Diagnostics,
  Cli_Utility_Transpile_Runner_FilterDiagnostics_FileName,
  Cli_Utility_Transpile_Runner_FilterDiagnostics_Returns,
  Cli_Utility_Transpile_Runner_GetConfigPath_CurrentDirectory,
  Cli_Utility_Transpile_Runner_GetConfigPath_Project,
  Cli_Utility_Transpile_Runner_GetConfigPath_Resolved,
  Cli_Utility_Transpile_Runner_GetConfigPath_Returns,
  Cli_Utility_Transpile_Runner_PrintDiagnostics_Character,
  Cli_Utility_Transpile_Runner_PrintDiagnostics_FileName,
  Cli_Utility_Transpile_Runner_PrintDiagnostics_FileSet,
  Cli_Utility_Transpile_Runner_PrintDiagnostics_FilteredDiagnostics,
  Cli_Utility_Transpile_Runner_PrintDiagnostics_Line,
  Cli_Utility_Transpile_Runner_PrintDiagnostics_Message,
  Cli_Utility_Transpile_Runner_PrintDiagnostics_Position,
  Cli_Utility_Transpile_Runner_PrintDiagnostics_Returns,
  Cli_Utility_Transpile_Runner_Run_Config,
  Cli_Utility_Transpile_Runner_Run_ConfigPath,
  Cli_Utility_Transpile_Runner_Run_FilteredDiagnostics,
  Cli_Utility_Transpile_Runner_Run_Options,
  Cli_Utility_Transpile_Runner_Run_Parsed,
  Cli_Utility_Transpile_Runner_Run_Program,
  Cli_Utility_Transpile_Runner_Run_Returns,
} from '../../types/cli/utility/transpile.d.ts';

/**
 * CLI - Utility - Transpile.
 *
 * Compiles TypeScript to JavaScript and reports emit
 * diagnostics scoped to project-owned files. Shares the same pipeline as type-check.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Utility - Transpile - Run.
   *
   * Locates tsconfig.json, creates a TypeScript program, emits output
   * files, filters diagnostics to project files, and prints compilation errors.
   *
   * @param {Cli_Utility_Transpile_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_Transpile_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static run(options: Cli_Utility_Transpile_Runner_Run_Options): Cli_Utility_Transpile_Runner_Run_Returns {
    const configPath: Cli_Utility_Transpile_Runner_Run_ConfigPath = Runner.getConfigPath(options['project']);

    if (configPath === undefined) {
      Logger.error('No tsconfig.json found. Use --project to specify a path.');
      return;
    }

    const config: Cli_Utility_Transpile_Runner_Run_Config = readConfigFile(configPath, sys.readFile)['config'];
    const parsed: Cli_Utility_Transpile_Runner_Run_Parsed = parseJsonConfigFileContent(config, sys, dirname(configPath));
    const program: Cli_Utility_Transpile_Runner_Run_Program = createProgram(parsed.fileNames, parsed.options);
    const filteredDiagnostics: Cli_Utility_Transpile_Runner_Run_FilteredDiagnostics = Runner.filterDiagnostics(Runner.emitFiles(program).diagnostics);

    Runner.printDiagnostics(filteredDiagnostics);

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
   * @param {Cli_Utility_Transpile_Runner_GetConfigPath_Project} project - Project.
   *
   * @private
   *
   * @returns {Cli_Utility_Transpile_Runner_GetConfigPath_Returns}
   *
   * @since 0.14.0
   */
  private static getConfigPath(project: Cli_Utility_Transpile_Runner_GetConfigPath_Project): Cli_Utility_Transpile_Runner_GetConfigPath_Returns {
    const currentDirectory: Cli_Utility_Transpile_Runner_GetConfigPath_CurrentDirectory = process.cwd();

    if (project !== undefined) {
      const resolved: Cli_Utility_Transpile_Runner_GetConfigPath_Resolved = resolve(currentDirectory, project);
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
   * @param {Cli_Utility_Transpile_Runner_EmitFiles_Program} program - Program.
   *
   * @private
   *
   * @returns {Cli_Utility_Transpile_Runner_EmitFiles_Returns}
   *
   * @since 0.14.0
   */
  private static emitFiles(program: Cli_Utility_Transpile_Runner_EmitFiles_Program): Cli_Utility_Transpile_Runner_EmitFiles_Returns {
    return program.emit();
  }

  /**
   * CLI - Utility - Transpile - Filter Diagnostics.
   *
   * Keeps only diagnostics originating from files under the current working directory and
   * excludes anything inside node_modules.
   *
   * @param {Cli_Utility_Transpile_Runner_FilterDiagnostics_Diagnostics} diagnostics - Diagnostics.
   *
   * @private
   *
   * @returns {Cli_Utility_Transpile_Runner_FilterDiagnostics_Returns}
   *
   * @since 0.14.0
   */
  private static filterDiagnostics(diagnostics: Cli_Utility_Transpile_Runner_FilterDiagnostics_Diagnostics): Cli_Utility_Transpile_Runner_FilterDiagnostics_Returns {
    const currentDirectory: Cli_Utility_Transpile_Runner_FilterDiagnostics_CurrentDirectory = process.cwd();

    return diagnostics.filter((diagnostic) => {
      const fileName: Cli_Utility_Transpile_Runner_FilterDiagnostics_FileName = (diagnostic.file !== undefined) ? diagnostic.file.fileName : '';
      return fileName.startsWith(currentDirectory) === true && fileName.includes('node_modules') === false;
    });
  }

  /**
   * CLI - Utility - Transpile - Print Diagnostics.
   *
   * Outputs each diagnostic with file, line, and column information
   * via Logger.error, then prints a summary of total errors and affected files.
   *
   * @param {Cli_Utility_Transpile_Runner_PrintDiagnostics_FilteredDiagnostics} filteredDiagnostics - Filtered diagnostics.
   *
   * @private
   *
   * @returns {Cli_Utility_Transpile_Runner_PrintDiagnostics_Returns}
   *
   * @since 0.14.0
   */
  private static printDiagnostics(filteredDiagnostics: Cli_Utility_Transpile_Runner_PrintDiagnostics_FilteredDiagnostics): Cli_Utility_Transpile_Runner_PrintDiagnostics_Returns {
    const fileSet: Cli_Utility_Transpile_Runner_PrintDiagnostics_FileSet = new Set();

    for (const filteredDiagnostic of filteredDiagnostics) {
      const fileName: Cli_Utility_Transpile_Runner_PrintDiagnostics_FileName = (filteredDiagnostic.file !== undefined) ? filteredDiagnostic.file.fileName : 'unknown';
      const message: Cli_Utility_Transpile_Runner_PrintDiagnostics_Message = flattenDiagnosticMessageText(filteredDiagnostic.messageText, '\n');

      fileSet.add(fileName);

      if (filteredDiagnostic.file !== undefined && filteredDiagnostic.start !== undefined) {
        const position: Cli_Utility_Transpile_Runner_PrintDiagnostics_Position = filteredDiagnostic.file.getLineAndCharacterOfPosition(filteredDiagnostic.start);
        const line: Cli_Utility_Transpile_Runner_PrintDiagnostics_Line = position.line;
        const character: Cli_Utility_Transpile_Runner_PrintDiagnostics_Character = position.character;

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
