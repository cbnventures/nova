import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Regex - No Regex Literal Flags - Check Literal.
 *
 * @since 0.13.0
 */
export type RulesEslintRegexNoRegexLiteralFlagsCheckLiteralContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintRegexNoRegexLiteralFlagsCheckLiteralNode = TSESTree.Literal;

export type RulesEslintRegexNoRegexLiteralFlagsCheckLiteralReturns = void;

/**
 * Rules - ESLint - Regex - No Regex Literal Flags - Rule.
 *
 * @since 0.13.0
 */
export type RulesEslintRegexNoRegexLiteralFlagsRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintRegexNoRegexLiteralFlagsRuleOptionsIgnoreFiles = string[];

export type RulesEslintRegexNoRegexLiteralFlagsRuleOptions = Readonly<{
  ignoreFiles: RulesEslintRegexNoRegexLiteralFlagsRuleOptionsIgnoreFiles;
}>;
