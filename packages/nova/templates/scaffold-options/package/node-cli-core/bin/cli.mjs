#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  fileURLToPath,
  pathToFileURL,
} from 'node:url';

/**
 * CLI - Root.
 *
 * Resolves the generated package root from this stable launcher file.
 * Installed and workspace-linked packages therefore share one path strategy.
 *
 * @since 0.0.0
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * CLI - CLI.
 *
 * Resolves the compiled command-line entry point loaded by this launcher.
 * The stable launcher remains available before the build output exists.
 *
 * @since 0.0.0
 */
const cli = resolve(root, 'build', 'index.js');

if (existsSync(cli) === false) {
  process.stderr.write('[__WORKSPACE_NAME__] has not been built yet. Run "npm run build" first.\n');

  throw new Error('CLI build output not found');
}

await import(pathToFileURL(cli).href);
