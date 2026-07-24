import { Logger } from '@cbnventures/nova/toolkit';

import { Runner as ApplyPlan } from '../../lib/i18n/apply-plan.js';
import { Runner as Prompt } from '../../lib/i18n/prompt.js';
import { Runner as Report } from '../../lib/i18n/report.js';
import { Runner as SiteContext } from '../../lib/i18n/site-context.js';

import type {
  Cli_I18n_Sync_Runner_Run_DeleteDefunct,
  Cli_I18n_Sync_Runner_Run_DryRun,
  Cli_I18n_Sync_Runner_Run_Gather,
  Cli_I18n_Sync_Runner_Run_GatherError,
  Cli_I18n_Sync_Runner_Run_Interactive,
  Cli_I18n_Sync_Runner_Run_Locale,
  Cli_I18n_Sync_Runner_Run_Message,
  Cli_I18n_Sync_Runner_Run_Options,
  Cli_I18n_Sync_Runner_Run_Plan,
  Cli_I18n_Sync_Runner_Run_Result,
  Cli_I18n_Sync_Runner_Run_Returns,
} from '../../types/cli/i18n/sync.d.ts';

/**
 * CLI - I18n - Sync.
 *
 * Entry point for `theme-nova i18n sync`. Gathers the consumer site state,
 * builds the reconciliation plan, and executes it - honoring dry runs and the
 * orphan data-loss gate.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * CLI - I18n - Sync - Run.
   *
   * Loads the site context, prints the plan, and either stops (dry run) or
   * applies it, mapping blocked orphan gates and cancellations to a non-zero
   * exit code.
   *
   * @param {Cli_I18n_Sync_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_I18n_Sync_Runner_Run_Returns}
   *
   * @since 0.21.0
   */
  public static async run(options: Cli_I18n_Sync_Runner_Run_Options): Cli_I18n_Sync_Runner_Run_Returns {
    const dryRun: Cli_I18n_Sync_Runner_Run_DryRun = options['dryRun'] === true;
    const deleteDefunct: Cli_I18n_Sync_Runner_Run_DeleteDefunct = options['deleteDefunct'] === true;
    const locale: Cli_I18n_Sync_Runner_Run_Locale = options['locale'];

    let gather: Cli_I18n_Sync_Runner_Run_Gather = undefined;

    // A gather failure means the environment is unusable - exit with usage code.
    try {
      gather = await SiteContext.gather({ locale });
    } catch (error) {
      const gatherError: Cli_I18n_Sync_Runner_Run_GatherError = error;
      const message: Cli_I18n_Sync_Runner_Run_Message = (gatherError instanceof Error) ? gatherError.message : String(gatherError);

      Logger.error(message);

      process.exitCode = 2;

      return;
    }

    const plan: Cli_I18n_Sync_Runner_Run_Plan = ApplyPlan.build(gather);

    Report.print(plan);

    if (dryRun === true) {
      Logger.info('Dry run enabled. No files were written.');

      return;
    }

    const interactive: Cli_I18n_Sync_Runner_Run_Interactive = Prompt.isInteractive();
    const result: Cli_I18n_Sync_Runner_Run_Result = await ApplyPlan.apply(plan, {
      dryRun: false,
      deleteDefunct,
      interactive,
      confirm: Prompt['confirmBatch'],
    });

    if (result['blocked'] === true) {
      Logger.error('Orphaned translation keys detected. Re-run with --delete-defunct to remove them, or restore them in your source.');

      process.exitCode = 1;

      return;
    }

    if (result['cancelled'] === true) {
      Logger.warn('Reconciliation cancelled. No files were written.');

      process.exitCode = 1;

      return;
    }

    Logger.info(`Reconciled i18n tree. ${result['written'].length} written, ${result['removed'].length} removed.`);

    return;
  }
}
