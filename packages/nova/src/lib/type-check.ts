import { dirname, resolve } from 'node:path';

import {
  createProgram,
  findConfigFile,
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics,
  parseJsonConfigFileContent,
  readConfigFile,
  sys,
} from 'typescript';

import type {
  Lib_TypeCheck_FilterDiagnostics_CurrentDirectory,
  Lib_TypeCheck_FilterDiagnostics_Diagnostics,
  Lib_TypeCheck_FilterDiagnostics_FileName,
  Lib_TypeCheck_FilterDiagnostics_Returns,
  Lib_TypeCheck_GetConfigPath_CurrentDirectory,
  Lib_TypeCheck_GetConfigPath_Project,
  Lib_TypeCheck_GetConfigPath_Resolved,
  Lib_TypeCheck_GetConfigPath_Returns,
  Lib_TypeCheck_GetDiagnostics_Program,
  Lib_TypeCheck_GetDiagnostics_Returns,
  Lib_TypeCheck_PrintDiagnostics_Character,
  Lib_TypeCheck_PrintDiagnostics_Diagnostics,
  Lib_TypeCheck_PrintDiagnostics_FileName,
  Lib_TypeCheck_PrintDiagnostics_FileSet,
  Lib_TypeCheck_PrintDiagnostics_Line,
  Lib_TypeCheck_PrintDiagnostics_Message,
  Lib_TypeCheck_PrintDiagnostics_Position,
  Lib_TypeCheck_PrintDiagnostics_PrintError,
  Lib_TypeCheck_PrintDiagnostics_PrintInfo,
  Lib_TypeCheck_PrintDiagnostics_Returns,
  Lib_TypeCheck_RunTypeCheck_Config,
  Lib_TypeCheck_RunTypeCheck_ConfigPath,
  Lib_TypeCheck_RunTypeCheck_ConfigResult,
  Lib_TypeCheck_RunTypeCheck_CurrentDirectory,
  Lib_TypeCheck_RunTypeCheck_FilteredDiagnostics,
  Lib_TypeCheck_RunTypeCheck_Options,
  Lib_TypeCheck_RunTypeCheck_Parsed,
  Lib_TypeCheck_RunTypeCheck_Program,
  Lib_TypeCheck_RunTypeCheck_Returns,
} from '../types/lib/type-check.d.ts';

/**
 * Lib - Type Check - Filter Diagnostics.
 *
 * Keeps project-owned program diagnostics while excluding dependency files.
 * Configuration diagnostics bypass this filter so invalid settings stay visible.
 *
 * @param {Lib_TypeCheck_FilterDiagnostics_Diagnostics}      diagnostics      - Diagnostics.
 * @param {Lib_TypeCheck_FilterDiagnostics_CurrentDirectory} currentDirectory - Current directory.
 *
 * @returns {Lib_TypeCheck_FilterDiagnostics_Returns}
 *
 * @since 0.26.0
 */
function filterDiagnostics(diagnostics: Lib_TypeCheck_FilterDiagnostics_Diagnostics, currentDirectory: Lib_TypeCheck_FilterDiagnostics_CurrentDirectory): Lib_TypeCheck_FilterDiagnostics_Returns {
  return diagnostics.filter((diagnostic) => {
    if (diagnostic.file === undefined) {
      return true;
    }

    const fileName: Lib_TypeCheck_FilterDiagnostics_FileName = diagnostic.file.fileName;

    return fileName.startsWith(currentDirectory) === true && fileName.includes('node_modules') === false;
  });
}

/**
 * Lib - Type Check - Get Config Path.
 *
 * Resolves an explicit TSConfig path or searches for the default project file.
 * A missing file returns undefined so both callers report the same failure.
 *
 * @param {Lib_TypeCheck_GetConfigPath_Project}          project          - Project.
 * @param {Lib_TypeCheck_GetConfigPath_CurrentDirectory} currentDirectory - Current directory.
 *
 * @returns {Lib_TypeCheck_GetConfigPath_Returns}
 *
 * @since 0.26.0
 */
function getConfigPath(project: Lib_TypeCheck_GetConfigPath_Project, currentDirectory: Lib_TypeCheck_GetConfigPath_CurrentDirectory): Lib_TypeCheck_GetConfigPath_Returns {
  if (project !== undefined) {
    const resolved: Lib_TypeCheck_GetConfigPath_Resolved = resolve(currentDirectory, project);

    return (sys.fileExists(resolved) === true) ? resolved : undefined;
  }

  return findConfigFile(currentDirectory, sys.fileExists, 'tsconfig.json');
}

/**
 * Lib - Type Check - Get Diagnostics.
 *
 * Collects every pre-emit compiler diagnostic without writing output files.
 * The wrapper keeps this operation isolated for focused regression coverage.
 *
 * @param {Lib_TypeCheck_GetDiagnostics_Program} program - Program.
 *
 * @returns {Lib_TypeCheck_GetDiagnostics_Returns}
 *
 * @since 0.26.0
 */
function getDiagnostics(program: Lib_TypeCheck_GetDiagnostics_Program): Lib_TypeCheck_GetDiagnostics_Returns {
  return getPreEmitDiagnostics(program);
}

/**
 * Lib - Type Check - Print Diagnostics.
 *
 * Formats compiler diagnostics once while callers choose their output surface.
 * This keeps Logger and direct stdio behavior aligned without coupling them.
 *
 * @param {Lib_TypeCheck_PrintDiagnostics_Diagnostics} diagnostics - Diagnostics.
 * @param {Lib_TypeCheck_PrintDiagnostics_PrintError}  printError  - Print error.
 * @param {Lib_TypeCheck_PrintDiagnostics_PrintInfo}   printInfo   - Print info.
 *
 * @returns {Lib_TypeCheck_PrintDiagnostics_Returns}
 *
 * @since 0.26.0
 */
function printDiagnostics(diagnostics: Lib_TypeCheck_PrintDiagnostics_Diagnostics, printError: Lib_TypeCheck_PrintDiagnostics_PrintError, printInfo: Lib_TypeCheck_PrintDiagnostics_PrintInfo): Lib_TypeCheck_PrintDiagnostics_Returns {
  const fileSet: Lib_TypeCheck_PrintDiagnostics_FileSet = new Set();

  for (const diagnostic of diagnostics) {
    const fileName: Lib_TypeCheck_PrintDiagnostics_FileName = (diagnostic.file !== undefined) ? diagnostic.file.fileName : 'unknown';
    const message: Lib_TypeCheck_PrintDiagnostics_Message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    fileSet.add(fileName);

    if (diagnostic.file !== undefined && diagnostic.start !== undefined) {
      const position: Lib_TypeCheck_PrintDiagnostics_Position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      const line: Lib_TypeCheck_PrintDiagnostics_Line = position.line;
      const character: Lib_TypeCheck_PrintDiagnostics_Character = position.character;

      printError(`${fileName}:${line + 1}:${character + 1} - ${message}`);
    } else {
      printError(message);
    }
  }

  if (diagnostics.length > 0) {
    printInfo(`Found ${diagnostics.length} error(s) in ${fileSet.size} file(s).`);
  } else {
    printInfo('No type errors found.');
  }

  return;
}

/**
 * Lib - Type Check - Run Type Check.
 *
 * Runs Nova's canonical pre-build-safe TypeScript diagnostic pipeline.
 * The public CLI and repository bootstrap provide only their output adapters.
 *
 * @param {Lib_TypeCheck_RunTypeCheck_Options} options - Options.
 *
 * @returns {Lib_TypeCheck_RunTypeCheck_Returns}
 *
 * @since 0.26.0
 */
export function runTypeCheck(options: Lib_TypeCheck_RunTypeCheck_Options): Lib_TypeCheck_RunTypeCheck_Returns {
  const currentDirectory: Lib_TypeCheck_RunTypeCheck_CurrentDirectory = process.cwd();
  const configPath: Lib_TypeCheck_RunTypeCheck_ConfigPath = getConfigPath(options['project'], currentDirectory);

  if (configPath === undefined) {
    options.printError('No tsconfig.json found. Use --project to specify a path.');

    return 1;
  }

  const configResult: Lib_TypeCheck_RunTypeCheck_ConfigResult = readConfigFile(configPath, sys.readFile);

  if (configResult['error'] !== undefined) {
    printDiagnostics([configResult['error']], options['printError'], options['printInfo']);

    return 1;
  }

  const config: Lib_TypeCheck_RunTypeCheck_Config = configResult['config'];
  const parsed: Lib_TypeCheck_RunTypeCheck_Parsed = parseJsonConfigFileContent(config, sys, dirname(configPath));

  if (parsed.errors.length > 0) {
    printDiagnostics(parsed.errors, options['printError'], options['printInfo']);

    return 1;
  }

  const program: Lib_TypeCheck_RunTypeCheck_Program = createProgram(parsed.fileNames, parsed.options);
  const filteredDiagnostics: Lib_TypeCheck_RunTypeCheck_FilteredDiagnostics = filterDiagnostics(getDiagnostics(program), currentDirectory);

  printDiagnostics(filteredDiagnostics, options['printError'], options['printInfo']);

  return (filteredDiagnostics.length > 0) ? 1 : 0;
}
