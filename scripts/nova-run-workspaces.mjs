import { parseArgs } from 'node:util';

import { createJiti } from 'jiti';

/**
 * Nova Run Workspaces - TypeScript Loader.
 *
 * Loads the canonical TypeScript source before Nova's compiled CLI exists.
 * Both filesystem and module caches stay disabled for deterministic runs.
 *
 * @since 0.0.0
 */
const typescriptLoader = createJiti(import.meta.url, {
  fsCache: false,
  interopDefault: false,
  moduleCache: false,
});

/**
 * Nova Run Workspaces - Nova Run Workspaces.
 *
 * Parses repository-only arguments and delegates workspace scheduling to the
 * same pre-build-safe implementation used by Nova's public CLI.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function novaRunWorkspaces() {
  const runWorkspacesModule = /** @type {typeof import('../packages/nova/src/lib/run-workspaces.ts')} */ (
    await typescriptLoader.import('../packages/nova/src/lib/run-workspaces.ts')
  );
  const runWorkspacesRunner = runWorkspacesModule['Runner'];
  const parsedArgs = parseArgs({
    allowPositionals: true,
    options: {
      'buffer': {
        type: 'string',
        short: 'b',
      },
      'concurrency': {
        type: 'string',
        short: 'c',
      },
      'continue-on-error': {
        type: 'boolean',
        short: 'k',
      },
      'dry-run': {
        type: 'boolean',
        short: 'd',
      },
      'exclude-workspace': {
        type: 'string',
        short: 'x',
        multiple: true,
      },
      'force': {
        type: 'boolean',
        short: 'f',
      },
      'node-env': {
        type: 'string',
        short: 'n',
      },
      'workspace': {
        type: 'string',
        short: 'w',
        multiple: true,
      },
    },
    strict: true,
  });
  const positionals = parsedArgs.positionals;
  const values = parsedArgs.values;
  const task = positionals[0];
  const scriptArgs = positionals.slice(1);
  const bufferValue = values['buffer'];
  const concurrencyValue = values['concurrency'];
  const nodeEnvValue = values['node-env'];
  const buffer = (typeof bufferValue === 'string') ? bufferValue : undefined;
  const concurrency = (typeof concurrencyValue === 'string') ? concurrencyValue : undefined;
  const continueOnError = (values['continue-on-error'] === true) ? true : undefined;
  const dryRun = (values['dry-run'] === true) ? true : undefined;
  const excludeWorkspace = values['exclude-workspace'];
  const force = (values['force'] === true) ? true : undefined;
  const nodeEnv = (typeof nodeEnvValue === 'string') ? nodeEnvValue : undefined;
  const workspace = values['workspace'];
  const exitCode = await runWorkspacesRunner.run({
    buffer,
    concurrency,
    continueOnError,
    dryRun,
    excludeWorkspace,
    force,
    nodeEnv,
    scriptArgs,
    task,
    workspace,
    printError,
    printInfo,
    printWarn,
    writeStderr,
    writeStdout,
  });

  if (exitCode > 0) {
    process.exitCode = exitCode;
  }

  return;
}

/**
 * Nova Run Workspaces - Print Error.
 *
 * Writes a fatal workspace-runner diagnostic to stderr for bootstrap runs.
 * The shared runner remains independent of repository presentation details.
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
 * Nova Run Workspaces - Print Info.
 *
 * Writes workspace-runner status to stdout for bootstrap runs.
 * The shared runner remains independent of repository presentation details.
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

/**
 * Nova Run Workspaces - Print Warn.
 *
 * Writes a non-fatal workspace-runner diagnostic to stderr for bootstrap runs.
 * The shared runner remains independent of repository presentation details.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function printWarn(message) {
  process.stderr.write(`${message}\n`);

  return;
}

/**
 * Nova Run Workspaces - Write Stderr.
 *
 * Writes formatted child-process output directly to standard error.
 * Direct access preserves the original stream chosen by each workspace task.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function writeStderr(message) {
  process.stderr.write(message);

  return;
}

/**
 * Nova Run Workspaces - Write Stdout.
 *
 * Writes formatted child-process output directly to standard output.
 * Direct access preserves the original stream chosen by each workspace task.
 *
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function writeStdout(message) {
  process.stdout.write(message);

  return;
}

await novaRunWorkspaces();
