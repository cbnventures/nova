import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Bracket Method Call - Check Call Expression.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoBracketMethodCallCheckCallExpressionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintPatternsNoBracketMethodCallCheckCallExpressionNode = TSESTree.CallExpression;

export type RulesEslintPatternsNoBracketMethodCallCheckCallExpressionOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoBracketMethodCallCheckCallExpressionOptionsAllowedMethods = string[];

export type RulesEslintPatternsNoBracketMethodCallCheckCallExpressionOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoBracketMethodCallCheckCallExpressionOptionsIgnoreFiles;
  allowedMethods: RulesEslintPatternsNoBracketMethodCallCheckCallExpressionOptionsAllowedMethods;
}>;

export type RulesEslintPatternsNoBracketMethodCallCheckCallExpressionReturns = void;

export type RulesEslintPatternsNoBracketMethodCallCheckCallExpressionCallee = TSESTree.Expression;

export type RulesEslintPatternsNoBracketMethodCallCheckCallExpressionProperty = TSESTree.Expression | TSESTree.PrivateIdentifier;

export type RulesEslintPatternsNoBracketMethodCallCheckCallExpressionMethodName = string;

/**
 * Rules - ESLint - Patterns - No Bracket Method Call - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoBracketMethodCallRuleDefaultOptionsAllowedMethods = string[];

export type RulesEslintPatternsNoBracketMethodCallRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoBracketMethodCallRuleOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoBracketMethodCallRuleOptionsAllowedMethods = string[];

export type RulesEslintPatternsNoBracketMethodCallRuleOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoBracketMethodCallRuleOptionsIgnoreFiles;
  allowedMethods: RulesEslintPatternsNoBracketMethodCallRuleOptionsAllowedMethods;
}>;
