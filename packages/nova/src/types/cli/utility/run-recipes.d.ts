import type { Cli_Recipe_RegistryCategory, Cli_Recipe_RegistryEntry } from '../../cli/recipe/index.d.ts';

/**
 * CLI - Utility - Run Recipes - Run.
 *
 * @since 0.14.0
 */
export type Cli_Utility_RunRecipes_Runner_Run_Options_DryRun = true;

export type Cli_Utility_RunRecipes_Runner_Run_Options_ReplaceFile = true;

export type Cli_Utility_RunRecipes_Runner_Run_Options_Category = Cli_Recipe_RegistryCategory | undefined;

export type Cli_Utility_RunRecipes_Runner_Run_Options = {
  category?: Cli_Utility_RunRecipes_Runner_Run_Options_Category;
  dryRun?: Cli_Utility_RunRecipes_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Utility_RunRecipes_Runner_Run_Options_ReplaceFile;
};

export type Cli_Utility_RunRecipes_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_RunRecipes_Runner_Run_CurrentDirectory = string;

export type Cli_Utility_RunRecipes_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Utility_RunRecipes_Runner_Run_IsDryRun = boolean;

export type Cli_Utility_RunRecipes_Runner_Run_IsReplaceFile = boolean;

export type Cli_Utility_RunRecipes_Runner_Run_ReplaceFileNotice = string;

export type Cli_Utility_RunRecipes_Runner_Run_RequestedCategory = Cli_Recipe_RegistryCategory | undefined;

export type Cli_Utility_RunRecipes_Runner_Run_Entries = ReadonlyArray<[Cli_Recipe_RegistryCategory, Cli_Recipe_RegistryEntry[]]> | undefined;

export type Cli_Utility_RunRecipes_Runner_Run_RegistryCategories = Cli_Recipe_RegistryCategory[];

export type Cli_Utility_RunRecipes_Runner_Run_Recipes = Cli_Recipe_RegistryEntry[] | undefined;

export type Cli_Utility_RunRecipes_Runner_Run_TotalRecipes = number;

export type Cli_Utility_RunRecipes_Runner_Run_CategoryDescription = string;

export type Cli_Utility_RunRecipes_Runner_Run_EntryCategory = Cli_Recipe_RegistryCategory;

export type Cli_Utility_RunRecipes_Runner_Run_EntryRecipes = Cli_Recipe_RegistryEntry[];
