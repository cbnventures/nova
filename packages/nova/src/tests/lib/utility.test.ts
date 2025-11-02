import * as assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import {
  before,
  after,
  describe,
  it,
} from 'node:test';

import { discoverPathsWithFile } from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';
import type { DiscoverPathsWithFileOriginalCwd, DiscoverPathsWithFileSandboxRoot } from '@/types/tests/lib/utility.test.d.ts';

/**
 * Discover paths with file.
 *
 * @since 1.0.0
 */
describe('discoverPathsWithFile', (context) => {
  let originalCwd: DiscoverPathsWithFileOriginalCwd;
  let sandboxRoot: DiscoverPathsWithFileSandboxRoot;

  before(async () => {
    originalCwd = process.cwd();
    sandboxRoot = await fs.mkdtemp(path.join(os.tmpdir(), `nova-${context.name}-`));
  });

  after(async () => {
    // Reset the directory back to the current working directory.
    process.chdir(originalCwd);

    await fs.rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  it('finds every package.json when traversing forward', async () => {
    const projectRoot = path.join(sandboxRoot, 'forward');
    const appRoot = path.join(projectRoot, 'apps', 'some-app');
    const packageRoot = path.join(projectRoot, 'packages', 'some-package');
    const nodeRoot = path.join(projectRoot, 'node_modules', 'ignore-me');
    const dotHiddenRoot = path.join(projectRoot, '.hidden', 'ignore-me');

    // Create directories inside the project root.
    await Promise.all([
      fs.mkdir(appRoot, { recursive: true }),
      fs.mkdir(packageRoot, { recursive: true }),
      fs.mkdir(nodeRoot, { recursive: true }),
      fs.mkdir(dotHiddenRoot, { recursive: true }),
    ]);

    // Seed empty "package.json" files in all testing directories.
    await Promise.all([
      fs.writeFile(path.join(projectRoot, 'package.json'), '{}\n'),
      fs.writeFile(path.join(appRoot, 'package.json'), '{}\n'),
      fs.writeFile(path.join(packageRoot, 'package.json'), '{}\n'),
      fs.writeFile(path.join(nodeRoot, 'package.json'), '{}\n'),
      fs.writeFile(path.join(dotHiddenRoot, 'package.json'), '{}\n'),
    ]);

    // Resolve canonical directories now so symlink aliases do not break tests (because "path.join" skipped filesystem lookups).
    const realProjectRoot = await fs.realpath(projectRoot);

    // Change the current directory to the project root.
    process.chdir(realProjectRoot);

    const absolutePaths = await discoverPathsWithFile('package.json', 'forward');
    const relativePaths = absolutePaths.map((absolutePath) => path.relative(realProjectRoot, absolutePath).split(path.sep).join('/'));

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'forward-absolutePaths',
    }).debug(absolutePaths);

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'forward-relativePaths',
    }).debug(relativePaths);

    assert.deepStrictEqual(relativePaths, ['', 'apps/some-app', 'packages/some-package']);
  });

  it('climbs to parent package.json files when traversing backward', async () => {
    const projectRoot = path.join(sandboxRoot, 'backward');
    const appRoot = path.join(projectRoot, 'apps', 'some-app');
    const appStuffRoot = path.join(appRoot, 'stuff');

    // Create directories inside the project root.
    await fs.mkdir(appStuffRoot, { recursive: true });

    // Seed empty "package.json" files in all testing directories.
    await Promise.all([
      fs.writeFile(path.join(projectRoot, 'package.json'), '{}\n'),
      fs.writeFile(path.join(appRoot, 'package.json'), '{}\n'),
    ]);

    // Resolve canonical directories now so symlink aliases do not break tests (because "path.join" skipped filesystem lookups).
    const realProjectRoot = await fs.realpath(projectRoot);
    const realAppStuffRoot = await fs.realpath(appStuffRoot);

    // Change the current directory to a "stuff" folder inside "some-app".
    process.chdir(realAppStuffRoot);

    const absolutePaths = await discoverPathsWithFile('package.json', 'backward');
    const relativePaths = absolutePaths.map((absolutePath) => path.relative(realProjectRoot, absolutePath).split(path.sep).join('/'));

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'backward-absolutePaths',
    }).debug(absolutePaths);

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'backward-relativePaths',
    }).debug(relativePaths);

    assert.deepStrictEqual(relativePaths, ['apps/some-app', '']);
  });
});
