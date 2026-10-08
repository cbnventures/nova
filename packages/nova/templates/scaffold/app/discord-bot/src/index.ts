import {
  Client,
  Events,
  GatewayIntentBits,
} from 'discord.js';

/**
 * Index - Token.
 *
 * Reads the Discord bot token supplied by the runtime environment.
 * Startup stops immediately when the required secret is unavailable.
 *
 * @since 0.0.0
 */
const token = process.env['DISCORD_TOKEN'];

if (token === undefined || token === '') {
  throw new Error('Set DISCORD_TOKEN before starting the bot.');
}

/**
 * Index - Client.
 *
 * Creates the Discord client with the minimal guild intent for this starter.
 * Consumers can extend the intent list when they add bot capabilities.
 *
 * @since 0.0.0
 */
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  process.stdout.write(`[__WORKSPACE_TITLE__] logged in as ${readyClient.user.tag}.\n`);

  return;
});

await client.login(token);
