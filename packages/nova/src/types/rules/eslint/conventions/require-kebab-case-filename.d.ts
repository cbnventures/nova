import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleDefaultOptionsExtraExtensions = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_RuleDefaultOptionsIgnoreFiles = string[];

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
 * Rules - ESLint - Conventions - Require Kebab Case Filename - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_Create_Options_ExtraExtensions = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_Create_Options = Readonly<{
  extraExtensions: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_Create_Options_ExtraExtensions;
  ignoreFiles: Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename - Create - Program.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireKebabCaseFilename_Runner_Create_Program_Returns = void;

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
