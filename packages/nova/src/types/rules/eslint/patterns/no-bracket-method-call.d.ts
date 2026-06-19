import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleFix, RuleFixer } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Bracket Method Call - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleDefaultOptionsAllowedMethods = string[];

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Patterns - No Bracket Method Call - Check Call Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Node = TSESTree.CallExpression;

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Options_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Options_AllowedMethods = string[];

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Options_IgnoreFiles;
  allowedMethods: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Options_AllowedMethods;
}>;

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Returns = void;

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Callee = TSESTree.Expression;

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Property = TSESTree.Expression | TSESTree.PrivateIdentifier;

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_MethodName = string;

/**
 * Rules - ESLint - Patterns - No Bracket Method Call - Check Call Expression - Fix.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Fix_Fixer = RuleFixer;

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Fix_Returns = RuleFix;

/**
 * Rules - ESLint - Patterns - No Bracket Method Call - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_Options_AllowedMethods = string[];

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_Options_IgnoreFiles;
  allowedMethods: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_Options_AllowedMethods;
}>;

/**
 * Rules - ESLint - Patterns - No Bracket Method Call - Create - Call Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_CallExpression_Node = TSESTree.CallExpression;

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_CallExpression_Returns = void;
