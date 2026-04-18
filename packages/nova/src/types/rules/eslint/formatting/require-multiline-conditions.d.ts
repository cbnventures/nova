import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions - Check Logical Expression.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionNode = TSESTree.LogicalExpression;

export type RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionMaxInline = number;

export type RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionReturns = void;

export type RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionOperands = TSESTree.Node[];

export type RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionOperandCount = number;

export type RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionPrev = TSESTree.Node | undefined;

export type RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionCurr = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions - Collect Operands.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireMultilineConditionsCollectOperandsNode = TSESTree.LogicalExpression;

export type RulesEslintFormattingRequireMultilineConditionsCollectOperandsReturns = TSESTree.Node[];

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireMultilineConditionsRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequireMultilineConditionsRuleDefaultOptionsMaxInline = number;

export type RulesEslintFormattingRequireMultilineConditionsRuleOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequireMultilineConditionsRuleOptionsMaxInline = number;

export type RulesEslintFormattingRequireMultilineConditionsRuleOptions = Readonly<{
  ignoreFiles: RulesEslintFormattingRequireMultilineConditionsRuleOptionsIgnoreFiles;
  maxInline: RulesEslintFormattingRequireMultilineConditionsRuleOptionsMaxInline;
}>;

export type RulesEslintFormattingRequireMultilineConditionsRuleMaxInline = number;
