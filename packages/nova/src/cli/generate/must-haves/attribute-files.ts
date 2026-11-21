import { resolve } from 'node:path';

import { renderAttributeFile } from '../../../lib/attribute-files.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isProjectRoot,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_AttributeFiles,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ConfigDiagnostics,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ConfigLoader,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ConfigPath,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Content,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Contents,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Entries,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ErrorMessage,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_HasConfigErrors,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Options,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Returns,
  Cli_Generate_MustHaves_AttributeFiles_Runner_Run_WorkingFile,
} from '../../../types/cli/generate/must-haves/attribute-files.d.ts';

/**
 * CLI - Generate - Must Haves - Attribute Files.
 *
 * Generates every ".gitattributes" file declared in nova.config.json from Nova
 * bundles and project-owned patterns, each written in full with the generated header.
 *
 * @since 0.49.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - Attribute Files - Run.
   *
   * Validates the project root, renders every configured path first, and writes only
   * when all of them render, so a bad entry never leaves the files half-updated.
   *
   * @param {Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Returns}
   *
   * @since 0.49.0
   */
  public static async run(options: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Options): Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup files will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const configLoader: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ConfigLoader = new LibNovaConfig();
    const workingFile: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_WorkingFile = await configLoader.load();
    const configDiagnostics: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ConfigDiagnostics = configLoader.diagnostics();
    const hasConfigErrors: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_HasConfigErrors = configDiagnostics.some((configDiagnostic) => configDiagnostic['severity'] === 'error');

    if (hasConfigErrors === true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const attributeFiles: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_AttributeFiles = workingFile['attributeFiles'] ?? {};
    const entries: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Entries = Object.entries(attributeFiles);

    if (entries.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'skip',
      }).warn('Skipping attribute-files. No "attributeFiles" entries were found in the "nova.config.json" file.');

      return 'completed';
    }

    const contents: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Contents = new Map();

    try {
      for (const entry of entries) {
        const configPath: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ConfigPath = entry[0];
        const content: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_Content = renderAttributeFile(configPath, entry[1]);

        contents.set(resolve(currentDirectory, configPath), content);
      }
    } catch (error) {
      const errorMessage: Cli_Generate_MustHaves_AttributeFiles_Runner_Run_ErrorMessage = (error instanceof Error) ? error.message : 'Attribute files could not be generated.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'generate',
      }).error(errorMessage);

      process.exitCode = 1;

      return 'cancelled';
    }

    if (isDryRun === true) {
      return 'completed';
    }

    await Promise.all([...contents.entries()].map((contentEntry) => saveGeneratedFile(contentEntry[0], contentEntry[1], isReplaceFile, {
      command: 'nova generate must-haves attribute-files',
      docsSlug: 'cli/generators/must-haves/attribute-files',
      mode: 'strict',
    })));

    return 'completed';
  }
}
