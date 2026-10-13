import {
  execFileSync,
  spawnSync,
} from 'node:child_process';
import { existsSync } from 'node:fs';

/**
 * Lib - Docker Engine - Docker Engine Poll Interval.
 *
 * Spaces repeated Docker API readiness probes without busy-waiting during
 * local engine startup.
 *
 * @since 0.0.0
 */
const dockerEnginePollInterval = 1000;

/**
 * Lib - Docker Engine - Docker Engine Launcher Timeout.
 *
 * Gives first-time local VM creation enough time to download, provision, and
 * boot without allowing a broken launcher to block validation indefinitely.
 *
 * @since 0.0.0
 */
const dockerEngineLauncherTimeout = 600000;

/**
 * Lib - Docker Engine - Docker Engine Start Timeout.
 *
 * Bounds both the launcher process and the following Docker API readiness
 * probes so scaffold validation cannot wait forever.
 *
 * @since 0.0.0
 */
const dockerEngineStartTimeout = 180000;

/**
 * Lib - Docker Engine - Command Exists.
 *
 * Checks whether an executable can be launched without relying on a
 * platform-specific path lookup command.
 *
 * @param {string} command - Command.
 *
 * @returns {boolean}
 *
 * @since 0.0.0
 */
function commandExists(command) {
  const result = spawnSync(command, ['--version'], {
    stdio: 'ignore',
  });

  return result.error === undefined;
}

/**
 * Lib - Docker Engine - Current Context.
 *
 * Reads the selected Docker context so its matching local engine receives the
 * first startup attempt.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
function currentContext() {
  try {
    return execFileSync('docker', [
      'context',
      'show',
    ], {
      encoding: 'utf-8',
    }).trim();
  } catch {
    return '';
  }
}

/**
 * Lib - Docker Engine - Has Docker Engine.
 *
 * Reports whether the Docker CLI can reach its selected engine and request its
 * server version successfully.
 *
 * @returns {boolean}
 *
 * @since 0.0.0
 */
function hasDockerEngine() {
  try {
    execFileSync('docker', [
      'info',
      '--format',
      '{{.ServerVersion}}',
    ], {
      stdio: 'ignore',
    });

    return true;
  } catch {
    return false;
  }
}

/**
 * Lib - Docker Engine - Pause.
 *
 * Waits synchronously between engine probes while keeping the scaffold runner
 * itself synchronous.
 *
 * @param {number} duration - Duration.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function pause(duration) {
  const waitBuffer = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));

  Atomics.wait(waitBuffer, 0, 0, duration);

  return;
}

/**
 * Lib - Docker Engine - Wait For Docker Engine.
 *
 * Polls the Docker API until the selected engine is ready or the startup
 * deadline expires.
 *
 * @returns {boolean}
 *
 * @since 0.0.0
 */
function waitForDockerEngine() {
  const deadline = Date.now() + dockerEngineStartTimeout;

  while (Date.now() < deadline) {
    if (hasDockerEngine() === true) {
      return true;
    }

    pause(dockerEnginePollInterval);
  }

  return false;
}

/**
 * Lib - Docker Engine - Start Docker Engine.
 *
 * Runs one installed engine launcher and waits for its Docker API to become
 * reachable before returning.
 *
 * @param {string}   label   - Label.
 * @param {string}   command - Command.
 * @param {string[]} args    - Args.
 *
 * @returns {boolean}
 *
 * @since 0.0.0
 */
function startDockerEngine(label, command, args) {
  process.stdout.write(`Docker is installed but its engine is stopped; starting ${label}...\n`);

  const result = spawnSync(command, args, {
    stdio: 'inherit',
    timeout: dockerEngineLauncherTimeout,
  });

  if (result.status !== 0) {
    return false;
  }

  return waitForDockerEngine();
}

/**
 * Lib - Docker Engine - Ensure Docker Engine.
 *
 * Uses an already-running Docker engine or starts an installed local engine. A
 * machine without the Docker CLI may skip container-only smoke builds, while
 * an installed but unusable Docker setup fails validation.
 *
 * @returns {boolean}
 *
 * @since 0.0.0
 */
export function ensureDockerEngine() {
  if (commandExists('docker') === false) {
    return false;
  }

  if (hasDockerEngine() === true) {
    return true;
  }

  const context = currentContext();

  if (
    context === 'colima'
    && commandExists('colima') === true
    && startDockerEngine('Colima', 'colima', ['start']) === true
  ) {
    return true;
  }

  if (
    context === 'orbstack'
    && commandExists('orbctl') === true
    && startDockerEngine('OrbStack', 'orbctl', ['start']) === true
  ) {
    return true;
  }

  if (
    context === 'rancher-desktop'
    && commandExists('rdctl') === true
    && startDockerEngine('Rancher Desktop', 'rdctl', ['start']) === true
  ) {
    return true;
  }

  if (
    process.platform === 'darwin'
    && existsSync('/Applications/Docker.app') === true
    && startDockerEngine('Docker Desktop', 'open', [
      '-a',
      'Docker',
    ]) === true
  ) {
    return true;
  }

  if (
    context !== 'colima'
    && commandExists('colima') === true
    && startDockerEngine('Colima', 'colima', ['start']) === true
  ) {
    return true;
  }

  if (
    context !== 'orbstack'
    && commandExists('orbctl') === true
    && startDockerEngine('OrbStack', 'orbctl', ['start']) === true
  ) {
    return true;
  }

  if (
    context !== 'rancher-desktop'
    && commandExists('rdctl') === true
    && startDockerEngine('Rancher Desktop', 'rdctl', ['start']) === true
  ) {
    return true;
  }

  throw new Error([
    'Docker is installed, but Nova could not start or reach a local Docker engine.',
    'Start the engine configured for the current Docker context, then rerun "npm run check:scaffolds".',
  ].join('\n'));
}
