import { Logger } from '@cbnventures/nova/toolkit';

import type {
  Lib_I18n_Report_Runner_Print_AddCount,
  Lib_I18n_Report_Runner_Print_DropCount,
  Lib_I18n_Report_Runner_Print_OrphanCount,
  Lib_I18n_Report_Runner_Print_Plan,
  Lib_I18n_Report_Runner_Print_Returns,
} from '../../types/lib/i18n/report.d.ts';

/**
 * Lib - I18n - Report.
 *
 * Formats a reconciliation plan for the terminal, listing per-locale and
 * per-file seed, drop, and orphan counts, and enumerating orphan keys so a
 * blocked run explains exactly what would be lost.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Lib - I18n - Report - Print.
   *
   * Walks every locale and file in the plan, skipping unchanged files, and logs
   * the seed/drop/orphan counts plus each orphan key and its current message.
   *
   * @param {Lib_I18n_Report_Runner_Print_Plan} plan - Plan.
   *
   * @returns {Lib_I18n_Report_Runner_Print_Returns}
   *
   * @since 0.21.0
   */
  public static print(plan: Lib_I18n_Report_Runner_Print_Plan): Lib_I18n_Report_Runner_Print_Returns {
    for (const localePlan of plan['locales']) {
      for (const file of localePlan['files']) {
        const addCount: Lib_I18n_Report_Runner_Print_AddCount = file['add'].length;
        const dropCount: Lib_I18n_Report_Runner_Print_DropCount = file['dropRedundant'].length;
        const orphanCount: Lib_I18n_Report_Runner_Print_OrphanCount = file['orphan'].length;

        if (
          addCount === 0
          && dropCount === 0
          && orphanCount === 0
        ) {
          continue;
        }

        Logger.customize({
          name: localePlan['locale'],
          purpose: file['scope'],
        }).info(`${addCount} to seed, ${dropCount} redundant to drop, ${orphanCount} orphaned`);

        // List each orphan so a blocked run names what would be lost.
        for (const entry of file['orphan']) {
          Logger.customize({
            name: localePlan['locale'],
            purpose: file['scope'],
          }).warn(`orphan "${entry['key']}" = ${JSON.stringify(entry['message'])}`);
        }
      }
    }

    return;
  }
}
