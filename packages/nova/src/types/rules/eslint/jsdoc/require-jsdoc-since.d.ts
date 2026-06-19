import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleDefaultOptionsIgnoreFiles = string[];

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
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - Class Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ClassDeclaration_Node = TSESTree.ClassDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_ClassDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - Function Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_FunctionDeclaration_Node = TSESTree.FunctionDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_FunctionDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - Method Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_MethodDefinition_Node = TSESTree.MethodDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_MethodDefinition_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - Property Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_PropertyDefinition_Node = TSESTree.PropertyDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_PropertyDefinition_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - TS Enum Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSEnumDeclaration_Node = TSESTree.TSEnumDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSEnumDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - TS Interface Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSInterfaceDeclaration_Node = TSESTree.TSInterfaceDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSInterfaceDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since - Create - TS Type Alias Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSTypeAliasDeclaration_Node = TSESTree.TSTypeAliasDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_Create_TSTypeAliasDeclaration_Returns = void;
