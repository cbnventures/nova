import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Syntax - No Rest Params - Check Function.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Node = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_AllowPatterns = string[];

export type Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_Returns = void;

export type Rules_Eslint_Syntax_NoRestParams_Runner_CheckFunction_FunctionName = string | undefined;

/**
 * Rules - ESLint - Syntax - No Rest Params - Get Function Name.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Node = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Returns = string | undefined;

export type Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_Parent = TSESTree.Node | undefined;

export type Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_ClassNode = TSESTree.Node | undefined;

export type Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_ObjectNode = TSESTree.Node | undefined;

export type Rules_Eslint_Syntax_NoRestParams_Runner_GetFunctionName_ParentName = string | undefined;

/**
 * Rules - ESLint - Syntax - No Rest Params - Get Parent Name.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_Node = TSESTree.Node;

export type Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_Returns = string | undefined;

export type Rules_Eslint_Syntax_NoRestParams_Runner_GetParentName_ClassNode = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Syntax - No Rest Params - Is Allowed.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Name = string;

export type Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Patterns = string[];

export type Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Returns = boolean;

export type Rules_Eslint_Syntax_NoRestParams_Runner_IsAllowed_Prefix = string;

/**
 * Rules - ESLint - Syntax - No Rest Params - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoRestParams_Runner_RuleDefaultOptionsAllow = string[];

export type Rules_Eslint_Syntax_NoRestParams_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Syntax_NoRestParams_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Syntax_NoRestParams_Runner_RuleOptions_Allow = string[];

export type Rules_Eslint_Syntax_NoRestParams_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Syntax_NoRestParams_Runner_RuleOptions_IgnoreFiles;
  allow: Rules_Eslint_Syntax_NoRestParams_Runner_RuleOptions_Allow;
}>;

export type Rules_Eslint_Syntax_NoRestParams_Runner_RuleAllowPatterns = string[];
