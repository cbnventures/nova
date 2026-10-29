import {
  ok,
  strictEqual,
} from 'node:assert/strict';
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

import {
  afterAll,
  describe,
  it,
} from 'vitest';

import { migrateEnvironmentProfiles } from '../../lib/env-profiles.js';

import type {
  Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_Environment,
  Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_OriginalEnv,
  Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_OriginalSample,
  Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_StagingContents,
  Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_WorkspaceDirectory,
  Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_WorkspaceEntries,
  Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_SandboxRoot,
} from '../../types/tests/lib/env-profiles.test.d.ts';

/**
 * Tests - Lib - Env Profiles - Migrate Environment Profiles.
 *
 * @since 0.36.0
 */
describe('migrateEnvironmentProfiles', async () => {
  const sandboxRoot: Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-env-profiles-'));

  afterAll(async () => {
    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('preserves original mode while profile files round trip reversibly', async () => {
    const workspaceDirectory: Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_WorkspaceDirectory = join(sandboxRoot, 'apps', 'worker');
    const originalEnv: Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_OriginalEnv = 'WORKER_TOKEN="real-token"\n';
    const originalSample: Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_OriginalSample = 'WORKER_TOKEN="sample-token"\n';
    const environment: Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_Environment = {
      workspaces: {
        './apps/worker': {
          prefix: 'WORKER_',
          variables: [{
            key: 'WORKER_TOKEN',
            secret: false,
            reach: 'runtime',
            defaultValue: 'sample-token',
          }],
        },
      },
    };

    await mkdir(workspaceDirectory, { recursive: true });
    await writeFile(join(workspaceDirectory, '.env'), originalEnv, 'utf-8');
    await writeFile(join(workspaceDirectory, '.env.sample'), originalSample, 'utf-8');
    await writeFile(join(workspaceDirectory, '.env.development'), 'OLD="development"\n', 'utf-8');
    await writeFile(join(workspaceDirectory, '.env.development.sample'), 'OLD="sample"\n', 'utf-8');

    await migrateEnvironmentProfiles({
      currentEnabled: false,
      environment,
      nextEnabled: true,
      rootDirectory: sandboxRoot,
    });

    strictEqual(await readFile(join(workspaceDirectory, '.env'), 'utf-8'), originalEnv);
    strictEqual(await readFile(join(workspaceDirectory, '.env.sample'), 'utf-8'), originalSample);
    strictEqual(await readFile(join(workspaceDirectory, '.env.development'), 'utf-8'), originalEnv);
    strictEqual(await readFile(join(workspaceDirectory, '.env.development.sample'), 'utf-8'), originalSample);

    const stagingContents: Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_StagingContents = await readFile(join(workspaceDirectory, '.env.staging'), 'utf-8');

    ok(stagingContents.includes('WORKER_TOKEN=""'));
    ok((await readFile(join(workspaceDirectory, '.env.staging.sample'), 'utf-8')).includes('WORKER_TOKEN="sample-token"'));
    ok((await readFile(join(workspaceDirectory, '.env.production'), 'utf-8')).includes('WORKER_TOKEN=""'));
    ok((await readFile(join(workspaceDirectory, '.env.production.sample'), 'utf-8')).includes('WORKER_TOKEN="sample-token"'));

    await migrateEnvironmentProfiles({
      currentEnabled: true,
      environment,
      nextEnabled: false,
      rootDirectory: sandboxRoot,
    });

    strictEqual(await readFile(join(workspaceDirectory, '.env'), 'utf-8'), originalEnv);
    strictEqual(await readFile(join(workspaceDirectory, '.env.sample'), 'utf-8'), originalSample);
    strictEqual(await readFile(join(workspaceDirectory, '.env.staging'), 'utf-8'), stagingContents);

    const workspaceEntries: Tests_Lib_EnvProfiles_MigrateEnvironmentProfiles_PreservesOriginalModeWhileProfileFilesRoundTripReversibly_WorkspaceEntries = await readdir(workspaceDirectory);

    ok(workspaceEntries.some((entry) => entry.startsWith('.env.development.') && entry.endsWith('.nova-backup')));
    ok(workspaceEntries.some((entry) => entry.startsWith('.env.') && entry.endsWith('.nova-backup')));

    return;
  });

  return;
});
