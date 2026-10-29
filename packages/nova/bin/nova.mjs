#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  fileURLToPath,
  pathToFileURL,
} from 'node:url';

/**
 * Nova - Root.
 *
 * Stores this module-level value in one named location.
 * Related code reuses it instead of duplicating the definition.
 *
 * @since 0.36.0
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Nova - CLI.
 *
 * Stores this module-level value in one named location.
 * Related code reuses it instead of duplicating the definition.
 *
 * @since 0.36.0
 */
const cli = resolve(root, 'build', 'src', 'cli', 'index.js');

if (existsSync(cli) === false) {
  process.stderr.write('Nova CLI has not been built yet. Run "npm run build" first.\n');

  throw new Error('CLI build output not found');
}

await import(pathToFileURL(cli).href);
