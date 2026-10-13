import { runTranspile } from '../../lib/transpile.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Utility_Transpile_Runner_PrintError_Message,
  Cli_Utility_Transpile_Runner_PrintError_Returns,
  Cli_Utility_Transpile_Runner_PrintInfo_Message,
  Cli_Utility_Transpile_Runner_PrintInfo_Returns,
  Cli_Utility_Transpile_Runner_Run_Options,
  Cli_Utility_Transpile_Runner_Run_Result,
  Cli_Utility_Transpile_Runner_Run_Returns,
} from '../../types/cli/utility/transpile.d.ts';

/**
 * CLI - Utility - Transpile.
 *
 * Adapts Nova's canonical TypeScript emitter to the public CLI Logger while
 * the same pre-build-safe implementation serves Nova's repository bootstrap.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Utility - Transpile - Run.
   *
   * Runs the shared TypeScript emit pipeline and propagates one-shot failures
   * through the process exit code. Watch mode keeps its compiler session alive.
   *
   * @param {Cli_Utility_Transpile_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_Transpile_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static run(options: Cli_Utility_Transpile_Runner_Run_Options): Cli_Utility_Transpile_Runner_Run_Returns {
    const result: Cli_Utility_Transpile_Runner_Run_Result = runTranspile({
      project: options['project'],
      watch: (options['watch'] === true) ? true : undefined,
      printError: Runner['printError'],
      printInfo: Runner['printInfo'],
    });

    if (typeof result === 'number' && result > 0) {
      process.exitCode = result;
    }

    return;
  }

  /**
   * CLI - Utility - Transpile - Print Error.
   *
   * Routes a canonical diagnostic line through Nova's error-level Logger.
   * The shared emitter remains independent from CLI presentation code.
   *
   * @param {Cli_Utility_Transpile_Runner_PrintError_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_Transpile_Runner_PrintError_Returns}
   *
   * @since 0.30.0
   */
  private static printError(message: Cli_Utility_Transpile_Runner_PrintError_Message): Cli_Utility_Transpile_Runner_PrintError_Returns {
    Logger.error(message);

    return;
  }

  /**
   * CLI - Utility - Transpile - Print Info.
   *
   * Routes a canonical compiler status line through Nova's info-level Logger.
   * One-shot summaries and watch updates therefore share the same style.
   *
   * @param {Cli_Utility_Transpile_Runner_PrintInfo_Message} message - Message.
   *
   * @private
   *
   * @returns {Cli_Utility_Transpile_Runner_PrintInfo_Returns}
   *
   * @since 0.30.0
   */
  private static printInfo(message: Cli_Utility_Transpile_Runner_PrintInfo_Message): Cli_Utility_Transpile_Runner_PrintInfo_Returns {
    Logger.info(message);

    return;
  }
}
