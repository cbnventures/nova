import prompts from 'prompts';

import { Runner as AppStoreConnect } from './app-store-connect.js';
import { Runner as DiscordDeveloperPortal } from './discord-developer-portal.js';
import { Runner as GooglePlayConsole } from './google-play-console.js';

import type {
  Cli_Integration_Index_Runner_AppStoreConnect_Answers,
  Cli_Integration_Index_Runner_AppStoreConnect_Options,
  Cli_Integration_Index_Runner_AppStoreConnect_Returns,
  Cli_Integration_Index_Runner_AppStoreConnect_Selection,
  Cli_Integration_Index_Runner_DiscordDeveloperPortal_Answers,
  Cli_Integration_Index_Runner_DiscordDeveloperPortal_Options,
  Cli_Integration_Index_Runner_DiscordDeveloperPortal_Returns,
  Cli_Integration_Index_Runner_DiscordDeveloperPortal_Selection,
  Cli_Integration_Index_Runner_GooglePlayConsole_Answers,
  Cli_Integration_Index_Runner_GooglePlayConsole_Options,
  Cli_Integration_Index_Runner_GooglePlayConsole_Returns,
  Cli_Integration_Index_Runner_GooglePlayConsole_Selection,
  Cli_Integration_Index_Runner_Run_Answers,
  Cli_Integration_Index_Runner_Run_Options,
  Cli_Integration_Index_Runner_Run_Returns,
  Cli_Integration_Index_Runner_Run_Selection,
} from '../../types/cli/integration/index.d.ts';

/**
 * CLI - Integration.
 *
 * Presents interactive vendor and operation menus when a category is invoked
 * without a leaf command while keeping every leaf directly scriptable.
 *
 * @since 0.34.0
 */
export class Runner {
  /**
   * CLI - Integration - Run.
   *
   * Lets an interactive developer select one supported external service before
   * delegating to its category menu.
   *
   * @param {Cli_Integration_Index_Runner_Run_Options} _options - Options.
   *
   * @returns {Cli_Integration_Index_Runner_Run_Returns}
   *
   * @since 0.34.0
   */
  public static async run(_options: Cli_Integration_Index_Runner_Run_Options): Cli_Integration_Index_Runner_Run_Returns {
    const answers: Cli_Integration_Index_Runner_Run_Answers = await prompts({
      type: 'select',
      name: 'selection',
      message: 'Integration:',
      choices: [
        {
          title: 'App Store Connect',
          value: 'app-store-connect',
        },
        {
          title: 'Discord Developer Portal',
          value: 'discord-developer-portal',
        },
        {
          title: 'Google Play Console',
          value: 'google-play-console',
        },
      ],
    }, {
      onCancel: () => false,
    });
    const selection: Cli_Integration_Index_Runner_Run_Selection = answers['selection'];

    if (selection === 'app-store-connect') {
      await Runner.appStoreConnect({});
    } else if (selection === 'discord-developer-portal') {
      await Runner.discordDeveloperPortal({});
    } else if (selection === 'google-play-console') {
      await Runner.googlePlayConsole({});
    } else {
      throw new Error('Integration selection was cancelled.');
    }

    return;
  }

  /**
   * CLI - Integration - Discord Developer Portal.
   *
   * Keeps the Discord category consistent with other vendor menus even while it
   * currently exposes one focused credential validation operation.
   *
   * @param {Cli_Integration_Index_Runner_DiscordDeveloperPortal_Options} _options - Options.
   *
   * @returns {Cli_Integration_Index_Runner_DiscordDeveloperPortal_Returns}
   *
   * @since 0.34.0
   */
  public static async discordDeveloperPortal(_options: Cli_Integration_Index_Runner_DiscordDeveloperPortal_Options): Cli_Integration_Index_Runner_DiscordDeveloperPortal_Returns {
    const answers: Cli_Integration_Index_Runner_DiscordDeveloperPortal_Answers = await prompts({
      type: 'select',
      name: 'selection',
      message: 'Discord Developer Portal operation:',
      choices: [{
        title: 'Validate token',
        value: 'validate-token',
      }],
    }, {
      onCancel: () => false,
    });
    const selection: Cli_Integration_Index_Runner_DiscordDeveloperPortal_Selection = answers['selection'];

    if (selection === 'validate-token') {
      await DiscordDeveloperPortal.validateToken({});
    } else {
      throw new Error('Discord Developer Portal operation selection was cancelled.');
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect.
   *
   * Selects one Apple upload operation while preserving direct leaf commands for
   * agents and automation.
   *
   * @param {Cli_Integration_Index_Runner_AppStoreConnect_Options} _options - Options.
   *
   * @returns {Cli_Integration_Index_Runner_AppStoreConnect_Returns}
   *
   * @since 0.34.0
   */
  public static async appStoreConnect(_options: Cli_Integration_Index_Runner_AppStoreConnect_Options): Cli_Integration_Index_Runner_AppStoreConnect_Returns {
    const answers: Cli_Integration_Index_Runner_AppStoreConnect_Answers = await prompts({
      type: 'select',
      name: 'selection',
      message: 'App Store Connect operation:',
      choices: [
        {
          title: 'Creative assets',
          value: 'creative-assets',
        },
        {
          title: 'Metadata',
          value: 'metadata',
        },
        {
          title: 'Screenshots',
          value: 'screenshots',
        },
      ],
    }, {
      onCancel: () => false,
    });
    const selection: Cli_Integration_Index_Runner_AppStoreConnect_Selection = answers['selection'];

    if (selection === 'creative-assets') {
      await AppStoreConnect.creativeAssets({});
    } else if (selection === 'metadata') {
      await AppStoreConnect.metadata({});
    } else if (selection === 'screenshots') {
      await AppStoreConnect.screenshots({});
    } else {
      throw new Error('App Store Connect operation selection was cancelled.');
    }

    return;
  }

  /**
   * CLI - Integration - Google Play Console.
   *
   * Selects one Google Play upload operation using the vendor's public naming.
   * Direct leaf commands remain available for non-interactive use.
   *
   * @param {Cli_Integration_Index_Runner_GooglePlayConsole_Options} _options - Options.
   *
   * @returns {Cli_Integration_Index_Runner_GooglePlayConsole_Returns}
   *
   * @since 0.34.0
   */
  public static async googlePlayConsole(_options: Cli_Integration_Index_Runner_GooglePlayConsole_Options): Cli_Integration_Index_Runner_GooglePlayConsole_Returns {
    const answers: Cli_Integration_Index_Runner_GooglePlayConsole_Answers = await prompts({
      type: 'select',
      name: 'selection',
      message: 'Google Play Console operation:',
      choices: [
        {
          title: 'Graphic assets',
          value: 'graphic-assets',
        },
        {
          title: 'Metadata',
          value: 'metadata',
        },
        {
          title: 'Screenshots',
          value: 'screenshots',
        },
      ],
    }, {
      onCancel: () => false,
    });
    const selection: Cli_Integration_Index_Runner_GooglePlayConsole_Selection = answers['selection'];

    if (selection === 'graphic-assets') {
      await GooglePlayConsole.graphicAssets({});
    } else if (selection === 'metadata') {
      await GooglePlayConsole.metadata({});
    } else if (selection === 'screenshots') {
      await GooglePlayConsole.screenshots({});
    } else {
      throw new Error('Google Play Console operation selection was cancelled.');
    }

    return;
  }
}
