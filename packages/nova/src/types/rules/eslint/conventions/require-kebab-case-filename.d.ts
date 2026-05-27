import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename - Check Program.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Options_ExtraExtensions = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Options = Readonly<{
  extraExtensions: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Options_ExtraExtensions;
  ignoreFiles: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Options_IgnoreFiles;
}>;

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Returns = void;

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_Stem = string;

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_CheckProgram_KebabCasePattern = RegExp;

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename - Get Stem.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Filename = string;

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_ExtraExtensions = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Returns = string;

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_NormalizedFilename = string;

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_Basename = string;

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_GetStem_AllExtensions = string[];

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename - Known Extensions.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleDefaultOptionsExtraExtensions = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleOptions_ExtraExtensions = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleOptions = Readonly<{
  extraExtensions: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleOptions_ExtraExtensions;
  ignoreFiles: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleOptions_IgnoreFiles;
}>;
