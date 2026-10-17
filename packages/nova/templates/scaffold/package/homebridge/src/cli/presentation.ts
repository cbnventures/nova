import { CLIHeader } from '@cbnventures/nova/toolkit';

import packageJson from '../../package.json' with { type: 'json' };

import type {
  Cli_Presentation_RenderHeader_Description,
  Cli_Presentation_RenderHeader_Returns,
  Cli_Presentation_WriteHelp_Command,
  Cli_Presentation_WriteHelp_Description,
  Cli_Presentation_WriteHelp_Options,
  Cli_Presentation_WriteHelp_Returns,
} from '../types/cli/presentation.d.ts';

/**
 * Presentation - Render Header.
 *
 * Renders fixed-width package metadata for both generated utility commands.
 * Keeping the presentation shared prevents the two executables from drifting.
 *
 * @param {Cli_Presentation_RenderHeader_Description} description - Description.
 *
 * @returns {Cli_Presentation_RenderHeader_Returns}
 *
 * @since 0.0.0
 */
export function renderHeader(description: Cli_Presentation_RenderHeader_Description): Cli_Presentation_RenderHeader_Returns {
  return CLIHeader.render(
    [
      `${packageJson['name']} v${packageJson['version']}`,
      description,
    ],
    {
      align: 'center',
      marginBottom: 1,
      marginTop: 0,
      paddingX: 1,
      paddingY: 0,
      style: 'round',
      width: 50,
    },
  );
}

/**
 * Presentation - Write Help.
 *
 * Prints the shared header followed by one concise command-specific help page.
 * Options are supplied as complete lines so each utility owns its public flags.
 *
 * @param {Cli_Presentation_WriteHelp_Command}     command     - Command.
 * @param {Cli_Presentation_WriteHelp_Description} description - Description.
 * @param {Cli_Presentation_WriteHelp_Options}     options     - Options.
 *
 * @returns {Cli_Presentation_WriteHelp_Returns}
 *
 * @since 0.0.0
 */
export function writeHelp(command: Cli_Presentation_WriteHelp_Command, description: Cli_Presentation_WriteHelp_Description, options: Cli_Presentation_WriteHelp_Options): Cli_Presentation_WriteHelp_Returns {
  process.stdout.write(`${renderHeader(description)}\n`);
  process.stdout.write(`Usage: ${command} [options]\n\n`);
  process.stdout.write('Options:\n');
  process.stdout.write(`${options.map((option) => `  ${option}`).join('\n')}\n`);

  return;
}
