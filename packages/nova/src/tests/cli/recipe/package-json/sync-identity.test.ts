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

import { ApiSpdxLicenses } from '../../../../api/spdx-licenses.js';
import { CliRecipePackageJsonSyncIdentity } from '../../../../cli/recipe/package-json/sync-identity.js';

import type {
  TestsCliRecipePackageJsonSyncIdentityRunNovaConfigContents,
  TestsCliRecipePackageJsonSyncIdentityRunNovaConfigPath,
  TestsCliRecipePackageJsonSyncIdentityRunOriginalCwd,
  TestsCliRecipePackageJsonSyncIdentityRunOutput,
  TestsCliRecipePackageJsonSyncIdentityRunPackageJsonContents,
  TestsCliRecipePackageJsonSyncIdentityRunPackageJsonPath,
  TestsCliRecipePackageJsonSyncIdentityRunParsed,
  TestsCliRecipePackageJsonSyncIdentityRunProjectDirectory,
  TestsCliRecipePackageJsonSyncIdentityRunSandboxPath,
  TestsCliRecipePackageJsonSyncIdentityRunSandboxRoot,
  TestsCliRecipePackageJsonSyncIdentityRunTemporaryDirectory,
  TestsCliRecipePackageJsonSyncIdentityRunWorkspaceDirectory,
  TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonContents,
  TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/sync-identity.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Sync Identity - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonSyncIdentity.run', async () => {
  const originalCwd: TestsCliRecipePackageJsonSyncIdentityRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliRecipePackageJsonSyncIdentityRunTemporaryDirectory = tmpdir();
  const sandboxPath: TestsCliRecipePackageJsonSyncIdentityRunSandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliRecipePackageJsonSyncIdentityRunSandboxRoot = await mkdtemp(sandboxPath);

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      licenses: [
        { licenseId: 'MIT' },
        { licenseId: 'Apache-2.0' },
        { licenseId: 'ISC' },
      ],
    }))));

    return;
  });

  afterEach(() => {
    ApiSpdxLicenses.resetForTesting();

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
    const projectDirectory: TestsCliRecipePackageJsonSyncIdentityRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncIdentityRunProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncIdentityRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncIdentityRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncIdentityRunPackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncIdentityRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncIdentityRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonContents = JSON.stringify({
      name: 'wrong-name',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The name should not have been synced because the recipe is not enabled.
    const output: TestsCliRecipePackageJsonSyncIdentityRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncIdentityRunParsed = JSON.parse(output);

    strictEqual(parsed['name'], 'wrong-name');

    return;
  });

  it('syncs name from workspace manifest', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncIdentityRunProjectDirectory = join(sandboxRoot, 'sync-name');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncIdentityRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncIdentityRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncIdentityRunPackageJsonContents = JSON.stringify({
      name: 'test-sync-name',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncIdentityRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncIdentityRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'sync-identity': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonContents = JSON.stringify({
      name: 'wrong-name',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonSyncIdentityRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncIdentityRunParsed = JSON.parse(output);

    strictEqual(parsed['name'], '@test/core');

    return;
  });

  it('sets freezable workspace version to 0.0.0', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncIdentityRunProjectDirectory = join(sandboxRoot, 'freezable-version');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncIdentityRunWorkspaceDirectory = join(projectDirectory, 'packages', 'config');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncIdentityRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncIdentityRunPackageJsonContents = JSON.stringify({
      name: 'test-freezable',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncIdentityRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncIdentityRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/config': {
          name: 'config-test',
          role: 'config',
          policy: 'freezable',
          recipes: {
            'sync-identity': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonContents = JSON.stringify({
      name: 'config-test',
      version: '1.2.3',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonSyncIdentityRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncIdentityRunParsed = JSON.parse(output);

    strictEqual(parsed['version'], '0.0.0');

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncIdentityRunProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncIdentityRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncIdentityRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncIdentityRunPackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncIdentityRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncIdentityRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'sync-identity': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncIdentityRunWorkspacePackageJsonContents = JSON.stringify({
      name: 'wrong-name',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: TestsCliRecipePackageJsonSyncIdentityRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncIdentityRunParsed = JSON.parse(output);

    strictEqual(parsed['name'], 'wrong-name');

    return;
  });

  return;
});
