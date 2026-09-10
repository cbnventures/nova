import { Runner as LibRunScripts } from '../../lib/run-scripts.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Utility_RunScripts_Runner_PrintError_Message,
  Cli_Utility_RunScripts_Runner_PrintError_Returns,
  Cli_Utility_RunScripts_Runner_PrintInfo_Message,
  Cli_Utility_RunScripts_Runner_PrintInfo_Returns,
  Cli_Utility_RunScripts_Runner_PrintWarn_Message,
  Cli_Utility_RunScripts_Runner_PrintWarn_Returns,
  Cli_Utility_RunScripts_Runner_Run_ExitCode,
  Cli_Utility_RunScripts_Runner_Run_Options,
  Cli_Utility_RunScripts_Runner_Run_Returns,
  Cli_Utility_RunScripts_Runner_WriteStderr_Message,
  Cli_Utility_RunScripts_Runner_WriteStderr_Returns,
  Cli_Utility_RunScripts_Runner_WriteStdout_Message,
  Cli_Utility_RunScripts_Runner_WriteStdout_Returns,
} from '../../types/cli/utility/run-scripts.d.ts';

/**
 * CLI - Utility - Run Scripts.
 *
 * Adapts Nova's canonical script runner to the public CLI Logger while the
 * same pre-build-safe implementation serves Nova's repository bootstrap.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Utility - Run Scripts - Run.
   *
   * Runs the shared package script pipeline and propagates failures through
   * the process exit code expected by terminal and CI callers.
   *
   * @param {Cli_Utility_RunScripts_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_RunScripts_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Utility_RunScripts_Runner_Run_Options): Cli_Utility_RunScripts_Runner_Run_Returns {
    const exitCode: Cli_Utility_RunScripts_Runner_Run_ExitCode = await LibRunScripts.run({
      buffer: options['buffer'],
      parallel: options['parallel'],
      pattern: options['pattern'],
      printError: Runner['printError'],
      printInfo: Runner['printInfo'],
      printWarn: Runner['printWarn'],
      sequential: options['sequential'],
      writeStderr: Runner['writeStderr'],
      writeStdout: Runner['writeStdout'],
    });

    if (exitCode > 0) {
      process.exitCode = exitCode;
    }

    return;
  }

  /**
   * CLI - Utility - Run Scripts - Print Error.
   *
   * Routes a canonical script-runner diagnostic through the error-level Logger.
   * Keeping the adapter here leaves the shared runner independent of CLI code.
   *
   * @param {Cli_Utility_RunScripts_Runner_PrintError_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunScripts_Runner_PrintError_Returns}
   *
   * @since 0.26.0
   */
  private static printError(message: Cli_Utility_RunScripts_Runner_PrintError_Message): Cli_Utility_RunScripts_Runner_PrintError_Returns {
    Logger.error(message);

    return;
  }

  /**
   * CLI - Utility - Run Scripts - Print Info.
   *
   * Routes canonical status messages through Nova's info-level Logger.
   * The shared runner stays unaware of the public command's presentation layer.
   *
   * @param {Cli_Utility_RunScripts_Runner_PrintInfo_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunScripts_Runner_PrintInfo_Returns}
   *
   * @since 0.26.0
   */
  private static printInfo(message: Cli_Utility_RunScripts_Runner_PrintInfo_Message): Cli_Utility_RunScripts_Runner_PrintInfo_Returns {
    Logger.info(message);

    return;
  }

  /**
   * CLI - Utility - Run Scripts - Print Warn.
   *
   * Routes canonical non-fatal diagnostics through Nova's warning-level Logger.
   * Keeping warning selection here preserves the public command's output style.
   *
   * @param {Cli_Utility_RunScripts_Runner_PrintWarn_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunScripts_Runner_PrintWarn_Returns}
   *
   * @since 0.26.0
   */
  private static printWarn(message: Cli_Utility_RunScripts_Runner_PrintWarn_Message): Cli_Utility_RunScripts_Runner_PrintWarn_Returns {
    Logger.warn(message);

    return;
  }

  /**
   * CLI - Utility - Run Scripts - Write Stderr.
   *
   * Writes already formatted child-process output directly to standard error.
   * This preserves stream fidelity without coupling the core to global process I/O.
   *
   * @param {Cli_Utility_RunScripts_Runner_WriteStderr_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunScripts_Runner_WriteStderr_Returns}
   *
   * @since 0.26.0
   */
  private static writeStderr(message: Cli_Utility_RunScripts_Runner_WriteStderr_Message): Cli_Utility_RunScripts_Runner_WriteStderr_Returns {
    process.stderr.write(message);

    return;
  }

  /**
   * CLI - Utility - Run Scripts - Write Stdout.
   *
   * Writes already formatted child-process output directly to standard output.
   * This preserves stream fidelity without coupling the core to global process I/O.
   *
   * @param {Cli_Utility_RunScripts_Runner_WriteStdout_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_RunScripts_Runner_WriteStdout_Returns}
   *
   * @since 0.26.0
   */
  private static writeStdout(message: Cli_Utility_RunScripts_Runner_WriteStdout_Message): Cli_Utility_RunScripts_Runner_WriteStdout_Returns {
    process.stdout.write(message);

    return;
  }
}
