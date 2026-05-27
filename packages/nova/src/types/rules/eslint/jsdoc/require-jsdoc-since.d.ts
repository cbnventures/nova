import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Check Node.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Node = TSESTree.ClassDeclaration | TSESTree.MethodDefinition | TSESTree.PropertyDefinition | TSESTree.FunctionDeclaration | TSESTree.TSTypeAliasDeclaration | TSESTree.TSInterfaceDeclaration | TSESTree.TSEnumDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Comments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_JsdocComment = TSESTree.Comment | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleOptions_IgnoreFiles;
}>;
