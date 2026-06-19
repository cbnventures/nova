import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleFix, RuleFixer } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Bracket Assignment - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Patterns - No Bracket Assignment - Check Assignment.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Node = TSESTree.AssignmentExpression;

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Returns = void;

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Left = TSESTree.Expression;

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_ObjectText = string;

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_PropertyText = string;

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_ValueText = string;

/**
 * Rules - ESLint - Patterns - No Bracket Assignment - Check Assignment - Fix.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Fix_Fixer = RuleFixer;

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Fix_Returns = RuleFix;

/**
 * Rules - ESLint - Patterns - No Bracket Assignment - Create.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoBracketAssignment_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Patterns - No Bracket Assignment - Create - Assignment Expression.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_Create_AssignmentExpression_Node = TSESTree.AssignmentExpression;

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_Create_AssignmentExpression_Returns = void;
