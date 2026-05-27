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

import { Runner as ApiNodeReleases } from '../../../../api/node-releases.js';
import { Runner as CliRecipePackageJsonSyncEnvironment } from '../../../../cli/recipe/package-json/sync-environment.js';

import type {
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Output,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_TemporaryDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/sync-environment.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Sync Environment - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonSyncEnvironment.run', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SandboxRoot = await mkdtemp(sandboxPath);

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
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncEnvironment.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Parsed = JSON.parse(output);

    strictEqual(parsed['engines'], undefined);

    return;
  });

  it('adds engines field when missing', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_ProjectDirectory = join(sandboxRoot, 'add-engines');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonContents = JSON.stringify({
      name: 'test-add-engines',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncEnvironment.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Parsed = JSON.parse(output);

    strictEqual(typeof parsed['engines'], 'object');

    return;
  });

  it('removes packageManager from non-project role', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_ProjectDirectory = join(sandboxRoot, 'remove-pm');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonContents = JSON.stringify({
      name: 'test-remove-pm',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Parsed = JSON.parse(output);

    strictEqual(parsed['packageManager'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_Parsed = JSON.parse(output);

    strictEqual(parsed['packageManager'], 'npm@10.0.0');

    return;
  });

  return;
});
