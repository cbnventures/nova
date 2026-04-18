import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename - Check Program.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireKebabCaseFilenameCheckProgramContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireKebabCaseFilenameCheckProgramOptionsExtraExtensions = string[];

export type RulesEslintConventionsRequireKebabCaseFilenameCheckProgramOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireKebabCaseFilenameCheckProgramOptions = Readonly<{
  extraExtensions: RulesEslintConventionsRequireKebabCaseFilenameCheckProgramOptionsExtraExtensions;
  ignoreFiles: RulesEslintConventionsRequireKebabCaseFilenameCheckProgramOptionsIgnoreFiles;
}>;

export type RulesEslintConventionsRequireKebabCaseFilenameCheckProgramReturns = void;

export type RulesEslintConventionsRequireKebabCaseFilenameCheckProgramStem = string;

export type RulesEslintConventionsRequireKebabCaseFilenameCheckProgramKebabCasePattern = RegExp;

/**
 * Rules - ESLint - Conventions - Require Kebab Case Filename - Get Stem.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireKebabCaseFilenameGetStemFilename = string;

export type RulesEslintConventionsRequireKebabCaseFilenameGetStemExtraExtensions = string[];

export type RulesEslintConventionsRequireKebabCaseFilenameGetStemReturns = string;

export type RulesEslintConventionsRequireKebabCaseFilenameGetStemNormalizedFilename = string;

export type RulesEslintConventionsRequireKebabCaseFilenameGetStemBasename = string;

export type RulesEslintConventionsRequireKebabCaseFilenameGetStemAllExtensions = string[];

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
export type RulesEslintConventionsRequireKebabCaseFilenameRuleDefaultOptionsExtraExtensions = string[];

export type RulesEslintConventionsRequireKebabCaseFilenameRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireKebabCaseFilenameRuleOptionsExtraExtensions = string[];

export type RulesEslintConventionsRequireKebabCaseFilenameRuleOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireKebabCaseFilenameRuleOptions = Readonly<{
  extraExtensions: RulesEslintConventionsRequireKebabCaseFilenameRuleOptionsExtraExtensions;
  ignoreFiles: RulesEslintConventionsRequireKebabCaseFilenameRuleOptionsIgnoreFiles;
}>;
