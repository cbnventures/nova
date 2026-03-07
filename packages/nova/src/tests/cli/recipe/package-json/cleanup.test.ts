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

import { CLIRecipePackageJsonCleanup } from '@/cli/recipe/package-json/cleanup.js';

import type {
  CLIRecipePackageJsonCleanupTestOriginalCwd,
  CLIRecipePackageJsonCleanupTestSandboxRoot,
} from '@/types/tests/cli/recipe/package-json/cleanup.test.d.ts';

/**
 * CLI Recipe - package.json - Cleanup - Run.
 *
 * @since 1.0.0
 */
test('CLIRecipePackageJsonCleanup.run', async (context) => {
  const originalCwd: CLIRecipePackageJsonCleanupTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIRecipePackageJsonCleanupTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

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

    await CLIRecipePackageJsonCleanup.run({});

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
        customField: 'should-stay',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The custom field should still be there because the recipe is not enabled.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay');
  });

  await context.test('reorders package.json keys in defined sort order', async () => {
    const projectDir = join(sandboxRoot, 'reorder');
    const workspaceDir = join(projectDir, 'packages', 'core');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-reorder',
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
              'cleanup': [true],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    // Write package.json with keys in wrong order.
    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        license: 'MIT',
        version: '1.0.0',
        name: '@test/core',
        description: 'Test package',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);
    const keys = Object.keys(parsed);

    // "name" should come before "version", "version" before "description", "description" before "license".
    const nameIndex = keys.indexOf('name');
    const versionIndex = keys.indexOf('version');
    const descriptionIndex = keys.indexOf('description');
    const licenseIndex = keys.indexOf('license');

    strictEqual(nameIndex < versionIndex, true);
    strictEqual(versionIndex < descriptionIndex, true);
    strictEqual(descriptionIndex < licenseIndex, true);
  });

  await context.test('removes unknown keys from package.json', async () => {
    const projectDir = join(sandboxRoot, 'unknown-keys');
    const workspaceDir = join(projectDir, 'packages', 'lib');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-unknown',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          './packages/lib': {
            name: '@test/lib',
            role: 'package',
            policy: 'distributable',
            recipes: {
              'cleanup': [true],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    // Write package.json with an unknown key.
    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: '@test/lib',
        version: '1.0.0',
        customField: 'should-be-removed',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['customField'], undefined);
    strictEqual(parsed['name'], '@test/lib');
  });

  await context.test('keeps unknown keys when removeUnknownKeys is disabled via settings', async () => {
    const projectDir = join(sandboxRoot, 'keep-unknown');
    const workspaceDir = join(projectDir, 'packages', 'keep');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-keep-unknown',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          './packages/keep': {
            name: '@test/keep',
            role: 'package',
            policy: 'distributable',
            recipes: {
              'cleanup': [true, { removeUnknownKeys: false }],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: '@test/keep',
        version: '1.0.0',
        customField: 'should-stay',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay');
  });

  await context.test('skips reordering when reorderKeys is disabled via settings', async () => {
    const projectDir = join(sandboxRoot, 'skip-sort');
    const workspaceDir = join(projectDir, 'packages', 'unsorted');

    await mkdir(workspaceDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-skip-sort',
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          './packages/unsorted': {
            name: '@test/unsorted',
            role: 'package',
            policy: 'distributable',
            recipes: {
              'cleanup': [true, { reorderKeys: false }],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    // Write package.json with keys in wrong order.
    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        license: 'MIT',
        name: '@test/unsorted',
        version: '1.0.0',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonCleanup.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);
    const keys = Object.keys(parsed);

    // Keys should remain in original order since sorting is skipped.
    deepStrictEqual(keys[0], 'license');
    deepStrictEqual(keys[1], 'name');
    deepStrictEqual(keys[2], 'version');
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
              'cleanup': [true],
            },
          },
        },
      }, null, 2),
      'utf-8',
    );

    // Write package.json with an unknown key.
    await writeFile(
      join(workspaceDir, 'package.json'),
      JSON.stringify({
        name: '@test/core',
        version: '1.0.0',
        customField: 'should-stay-in-dry-run',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIRecipePackageJsonCleanup.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const parsed = JSON.parse(output);

    strictEqual(parsed['customField'], 'should-stay-in-dry-run');
  });
});
