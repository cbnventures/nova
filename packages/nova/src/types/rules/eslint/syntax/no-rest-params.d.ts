import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Syntax - No Rest Params - Check Function.
 *
 * @since 0.15.0
 */
export type RulesEslintSyntaxNoRestParamsCheckFunctionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintSyntaxNoRestParamsCheckFunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type RulesEslintSyntaxNoRestParamsCheckFunctionAllowPatterns = string[];

export type RulesEslintSyntaxNoRestParamsCheckFunctionReturns = void;

export type RulesEslintSyntaxNoRestParamsCheckFunctionFunctionName = string | undefined;

/**
 * Rules - ESLint - Syntax - No Rest Params - Get Function Name.
 *
 * @since 0.15.0
 */
export type RulesEslintSyntaxNoRestParamsGetFunctionNameNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type RulesEslintSyntaxNoRestParamsGetFunctionNameReturns = string | undefined;

export type RulesEslintSyntaxNoRestParamsGetFunctionNameParent = TSESTree.Node | undefined;

export type RulesEslintSyntaxNoRestParamsGetFunctionNameClassNode = TSESTree.Node | undefined;

export type RulesEslintSyntaxNoRestParamsGetFunctionNameObjectNode = TSESTree.Node | undefined;

export type RulesEslintSyntaxNoRestParamsGetFunctionNameParentName = string | undefined;

/**
 * Rules - ESLint - Syntax - No Rest Params - Get Parent Name.
 *
 * @since 0.15.0
 */
export type RulesEslintSyntaxNoRestParamsGetParentNameNode = TSESTree.Node;

export type RulesEslintSyntaxNoRestParamsGetParentNameReturns = string | undefined;

export type RulesEslintSyntaxNoRestParamsGetParentNameClassNode = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Syntax - No Rest Params - Is Allowed.
 *
 * @since 0.15.0
 */
export type RulesEslintSyntaxNoRestParamsIsAllowedName = string;

export type RulesEslintSyntaxNoRestParamsIsAllowedPatterns = string[];

export type RulesEslintSyntaxNoRestParamsIsAllowedReturns = boolean;

export type RulesEslintSyntaxNoRestParamsIsAllowedPrefix = string;

/**
 * Rules - ESLint - Syntax - No Rest Params - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintSyntaxNoRestParamsRuleDefaultOptionsAllow = string[];

export type RulesEslintSyntaxNoRestParamsRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintSyntaxNoRestParamsRuleOptionsIgnoreFiles = string[];

export type RulesEslintSyntaxNoRestParamsRuleOptionsAllow = string[];

export type RulesEslintSyntaxNoRestParamsRuleOptions = Readonly<{
  ignoreFiles: RulesEslintSyntaxNoRestParamsRuleOptionsIgnoreFiles;
  allow: RulesEslintSyntaxNoRestParamsRuleOptionsAllow;
}>;

export type RulesEslintSyntaxNoRestParamsRuleAllowPatterns = string[];
