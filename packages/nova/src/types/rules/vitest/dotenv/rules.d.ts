import type { Rules_Vitest_Index_DotenvResolvedConfig } from '../index.d.ts';

/**
 * Rules - Vitest - Dotenv - Rules - Values Double Quoted.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Config = Rules_Vitest_Index_DotenvResolvedConfig;

export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Enable = 'all' | 'values-double-quoted'[];

export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Returns = void;

export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Failures = string[];

export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_FilePath = string;

export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Content = string;

export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Violation_Key = string;

export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Violation_Reason = string;

export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Violation = {
  key: Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Violation_Key;
  reason: Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Violation_Reason;
};

export type Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Violations = Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Violation[];
