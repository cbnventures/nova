import { strictEqual } from 'node:assert/strict';
import { existsSync } from 'node:fs';
import {
  mkdtemp,
  realpath,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as CliUtilityCrossEnv } from '../../../cli/utility/cross-env.js';

import type {
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_LeavesTheExitCodeUnsetWhenTheCommandSucceeds_OriginalExitCode,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_LeavesTheExitCodeUnsetWhenTheCommandSucceeds_ResultExitCode,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_SetsTheVariableAndForwardsTheExitCode_OriginalExitCode,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_SetsTheVariableAndForwardsTheExitCode_ResultExitCode,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_AddedListeners,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_Deadline,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ListenerCountAfter,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ListenerCountBefore,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ListenersBefore,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ReadyPath,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_Result,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ResultPromise,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_Script,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ResolveBinaryPath,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SandboxDirectory,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SandboxRoot,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SpawnCrossEnv,
  Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_TemporaryPrefix,
} from '../../../types/tests/cli/utility/cross-env.test.d.ts';

/**
 * Tests - CLI - Utility - Cross Env - Run.
 *
 * @since 0.49.0
 */
describe('CliUtilityCrossEnv.run', () => {
  it('sets the variable and forwards the exit code', async () => {
    const originalExitCode: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_SetsTheVariableAndForwardsTheExitCode_OriginalExitCode = process.exitCode;

    await CliUtilityCrossEnv.run({
      commandArguments: [
        'NOVA_CROSS_ENV_SAMPLE=fake-value',
        process.execPath,
        '-e',
        'process.exit(process.env.NOVA_CROSS_ENV_SAMPLE === "fake-value" ? 7 : 1)',
      ],
    });

    const resultExitCode: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_SetsTheVariableAndForwardsTheExitCode_ResultExitCode = process.exitCode;

    process.exitCode = originalExitCode;

    strictEqual(resultExitCode, 7);

    return;
  });

  it('leaves the exit code unset when the command succeeds', async () => {
    const originalExitCode: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_LeavesTheExitCodeUnsetWhenTheCommandSucceeds_OriginalExitCode = process.exitCode;

    await CliUtilityCrossEnv.run({
      commandArguments: [
        process.execPath,
        '-e',
        'process.exit(0)',
      ],
    });

    const resultExitCode: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_LeavesTheExitCodeUnsetWhenTheCommandSucceeds_ResultExitCode = process.exitCode;

    process.exitCode = originalExitCode;

    strictEqual(resultExitCode, originalExitCode);

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Cross Env - Spawn Cross Env.
 *
 * @since 0.49.0
 */
describe('CliUtilityCrossEnv.spawnCrossEnv', async () => {
  const temporaryPrefix: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_TemporaryPrefix = join(tmpdir(), `nova-${'test'}-`);
  const sandboxDirectory: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SandboxDirectory = await mkdtemp(temporaryPrefix);
  const sandboxRoot: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SandboxRoot = await realpath(sandboxDirectory);
  const resolveBinaryPath: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ResolveBinaryPath = Reflect.get(CliUtilityCrossEnv, 'resolveBinaryPath') as Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ResolveBinaryPath;
  const spawnCrossEnv: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SpawnCrossEnv = Reflect.get(CliUtilityCrossEnv, 'spawnCrossEnv') as Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SpawnCrossEnv;

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('forwards a termination signal to the wrapped command', async () => {
    const readyPath: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ReadyPath = join(sandboxRoot, 'ready');
    const script: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_Script = [
      'process.on("SIGTERM", () => process.exit(42));',
      `require("node:fs").writeFileSync(${JSON.stringify(readyPath)}, "ready");`,
      'setInterval(() => {}, 1000);',
    ].join(' ');
    const listenerCountBefore: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ListenerCountBefore = process.listenerCount('SIGTERM');
    const listenersBefore: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ListenersBefore = process.listeners('SIGTERM');
    const resultPromise: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ResultPromise = spawnCrossEnv(resolveBinaryPath(), [
      process.execPath,
      '-e',
      script,
    ]);
    const deadline: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_Deadline = Date.now() + 20000;

    while (existsSync(readyPath) === false && Date.now() < deadline) {
      await new Promise((promiseResolve) => {
        setTimeout(promiseResolve, 50);

        return;
      });
    }

    // Call only the listener the runner added, so other SIGTERM listeners in this worker stay untouched.
    const addedListeners: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_AddedListeners = process.listeners('SIGTERM').filter((listener) => listenersBefore.includes(listener) === false);

    for (const addedListener of addedListeners) {
      addedListener('SIGTERM');
    }

    const result: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_Result = await resultPromise;
    const listenerCountAfter: Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ListenerCountAfter = process.listenerCount('SIGTERM');

    strictEqual(result['code'], 42);
    strictEqual(result['signal'], null);
    strictEqual(listenerCountAfter, listenerCountBefore);

    return;
  });

  return;
});
