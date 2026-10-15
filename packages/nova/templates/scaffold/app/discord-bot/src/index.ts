import {
  renderSetupInstructions,
  startBot,
} from './bot.js';

import type { Index_Token } from './types/index.d.ts';

/**
 * Index - Token.
 *
 * Reads the Discord bot token supplied by the runtime environment.
 * Startup stops immediately when the required secret is unavailable.
 *
 * @since 0.0.0
 */
const token: Index_Token = process.env['DISCORD_TOKEN'] ?? '';

if (token === '') {
  process.stderr.write(renderSetupInstructions());

  process.exitCode = 1;
} else {
  await startBot(token);
}
