import { executeShell } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Command,
  Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Commands,
  Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Index,
  Cli_Recipe_Github_GhCommands_ExecuteGhCommand_RecipeName,
  Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Result,
  Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Returns,
  Cli_Recipe_Github_GhCommands_ExecuteGhCommands_Commands,
  Cli_Recipe_Github_GhCommands_ExecuteGhCommands_IsDryRun,
  Cli_Recipe_Github_GhCommands_ExecuteGhCommands_RecipeName,
  Cli_Recipe_Github_GhCommands_ExecuteGhCommands_Returns,
} from '../../../types/cli/recipe/github/gh-commands.d.ts';

/**
 * CLI - Recipe - GitHub - Gh Commands - Execute Gh Command.
 *
 * Executes one command and recursively advances through the ordered list. The
 * recursion keeps dependent GitHub mutations sequential without awaiting in a loop.
 *
 * @param {Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Commands}   commands   - Commands.
 * @param {Cli_Recipe_Github_GhCommands_ExecuteGhCommand_RecipeName} recipeName - Recipe name.
 * @param {Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Index}      index      - Index.
 *
 * @returns {Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Returns}
 *
 * @since 0.26.0
 */
async function executeGhCommand(commands: Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Commands, recipeName: Cli_Recipe_Github_GhCommands_ExecuteGhCommand_RecipeName, index: Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Index): Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Returns {
  const command: Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Command = commands[index];

  if (command === undefined) {
    return true;
  }

  const result: Cli_Recipe_Github_GhCommands_ExecuteGhCommand_Result = await executeShell(command);

  if (result['code'] !== 0) {
    handleGhFailure(result, recipeName);

    return false;
  }

  return executeGhCommand(commands, recipeName, index + 1);
}

/**
 * CLI - Recipe - GitHub - Gh Commands - Execute Gh Commands.
 *
 * Logs an ordered list of GitHub CLI mutations, previews them during dry runs,
 * and otherwise executes them sequentially until one fails.
 *
 * @param {Cli_Recipe_Github_GhCommands_ExecuteGhCommands_Commands}   commands   - Commands.
 * @param {Cli_Recipe_Github_GhCommands_ExecuteGhCommands_RecipeName} recipeName - Recipe name.
 * @param {Cli_Recipe_Github_GhCommands_ExecuteGhCommands_IsDryRun}   isDryRun   - Is dry run.
 *
 * @returns {Cli_Recipe_Github_GhCommands_ExecuteGhCommands_Returns}
 *
 * @since 0.26.0
 */
export async function executeGhCommands(commands: Cli_Recipe_Github_GhCommands_ExecuteGhCommands_Commands, recipeName: Cli_Recipe_Github_GhCommands_ExecuteGhCommands_RecipeName, isDryRun: Cli_Recipe_Github_GhCommands_ExecuteGhCommands_IsDryRun): Cli_Recipe_Github_GhCommands_ExecuteGhCommands_Returns {
  for (const command of commands) {
    Logger.customize({
      name: 'executeGhCommands',
      purpose: 'command',
    }).info(`Command: ${command}`);
  }

  if (isDryRun === true) {
    return true;
  }

  return executeGhCommand(commands, recipeName, 0);
}
