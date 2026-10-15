import type { ChalkInstance } from 'chalk';
import type { Command } from 'commander';

/**
 * Program - CLI.
 *
 * @since 0.0.0
 */
export type Program_CLI_Program = Command;

/**
 * Program - CLI - Run.
 *
 * @since 0.0.0
 */
export type Program_CLI_Run_CommandArguments = string[];

export type Program_CLI_Run_Returns = Promise<void>;

/**
 * Program - CLI - Register Commands.
 *
 * @since 0.0.0
 */
export type Program_CLI_RegisterCommands_Status = Command;

export type Program_CLI_RegisterCommands_Returns = void;

/**
 * Program - CLI - Execute Command.
 *
 * @since 0.0.0
 */
export type Program_CLI_ExecuteCommand_Target = () => void | Promise<void>;

export type Program_CLI_ExecuteCommand_Returns = Promise<void>;

export type Program_CLI_ExecuteCommand_CommandLabel = string;

/**
 * Program - CLI - Get Header.
 *
 * @since 0.0.0
 */
export type Program_CLI_GetHeader_Returns = string;

/**
 * Program - CLI - Get Command Usage.
 *
 * @since 0.0.0
 */
export type Program_CLI_GetCommandUsage_Command = Command;

export type Program_CLI_GetCommandUsage_Returns = string;

export type Program_CLI_GetCommandUsage_CommandName = string;

export type Program_CLI_GetCommandUsage_CommandAliases = string[];

export type Program_CLI_GetCommandUsage_CommandUsage = string;

export type Program_CLI_GetCommandUsage_FullCommand = string[];

export type Program_CLI_GetCommandUsage_UsagePipeSeparator = string;

export type Program_CLI_GetCommandUsage_AliasCommand = string[];

export type Program_CLI_GetCommandUsage_ParentCommand = Command | null;

export type Program_CLI_GetCommandUsage_ParentCommandName = string;

export type Program_CLI_GetCommandUsage_ParentCommandAliases = string[];

export type Program_CLI_GetCommandUsage_FullLine = string;

export type Program_CLI_GetCommandUsage_AliasLine = string;

/**
 * Program - CLI - Get Subcommand Term.
 *
 * @since 0.0.0
 */
export type Program_CLI_GetSubcommandTerm_Command = Command;

export type Program_CLI_GetSubcommandTerm_Returns = string;

export type Program_CLI_GetSubcommandTerm_Category = 'commands' | 'subcommands';

export type Program_CLI_GetSubcommandTerm_CategoryPipeSeparator = string;

export type Program_CLI_GetSubcommandTerm_Names = string;

export type Program_CLI_GetSubcommandTerm_Usage = string;

/**
 * Program - CLI - Style Text.
 *
 * @since 0.0.0
 */
export type Program_CLI_StyleText_Type = 'commands' | 'description' | 'subcommands' | 'title' | 'usage';

export type Program_CLI_StyleText_Text = string;

export type Program_CLI_StyleText_Returns = string;

export type Program_CLI_StyleText_CategoryStyles = Record<Program_CLI_StyleText_Type, ChalkInstance[]>;

export type Program_CLI_StyleText_TitleStyles = Record<string, ChalkInstance[]>;

export type Program_CLI_StyleText_CategoryFunctions = ChalkInstance[];

export type Program_CLI_StyleText_TitleFunctions = ChalkInstance[];

export type Program_CLI_StyleText_ColoredText = string;

/**
 * Program - CLI - Handle CLI Error.
 *
 * @since 0.0.0
 */
export type Program_CLI_HandleCliError_Text = string;

export type Program_CLI_HandleCliError_Returns = void;

export type Program_CLI_HandleCliError_ProcessedText = string;
