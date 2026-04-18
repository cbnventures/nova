import { promises as fs } from 'fs';
import { join } from 'path';

import { isProjectRoot, resolveTemplatePath, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliGenerateMustHavesEditorconfigRunContent,
  CliGenerateMustHavesEditorconfigRunCurrentDirectory,
  CliGenerateMustHavesEditorconfigRunIsAtProjectRoot,
  CliGenerateMustHavesEditorconfigRunIsDryRun,
  CliGenerateMustHavesEditorconfigRunIsReplaceFile,
  CliGenerateMustHavesEditorconfigRunOptions,
  CliGenerateMustHavesEditorconfigRunReplaceFileNotice,
  CliGenerateMustHavesEditorconfigRunReturns,
  CliGenerateMustHavesEditorconfigRunTargetPath,
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
export class CliGenerateMustHavesEditorconfig {
  /**
   * CLI - Generate - Must Haves - Editorconfig - Run.
   *
   * Called by the CLI index via executeCommand. Reads the template and writes it to the
   * project root with no additional substitutions needed.
   *
   * @param {CliGenerateMustHavesEditorconfigRunOptions} options - Options.
   *
   * @returns {CliGenerateMustHavesEditorconfigRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliGenerateMustHavesEditorconfigRunOptions): CliGenerateMustHavesEditorconfigRunReturns {
    const currentDirectory: CliGenerateMustHavesEditorconfigRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliGenerateMustHavesEditorconfigRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliGenerateMustHavesEditorconfigRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliGenerateMustHavesEditorconfigRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliGenerateMustHavesEditorconfig.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliGenerateMustHavesEditorconfigRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliGenerateMustHavesEditorconfig.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const content: CliGenerateMustHavesEditorconfigRunContent = await fs.readFile(join(resolveTemplatePath(import.meta.url, 'generators/must-haves/editorconfig'), '.editorconfig'), 'utf-8');
    const targetPath: CliGenerateMustHavesEditorconfigRunTargetPath = join(currentDirectory, '.editorconfig');

    if (isDryRun === true) {
      return;
    }

    await saveGeneratedFile(targetPath, content, isReplaceFile);

    return;
  }
}
