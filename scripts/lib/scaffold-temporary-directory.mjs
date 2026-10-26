import {
  mkdtempSync,
  realpathSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * Lib - Scaffold Temporary Directory - Create Scaffold Temporary Directory.
 *
 * Creates the scaffold smoke root and immediately resolves its canonical path.
 * This keeps Windows TEMP aliases and resolved build inputs on one spelling so
 * relative-path calculations cannot escape the generated project root.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
export function createScaffoldTemporaryDirectory() {
  const directory = mkdtempSync(join(tmpdir(), 'nova-scaffold-smoke-'));

  return realpathSync.native(directory);
}

/**
 * Lib - Scaffold Temporary Directory - Remove Scaffold Temporary Directory.
 *
 * Removes a scaffold smoke root with the retry behavior Node reserves for
 * transient recursive-removal failures such as Windows EPERM file locks.
 *
 * @param {string} directory - Directory.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
export function removeScaffoldTemporaryDirectory(directory) {
  rmSync(directory, {
    force: true,
    maxRetries: 5,
    recursive: true,
    retryDelay: 100,
  });

  return;
}
