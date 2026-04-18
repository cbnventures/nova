import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Ternary Parens - Check Conditional Expression.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionNode = TSESTree.ConditionalExpression;

export type RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionReturns = void;

export type RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionSourceText = string;

export type RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionTestStart = number;

export type RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionCharBefore = string | undefined;

/**
 * Rules - ESLint - Formatting - Require Ternary Parens - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireTernaryParensRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequireTernaryParensRuleOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequireTernaryParensRuleOptions = Readonly<{
  ignoreFiles: RulesEslintFormattingRequireTernaryParensRuleOptionsIgnoreFiles;
}>;
