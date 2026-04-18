import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Regex - No Regex Literals - Check Literal.
 *
 * @since 0.13.0
 */
export type RulesEslintRegexNoRegexLiteralsCheckLiteralContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintRegexNoRegexLiteralsCheckLiteralNode = TSESTree.Literal;

export type RulesEslintRegexNoRegexLiteralsCheckLiteralOptionsIgnoreFiles = string[];

export type RulesEslintRegexNoRegexLiteralsCheckLiteralOptionsRegexFile = string;

export type RulesEslintRegexNoRegexLiteralsCheckLiteralOptions = Readonly<{
  ignoreFiles: RulesEslintRegexNoRegexLiteralsCheckLiteralOptionsIgnoreFiles;
  regexFile: RulesEslintRegexNoRegexLiteralsCheckLiteralOptionsRegexFile;
}>;

export type RulesEslintRegexNoRegexLiteralsCheckLiteralReturns = void;

/**
 * Rules - ESLint - Regex - No Regex Literals - Rule.
 *
 * @since 0.13.0
 */
export type RulesEslintRegexNoRegexLiteralsRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintRegexNoRegexLiteralsRuleDefaultOptionsRegexFile = string;

export type RulesEslintRegexNoRegexLiteralsRuleOptionsIgnoreFiles = string[];

export type RulesEslintRegexNoRegexLiteralsRuleOptionsRegexFile = string;

export type RulesEslintRegexNoRegexLiteralsRuleOptions = Readonly<{
  ignoreFiles: RulesEslintRegexNoRegexLiteralsRuleOptionsIgnoreFiles;
  regexFile: RulesEslintRegexNoRegexLiteralsRuleOptionsRegexFile;
}>;
