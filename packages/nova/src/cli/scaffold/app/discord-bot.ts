import { Runner as LibDockerPackaging } from '../../../lib/docker-packaging.js';
import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_App_DiscordBot_CompletionNotes,
  Cli_Scaffold_App_DiscordBot_Runner_Run_Options,
  Cli_Scaffold_App_DiscordBot_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/discord-bot.d.ts';

/**
 * CLI - Scaffold - App - Discord Bot - Completion Notes.
 *
 * Keeps Discord's first-run prerequisites consistent across the standard and
 * container-ready scaffold paths.
 *
 * @since 0.31.0
 */
const completionNotes: Cli_Scaffold_App_DiscordBot_CompletionNotes = [
  'Create a Discord application and bot: https://discord.com/developers/applications',
  'From the application Installation page, add the bot to a server with the "bot" scope.',
  'Set "DISCORD_TOKEN" in the generated Discord workspace .env file.',
];

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
        completionNotes,
        displayName: 'Discord Bot',
        environmentVariables: [{
          key: 'DISCORD_TOKEN',
          reach: 'local',
        }],
        importMetaUrl: import.meta.url,
        platforms: [
          'nodejs',
          'discord',
          'docker',
        ],
        resolvePresentationOptions: () => [
          {
            flag: '--docker-image',
            value: 'Yes',
          },
          {
            flag: 'Discord token',
            value: 'Required at first run; Nova never collects it',
          },
        ],
        templateSubpath: 'scaffold/app/discord-bot',
        typeName: 'discord-bot',
        workspaceFinalizer: async (workspaceDirectory) => {
          await LibDockerPackaging.generateForTarget({
            profile: 'background-service',
            reportFiles: false,
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
      completionNotes,
      displayName: 'Discord Bot',
      environmentVariables: [{
        key: 'DISCORD_TOKEN',
        reach: 'local',
      }],
      importMetaUrl: import.meta.url,
      platforms: [
        'nodejs',
        'discord',
      ],
      resolvePresentationOptions: () => [
        {
          flag: '--docker-image',
          value: 'No',
        },
        {
          flag: 'Discord token',
          value: 'Required at first run; Nova never collects it',
        },
      ],
      templateSubpath: 'scaffold/app/discord-bot',
      typeName: 'discord-bot',
    });

    return;
  }
}
