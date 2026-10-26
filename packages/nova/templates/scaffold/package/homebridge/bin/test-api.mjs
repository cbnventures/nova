#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  fileURLToPath,
  pathToFileURL,
} from 'node:url';

/**
 * Test API - Root.
 *
 * Resolves the generated plugin root from this stable launcher file.
 * Installed and workspace-linked packages therefore share one path strategy.
 *
 * @since 0.0.0
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Test API - Entry.
 *
 * Resolves the compiled API-test entry point loaded by this launcher.
 * The launcher stays installed even before build output exists.
 *
 * @since 0.0.0
 */
const entry = resolve(root, 'build', 'cli', 'test-api.js');

if (existsSync(entry) === false) {
  process.stderr.write('[__WORKSPACE_PACKAGE_NAME__] has not been built yet. Run "npm run build" first.\n');

  throw new Error('API test build output not found');
}

await import(pathToFileURL(entry).href);
