import chalk from 'chalk';

import { recipeRegistry } from '@/cli/recipe/index.js';
import { isProjectRoot } from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIUtilityRunRecipesRunOptions,
  CLIUtilityRunRecipesRunReturns,
} from '@/types/cli/utility/run-recipes.d.ts';

/**
 * CLI Utility - Run Recipes.
 *
 * @since 1.0.0
 */
export class CLIUtilityRunRecipes {
  /**
   * CLI Utility - Run Recipes - Run.
   *
   * @param {CLIUtilityRunRecipesRunOptions} options - Options.
   *
   * @returns {CLIUtilityRunRecipesRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIUtilityRunRecipesRunOptions): CLIUtilityRunRecipesRunReturns {
    const currentDirectory = process.cwd();
    const isAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun = options.dryRun === true;
    const isReplaceFile = options.replaceFile === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CLIUtilityRunRecipes.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIUtilityRunRecipes.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    // Run all recipes sequentially.
    Logger.customize({
      name: 'CLIUtilityRunRecipes.run',
      purpose: 'summary',
    }).info(`Running ${recipeRegistry.length} recipe(s) ...`);

    for (const recipe of recipeRegistry) {
      process.stdout.write(`\n┌─ ${chalk.cyan(recipe.label)} ──\n`);

      await recipe.run({
        ...(options.dryRun === true) ? { dryRun: options.dryRun } : {},
        ...(options.replaceFile === true) ? { replaceFile: options.replaceFile } : {},
      });

      process.stdout.write(`└─ ${chalk.cyan(recipe.label)} ──\n`);
    }
  }
}
