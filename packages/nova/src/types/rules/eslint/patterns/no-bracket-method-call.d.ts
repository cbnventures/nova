import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

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
 * Rules - ESLint - Patterns - No Bracket Method Call - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleDefaultOptionsAllowedMethods = string[];

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleOptions_AllowedMethods = string[];

export type Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleOptions_IgnoreFiles;
  allowedMethods: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleOptions_AllowedMethods;
}>;
