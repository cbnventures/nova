import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { CLIUtilityChangelog } from '@/cli/utility/changelog.js';

import type {
  CLIUtilityChangelogTestOriginalCwd,
  CLIUtilityChangelogTestSandboxRoot,
} from '@/types/tests/cli/utility/changelog.test.d.ts';

/**
 * CLI Utility - Changelog - Run.
 *
 * @since 1.0.0
 */
test('CLIUtilityChangelog.run', async (context) => {
  const originalCwd: CLIUtilityChangelogTestOriginalCwd = process.cwd();
  const sandboxRoot: CLIUtilityChangelogTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('errors when --record and --release are both set', async () => {
    const projectDir = join(sandboxRoot, 'both-flags');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-both-flags',
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

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityChangelog.run({
      record: true,
      release: true,
    });

    strictEqual(process.exitCode, 1);
  });

  await context.test('errors when partial non-interactive flags', async () => {
    const projectDir = join(sandboxRoot, 'partial-flags');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-partial-flags',
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

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityChangelog.run({
      record: true,
      package: '@test/core',
    });

    strictEqual(process.exitCode, 1);
  });

  await context.test('records entry in non-interactive mode', async () => {
    const projectDir = join(sandboxRoot, 'record-entry');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-record-entry',
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

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'added',
      bump: 'minor',
      message: 'Added new feature',
    });

    strictEqual(process.exitCode, undefined);

    const changelogDir = join(projectDir, '.changelog');
    const files = await readdir(changelogDir);
    const mdFiles = files.filter((file) => file.endsWith('.md') && file !== 'README.md');

    strictEqual(mdFiles.length, 1);

    const content = await readFile(join(changelogDir, mdFiles[0] as string), 'utf-8');

    strictEqual(content.includes('package: "@test/core"'), true);
    strictEqual(content.includes('category: added'), true);
    strictEqual(content.includes('bump: minor'), true);
    strictEqual(content.includes('Added new feature'), true);
  });

  await context.test('errors when package is invalid', async () => {
    const projectDir = join(sandboxRoot, 'invalid-package');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-invalid-package',
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

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityChangelog.run({
      record: true,
      package: '@test/nonexistent',
      category: 'added',
      bump: 'minor',
      message: 'Some change',
    });

    strictEqual(process.exitCode, 1);
  });

  await context.test('errors when category is invalid', async () => {
    const projectDir = join(sandboxRoot, 'invalid-category');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-invalid-category',
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

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'invalid-category',
      bump: 'minor',
      message: 'Some change',
    });

    strictEqual(process.exitCode, 1);
  });

  await context.test('errors when bump is invalid', async () => {
    const projectDir = join(sandboxRoot, 'invalid-bump');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-invalid-bump',
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

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'added',
      bump: 'invalid-bump',
      message: 'Some change',
    });

    strictEqual(process.exitCode, 1);
  });

  await context.test('errors when message is empty', async () => {
    const projectDir = join(sandboxRoot, 'empty-message');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-empty-message',
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

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'added',
      bump: 'minor',
      message: '   ',
    });

    strictEqual(process.exitCode, 1);
  });

  await context.test('releases and bumps version', async () => {
    const projectDir = join(sandboxRoot, 'release-bump');
    const workspaceDir = join(projectDir, 'packages', 'core');
    const changelogDir = join(projectDir, '.changelog');

    await mkdir(workspaceDir, { recursive: true });
    await mkdir(changelogDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-release-bump',
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
      }, null, 2),
      'utf-8',
    );

    await writeFile(
      join(changelogDir, 'test-entry.md'),
      [
        '---',
        'package: "@test/core"',
        'category: added',
        'bump: minor',
        '---',
        '',
        'Added a new feature',
        '',
      ].join('\n'),
      'utf-8',
    );

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    const packageJsonRaw = await readFile(join(workspaceDir, 'package.json'), 'utf-8');
    const packageJson = JSON.parse(packageJsonRaw);

    strictEqual(packageJson['version'], '1.1.0');

    const changelogContent = await readFile(join(workspaceDir, 'CHANGELOG.md'), 'utf-8');

    strictEqual(changelogContent.includes('## 1.1.0'), true);
    strictEqual(changelogContent.includes('Added a new feature'), true);

    const remainingFiles = await readdir(changelogDir);
    const remainingMdFiles = remainingFiles.filter((file) => file.endsWith('.md') && file !== 'README.md');

    strictEqual(remainingMdFiles.length, 0);
  });

  await context.test('skips release when no entries exist', async () => {
    const projectDir = join(sandboxRoot, 'no-entries');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'package.json'),
      JSON.stringify({
        name: 'test-no-entries',
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

    process.chdir(projectDir);

    process.exitCode = undefined;

    await CLIUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);
  });
});
