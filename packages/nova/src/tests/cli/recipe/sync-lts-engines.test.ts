import { notStrictEqual, ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { NodeReleases } from '@/api/node-releases.js';
import { CLIRecipeSyncLtsEngines } from '@/cli/recipe/sync-lts-engines.js';

import type {
  CLIRecipeSyncLtsEnginesTestOriginalCwd,
  CLIRecipeSyncLtsEnginesTestSandboxRoot,
} from '@/types/tests/cli/recipe/sync-lts-engines.test.d.ts';

/**
 * CLI Recipe - Sync LTS Engines - Run.
 *
 * @since 1.0.0
 */
test('CLIRecipeSyncLtsEngines.run', async (context) => {
  const originalCwd: CLIRecipeSyncLtsEnginesTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIRecipeSyncLtsEnginesTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    process.exitCode = undefined;

    NodeReleases.resetForTesting();

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('creates engines.node when engines field does not exist', async () => {
    const projectRoot = join(sandboxRoot, 'create-engines');

    await mkdir(projectRoot, { recursive: true });

    const novaConfigJson = JSON.stringify({
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          syncLtsEngines: true,
        },
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'nova.config.json'),
      novaConfigJson,
      'utf-8',
    );

    const packageJson = JSON.stringify({
      name: 'project',
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CLIRecipeSyncLtsEngines.run({ replaceFile: true });

    const written = JSON.parse(await readFile(join(realProjectRoot, 'package.json'), 'utf-8'));

    const writtenEngines = written.engines;

    notStrictEqual(writtenEngines, undefined);
    ok(typeof writtenEngines.node === 'string');
    ok(writtenEngines.node.includes('^'));
  });

  await context.test('updates engines.node when it differs from current LTS', async () => {
    const projectRoot = join(sandboxRoot, 'update-engines');

    await mkdir(projectRoot, { recursive: true });

    const novaConfigJson = JSON.stringify({
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          syncLtsEngines: true,
        },
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'nova.config.json'),
      novaConfigJson,
      'utf-8',
    );

    const packageJson = JSON.stringify({
      name: 'project',
      engines: {
        node: '^16',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CLIRecipeSyncLtsEngines.run({ replaceFile: true });

    const written = JSON.parse(await readFile(join(realProjectRoot, 'package.json'), 'utf-8'));

    notStrictEqual(written.engines.node, '^16');
    ok(written.engines.node.includes('||'));
  });

  await context.test('skips workspaces without syncLtsEngines enabled', async () => {
    const projectRoot = join(sandboxRoot, 'skip-disabled');

    await mkdir(projectRoot, { recursive: true });

    const novaConfigJson = JSON.stringify({
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
        },
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'nova.config.json'),
      novaConfigJson,
      'utf-8',
    );

    const packageJson = JSON.stringify({
      name: 'project',
      engines: {
        node: '^16',
      },
    }, null, 2);
    const originalContents = `${packageJson}\n`;

    await writeFile(
      join(projectRoot, 'package.json'),
      originalContents,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CLIRecipeSyncLtsEngines.run({ replaceFile: true });

    const afterContents = await readFile(join(realProjectRoot, 'package.json'), 'utf-8');

    strictEqual(afterContents, originalContents);
  });

  await context.test('does not write files in dry-run mode', async () => {
    const projectRoot = join(sandboxRoot, 'dry-run');

    await mkdir(projectRoot, { recursive: true });

    const novaConfigJson = JSON.stringify({
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          syncLtsEngines: true,
        },
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'nova.config.json'),
      novaConfigJson,
      'utf-8',
    );

    const packageJson = JSON.stringify({
      name: 'project',
      engines: {
        node: '^16',
      },
    }, null, 2);
    const originalContents = `${packageJson}\n`;

    await writeFile(
      join(projectRoot, 'package.json'),
      originalContents,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CLIRecipeSyncLtsEngines.run({ dryRun: true });

    const afterContents = await readFile(join(realProjectRoot, 'package.json'), 'utf-8');

    strictEqual(afterContents, originalContents);
  });
});
