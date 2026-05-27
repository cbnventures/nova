import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

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
 * Rules - ESLint - Patterns - No Bracket Assignment - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoBracketAssignment_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoBracketAssignment_Runner_RuleOptions_IgnoreFiles;
}>;
