import { requireObject, requireString } from '../lib/integration.js';

import type {
  Api_Discord_ApiUrl,
  Api_Discord_Runner_FetchCurrentApplication_Application,
  Api_Discord_Runner_FetchCurrentApplication_Data,
  Api_Discord_Runner_FetchCurrentApplication_Response,
  Api_Discord_Runner_FetchCurrentApplication_ResponseText,
  Api_Discord_Runner_FetchCurrentApplication_Returns,
  Api_Discord_Runner_FetchCurrentApplication_Token,
} from '../types/api/discord.d.ts';

/**
 * API - Discord - API URL.
 *
 * Defines the versioned base URL for Discord REST API requests.
 * Keeping it centralized prevents endpoint wrappers from drifting.
 *
 * @since 0.49.0
 */
const apiUrl: Api_Discord_ApiUrl = 'https://discord.com/api/v10';

/**
 * API - Discord.
 *
 * Wraps the Discord REST API endpoints Nova calls. Callers pass a bot token and
 * receive only the fields Nova uses, never the raw response.
 *
 * @since 0.49.0
 */
export class Runner {
  /**
   * API - Discord - Fetch Current Application.
   *
   * Reads the application that owns the bot token from Discord's current-application
   * endpoint. A non-200 response throws with Discord's status and body.
   *
   * @param {Api_Discord_Runner_FetchCurrentApplication_Token} token - Token.
   *
   * @returns {Api_Discord_Runner_FetchCurrentApplication_Returns}
   *
   * @since 0.49.0
   */
  public static async fetchCurrentApplication(token: Api_Discord_Runner_FetchCurrentApplication_Token): Api_Discord_Runner_FetchCurrentApplication_Returns {
    const response: Api_Discord_Runner_FetchCurrentApplication_Response = await fetch(`${apiUrl}/oauth2/applications/@me`, {
      headers: {
        'Authorization': `Bot ${token}`,
        'Accept': 'application/json',
      },
    });

    if (response.status !== 200) {
      const responseText: Api_Discord_Runner_FetchCurrentApplication_ResponseText = await response.text();

      throw new Error(`Discord token validation failed (${response.status}): ${responseText}`);
    }

    const data: Api_Discord_Runner_FetchCurrentApplication_Data = await response.json();
    const application: Api_Discord_Runner_FetchCurrentApplication_Application = requireObject(data, 'Discord application');

    return {
      id: requireString(application['id'], 'Discord application ID'),
      name: requireString(application['name'], 'Discord application name'),
    };
  }
}
