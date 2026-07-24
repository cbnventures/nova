import type {
  Shared_I18nGatherResult,
  Shared_I18nPlan,
} from '../../shared.d.ts';

/**
 * CLI - I18n - Check.
 *
 * @since 0.21.0
 */
export type Cli_I18n_Check_Runner_Run_Options_Locale = string;

export type Cli_I18n_Check_Runner_Run_Options = {
  locale?: Cli_I18n_Check_Runner_Run_Options_Locale;
};

export type Cli_I18n_Check_Runner_Run_Returns = Promise<void>;

export type Cli_I18n_Check_Runner_Run_Locale = string | undefined;

export type Cli_I18n_Check_Runner_Run_Gather = Shared_I18nGatherResult | undefined;

export type Cli_I18n_Check_Runner_Run_GatherError = unknown;

export type Cli_I18n_Check_Runner_Run_Message = string;

export type Cli_I18n_Check_Runner_Run_Plan = Shared_I18nPlan;

export type Cli_I18n_Check_Runner_Run_Drift = boolean;
