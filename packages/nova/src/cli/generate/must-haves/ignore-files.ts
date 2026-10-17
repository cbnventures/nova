import { resolve } from 'node:path';

import { renderIgnoreFile } from '../../../lib/ignore-files.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isProjectRoot,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ConfigDiagnostics,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ConfigLoader,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ConfigPath,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Content,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Entry,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ErrorMessage,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_GenerateError,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_GenerationTasks,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_HasConfigErrors,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IgnoreFiles,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Options,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Returns,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_TargetPath,
  Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_WorkingFile,
} from '../../../types/cli/generate/must-haves/ignore-files.d.ts';

/**
 * CLI - Generate - Must Haves - Ignore Files.
 *
 * Generates every physical ignore file declared in nova.config.json from
 * reviewed Nova bundles and project-owned patterns.
 *
 * @since 0.32.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - Ignore Files - Run.
   *
   * Validates the project root, renders each configured path, and writes all
   * outputs together so one command keeps every ignore surface synchronized.
   *
   * @param {Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Returns}
   *
   * @since 0.32.0
   */
  public static async run(options: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Options): Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup files will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const configLoader: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ConfigLoader = new LibNovaConfig();
    const workingFile: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_WorkingFile = await configLoader.load();
    const configDiagnostics: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ConfigDiagnostics = configLoader.diagnostics();
    const hasConfigErrors: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_HasConfigErrors = configDiagnostics.some((configDiagnostic) => configDiagnostic['severity'] === 'error');

    if (hasConfigErrors === true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const ignoreFiles: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_IgnoreFiles = workingFile['ignoreFiles'] ?? {
      './.gitignore': {
        bundles: ['nova'],
        patterns: [],
      },
    };
    const generationTasks: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_GenerationTasks = [];

    for (const ignoreFile of Object.entries(ignoreFiles)) {
      const configPath: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ConfigPath = ignoreFile[0];
      const entry: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Entry = ignoreFile[1];
      const targetPath: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_TargetPath = resolve(currentDirectory, configPath);

      generationTasks.push((async () => {
        const content: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_Content = await renderIgnoreFile(configPath, entry);

        if (isDryRun === true) {
          return;
        }

        await saveGeneratedFile(targetPath, content, isReplaceFile, {
          command: 'nova generate must-haves ignore-files',
          docsSlug: 'cli/generators/must-haves/ignore-files',
          mode: 'strict',
        });

        return;
      })());
    }

    try {
      await Promise.all(generationTasks);
    } catch (error) {
      const generateError: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_GenerateError = error;
      const errorMessage: Cli_Generate_MustHaves_IgnoreFiles_Runner_Run_ErrorMessage = (generateError instanceof Error) ? generateError.message : 'Ignore files could not be generated.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'generate',
      }).error(errorMessage);

      process.exitCode = 1;

      return 'cancelled';
    }

    return 'completed';
  }
}
