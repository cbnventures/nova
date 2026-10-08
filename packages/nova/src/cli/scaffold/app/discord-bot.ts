import { runScaffold } from '../../../lib/scaffold.js';
import { Runner as CliGenerateDockerImage } from '../../generate/docker-image/index.js';

import type {
  Cli_Scaffold_App_DiscordBot_Runner_Run_Options,
  Cli_Scaffold_App_DiscordBot_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/discord-bot.d.ts';

/**
 * CLI - Scaffold - App - Discord Bot.
 *
 * Scaffolds a Discord bot application through the shared workspace pipeline
 * with a typed command and event foundation.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Discord Bot - Run.
   *
   * Delegates to the shared scaffold pipeline with the Discord bot template
   * so monorepo registration remains centralized.
   *
   * @param {Cli_Scaffold_App_DiscordBot_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_DiscordBot_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_App_DiscordBot_Runner_Run_Options): Cli_Scaffold_App_DiscordBot_Runner_Run_Returns {
    if (options['dockerImage'] === true) {
      await runScaffold(options, {
        category: 'app',
        importMetaUrl: import.meta.url,
        templateSubpath: 'scaffold/app/discord-bot',
        typeName: 'discord-bot',
        workspaceFinalizer: async (workspaceDirectory) => {
          await CliGenerateDockerImage.generateForTarget({
            profile: 'background-service',
            replaceFile: true,
            workspaceDirectory,
          });

          return;
        },
      });

      return;
    }

    await runScaffold(options, {
      category: 'app',
      importMetaUrl: import.meta.url,
      templateSubpath: 'scaffold/app/discord-bot',
      typeName: 'discord-bot',
    });

    return;
  }
}
