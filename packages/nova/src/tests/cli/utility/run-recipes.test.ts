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

import { Runner as CliUtilityRunRecipes } from '../../../cli/utility/run-recipes.js';

import type {
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_ExitCode,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_NovaConfigContents,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_NovaConfigPath,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_PackageJsonContents,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_PackageJsonPath,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_ProjectDirectory,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_OriginalCwd,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SandboxRoot,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_NovaConfigContents,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_NovaConfigPath,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_PackageJsonContents,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_PackageJsonPath,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_ProjectDirectory,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_TemporaryDirectory,
  Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_TemporaryPrefix,
} from '../../../types/tests/cli/utility/run-recipes.test.d.ts';

/**
 * Tests - CLI - Utility - Run Recipes - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityRunRecipes.run', async () => {
  const originalCwd: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliUtilityRunRecipes.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces are configured', async () => {
    const projectDirectory: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_ProjectDirectory = join(sandboxRoot, 'no-workspaces');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_PackageJsonContents = JSON.stringify({
      name: 'test-no-workspaces',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_SkipsWhenNoWorkspacesAreConfigured_NovaConfigContents = JSON.stringify({}, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityRunRecipes.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('iterates all registered categories', async () => {
    const projectDirectory: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_ProjectDirectory = join(sandboxRoot, 'all-categories');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_PackageJsonContents = JSON.stringify({
      name: 'test-all-categories',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_NovaConfigContents = JSON.stringify({}, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityRunRecipes.run({
      dryRun: true,
    });

    const exitCode: Tests_Cli_Utility_RunRecipes_CliUtilityRunRecipesRun_IteratesAllRegisteredCategories_ExitCode = process.exitCode;

    strictEqual(exitCode, undefined);

    return;
  });

  return;
});
