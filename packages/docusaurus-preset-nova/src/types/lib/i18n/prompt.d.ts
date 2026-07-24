import type {
  Shared_I18nDecision,
  Shared_I18nPlanEntry,
} from '../../shared.d.ts';

/**
 * Lib - I18n - Prompt - Confirm Batch.
 *
 * @since 0.21.0
 */
export type Lib_I18n_Prompt_Runner_ConfirmBatch_Locale = string;

export type Lib_I18n_Prompt_Runner_ConfirmBatch_Scope = string;

export type Lib_I18n_Prompt_Runner_ConfirmBatch_Entries = Shared_I18nPlanEntry[];

export type Lib_I18n_Prompt_Runner_ConfirmBatch_Returns = Promise<Shared_I18nDecision>;

export type Lib_I18n_Prompt_Runner_ConfirmBatch_Count = number;

export type Lib_I18n_Prompt_Runner_ConfirmBatch_Noun = string;

export type Lib_I18n_Prompt_Runner_ConfirmBatch_Result = Record<string, unknown>;

/**
 * Lib - I18n - Prompt - Is Interactive.
 *
 * @since 0.21.0
 */
export type Lib_I18n_Prompt_Runner_IsInteractive_Returns = boolean;
