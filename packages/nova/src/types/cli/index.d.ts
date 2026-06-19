import type { Command, CommandUnknownOpts } from '@commander-js/extra-typings';
import type { ChalkInstance } from 'chalk';

import type { Shared_GeneratorRunResult, Shared_RunScriptsOptions } from '../shared.d.ts';
import type { Cli_Utility_RunRecipes_Runner_Run_Options } from './utility/run-recipes.d.ts';

/**
 * CLI - Env Dir.
 *
 * @since 0.14.0
 */
export type Cli_Index_EnvDir = string | undefined;

/**
 * CLI - Program.
 *
 * @since 0.11.0
 */
export type Cli_Index_CLI_Program = Command;

/**
 * CLI - Constructor.
 *
 * @since 0.11.0
 */
export type Cli_Index_CLI_Constructor_HeaderText = string;

/**
 * CLI - Execute Command.
 *
 * @since 0.11.0
 */
export type Cli_Index_CLI_ExecuteCommand_Options<Options> = Partial<Options>;

export type Cli_Index_CLI_ExecuteCommand_Target<Options> = (options: Cli_Index_CLI_ExecuteCommand_Options<Options>) => void | Promise<void> | Promise<Shared_GeneratorRunResult>;

export type Cli_Index_CLI_ExecuteCommand_Returns = Promise<void>;

export type Cli_Index_CLI_ExecuteCommand_Command = RegExpMatchArray | null;

export type Cli_Index_CLI_ExecuteCommand_CommandLabel = string;

/**
 * CLI - Get Command Usage.
 *
 * @since 0.11.0
 */
export type Cli_Index_CLI_GetCommandUsage_Command = CommandUnknownOpts;

export type Cli_Index_CLI_GetCommandUsage_Returns = string;

export type Cli_Index_CLI_GetCommandUsage_CommandName = string;

export type Cli_Index_CLI_GetCommandUsage_CommandAliases = string[];

export type Cli_Index_CLI_GetCommandUsage_CommandUsage = string;

export type Cli_Index_CLI_GetCommandUsage_FullCommand = string[];

export type Cli_Index_CLI_GetCommandUsage_UsagePipeSeparator = string;

export type Cli_Index_CLI_GetCommandUsage_AliasCommand = string[];

export type Cli_Index_CLI_GetCommandUsage_ParentCommand = CommandUnknownOpts | null;

export type Cli_Index_CLI_GetCommandUsage_ParentCommandName = string;

export type Cli_Index_CLI_GetCommandUsage_ParentCommandAliases = string[];

export type Cli_Index_CLI_GetCommandUsage_ParentAliasSeparated = string;

export type Cli_Index_CLI_GetCommandUsage_FullLine = string;

export type Cli_Index_CLI_GetCommandUsage_AliasLine = string;

export type Cli_Index_CLI_GetCommandUsage_FullLineStripped = string;

export type Cli_Index_CLI_GetCommandUsage_AliasLineStripped = string;

/**
 * CLI - Get Header.
 *
 * @since 0.11.0
 */
export type Cli_Index_CLI_GetHeader_Returns = string;

/**
 * CLI - Get Subcommand Term.
 *
 * @since 0.11.0
 */
export type Cli_Index_CLI_GetSubcommandTerm_Command = CommandUnknownOpts;

export type Cli_Index_CLI_GetSubcommandTerm_Returns = string;

export type Cli_Index_CLI_GetSubcommandTerm_Category = 'commands' | 'subcommands';

export type Cli_Index_CLI_GetSubcommandTerm_CategoryPipeSeparator = string;

export type Cli_Index_CLI_GetSubcommandTerm_Names = string;

export type Cli_Index_CLI_GetSubcommandTerm_Usage = string;

/**
 * CLI - Handle CLI Error.
 *
 * @since 0.11.0
 */
export type Cli_Index_CLI_HandleCliError_Text = string;

export type Cli_Index_CLI_HandleCliError_Returns = void;

export type Cli_Index_CLI_HandleCliError_ProcessedText = string;

/**
 * CLI - Register Commands.
 *
 * @since 0.11.0
 */
export type Cli_Index_CLI_RegisterCommands_Returns = void;

export type Cli_Index_CLI_RegisterCommands_Generate = Command;

export type Cli_Index_CLI_RegisterCommands_GenerateGitHub = Command;

export type Cli_Index_CLI_RegisterCommands_GenerateMustHaves = Command;

export type Cli_Index_CLI_RegisterCommands_Recipe = Command;

export type Cli_Index_CLI_RegisterCommands_RecipePackageJson = Command;

export type Cli_Index_CLI_RegisterCommands_RecipeGithub = Command;

export type Cli_Index_CLI_RegisterCommands_RunRecipesOptions = Cli_Utility_RunRecipes_Runner_Run_Options;

export type Cli_Index_CLI_RegisterCommands_RecipeGithubOptions = {
  dryRun?: true;
};

export type Cli_Index_CLI_RegisterCommands_Scaffold = Command;

export type Cli_Index_CLI_RegisterCommands_ScaffoldApp = Command;

export type Cli_Index_CLI_RegisterCommands_ScaffoldDocs = Command;

export type Cli_Index_CLI_RegisterCommands_ScaffoldStarter = Command;

export type Cli_Index_CLI_RegisterCommands_Utility = Command;

export type Cli_Index_CLI_RegisterCommands_RunScriptsOptions = Shared_RunScriptsOptions;

/**
 * CLI - Style Text.
 *
 * @since 0.11.0
 */
export type Cli_Index_CLI_StyleText_Type = 'commands' | 'description' | 'subcommands' | 'title' | 'usage';

export type Cli_Index_CLI_StyleText_Text = string;

export type Cli_Index_CLI_StyleText_Returns = string;

export type Cli_Index_CLI_StyleText_CategoryStyles = Record<Cli_Index_CLI_StyleText_Type, ChalkInstance[]>;

export type Cli_Index_CLI_StyleText_TitleStyles = Record<string, ChalkInstance[]>;

export type Cli_Index_CLI_StyleText_CategoryFunctions = ChalkInstance[];

export type Cli_Index_CLI_StyleText_TitleFunctions = ChalkInstance[];

export type Cli_Index_CLI_StyleText_ColoredText = string;
