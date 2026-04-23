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
  CliGenerateMustHavesAgentConventionsRunContent,
  CliGenerateMustHavesAgentConventionsRunConventionFiles,
  CliGenerateMustHavesAgentConventionsRunCurrentDirectory,
  CliGenerateMustHavesAgentConventionsRunDisplayPath,
  CliGenerateMustHavesAgentConventionsRunIsAtProjectRoot,
  CliGenerateMustHavesAgentConventionsRunIsDryRun,
  CliGenerateMustHavesAgentConventionsRunIsReplaceFile,
  CliGenerateMustHavesAgentConventionsRunNextStepsMessage,
  CliGenerateMustHavesAgentConventionsRunOptions,
  CliGenerateMustHavesAgentConventionsRunReplaceFileNotice,
  CliGenerateMustHavesAgentConventionsRunReturns,
  CliGenerateMustHavesAgentConventionsRunRootFiles,
  CliGenerateMustHavesAgentConventionsRunTargetPath,
  CliGenerateMustHavesAgentConventionsRunTemplateDirectory,
  CliGenerateMustHavesAgentConventionsRunTemplateFileName,
  CliGenerateMustHavesAgentConventionsRunTemplatePath,
  CliGenerateMustHavesAgentConventionsRunUserEditedFiles,
} from '../../../types/cli/generate/must-haves/agent-conventions.d.ts';

/**
 * CLI - Generate - Must Haves - Agent Conventions.
 *
 * Generates agent coding convention files including CLAUDE.md, AGENTS.md, VISION.md,
 * PROJECT_RULES.md, and per-language convention files.
 *
 * @since 0.15.0
 */
export class CliGenerateMustHavesAgentConventions {
  /**
   * CLI - Generate - Must Haves - Agent Conventions - Run.
   *
   * Called by the CLI index via executeCommand. Skips user-edited files like VISION.md that
   * have been customized from the original template.
   *
   * @param {CliGenerateMustHavesAgentConventionsRunOptions} options - Options.
   *
   * @returns {CliGenerateMustHavesAgentConventionsRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliGenerateMustHavesAgentConventionsRunOptions): CliGenerateMustHavesAgentConventionsRunReturns {
    const currentDirectory: CliGenerateMustHavesAgentConventionsRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliGenerateMustHavesAgentConventionsRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: CliGenerateMustHavesAgentConventionsRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliGenerateMustHavesAgentConventionsRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliGenerateMustHavesAgentConventions.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliGenerateMustHavesAgentConventionsRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliGenerateMustHavesAgentConventions.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const templateDirectory: CliGenerateMustHavesAgentConventionsRunTemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/must-haves/agent-conventions');

    const rootFiles: CliGenerateMustHavesAgentConventionsRunRootFiles = [
      '.cursorrules',
      'AGENTS.md',
      'CLAUDE.md',
      'VISION.md',
      'PROJECT_RULES.md',
    ];
    const userEditedFiles: CliGenerateMustHavesAgentConventionsRunUserEditedFiles = new Set([
      'VISION.md',
      'PROJECT_RULES.md',
    ]);
    const conventionFiles: CliGenerateMustHavesAgentConventionsRunConventionFiles = [
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
      const templateFileName: CliGenerateMustHavesAgentConventionsRunTemplateFileName = rootFile.replace(LIB_REGEX_PATTERN_LEADING_DOT, '');
      const templatePath: CliGenerateMustHavesAgentConventionsRunTemplatePath = join(templateDirectory, templateFileName);
      const targetPath: CliGenerateMustHavesAgentConventionsRunTargetPath = join(currentDirectory, rootFile);

      if (isDryRun === true) {
        continue;
      }

      try {
        const content: CliGenerateMustHavesAgentConventionsRunContent = await fs.readFile(templatePath, 'utf-8');

        // Skip user-edited files that have been customized from the original template.
        if (
          userEditedFiles.has(rootFile) === true
          && await pathExists(targetPath) === true
          && (await isFileIdentical(targetPath, content)) === false
        ) {
          Logger.customize({
            name: 'CliGenerateMustHavesAgentConventions.run',
            purpose: 'skip',
          }).warn(`${chalk.cyan(`"${rootFile}"`)} has been customized. Skipping.`);

          continue;
        }

        await saveGeneratedFile(targetPath, content, isReplaceFile);
      } catch {
        Logger.customize({
          name: 'CliGenerateMustHavesAgentConventions.run',
          purpose: 'error',
        }).error(`Failed to generate ${chalk.cyan(`"${rootFile}"`)}.`);
      }
    }

    for (const conventionFile of conventionFiles) {
      const templatePath: CliGenerateMustHavesAgentConventionsRunTemplatePath = join(templateDirectory, 'conventions', conventionFile);
      const targetPath: CliGenerateMustHavesAgentConventionsRunTargetPath = join(currentDirectory, 'conventions', conventionFile);
      const displayPath: CliGenerateMustHavesAgentConventionsRunDisplayPath = `conventions/${conventionFile}`;

      if (isDryRun === true) {
        continue;
      }

      try {
        const content: CliGenerateMustHavesAgentConventionsRunContent = await fs.readFile(templatePath, 'utf-8');

        await saveGeneratedFile(targetPath, content, isReplaceFile);
      } catch {
        Logger.customize({
          name: 'CliGenerateMustHavesAgentConventions.run',
          purpose: 'error',
        }).error(`Failed to generate ${chalk.cyan(`"${displayPath}"`)}.`);
      }
    }

    const nextStepsMessage: CliGenerateMustHavesAgentConventionsRunNextStepsMessage = [
      `Fill out ${chalk.cyan('VISION.md')} and ${chalk.cyan('PROJECT_RULES.md')} to complete your agent conventions setup.`,
      '',
      'For the full workshop guide, visit:',
      `${LIB_CONSTANTS_DOCS_BASE_URL}/docs/cli/generators/must-haves/agent-conventions#vision-and-rules-workshop`,
    ].join('\n');

    Logger.customize({
      name: 'CliGenerateMustHavesAgentConventions.run',
      purpose: 'next-steps',
      padTop: 1,
      padBottom: 1,
    }).info(nextStepsMessage);

    return 'completed';
  }
}
