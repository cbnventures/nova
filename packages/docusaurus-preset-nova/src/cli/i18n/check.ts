import { Logger } from '@cbnventures/nova/toolkit';

import { Runner as ApplyPlan } from '../../lib/i18n/apply-plan.js';
import { Runner as Report } from '../../lib/i18n/report.js';
import { Runner as SiteContext } from '../../lib/i18n/site-context.js';

import type {
  Cli_I18n_Check_Runner_Run_Drift,
  Cli_I18n_Check_Runner_Run_Gather,
  Cli_I18n_Check_Runner_Run_GatherError,
  Cli_I18n_Check_Runner_Run_Locale,
  Cli_I18n_Check_Runner_Run_Message,
  Cli_I18n_Check_Runner_Run_Options,
  Cli_I18n_Check_Runner_Run_Plan,
  Cli_I18n_Check_Runner_Run_Returns,
} from '../../types/cli/i18n/check.d.ts';

/**
 * CLI - I18n - Check.
 *
 * Entry point for `theme-nova i18n check`. Computes the reconciliation plan
 * without writing and exits non-zero when the tree would change, so CI can
 * enforce a reconciled i18n tree.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * CLI - I18n - Check - Run.
   *
   * Gathers the site state, builds the plan, and reports drift. Any seed, drop,
   * or orphan sets exit code 1; an unusable environment sets exit code 2.
   *
   * @param {Cli_I18n_Check_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_I18n_Check_Runner_Run_Returns}
   *
   * @since 0.21.0
   */
  public static async run(options: Cli_I18n_Check_Runner_Run_Options): Cli_I18n_Check_Runner_Run_Returns {
    const locale: Cli_I18n_Check_Runner_Run_Locale = options['locale'];

    let gather: Cli_I18n_Check_Runner_Run_Gather = undefined;

    // A gather failure means the environment is unusable - exit with usage code.
    try {
      gather = await SiteContext.gather({ locale });
    } catch (error) {
      const gatherError: Cli_I18n_Check_Runner_Run_GatherError = error;
      const message: Cli_I18n_Check_Runner_Run_Message = (gatherError instanceof Error) ? gatherError.message : String(gatherError);

      Logger.error(message);

      process.exitCode = 2;

      return;
    }

    const plan: Cli_I18n_Check_Runner_Run_Plan = ApplyPlan.build(gather);
    const drift: Cli_I18n_Check_Runner_Run_Drift = ApplyPlan.hasDrift(plan);

    if (drift === true) {
      Report.print(plan);

      Logger.error('Translation tree is out of sync. Run "theme-nova i18n sync" to reconcile.');

      process.exitCode = 1;

      return;
    }

    Logger.info('Translation tree is in sync.');

    return;
  }
}
