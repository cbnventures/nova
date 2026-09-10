import { parseArgs } from 'node:util';

import { createJiti } from 'jiti';

/**
 * Nova Run Scripts - TypeScript Loader.
 *
 * Loads the canonical TypeScript source before Nova's compiled CLI exists.
 * Both filesystem and module caches stay disabled for deterministic runs.
 *
 * @since UNRELEASED
 */
const typescriptLoader = createJiti(import.meta.url, {
  fsCache: false,
  interopDefault: false,
  moduleCache: false,
});

/**
 * Nova Run Scripts - Nova Run Scripts.
 *
 * Parses repository-only arguments and delegates every script-running behavior
 * to the same pre-build-safe implementation used by Nova's public CLI.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function novaRunScripts() {
  const runScriptsModule = /** @type {typeof import('../packages/nova/src/lib/run-scripts.ts')} */ (
    await typescriptLoader.import('../packages/nova/src/lib/run-scripts.ts')
  );
  const runScriptsRunner = runScriptsModule['Runner'];
  const parsedArgs = parseArgs({
    allowPositionals: true,
    options: {
      buffer: {
        type: 'string',
        short: 'b',
      },
      parallel: {
        type: 'boolean',
        short: 'p',
      },
      sequential: {
        type: 'boolean',
        short: 's',
      },
    },
    strict: false,
  });
  const positionals = parsedArgs.positionals;
  const values = parsedArgs.values;
  const bufferValue = values['buffer'];
  const pattern = positionals[0];
  const buffer = (typeof bufferValue === 'string') ? bufferValue : undefined;
  const parallel = (values['parallel'] === true) ? true : undefined;
  const sequential = (values['sequential'] === true) ? true : undefined;
  const exitCode = await runScriptsRunner.run({
    buffer,
    parallel,
    pattern,
    printError,
    printInfo,
    printWarn,
    sequential,
    writeStderr,
    writeStdout,
  });

  if (exitCode > 0) {
    process.exitCode = exitCode;
  }

  return;
}

/**
 * Nova Run Scripts - Print Error.
 *
 * Writes a canonical fatal diagnostic to stderr for repository bootstrap runs.
 * The public CLI supplies its own Logger adapter to the shared implementation.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function printError(message) {
  process.stderr.write(`${message}\n`);

  return;
}

/**
 * Nova Run Scripts - Print Info.
 *
 * Writes a canonical status line to stdout for repository bootstrap runs.
 * Keeping presentation here leaves the shared runner output-agnostic.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function printInfo(message) {
  process.stdout.write(`${message}\n`);

  return;
}

/**
 * Nova Run Scripts - Print Warn.
 *
 * Writes a canonical non-fatal diagnostic to stderr for bootstrap runs.
 * The shared runner only decides severity, not terminal presentation.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function printWarn(message) {
  process.stderr.write(`${message}\n`);

  return;
}

/**
 * Nova Run Scripts - Write Stderr.
 *
 * Writes formatted child-process output directly to standard error.
 * Keeping raw stream access here preserves the core's bootstrap independence.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function writeStderr(message) {
  process.stderr.write(message);

  return;
}

/**
 * Nova Run Scripts - Write Stdout.
 *
 * Writes formatted child-process output directly to standard output.
 * Keeping raw stream access here preserves the core's bootstrap independence.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function writeStdout(message) {
  process.stdout.write(message);

  return;
}

await novaRunScripts();
