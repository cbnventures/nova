import { deepStrictEqual } from 'node:assert/strict';
import {
  mkdir, mkdtemp, rm, writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as LibNovaConfig } from '../../lib/nova-config.js';

import type {
  Tests_Lib_NovaConfigRunWorkspacesCache_Config,
  Tests_Lib_NovaConfigRunWorkspacesCache_ConfigContents,
  Tests_Lib_NovaConfigRunWorkspacesCache_Loaded,
  Tests_Lib_NovaConfigRunWorkspacesCache_NovaConfigRunWorkspacesCache_ReadsTheCompleteWorkspaceRunnerSettingsContract_Returns,
  Tests_Lib_NovaConfigRunWorkspacesCache_OriginalCwd,
  Tests_Lib_NovaConfigRunWorkspacesCache_ProjectDirectory,
  Tests_Lib_NovaConfigRunWorkspacesCache_SandboxRoot,
  Tests_Lib_NovaConfigRunWorkspacesCache_TemporaryDirectory,
  Tests_Lib_NovaConfigRunWorkspacesCache_TemporaryPrefix,
} from '../../types/tests/lib/nova-config-run-workspaces-cache.test.d.ts';

/**
 * Tests - Lib - Nova Config Run Workspaces Cache - Nova Config Run-workspaces Cache.
 *
 * @since 0.32.0
 */
describe('Nova config run-workspaces cache', async () => {
  const originalCwd: Tests_Lib_NovaConfigRunWorkspacesCache_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Lib_NovaConfigRunWorkspacesCache_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Lib_NovaConfigRunWorkspacesCache_TemporaryPrefix = join(temporaryDirectory, 'nova-config-cache-');
  const sandboxRoot: Tests_Lib_NovaConfigRunWorkspacesCache_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('reads the complete workspace runner settings contract', async (): Tests_Lib_NovaConfigRunWorkspacesCache_NovaConfigRunWorkspacesCache_ReadsTheCompleteWorkspaceRunnerSettingsContract_Returns => {
    const projectDirectory: Tests_Lib_NovaConfigRunWorkspacesCache_ProjectDirectory = join(sandboxRoot, 'valid');
    const configContents: Tests_Lib_NovaConfigRunWorkspacesCache_ConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'cache-contract',
          title: 'Cache Contract',
        },
      },
      settings: {
        runWorkspaces: {
          cache: {
            directory: './.cache/workspaces',
            enabled: false,
            scripts: [
              'build',
              'check',
              'docs',
            ],
          },
          concurrency: {
            build: 2,
            check: 3,
          },
        },
      },
    }, null, 2);

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'nova.config.json'), `${configContents}\n`, 'utf-8');

    process.chdir(projectDirectory);

    const config: Tests_Lib_NovaConfigRunWorkspacesCache_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigRunWorkspacesCache_Loaded = await config.load();

    deepStrictEqual(loaded['settings'], {
      runWorkspaces: {
        cache: {
          directory: './.cache/workspaces',
          enabled: false,
          scripts: [
            'build',
            'check',
            'docs',
          ],
        },
        concurrency: {
          build: 2,
          check: 3,
        },
      },
    });

    return;
  });

  return;
});
