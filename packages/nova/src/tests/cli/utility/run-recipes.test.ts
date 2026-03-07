import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { CLIUtilityRunRecipes } from '@/cli/utility/run-recipes.js';

import type {
  CLIUtilityRunRecipesTestOriginalCwd,
  CLIUtilityRunRecipesTestSandboxRoot,
} from '@/types/tests/cli/utility/run-recipes.test.d.ts';

/**
 * CLI Utility - Run Recipes - Run.
 *
 * @since 1.0.0
 */
test('CLIUtilityRunRecipes.run', async (context) => {
  const originalCwd: CLIUtilityRunRecipesTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIUtilityRunRecipesTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('sets exit code when not at project root', async () => {
    const projectDir = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDir, { recursive: true });

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityRunRecipes.run({});

    strictEqual(process.exitCode, 1);
  });

  await context.test('skips when no workspaces are configured', async () => {
    const projectDir = join(sandboxRoot, 'no-workspaces');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-no-workspaces',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({}, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityRunRecipes.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);
  });
});
