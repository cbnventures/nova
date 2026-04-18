import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Await In Loop - Boundary Types.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - Patterns - No Await In Loop - Check Await.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoAwaitInLoopCheckAwaitContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitNode = TSESTree.AwaitExpression;

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsAllowForOf = boolean;

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsAllowWhile = boolean;

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsAllowForIn = boolean;

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsAllowFor = boolean;

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsIgnoreFiles;
  allowForOf: RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsAllowForOf;
  allowWhile: RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsAllowWhile;
  allowForIn: RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsAllowForIn;
  allowFor: RulesEslintPatternsNoAwaitInLoopCheckAwaitOptionsAllowFor;
}>;

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitReturns = void;

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitDisallowedLoopTypes = Set<string>;

export type RulesEslintPatternsNoAwaitInLoopCheckAwaitEnclosingLoop = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Patterns - No Await In Loop - Get Enclosing Loop.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopNode = TSESTree.Node;

export type RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopDisallowedLoopTypes = Set<string>;

export type RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopReturns = TSESTree.Node | undefined;

export type RulesEslintPatternsNoAwaitInLoopGetEnclosingLoopCurrent = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Patterns - No Await In Loop - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowFor = boolean;

export type RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowForIn = boolean;

export type RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowForOf = boolean;

export type RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsAllowWhile = boolean;

export type RulesEslintPatternsNoAwaitInLoopRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoAwaitInLoopRuleOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoAwaitInLoopRuleOptionsAllowForOf = boolean;

export type RulesEslintPatternsNoAwaitInLoopRuleOptionsAllowWhile = boolean;

export type RulesEslintPatternsNoAwaitInLoopRuleOptionsAllowForIn = boolean;

export type RulesEslintPatternsNoAwaitInLoopRuleOptionsAllowFor = boolean;

export type RulesEslintPatternsNoAwaitInLoopRuleOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoAwaitInLoopRuleOptionsIgnoreFiles;
  allowForOf: RulesEslintPatternsNoAwaitInLoopRuleOptionsAllowForOf;
  allowWhile: RulesEslintPatternsNoAwaitInLoopRuleOptionsAllowWhile;
  allowForIn: RulesEslintPatternsNoAwaitInLoopRuleOptionsAllowForIn;
  allowFor: RulesEslintPatternsNoAwaitInLoopRuleOptionsAllowFor;
}>;
