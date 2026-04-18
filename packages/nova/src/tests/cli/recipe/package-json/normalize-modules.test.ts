import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
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

import { CliRecipePackageJsonNormalizeModules } from '../../../../cli/recipe/package-json/normalize-modules.js';

import type {
  TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigContents,
  TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigPath,
  TestsCliRecipePackageJsonNormalizeModulesRunOriginalCwd,
  TestsCliRecipePackageJsonNormalizeModulesRunOutput,
  TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonContents,
  TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonPath,
  TestsCliRecipePackageJsonNormalizeModulesRunParsed,
  TestsCliRecipePackageJsonNormalizeModulesRunProjectDirectory,
  TestsCliRecipePackageJsonNormalizeModulesRunSandboxPath,
  TestsCliRecipePackageJsonNormalizeModulesRunSandboxRoot,
  TestsCliRecipePackageJsonNormalizeModulesRunTemporaryDirectory,
  TestsCliRecipePackageJsonNormalizeModulesRunWorkspaceDirectory,
  TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonContents,
  TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/normalize-modules.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Normalize Modules - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonNormalizeModules.run', async () => {
  const originalCwd: TestsCliRecipePackageJsonNormalizeModulesRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliRecipePackageJsonNormalizeModulesRunTemporaryDirectory = tmpdir();
  const sandboxPath: TestsCliRecipePackageJsonNormalizeModulesRunSandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliRecipePackageJsonNormalizeModulesRunSandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeModulesRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeModulesRunProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeModulesRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      exports: './build/index.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The exports should not have been normalized because the recipe is not enabled.
    const output: TestsCliRecipePackageJsonNormalizeModulesRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeModulesRunParsed = JSON.parse(output);

    strictEqual(parsed['exports'], './build/index.js');

    return;
  });

  it('normalizes string exports to object for package role', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeModulesRunProjectDirectory = join(sandboxRoot, 'normalize-exports');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeModulesRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonContents = JSON.stringify({
      name: 'test-normalize-exports',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-modules': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      exports: './build/index.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeModulesRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeModulesRunParsed = JSON.parse(output);

    deepStrictEqual(parsed['exports'], {
      '.': {
        default: './build/index.js',
      },
    });

    return;
  });

  it('removes exports from non-package role', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeModulesRunProjectDirectory = join(sandboxRoot, 'remove-exports');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeModulesRunWorkspaceDirectory = join(projectDirectory, 'apps', 'docs');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonContents = JSON.stringify({
      name: 'test-remove-exports',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './apps/docs': {
          name: 'docs',
          role: 'docs',
          policy: 'freezable',
          recipes: {
            'normalize-modules': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonContents = JSON.stringify({
      name: 'docs',
      version: '0.0.0',
      exports: './build/index.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeModulesRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeModulesRunParsed = JSON.parse(output);

    strictEqual(parsed['exports'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeModulesRunProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeModulesRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeModulesRunPackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeModulesRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-modules': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeModulesRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      exports: './build/index.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: TestsCliRecipePackageJsonNormalizeModulesRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeModulesRunParsed = JSON.parse(output);

    strictEqual(parsed['exports'], './build/index.js');

    return;
  });

  return;
});
