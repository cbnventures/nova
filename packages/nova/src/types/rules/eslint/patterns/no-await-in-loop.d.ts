import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Await In Loop - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowFor = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowForIn = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowForOf = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsAllowWhile = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Patterns - No Await In Loop - Check Await.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Node = TSESTree.AwaitExpression;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_AllowForOf = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_AllowWhile = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_AllowForIn = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_AllowFor = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_IgnoreFiles;
  allowForOf: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_AllowForOf;
  allowWhile: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_AllowWhile;
  allowForIn: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_AllowForIn;
  allowFor: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Options_AllowFor;
}>;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_Returns = void;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_DisallowedLoopTypes = Set<string>;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_CheckAwait_EnclosingLoop = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Patterns - No Await In Loop - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_AllowForOf = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_AllowWhile = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_AllowForIn = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_AllowFor = boolean;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_IgnoreFiles;
  allowForOf: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_AllowForOf;
  allowWhile: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_AllowWhile;
  allowForIn: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_AllowForIn;
  allowFor: Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_Options_AllowFor;
}>;

/**
 * Rules - ESLint - Patterns - No Await In Loop - Create - Await Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_AwaitExpression_Node = TSESTree.AwaitExpression;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_Create_AwaitExpression_Returns = void;

/**
 * Rules - ESLint - Patterns - No Await In Loop - Get Enclosing Loop.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Node = TSESTree.Node;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_DisallowedLoopTypes = Set<string>;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Returns = TSESTree.Node | undefined;

export type Rules_Eslint_Patterns_NoAwaitInLoop_Runner_GetEnclosingLoop_Current = TSESTree.Node | undefined;
