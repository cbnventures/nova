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

import { Runner as CliRecipePackageJsonCleanup } from '../../../../cli/recipe/package-json/cleanup.js';

import type {
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_Output,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_Parsed,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_Output,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_Parsed,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_Output,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_Parsed,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_DescriptionIndex,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_Keys,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_LicenseIndex,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_NameIndex,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_Output,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_Parsed,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_VersionIndex,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_Keys,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_Output,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_Parsed,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_TemporaryDirectory,
} from '../../../../types/tests/cli/recipe/package-json/cleanup.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Cleanup - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonCleanup.run', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonCleanup.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      customField: 'should-stay',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The custom field should still be there because the recipe is not enabled.
    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay');

    return;
  });

  it('reorders package.json keys in defined sort order', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_ProjectDirectory = join(sandboxRoot, 'reorder');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_PackageJsonContents = JSON.stringify({
      name: 'test-reorder',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'cleanup': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    // Write package.json with keys in wrong order.
    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_WorkspacePackageJsonContents = JSON.stringify({
      license: 'MIT',
      version: '1.0.0',
      name: '@test/core',
      description: 'Test package',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_Parsed = JSON.parse(output);
    const keys: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_Keys = Object.keys(parsed);

    // "name" should come before "version", "version" before "description", "description" before "license".
    const nameIndex: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_NameIndex = keys.indexOf('name');
    const versionIndex: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_VersionIndex = keys.indexOf('version');
    const descriptionIndex: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_DescriptionIndex = keys.indexOf('description');
    const licenseIndex: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ReordersPackageJsonKeysInDefinedSortOrder_LicenseIndex = keys.indexOf('license');

    strictEqual(nameIndex < versionIndex, true);
    strictEqual(versionIndex < descriptionIndex, true);
    strictEqual(descriptionIndex < licenseIndex, true);

    return;
  });

  it('removes unknown keys from package.json', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_ProjectDirectory = join(sandboxRoot, 'unknown-keys');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_WorkspaceDirectory = join(projectDirectory, 'packages', 'lib');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_PackageJsonContents = JSON.stringify({
      name: 'test-unknown',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/lib': {
          name: '@test/lib',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'cleanup': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    // Write package.json with an unknown key.
    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/lib',
      version: '1.0.0',
      customField: 'should-be-removed',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_RemovesUnknownKeysFromPackageJson_Parsed = JSON.parse(output);

    strictEqual(parsed['customField'], undefined);
    strictEqual(parsed['name'], '@test/lib');

    return;
  });

  it('keeps unknown keys when removeUnknownKeys is disabled via settings', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_ProjectDirectory = join(sandboxRoot, 'keep-unknown');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_WorkspaceDirectory = join(projectDirectory, 'packages', 'keep');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_PackageJsonContents = JSON.stringify({
      name: 'test-keep-unknown',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/keep': {
          name: '@test/keep',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'cleanup': [
              true,
              { removeUnknownKeys: false },
            ],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/keep',
      version: '1.0.0',
      customField: 'should-stay',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_KeepsUnknownKeysWhenRemoveUnknownKeysIsDisabledViaSettings_Parsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay');

    return;
  });

  it('skips reordering when reorderKeys is disabled via settings', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_ProjectDirectory = join(sandboxRoot, 'skip-sort');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_WorkspaceDirectory = join(projectDirectory, 'packages', 'unsorted');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_PackageJsonContents = JSON.stringify({
      name: 'test-skip-sort',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/unsorted': {
          name: '@test/unsorted',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'cleanup': [
              true,
              { reorderKeys: false },
            ],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    // Write package.json with keys in wrong order.
    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_WorkspacePackageJsonContents = JSON.stringify({
      license: 'MIT',
      name: '@test/unsorted',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_Parsed = JSON.parse(output);
    const keys: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SkipsReorderingWhenReorderKeysIsDisabledViaSettings_Keys = Object.keys(parsed);

    // Keys should remain in original order since sorting is skipped.
    deepStrictEqual(keys[0], 'license');
    deepStrictEqual(keys[1], 'name');
    deepStrictEqual(keys[2], 'version');

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'cleanup': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    // Write package.json with an unknown key.
    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      customField: 'should-stay-in-dry-run',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonCleanup.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DoesNotModifyFilesDuringDryRun_Parsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay-in-dry-run');

    return;
  });

  return;
});
