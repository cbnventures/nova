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
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Output,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Parsed,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_TemporaryDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonPath,
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
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Parsed = JSON.parse(output);

    strictEqual(typeof parsed['config'], 'object');

    return;
  });

  it('adds scripts when missing', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_ProjectDirectory = join(sandboxRoot, 'add-scripts');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonContents = JSON.stringify({
      name: 'test-add-scripts',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeTooling.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Parsed = JSON.parse(output);

    deepStrictEqual(parsed['scripts'], {});

    return;
  });

  it('removes workspaces from non-project role', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_ProjectDirectory = join(sandboxRoot, 'remove-workspaces');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonContents = JSON.stringify({
      name: 'test-remove-workspaces',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Parsed = JSON.parse(output);

    strictEqual(parsed['workspaces'], undefined);

    return;
  });

  it('removes empty config', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_ProjectDirectory = join(sandboxRoot, 'remove-config');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonContents = JSON.stringify({
      name: 'test-remove-config',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Parsed = JSON.parse(output);

    strictEqual(parsed['config'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_NormalizeTooling_CliRecipePackageJsonNormalizeToolingRun_Parsed = JSON.parse(output);

    strictEqual(typeof parsed['config'], 'object');

    return;
  });

  return;
});
