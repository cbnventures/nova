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

import { Runner as CliRecipePackageJsonNormalizeTooling } from '../../../../cli/recipe/package-json/normalize-tooling.js';

import type {
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_TemporaryDirectory,
} from '../../../../types/tests/cli/recipe/package-json/normalize-tooling.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Normalize Tooling - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonNormalizeTooling.run', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed = JSON.parse(output);

    strictEqual(typeof parsed['config'], 'object');

    return;
  });

  it('adds scripts when missing', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_ProjectDirectory = join(sandboxRoot, 'add-scripts');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_PackageJsonContents = JSON.stringify({
      name: 'test-add-scripts',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_AddsScriptsWhenMissing_Parsed = JSON.parse(output);

    deepStrictEqual(parsed['scripts'], {});

    return;
  });

  it('removes workspaces from non-project role', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_ProjectDirectory = join(sandboxRoot, 'remove-workspaces');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_PackageJsonContents = JSON.stringify({
      name: 'test-remove-workspaces',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesWorkspacesFromNonProjectRole_Parsed = JSON.parse(output);

    strictEqual(parsed['workspaces'], undefined);

    return;
  });

  it('removes empty config', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_ProjectDirectory = join(sandboxRoot, 'remove-config');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_PackageJsonContents = JSON.stringify({
      name: 'test-remove-config',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_RemovesEmptyConfig_Parsed = JSON.parse(output);

    strictEqual(parsed['config'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_DoesNotModifyFilesDuringDryRun_Parsed = JSON.parse(output);

    strictEqual(typeof parsed['config'], 'object');

    return;
  });

  return;
});
