import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups - Check Logical Expression.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionNode = TSESTree.LogicalExpression;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionGroupStyle = string;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionReturns = void;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionParent = TSESTree.Node;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOperands = TSESTree.Node[];

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionPrev = TSESTree.Node | undefined;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionCurr = TSESTree.Node | undefined;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionSourceCode = Readonly<RuleContext<string, unknown[]>>['sourceCode'];

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionTokensBetween = TSESTree.Token[];

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOperatorIndex = number;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOperatorToken = TSESTree.Token | undefined;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionCloseParen = TSESTree.Token | undefined;

export type RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOpenParen = TSESTree.Token | undefined;

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups - Collect Group Operands.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireMultilineConditionGroupsCollectGroupOperandsNode = TSESTree.LogicalExpression;

export type RulesEslintFormattingRequireMultilineConditionGroupsCollectGroupOperandsReturns = TSESTree.Node[];

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequireMultilineConditionGroupsRuleDefaultOptionsGroupStyle = string;

export type RulesEslintFormattingRequireMultilineConditionGroupsRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequireMultilineConditionGroupsRuleOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequireMultilineConditionGroupsRuleOptionsGroupStyle = string;

export type RulesEslintFormattingRequireMultilineConditionGroupsRuleOptions = Readonly<{
  ignoreFiles: RulesEslintFormattingRequireMultilineConditionGroupsRuleOptionsIgnoreFiles;
  groupStyle: RulesEslintFormattingRequireMultilineConditionGroupsRuleOptionsGroupStyle;
}>;

export type RulesEslintFormattingRequireMultilineConditionGroupsRuleGroupStyle = string;
