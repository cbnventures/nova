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
import { test } from 'node:test';

import { CLIRecipePackageJsonNormalizeModules } from '@/cli/recipe/package-json/normalize-modules.js';

import type {
  CLIRecipePackageJsonNormalizeModulesTestOriginalCwd,
  CLIRecipePackageJsonNormalizeModulesTestSandboxRoot,
} from '@/types/tests/cli/recipe/package-json/normalize-modules.test.d.ts';

/**
 * CLI Recipe - package.json - Normalize Modules - Run.
 *
 * @since 1.0.0
 */
test('CLIRecipePackageJsonNormalizeModules.run', async (context) => {
  const originalCwd: CLIRecipePackageJsonNormalizeModulesTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIRecipePackageJsonNormalizeModulesTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

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

    await CLIRecipePackageJsonNormalizeModules.run({});

    strictEqual(process.exitCode, 1);
  });

  await context.test('skips when no workspaces have the recipe enabled', async () => {
    const projectDir = join(sandboxRoot, 'no-recipe');
    const workspaceDir = join(projectDir, 'packages', 'core');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-no-recipe',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          './packages/core': {
            name: '@test/core',
            role: 'package',
            policy: 'distributable',
          },
        },
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: '@test/core',
        version: '1.0.0',
        exports: './build/index.js',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeModules.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The exports should not have been normalized because the recipe is not enabled.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['exports'], './build/index.js');
  });

  await context.test('normalizes string exports to object for package role', async () => {
    const projectDir = join(sandboxRoot, 'normalize-exports');
    const workspaceDir = join(projectDir, 'packages', 'core');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-normalize-exports',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          './packages/core': {
            name: '@test/core',
            role: 'package',
            policy: 'distributable',
            recipes: {
              'normalize-modules': [true],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: '@test/core',
        version: '1.0.0',
        exports: './build/index.js',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeModules.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    deepStrictEqual(parsed['exports'], {
      '.': {
        default: './build/index.js',
      },
    });
  });

  await context.test('removes exports from non-package role', async () => {
    const projectDir = join(sandboxRoot, 'remove-exports');
    const workspaceDir = join(projectDir, 'apps', 'docs');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-remove-exports',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          './apps/docs': {
            name: 'test-docs',
            role: 'docs',
            policy: 'freezable',
            recipes: {
              'normalize-modules': [true],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: 'test-docs',
        version: '0.0.0',
        exports: './build/index.js',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeModules.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['exports'], undefined);
  });

  await context.test('does not modify files during dry run', async () => {
    const projectDir = join(sandboxRoot, 'dry-run');
    const workspaceDir = join(projectDir, 'packages', 'core');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-dry-run',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          './packages/core': {
            name: '@test/core',
            role: 'package',
            policy: 'distributable',
            recipes: {
              'normalize-modules': [true],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: '@test/core',
        version: '1.0.0',
        exports: './build/index.js',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeModules.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['exports'], './build/index.js');
  });
});
