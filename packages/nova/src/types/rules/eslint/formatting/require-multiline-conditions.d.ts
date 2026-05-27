import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions - Check Logical Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Node = TSESTree.LogicalExpression;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_MaxInline = number;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Returns = void;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Operands = TSESTree.Node[];

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_OperandCount = number;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Prev = TSESTree.Node | undefined;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Curr = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions - Collect Operands.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Node = TSESTree.LogicalExpression;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Returns = TSESTree.Node[];

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleDefaultOptionsMaxInline = number;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleOptions_MaxInline = number;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleOptions_IgnoreFiles;
  maxInline: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleOptions_MaxInline;
}>;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleMaxInline = number;
