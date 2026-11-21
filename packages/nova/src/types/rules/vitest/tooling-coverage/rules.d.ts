import type { ESLint } from 'eslint';
import type { Diagnostic, ParsedCommandLine } from 'typescript';

import type {
  Rules_Vitest_Index_ToolingCoverageResolvedConfig,
  Rules_Vitest_Index_ToolingCoverageToggleKey,
} from '../index.d.ts';

/**
 * Rules - Vitest - Tooling Coverage - Rules - Discover Scripts.
 *
 * @since 0.49.0
 */
export type Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_RootDir = string;

export type Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_Returns = Promise<string[]>;

export type Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_Matched = string[];

/**
 * Rules - Vitest - Tooling Coverage - Rules - Normalize Path.
 *
 * @since 0.49.0
 */
export type Rules_Vitest_ToolingCoverage_Rules_NormalizePath_FilePath = string;

export type Rules_Vitest_ToolingCoverage_Rules_NormalizePath_Returns = string;

/**
 * Rules - Vitest - Tooling Coverage - Rules - No Skip Lib Check.
 *
 * @since 0.49.0
 */
export type Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Config = Rules_Vitest_Index_ToolingCoverageResolvedConfig;

export type Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Enable = 'all' | Rules_Vitest_Index_ToolingCoverageToggleKey[];

export type Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Returns = void;

export type Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_Entries = string[];

export type Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_Failures = string[];

export type Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_FilePath = string;

export type Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_Parsed = ParsedCommandLine | undefined;

/**
 * Rules - Vitest - Tooling Coverage - Rules - Parse Tsconfig.
 *
 * @since 0.49.0
 */
export type Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_FilePath = string;

export type Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Returns = ParsedCommandLine | undefined;

export type Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Read_Config = unknown;

export type Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Read_Error = Diagnostic;

export type Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Read = {
  config?: Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Read_Config;
  error?: Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Read_Error;
};

export type Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Config = unknown;

/**
 * Rules - Vitest - Tooling Coverage - Rules - Scripts Linted.
 *
 * @since 0.49.0
 */
export type Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Config = Rules_Vitest_Index_ToolingCoverageResolvedConfig;

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Enable = 'all' | Rules_Vitest_Index_ToolingCoverageToggleKey[];

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Returns = void;

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_ScriptFiles = string[];

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_Eslint = ESLint;

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_Failures = string[];

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_IsIgnored = boolean;

/**
 * Rules - Vitest - Tooling Coverage - Rules - Scripts Type Checked.
 *
 * @since 0.49.0
 */
export type Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Config = Rules_Vitest_Index_ToolingCoverageResolvedConfig;

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Enable = 'all' | Rules_Vitest_Index_ToolingCoverageToggleKey[];

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Returns = void;

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_ScriptFiles = string[];

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_TsconfigPath = string;

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_TsconfigExists = boolean;

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_Parsed = ParsedCommandLine | undefined;

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_IncludedFiles = Set<string>;

export type Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_Failures = string[];
