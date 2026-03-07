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
import { test } from 'node:test';

import { CLIRecipePackageJsonNormalizeBundler } from '@/cli/recipe/package-json/normalize-bundler.js';

import type {
  CLIRecipePackageJsonNormalizeBundlerTestOriginalCwd,
  CLIRecipePackageJsonNormalizeBundlerTestSandboxRoot,
} from '@/types/tests/cli/recipe/package-json/normalize-bundler.test.d.ts';

/**
 * CLI Recipe - package.json - Normalize Bundler - Run.
 *
 * @since 1.0.0
 */
test('CLIRecipePackageJsonNormalizeBundler.run', async (context) => {
  const originalCwd: CLIRecipePackageJsonNormalizeBundlerTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIRecipePackageJsonNormalizeBundlerTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

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

    await CLIRecipePackageJsonNormalizeBundler.run({});

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
        typings: './build/index.d.ts',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeBundler.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The typings should not have been renamed because the recipe is not enabled.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['typings'], './build/index.d.ts');
  });

  await context.test('renames typings to types', async () => {
    const projectDir = join(sandboxRoot, 'rename-typings');
    const workspaceDir = join(projectDir, 'packages', 'core');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-rename-typings',
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
              'normalize-bundler': [true],
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
        typings: './build/index.d.ts',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeBundler.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['typings'], undefined);
    strictEqual(parsed['types'], './build/index.d.ts');
  });

  await context.test('removes sideEffects from non-package role', async () => {
    const projectDir = join(sandboxRoot, 'remove-side-effects');
    const workspaceDir = join(projectDir, 'apps', 'docs');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-remove-side-effects',
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
              'normalize-bundler': [true],
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
        sideEffects: false,
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeBundler.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['sideEffects'], undefined);
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
              'normalize-bundler': [true],
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
        typings: './build/index.d.ts',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeBundler.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['typings'], './build/index.d.ts');
  });
});
