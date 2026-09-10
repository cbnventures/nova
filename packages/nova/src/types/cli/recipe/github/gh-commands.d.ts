import type {
  Shared_NovaConfigGithubRecipeName,
  Shared_ShellOutput,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - GitHub - Gh Commands - Execute Gh Command.
 *
 * @since 0.26.0
 */
export type Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Commands = string[];

export type Cli_Recipe_Github_GhCommands_ExecuteGhCommand_RecipeName = Shared_NovaConfigGithubRecipeName;

export type Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Index = number;

export type Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Returns = Promise<boolean>;

export type Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Command = string | undefined;

export type Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Result = Shared_ShellOutput;

/**
 * CLI - Recipe - GitHub - Gh Commands - Execute Gh Commands.
 *
 * @since 0.26.0
 */
export type Cli_Recipe_Github_GhCommands_ExecuteGhCommands_Commands = string[];

export type Cli_Recipe_Github_GhCommands_ExecuteGhCommands_RecipeName = Shared_NovaConfigGithubRecipeName;

export type Cli_Recipe_Github_GhCommands_ExecuteGhCommands_IsDryRun = boolean;

export type Cli_Recipe_Github_GhCommands_ExecuteGhCommands_Returns = Promise<boolean>;
