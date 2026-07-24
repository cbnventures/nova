import type { MarkdownTable } from '@cbnventures/nova/toolkit';

import type { Lib_I18n_ContentScan_Runner_Scan_Result } from '../../lib/i18n/content-scan.d.ts';
import type {
  Shared_I18nCoverageInputLocale,
  Shared_I18nCoverageLocale,
  Shared_I18nFilePlan,
  Shared_I18nGatherResult,
  Shared_I18nPlan,
} from '../../shared.d.ts';

/**
 * CLI - I18n - Coverage - Derive Locales.
 *
 * @since 0.21.0
 */
export type Cli_I18n_Coverage_Runner_DeriveLocales_Gather = Shared_I18nGatherResult;

export type Cli_I18n_Coverage_Runner_DeriveLocales_Plan = Shared_I18nPlan;

export type Cli_I18n_Coverage_Runner_DeriveLocales_Returns = Shared_I18nCoverageInputLocale[];

export type Cli_I18n_Coverage_Runner_DeriveLocales_Universe = Set<string>;

export type Cli_I18n_Coverage_Runner_DeriveLocales_PerLocale = Shared_I18nCoverageInputLocale[];

export type Cli_I18n_Coverage_Runner_DeriveLocales_CodePlan = Shared_I18nFilePlan | undefined;

export type Cli_I18n_Coverage_Runner_DeriveLocales_Translated = Set<string>;

/**
 * CLI - I18n - Coverage - Format Percent.
 *
 * @since 0.21.0
 */
export type Cli_I18n_Coverage_Runner_FormatPercent_Percent = number;

export type Cli_I18n_Coverage_Runner_FormatPercent_Returns = string;

export type Cli_I18n_Coverage_Runner_FormatPercent_Label = string;

/**
 * CLI - I18n - Coverage - Render.
 *
 * @since 0.21.0
 */
export type Cli_I18n_Coverage_Runner_Render_Locales = Shared_I18nCoverageLocale[];

export type Cli_I18n_Coverage_Runner_Render_ShowGaps = boolean;

export type Cli_I18n_Coverage_Runner_Render_Returns = void;

export type Cli_I18n_Coverage_Runner_Render_Table = MarkdownTable;

export type Cli_I18n_Coverage_Runner_Render_Sorted = Shared_I18nCoverageLocale[];

export type Cli_I18n_Coverage_Runner_Render_LocaleLabel = string;

export type Cli_I18n_Coverage_Runner_Render_CoverageCell = string;

export type Cli_I18n_Coverage_Runner_Render_StringsCell = string;

export type Cli_I18n_Coverage_Runner_Render_ContentCell = string;

export type Cli_I18n_Coverage_Runner_Render_ToTranslate = string;

export type Cli_I18n_Coverage_Runner_Render_EnglishOnly = string;

/**
 * CLI - I18n - Coverage - Run.
 *
 * @since 0.21.0
 */
export type Cli_I18n_Coverage_Runner_Run_Options_Locale = string;

export type Cli_I18n_Coverage_Runner_Run_Options_MinCoverage = string;

export type Cli_I18n_Coverage_Runner_Run_Options_Gaps = boolean;

export type Cli_I18n_Coverage_Runner_Run_Options = {
  locale?: Cli_I18n_Coverage_Runner_Run_Options_Locale;
  minCoverage?: Cli_I18n_Coverage_Runner_Run_Options_MinCoverage;
  gaps?: Cli_I18n_Coverage_Runner_Run_Options_Gaps;
};

export type Cli_I18n_Coverage_Runner_Run_Returns = Promise<void>;

export type Cli_I18n_Coverage_Runner_Run_RequestedLocale = string | undefined;

export type Cli_I18n_Coverage_Runner_Run_ShowGaps = boolean;

export type Cli_I18n_Coverage_Runner_Run_MinCoverageRaw = string | undefined;

export type Cli_I18n_Coverage_Runner_Run_MinCoverage = number | undefined;

export type Cli_I18n_Coverage_Runner_Run_Parsed = number;

export type Cli_I18n_Coverage_Runner_Run_Gather = Shared_I18nGatherResult | undefined;

export type Cli_I18n_Coverage_Runner_Run_GatherError = unknown;

export type Cli_I18n_Coverage_Runner_Run_Message = string;

export type Cli_I18n_Coverage_Runner_Run_Plan = Shared_I18nPlan;

export type Cli_I18n_Coverage_Runner_Run_Universe = Set<string>;

export type Cli_I18n_Coverage_Runner_Run_Scan = Lib_I18n_ContentScan_Runner_Scan_Result | undefined;

export type Cli_I18n_Coverage_Runner_Run_ScanError = unknown;

export type Cli_I18n_Coverage_Runner_Run_ScanMessage = string;

export type Cli_I18n_Coverage_Runner_Run_ReportLocales = Shared_I18nCoverageLocale[];

export type Cli_I18n_Coverage_Runner_Run_NonDefault = Shared_I18nCoverageLocale[];

export type Cli_I18n_Coverage_Runner_Run_Threshold = number;

export type Cli_I18n_Coverage_Runner_Run_Below = Shared_I18nCoverageLocale[];
