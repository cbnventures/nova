import type { Command, CommandUnknownOpts } from '@commander-js/extra-typings';
import type { ChalkInstance } from 'chalk';

import type { Shared_GeneratorRunResult, Shared_RunScriptsOptions } from '../shared.d.ts';
import type { Cli_Utility_RunRecipes_Runner_Run_Options } from './utility/run-recipes.d.ts';

/**
 * CLI - Constructor.
 *
 * @since 0.11.0
 */
export type Cli_ConstructorHeaderText = string;

/**
 * CLI - Env Dir.
 *
 * @since 0.14.0
 */
export type Cli_EnvDir = string | undefined;

/**
 * CLI - Execute Command.
 *
 * @since 0.11.0
 */
export type Cli_ExecuteCommandOptions<Options> = Partial<Options>;

export type Cli_ExecuteCommandTarget<Options> = (options: Cli_ExecuteCommandOptions<Options>) => void | Promise<void> | Promise<Shared_GeneratorRunResult>;

export type Cli_ExecuteCommandReturns = Promise<void>;

export type Cli_ExecuteCommandCommand = RegExpMatchArray | null;

export type Cli_ExecuteCommandCommandLabel = string;

/**
 * CLI - Get Command Usage.
 *
 * @since 0.11.0
 */
export type Cli_GetCommandUsageCommand = CommandUnknownOpts;

export type Cli_GetCommandUsageReturns = string;

export type Cli_GetCommandUsageCommandName = string;

export type Cli_GetCommandUsageCommandAliases = string[];

export type Cli_GetCommandUsageCommandUsage = string;

export type Cli_GetCommandUsageFullCommand = string[];

export type Cli_GetCommandUsageUsagePipeSeparator = string;

export type Cli_GetCommandUsageAliasCommand = string[];

export type Cli_GetCommandUsageParentCommand = CommandUnknownOpts | null;

export type Cli_GetCommandUsageParentCommandName = string;

export type Cli_GetCommandUsageParentCommandAliases = string[];

export type Cli_GetCommandUsageParentAliasSeparated = string;

export type Cli_GetCommandUsageFullLine = string;

export type Cli_GetCommandUsageAliasLine = string;

export type Cli_GetCommandUsageFullLineStripped = string;

export type Cli_GetCommandUsageAliasLineStripped = string;

/**
 * CLI - Get Header.
 *
 * @since 0.11.0
 */
export type Cli_GetHeaderReturns = string;

/**
 * CLI - Get Subcommand Term.
 *
 * @since 0.11.0
 */
export type Cli_GetSubcommandTermCommand = CommandUnknownOpts;

export type Cli_GetSubcommandTermReturns = string;

export type Cli_GetSubcommandTermCategory = 'commands' | 'subcommands';

export type Cli_GetSubcommandTermCategoryPipeSeparator = string;

export type Cli_GetSubcommandTermNames = string;

export type Cli_GetSubcommandTermUsage = string;

/**
 * CLI - Handle CLI Error.
 *
 * @since 0.11.0
 */
export type Cli_HandleCliErrorText = string;

export type Cli_HandleCliErrorReturns = void;

export type Cli_HandleCliErrorProcessedText = string;

/**
 * CLI - Program.
 *
 * @since 0.11.0
 */
export type Cli_Program = Command;

/**
 * CLI - Register Commands.
 *
 * @since 0.11.0
 */
export type Cli_RegisterCommandsReturns = void;

/**
 * CLI - Register Commands - Generate.
 *
 * @since 0.11.0
 */
export type Cli_RegisterCommandsGenerateGenerate = Command;

export type Cli_RegisterCommandsGenerateGenerateGitHub = Command;

export type Cli_RegisterCommandsGenerateGenerateMustHaves = Command;

/**
 * CLI - Register Commands - Recipe.
 *
 * @since 0.11.0
 */
export type Cli_RegisterCommandsRecipeRecipe = Command;

export type Cli_RegisterCommandsRecipeRecipePackageJson = Command;

export type Cli_RegisterCommandsRecipeRecipeGithub = Command;

export type Cli_RegisterCommandsRecipeRecipeGithubOptions = {
  dryRun?: true;
};

/**
 * CLI - Register Commands - Scaffold.
 *
 * @since 0.11.0
 */
export type Cli_RegisterCommandsScaffoldScaffold = Command;

export type Cli_RegisterCommandsScaffoldScaffoldApp = Command;

export type Cli_RegisterCommandsScaffoldScaffoldDocs = Command;

export type Cli_RegisterCommandsScaffoldScaffoldStarter = Command;

/**
 * CLI - Register Commands - Utility.
 *
 * @since 0.11.0
 */
export type Cli_RegisterCommandsUtilityRunRecipesOptions = Cli_Utility_RunRecipes_Runner_Run_Options;

export type Cli_RegisterCommandsUtilityUtility = Command;

export type Cli_RegisterCommandsUtilityRunScriptsOptions = Shared_RunScriptsOptions;

/**
 * CLI - Style Text.
 *
 * @since 0.11.0
 */
export type Cli_StyleTextType = 'commands' | 'description' | 'subcommands' | 'title' | 'usage';

export type Cli_StyleTextText = string;

export type Cli_StyleTextReturns = string;

export type Cli_StyleTextCategoryStyles = Record<Cli_StyleTextType, ChalkInstance[]>;

export type Cli_StyleTextTitleStyles = Record<string, ChalkInstance[]>;

export type Cli_StyleTextCategoryFunctions = ChalkInstance[];

export type Cli_StyleTextTitleFunctions = ChalkInstance[];

export type Cli_StyleTextColoredText = string;
