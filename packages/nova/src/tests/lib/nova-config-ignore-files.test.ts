import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  it,
} from 'vitest';

import { Runner as LibNovaConfig } from '../../lib/nova-config.js';

import type {
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_Config,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_ConfigContents,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_ConfigPath,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_Loaded,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_ProjectDirectory,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_OriginalCwd,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_Config,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_ConfigContents,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_ConfigPath,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_Loaded,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_ProjectDirectory,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_SandboxPrefix,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_SandboxRoot,
  Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_TemporaryDirectory,
} from '../../types/tests/lib/nova-config-ignore-files.test.d.ts';

/**
 * Tests - Lib - Nova Config Ignore Files - Shared_NovaConfig IgnoreFiles.
 *
 * Confirms the public path-keyed configuration survives parsing for each
 * supported physical ignore-file surface.
 *
 * @since 0.32.0
 */
describe('Shared_NovaConfig ignoreFiles', async () => {
  const originalCwd: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_SandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('loads every supported physical ignore file', async () => {
    const projectDirectory: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_ProjectDirectory = join(sandboxRoot, 'supported');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_ConfigContents = JSON.stringify({
      ignoreFiles: {
        './.gitignore': {
          bundles: ['nova'],
          patterns: [
            'graphify-out/',
            '',
          ],
        },
        './apps/api/.dockerignore': {
          bundles: ['nova'],
          patterns: ['local-output/'],
        },
        './apps/site/public/.assetsignore': {
          bundles: ['cloudflare-astro'],
          patterns: [],
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_LoadsEverySupportedPhysicalIgnoreFile_Loaded = await config.load();

    deepStrictEqual(loaded['ignoreFiles'], {
      './.gitignore': {
        bundles: ['nova'],
        patterns: ['graphify-out/'],
      },
      './apps/api/.dockerignore': {
        bundles: ['nova'],
        patterns: ['local-output/'],
      },
      './apps/site/public/.assetsignore': {
        bundles: ['cloudflare-astro'],
        patterns: [],
      },
    });

    return;
  });

  it('rejects the former gitignore shape', async () => {
    const projectDirectory: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_ProjectDirectory = join(sandboxRoot, 'former-shape');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_ConfigContents = JSON.stringify({
      gitignore: {
        projectExcludes: ['graphify-out/'],
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigIgnoreFiles_SharedNovaConfigIgnoreFiles_RejectsTheFormerGitignoreShape_Loaded = await config.load();

    strictEqual(loaded['ignoreFiles'], undefined);

    return;
  });

  return;
});
