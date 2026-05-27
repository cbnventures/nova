import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Check Condition.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Node = TSESTree.IfStatement | TSESTree.WhileStatement | TSESTree.DoWhileStatement | TSESTree.ForStatement | TSESTree.ConditionalExpression;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Returns = void;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Test = TSESTree.Expression | null | undefined;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Check Negation.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Node = TSESTree.UnaryExpression;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Returns = void;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Is Implicit Boolean.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Node = TSESTree.Node;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Returns = boolean;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Argument = TSESTree.Expression;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Is Inside Condition Test.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Node = TSESTree.Node;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Returns = boolean;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Current = TSESTree.Node | null | undefined;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Report Implicit Nodes.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Test = TSESTree.Node;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Returns = void;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_RuleOptions_IgnoreFiles;
}>;
