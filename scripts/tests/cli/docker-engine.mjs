import {
  execFileSync,
  spawnSync,
} from 'node:child_process';

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { ensureDockerEngine } from '../../lib/docker-engine.mjs';

vi.mock('node:child_process');

let engineRunning = false;
let launcherStarted = false;

/**
 * Tests - CLI - Docker Engine - Spawn Result.
 *
 * Creates the complete result shape returned by spawnSync while keeping each
 * test focused on the status and launch error used by the production probe.
 *
 * @param {number | null} status  - Status.
 * @param {Error}         [error] - Error.
 *
 * @returns {ReturnType<typeof spawnSync>}
 *
 * @since 0.0.0
 */
function spawnResult(status, error) {
  const result = {
    pid: 1,
    output: [
      null,
      '',
      '',
    ],
    signal: null,
    status,
    stderr: '',
    stdout: '',
  };

  if (error === undefined) {
    return result;
  }

  return {
    ...result,
    error,
  };
}

/**
 * Tests - CLI - Docker Engine - Configure Commands.
 *
 * Models installed command-line tools without relying on POSIX executable
 * permissions, shebangs, or symlinks that Windows cannot execute.
 *
 * @param {object}  options                 - Options.
 * @param {boolean} options.colimaInstalled - Colima installed.
 * @param {string}  options.context         - Context.
 * @param {boolean} options.dockerInstalled - Docker installed.
 * @param {boolean} options.running         - Running.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function configureCommands(options) {
  engineRunning = options['running'];
  launcherStarted = false;

  vi.mocked(spawnSync).mockImplementation((command, args = []) => {
    if (command === 'docker' && args[0] === '--version') {
      if (options['dockerInstalled'] === true) {
        return spawnResult(0);
      }

      return spawnResult(null, new Error('docker missing'));
    }

    if (command === 'colima' && args[0] === '--version') {
      if (options['colimaInstalled'] === true) {
        return spawnResult(0);
      }

      return spawnResult(null, new Error('colima missing'));
    }

    if (command === 'colima' && args[0] === 'start') {
      engineRunning = true;
      launcherStarted = true;

      return spawnResult(0);
    }

    return spawnResult(1, new Error(`unexpected command: ${String(command)}`));
  });

  vi.mocked(execFileSync).mockImplementation((command, args = []) => {
    if (command === 'docker' && args[0] === 'context') {
      return options['context'];
    }

    if (
      command === 'docker'
      && args[0] === 'info'
      && engineRunning === true
    ) {
      return '';
    }

    throw new Error(`unavailable command: ${String(command)}`);
  });

  return;
}

/**
 * Tests - CLI - Docker Engine - Docker Engine Startup.
 *
 * Verifies scaffold validation distinguishes an absent Docker installation
 * from an installed engine that can be started for container smoke builds.
 *
 * @since 0.0.0
 */
describe('Docker engine startup', () => {
  afterEach(() => {
    vi.resetAllMocks();
    engineRunning = false;
    launcherStarted = false;

    return;
  });

  it('allows container-only builds to be skipped when Docker is not installed', () => {
    configureCommands({
      colimaInstalled: false,
      context: '',
      dockerInstalled: false,
      running: false,
    });

    expect(ensureDockerEngine()).toBe(false);

    return;
  });

  it('uses an already-running Docker engine without launching another one', () => {
    configureCommands({
      colimaInstalled: false,
      context: 'default',
      dockerInstalled: true,
      running: true,
    });

    expect(ensureDockerEngine()).toBe(true);

    expect(launcherStarted).toBe(false);

    return;
  });

  it('starts an installed local engine before container smoke builds', () => {
    configureCommands({
      colimaInstalled: true,
      context: 'colima',
      dockerInstalled: true,
      running: false,
    });

    expect(ensureDockerEngine()).toBe(true);

    expect(launcherStarted).toBe(true);

    return;
  });

  return;
});
