#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Repl - Root.
 *
 * Resolves the generated plugin root from this stable launcher file.
 * Installed and workspace-linked packages therefore share one path strategy.
 *
 * @since 0.0.0
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Repl - Entry.
 *
 * Resolves the compiled REPL entry point loaded by this launcher.
 * The launcher stays installed even before build output exists.
 *
 * @since 0.0.0
 */
const entry = resolve(root, 'build', 'cli', 'repl.js');

if (existsSync(entry) === false) {
  process.stderr.write('[__WORKSPACE_PACKAGE_NAME__] has not been built yet. Run "npm run build" first.\n');

  throw new Error('REPL build output not found');
}

await import(entry);
