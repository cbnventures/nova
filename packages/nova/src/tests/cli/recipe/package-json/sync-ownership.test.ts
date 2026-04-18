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

import { CliRecipePackageJsonSyncOwnership } from '../../../../cli/recipe/package-json/sync-ownership.js';

import type {
  TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigContents,
  TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigPath,
  TestsCliRecipePackageJsonSyncOwnershipRunOriginalCwd,
  TestsCliRecipePackageJsonSyncOwnershipRunOutput,
  TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonContents,
  TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonPath,
  TestsCliRecipePackageJsonSyncOwnershipRunParsed,
  TestsCliRecipePackageJsonSyncOwnershipRunProjectDirectory,
  TestsCliRecipePackageJsonSyncOwnershipRunSandboxPath,
  TestsCliRecipePackageJsonSyncOwnershipRunSandboxRoot,
  TestsCliRecipePackageJsonSyncOwnershipRunTemporaryDirectory,
  TestsCliRecipePackageJsonSyncOwnershipRunWorkspaceDirectory,
  TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonContents,
  TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/sync-ownership.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Sync Ownership - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonSyncOwnership.run', async () => {
  const originalCwd: TestsCliRecipePackageJsonSyncOwnershipRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliRecipePackageJsonSyncOwnershipRunTemporaryDirectory = tmpdir();
  const sandboxPath: TestsCliRecipePackageJsonSyncOwnershipRunSandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliRecipePackageJsonSyncOwnershipRunSandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncOwnershipRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncOwnership.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncOwnershipRunProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncOwnershipRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      homepage: 'https://old.example.com',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncOwnership.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The homepage should not have been changed because the recipe is not enabled.
    const output: TestsCliRecipePackageJsonSyncOwnershipRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncOwnershipRunParsed = JSON.parse(output);

    strictEqual(parsed['homepage'], 'https://old.example.com');

    return;
  });

  it('syncs homepage from nova config', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncOwnershipRunProjectDirectory = join(sandboxRoot, 'sync-homepage');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncOwnershipRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonContents = JSON.stringify({
      name: 'test-sync-homepage',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigContents = JSON.stringify({
      urls: {
        homepage: 'https://example.com',
      },
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'sync-ownership': [
              true,
              { homepage: true },
            ],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncOwnership.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonSyncOwnershipRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncOwnershipRunParsed = JSON.parse(output);

    strictEqual(parsed['homepage'], 'https://example.com');

    return;
  });

  it('removes homepage from non-distributable workspace', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncOwnershipRunProjectDirectory = join(sandboxRoot, 'remove-homepage');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncOwnershipRunWorkspaceDirectory = join(projectDirectory, 'apps', 'docs');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonContents = JSON.stringify({
      name: 'test-remove-homepage',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './apps/docs': {
          name: 'docs',
          role: 'docs',
          policy: 'freezable',
          recipes: {
            'sync-ownership': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonContents = JSON.stringify({
      name: 'docs',
      version: '0.0.0',
      homepage: 'https://should-be-removed.com',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncOwnership.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonSyncOwnershipRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncOwnershipRunParsed = JSON.parse(output);

    strictEqual(parsed['homepage'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: TestsCliRecipePackageJsonSyncOwnershipRunProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: TestsCliRecipePackageJsonSyncOwnershipRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonSyncOwnershipRunPackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonSyncOwnershipRunNovaConfigContents = JSON.stringify({
      urls: {
        homepage: 'https://example.com',
      },
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'sync-ownership': [
              true,
              { homepage: true },
            ],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonSyncOwnershipRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncOwnership.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: TestsCliRecipePackageJsonSyncOwnershipRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonSyncOwnershipRunParsed = JSON.parse(output);

    strictEqual(parsed['homepage'], undefined);

    return;
  });

  return;
});
