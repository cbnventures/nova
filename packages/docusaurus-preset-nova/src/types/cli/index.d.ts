import type { Command } from 'commander';

/**
 * CLI.
 *
 * @since 0.21.0
 */
export type Cli_Index_CLI_Program = Command;

/**
 * CLI.
 *
 * @since 0.21.0
 */
export type Cli_Index_CLI_Constructor_HeaderText = string;

/**
 * CLI.
 *
 * @since 0.21.0
 */
export type Cli_Index_CLI_ExecuteCommand_Options<Options> = Partial<Options>;

export type Cli_Index_CLI_ExecuteCommand_Target<Options> = (options: Cli_Index_CLI_ExecuteCommand_Options<Options>) => void | Promise<void>;

export type Cli_Index_CLI_ExecuteCommand_Returns = Promise<void>;

export type Cli_Index_CLI_ExecuteCommand_CommandLabel = string;

/**
 * CLI.
 *
 * @since 0.21.0
 */
export type Cli_Index_CLI_GetHeader_Returns = string;

/**
 * CLI.
 *
 * @since 0.21.0
 */
export type Cli_Index_CLI_HandleCliError_Text = string;

export type Cli_Index_CLI_HandleCliError_Returns = void;

export type Cli_Index_CLI_HandleCliError_ProcessedText = string;

/**
 * CLI.
 *
 * @since 0.21.0
 */
export type Cli_Index_CLI_RegisterCommands_Returns = void;

export type Cli_Index_CLI_RegisterCommands_I18n = Command;
