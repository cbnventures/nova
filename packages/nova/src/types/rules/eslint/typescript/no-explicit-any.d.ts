import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - TypeScript - No Explicit Any - Check Any Keyword.
 *
 * @since 0.15.0
 */
export type RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordNode = TSESTree.TSAnyKeyword;

export type RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordReturns = void;

/**
 * Rules - ESLint - TypeScript - No Explicit Any - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintTypescriptNoExplicitAnyRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptNoExplicitAnyRuleOptionsIgnoreFiles = string[];

export type RulesEslintTypescriptNoExplicitAnyRuleOptions = Readonly<{
  ignoreFiles: RulesEslintTypescriptNoExplicitAnyRuleOptionsIgnoreFiles;
}>;
