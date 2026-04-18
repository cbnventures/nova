import { deepStrictEqual, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { detectMonorepoContext } from '../../lib/scaffold.js';

import type {
  TestsLibScaffoldDetectMonorepoContextOriginalCwd,
  TestsLibScaffoldDetectMonorepoContextPackageContents,
  TestsLibScaffoldDetectMonorepoContextPackageJson,
  TestsLibScaffoldDetectMonorepoContextPackageJsonPath,
  TestsLibScaffoldDetectMonorepoContextProjectDirectory,
  TestsLibScaffoldDetectMonorepoContextResolvedDirectory,
  TestsLibScaffoldDetectMonorepoContextResult,
  TestsLibScaffoldDetectMonorepoContextSandboxRoot,
  TestsLibScaffoldDetectMonorepoContextTemporaryDirectory,
  TestsLibScaffoldDetectMonorepoContextTemporaryPrefix,
} from '../../types/tests/lib/scaffold.test.d.ts';

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context.
 *
 * @since 0.15.0
 */
describe('detectMonorepoContext', async () => {
  const originalCwd: TestsLibScaffoldDetectMonorepoContextOriginalCwd = process.cwd();
  const temporaryDirectory: TestsLibScaffoldDetectMonorepoContextTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsLibScaffoldDetectMonorepoContextTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibScaffoldDetectMonorepoContextSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('detects monorepo mode in empty directory', async () => {
    const projectDirectory: TestsLibScaffoldDetectMonorepoContextProjectDirectory = join(sandboxRoot, 'empty-dir');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    const resolvedDirectory: TestsLibScaffoldDetectMonorepoContextResolvedDirectory = process.cwd();

    const result: TestsLibScaffoldDetectMonorepoContextResult = await detectMonorepoContext(resolvedDirectory);

    deepStrictEqual(result, { context: 'monorepo' });

    return;
  });

  it('detects workspace mode at monorepo root', async () => {
    const projectDirectory: TestsLibScaffoldDetectMonorepoContextProjectDirectory = join(sandboxRoot, 'monorepo-root');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsLibScaffoldDetectMonorepoContextPackageJson = JSON.stringify({
      name: 'test-project',
      workspaces: [
        'apps/*',
        'packages/*',
      ],
    }, null, 2);
    const packageContents: TestsLibScaffoldDetectMonorepoContextPackageContents = `${packageJson}\n`;

    const packageJsonPath: TestsLibScaffoldDetectMonorepoContextPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, packageContents, 'utf-8');

    process.chdir(projectDirectory);

    const resolvedDirectory: TestsLibScaffoldDetectMonorepoContextResolvedDirectory = process.cwd();

    const result: TestsLibScaffoldDetectMonorepoContextResult = await detectMonorepoContext(resolvedDirectory);

    strictEqual(result['context'], 'workspace');

    return;
  });

  it('detects standalone project', async () => {
    const projectDirectory: TestsLibScaffoldDetectMonorepoContextProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsLibScaffoldDetectMonorepoContextPackageJson = JSON.stringify({
      name: 'standalone-project',
    }, null, 2);
    const packageContents: TestsLibScaffoldDetectMonorepoContextPackageContents = `${packageJson}\n`;

    const packageJsonPath: TestsLibScaffoldDetectMonorepoContextPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, packageContents, 'utf-8');

    process.chdir(projectDirectory);

    const resolvedDirectory: TestsLibScaffoldDetectMonorepoContextResolvedDirectory = process.cwd();

    const result: TestsLibScaffoldDetectMonorepoContextResult = await detectMonorepoContext(resolvedDirectory);

    deepStrictEqual(result, { context: 'standalone' });

    return;
  });

  return;
});
