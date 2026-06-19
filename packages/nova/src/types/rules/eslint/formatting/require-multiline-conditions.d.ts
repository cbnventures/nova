import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleDefaultOptionsMaxInline = number;

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

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Operands = TSESTree.Node[];

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_Create_Options_MaxInline = number;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_Create_Options_IgnoreFiles;
  maxInline: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_Create_Options_MaxInline;
}>;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_Create_MaxInline = number;

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions - Create - Logical Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_Create_LogicalExpression_Node = TSESTree.LogicalExpression;

export type Rules_Eslint_Formatting_RequireMultilineConditions_Runner_Create_LogicalExpression_Returns = void;
