import { parseArgs } from 'node:util';

import { createJiti } from 'jiti';

/**
 * Nova Type Check - TypeScript Loader.
 *
 * Loads the canonical TypeScript source before Nova's compiled CLI exists.
 * Both filesystem and module caches stay disabled for deterministic checks.
 *
 * @since 0.0.0
 */
const typescriptLoader = createJiti(import.meta.url, {
  fsCache: false,
  interopDefault: false,
  moduleCache: false,
});

/**
 * Nova Type Check - Nova Type Check.
 *
 * Parses the repository-only command arguments and delegates all TypeScript
 * project behavior to the same pre-build-safe module used by Nova's public CLI.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function novaTypeCheck() {
  const typeCheckModule = /** @type {typeof import('../packages/nova/src/lib/type-check.ts')} */ (
    await typescriptLoader.import('../packages/nova/src/lib/type-check.ts')
  );
  const runTypeCheck = typeCheckModule['runTypeCheck'];
  const parsedArgs = parseArgs({
    options: {
      project: {
        type: 'string',
        short: 'p',
      },
    },
    strict: false,
  });
  const values = parsedArgs.values;
  const projectValue = values['project'];
  const project = (typeof projectValue === 'string') ? projectValue : undefined;
  const exitCode = runTypeCheck({
    project,
    printError,
    printInfo,
  });

  if (exitCode > 0) {
    process.exitCode = exitCode;
  }

  return;
}

/**
 * Nova Type Check - Print Error.
 *
 * Writes a canonical diagnostic line to stderr for repository bootstrap runs.
 * The public CLI supplies its own Logger adapter to the shared implementation.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function printError(message) {
  process.stderr.write(`${message}\n`);

  return;
}

/**
 * Nova Type Check - Print Info.
 *
 * Writes a canonical summary line to stdout for repository bootstrap runs.
 * Keeping stream selection here leaves the shared checker output-agnostic.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function printInfo(message) {
  process.stdout.write(`${message}\n`);

  return;
}

await novaTypeCheck();
