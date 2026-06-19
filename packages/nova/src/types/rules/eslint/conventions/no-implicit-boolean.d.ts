import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_RuleDefaultOptionsIgnoreFiles = string[];

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
 * Rules - ESLint - Conventions - No Implicit Boolean - Create.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Create - Conditional Expression.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ConditionalExpression_Node = TSESTree.ConditionalExpression;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ConditionalExpression_Returns = void;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Create - Do While Statement.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_DoWhileStatement_Node = TSESTree.DoWhileStatement;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_DoWhileStatement_Returns = void;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Create - For Statement.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ForStatement_Node = TSESTree.ForStatement;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ForStatement_Returns = void;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Create - If Statement.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_IfStatement_Node = TSESTree.IfStatement;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_IfStatement_Returns = void;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Create - Unary Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_UnaryExpression_Node = TSESTree.UnaryExpression;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_UnaryExpression_Returns = void;

/**
 * Rules - ESLint - Conventions - No Implicit Boolean - Create - While Statement.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_WhileStatement_Node = TSESTree.WhileStatement;

export type Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_WhileStatement_Returns = void;

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
