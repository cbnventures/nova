import { start } from 'node:repl';

import { [__WORKSPACE_IDENTIFIER__]Platform } from '../platform.js';
import { renderHeader, writeHelp } from './presentation.js';

import type {
  Cli_Repl_Arguments,
  Cli_Repl_HasHelpFlag,
  Cli_Repl_Server,
} from '../types/cli/repl.d.ts';

/**
 * Repl - Command Arguments.
 *
 * Captures user arguments without the Node.js executable and launcher paths.
 * The resulting list controls help or interactive execution.
 *
 * @since 0.0.0
 */
const commandArguments: Cli_Repl_Arguments = process.argv.slice(2);

/**
 * Repl - Has Help Flag.
 *
 * Determines whether the command should print help instead of opening a shell.
 * Both conventional short and long flags are supported.
 *
 * @since 0.0.0
 */
const hasHelpFlag: Cli_Repl_HasHelpFlag = commandArguments.includes('-h') || commandArguments.includes('--help');

if (hasHelpFlag === true) {
  writeHelp('[__WORKSPACE_PACKAGE_NAME__]-repl', 'Interactive plugin development shell', ['-h, --help  Display the help menu']);
} else {
  process.stdout.write(`${renderHeader('Interactive plugin development shell')}\n`);
  process.stdout.write('Available values: Platform, platformName, pluginName\n\n');

  /**
   * Repl - Server.
   *
   * Holds the interactive Node.js shell and its generated plugin context.
   * Consumers can add provider clients or fixtures beside these starter values.
   *
   * @since 0.0.0
   */
  const replServer: Cli_Repl_Server = start({ prompt: '[__WORKSPACE_NAME__]> ' });

  Reflect.set(replServer.context, 'Platform', [__WORKSPACE_IDENTIFIER__]Platform);
  Reflect.set(replServer.context, 'platformName', '[__WORKSPACE_IDENTIFIER__]');
  Reflect.set(replServer.context, 'pluginName', '[__WORKSPACE_PACKAGE_NAME__]');
}
