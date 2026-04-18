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

import { CliRecipePackageJsonNormalizeBundler } from '../../../../cli/recipe/package-json/normalize-bundler.js';

import type {
  TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigContents,
  TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigPath,
  TestsCliRecipePackageJsonNormalizeBundlerRunOriginalCwd,
  TestsCliRecipePackageJsonNormalizeBundlerRunOutput,
  TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonContents,
  TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonPath,
  TestsCliRecipePackageJsonNormalizeBundlerRunParsed,
  TestsCliRecipePackageJsonNormalizeBundlerRunProjectDirectory,
  TestsCliRecipePackageJsonNormalizeBundlerRunSandboxPath,
  TestsCliRecipePackageJsonNormalizeBundlerRunSandboxRoot,
  TestsCliRecipePackageJsonNormalizeBundlerRunTemporaryDirectory,
  TestsCliRecipePackageJsonNormalizeBundlerRunWorkspaceDirectory,
  TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonContents,
  TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/recipe/package-json/normalize-bundler.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Normalize Bundler - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonNormalizeBundler.run', async () => {
  const originalCwd: TestsCliRecipePackageJsonNormalizeBundlerRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunTemporaryDirectory = tmpdir();
  const sandboxPath: TestsCliRecipePackageJsonNormalizeBundlerRunSandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliRecipePackageJsonNormalizeBundlerRunSandboxRoot = await mkdtemp(sandboxPath);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeBundler.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      typings: './build/index.d.ts',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeBundler.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The typings should not have been renamed because the recipe is not enabled.
    const output: TestsCliRecipePackageJsonNormalizeBundlerRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeBundlerRunParsed = JSON.parse(output);

    strictEqual(parsed['typings'], './build/index.d.ts');

    return;
  });

  it('renames typings to types', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunProjectDirectory = join(sandboxRoot, 'rename-typings');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonContents = JSON.stringify({
      name: 'test-rename-typings',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-bundler': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      typings: './build/index.d.ts',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeBundler.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeBundlerRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeBundlerRunParsed = JSON.parse(output);

    strictEqual(parsed['typings'], undefined);
    strictEqual(parsed['types'], './build/index.d.ts');

    return;
  });

  it('removes sideEffects from non-package role', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunProjectDirectory = join(sandboxRoot, 'remove-side-effects');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspaceDirectory = join(projectDirectory, 'apps', 'docs');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonContents = JSON.stringify({
      name: 'test-remove-side-effects',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './apps/docs': {
          name: 'docs',
          role: 'docs',
          policy: 'freezable',
          recipes: {
            'normalize-bundler': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonContents = JSON.stringify({
      name: 'docs',
      version: '0.0.0',
      sideEffects: false,
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeBundler.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: TestsCliRecipePackageJsonNormalizeBundlerRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeBundlerRunParsed = JSON.parse(output);

    strictEqual(parsed['sideEffects'], undefined);

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliRecipePackageJsonNormalizeBundlerRunPackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliRecipePackageJsonNormalizeBundlerRunNovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
          recipes: {
            'normalize-bundler': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: TestsCliRecipePackageJsonNormalizeBundlerRunWorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      typings: './build/index.d.ts',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonNormalizeBundler.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: TestsCliRecipePackageJsonNormalizeBundlerRunOutput = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: TestsCliRecipePackageJsonNormalizeBundlerRunParsed = JSON.parse(output);

    strictEqual(parsed['typings'], './build/index.d.ts');

    return;
  });

  return;
});
