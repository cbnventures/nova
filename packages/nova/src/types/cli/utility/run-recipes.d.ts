/**
 * CLI Utility - Run Recipes - Run.
 *
 * @since 1.0.0
 */
export type CLIUtilityRunRecipesRunOptionsDryRun = true;

export type CLIUtilityRunRecipesRunOptionsReplaceFile = true;

export type CLIUtilityRunRecipesRunOptions = {
  dryRun?: CLIUtilityRunRecipesRunOptionsDryRun;
  replaceFile?: CLIUtilityRunRecipesRunOptionsReplaceFile;
};

export type CLIUtilityRunRecipesRunReturns = Promise<void>;
