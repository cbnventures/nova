import type { Shared_CrossEnvResult } from '../../../shared.d.ts';

/**
 * Tests - CLI - Utility - Cross Env - Run - Leaves The Exit Code Unset When The Command Succeeds.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_LeavesTheExitCodeUnsetWhenTheCommandSucceeds_OriginalExitCode = typeof process.exitCode;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_LeavesTheExitCodeUnsetWhenTheCommandSucceeds_ResultExitCode = typeof process.exitCode;

/**
 * Tests - CLI - Utility - Cross Env - Run - Sets The Variable And Forwards The Exit Code.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_SetsTheVariableAndForwardsTheExitCode_OriginalExitCode = typeof process.exitCode;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvRun_SetsTheVariableAndForwardsTheExitCode_ResultExitCode = typeof process.exitCode;

/**
 * Tests - CLI - Utility - Cross Env - Spawn Cross Env.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_TemporaryPrefix = string;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SandboxDirectory = string;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SandboxRoot = string;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ResolveBinaryPath = () => string;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_SpawnCrossEnv = (binaryPath: string, commandArguments: string[]) => Promise<Shared_CrossEnvResult>;

/**
 * Tests - CLI - Utility - Cross Env - Spawn Cross Env - Forwards A Termination Signal To The Wrapped Command.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ReadyPath = string;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_Script = string;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ListenerCountBefore = number;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ListenersBefore = NodeJS.SignalsListener[];

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ResultPromise = Promise<Shared_CrossEnvResult>;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_Deadline = number;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_AddedListeners = NodeJS.SignalsListener[];

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_Result = Shared_CrossEnvResult;

export type Tests_Cli_Utility_CrossEnv_CliUtilityCrossEnvSpawnCrossEnv_ForwardsATerminationSignalToTheWrappedCommand_ListenerCountAfter = number;
