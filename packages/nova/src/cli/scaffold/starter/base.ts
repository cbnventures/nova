import { resolve } from 'path';

import prompts from 'prompts';

import { createMonorepoRoot, detectMonorepoContext, promptPostScaffoldGenerators } from '../../../lib/scaffold.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliScaffoldStarterBaseRunCancelled,
  CliScaffoldStarterBaseRunContext,
  CliScaffoldStarterBaseRunCurrentDirectory,
  CliScaffoldStarterBaseRunDirectoryAnswers,
  CliScaffoldStarterBaseRunDirectoryChoices,
  CliScaffoldStarterBaseRunIsDryRun,
  CliScaffoldStarterBaseRunNameAnswers,
  CliScaffoldStarterBaseRunNameQuestions,
  CliScaffoldStarterBaseRunOptions,
  CliScaffoldStarterBaseRunOutputAnswers,
  CliScaffoldStarterBaseRunOutputDirectory,
  CliScaffoldStarterBaseRunResolvedName,
  CliScaffoldStarterBaseRunResolvedOutput,
  CliScaffoldStarterBaseRunReturns,
  CliScaffoldStarterBaseRunSelectedDirectoryChoice,
} from '../../../types/cli/scaffold/starter/base.d.ts';

/**
 * CLI - Scaffold - Starter - Base.
 *
 * Creates a new monorepo from scratch with root-level
 * config files including package.json and nova.config.json.
 * Sets up directory structure and runs generators.
 *
 * @since 0.15.0
 */
export class CliScaffoldStarterBase {
  /**
   * CLI - Scaffold - Starter - Base - Run.
   *
   * Entry point invoked by the CLI nova scaffold starter command. Detects context, prompts for
   * project name and output directory, then creates the monorepo root.
   *
   * @param {CliScaffoldStarterBaseRunOptions} options - Options.
   *
   * @returns {CliScaffoldStarterBaseRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliScaffoldStarterBaseRunOptions): CliScaffoldStarterBaseRunReturns {
    const currentDirectory: CliScaffoldStarterBaseRunCurrentDirectory = process.cwd();
    const isDryRun: CliScaffoldStarterBaseRunIsDryRun = options['dryRun'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliScaffoldStarterBase.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    // Detect monorepo context.
    const context: CliScaffoldStarterBaseRunContext = await detectMonorepoContext(currentDirectory);

    if (context['context'] === 'nested') {
      Logger.customize({
        name: 'CliScaffoldStarterBase.run',
        purpose: 'context',
      }).error('Re-run this command from the monorepo root directory.');

      process.exitCode = 1;

      return;
    }

    if (context['context'] === 'standalone') {
      Logger.customize({
        name: 'CliScaffoldStarterBase.run',
        purpose: 'context',
      }).error('Found a standalone project. Run from an empty directory to create a new monorepo.');

      process.exitCode = 1;

      return;
    }

    if (context['context'] === 'workspace') {
      Logger.customize({
        name: 'CliScaffoldStarterBase.run',
        purpose: 'context',
      }).error('Already at a monorepo root. Use scaffold app or scaffold docs to add workspaces.');

      process.exitCode = 1;

      return;
    }

    let cancelled: CliScaffoldStarterBaseRunCancelled = false;

    // Prompt for project name.
    const nameQuestions: CliScaffoldStarterBaseRunNameQuestions = [];

    if (options['name'] === undefined) {
      nameQuestions.push({
        type: 'text' as const,
        name: 'name',
        message: 'Project name (slug):',
        initial: 'my-project',
      });
    }

    const nameAnswers: CliScaffoldStarterBaseRunNameAnswers = await prompts(nameQuestions, {
      onCancel: () => false,
    });

    if (options['name'] === undefined && nameAnswers['name'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return;
    }

    const resolvedName: CliScaffoldStarterBaseRunResolvedName = (options['name'] ?? nameAnswers['name']) as CliScaffoldStarterBaseRunResolvedName;

    // Determine output directory.
    let outputDirectory: CliScaffoldStarterBaseRunOutputDirectory = undefined;

    if (options['output'] !== undefined) {
      outputDirectory = resolve(currentDirectory, options['output']);
    } else {
      const directoryChoices: CliScaffoldStarterBaseRunDirectoryChoices = [
        {
          title: 'Create a new directory',
          value: 'new-directory',
        },
        {
          title: 'Build in current working directory',
          value: 'current-directory',
        },
      ];

      const directoryAnswers: CliScaffoldStarterBaseRunDirectoryAnswers = await prompts({
        type: 'select',
        name: 'directoryChoice',
        message: 'Where should the project be created?',
        choices: directoryChoices,
        initial: 0,
      }, {
        onCancel: () => false,
      });

      if (directoryAnswers['directoryChoice'] === undefined) {
        cancelled = true;
      }

      if (cancelled === true) {
        return;
      }

      const selectedDirectoryChoice: CliScaffoldStarterBaseRunSelectedDirectoryChoice = directoryAnswers['directoryChoice'] as CliScaffoldStarterBaseRunSelectedDirectoryChoice;

      if (selectedDirectoryChoice === 'current-directory') {
        outputDirectory = currentDirectory;
      } else {
        const outputAnswers: CliScaffoldStarterBaseRunOutputAnswers = await prompts({
          type: 'text',
          name: 'output',
          message: 'Output directory:',
          initial: `./${resolvedName}`,
        }, {
          onCancel: () => false,
        });

        if (outputAnswers['output'] === undefined) {
          cancelled = true;
        }

        if (cancelled === true) {
          return;
        }

        const resolvedOutput: CliScaffoldStarterBaseRunResolvedOutput = outputAnswers['output'] as CliScaffoldStarterBaseRunResolvedOutput;

        outputDirectory = resolve(currentDirectory, resolvedOutput);
      }
    }

    if (outputDirectory === undefined) {
      return;
    }

    Logger.customize({
      name: 'CliScaffoldStarterBase.run',
      purpose: 'config',
    }).info(`Scaffolding starter monorepo "${resolvedName}" in "${outputDirectory}".`);

    if (isDryRun === true) {
      return;
    }

    // Create monorepo root structure.
    await createMonorepoRoot(outputDirectory, resolvedName);

    Logger.customize({
      name: 'CliScaffoldStarterBase.run',
      purpose: 'complete',
    }).info('Scaffold complete for starter monorepo.');

    // Post-scaffold generators.
    await promptPostScaffoldGenerators(outputDirectory);

    return;
  }
}
