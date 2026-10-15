import { createApp } from './app.js';

import type {
  Index_ConfiguredPort,
  Index_Port,
  Index_RawPort,
} from './types/index.d.ts';

/**
 * Index - App.
 *
 * Starts the generated Express application.
 * Prints copyable discovery and health URLs after the listener is ready.
 *
 * @since 0.0.0
 */
const app = createApp();

/**
 * Index - Configured Port.
 *
 * Reads the optional environment value before applying the scaffold default.
 * Empty generated values remain equivalent to an unset deployment override.
 *
 * @since 0.0.0
 */
const configuredPort: Index_ConfiguredPort = process.env['PORT'];

/**
 * Index - Raw Port.
 *
 * Reads a deployment-provided PORT value and otherwise selects port 3000.
 * The parsed value is validated before the server begins listening.
 *
 * @since 0.0.0
 */
const rawPort: Index_RawPort = (configuredPort === undefined || configuredPort === '') ? '3000' : configuredPort;

/**
 * Index - Port.
 *
 * Parses the selected listening port for Express.
 * Invalid numbers fail before the application reports a ready state.
 *
 * @since 0.0.0
 */
const port: Index_Port = Number.parseInt(rawPort, 10);

if (
  Number.isInteger(port) === false
  || port < 1
  || port > 65_535
) {
  throw new Error(`PORT must be an integer from 1 through 65535; received "${rawPort}".`);
}

app.listen(port, (error) => {
  if (error !== undefined) {
    throw error;
  }

  process.stdout.write([
    '[__WORKSPACE_TITLE__]',
    '  State: Ready',
    `  API: http://localhost:${port}`,
    `  Health: http://localhost:${port}/health`,
    '',
  ].join('\n'));

  return;
});
