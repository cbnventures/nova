/**
 * CLI - Utility - Run Recipes - Run.
 *
 * @since 0.14.0
 */
export type CliUtilityRunRecipesRunOptionsDryRun = true;

export type CliUtilityRunRecipesRunOptionsReplaceFile = true;

export type CliUtilityRunRecipesRunOptions = {
  dryRun?: CliUtilityRunRecipesRunOptionsDryRun;
  replaceFile?: CliUtilityRunRecipesRunOptionsReplaceFile;
};

export type CliUtilityRunRecipesRunReturns = Promise<void>;

export type CliUtilityRunRecipesRunCurrentDirectory = string;

export type CliUtilityRunRecipesRunIsAtProjectRoot = boolean;

export type CliUtilityRunRecipesRunIsDryRun = boolean;

export type CliUtilityRunRecipesRunIsReplaceFile = boolean;

export type CliUtilityRunRecipesRunReplaceFileNotice = string;
