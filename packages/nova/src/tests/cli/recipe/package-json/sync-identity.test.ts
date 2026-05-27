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

import { Runner as ApiSpdxLicenses } from '../../../../api/spdx-licenses.js';
import { Runner as CliRecipePackageJsonSyncIdentity } from '../../../../cli/recipe/package-json/sync-identity.js';

import type {
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_TemporaryDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/sync-identity.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Sync Identity - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonSyncIdentity.run', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SandboxRoot = await mkdtemp(sandboxPath);

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
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Parsed = JSON.parse(output);

    strictEqual(parsed['name'], 'wrong-name');

    return;
  });

  it('syncs name from workspace manifest', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_ProjectDirectory = join(sandboxRoot, 'sync-name');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonContents = JSON.stringify({
      name: 'test-sync-name',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonContents = JSON.stringify({
      name: 'wrong-name',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Parsed = JSON.parse(output);

    strictEqual(parsed['name'], '@test/core');

    return;
  });

  it('sets freezable workspace version to 0.0.0', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_ProjectDirectory = join(sandboxRoot, 'freezable-version');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'config');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonContents = JSON.stringify({
      name: 'test-freezable',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonContents = JSON.stringify({
      name: 'config-test',
      version: '1.2.3',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Parsed = JSON.parse(output);

    strictEqual(parsed['version'], '0.0.0');

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_Parsed = JSON.parse(output);

    strictEqual(parsed['name'], 'wrong-name');

    return;
  });

  return;
});
