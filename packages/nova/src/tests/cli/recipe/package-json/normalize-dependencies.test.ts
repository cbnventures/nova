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

import { Runner as CliRecipePackageJsonNormalizeDependencies } from '../../../../cli/recipe/package-json/normalize-dependencies.js';

import type {
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_BundleDependencies,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_IncludesChalk,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_IncludesLodash,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_IsBundleDepsArray,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_TemporaryDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/normalize-dependencies.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Normalize Dependencies - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonNormalizeDependencies.run', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_SandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      dependencies: {},
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The empty dependencies should still be there because the recipe is not enabled.
    const output: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Parsed = JSON.parse(output);

    strictEqual(typeof parsed['dependencies'], 'object');

    return;
  });

  it('removes empty dependency fields', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_ProjectDirectory = join(sandboxRoot, 'remove-empty');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonContents = JSON.stringify({
      name: 'test-remove-empty',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-dependencies': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
      optionalDependencies: {},
      overrides: {},
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Parsed = JSON.parse(output);

    strictEqual(parsed['dependencies'], undefined);
    strictEqual(parsed['devDependencies'], undefined);
    strictEqual(parsed['peerDependencies'], undefined);
    strictEqual(parsed['optionalDependencies'], undefined);
    strictEqual(parsed['overrides'], undefined);

    return;
  });

  it('merges bundledDependencies into bundleDependencies', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_ProjectDirectory = join(sandboxRoot, 'merge-bundled');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonContents = JSON.stringify({
      name: 'test-merge-bundled',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-dependencies': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      dependencies: {
        lodash: '4.17.21',
      },
      bundleDependencies: ['lodash'],
      bundledDependencies: ['chalk'],
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Parsed = JSON.parse(output);

    strictEqual(parsed['bundledDependencies'], undefined);
    const isBundleDepsArray: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_IsBundleDepsArray = Array.isArray(parsed['bundleDependencies']);
    const bundleDependencies: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_BundleDependencies = parsed['bundleDependencies'] as Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_BundleDependencies;
    const includesLodash: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_IncludesLodash = bundleDependencies.includes('lodash');
    const includesChalk: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_IncludesChalk = bundleDependencies.includes('chalk');

    strictEqual(isBundleDepsArray, true);
    strictEqual(includesLodash, true);
    strictEqual(includesChalk, true);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-dependencies': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      dependencies: {},
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeDependencies.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeDependencies_CliRecipePackageJsonNormalizeDependenciesRun_Parsed = JSON.parse(output);

    strictEqual(typeof parsed['dependencies'], 'object');

    return;
  });

  return;
});
