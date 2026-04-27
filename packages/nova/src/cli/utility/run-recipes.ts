import chalk from 'chalk';

import { isProjectRoot } from '../../lib/utility.js';
import { Logger } from '../../toolkit/index.js';
import { registry } from '../recipe/index.js';

import type {
  CliUtilityRunRecipesRunCategoryDescription,
  CliUtilityRunRecipesRunCurrentDirectory,
  CliUtilityRunRecipesRunEntries,
  CliUtilityRunRecipesRunEntryCategory,
  CliUtilityRunRecipesRunEntryRecipes,
  CliUtilityRunRecipesRunIsAtProjectRoot,
  CliUtilityRunRecipesRunIsDryRun,
  CliUtilityRunRecipesRunIsReplaceFile,
  CliUtilityRunRecipesRunOptions,
  CliUtilityRunRecipesRunRecipes,
  CliUtilityRunRecipesRunRegistryCategories,
  CliUtilityRunRecipesRunReplaceFileNotice,
  CliUtilityRunRecipesRunRequestedCategory,
  CliUtilityRunRecipesRunReturns,
  CliUtilityRunRecipesRunTotalRecipes,
} from '../../types/cli/utility/run-recipes.d.ts';

/**
 * CLI - Utility - Run Recipes.
 *
 * Executes every recipe in the registry sequentially.
 * Used as a batch runner for all package.json maintenance tasks.
 *
 * @since 0.14.0
 */
export class CliUtilityRunRecipes {
  /**
   * CLI - Utility - Run Recipes - Run.
   *
   * Verifies the working directory is a project root, then iterates the recipe registry for
   * the given category and calls each recipe's run method with options.
   *
   * @param {CliUtilityRunRecipesRunOptions} options - Options.
   *
   * @returns {CliUtilityRunRecipesRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliUtilityRunRecipesRunOptions): CliUtilityRunRecipesRunReturns {
    const currentDirectory: CliUtilityRunRecipesRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliUtilityRunRecipesRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliUtilityRunRecipesRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliUtilityRunRecipesRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliUtilityRunRecipes.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliUtilityRunRecipesRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliUtilityRunRecipes.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const requestedCategory: CliUtilityRunRecipesRunRequestedCategory = options['category'];

    let entries: CliUtilityRunRecipesRunEntries = undefined;

    if (requestedCategory === undefined) {
      entries = (Object.keys(registry) as CliUtilityRunRecipesRunRegistryCategories)
        .sort()
        .map((category) => [
          category,
          registry[category],
        ]);
    } else {
      const recipes: CliUtilityRunRecipesRunRecipes = registry[requestedCategory];

      if (recipes === undefined) {
        Logger.customize({
          name: 'CliUtilityRunRecipes.run',
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

    const totalRecipes: CliUtilityRunRecipesRunTotalRecipes = entries.reduce((sum, entry) => sum + entry[1].length, 0);
    const categoryDescription: CliUtilityRunRecipesRunCategoryDescription = (requestedCategory === undefined) ? 'all category' : requestedCategory;

    Logger.customize({
      name: 'CliUtilityRunRecipes.run',
      purpose: 'summary',
    }).info(`Running ${totalRecipes} ${categoryDescription} recipe(s) ...`);

    for (const entry of entries) {
      const entryCategory: CliUtilityRunRecipesRunEntryCategory = entry[0];
      const entryRecipes: CliUtilityRunRecipesRunEntryRecipes = entry[1];

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
