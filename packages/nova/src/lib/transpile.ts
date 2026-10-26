import { dirname, resolve } from 'node:path';

import {
  createEmitAndSemanticDiagnosticsBuilderProgram,
  createProgram,
  createWatchCompilerHost,
  createWatchProgram,
  findConfigFile,
  flattenDiagnosticMessageText,
  parseJsonConfigFileContent,
  readConfigFile,
  sys,
} from 'typescript';

import {
  getDiagnostics,
  isProjectOwnedFile,
  normalizeDiagnosticFileName,
} from './type-check.js';

import type {
  Lib_Transpile_Compile_CompilerOptions,
  Lib_Transpile_Compile_Config,
  Lib_Transpile_Compile_ConfigParseDiagnostics,
  Lib_Transpile_Compile_ConfigPath,
  Lib_Transpile_Compile_ConfigReadDiagnostics,
  Lib_Transpile_Compile_ConfigResult,
  Lib_Transpile_Compile_CurrentDirectory,
  Lib_Transpile_Compile_Diagnostics,
  Lib_Transpile_Compile_EmitDiagnostics,
  Lib_Transpile_Compile_EmitResult,
  Lib_Transpile_Compile_Options,
  Lib_Transpile_Compile_Parsed,
  Lib_Transpile_Compile_PreEmitDiagnostics,
  Lib_Transpile_Compile_Program,
  Lib_Transpile_Compile_Returns,
  Lib_Transpile_Compile_ShouldBlockEmit,
  Lib_Transpile_FilterDiagnostics_CurrentDirectory,
  Lib_Transpile_FilterDiagnostics_Diagnostics,
  Lib_Transpile_FilterDiagnostics_FileName,
  Lib_Transpile_FilterDiagnostics_Returns,
  Lib_Transpile_GetConfigPath_CurrentDirectory,
  Lib_Transpile_GetConfigPath_Discovered,
  Lib_Transpile_GetConfigPath_Project,
  Lib_Transpile_GetConfigPath_Resolved,
  Lib_Transpile_GetConfigPath_Returns,
  Lib_Transpile_PrintDiagnostics_Character,
  Lib_Transpile_PrintDiagnostics_Diagnostics,
  Lib_Transpile_PrintDiagnostics_FileName,
  Lib_Transpile_PrintDiagnostics_FileSet,
  Lib_Transpile_PrintDiagnostics_Line,
  Lib_Transpile_PrintDiagnostics_Message,
  Lib_Transpile_PrintDiagnostics_Position,
  Lib_Transpile_PrintDiagnostics_PrintError,
  Lib_Transpile_PrintDiagnostics_PrintInfo,
  Lib_Transpile_PrintDiagnostics_Returns,
  Lib_Transpile_RunTranspile_ConfigPath,
  Lib_Transpile_RunTranspile_CurrentDirectory,
  Lib_Transpile_RunTranspile_Options,
  Lib_Transpile_RunTranspile_Returns,
  Lib_Transpile_StartWatch_AfterProgramCreate_BuilderProgram,
  Lib_Transpile_StartWatch_AfterProgramCreate_ConfigResult,
  Lib_Transpile_StartWatch_AfterProgramCreate_CurrentConfig,
  Lib_Transpile_StartWatch_AfterProgramCreate_Diagnostics,
  Lib_Transpile_StartWatch_AfterProgramCreate_EmitDiagnostics,
  Lib_Transpile_StartWatch_AfterProgramCreate_EmitResult,
  Lib_Transpile_StartWatch_AfterProgramCreate_PreEmitDiagnostics,
  Lib_Transpile_StartWatch_AfterProgramCreate_Program,
  Lib_Transpile_StartWatch_AfterProgramCreate_Returns,
  Lib_Transpile_StartWatch_AfterProgramCreate_ShouldBlockEmit,
  Lib_Transpile_StartWatch_ConfigPath,
  Lib_Transpile_StartWatch_CurrentDirectory,
  Lib_Transpile_StartWatch_Host,
  Lib_Transpile_StartWatch_Options,
  Lib_Transpile_StartWatch_Returns,
  Lib_Transpile_StartWatch_StatusMessage,
  Lib_Transpile_StartWatch_WatchDiagnostics,
} from '../types/lib/transpile.d.ts';

/**
 * Lib - Transpile - Filter Diagnostics.
 *
 * Keeps project-owned compiler diagnostics while excluding dependency files.
 * Configuration diagnostics without a source file always remain visible.
 *
 * @param {Lib_Transpile_FilterDiagnostics_Diagnostics}      diagnostics      - Diagnostics.
 * @param {Lib_Transpile_FilterDiagnostics_CurrentDirectory} currentDirectory - Current directory.
 *
 * @returns {Lib_Transpile_FilterDiagnostics_Returns}
 *
 * @since 0.30.0
 */
function filterDiagnostics(diagnostics: Lib_Transpile_FilterDiagnostics_Diagnostics, currentDirectory: Lib_Transpile_FilterDiagnostics_CurrentDirectory): Lib_Transpile_FilterDiagnostics_Returns {
  return diagnostics.filter((diagnostic) => {
    if (diagnostic.file === undefined) {
      return true;
    }

    const fileName: Lib_Transpile_FilterDiagnostics_FileName = diagnostic.file.fileName;

    return isProjectOwnedFile(fileName, currentDirectory);
  });
}

/**
 * Lib - Transpile - Get Config Path.
 *
 * Resolves an explicit TSConfig path or searches for the default project file.
 * A missing file returns undefined so every caller reports the same failure.
 *
 * @param {Lib_Transpile_GetConfigPath_Project}          project          - Project.
 * @param {Lib_Transpile_GetConfigPath_CurrentDirectory} currentDirectory - Current directory.
 *
 * @returns {Lib_Transpile_GetConfigPath_Returns}
 *
 * @since 0.30.0
 */
function getConfigPath(project: Lib_Transpile_GetConfigPath_Project, currentDirectory: Lib_Transpile_GetConfigPath_CurrentDirectory): Lib_Transpile_GetConfigPath_Returns {
  if (project !== undefined) {
    const resolved: Lib_Transpile_GetConfigPath_Resolved = normalizeDiagnosticFileName(resolve(currentDirectory, project));

    return (sys.fileExists(resolved) === true) ? resolved : undefined;
  }

  const discovered: Lib_Transpile_GetConfigPath_Discovered = findConfigFile(currentDirectory, sys.fileExists, 'tsconfig.json');

  return (discovered === undefined) ? undefined : normalizeDiagnosticFileName(discovered);
}

/**
 * Lib - Transpile - Print Diagnostics.
 *
 * Formats compiler diagnostics once while callers choose their output surface.
 * Summaries use only the diagnostics that survive the ownership filter.
 *
 * @param {Lib_Transpile_PrintDiagnostics_Diagnostics} diagnostics - Diagnostics.
 * @param {Lib_Transpile_PrintDiagnostics_PrintError}  printError  - Print error.
 * @param {Lib_Transpile_PrintDiagnostics_PrintInfo}   printInfo   - Print info.
 *
 * @returns {Lib_Transpile_PrintDiagnostics_Returns}
 *
 * @since 0.30.0
 */
function printDiagnostics(diagnostics: Lib_Transpile_PrintDiagnostics_Diagnostics, printError: Lib_Transpile_PrintDiagnostics_PrintError, printInfo: Lib_Transpile_PrintDiagnostics_PrintInfo): Lib_Transpile_PrintDiagnostics_Returns {
  const fileSet: Lib_Transpile_PrintDiagnostics_FileSet = new Set();

  for (const diagnostic of diagnostics) {
    const fileName: Lib_Transpile_PrintDiagnostics_FileName = normalizeDiagnosticFileName((diagnostic.file !== undefined) ? diagnostic.file.fileName : 'unknown');
    const message: Lib_Transpile_PrintDiagnostics_Message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    fileSet.add(fileName);

    if (diagnostic.file !== undefined && diagnostic.start !== undefined) {
      const position: Lib_Transpile_PrintDiagnostics_Position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      const line: Lib_Transpile_PrintDiagnostics_Line = position.line;
      const character: Lib_Transpile_PrintDiagnostics_Character = position.character;

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
 * Lib - Transpile - Compile.
 *
 * Reads one TSConfig, emits its program, and reports project-owned pre-emit and
 * emit diagnostics without weakening the configured compiler checks.
 *
 * @param {Lib_Transpile_Compile_ConfigPath}       configPath       - Config path.
 * @param {Lib_Transpile_Compile_CurrentDirectory} currentDirectory - Current directory.
 * @param {Lib_Transpile_Compile_Options}          options          - Options.
 *
 * @returns {Lib_Transpile_Compile_Returns}
 *
 * @since 0.30.0
 */
function compile(configPath: Lib_Transpile_Compile_ConfigPath, currentDirectory: Lib_Transpile_Compile_CurrentDirectory, options: Lib_Transpile_Compile_Options): Lib_Transpile_Compile_Returns {
  const configResult: Lib_Transpile_Compile_ConfigResult = readConfigFile(configPath, sys.readFile);

  if (configResult['error'] !== undefined) {
    const configReadDiagnostics: Lib_Transpile_Compile_ConfigReadDiagnostics = [configResult['error']];

    printDiagnostics(filterDiagnostics(configReadDiagnostics, currentDirectory), options['printError'], options['printInfo']);

    return 1;
  }

  const config: Lib_Transpile_Compile_Config = configResult['config'];
  const parsed: Lib_Transpile_Compile_Parsed = parseJsonConfigFileContent(config, sys, dirname(configPath), undefined, configPath);

  if (parsed.errors.length > 0) {
    const configParseDiagnostics: Lib_Transpile_Compile_ConfigParseDiagnostics = parsed.errors;

    printDiagnostics(filterDiagnostics(configParseDiagnostics, currentDirectory), options['printError'], options['printInfo']);

    return 1;
  }

  const compilerOptions: Lib_Transpile_Compile_CompilerOptions = {
    ...parsed.options,
    noEmitOnError: false,
  };
  const program: Lib_Transpile_Compile_Program = createProgram(parsed.fileNames, compilerOptions);
  const preEmitDiagnostics: Lib_Transpile_Compile_PreEmitDiagnostics = getDiagnostics(program, currentDirectory);
  const shouldBlockEmit: Lib_Transpile_Compile_ShouldBlockEmit = parsed.options.noEmitOnError === true && preEmitDiagnostics.length > 0;
  const emitResult: Lib_Transpile_Compile_EmitResult = (shouldBlockEmit === true) ? undefined : program.emit();
  const emitDiagnostics: Lib_Transpile_Compile_EmitDiagnostics = (emitResult === undefined) ? [] : filterDiagnostics(emitResult.diagnostics, currentDirectory);
  const diagnostics: Lib_Transpile_Compile_Diagnostics = [
    ...preEmitDiagnostics,
    ...emitDiagnostics,
  ];

  printDiagnostics(diagnostics, options['printError'], options['printInfo']);

  return (diagnostics.length > 0) ? 1 : 0;
}

/**
 * Lib - Transpile - Start Watch.
 *
 * Starts TypeScript's incremental file watcher while replacing its reporting and
 * emit hook with Nova's project-owned diagnostic pipeline.
 *
 * @param {Lib_Transpile_StartWatch_ConfigPath}       configPath       - Config path.
 * @param {Lib_Transpile_StartWatch_CurrentDirectory} currentDirectory - Current directory.
 * @param {Lib_Transpile_StartWatch_Options}          options          - Options.
 *
 * @returns {Lib_Transpile_StartWatch_Returns}
 *
 * @since 0.30.0
 */
function startWatch(configPath: Lib_Transpile_StartWatch_ConfigPath, currentDirectory: Lib_Transpile_StartWatch_CurrentDirectory, options: Lib_Transpile_StartWatch_Options): Lib_Transpile_StartWatch_Returns {
  /**
   * Lib - Transpile - Start Watch - After Program Create.
   *
   * Emits a rebuilt program through the same owned-diagnostic pipeline used by
   * one-shot compilation whenever TypeScript completes an incremental update.
   *
   * @param {Lib_Transpile_StartWatch_AfterProgramCreate_BuilderProgram} builderProgram - Builder program.
   *
   * @returns {Lib_Transpile_StartWatch_AfterProgramCreate_Returns}
   *
   * @since 0.30.0
   */
  function afterProgramCreate(builderProgram: Lib_Transpile_StartWatch_AfterProgramCreate_BuilderProgram): Lib_Transpile_StartWatch_AfterProgramCreate_Returns {
    const program: Lib_Transpile_StartWatch_AfterProgramCreate_Program = builderProgram.getProgram();
    const preEmitDiagnostics: Lib_Transpile_StartWatch_AfterProgramCreate_PreEmitDiagnostics = getDiagnostics(program, currentDirectory);
    const configResult: Lib_Transpile_StartWatch_AfterProgramCreate_ConfigResult = readConfigFile(configPath, sys.readFile);
    const currentConfig: Lib_Transpile_StartWatch_AfterProgramCreate_CurrentConfig = (configResult['error'] === undefined) ? parseJsonConfigFileContent(configResult['config'], sys, dirname(configPath), undefined, configPath) : undefined;
    const shouldBlockEmit: Lib_Transpile_StartWatch_AfterProgramCreate_ShouldBlockEmit = currentConfig !== undefined
      && currentConfig.options.noEmitOnError === true
      && preEmitDiagnostics.length > 0;
    const emitResult: Lib_Transpile_StartWatch_AfterProgramCreate_EmitResult = (shouldBlockEmit === true) ? undefined : builderProgram.emit();
    const emitDiagnostics: Lib_Transpile_StartWatch_AfterProgramCreate_EmitDiagnostics = (emitResult === undefined) ? [] : filterDiagnostics(emitResult.diagnostics, currentDirectory);
    const diagnostics: Lib_Transpile_StartWatch_AfterProgramCreate_Diagnostics = [
      ...preEmitDiagnostics,
      ...emitDiagnostics,
    ];

    printDiagnostics(diagnostics, options['printError'], options['printInfo']);

    return;
  }

  const host: Lib_Transpile_StartWatch_Host = createWatchCompilerHost(
    configPath,
    { noEmitOnError: false },
    sys,
    createEmitAndSemanticDiagnosticsBuilderProgram,
    (diagnostic) => {
      const watchDiagnostics: Lib_Transpile_StartWatch_WatchDiagnostics = filterDiagnostics([diagnostic], currentDirectory);

      if (watchDiagnostics.length > 0) {
        printDiagnostics(watchDiagnostics, options['printError'], options['printInfo']);
      }

      return;
    },
    (diagnostic) => {
      const statusMessage: Lib_Transpile_StartWatch_StatusMessage = flattenDiagnosticMessageText(diagnostic.messageText, '\n');

      options.printInfo(statusMessage);

      return;
    },
  );

  host.afterProgramCreate = afterProgramCreate;

  return createWatchProgram(host);
}

/**
 * Lib - Transpile - Run Transpile.
 *
 * Runs Nova's canonical pre-build-safe TypeScript emitter once or keeps an
 * incremental watcher alive. Both modes preserve strict compiler settings and
 * suppress only diagnostics owned by third-party dependencies.
 *
 * @param {Lib_Transpile_RunTranspile_Options} options - Options.
 *
 * @returns {Lib_Transpile_RunTranspile_Returns}
 *
 * @since 0.30.0
 */
export function runTranspile(options: Lib_Transpile_RunTranspile_Options): Lib_Transpile_RunTranspile_Returns {
  const currentDirectory: Lib_Transpile_RunTranspile_CurrentDirectory = process.cwd();
  const configPath: Lib_Transpile_RunTranspile_ConfigPath = getConfigPath(options['project'], currentDirectory);

  if (configPath === undefined) {
    options.printError('No tsconfig.json found. Use --project to specify a path.');

    return 1;
  }

  if (options['watch'] === true) {
    return startWatch(configPath, currentDirectory, options);
  }

  return compile(configPath, currentDirectory, options);
}
