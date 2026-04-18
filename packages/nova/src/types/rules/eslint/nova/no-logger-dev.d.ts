import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Nova - No Logger Dev - Came From Logger Customize.
 *
 * @since 0.12.0
 */
export type RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeIdentifier = TSESTree.Identifier;

export type RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeReturns = boolean;

export type RulesEslintNovaNoLoggerDevCameFromLoggerCustomizeVariable = TSESLint.Scope.Variable | undefined;

/**
 * Rules - ESLint - Nova - No Logger Dev - Find Variable.
 *
 * @since 0.12.0
 */
export type RulesEslintNovaNoLoggerDevFindVariableContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintNovaNoLoggerDevFindVariableIdentifier = TSESTree.Identifier;

export type RulesEslintNovaNoLoggerDevFindVariableReturns = TSESLint.Scope.Variable | undefined;

export type RulesEslintNovaNoLoggerDevFindVariableScopeManager = TSESLint.Scope.ScopeManager | null;

export type RulesEslintNovaNoLoggerDevFindVariableVariable = TSESLint.Scope.Variable | undefined;

/**
 * Rules - ESLint - Nova - No Logger Dev - Is Logger Customize Call.
 *
 * @since 0.12.0
 */
export type RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallNode = TSESTree.Node | null | undefined;

export type RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallTypeGuard = TSESTree.CallExpression;

export type RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallObject = TSESTree.Expression;

export type RulesEslintNovaNoLoggerDevIsLoggerCustomizeCallProperty = TSESTree.Expression | TSESTree.PrivateIdentifier;

/**
 * Rules - ESLint - Nova - No Logger Dev - Rule.
 *
 * @since 0.12.0
 */
export type RulesEslintNovaNoLoggerDevRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintNovaNoLoggerDevRuleOptionsIgnoreFiles = string[];

export type RulesEslintNovaNoLoggerDevRuleOptions = Readonly<{
  ignoreFiles: RulesEslintNovaNoLoggerDevRuleOptionsIgnoreFiles;
}>;

export type RulesEslintNovaNoLoggerDevRuleObject = TSESTree.Expression;

export type RulesEslintNovaNoLoggerDevRuleProperty = TSESTree.Expression | TSESTree.PrivateIdentifier;
