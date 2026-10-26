import { join } from 'node:path';

import {
  readDotenvValue,
  requireObject,
  requireString,
  resolveWorkspace,
} from '../../lib/integration.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_Options,
  Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_Returns,
  Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_RootEnvPath,
  Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_RootToken,
  Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_Workspace,
  Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_WorkspaceEnvPath,
  Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_WorkspaceToken,
  Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Application,
  Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_ApplicationId,
  Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_ApplicationName,
  Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Data,
  Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Options,
  Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Response,
  Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_ResponseText,
  Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Returns,
  Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Token,
} from '../../types/cli/integration/discord-developer-portal.d.ts';

/**
 * CLI - Integration - Discord Developer Portal.
 *
 * Validates a Discord bot token without storing it in Nova configuration or
 * printing secret material to the terminal.
 *
 * @since 0.34.0
 */
export class Runner {
  /**
   * CLI - Integration - Discord Developer Portal - Validate Token.
   *
   * Uses Discord's current-application endpoint to prove the supplied bot token
   * and reports only the non-secret application identity.
   *
   * @param {Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Options} options - Options.
   *
   * @returns {Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Returns}
   *
   * @since 0.34.0
   */
  public static async validateToken(options: Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Options): Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Returns {
    const token: Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Token = await Runner.resolveToken(options);
    const response: Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Response = await fetch('https://discord.com/api/v10/oauth2/applications/@me', {
      headers: {
        'Authorization': `Bot ${token}`,
        'Accept': 'application/json',
      },
    });

    if (response.status !== 200) {
      const responseText: Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_ResponseText = await response.text();

      throw new Error(`Discord token validation failed (${response.status}): ${responseText}`);
    }

    const data: Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Data = await response.json();
    const application: Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_Application = requireObject(data, 'Discord application');
    const applicationId: Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_ApplicationId = requireString(application['id'], 'Discord application ID');
    const applicationName: Cli_Integration_DiscordDeveloperPortal_Runner_ValidateToken_ApplicationName = requireString(application['name'], 'Discord application name');

    Logger.info(`Discord token is valid for ${applicationName} (${applicationId}).`);

    return;
  }

  /**
   * CLI - Integration - Discord Developer Portal - Resolve Token.
   *
   * Prefers an explicit CLI token, then reads only DISCORD_TOKEN from the selected
   * workspace or root dotenv file without loading unrelated environment values.
   *
   * @param {Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_Returns}
   *
   * @since 0.34.0
   */
  private static async resolveToken(options: Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_Options): Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_Returns {
    if (options['token'] !== undefined && options['token'] !== '') {
      return options['token'];
    }

    const workspace: Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_Workspace = await resolveWorkspace(options, ['package.json']);
    const workspaceEnvPath: Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_WorkspaceEnvPath = join(workspace['absolutePath'], '.env');
    const rootEnvPath: Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_RootEnvPath = join(process.cwd(), '.env');
    const workspaceToken: Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_WorkspaceToken = await readDotenvValue(workspaceEnvPath, 'DISCORD_TOKEN');

    if (workspaceToken !== undefined && workspaceToken !== '') {
      return workspaceToken;
    }

    const rootToken: Cli_Integration_DiscordDeveloperPortal_Runner_ResolveToken_RootToken = await readDotenvValue(rootEnvPath, 'DISCORD_TOKEN');

    if (rootToken !== undefined && rootToken !== '') {
      return rootToken;
    }

    throw new Error('No Discord token was provided. Pass --token or set DISCORD_TOKEN in the selected workspace .env file.');
  }
}
