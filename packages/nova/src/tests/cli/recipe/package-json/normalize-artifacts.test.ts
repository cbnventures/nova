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

import { CLIRecipePackageJsonNormalizeArtifacts } from '@/cli/recipe/package-json/normalize-artifacts.js';

import type {
  CLIRecipePackageJsonNormalizeArtifactsTestOriginalCwd,
  CLIRecipePackageJsonNormalizeArtifactsTestSandboxRoot,
} from '@/types/tests/cli/recipe/package-json/normalize-artifacts.test.d.ts';

/**
 * CLI Recipe - package.json - Normalize Artifacts - Run.
 *
 * @since 1.0.0
 */
test('CLIRecipePackageJsonNormalizeArtifacts.run', async (context) => {
  const originalCwd: CLIRecipePackageJsonNormalizeArtifactsTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIRecipePackageJsonNormalizeArtifactsTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

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

    await CLIRecipePackageJsonNormalizeArtifacts.run({});

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
        bin: './build/cli.js',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeArtifacts.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The bin should not have been normalized because the recipe is not enabled.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['bin'], './build/cli.js');
  });

  await context.test('normalizes string bin to object for package role', async () => {
    const projectDir = join(sandboxRoot, 'normalize-bin');
    const workspaceDir = join(projectDir, 'packages', 'core');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-normalize-bin',
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
              'normalize-artifacts': [true],
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
        bin: './build/cli.js',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeArtifacts.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    deepStrictEqual(parsed['bin'], {
      core: './build/cli.js',
    });
  });

  await context.test('sets private to true for non-distributable workspace', async () => {
    const projectDir = join(sandboxRoot, 'sync-private');
    const workspaceDir = join(projectDir, 'apps', 'docs');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-sync-private',
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
              'normalize-artifacts': [true],
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
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeArtifacts.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['private'], true);
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
              'normalize-artifacts': [true],
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
        bin: './build/cli.js',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonNormalizeArtifacts.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['bin'], './build/cli.js');
  });
});
