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

import { CliRecipePackageJsonNormalizeArtifacts } from '../../../../cli/recipe/package-json/normalize-artifacts.js';

import type {
  TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigContents,
  TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigPath,
  TestsCliRecipePackageJsonNormalizeArtifactsRunOriginalCwd,
  TestsCliRecipePackageJsonNormalizeArtifactsRunOutput,
  TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonContents,
  TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonPath,
  TestsCliRecipePackageJsonNormalizeArtifactsRunParsed,
  TestsCliRecipePackageJsonNormalizeArtifactsRunProjectDirectory,
  TestsCliRecipePackageJsonNormalizeArtifactsRunSandboxPath,
  TestsCliRecipePackageJsonNormalizeArtifactsRunSandboxRoot,
  TestsCliRecipePackageJsonNormalizeArtifactsRunTemporaryDirectory,
  TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspaceDirectory,
  TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonContents,
  TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/normalize-artifacts.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Normalize Artifacts - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonNormalizeArtifacts.run', async () => {
  const originalCwd: TestsCliRecipePackageJsonNormalizeArtifactsRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunTemporaryDirectory = tmpdir();
  const sandboxPath: TestsCliRecipePackageJsonNormalizeArtifactsRunSandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliRecipePackageJsonNormalizeArtifactsRunSandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeArtifacts.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonContents = JSON.stringify({
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
    const output: TestsCliRecipePackageJsonNormalizeArtifactsRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeArtifactsRunParsed = JSON.parse(output);

    strictEqual(parsed['bin'], './build/cli.js');

    return;
  });

  it('normalizes string bin to object for package role', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunProjectDirectory = join(sandboxRoot, 'normalize-bin');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonContents = JSON.stringify({
      name: 'test-normalize-bin',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonContents = JSON.stringify({
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

    const output: TestsCliRecipePackageJsonNormalizeArtifactsRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeArtifactsRunParsed = JSON.parse(output);

    deepStrictEqual(parsed['bin'], {
      core: './build/cli.js',
    });

    return;
  });

  it('sets private to true for non-distributable workspace', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunProjectDirectory = join(sandboxRoot, 'sync-private');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspaceDirectory = join(projectDirectory, 'apps', 'docs');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonContents = JSON.stringify({
      name: 'test-sync-private',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonContents = JSON.stringify({
      name: 'docs',
      version: '0.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeArtifacts.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeArtifactsRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeArtifactsRunParsed = JSON.parse(output);

    strictEqual(parsed['private'], true);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeArtifactsRunPackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeArtifactsRunNovaConfigContents = JSON.stringify({
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

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeArtifactsRunWorkspacePackageJsonContents = JSON.stringify({
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
    const output: TestsCliRecipePackageJsonNormalizeArtifactsRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeArtifactsRunParsed = JSON.parse(output);

    strictEqual(parsed['bin'], './build/cli.js');

    return;
  });

  return;
});
