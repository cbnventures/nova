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

import { CliRecipePackageJsonNormalizeTooling } from '../../../../cli/recipe/package-json/normalize-tooling.js';

import type {
  TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigContents,
  TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigPath,
  TestsCliRecipePackageJsonNormalizeToolingRunOriginalCwd,
  TestsCliRecipePackageJsonNormalizeToolingRunOutput,
  TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonContents,
  TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonPath,
  TestsCliRecipePackageJsonNormalizeToolingRunParsed,
  TestsCliRecipePackageJsonNormalizeToolingRunProjectDirectory,
  TestsCliRecipePackageJsonNormalizeToolingRunSandboxPath,
  TestsCliRecipePackageJsonNormalizeToolingRunSandboxRoot,
  TestsCliRecipePackageJsonNormalizeToolingRunTemporaryDirectory,
  TestsCliRecipePackageJsonNormalizeToolingRunWorkspaceDirectory,
  TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonContents,
  TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/normalize-tooling.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Normalize Tooling - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonNormalizeTooling.run', async () => {
  const originalCwd: TestsCliRecipePackageJsonNormalizeToolingRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliRecipePackageJsonNormalizeToolingRunTemporaryDirectory = tmpdir();
  const sandboxPath: TestsCliRecipePackageJsonNormalizeToolingRunSandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliRecipePackageJsonNormalizeToolingRunSandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeToolingRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeToolingRunProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeToolingRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      config: {},
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The empty config should still be there because the recipe is not enabled.
    const output: TestsCliRecipePackageJsonNormalizeToolingRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeToolingRunParsed = JSON.parse(output);

    strictEqual(typeof parsed['config'], 'object');

    return;
  });

  it('adds scripts when missing', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeToolingRunProjectDirectory = join(sandboxRoot, 'add-scripts');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeToolingRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonContents = JSON.stringify({
      name: 'test-add-scripts',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-tooling': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeToolingRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeToolingRunParsed = JSON.parse(output);

    deepStrictEqual(parsed['scripts'], {});

    return;
  });

  it('removes workspaces from non-project role', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeToolingRunProjectDirectory = join(sandboxRoot, 'remove-workspaces');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeToolingRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonContents = JSON.stringify({
      name: 'test-remove-workspaces',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-tooling': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      workspaces: ['packages/*'],
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeToolingRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeToolingRunParsed = JSON.parse(output);

    strictEqual(parsed['workspaces'], undefined);

    return;
  });

  it('removes empty config', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeToolingRunProjectDirectory = join(sandboxRoot, 'remove-config');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeToolingRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonContents = JSON.stringify({
      name: 'test-remove-config',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-tooling': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      config: {},
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeToolingRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeToolingRunParsed = JSON.parse(output);

    strictEqual(parsed['config'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeToolingRunProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeToolingRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunPackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeToolingRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-tooling': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeToolingRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      config: {},
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: TestsCliRecipePackageJsonNormalizeToolingRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeToolingRunParsed = JSON.parse(output);

    strictEqual(typeof parsed['config'], 'object');

    return;
  });

  return;
});
