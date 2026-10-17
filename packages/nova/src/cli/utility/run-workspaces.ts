import { Runner as LibRunWorkspaces } from '../../lib/run-workspaces.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Utility_RunWorkspaces_Runner_PrintError_Message,
  Cli_Utility_RunWorkspaces_Runner_PrintError_Returns,
  Cli_Utility_RunWorkspaces_Runner_PrintInfo_Message,
  Cli_Utility_RunWorkspaces_Runner_PrintInfo_Returns,
  Cli_Utility_RunWorkspaces_Runner_PrintWarn_Message,
  Cli_Utility_RunWorkspaces_Runner_PrintWarn_Returns,
  Cli_Utility_RunWorkspaces_Runner_Run_ExitCode,
  Cli_Utility_RunWorkspaces_Runner_Run_Options,
  Cli_Utility_RunWorkspaces_Runner_Run_Returns,
  Cli_Utility_RunWorkspaces_Runner_WriteStderr_Message,
  Cli_Utility_RunWorkspaces_Runner_WriteStderr_Returns,
  Cli_Utility_RunWorkspaces_Runner_WriteStdout_Message,
  Cli_Utility_RunWorkspaces_Runner_WriteStdout_Returns,
} from '../../types/cli/utility/run-workspaces.d.ts';

/**
 * CLI - Utility - Run Workspaces.
 *
 * Adapts Nova's dependency-aware workspace runner to the public CLI Logger.
 * This layer keeps terminal-specific output concerns out of the core runner.
 *
 * @since 0.32.0
 */
export class Runner {
  /**
   * CLI - Utility - Run Workspaces - Run.
   *
   * Runs the workspace graph and propagates failures through the process exit
   * code expected by terminal and CI callers.
   *
   * @param {Cli_Utility_RunWorkspaces_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_RunWorkspaces_Runner_Run_Returns}
   *
   * @since 0.32.0
   */
  public static async run(options: Cli_Utility_RunWorkspaces_Runner_Run_Options): Cli_Utility_RunWorkspaces_Runner_Run_Returns {
    const exitCode: Cli_Utility_RunWorkspaces_Runner_Run_ExitCode = await LibRunWorkspaces.run({
      buffer: options['buffer'],
      concurrency: options['concurrency'],
      continueOnError: options['continueOnError'],
      dryRun: options['dryRun'],
      excludeWorkspace: options['excludeWorkspace'],
      force: options['force'],
      nodeEnv: options['nodeEnv'],
      scriptArgs: options['scriptArgs'],
      task: options['task'],
      workspace: options['workspace'],
      printError: Runner['printError'],
      printInfo: Runner['printInfo'],
      printWarn: Runner['printWarn'],
      writeStderr: Runner['writeStderr'],
      writeStdout: Runner['writeStdout'],
    });

    if (exitCode > 0) {
      process.exitCode = exitCode;
    }

    return;
  }

  /**
   * CLI - Utility - Run Workspaces - Print Error.
   *
   * Routes a fatal workspace-runner diagnostic through Nova's Logger.
   * Core graph validation can therefore remain independent of the CLI surface.
   *
   * @param {Cli_Utility_RunWorkspaces_Runner_PrintError_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunWorkspaces_Runner_PrintError_Returns}
   *
   * @since 0.32.0
   */
  private static printError(message: Cli_Utility_RunWorkspaces_Runner_PrintError_Message): Cli_Utility_RunWorkspaces_Runner_PrintError_Returns {
    Logger.error(message);

    return;
  }

  /**
   * CLI - Utility - Run Workspaces - Print Info.
   *
   * Routes workspace-runner status through Nova's Logger.
   * Planning and completion messages follow the rest of Nova's terminal output.
   *
   * @param {Cli_Utility_RunWorkspaces_Runner_PrintInfo_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunWorkspaces_Runner_PrintInfo_Returns}
   *
   * @since 0.32.0
   */
  private static printInfo(message: Cli_Utility_RunWorkspaces_Runner_PrintInfo_Message): Cli_Utility_RunWorkspaces_Runner_PrintInfo_Returns {
    Logger.info(message);

    return;
  }

  /**
   * CLI - Utility - Run Workspaces - Print Warn.
   *
   * Routes non-fatal workspace-runner diagnostics through Nova's Logger.
   * Missing workspace scripts remain visible without turning into failures.
   *
   * @param {Cli_Utility_RunWorkspaces_Runner_PrintWarn_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunWorkspaces_Runner_PrintWarn_Returns}
   *
   * @since 0.32.0
   */
  private static printWarn(message: Cli_Utility_RunWorkspaces_Runner_PrintWarn_Message): Cli_Utility_RunWorkspaces_Runner_PrintWarn_Returns {
    Logger.warn(message);

    return;
  }

  /**
   * CLI - Utility - Run Workspaces - Write Stderr.
   *
   * Writes formatted workspace child output directly to standard error.
   * The core runner already supplies task framing and stream-safe line endings.
   *
   * @param {Cli_Utility_RunWorkspaces_Runner_WriteStderr_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunWorkspaces_Runner_WriteStderr_Returns}
   *
   * @since 0.32.0
   */
  private static writeStderr(message: Cli_Utility_RunWorkspaces_Runner_WriteStderr_Message): Cli_Utility_RunWorkspaces_Runner_WriteStderr_Returns {
    process.stderr.write(message);

    return;
  }

  /**
   * CLI - Utility - Run Workspaces - Write Stdout.
   *
   * Writes formatted workspace child output directly to standard output.
   * The core runner already supplies task framing and stream-safe line endings.
   *
   * @param {Cli_Utility_RunWorkspaces_Runner_WriteStdout_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunWorkspaces_Runner_WriteStdout_Returns}
   *
   * @since 0.32.0
   */
  private static writeStdout(message: Cli_Utility_RunWorkspaces_Runner_WriteStdout_Message): Cli_Utility_RunWorkspaces_Runner_WriteStdout_Returns {
    process.stdout.write(message);

    return;
  }
}
