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

import { CliRecipePackageJsonCleanup } from '../../../../cli/recipe/package-json/cleanup.js';

import type {
  TestsCliRecipePackageJsonCleanupRunDescriptionIndex,
  TestsCliRecipePackageJsonCleanupRunKeys,
  TestsCliRecipePackageJsonCleanupRunLicenseIndex,
  TestsCliRecipePackageJsonCleanupRunNameIndex,
  TestsCliRecipePackageJsonCleanupRunNovaConfigContents,
  TestsCliRecipePackageJsonCleanupRunNovaConfigPath,
  TestsCliRecipePackageJsonCleanupRunOriginalCwd,
  TestsCliRecipePackageJsonCleanupRunOutput,
  TestsCliRecipePackageJsonCleanupRunPackageJsonContents,
  TestsCliRecipePackageJsonCleanupRunPackageJsonPath,
  TestsCliRecipePackageJsonCleanupRunParsed,
  TestsCliRecipePackageJsonCleanupRunProjectDirectory,
  TestsCliRecipePackageJsonCleanupRunSandboxPath,
  TestsCliRecipePackageJsonCleanupRunSandboxRoot,
  TestsCliRecipePackageJsonCleanupRunTemporaryDirectory,
  TestsCliRecipePackageJsonCleanupRunVersionIndex,
  TestsCliRecipePackageJsonCleanupRunWorkspaceDirectory,
  TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonContents,
  TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/cleanup.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Cleanup - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonCleanup.run', async () => {
  const originalCwd: TestsCliRecipePackageJsonCleanupRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliRecipePackageJsonCleanupRunTemporaryDirectory = tmpdir();
  const sandboxPath: TestsCliRecipePackageJsonCleanupRunSandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliRecipePackageJsonCleanupRunSandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliRecipePackageJsonCleanupRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonCleanup.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: TestsCliRecipePackageJsonCleanupRunProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: TestsCliRecipePackageJsonCleanupRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonCleanupRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonCleanupRunPackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonCleanupRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonCleanupRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonContents = JSON.stringify({
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
    const output: TestsCliRecipePackageJsonCleanupRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonCleanupRunParsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay');

    return;
  });

  it('reorders package.json keys in defined sort order', async () => {
    const projectDirectory: TestsCliRecipePackageJsonCleanupRunProjectDirectory = join(sandboxRoot, 'reorder');
    const workspaceDirectory: TestsCliRecipePackageJsonCleanupRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonCleanupRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonCleanupRunPackageJsonContents = JSON.stringify({
      name: 'test-reorder',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonCleanupRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonCleanupRunNovaConfigContents = JSON.stringify({
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
    const workspacePackageJsonPath: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonContents = JSON.stringify({
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

    const output: TestsCliRecipePackageJsonCleanupRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonCleanupRunParsed = JSON.parse(output);
    const keys: TestsCliRecipePackageJsonCleanupRunKeys = Object.keys(parsed);

    // "name" should come before "version", "version" before "description", "description" before "license".
    const nameIndex: TestsCliRecipePackageJsonCleanupRunNameIndex = keys.indexOf('name');
    const versionIndex: TestsCliRecipePackageJsonCleanupRunVersionIndex = keys.indexOf('version');
    const descriptionIndex: TestsCliRecipePackageJsonCleanupRunDescriptionIndex = keys.indexOf('description');
    const licenseIndex: TestsCliRecipePackageJsonCleanupRunLicenseIndex = keys.indexOf('license');

    strictEqual(nameIndex < versionIndex, true);
    strictEqual(versionIndex < descriptionIndex, true);
    strictEqual(descriptionIndex < licenseIndex, true);

    return;
  });

  it('removes unknown keys from package.json', async () => {
    const projectDirectory: TestsCliRecipePackageJsonCleanupRunProjectDirectory = join(sandboxRoot, 'unknown-keys');
    const workspaceDirectory: TestsCliRecipePackageJsonCleanupRunWorkspaceDirectory = join(projectDirectory, 'packages', 'lib');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonCleanupRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonCleanupRunPackageJsonContents = JSON.stringify({
      name: 'test-unknown',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonCleanupRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonCleanupRunNovaConfigContents = JSON.stringify({
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
    const workspacePackageJsonPath: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonContents = JSON.stringify({
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

    const output: TestsCliRecipePackageJsonCleanupRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonCleanupRunParsed = JSON.parse(output);

    strictEqual(parsed['customField'], undefined);
    strictEqual(parsed['name'], '@test/lib');

    return;
  });

  it('keeps unknown keys when removeUnknownKeys is disabled via settings', async () => {
    const projectDirectory: TestsCliRecipePackageJsonCleanupRunProjectDirectory = join(sandboxRoot, 'keep-unknown');
    const workspaceDirectory: TestsCliRecipePackageJsonCleanupRunWorkspaceDirectory = join(projectDirectory, 'packages', 'keep');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonCleanupRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonCleanupRunPackageJsonContents = JSON.stringify({
      name: 'test-keep-unknown',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonCleanupRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonCleanupRunNovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonContents = JSON.stringify({
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

    const output: TestsCliRecipePackageJsonCleanupRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonCleanupRunParsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay');

    return;
  });

  it('skips reordering when reorderKeys is disabled via settings', async () => {
    const projectDirectory: TestsCliRecipePackageJsonCleanupRunProjectDirectory = join(sandboxRoot, 'skip-sort');
    const workspaceDirectory: TestsCliRecipePackageJsonCleanupRunWorkspaceDirectory = join(projectDirectory, 'packages', 'unsorted');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonCleanupRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonCleanupRunPackageJsonContents = JSON.stringify({
      name: 'test-skip-sort',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonCleanupRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonCleanupRunNovaConfigContents = JSON.stringify({
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
    const workspacePackageJsonPath: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonContents = JSON.stringify({
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

    const output: TestsCliRecipePackageJsonCleanupRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonCleanupRunParsed = JSON.parse(output);
    const keys: TestsCliRecipePackageJsonCleanupRunKeys = Object.keys(parsed);

    // Keys should remain in original order since sorting is skipped.
    deepStrictEqual(keys[0], 'license');
    deepStrictEqual(keys[1], 'name');
    deepStrictEqual(keys[2], 'version');

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: TestsCliRecipePackageJsonCleanupRunProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: TestsCliRecipePackageJsonCleanupRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonCleanupRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonCleanupRunPackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonCleanupRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonCleanupRunNovaConfigContents = JSON.stringify({
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
    const workspacePackageJsonPath: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonCleanupRunWorkspacePackageJsonContents = JSON.stringify({
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
    const output: TestsCliRecipePackageJsonCleanupRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonCleanupRunParsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay-in-dry-run');

    return;
  });

  return;
});
