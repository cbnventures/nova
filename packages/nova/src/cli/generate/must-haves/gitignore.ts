import { promises as fs } from 'fs';
import { join } from 'path';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isProjectRoot,
  resolveTemplatePath,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_Gitignore_Runner_Run_Content,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_FinalContent,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_Gitignore,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_Options,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_ProjectExcludes,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_Returns,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_TargetPath,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplateDirectory,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplatePath,
  Cli_Generate_MustHaves_Gitignore_Runner_Run_WorkingFile,
} from '../../../types/cli/generate/must-haves/gitignore.d.ts';

/**
 * CLI - Generate - Must Haves - Gitignore.
 *
 * Generates the root .gitignore file from a bundled template and appends the custom
 * patterns declared under "gitignore.projectExcludes" in nova.config.json to the
 * Project Excludes section.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - Gitignore - Run.
   *
   * Called by the CLI index via executeCommand. Reads the template, appends the configured
   * project excludes, and writes the result to the project root with no interactive prompts.
   *
   * @param {Cli_Generate_MustHaves_Gitignore_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_Gitignore_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_MustHaves_Gitignore_Runner_Run_Options): Cli_Generate_MustHaves_Gitignore_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_Gitignore_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_Gitignore_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_Gitignore_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_Gitignore_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_Gitignore_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const templateDirectory: Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/must-haves/gitignore');
    const targetPath: Cli_Generate_MustHaves_Gitignore_Runner_Run_TargetPath = join(currentDirectory, '.gitignore');
    const templatePath: Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplatePath = join(templateDirectory, 'gitignore');

    let content: Cli_Generate_MustHaves_Gitignore_Runner_Run_Content = undefined;

    try {
      content = await fs.readFile(templatePath, 'utf-8');
    } catch {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'read',
      }).error(`Failed to read template "${templatePath}".`);

      return 'completed';
    }

    const workingFile: Cli_Generate_MustHaves_Gitignore_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const gitignore: Cli_Generate_MustHaves_Gitignore_Runner_Run_Gitignore = workingFile['gitignore'];
    const projectExcludes: Cli_Generate_MustHaves_Gitignore_Runner_Run_ProjectExcludes = (gitignore !== undefined) ? (gitignore['projectExcludes'] ?? []) : [];

    // Append the configured project excludes under the Project Excludes section.
    let finalContent: Cli_Generate_MustHaves_Gitignore_Runner_Run_FinalContent = content;

    if (projectExcludes.length > 0) {
      finalContent = `${content}${projectExcludes.join('\n')}\n`;
    }

    if (isDryRun === true) {
      return 'completed';
    }

    await saveGeneratedFile(targetPath, finalContent, isReplaceFile, {
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      mode: 'strict',
    });

    return 'completed';
  }
}
