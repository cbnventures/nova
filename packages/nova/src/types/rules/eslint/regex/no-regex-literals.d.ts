import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Regex - No Regex Literals - Check Literal.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Node = TSESTree.Literal;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options_IgnoreFiles = string[];

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options_RegexFile = string;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options_IgnoreFiles;
  regexFile: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options_RegexFile;
}>;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Returns = void;

/**
 * Rules - ESLint - Regex - No Regex Literals - Rule.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleDefaultOptionsRegexFile = string;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleOptions_RegexFile = string;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleOptions_IgnoreFiles;
  regexFile: Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleOptions_RegexFile;
}>;
