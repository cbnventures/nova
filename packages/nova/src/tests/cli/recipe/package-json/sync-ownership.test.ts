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

import { Runner as CliRecipePackageJsonSyncOwnership } from '../../../../cli/recipe/package-json/sync-ownership.js';

import type {
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Output,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_TemporaryDirectory,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/sync-ownership.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Sync Ownership - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonSyncOwnership.run', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_SandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncOwnership.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Parsed = JSON.parse(output);

    strictEqual(parsed['homepage'], 'https://old.example.com');

    return;
  });

  it('syncs homepage from nova config', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_ProjectDirectory = join(sandboxRoot, 'sync-homepage');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonContents = JSON.stringify({
      name: 'test-sync-homepage',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncOwnership.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Parsed = JSON.parse(output);

    strictEqual(parsed['homepage'], 'https://example.com');

    return;
  });

  it('removes homepage from non-distributable workspace', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_ProjectDirectory = join(sandboxRoot, 'remove-homepage');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspaceDirectory = join(projectDirectory, 'apps', 'docs');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonContents = JSON.stringify({
      name: 'test-remove-homepage',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Parsed = JSON.parse(output);

    strictEqual(parsed['homepage'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncOwnership_CliRecipePackageJsonSyncOwnershipRun_Parsed = JSON.parse(output);

    strictEqual(parsed['homepage'], undefined);

    return;
  });

  return;
});
