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
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_Output,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_Output,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_Output,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_TemporaryDirectory,
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
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncEnvironment.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed = JSON.parse(output);

    strictEqual(parsed['engines'], undefined);

    return;
  });

  it('adds engines field when missing', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_ProjectDirectory = join(sandboxRoot, 'add-engines');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_PackageJsonContents = JSON.stringify({
      name: 'test-add-engines',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncEnvironment.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_AddsEnginesFieldWhenMissing_Parsed = JSON.parse(output);

    strictEqual(typeof parsed['engines'], 'object');

    return;
  });

  it('removes packageManager from non-project role', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_ProjectDirectory = join(sandboxRoot, 'remove-pm');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_PackageJsonContents = JSON.stringify({
      name: 'test-remove-pm',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_RemovesPackageManagerFromNonProjectRole_Parsed = JSON.parse(output);

    strictEqual(parsed['packageManager'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncEnvironment_CliRecipePackageJsonSyncEnvironmentRun_DoesNotModifyFilesDuringDryRun_Parsed = JSON.parse(output);

    strictEqual(parsed['packageManager'], 'npm@10.0.0');

    return;
  });

  return;
});
