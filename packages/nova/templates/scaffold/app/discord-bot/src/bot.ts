import { CLIHeader } from '@cbnventures/nova/toolkit';
import {
  Client,
  Events,
  GatewayIntentBits,
} from 'discord.js';

import type {
  Bot_RenderSetupInstructions_Header,
  Bot_RenderSetupInstructions_Returns,
  Bot_RenderStatus_Detail,
  Bot_RenderStatus_Returns,
  Bot_RenderStatus_State,
  Bot_StartBot_Client,
  Bot_StartBot_Header,
  Bot_StartBot_Returns,
  Bot_StartBot_Token,
} from './types/bot.d.ts';

/**
 * Bot - Create Client.
 *
 * Creates the Discord client without connecting it, keeping the generated bot
 * straightforward to exercise in unit tests.
 *
 * @returns {Client}
 *
 * @since 0.0.0
 */
export function createClient(): Client {
  return new Client({
    intents: [GatewayIntentBits.Guilds],
  });
}

/**
 * Bot - Render Setup Instructions.
 *
 * Formats first-run guidance when the Discord token is unavailable.
 * Keeps the portal link visible without requesting or exposing the secret.
 *
 * @returns {Bot_RenderSetupInstructions_Returns}
 *
 * @since 0.0.0
 */
export function renderSetupInstructions(): Bot_RenderSetupInstructions_Returns {
  const header: Bot_RenderSetupInstructions_Header = CLIHeader.render([
    '[__WORKSPACE_TITLE__]',
    'Discord bot',
  ], {
    marginBottom: 1,
    width: 64,
  });

  return [
    header,
    '  Setup required',
    '',
    '  1. Create a Discord application and bot:',
    '     https://discord.com/developers/applications',
    '  2. From Installation, add it to a server with the "bot" scope.',
    '  3. Set "DISCORD_TOKEN" in the generated ".env" file.',
    '',
  ].join('\n');
}

/**
 * Bot - Render Status.
 *
 * Formats a consistent terminal status without exposing the Discord token.
 * Keeps connection transitions readable in both development and production.
 *
 * @param {string} state  - State.
 * @param {string} detail - Detail.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
export function renderStatus(state: Bot_RenderStatus_State, detail: Bot_RenderStatus_Detail): Bot_RenderStatus_Returns {
  return [
    `  State: ${state}`,
    `  Account: ${detail}`,
    '',
  ].join('\n');
}

/**
 * Bot - Start Bot.
 *
 * Connects a prepared client after validating the required runtime secret.
 * Reports connection progress while leaving the secret out of every message.
 *
 * @param {string} token - Token.
 *
 * @returns {Promise<Client>}
 *
 * @since 0.0.0
 */
export async function startBot(token: Bot_StartBot_Token): Bot_StartBot_Returns {
  if (token === '') {
    throw new Error('Set DISCORD_TOKEN before starting the bot.');
  }

  const client: Bot_StartBot_Client = createClient();
  const header: Bot_StartBot_Header = CLIHeader.render([
    '[__WORKSPACE_TITLE__]',
    'Discord bot',
  ], {
    marginBottom: 1,
    width: 64,
  });

  process.stdout.write([
    header,
    renderStatus('Connecting', 'Waiting for Discord'),
  ].join('\n'));

  client.once(Events.ClientReady, (readyClient) => {
    process.stdout.write(renderStatus('Ready', readyClient.user.tag));

    return;
  });

  await client.login(token);

  return client;
}
