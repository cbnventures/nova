import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_RuleDefaultOptionsMaxChainLength = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_RuleDefaultOptionsMaxNestedArrows = number;

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Check Arrow Function.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Node = TSESTree.ArrowFunctionExpression;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_MaxNestedArrows = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_MaxChainLength = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Returns = void;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Body = TSESTree.Expression;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_NestedCount = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_ChainLength = number;

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Count Chain Length.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Node = TSESTree.Node;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Returns = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Count = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Current = TSESTree.Node;

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Count Nested Arrows.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Node = TSESTree.Node;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Returns = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Count = number;

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_Options_MaxNestedArrows = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_Options_MaxChainLength = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_Options_IgnoreFiles;
  maxNestedArrows: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_Options_MaxNestedArrows;
  maxChainLength: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_Options_MaxChainLength;
}>;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_MaxNestedArrows = number;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_MaxChainLength = number;

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Create - Arrow Function Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_ArrowFunctionExpression_Node = TSESTree.ArrowFunctionExpression;

export type Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_ArrowFunctionExpression_Returns = void;
