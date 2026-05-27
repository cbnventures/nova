import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Nova - No Logger Dev - Came From Logger Customize.
 *
 * @since 0.12.0
 */
export type Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Identifier = TSESTree.Identifier;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Returns = boolean;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_CameFromLoggerCustomize_Variable = TSESLint.Scope.Variable | undefined;

/**
 * Rules - ESLint - Nova - No Logger Dev - Find Variable.
 *
 * @since 0.12.0
 */
export type Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Identifier = TSESTree.Identifier;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Returns = TSESLint.Scope.Variable | undefined;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_ScopeManager = TSESLint.Scope.ScopeManager | null;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_FindVariable_Variable = TSESLint.Scope.Variable | undefined;

/**
 * Rules - ESLint - Nova - No Logger Dev - Is Logger Customize Call.
 *
 * @since 0.12.0
 */
export type Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Node = TSESTree.Node | null | undefined;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_TypeGuard = TSESTree.CallExpression;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Object = TSESTree.Expression;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_IsLoggerCustomizeCall_Property = TSESTree.Expression | TSESTree.PrivateIdentifier;

/**
 * Rules - ESLint - Nova - No Logger Dev - Rule.
 *
 * @since 0.12.0
 */
export type Rules_Eslint_Nova_NoLoggerDev_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Nova_NoLoggerDev_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Nova_NoLoggerDev_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Nova_NoLoggerDev_Runner_RuleOptions_IgnoreFiles;
}>;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_RuleObject = TSESTree.Expression;

export type Rules_Eslint_Nova_NoLoggerDev_Runner_RuleProperty = TSESTree.Expression | TSESTree.PrivateIdentifier;
