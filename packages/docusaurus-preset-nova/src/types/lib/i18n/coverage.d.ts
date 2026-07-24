import type {
  Shared_I18nContentScanResult,
  Shared_I18nContentScanResultLocale,
  Shared_I18nCoverageContentLocale,
  Shared_I18nCoverageContentReport,
  Shared_I18nCoverageInputLocale,
  Shared_I18nCoverageJsonLocale,
  Shared_I18nCoverageJsonReport,
  Shared_I18nCoverageLocale,
  Shared_I18nCoverageReport,
} from '../../shared.d.ts';

/**
 * Lib - I18n - Coverage - Combine.
 *
 * @since 0.21.0
 */
export type Lib_I18n_Coverage_Runner_Combine_Input_Json = Shared_I18nCoverageJsonReport;

export type Lib_I18n_Coverage_Runner_Combine_Input_Content = Shared_I18nCoverageContentReport;

export type Lib_I18n_Coverage_Runner_Combine_Input = {
  json: Lib_I18n_Coverage_Runner_Combine_Input_Json;
  content: Lib_I18n_Coverage_Runner_Combine_Input_Content;
};

export type Lib_I18n_Coverage_Runner_Combine_Returns = Shared_I18nCoverageReport;

export type Lib_I18n_Coverage_Runner_Combine_JsonTotal = number;

export type Lib_I18n_Coverage_Runner_Combine_ContentTotal = number;

export type Lib_I18n_Coverage_Runner_Combine_ContentByLocale = Map<string, Shared_I18nCoverageContentLocale>;

export type Lib_I18n_Coverage_Runner_Combine_Locales = Shared_I18nCoverageLocale[];

export type Lib_I18n_Coverage_Runner_Combine_ContentReport = Shared_I18nCoverageContentLocale | undefined;

export type Lib_I18n_Coverage_Runner_Combine_ContentPresent = number;

export type Lib_I18n_Coverage_Runner_Combine_MissingContent = string[];

export type Lib_I18n_Coverage_Runner_Combine_CoveredUnits = number;

export type Lib_I18n_Coverage_Runner_Combine_TotalUnits = number;

export type Lib_I18n_Coverage_Runner_Combine_Percent = number;

/**
 * Lib - I18n - Coverage - Compute Content.
 *
 * @since 0.21.0
 */
export type Lib_I18n_Coverage_Runner_ComputeContent_Input = Shared_I18nContentScanResult;

export type Lib_I18n_Coverage_Runner_ComputeContent_Returns = Shared_I18nCoverageContentReport;

export type Lib_I18n_Coverage_Runner_ComputeContent_Sources = string[];

export type Lib_I18n_Coverage_Runner_ComputeContent_PerLocale = Shared_I18nContentScanResultLocale[];

export type Lib_I18n_Coverage_Runner_ComputeContent_SourceSet = Set<string>;

export type Lib_I18n_Coverage_Runner_ComputeContent_Locales = Shared_I18nCoverageContentLocale[];

export type Lib_I18n_Coverage_Runner_ComputeContent_Missing = string[];

/**
 * Lib - I18n - Coverage - Compute Json.
 *
 * @since 0.21.0
 */
export type Lib_I18n_Coverage_Runner_ComputeJson_Input_Universe = Set<string>;

export type Lib_I18n_Coverage_Runner_ComputeJson_Input_PerLocale = Shared_I18nCoverageInputLocale[];

export type Lib_I18n_Coverage_Runner_ComputeJson_Input = {
  universe: Lib_I18n_Coverage_Runner_ComputeJson_Input_Universe;
  perLocale: Lib_I18n_Coverage_Runner_ComputeJson_Input_PerLocale;
};

export type Lib_I18n_Coverage_Runner_ComputeJson_Returns = Shared_I18nCoverageJsonReport;

export type Lib_I18n_Coverage_Runner_ComputeJson_Universe = Set<string>;

export type Lib_I18n_Coverage_Runner_ComputeJson_PerLocale = Shared_I18nCoverageInputLocale[];

export type Lib_I18n_Coverage_Runner_ComputeJson_UnionTranslated = Set<string>;

export type Lib_I18n_Coverage_Runner_ComputeJson_Locales = Shared_I18nCoverageJsonLocale[];

export type Lib_I18n_Coverage_Runner_ComputeJson_DefiniteGaps = string[];

export type Lib_I18n_Coverage_Runner_ComputeJson_SoftGaps = string[];

/**
 * Lib - I18n - Coverage - Percent.
 *
 * @since 0.21.0
 */
export type Lib_I18n_Coverage_Runner_Percent_Covered = number;

export type Lib_I18n_Coverage_Runner_Percent_Total = number;

export type Lib_I18n_Coverage_Runner_Percent_Returns = number;
