import {
  relative,
  resolve,
} from 'node:path';

import prompts from 'prompts';

import { LIB_REGEX_PATTERN_SLUG_SIMPLE } from '../../../lib/regex.js';
import { resolveScaffoldAllowScripts } from '../../../lib/scaffold-allow-scripts.js';
import {
  confirmScaffoldPlan,
  createScaffoldProgress,
  reportScaffoldCompletion,
  reportScaffoldPlan,
  resolveDisplayPath,
  resolveScaffoldInstall,
} from '../../../lib/scaffold-presentation.js';
import {
  createMonorepoRoot,
  detectMonorepoContext,
  findFileConflicts,
  getMonorepoRootPlannedPaths,
  installScaffoldDependencies,
} from '../../../lib/scaffold.js';
import { pathExists } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Scaffold_Starter_Base_Runner_Run_Cancelled,
  Cli_Scaffold_Starter_Base_Runner_Run_Confirmed,
  Cli_Scaffold_Starter_Base_Runner_Run_ConflictingPaths,
  Cli_Scaffold_Starter_Base_Runner_Run_ConflictMessage,
  Cli_Scaffold_Starter_Base_Runner_Run_Context,
  Cli_Scaffold_Starter_Base_Runner_Run_CurrentDirectory,
  Cli_Scaffold_Starter_Base_Runner_Run_DisplayPath,
  Cli_Scaffold_Starter_Base_Runner_Run_InstallOutput,
  Cli_Scaffold_Starter_Base_Runner_Run_InstallResult,
  Cli_Scaffold_Starter_Base_Runner_Run_InstallSucceeded,
  Cli_Scaffold_Starter_Base_Runner_Run_IsDryRun,
  Cli_Scaffold_Starter_Base_Runner_Run_IsNonInteractive,
  Cli_Scaffold_Starter_Base_Runner_Run_NameAnswers,
  Cli_Scaffold_Starter_Base_Runner_Run_NameQuestions,
  Cli_Scaffold_Starter_Base_Runner_Run_Options,
  Cli_Scaffold_Starter_Base_Runner_Run_OutputDirectory,
  Cli_Scaffold_Starter_Base_Runner_Run_PlannedPaths,
  Cli_Scaffold_Starter_Base_Runner_Run_Progress,
  Cli_Scaffold_Starter_Base_Runner_Run_ProgressTotal,
  Cli_Scaffold_Starter_Base_Runner_Run_ResolvedName,
  Cli_Scaffold_Starter_Base_Runner_Run_Returns,
  Cli_Scaffold_Starter_Base_Runner_Run_ShouldInstall,
} from '../../../types/cli/scaffold/starter/base.d.ts';

/**
 * CLI - Scaffold - Starter - Base.
 *
 * Creates a new monorepo with root-level package and Nova configuration files.
 * Sets up its dedicated directory structure and baseline Nova conventions.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Starter - Base - Run.
   *
   * Entry point invoked by the CLI nova scaffold starter command. Detects context, prompts for
   * the project name, then creates the monorepo root in a dedicated directory.
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
    const isNonInteractive: Cli_Scaffold_Starter_Base_Runner_Run_IsNonInteractive = options['nonInteractive'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    // Detect monorepo context.
    const context: Cli_Scaffold_Starter_Base_Runner_Run_Context = await detectMonorepoContext(currentDirectory);

    if (context['context'] === 'invalid') {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'context',
      }).error(`${context['reason']} No scaffold files were written.`);

      process.exitCode = 1;

      return;
    }

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
      }).error('Already at a monorepo root. Use scaffold app, scaffold docs, or scaffold package to add workspaces.');

      process.exitCode = 1;

      return;
    }

    if (
      isNonInteractive === true
      && options['name'] === undefined
    ) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'validate',
      }).error('Non-interactive scaffolding requires --name.');

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

    let nameAnswers: Cli_Scaffold_Starter_Base_Runner_Run_NameAnswers = {};

    if (nameQuestions.length > 0) {
      nameAnswers = await prompts(nameQuestions, {
        onCancel: () => false,
      });
    }

    if (options['name'] === undefined && nameAnswers['name'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return;
    }

    const resolvedName: Cli_Scaffold_Starter_Base_Runner_Run_ResolvedName = (options['name'] ?? nameAnswers['name']) as Cli_Scaffold_Starter_Base_Runner_Run_ResolvedName;

    if (LIB_REGEX_PATTERN_SLUG_SIMPLE.test(resolvedName) === false) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'validate',
      }).error('The project name must be a lowercase slug containing only letters, numbers, hyphens, or underscores. No scaffold files were written.');

      process.exitCode = 1;

      return;
    }

    const outputDirectory: Cli_Scaffold_Starter_Base_Runner_Run_OutputDirectory = resolve(currentDirectory, options['output'] ?? `./${resolvedName}`);

    if (outputDirectory === currentDirectory) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'validate',
      }).error('A new project must be created in a new directory, not the current working directory. Choose a different --output path. No scaffold files were written.');

      process.exitCode = 1;

      return;
    }

    if (await pathExists(outputDirectory) === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'validate',
      }).error(`The monorepo destination "${resolveDisplayPath(currentDirectory, outputDirectory)}" already exists. A new monorepo scaffold requires a new directory; choose a different --output path. No scaffold files were written.`);

      process.exitCode = 1;

      return;
    }

    const plannedPaths: Cli_Scaffold_Starter_Base_Runner_Run_PlannedPaths = await getMonorepoRootPlannedPaths(outputDirectory);
    const conflictingPaths: Cli_Scaffold_Starter_Base_Runner_Run_ConflictingPaths = await findFileConflicts(plannedPaths);

    if (conflictingPaths.length > 0) {
      const conflictMessage: Cli_Scaffold_Starter_Base_Runner_Run_ConflictMessage = conflictingPaths.map((conflictingPath) => relative(outputDirectory, conflictingPath)).join(', ');

      Logger.customize({
        name: 'Runner.run',
        purpose: 'validate',
      }).error(`Scaffolding found existing files at paths it needs to create: ${conflictMessage}. Move those files or choose a different destination, then run the command again. No scaffold files were written.`);

      process.exitCode = 1;

      return;
    }

    const displayPath: Cli_Scaffold_Starter_Base_Runner_Run_DisplayPath = resolveDisplayPath(currentDirectory, outputDirectory);
    const shouldInstall: Cli_Scaffold_Starter_Base_Runner_Run_ShouldInstall = resolveScaffoldInstall(options['install']);

    reportScaffoldPlan({
      additionalOptions: [{
        flag: 'Dependencies',
        value: (shouldInstall === true) ? 'Install with npm' : 'Skip installation',
      }],
      answers: new Map(),
      displayName: 'Base Monorepo',
      destination: displayPath,
      mode: 'monorepo',
      project: resolvedName,
      questions: [],
    });

    const confirmed: Cli_Scaffold_Starter_Base_Runner_Run_Confirmed = await confirmScaffoldPlan(isNonInteractive, isDryRun);

    if (confirmed === false) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'cancelled',
      }).warn('Scaffold cancelled. No files were written.');

      return;
    }

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'dryRunRoot',
      }).info(`Would create monorepo root at "${outputDirectory}".`);

      reportScaffoldCompletion({
        dependenciesInstalled: false,
        displayName: 'Base Monorepo',
        dryRun: true,
        packageManager: 'npm',
        projectRoot: displayPath,
        shouldConfigure: true,
      });

      return;
    }

    const progressTotal: Cli_Scaffold_Starter_Base_Runner_Run_ProgressTotal = 1
      + ((shouldInstall === true) ? 1 : 0);
    const progress: Cli_Scaffold_Starter_Base_Runner_Run_Progress = createScaffoldProgress(progressTotal);

    progress.start('Writing base monorepo files', displayPath);

    // Create monorepo root structure.
    await createMonorepoRoot(outputDirectory, resolvedName, ['nodejs'], resolveScaffoldAllowScripts(['file-watching']));

    await progress.complete();

    let installSucceeded: Cli_Scaffold_Starter_Base_Runner_Run_InstallSucceeded = false;

    if (shouldInstall === true) {
      progress.start('Installing dependencies with npm', displayPath);

      const installResult: Cli_Scaffold_Starter_Base_Runner_Run_InstallResult = await installScaffoldDependencies(outputDirectory, 'npm');

      if (installResult['succeeded'] === false) {
        progress.clear();

        const installOutput: Cli_Scaffold_Starter_Base_Runner_Run_InstallOutput = installResult['output'].trim();

        if (installOutput !== '') {
          process.stderr.write(`\n${installOutput}\n`);
        }

        Logger.customize({
          name: 'Runner.run',
          purpose: 'install',
        }).error(`Dependency installation failed. The scaffold files remain available at "${outputDirectory}". Run "npm install" from that directory after resolving the package-manager error.`);

        process.exitCode = 1;

        return;
      }

      installSucceeded = true;

      await progress.complete();
    }

    progress.finish('Base Monorepo scaffold ready');

    reportScaffoldCompletion({
      dependenciesInstalled: installSucceeded,
      displayName: 'Base Monorepo',
      dryRun: false,
      packageManager: 'npm',
      projectRoot: displayPath,
      shouldConfigure: true,
    });

    return;
  }
}
