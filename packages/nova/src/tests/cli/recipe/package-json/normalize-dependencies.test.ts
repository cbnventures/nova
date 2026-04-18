import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { CliRecipePackageJsonNormalizeDependencies } from '../../../../cli/recipe/package-json/normalize-dependencies.js';

import type {
  TestsCliRecipePackageJsonNormalizeDependenciesRunBundleDependencies,
  TestsCliRecipePackageJsonNormalizeDependenciesRunIncludesChalk,
  TestsCliRecipePackageJsonNormalizeDependenciesRunIncludesLodash,
  TestsCliRecipePackageJsonNormalizeDependenciesRunIsBundleDepsArray,
  TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigContents,
  TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigPath,
  TestsCliRecipePackageJsonNormalizeDependenciesRunOriginalCwd,
  TestsCliRecipePackageJsonNormalizeDependenciesRunOutput,
  TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonContents,
  TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonPath,
  TestsCliRecipePackageJsonNormalizeDependenciesRunParsed,
  TestsCliRecipePackageJsonNormalizeDependenciesRunProjectDirectory,
  TestsCliRecipePackageJsonNormalizeDependenciesRunSandboxPath,
  TestsCliRecipePackageJsonNormalizeDependenciesRunSandboxRoot,
  TestsCliRecipePackageJsonNormalizeDependenciesRunTemporaryDirectory,
  TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspaceDirectory,
  TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonContents,
  TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/normalize-dependencies.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Normalize Dependencies - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonNormalizeDependencies.run', async () => {
  const originalCwd: TestsCliRecipePackageJsonNormalizeDependenciesRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunTemporaryDirectory = tmpdir();
  const sandboxPath: TestsCliRecipePackageJsonNormalizeDependenciesRunSandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliRecipePackageJsonNormalizeDependenciesRunSandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      dependencies: {},
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The empty dependencies should still be there because the recipe is not enabled.
    const output: TestsCliRecipePackageJsonNormalizeDependenciesRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeDependenciesRunParsed = JSON.parse(output);

    strictEqual(typeof parsed['dependencies'], 'object');

    return;
  });

  it('removes empty dependency fields', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunProjectDirectory = join(sandboxRoot, 'remove-empty');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonContents = JSON.stringify({
      name: 'test-remove-empty',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-dependencies': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
      optionalDependencies: {},
      overrides: {},
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeDependenciesRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeDependenciesRunParsed = JSON.parse(output);

    strictEqual(parsed['dependencies'], undefined);
    strictEqual(parsed['devDependencies'], undefined);
    strictEqual(parsed['peerDependencies'], undefined);
    strictEqual(parsed['optionalDependencies'], undefined);
    strictEqual(parsed['overrides'], undefined);

    return;
  });

  it('merges bundledDependencies into bundleDependencies', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunProjectDirectory = join(sandboxRoot, 'merge-bundled');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonContents = JSON.stringify({
      name: 'test-merge-bundled',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-dependencies': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      dependencies: {
        lodash: '4.17.21',
      },
      bundleDependencies: ['lodash'],
      bundledDependencies: ['chalk'],
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeDependenciesRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeDependenciesRunParsed = JSON.parse(output);

    strictEqual(parsed['bundledDependencies'], undefined);
    const isBundleDepsArray: TestsCliRecipePackageJsonNormalizeDependenciesRunIsBundleDepsArray = Array.isArray(parsed['bundleDependencies']);
    const bundleDependencies: TestsCliRecipePackageJsonNormalizeDependenciesRunBundleDependencies = parsed['bundleDependencies'] as TestsCliRecipePackageJsonNormalizeDependenciesRunBundleDependencies;
    const includesLodash: TestsCliRecipePackageJsonNormalizeDependenciesRunIncludesLodash = bundleDependencies.includes('lodash');
    const includesChalk: TestsCliRecipePackageJsonNormalizeDependenciesRunIncludesChalk = bundleDependencies.includes('chalk');

    strictEqual(isBundleDepsArray, true);
    strictEqual(includesLodash, true);
    strictEqual(includesChalk, true);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeDependenciesRunPackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeDependenciesRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-dependencies': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeDependenciesRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      dependencies: {},
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: TestsCliRecipePackageJsonNormalizeDependenciesRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeDependenciesRunParsed = JSON.parse(output);

    strictEqual(typeof parsed['dependencies'], 'object');

    return;
  });

  return;
});
