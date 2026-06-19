import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleDefaultOptionsGroupStyle = string;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups - Check Logical Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Node = TSESTree.LogicalExpression;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_GroupStyle = string;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Returns = void;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Parent = TSESTree.Node;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Operands = TSESTree.Node[];

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Prev = TSESTree.Node | undefined;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Curr = TSESTree.Node | undefined;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_SourceCode = Readonly<RuleContext<string, unknown[]>>['sourceCode'];

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_TokensBetween = TSESTree.Token[];

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_OperatorIndex = number;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_OperatorToken = TSESTree.Token | undefined;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_CloseParen = TSESTree.Token | undefined;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_OpenParen = TSESTree.Token | undefined;

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups - Collect Group Operands.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Node = TSESTree.LogicalExpression;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Returns = TSESTree.Node[];

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Operands = TSESTree.Node[];

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_Create_Options_GroupStyle = string;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_Create_Options_IgnoreFiles;
  groupStyle: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_Create_Options_GroupStyle;
}>;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_Create_GroupStyle = string;

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups - Create - Logical Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_Create_LogicalExpression_Node = TSESTree.LogicalExpression;

export type Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_Create_LogicalExpression_Returns = void;
