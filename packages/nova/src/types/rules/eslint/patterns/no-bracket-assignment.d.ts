import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Bracket Assignment - Check Assignment.
 *
 * @since 0.14.0
 */
export type RulesEslintPatternsNoBracketAssignmentCheckAssignmentContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintPatternsNoBracketAssignmentCheckAssignmentNode = TSESTree.AssignmentExpression;

export type RulesEslintPatternsNoBracketAssignmentCheckAssignmentReturns = void;

export type RulesEslintPatternsNoBracketAssignmentCheckAssignmentLeft = TSESTree.Expression;

export type RulesEslintPatternsNoBracketAssignmentCheckAssignmentObjectText = string;

export type RulesEslintPatternsNoBracketAssignmentCheckAssignmentPropertyText = string;

export type RulesEslintPatternsNoBracketAssignmentCheckAssignmentValueText = string;

/**
 * Rules - ESLint - Patterns - No Bracket Assignment - Rule.
 *
 * @since 0.14.0
 */
export type RulesEslintPatternsNoBracketAssignmentRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoBracketAssignmentRuleOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoBracketAssignmentRuleOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoBracketAssignmentRuleOptionsIgnoreFiles;
}>;
