import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  expect,
  it,
} from 'vitest';

import { verifyBundlerLoad } from '../../lib/verify-scaffold-install.mjs';

const temporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-scaffold-install-test-'));

/**
 * Tests - CLI - Verify Scaffold Install - Create Installed Project.
 *
 * Creates local package stand-ins so the probe can exercise module resolution
 * and native-binding failures without an npm install or registry access.
 *
 * @param {string} projectName  - Project name.
 * @param {string} rollupSource - Rollup source.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
function createInstalledProject(projectName, rollupSource) {
  const projectDirectory = join(temporaryDirectory, projectName);
  const workspaceDirectory = join(projectDirectory, 'apps', 'test');
  const viteDirectory = join(projectDirectory, 'node_modules', 'vite');
  const vitestDirectory = join(projectDirectory, 'node_modules', 'vitest');
  const rollupDirectory = join(projectDirectory, 'node_modules', 'rollup');

  for (const directory of [
    workspaceDirectory,
    viteDirectory,
    vitestDirectory,
    rollupDirectory,
  ]) {
    mkdirSync(directory, { recursive: true });
  }

  writeFileSync(join(workspaceDirectory, 'package.json'), '{}\n');
  writeFileSync(join(viteDirectory, 'package.json'), '{"name":"vite","main":"index.js"}\n');
  writeFileSync(join(viteDirectory, 'index.js'), 'module.exports = {};\n');
  writeFileSync(join(vitestDirectory, 'package.json'), '{"name":"vitest","main":"index.js"}\n');
  writeFileSync(join(vitestDirectory, 'index.js'), 'module.exports = {};\n');
  writeFileSync(join(rollupDirectory, 'package.json'), '{"name":"rollup","main":"index.js"}\n');
  writeFileSync(join(rollupDirectory, 'index.js'), rollupSource);

  return projectDirectory;
}

/**
 * Tests - CLI - Verify Scaffold Install - Scaffold Install Bundler Preflight.
 *
 * Verifies the generated-project preflight reports npm's incomplete optional
 * installs separately from ordinary bundler or scaffold failures.
 *
 * @since 0.0.0
 */
describe('Scaffold install bundler preflight', () => {
  afterAll(() => {
    rmSync(temporaryDirectory, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('loads Rollup from both Vite and Vitest workspaces', () => {
    const projectDirectory = createInstalledProject('working', 'module.exports = {};\n');

    expect(() => verifyBundlerLoad(projectDirectory, 'apps/test', 'vite')).not.toThrow();

    expect(() => verifyBundlerLoad(projectDirectory, 'apps/test', 'vitest')).not.toThrow();

    return;
  });

  it('identifies a missing native Rollup package after npm succeeds', () => {
    const projectDirectory = createInstalledProject(
      'missing-native',
      'require(\'@rollup/rollup-darwin-arm64\');\n',
    );

    expect(() => verifyBundlerLoad(projectDirectory, 'apps/test', 'vitest'))
      .toThrow('has an incomplete npm install: Rollup\'s native package is missing.');

    return;
  });

  it('does not mislabel another bundler failure as an incomplete install', () => {
    const projectDirectory = createInstalledProject(
      'other-failure',
      'throw new Error(\'Unexpected bundler failure\');\n',
    );

    expect(() => verifyBundlerLoad(projectDirectory, 'apps/test', 'vite'))
      .toThrow('could not load its "vite" bundler after npm install.');

    return;
  });

  return;
});
