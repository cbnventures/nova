import type {
  Shared_ProgressBarConfig,
  Shared_ProgressBarDefaults,
} from '../shared.d.ts';

/**
 * Lib - Progress Bar - Progress Bar Defaults.
 *
 * @since 0.26.0
 */
export type Lib_ProgressBar_ProgressBarDefaults = Shared_ProgressBarDefaults;

/**
 * Lib - Progress Bar - Generate Progress Bar Client Module.
 *
 * @since 0.26.0
 */
export type Lib_ProgressBar_GenerateProgressBarClientModule_OptionsConfig = true | Shared_ProgressBarConfig;

export type Lib_ProgressBar_GenerateProgressBarClientModule_OptionsNprogressPath = string;

export type Lib_ProgressBar_GenerateProgressBarClientModule_Options = {
  config: Lib_ProgressBar_GenerateProgressBarClientModule_OptionsConfig;
  nprogressPath: Lib_ProgressBar_GenerateProgressBarClientModule_OptionsNprogressPath;
};

export type Lib_ProgressBar_GenerateProgressBarClientModule_Returns = string;

export type Lib_ProgressBar_GenerateProgressBarClientModule_Config = Shared_ProgressBarConfig;

export type Lib_ProgressBar_GenerateProgressBarClientModule_NormalizedConfig = Shared_ProgressBarDefaults & Record<string, unknown>;

export type Lib_ProgressBar_GenerateProgressBarClientModule_SerializedConfig = string;

export type Lib_ProgressBar_GenerateProgressBarClientModule_SerializedNprogressPath = string;

export type Lib_ProgressBar_GenerateProgressBarClientModule_Lines = string[];
