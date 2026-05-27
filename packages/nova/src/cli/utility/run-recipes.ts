import chalk from 'chalk';

import { isProjectRoot } from '../../lib/utility.js';
import { Logger } from '../../toolkit/index.js';
import { registry } from '../recipe/index.js';

import type {
  Cli_Utility_RunRecipes_Runner_Run_CategoryDescription,
  Cli_Utility_RunRecipes_Runner_Run_CurrentDirectory,
  Cli_Utility_RunRecipes_Runner_Run_Entries,
  Cli_Utility_RunRecipes_Runner_Run_EntryCategory,
  Cli_Utility_RunRecipes_Runner_Run_EntryRecipes,
  Cli_Utility_RunRecipes_Runner_Run_IsAtProjectRoot,
  Cli_Utility_RunRecipes_Runner_Run_IsDryRun,
  Cli_Utility_RunRecipes_Runner_Run_IsReplaceFile,
  Cli_Utility_RunRecipes_Runner_Run_Options,
  Cli_Utility_RunRecipes_Runner_Run_Recipes,
  Cli_Utility_RunRecipes_Runner_Run_RegistryCategories,
  Cli_Utility_RunRecipes_Runner_Run_ReplaceFileNotice,
  Cli_Utility_RunRecipes_Runner_Run_RequestedCategory,
  Cli_Utility_RunRecipes_Runner_Run_Returns,
  Cli_Utility_RunRecipes_Runner_Run_TotalRecipes,
} from '../../types/cli/utility/run-recipes.d.ts';

/**
 * CLI - Utility - Run Recipes.
 *
 * Executes every recipe in the registry sequentially.
 * Used as a batch runner for all package.json maintenance tasks.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Utility - Run Recipes - Run.
   *
   * Verifies the working directory is a project root, then iterates the recipe registry for
   * the given category and calls each recipe's run method with options.
   *
   * @param {Cli_Utility_RunRecipes_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_RunRecipes_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Utility_RunRecipes_Runner_Run_Options): Cli_Utility_RunRecipes_Runner_Run_Returns {
    const currentDirectory: Cli_Utility_RunRecipes_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Utility_RunRecipes_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Utility_RunRecipes_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Utility_RunRecipes_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Utility_RunRecipes_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const requestedCategory: Cli_Utility_RunRecipes_Runner_Run_RequestedCategory = options['category'];

    let entries: Cli_Utility_RunRecipes_Runner_Run_Entries = undefined;

    if (requestedCategory === undefined) {
      entries = (Object.keys(registry) as Cli_Utility_RunRecipes_Runner_Run_RegistryCategories)
        .sort()
        .map((category) => [
          category,
          registry[category],
        ]);
    } else {
      const recipes: Cli_Utility_RunRecipes_Runner_Run_Recipes = registry[requestedCategory];

      if (recipes === undefined) {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'category',
        }).error(`Unknown category "${requestedCategory}".`);

        process.exitCode = 1;

        return;
      }

      entries = [[
        requestedCategory,
        recipes,
      ]];
    }

    const totalRecipes: Cli_Utility_RunRecipes_Runner_Run_TotalRecipes = entries.reduce((sum, entry) => sum + entry[1].length, 0);
    const categoryDescription: Cli_Utility_RunRecipes_Runner_Run_CategoryDescription = (requestedCategory === undefined) ? 'all category' : requestedCategory;

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Running ${totalRecipes} ${categoryDescription} recipe(s) ...`);

    for (const entry of entries) {
      const entryCategory: Cli_Utility_RunRecipes_Runner_Run_EntryCategory = entry[0];
      const entryRecipes: Cli_Utility_RunRecipes_Runner_Run_EntryRecipes = entry[1];

      for (const recipe of entryRecipes) {
        process.stdout.write(`\n┌─ ${chalk.cyan(`${entryCategory}/${recipe['name']}`)} ──\n`);

        await recipe.run({
          ...(options['dryRun'] === true) ? { dryRun: options['dryRun'] } : {},
          ...(options['replaceFile'] === true) ? { replaceFile: options['replaceFile'] } : {},
        });

        process.stdout.write(`└─ ${chalk.cyan(`${entryCategory}/${recipe['name']}`)} ──\n`);
      }
    }

    return;
  }
}
