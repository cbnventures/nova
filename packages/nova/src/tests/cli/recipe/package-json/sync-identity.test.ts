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

import { CLIRecipePackageJsonSyncIdentity } from '@/cli/recipe/package-json/sync-identity.js';

import type {
  CLIRecipePackageJsonSyncIdentityTestOriginalCwd,
  CLIRecipePackageJsonSyncIdentityTestSandboxRoot,
} from '@/types/tests/cli/recipe/package-json/sync-identity.test.d.ts';

/**
 * CLI Recipe - package.json - Sync Identity - Run.
 *
 * @since 1.0.0
 */
test('CLIRecipePackageJsonSyncIdentity.run', async (context) => {
  const originalCwd: CLIRecipePackageJsonSyncIdentityTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIRecipePackageJsonSyncIdentityTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

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

    await CLIRecipePackageJsonSyncIdentity.run({});

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
        name: 'wrong-name',
        version: '1.0.0',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The name should not have been synced because the recipe is not enabled.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['name'], 'wrong-name');
  });

  await context.test('syncs name from workspace manifest', async () => {
    const projectDir = join(sandboxRoot, 'sync-name');
    const workspaceDir = join(projectDir, 'packages', 'core');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-sync-name',
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
              'sync-identity': [true],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: 'wrong-name',
        version: '1.0.0',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['name'], '@test/core');
  });

  await context.test('sets freezable workspace version to 0.0.0', async () => {
    const projectDir = join(sandboxRoot, 'freezable-version');
    const workspaceDir = join(projectDir, 'packages', 'config');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-freezable',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          './packages/config': {
            name: 'test-config',
            role: 'config',
            policy: 'freezable',
            recipes: {
              'sync-identity': [true],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: 'test-config',
        version: '1.2.3',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['version'], '0.0.0');
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
              'sync-identity': [true],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: 'wrong-name',
        version: '1.0.0',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonSyncIdentity.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['name'], 'wrong-name');
  });
});
