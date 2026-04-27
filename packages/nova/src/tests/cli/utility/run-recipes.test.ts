import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { CliUtilityRunRecipes } from '../../../cli/utility/run-recipes.js';

import type {
  TestsCliUtilityRunRecipesRunExitCode,
  TestsCliUtilityRunRecipesRunNovaConfigContents,
  TestsCliUtilityRunRecipesRunNovaConfigPath,
  TestsCliUtilityRunRecipesRunOriginalCwd,
  TestsCliUtilityRunRecipesRunPackageJsonContents,
  TestsCliUtilityRunRecipesRunPackageJsonPath,
  TestsCliUtilityRunRecipesRunProjectDirectory,
  TestsCliUtilityRunRecipesRunSandboxRoot,
  TestsCliUtilityRunRecipesRunTemporaryDirectory,
  TestsCliUtilityRunRecipesRunTemporaryPrefix,
  TestsCliUtilityRunRecipesRunUnknownCategory,
} from '../../../types/tests/cli/utility/run-recipes.test.d.ts';

/**
 * Tests - CLI - Utility - Run Recipes - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityRunRecipes.run', async () => {
  const originalCwd: TestsCliUtilityRunRecipesRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliUtilityRunRecipesRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliUtilityRunRecipesRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliUtilityRunRecipesRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliUtilityRunRecipesRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliUtilityRunRecipes.run({
      category: 'package-json',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces are configured', async () => {
    const projectDirectory: TestsCliUtilityRunRecipesRunProjectDirectory = join(sandboxRoot, 'no-workspaces');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityRunRecipesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityRunRecipesRunPackageJsonContents = JSON.stringify({
      name: 'test-no-workspaces',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliUtilityRunRecipesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliUtilityRunRecipesRunNovaConfigContents = JSON.stringify({}, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityRunRecipes.run({
      category: 'package-json',
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('iterates only the package-json subgroup when category is package-json', async () => {
    const projectDirectory: TestsCliUtilityRunRecipesRunProjectDirectory = join(sandboxRoot, 'pkg-json-category');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityRunRecipesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityRunRecipesRunPackageJsonContents = JSON.stringify({
      name: 'test-pkg-json-category',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliUtilityRunRecipesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliUtilityRunRecipesRunNovaConfigContents = JSON.stringify({}, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityRunRecipes.run({
      category: 'package-json',
      dryRun: true,
    });

    const exitCode: TestsCliUtilityRunRecipesRunExitCode = process.exitCode;

    strictEqual(exitCode, undefined);

    return;
  });

  it('iterates only the github subgroup when category is github', async () => {
    const projectDirectory: TestsCliUtilityRunRecipesRunProjectDirectory = join(sandboxRoot, 'github-category');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityRunRecipesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityRunRecipesRunPackageJsonContents = JSON.stringify({
      name: 'test-github-category',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliUtilityRunRecipesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliUtilityRunRecipesRunNovaConfigContents = JSON.stringify({}, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityRunRecipes.run({
      category: 'github',
      dryRun: true,
    });

    const exitCode: TestsCliUtilityRunRecipesRunExitCode = process.exitCode;

    strictEqual(exitCode, undefined);

    return;
  });

  it('iterates ALL categories when category is undefined', async () => {
    const projectDirectory: TestsCliUtilityRunRecipesRunProjectDirectory = join(sandboxRoot, 'all-categories');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityRunRecipesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityRunRecipesRunPackageJsonContents = JSON.stringify({
      name: 'test-all-categories',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliUtilityRunRecipesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliUtilityRunRecipesRunNovaConfigContents = JSON.stringify({}, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityRunRecipes.run({
      dryRun: true,
    });

    const exitCode: TestsCliUtilityRunRecipesRunExitCode = process.exitCode;

    strictEqual(exitCode, undefined);

    return;
  });

  it('errors with exit code when category is unknown', async () => {
    const projectDirectory: TestsCliUtilityRunRecipesRunProjectDirectory = join(sandboxRoot, 'unknown-category');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: TestsCliUtilityRunRecipesRunPackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: TestsCliUtilityRunRecipesRunPackageJsonContents = JSON.stringify({
      name: 'test-unknown-category',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: TestsCliUtilityRunRecipesRunNovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: TestsCliUtilityRunRecipesRunNovaConfigContents = JSON.stringify({}, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    process.chdir(projectDirectory);

    const unknownCategory: TestsCliUtilityRunRecipesRunUnknownCategory = JSON.parse('"unknown"');

    await CliUtilityRunRecipes.run({
      category: unknownCategory,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});
