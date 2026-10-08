import { CLIHeader } from '@cbnventures/nova/toolkit';
import { Command } from 'commander';

/**
 * Program - Create Program.
 *
 * Creates the generated command-line program and its starter action.
 * Consumers can add commands and options to the returned Commander instance.
 *
 * @returns {Command}
 *
 * @since 0.0.0
 */
export function createProgram(): Command {
  return new Command()
    .name('[__WORKSPACE_NAME__]')
    .description('[__WORKSPACE_TITLE__] command-line interface')
    .version('0.0.0')
    .action(() => {
      process.stdout.write(`${CLIHeader.render([
        '[__WORKSPACE_TITLE__]',
        'Ready',
      ], {
        marginBottom: 1,
        width: 64,
      })}\n`);

      return;
    });
}
