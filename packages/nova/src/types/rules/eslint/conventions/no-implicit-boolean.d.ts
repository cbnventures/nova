import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Check Condition.
 *
 * @since 0.14.0
 */
export type RulesEslintConventionsNoImplicitBooleanCheckConditionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsNoImplicitBooleanCheckConditionNode = TSESTree.IfStatement | TSESTree.WhileStatement | TSESTree.DoWhileStatement | TSESTree.ForStatement | TSESTree.ConditionalExpression;

export type RulesEslintConventionsNoImplicitBooleanCheckConditionReturns = void;

export type RulesEslintConventionsNoImplicitBooleanCheckConditionTest = TSESTree.Expression | null | undefined;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Check Negation.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsNoImplicitBooleanCheckNegationContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsNoImplicitBooleanCheckNegationNode = TSESTree.UnaryExpression;

export type RulesEslintConventionsNoImplicitBooleanCheckNegationReturns = void;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Is Implicit Boolean.
 *
 * @since 0.14.0
 */
export type RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanNode = TSESTree.Node;

export type RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanReturns = boolean;

export type RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanArgument = TSESTree.Expression;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Is Inside Condition Test.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestNode = TSESTree.Node;

export type RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestReturns = boolean;

export type RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestCurrent = TSESTree.Node | null | undefined;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Report Implicit Nodes.
 *
 * @since 0.14.0
 */
export type RulesEslintConventionsNoImplicitBooleanReportImplicitNodesContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsNoImplicitBooleanReportImplicitNodesTest = TSESTree.Node;

export type RulesEslintConventionsNoImplicitBooleanReportImplicitNodesReturns = void;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Rule.
 *
 * @since 0.14.0
 */
export type RulesEslintConventionsNoImplicitBooleanRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintConventionsNoImplicitBooleanRuleOptionsIgnoreFiles = string[];

export type RulesEslintConventionsNoImplicitBooleanRuleOptions = Readonly<{
  ignoreFiles: RulesEslintConventionsNoImplicitBooleanRuleOptionsIgnoreFiles;
}>;
