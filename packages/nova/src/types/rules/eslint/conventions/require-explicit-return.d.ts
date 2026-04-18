import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Explicit Return - Check Function.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireExplicitReturnCheckFunctionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionOptionsExcludeArrowFunctions = boolean;

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionOptionsExcludeConstructors = boolean;

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionOptionsExcludeSetters = boolean;

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionOptions = {
  excludeArrowFunctions: RulesEslintConventionsRequireExplicitReturnCheckFunctionOptionsExcludeArrowFunctions;
  excludeConstructors: RulesEslintConventionsRequireExplicitReturnCheckFunctionOptionsExcludeConstructors;
  excludeSetters: RulesEslintConventionsRequireExplicitReturnCheckFunctionOptionsExcludeSetters;
  ignoreFiles: RulesEslintConventionsRequireExplicitReturnCheckFunctionOptionsIgnoreFiles;
};

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionReturns = void;

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionParent = TSESTree.Node;

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionBody = TSESTree.BlockStatement | TSESTree.Expression;

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionStatements = TSESTree.Statement[];

export type RulesEslintConventionsRequireExplicitReturnCheckFunctionLastStatement = TSESTree.Statement | undefined;

/**
 * Rules - ESLint - Conventions - Require Explicit Return - Has Return Value.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireExplicitReturnHasReturnValueNode = TSESTree.Node;

export type RulesEslintConventionsRequireExplicitReturnHasReturnValueReturns = boolean;

/**
 * Rules - ESLint - Conventions - Require Explicit Return - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsExcludeArrowFunctions = boolean;

export type RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsExcludeConstructors = boolean;

export type RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsExcludeSetters = boolean;

export type RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireExplicitReturnRuleOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireExplicitReturnRuleOptionsExcludeArrowFunctions = boolean;

export type RulesEslintConventionsRequireExplicitReturnRuleOptionsExcludeConstructors = boolean;

export type RulesEslintConventionsRequireExplicitReturnRuleOptionsExcludeSetters = boolean;

export type RulesEslintConventionsRequireExplicitReturnRuleOptions = Readonly<{
  ignoreFiles: RulesEslintConventionsRequireExplicitReturnRuleOptionsIgnoreFiles;
  excludeArrowFunctions: RulesEslintConventionsRequireExplicitReturnRuleOptionsExcludeArrowFunctions;
  excludeConstructors: RulesEslintConventionsRequireExplicitReturnRuleOptionsExcludeConstructors;
  excludeSetters: RulesEslintConventionsRequireExplicitReturnRuleOptionsExcludeSetters;
}>;
