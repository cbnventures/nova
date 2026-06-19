import { promises as fs } from 'fs';
import { join } from 'path';

import chalk from 'chalk';

import { LIB_CONSTANTS_DOCS_BASE_URL } from '../../../lib/constants.js';
import { LIB_REGEX_PATTERN_LEADING_DOT } from '../../../lib/regex.js';
import {
  isFileIdentical,
  isProjectRoot,
  pathExists,
  resolveTemplatePath,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_Content,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionContent,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionFiles,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionTargetPath,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionTemplatePath,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_DisplayPath,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_NextStepsMessage,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_Options,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_Returns,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_RootFiles,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_TargetPath,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_TemplateDirectory,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_TemplateFileName,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_TemplatePath,
  Cli_Generate_MustHaves_AgentConventions_Runner_Run_UserEditedFiles,
} from '../../../types/cli/generate/must-haves/agent-conventions.d.ts';

/**
 * CLI - Generate - Must Haves - Agent Conventions.
 *
 * Generates agent coding convention files including CLAUDE.md, AGENTS.md, VISION.md,
 * PROJECT_RULES.md, and per-language convention files.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - Agent Conventions - Run.
   *
   * Called by the CLI index via executeCommand. Skips user-edited files like VISION.md that
   * have been customized from the original template.
   *
   * @param {Cli_Generate_MustHaves_AgentConventions_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_AgentConventions_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_MustHaves_AgentConventions_Runner_Run_Options): Cli_Generate_MustHaves_AgentConventions_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_AgentConventions_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_AgentConventions_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_AgentConventions_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_AgentConventions_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_AgentConventions_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const templateDirectory: Cli_Generate_MustHaves_AgentConventions_Runner_Run_TemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/must-haves/agent-conventions');

    const rootFiles: Cli_Generate_MustHaves_AgentConventions_Runner_Run_RootFiles = [
      '.cursorrules',
      'AGENTS.md',
      'CLAUDE.md',
      'VISION.md',
      'PROJECT_RULES.md',
    ];
    const userEditedFiles: Cli_Generate_MustHaves_AgentConventions_Runner_Run_UserEditedFiles = new Set([
      'VISION.md',
      'PROJECT_RULES.md',
    ]);
    const conventionFiles: Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionFiles = [
      'csharp.md',
      'css.md',
      'docker.md',
      'documentation.md',
      'java.md',
      'kotlin.md',
      'php.md',
      'python.md',
      'shell.md',
      'swift.md',
      'typescript.md',
      'universal.md',
    ];

    for (const rootFile of rootFiles) {
      const templateFileName: Cli_Generate_MustHaves_AgentConventions_Runner_Run_TemplateFileName = rootFile.replace(LIB_REGEX_PATTERN_LEADING_DOT, '');
      const templatePath: Cli_Generate_MustHaves_AgentConventions_Runner_Run_TemplatePath = join(templateDirectory, templateFileName);
      const targetPath: Cli_Generate_MustHaves_AgentConventions_Runner_Run_TargetPath = join(currentDirectory, rootFile);

      if (isDryRun === true) {
        continue;
      }

      try {
        const content: Cli_Generate_MustHaves_AgentConventions_Runner_Run_Content = await fs.readFile(templatePath, 'utf-8');

        // Skip user-edited files that have been customized from the original template.
        if (
          userEditedFiles.has(rootFile) === true
          && await pathExists(targetPath) === true
          && (await isFileIdentical(targetPath, content)) === false
        ) {
          Logger.customize({
            name: 'Runner.run',
            purpose: 'skip',
          }).warn(`${chalk.cyan(`"${rootFile}"`)} has been customized. Skipping.`);

          continue;
        }

        await saveGeneratedFile(targetPath, content, isReplaceFile);
      } catch {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'error',
        }).error(`Failed to generate ${chalk.cyan(`"${rootFile}"`)}.`);
      }
    }

    for (const conventionFile of conventionFiles) {
      const conventionTemplatePath: Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionTemplatePath = join(templateDirectory, 'conventions', conventionFile);
      const conventionTargetPath: Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionTargetPath = join(currentDirectory, 'conventions', conventionFile);
      const displayPath: Cli_Generate_MustHaves_AgentConventions_Runner_Run_DisplayPath = `conventions/${conventionFile}`;

      if (isDryRun === true) {
        continue;
      }

      try {
        const conventionContent: Cli_Generate_MustHaves_AgentConventions_Runner_Run_ConventionContent = await fs.readFile(conventionTemplatePath, 'utf-8');

        await saveGeneratedFile(conventionTargetPath, conventionContent, isReplaceFile);
      } catch {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'error',
        }).error(`Failed to generate ${chalk.cyan(`"${displayPath}"`)}.`);
      }
    }

    const nextStepsMessage: Cli_Generate_MustHaves_AgentConventions_Runner_Run_NextStepsMessage = [
      `Fill out ${chalk.cyan('VISION.md')} and ${chalk.cyan('PROJECT_RULES.md')} to complete your agent conventions setup.`,
      '',
      'For the full workshop guide, visit:',
      `${LIB_CONSTANTS_DOCS_BASE_URL}/docs/cli/generators/must-haves/agent-conventions#vision-and-rules-workshop`,
    ].join('\n');

    Logger.customize({
      name: 'Runner.run',
      purpose: 'next-steps',
      padTop: 1,
      padBottom: 1,
    }).info(nextStepsMessage);

    return 'completed';
  }
}
