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

import { CLIRecipePackageJsonSyncOwnership } from '@/cli/recipe/package-json/sync-ownership.js';

import type {
  CLIRecipePackageJsonSyncOwnershipTestOriginalCwd,
  CLIRecipePackageJsonSyncOwnershipTestSandboxRoot,
} from '@/types/tests/cli/recipe/package-json/sync-ownership.test.d.ts';

/**
 * CLI Recipe - package.json - Sync Ownership - Run.
 *
 * @since 1.0.0
 */
test('CLIRecipePackageJsonSyncOwnership.run', async (context) => {
  const originalCwd: CLIRecipePackageJsonSyncOwnershipTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIRecipePackageJsonSyncOwnershipTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

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

    await CLIRecipePackageJsonSyncOwnership.run({});

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
        homepage: 'https://old.example.com',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonSyncOwnership.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The homepage should not have been changed because the recipe is not enabled.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['homepage'], 'https://old.example.com');
  });

  await context.test('syncs homepage from nova config', async () => {
    const projectDir = join(sandboxRoot, 'sync-homepage');
    const workspaceDir = join(projectDir, 'packages', 'core');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-sync-homepage',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        urls: {
          homepage: 'https://example.com',
        },
        workspaces: {
          './packages/core': {
            name: '@test/core',
            role: 'package',
            policy: 'distributable',
            recipes: {
              'sync-ownership': [true, { homepage: true }],
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
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonSyncOwnership.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['homepage'], 'https://example.com');
  });

  await context.test('removes homepage from non-distributable workspace', async () => {
    const projectDir = join(sandboxRoot, 'remove-homepage');
    const workspaceDir = join(projectDir, 'apps', 'docs');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-remove-homepage',
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
              'sync-ownership': [true],
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
        homepage: 'https://should-be-removed.com',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonSyncOwnership.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['homepage'], undefined);
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
        urls: {
          homepage: 'https://example.com',
        },
        workspaces: {
          './packages/core': {
            name: '@test/core',
            role: 'package',
            policy: 'distributable',
            recipes: {
              'sync-ownership': [true, { homepage: true }],
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
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonSyncOwnership.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['homepage'], undefined);
  });
});
