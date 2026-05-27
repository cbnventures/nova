import { promises as fs } from 'fs';
import { join } from 'path';

import { isProjectRoot, resolveTemplatePath, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_Editorconfig_Runner_Run_Content,
  Cli_Generate_MustHaves_Editorconfig_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_Editorconfig_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_Editorconfig_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_Editorconfig_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_Editorconfig_Runner_Run_Options,
  Cli_Generate_MustHaves_Editorconfig_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_Editorconfig_Runner_Run_Returns,
  Cli_Generate_MustHaves_Editorconfig_Runner_Run_TargetPath,
} from '../../../types/cli/generate/must-haves/editorconfig.d.ts';

/**
 * CLI - Generate - Must Haves - Editorconfig.
 *
 * Generates the root .editorconfig file from a bundled
 * template. Provides consistent formatting rules across
 * different editors and IDEs.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - Editorconfig - Run.
   *
   * Called by the CLI index via executeCommand. Reads the template and writes it to the
   * project root with no additional substitutions needed.
   *
   * @param {Cli_Generate_MustHaves_Editorconfig_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_Editorconfig_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_MustHaves_Editorconfig_Runner_Run_Options): Cli_Generate_MustHaves_Editorconfig_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_Editorconfig_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_Editorconfig_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_Editorconfig_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_Editorconfig_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_Editorconfig_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const content: Cli_Generate_MustHaves_Editorconfig_Runner_Run_Content = await fs.readFile(join(resolveTemplatePath(import.meta.url, 'generators/must-haves/editorconfig'), 'editorconfig'), 'utf-8');
    const targetPath: Cli_Generate_MustHaves_Editorconfig_Runner_Run_TargetPath = join(currentDirectory, '.editorconfig');

    if (isDryRun === true) {
      return 'completed';
    }

    await saveGeneratedFile(targetPath, content, isReplaceFile, {
      command: 'nova generate must-haves editorconfig',
      docsSlug: 'cli/generators/must-haves/editorconfig',
      mode: 'strict',
    });

    return 'completed';
  }
}
