import { GatewayIntentBits } from 'discord.js';
import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  createClient,
  renderStatus,
  startBot,
} from './bot.js';

import type { Bot_DiscordClient_UsesTheStarterGuildIntent_Client } from './types/bot.test.d.ts';

/**
 * Bot - Discord Client.
 *
 * Confirms the starter can be exercised without opening a Discord connection.
 * Keeps routine tests offline while preserving the production login path.
 *
 * @since 0.0.0
 */
describe('Discord client', () => {
  it('uses the starter guild intent', () => {
    const client: Bot_DiscordClient_UsesTheStarterGuildIntent_Client = createClient();

    expect(client.options.intents.has(GatewayIntentBits.Guilds)).toBe(true);

    return;
  });

  it('renders connection state without secrets', () => {
    expect(renderStatus('Ready', 'nova-bot')).toContain('State: Ready');

    expect(renderStatus('Ready', 'nova-bot')).toContain('Account: nova-bot');

    return;
  });

  it('rejects a missing token before connecting', async () => {
    await expect(startBot('')).rejects.toThrow('Set DISCORD_TOKEN');

    return;
  });

  return;
});
