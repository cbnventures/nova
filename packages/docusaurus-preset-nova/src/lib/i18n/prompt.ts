import prompts from 'prompts';

import type {
  Lib_I18n_Prompt_Runner_ConfirmBatch_Count,
  Lib_I18n_Prompt_Runner_ConfirmBatch_Entries,
  Lib_I18n_Prompt_Runner_ConfirmBatch_Locale,
  Lib_I18n_Prompt_Runner_ConfirmBatch_Noun,
  Lib_I18n_Prompt_Runner_ConfirmBatch_Result,
  Lib_I18n_Prompt_Runner_ConfirmBatch_Returns,
  Lib_I18n_Prompt_Runner_ConfirmBatch_Scope,
  Lib_I18n_Prompt_Runner_IsInteractive_Returns,
} from '../../types/lib/i18n/prompt.d.ts';

/**
 * Lib - I18n - Prompt.
 *
 * Interactive confirmation for orphan deletion, mirroring the CLI's
 * cancel-aware prompt pattern, plus a TTY detector used to decide whether
 * the data-loss gate may prompt at all.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Lib - I18n - Prompt - Confirm Batch.
   *
   * Asks whether to delete the orphaned keys for one locale and file. A resolved
   * confirm deletes, a decline keeps, and a cancel (Ctrl-C) aborts the run.
   *
   * @param {Lib_I18n_Prompt_Runner_ConfirmBatch_Locale}  locale  - Locale.
   * @param {Lib_I18n_Prompt_Runner_ConfirmBatch_Scope}   scope   - Scope.
   * @param {Lib_I18n_Prompt_Runner_ConfirmBatch_Entries} entries - Entries.
   *
   * @returns {Lib_I18n_Prompt_Runner_ConfirmBatch_Returns}
   *
   * @since 0.21.0
   */
  public static async confirmBatch(locale: Lib_I18n_Prompt_Runner_ConfirmBatch_Locale, scope: Lib_I18n_Prompt_Runner_ConfirmBatch_Scope, entries: Lib_I18n_Prompt_Runner_ConfirmBatch_Entries): Lib_I18n_Prompt_Runner_ConfirmBatch_Returns {
    const count: Lib_I18n_Prompt_Runner_ConfirmBatch_Count = entries.length;
    const noun: Lib_I18n_Prompt_Runner_ConfirmBatch_Noun = (count === 1) ? 'key' : 'keys';
    const result: Lib_I18n_Prompt_Runner_ConfirmBatch_Result = await prompts({
      type: 'confirm',
      name: 'value',
      message: `Delete ${count} defunct translation ${noun} in ${locale} / ${scope}?`,
      initial: false,
    }, {
      onCancel: () => false,
    });

    // An empty answer object signals the prompt was cancelled.
    if (Object.keys(result).length === 0) {
      return 'cancel';
    }

    return (result['value'] === true) ? 'confirm' : 'decline';
  }

  /**
   * Lib - I18n - Prompt - Is Interactive.
   *
   * Reports whether both standard streams are TTYs, the precondition for the
   * orphan gate to prompt instead of blocking on a flag.
   *
   * @returns {Lib_I18n_Prompt_Runner_IsInteractive_Returns}
   *
   * @since 0.21.0
   */
  public static isInteractive(): Lib_I18n_Prompt_Runner_IsInteractive_Returns {
    return Boolean(process.stdin.isTTY) && Boolean(process.stdout.isTTY);
  }
}
