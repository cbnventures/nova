import { runTypeCheck } from '../../lib/type-check.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Utility_TypeCheck_Runner_PrintError_Message,
  Cli_Utility_TypeCheck_Runner_PrintError_Returns,
  Cli_Utility_TypeCheck_Runner_PrintInfo_Message,
  Cli_Utility_TypeCheck_Runner_PrintInfo_Returns,
  Cli_Utility_TypeCheck_Runner_Run_ExitCode,
  Cli_Utility_TypeCheck_Runner_Run_Options,
  Cli_Utility_TypeCheck_Runner_Run_Returns,
} from '../../types/cli/utility/type-check.d.ts';

/**
 * CLI - Utility - Type Check.
 *
 * Adapts Nova's canonical TypeScript checker to the public CLI Logger while
 * the same pre-build-safe implementation serves Nova's repository bootstrap.
 *
 * @since 0.13.0
 */
export class Runner {
  /**
   * CLI - Utility - Type Check - Run.
   *
   * Runs the shared TypeScript diagnostic pipeline and propagates failures
   * through the process exit code expected by terminal and CI callers.
   *
   * @param {Cli_Utility_TypeCheck_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_TypeCheck_Runner_Run_Returns}
   *
   * @since 0.13.0
   */
  public static run(options: Cli_Utility_TypeCheck_Runner_Run_Options): Cli_Utility_TypeCheck_Runner_Run_Returns {
    const exitCode: Cli_Utility_TypeCheck_Runner_Run_ExitCode = runTypeCheck({
      project: options['project'],
      printError: Runner['printError'],
      printInfo: Runner['printInfo'],
    });

    if (exitCode > 0) {
      process.exitCode = exitCode;
    }

    return;
  }

  /**
   * CLI - Utility - Type Check - Print Error.
   *
   * Routes a canonical diagnostic line through Nova's error-level Logger.
   * Keeping the adapter here prevents the shared checker from depending on CLI code.
   *
   * @param {Cli_Utility_TypeCheck_Runner_PrintError_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_TypeCheck_Runner_PrintError_Returns}
   *
   * @since 0.26.0
   */
  private static printError(message: Cli_Utility_TypeCheck_Runner_PrintError_Message): Cli_Utility_TypeCheck_Runner_PrintError_Returns {
    Logger.error(message);

    return;
  }

  /**
   * CLI - Utility - Type Check - Print Info.
   *
   * Routes a canonical diagnostic summary through Nova's info-level Logger.
   * Keeping the adapter here preserves the public command's existing output style.
   *
   * @param {Cli_Utility_TypeCheck_Runner_PrintInfo_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_TypeCheck_Runner_PrintInfo_Returns}
   *
   * @since 0.26.0
   */
  private static printInfo(message: Cli_Utility_TypeCheck_Runner_PrintInfo_Message): Cli_Utility_TypeCheck_Runner_PrintInfo_Returns {
    Logger.info(message);

    return;
  }
}
