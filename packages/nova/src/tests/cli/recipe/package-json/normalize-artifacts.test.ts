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

import { Runner as CliRecipePackageJsonNormalizeArtifacts } from '../../../../cli/recipe/package-json/normalize-artifacts.js';

import type {
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_TemporaryDirectory,
} from '../../../../types/tests/cli/recipe/package-json/normalize-artifacts.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Normalize Artifacts - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonNormalizeArtifacts.run', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeArtifacts.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      bin: './build/cli.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeArtifacts.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The bin should not have been normalized because the recipe is not enabled.
    const output: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed = JSON.parse(output);

    strictEqual(parsed['bin'], './build/cli.js');

    return;
  });

  it('normalizes string bin to object for package role', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_ProjectDirectory = join(sandboxRoot, 'normalize-bin');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_PackageJsonContents = JSON.stringify({
      name: 'test-normalize-bin',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-artifacts': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      bin: './build/cli.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeArtifacts.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_NormalizesStringBinToObjectForPackageRole_Parsed = JSON.parse(output);

    deepStrictEqual(parsed['bin'], {
      core: './build/cli.js',
    });

    return;
  });

  it('sets private to true for non-distributable workspace', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_ProjectDirectory = join(sandboxRoot, 'sync-private');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_WorkspaceDirectory = join(projectDirectory, 'apps', 'docs');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_PackageJsonContents = JSON.stringify({
      name: 'test-sync-private',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_NovaConfigContents = JSON.stringify({
      workspaces: {
        './apps/docs': {
          name: 'docs',
          role: 'docs',
          policy: 'freezable',
          recipes: {
            'normalize-artifacts': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_WorkspacePackageJsonContents = JSON.stringify({
      name: 'docs',
      version: '0.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeArtifacts.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_SetsPrivateToTrueForNonDistributableWorkspace_Parsed = JSON.parse(output);

    strictEqual(parsed['private'], true);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-artifacts': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      bin: './build/cli.js',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeArtifacts.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeArtifacts_CliRecipePackageJsonNormalizeArtifactsRun_DoesNotModifyFilesDuringDryRun_Parsed = JSON.parse(output);

    strictEqual(parsed['bin'], './build/cli.js');

    return;
  });

  return;
});
