import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import type {
  Cli_Utility_CrossEnv_Runner_ForwardedSignals,
  Cli_Utility_CrossEnv_Runner_ResolveBinaryPath_BinaryUrl,
  Cli_Utility_CrossEnv_Runner_ResolveBinaryPath_Returns,
  Cli_Utility_CrossEnv_Runner_Run_BinaryPath,
  Cli_Utility_CrossEnv_Runner_Run_Options,
  Cli_Utility_CrossEnv_Runner_Run_Result,
  Cli_Utility_CrossEnv_Runner_Run_Returns,
  Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_BinaryPath,
  Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Child,
  Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Close_Returns,
  Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_CommandArguments,
  Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Error_Returns,
  Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_ForwardSignal,
  Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_ForwardSignal_Returns,
  Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Returns,
} from '../../types/cli/utility/cross-env.d.ts';

/**
 * CLI - Utility - Cross Env.
 *
 * Runs the cross-env command line that ships with Nova, so package scripts can set
 * environment variables the same way on every platform without their own copy.
 *
 * @since 0.49.0
 */
export class Runner {
  /**
   * CLI - Utility - Cross Env - Forwarded Signals.
   *
   * Termination signals relayed to the cross-env child, matching the set cross-env
   * itself relays, so an interrupt stops the wrapped command as it would without Nova.
   *
   * @private
   *
   * @since 0.49.0
   */
  static readonly #forwardedSignals: Cli_Utility_CrossEnv_Runner_ForwardedSignals = [
    'SIGBREAK',
    'SIGHUP',
    'SIGINT',
    'SIGTERM',
  ];

  /**
   * CLI - Utility - Cross Env - Run.
   *
   * Passes every argument to the cross-env command line unchanged and ends with the
   * same exit code, or raises the same signal on Nova when cross-env stops from one.
   *
   * @param {Cli_Utility_CrossEnv_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_CrossEnv_Runner_Run_Returns}
   *
   * @since 0.49.0
   */
  public static async run(options: Cli_Utility_CrossEnv_Runner_Run_Options): Cli_Utility_CrossEnv_Runner_Run_Returns {
    const binaryPath: Cli_Utility_CrossEnv_Runner_Run_BinaryPath = Runner.resolveBinaryPath();
    const result: Cli_Utility_CrossEnv_Runner_Run_Result = await Runner.spawnCrossEnv(binaryPath, options['commandArguments'] ?? []);

    if (result['signal'] !== null) {
      process.kill(process.pid, result['signal']);

      return;
    }

    if (result['code'] !== null && result['code'] !== 0) {
      process.exitCode = result['code'];
    }

    return;
  }

  /**
   * CLI - Utility - Cross Env - Resolve Binary Path.
   *
   * Finds the cross-env command line script through its package exports, so
   * the copy installed with Nova runs instead of one on the PATH.
   *
   * @private
   *
   * @returns {Cli_Utility_CrossEnv_Runner_ResolveBinaryPath_Returns}
   *
   * @since 0.49.0
   */
  private static resolveBinaryPath(): Cli_Utility_CrossEnv_Runner_ResolveBinaryPath_Returns {
    const binaryUrl: Cli_Utility_CrossEnv_Runner_ResolveBinaryPath_BinaryUrl = import.meta.resolve('cross-env/bin/cross-env');

    return fileURLToPath(binaryUrl);
  }

  /**
   * CLI - Utility - Cross Env - Spawn Cross Env.
   *
   * Starts cross-env with the current Node.js binary and inherited stdio, relays
   * termination signals while it runs, and settles with its exit code or signal.
   *
   * @param {Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_BinaryPath}       binaryPath       - Binary path.
   * @param {Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_CommandArguments} commandArguments - Command arguments.
   *
   * @private
   *
   * @returns {Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Returns}
   *
   * @since 0.49.0
   */
  private static spawnCrossEnv(binaryPath: Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_BinaryPath, commandArguments: Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_CommandArguments): Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Returns {
    return new Promise((promiseResolve, reject) => {
      const child: Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Child = spawn(process.execPath, [
        binaryPath,
        ...commandArguments,
      ], {
        stdio: 'inherit',
        shell: false,
      });

      /**
       * CLI - Utility - Cross Env - Spawn Cross Env - Forward Signal.
       *
       * Relays a termination signal Nova received to the cross-env child, which
       * passes it on to the wrapped command and exits once that command stops.
       *
       * @param {NodeJS.Signals} signal - Signal.
       *
       * @private
       *
       * @returns {Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_ForwardSignal_Returns}
       *
       * @since 0.49.0
       */
      const forwardSignal: Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_ForwardSignal = (signal): Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_ForwardSignal_Returns => {
        child.kill(signal);

        return;
      };

      for (const forwardedSignal of Runner.#forwardedSignals) {
        process.on(forwardedSignal, forwardSignal);
      }

      child.on('close', (code, signal): Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Close_Returns => {
        for (const forwardedSignal of Runner.#forwardedSignals) {
          process.off(forwardedSignal, forwardSignal);
        }

        promiseResolve({
          code,
          signal,
        });

        return;
      });

      child.on('error', (error): Cli_Utility_CrossEnv_Runner_SpawnCrossEnv_Error_Returns => {
        for (const forwardedSignal of Runner.#forwardedSignals) {
          process.off(forwardedSignal, forwardSignal);
        }

        reject(error);

        return;
      });

      return;
    });
  }
}
