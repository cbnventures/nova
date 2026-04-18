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

import {
  afterAll, afterEach, beforeEach, describe, it, vi,
} from 'vitest';

import { ApiNodeReleases } from '../../../../api/node-releases.js';
import { CliRecipePackageJsonSyncEnvironment } from '../../../../cli/recipe/package-json/sync-environment.js';

import type {
  TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigContents,
  TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigPath,
  TestsCliRecipePackageJsonSyncEnvironmentRunOriginalCwd,
  TestsCliRecipePackageJsonSyncEnvironmentRunOutput,
  TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonContents,
  TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonPath,
  TestsCliRecipePackageJsonSyncEnvironmentRunParsed,
  TestsCliRecipePackageJsonSyncEnvironmentRunProjectDirectory,
  TestsCliRecipePackageJsonSyncEnvironmentRunSandboxPath,
  TestsCliRecipePackageJsonSyncEnvironmentRunSandboxRoot,
  TestsCliRecipePackageJsonSyncEnvironmentRunTemporaryDirectory,
  TestsCliRecipePackageJsonSyncEnvironmentRunWorkspaceDirectory,
  TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonContents,
  TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/sync-environment.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Sync Environment - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonSyncEnvironment.run', async () => {
  const originalCwd: TestsCliRecipePackageJsonSyncEnvironmentRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunTemporaryDirectory = tmpdir();
  const sandboxPath: TestsCliRecipePackageJsonSyncEnvironmentRunSandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliRecipePackageJsonSyncEnvironmentRunSandboxRoot = await mkdtemp(sandboxPath);

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      v20: {
        lts: '2000-01-01',
        end: '2099-12-31',
      },
    }))));

    return;
  });

  afterEach(() => {
    ApiNodeReleases.resetForTesting();

    vi.restoreAllMocks();

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncEnvironment.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncEnvironment.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The engines field should not have been added because the recipe is not enabled.
    const output: TestsCliRecipePackageJsonSyncEnvironmentRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncEnvironmentRunParsed = JSON.parse(output);

    strictEqual(parsed['engines'], undefined);

    return;
  });

  it('adds engines field when missing', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunProjectDirectory = join(sandboxRoot, 'add-engines');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonContents = JSON.stringify({
      name: 'test-add-engines',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'sync-environment': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncEnvironment.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonSyncEnvironmentRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncEnvironmentRunParsed = JSON.parse(output);

    strictEqual(typeof parsed['engines'], 'object');

    return;
  });

  it('removes packageManager from non-project role', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunProjectDirectory = join(sandboxRoot, 'remove-pm');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonContents = JSON.stringify({
      name: 'test-remove-pm',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'sync-environment': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      packageManager: 'npm@10.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncEnvironment.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonSyncEnvironmentRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncEnvironmentRunParsed = JSON.parse(output);

    strictEqual(parsed['packageManager'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncEnvironmentRunPackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncEnvironmentRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'sync-environment': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncEnvironmentRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      packageManager: 'npm@10.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncEnvironment.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: TestsCliRecipePackageJsonSyncEnvironmentRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncEnvironmentRunParsed = JSON.parse(output);

    strictEqual(parsed['packageManager'], 'npm@10.0.0');

    return;
  });

  return;
});
