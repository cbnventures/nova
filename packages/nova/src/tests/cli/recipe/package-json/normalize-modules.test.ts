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

import { Runner as CliRecipePackageJsonNormalizeModules } from '../../../../cli/recipe/package-json/normalize-modules.js';

import type {
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_TemporaryDirectory,
} from '../../../../types/tests/cli/recipe/package-json/normalize-modules.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Normalize Modules - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonNormalizeModules.run', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      exports: './build/index.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The exports should not have been normalized because the recipe is not enabled.
    const output: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed = JSON.parse(output);

    strictEqual(parsed['exports'], './build/index.js');

    return;
  });

  it('normalizes string exports to object for package role', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_ProjectDirectory = join(sandboxRoot, 'normalize-exports');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_PackageJsonContents = JSON.stringify({
      name: 'test-normalize-exports',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-modules': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      exports: './build/index.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_NormalizesStringExportsToObjectForPackageRole_Parsed = JSON.parse(output);

    deepStrictEqual(parsed['exports'], {
      '.': {
        default: './build/index.js',
      },
    });

    return;
  });

  it('removes exports from non-package role', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_ProjectDirectory = join(sandboxRoot, 'remove-exports');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_WorkspaceDirectory = join(projectDirectory, 'apps', 'docs');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_PackageJsonContents = JSON.stringify({
      name: 'test-remove-exports',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_NovaConfigContents = JSON.stringify({
      workspaces: {
        './apps/docs': {
          name: 'docs',
          role: 'docs',
          policy: 'freezable',
          recipes: {
            'normalize-modules': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_WorkspacePackageJsonContents = JSON.stringify({
      name: 'docs',
      version: '0.0.0',
      exports: './build/index.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_RemovesExportsFromNonPackageRole_Parsed = JSON.parse(output);

    strictEqual(parsed['exports'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-modules': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      exports: './build/index.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeModules.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeModules_CliRecipePackageJsonNormalizeModulesRun_DoesNotModifyFilesDuringDryRun_Parsed = JSON.parse(output);

    strictEqual(parsed['exports'], './build/index.js');

    return;
  });

  return;
});
