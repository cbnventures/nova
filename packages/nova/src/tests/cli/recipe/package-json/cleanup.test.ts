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
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DescriptionIndex,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Keys,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_LicenseIndex,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NameIndex,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Output,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Parsed,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_TemporaryDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_VersionIndex,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonPath,
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
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonCleanup.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Parsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay');

    return;
  });

  it('reorders package.json keys in defined sort order', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ProjectDirectory = join(sandboxRoot, 'reorder');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonContents = JSON.stringify({
      name: 'test-reorder',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigContents = JSON.stringify({
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
    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Parsed = JSON.parse(output);
    const keys: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Keys = Object.keys(parsed);

    // "name" should come before "version", "version" before "description", "description" before "license".
    const nameIndex: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NameIndex = keys.indexOf('name');
    const versionIndex: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_VersionIndex = keys.indexOf('version');
    const descriptionIndex: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_DescriptionIndex = keys.indexOf('description');
    const licenseIndex: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_LicenseIndex = keys.indexOf('license');

    strictEqual(nameIndex < versionIndex, true);
    strictEqual(versionIndex < descriptionIndex, true);
    strictEqual(descriptionIndex < licenseIndex, true);

    return;
  });

  it('removes unknown keys from package.json', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ProjectDirectory = join(sandboxRoot, 'unknown-keys');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'lib');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonContents = JSON.stringify({
      name: 'test-unknown',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigContents = JSON.stringify({
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
    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Parsed = JSON.parse(output);

    strictEqual(parsed['customField'], undefined);
    strictEqual(parsed['name'], '@test/lib');

    return;
  });

  it('keeps unknown keys when removeUnknownKeys is disabled via settings', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ProjectDirectory = join(sandboxRoot, 'keep-unknown');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'keep');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonContents = JSON.stringify({
      name: 'test-keep-unknown',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Parsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay');

    return;
  });

  it('skips reordering when reorderKeys is disabled via settings', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ProjectDirectory = join(sandboxRoot, 'skip-sort');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'unsorted');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonContents = JSON.stringify({
      name: 'test-skip-sort',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigContents = JSON.stringify({
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
    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonContents = JSON.stringify({
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

    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Parsed = JSON.parse(output);
    const keys: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Keys = Object.keys(parsed);

    // Keys should remain in original order since sorting is skipped.
    deepStrictEqual(keys[0], 'license');
    deepStrictEqual(keys[1], 'name');
    deepStrictEqual(keys[2], 'version');

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_NovaConfigContents = JSON.stringify({
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
    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_WorkspacePackageJsonContents = JSON.stringify({
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
    const output: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_Cleanup_CliRecipePackageJsonCleanupRun_Parsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay-in-dry-run');

    return;
  });

  return;
});
