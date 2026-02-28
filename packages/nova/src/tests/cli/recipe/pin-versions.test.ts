import { strictEqual } from 'node:assert/strict';
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

import { CLIRecipePinVersions } from '@/cli/recipe/pin-versions.js';

import type {
  CLIRecipePinVersionsTestOriginalCwd,
  CLIRecipePinVersionsTestSandboxRoot,
} from '@/types/tests/cli/recipe/pin-versions.test.d.ts';

/**
 * CLI Recipe - Pin Versions - Run.
 *
 * @since 1.0.0
 */
test('CLIRecipePinVersions.run', async (context) => {
  const originalCwd: CLIRecipePinVersionsTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIRecipePinVersionsTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('strips caret prefix from dependencies', async () => {
    const projectRoot = join(sandboxRoot, 'strip-caret');

    await mkdir(projectRoot, { recursive: true });

    // Create nova.config.json with pinVersions enabled.
    const novaConfigJson = JSON.stringify({
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          pinVersions: true,
        },
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'nova.config.json'),
      novaConfigJson,
      'utf-8',
    );

    // Create package.json with caret versions.
    const packageJson = JSON.stringify({
      name: 'project',
      dependencies: {
        'some-dep': '^1.2.3',
        'another-dep': '~4.5.6',
      },
      devDependencies: {
        'dev-dep': '^7.8.9',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CLIRecipePinVersions.run({ replaceFile: true });

    const written = JSON.parse(await readFile(join(realProjectRoot, 'package.json'), 'utf-8'));

    strictEqual(written.dependencies['some-dep'], '1.2.3');
    strictEqual(written.dependencies['another-dep'], '4.5.6');
    strictEqual(written.devDependencies['dev-dep'], '7.8.9');
  });

  await context.test('leaves already-pinned versions unchanged', async () => {
    const projectRoot = join(sandboxRoot, 'already-pinned');

    await mkdir(projectRoot, { recursive: true });

    const novaConfigJson = JSON.stringify({
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          pinVersions: true,
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
      dependencies: {
        'pinned-dep': '1.2.3',
        'file-dep': 'file:../local',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CLIRecipePinVersions.run({ replaceFile: true });

    const written = JSON.parse(await readFile(join(realProjectRoot, 'package.json'), 'utf-8'));

    strictEqual(written.dependencies['pinned-dep'], '1.2.3');
    strictEqual(written.dependencies['file-dep'], 'file:../local');
  });

  await context.test('sets exit code 1 for unpinnable versions', async () => {
    const projectRoot = join(sandboxRoot, 'unpinnable');

    await mkdir(projectRoot, { recursive: true });

    const novaConfigJson = JSON.stringify({
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          pinVersions: true,
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
      dependencies: {
        'wild-dep': '*',
        'latest-dep': 'latest',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    process.exitCode = undefined;

    await CLIRecipePinVersions.run({ replaceFile: true });

    strictEqual(process.exitCode, 1);
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
          pinVersions: true,
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
      dependencies: {
        'some-dep': '^1.2.3',
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

    await CLIRecipePinVersions.run({ dryRun: true });

    const afterContents = await readFile(join(realProjectRoot, 'package.json'), 'utf-8');

    strictEqual(afterContents, originalContents);
  });

  await context.test('skips workspaces without pinVersions enabled', async () => {
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
      dependencies: {
        'some-dep': '^1.2.3',
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

    await CLIRecipePinVersions.run({ replaceFile: true });

    const afterContents = await readFile(join(realProjectRoot, 'package.json'), 'utf-8');

    strictEqual(afterContents, originalContents);
  });

  await context.test('strips >= > <= < prefixes', async () => {
    const projectRoot = join(sandboxRoot, 'range-prefixes');

    await mkdir(projectRoot, { recursive: true });

    const novaConfigJson = JSON.stringify({
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          pinVersions: true,
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
      dependencies: {
        'gte-dep': '>=1.0.0',
        'gt-dep': '>2.0.0',
        'lte-dep': '<=3.0.0',
        'lt-dep': '<4.0.0',
      },
    }, null, 2);

    await writeFile(
      join(projectRoot, 'package.json'),
      `${packageJson}\n`,
      'utf-8',
    );

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    await CLIRecipePinVersions.run({ replaceFile: true });

    const written = JSON.parse(await readFile(join(realProjectRoot, 'package.json'), 'utf-8'));

    strictEqual(written.dependencies['gte-dep'], '1.0.0');
    strictEqual(written.dependencies['gt-dep'], '2.0.0');
    strictEqual(written.dependencies['lte-dep'], '3.0.0');
    strictEqual(written.dependencies['lt-dep'], '4.0.0');
  });
});
