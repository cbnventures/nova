/**
 * Toolkit - Vitest Coverage - Find Config Path.
 *
 * @since 0.49.0
 */
export type Toolkit_VitestCoverage_Runner_FindConfigPath_StartDirectory = string;

export type Toolkit_VitestCoverage_Runner_FindConfigPath_Returns = string | undefined;

export type Toolkit_VitestCoverage_Runner_FindConfigPath_CurrentDirectory = string;

export type Toolkit_VitestCoverage_Runner_FindConfigPath_CandidatePath = string;

export type Toolkit_VitestCoverage_Runner_FindConfigPath_ParentDirectory = string;

/**
 * Toolkit - Vitest Coverage - Minimum.
 *
 * @since 0.49.0
 */
export type Toolkit_VitestCoverage_Runner_Minimum_StartDirectory = string;

export type Toolkit_VitestCoverage_Runner_Minimum_Returns = number | undefined;

export type Toolkit_VitestCoverage_Runner_Minimum_ConfigPath = string | undefined;

export type Toolkit_VitestCoverage_Runner_Minimum_Parsed = unknown;

export type Toolkit_VitestCoverage_Runner_Minimum_RawFile = string;

export type Toolkit_VitestCoverage_Runner_Minimum_Settings = unknown;

export type Toolkit_VitestCoverage_Runner_Minimum_Coverage = unknown;

export type Toolkit_VitestCoverage_Runner_Minimum_Value = unknown;

/**
 * Toolkit - Vitest Coverage - Options.
 *
 * @since 0.49.0
 */
export type Toolkit_VitestCoverage_Runner_Options_Options_StartDirectory = string;

export type Toolkit_VitestCoverage_Runner_Options_Options = {
  startDirectory?: Toolkit_VitestCoverage_Runner_Options_Options_StartDirectory;
};

export type Toolkit_VitestCoverage_Runner_Options_Returns_Provider = 'v8';

export type Toolkit_VitestCoverage_Runner_Options_Returns_Reporter = ('json-summary' | 'text-summary')[];

export type Toolkit_VitestCoverage_Runner_Options_Returns_ReportsDirectory = string;

export type Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds_Branches = number;

export type Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds_Functions = number;

export type Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds_Lines = number;

export type Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds_Statements = number;

export type Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds = {
  branches: Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds_Branches;
  functions: Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds_Functions;
  lines: Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds_Lines;
  statements: Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds_Statements;
};

export type Toolkit_VitestCoverage_Runner_Options_Returns = {
  provider: Toolkit_VitestCoverage_Runner_Options_Returns_Provider;
  reporter: Toolkit_VitestCoverage_Runner_Options_Returns_Reporter;
  reportsDirectory: Toolkit_VitestCoverage_Runner_Options_Returns_ReportsDirectory;
  thresholds?: Toolkit_VitestCoverage_Runner_Options_Returns_Thresholds;
};

export type Toolkit_VitestCoverage_Runner_Options_Minimum = number | undefined;
