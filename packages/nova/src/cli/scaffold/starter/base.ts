import { resolve } from 'path';

import prompts from 'prompts';

import { createMonorepoRoot, detectMonorepoContext, promptPostScaffoldGenerators } from '../../../lib/scaffold.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Scaffold_Starter_Base_Runner_Run_Cancelled,
  Cli_Scaffold_Starter_Base_Runner_Run_Context,
  Cli_Scaffold_Starter_Base_Runner_Run_CurrentDirectory,
  Cli_Scaffold_Starter_Base_Runner_Run_DirectoryAnswers,
  Cli_Scaffold_Starter_Base_Runner_Run_DirectoryChoices,
  Cli_Scaffold_Starter_Base_Runner_Run_IsDryRun,
  Cli_Scaffold_Starter_Base_Runner_Run_NameAnswers,
  Cli_Scaffold_Starter_Base_Runner_Run_NameQuestions,
  Cli_Scaffold_Starter_Base_Runner_Run_Options,
  Cli_Scaffold_Starter_Base_Runner_Run_OutputAnswers,
  Cli_Scaffold_Starter_Base_Runner_Run_OutputDirectory,
  Cli_Scaffold_Starter_Base_Runner_Run_ResolvedName,
  Cli_Scaffold_Starter_Base_Runner_Run_ResolvedOutput,
  Cli_Scaffold_Starter_Base_Runner_Run_Returns,
  Cli_Scaffold_Starter_Base_Runner_Run_SelectedDirectoryChoice,
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
export class Runner {
  /**
   * CLI - Scaffold - Starter - Base - Run.
   *
   * Entry point invoked by the CLI nova scaffold starter command. Detects context, prompts for
   * project name and output directory, then creates the monorepo root.
   *
   * @param {Cli_Scaffold_Starter_Base_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Starter_Base_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_Starter_Base_Runner_Run_Options): Cli_Scaffold_Starter_Base_Runner_Run_Returns {
    const currentDirectory: Cli_Scaffold_Starter_Base_Runner_Run_CurrentDirectory = process.cwd();
    const isDryRun: Cli_Scaffold_Starter_Base_Runner_Run_IsDryRun = options['dryRun'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    // Detect monorepo context.
    const context: Cli_Scaffold_Starter_Base_Runner_Run_Context = await detectMonorepoContext(currentDirectory);

    if (context['context'] === 'nested') {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'context',
      }).error('Re-run this command from the monorepo root directory.');

      process.exitCode = 1;

      return;
    }

    if (context['context'] === 'standalone') {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'context',
      }).error('Found a standalone project. Run from an empty directory to create a new monorepo.');

      process.exitCode = 1;

      return;
    }

    if (context['context'] === 'workspace') {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'context',
      }).error('Already at a monorepo root. Use scaffold app or scaffold docs to add workspaces.');

      process.exitCode = 1;

      return;
    }

    let cancelled: Cli_Scaffold_Starter_Base_Runner_Run_Cancelled = false;

    // Prompt for project name.
    const nameQuestions: Cli_Scaffold_Starter_Base_Runner_Run_NameQuestions = [];

    if (options['name'] === undefined) {
      nameQuestions.push({
        type: 'text' as const,
        name: 'name',
        message: 'Project name (slug):',
        initial: 'my-project',
      });
    }

    const nameAnswers: Cli_Scaffold_Starter_Base_Runner_Run_NameAnswers = await prompts(nameQuestions, {
      onCancel: () => false,
    });

    if (options['name'] === undefined && nameAnswers['name'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return;
    }

    const resolvedName: Cli_Scaffold_Starter_Base_Runner_Run_ResolvedName = (options['name'] ?? nameAnswers['name']) as Cli_Scaffold_Starter_Base_Runner_Run_ResolvedName;

    // Determine output directory.
    let outputDirectory: Cli_Scaffold_Starter_Base_Runner_Run_OutputDirectory = undefined;

    if (options['output'] !== undefined) {
      outputDirectory = resolve(currentDirectory, options['output']);
    } else {
      const directoryChoices: Cli_Scaffold_Starter_Base_Runner_Run_DirectoryChoices = [
        {
          title: 'Create a new directory',
          value: 'new-directory',
        },
        {
          title: 'Build in current working directory',
          value: 'current-directory',
        },
      ];

      const directoryAnswers: Cli_Scaffold_Starter_Base_Runner_Run_DirectoryAnswers = await prompts({
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

      const selectedDirectoryChoice: Cli_Scaffold_Starter_Base_Runner_Run_SelectedDirectoryChoice = directoryAnswers['directoryChoice'] as Cli_Scaffold_Starter_Base_Runner_Run_SelectedDirectoryChoice;

      if (selectedDirectoryChoice === 'current-directory') {
        outputDirectory = currentDirectory;
      } else {
        const outputAnswers: Cli_Scaffold_Starter_Base_Runner_Run_OutputAnswers = await prompts({
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

        const resolvedOutput: Cli_Scaffold_Starter_Base_Runner_Run_ResolvedOutput = outputAnswers['output'] as Cli_Scaffold_Starter_Base_Runner_Run_ResolvedOutput;

        outputDirectory = resolve(currentDirectory, resolvedOutput);
      }
    }

    if (outputDirectory === undefined) {
      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'config',
    }).info(`Scaffolding starter monorepo "${resolvedName}" in "${outputDirectory}".`);

    if (isDryRun === true) {
      return;
    }

    // Create monorepo root structure.
    await createMonorepoRoot(outputDirectory, resolvedName);

    Logger.customize({
      name: 'Runner.run',
      purpose: 'complete',
    }).info('Scaffold complete for starter monorepo.');

    // Post-scaffold generators.
    await promptPostScaffoldGenerators(outputDirectory);

    return;
  }
}
