import { parseArgs } from 'node:util';

import { createJiti } from 'jiti';

/**
 * Nova Transpile - TypeScript Loader.
 *
 * Loads the canonical TypeScript source before Nova's compiled CLI exists.
 * Both filesystem and module caches stay disabled for deterministic builds.
 *
 * @since 0.0.0
 */
const typescriptLoader = createJiti(import.meta.url, {
  fsCache: false,
  interopDefault: false,
  moduleCache: false,
});

/**
 * Nova Transpile - Nova Transpile.
 *
 * Parses repository-only arguments and delegates one-shot and watch behavior
 * to the same pre-build-safe module used by Nova's public CLI.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function novaTranspile() {
  const transpileModule = /** @type {typeof import('../packages/nova/src/lib/transpile.ts')} */ (
    await typescriptLoader.import('../packages/nova/src/lib/transpile.ts')
  );
  const runTranspile = transpileModule['runTranspile'];
  const parsedArgs = parseArgs({
    options: {
      project: {
        type: 'string',
        short: 'p',
      },
      watch: {
        type: 'boolean',
        short: 'w',
      },
    },
    strict: false,
  });
  const values = parsedArgs.values;
  const projectValue = values['project'];
  const project = (typeof projectValue === 'string') ? projectValue : undefined;
  const watch = (values['watch'] === true) ? true : undefined;
  const result = runTranspile({
    project,
    watch,
    printError,
    printInfo,
  });

  if (typeof result === 'number' && result > 0) {
    process.exitCode = result;
  }

  return;
}

/**
 * Nova Transpile - Print Error.
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
 * Nova Transpile - Print Info.
 *
 * Writes a canonical compiler status line to stdout for repository bootstrap runs.
 * Keeping stream selection here leaves the shared emitter output-agnostic.
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

await novaTranspile();
