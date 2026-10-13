import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import { ensureDockerEngine } from '../../lib/docker-engine.mjs';

const originalPath = process.env['PATH'];
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'nova-docker-engine-test-'));
const binaryDirectory = join(temporaryDirectory, 'bin');
const engineStatePath = join(temporaryDirectory, 'engine-state');
const launcherStatePath = join(temporaryDirectory, 'launcher-state');

/**
 * Tests - CLI - Docker Engine - Write Command.
 *
 * Creates an executable command fixture inside the isolated test path.
 *
 * @param {string} name    - Name.
 * @param {string} content - Content.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function writeCommand(name, content) {
  const commandPath = join(binaryDirectory, name);

  await writeFile(commandPath, content, 'utf-8');
  await chmod(commandPath, parseInt('755', 8));

  return;
}

/**
 * Tests - CLI - Docker Engine - Docker Command.
 *
 * Returns a fake Docker CLI that reports engine health through a marker file.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
function dockerCommand() {
  return [
    '#!/usr/bin/env node',
    'const { existsSync } = require(\'node:fs\');',
    'const args = process.argv.slice(2);',
    'if (args[0] === \'--version\') process.exit(0);',
    'if (args[0] === \'context\' && args[1] === \'show\') {',
    '  process.stdout.write(\'default\');',
    '  process.exit(0);',
    '}',
    `if (args[0] === 'info') process.exit(existsSync(${JSON.stringify(engineStatePath)}) ? 0 : 1);`,
    'process.exit(1);',
    '',
  ].join('\n');
}

/**
 * Tests - CLI - Docker Engine - Colima Command.
 *
 * Returns a fake Colima launcher that marks the Docker engine as running.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
function colimaCommand() {
  return [
    '#!/usr/bin/env node',
    'const { writeFileSync } = require(\'node:fs\');',
    'const args = process.argv.slice(2);',
    'if (args[0] === \'--version\') process.exit(0);',
    `if (args[0] === 'start') { writeFileSync(${JSON.stringify(engineStatePath)}, 'running'); writeFileSync(${JSON.stringify(launcherStatePath)}, 'started'); process.exit(0); }`,
    'process.exit(1);',
    '',
  ].join('\n');
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
  beforeEach(async () => {
    await rm(binaryDirectory, {
      force: true,
      recursive: true,
    });
    await rm(engineStatePath, { force: true });
    await rm(launcherStatePath, { force: true });
    await mkdir(binaryDirectory, { recursive: true });
    await symlink(process.execPath, join(binaryDirectory, 'node'));

    Reflect.set(process.env, 'PATH', binaryDirectory);

    return;
  });

  afterEach(() => {
    Reflect.set(process.env, 'PATH', originalPath);

    return;
  });

  afterAll(async () => {
    await rm(temporaryDirectory, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('allows container-only builds to be skipped when Docker is not installed', () => {
    expect(ensureDockerEngine()).toBe(false);

    return;
  });

  it('uses an already-running Docker engine without launching another one', async () => {
    await writeCommand('docker', dockerCommand());
    await writeFile(engineStatePath, 'running', 'utf-8');

    expect(ensureDockerEngine()).toBe(true);

    await expect(readFile(launcherStatePath, 'utf-8')).rejects.toThrow();

    return;
  });

  it('starts an installed local engine before container smoke builds', async () => {
    await writeCommand('docker', dockerCommand());
    await writeCommand('colima', colimaCommand());

    expect(ensureDockerEngine()).toBe(true);

    await expect(readFile(launcherStatePath, 'utf-8')).resolves.toBe('started');

    return;
  });

  return;
});
