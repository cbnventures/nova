import type { ChildProcess } from 'node:child_process';

import type { Shared_CrossEnvResult } from '../../shared.d.ts';

/**
 * CLI - Utility - Cross Env - Forwarded Signals.
 *
 * @since 0.49.0
 */
export type Cli_Utility_CrossEnv_Runner_ForwardedSignals = NodeJS.Signals[];

/**
 * CLI - Utility - Cross Env - Resolve Binary Path.
 *
 * @since 0.49.0
 */
export type Cli_Utility_CrossEnv_Runner_ResolveBinaryPath_Returns = string;

export type Cli_Utility_CrossEnv_Runner_ResolveBinaryPath_BinaryUrl = string;

/**
 * CLI - Utility - Cross Env - Run.
 *
 * @since 0.49.0
 */
export type Cli_Utility_CrossEnv_Runner_Run_Options_CommandArguments = string[];

export type Cli_Utility_CrossEnv_Runner_Run_Options = {
  commandArguments?: Cli_Utility_CrossEnv_Runner_Run_Options_CommandArguments;
};

export type Cli_Utility_CrossEnv_Runner_Run_Returns = Promise<void>;

export type Cli_Utility_CrossEnv_Runner_Run_BinaryPath = string;

export type Cli_Utility_CrossEnv_Runner_Run_Result = Shared_CrossEnvResult;

/**
 * CLI - Utility - Cross Env - Spawn Cross Env.
 *
 * @since 0.49.0
 */
export type Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_BinaryPath = string;

export type Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_CommandArguments = string[];

export type Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Returns = Promise<Shared_CrossEnvResult>;

export type Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Child = ChildProcess;

export type Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_ForwardSignal = (signal: NodeJS.Signals) => void;

/**
 * CLI - Utility - Cross Env - Spawn Cross Env - Close.
 *
 * @since 0.49.0
 */
export type Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Close_Returns = void;

/**
 * CLI - Utility - Cross Env - Spawn Cross Env - Error.
 *
 * @since 0.49.0
 */
export type Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Error_Returns = void;

/**
 * CLI - Utility - Cross Env - Spawn Cross Env - Forward Signal.
 *
 * @since 0.49.0
 */
export type Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_ForwardSignal_Returns = void;
