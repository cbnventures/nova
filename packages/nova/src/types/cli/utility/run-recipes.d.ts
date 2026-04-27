import type { CliRecipeRegistryCategory, CliRecipeRegistryEntry } from '../../cli/recipe/index.d.ts';

/**
 * CLI - Utility - Run Recipes - Run.
 *
 * @since 0.14.0
 */
export type CliUtilityRunRecipesRunOptionsDryRun = true;

export type CliUtilityRunRecipesRunOptionsReplaceFile = true;

export type CliUtilityRunRecipesRunCategory = CliRecipeRegistryCategory | undefined;

export type CliUtilityRunRecipesRunOptions = {
  category?: CliUtilityRunRecipesRunCategory;
  dryRun?: CliUtilityRunRecipesRunOptionsDryRun;
  replaceFile?: CliUtilityRunRecipesRunOptionsReplaceFile;
};

export type CliUtilityRunRecipesRunReturns = Promise<void>;

export type CliUtilityRunRecipesRunCurrentDirectory = string;

export type CliUtilityRunRecipesRunIsAtProjectRoot = boolean;

export type CliUtilityRunRecipesRunIsDryRun = boolean;

export type CliUtilityRunRecipesRunIsReplaceFile = boolean;

export type CliUtilityRunRecipesRunReplaceFileNotice = string;

export type CliUtilityRunRecipesRunRequestedCategory = CliRecipeRegistryCategory | undefined;

export type CliUtilityRunRecipesRunEntries = ReadonlyArray<[CliRecipeRegistryCategory, CliRecipeRegistryEntry[]]> | undefined;

export type CliUtilityRunRecipesRunRegistryCategories = CliRecipeRegistryCategory[];

export type CliUtilityRunRecipesRunRecipes = CliRecipeRegistryEntry[] | undefined;

export type CliUtilityRunRecipesRunTotalRecipes = number;

export type CliUtilityRunRecipesRunCategoryDescription = string;

export type CliUtilityRunRecipesRunEntryCategory = CliRecipeRegistryCategory;

export type CliUtilityRunRecipesRunEntryRecipes = CliRecipeRegistryEntry[];
