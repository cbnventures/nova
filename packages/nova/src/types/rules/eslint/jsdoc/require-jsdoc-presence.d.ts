import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Rule.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_RuleDefaultOptionsSkipDirectories = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Check Node.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Node = TSESTree.ClassDeclaration | TSESTree.FunctionDeclaration | TSESTree.TSTypeAliasDeclaration | TSESTree.TSInterfaceDeclaration | TSESTree.TSEnumDeclaration | TSESTree.MethodDefinition | TSESTree.PropertyDefinition | TSESTree.VariableDeclaration | TSESTree.ExportNamedDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Comments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_JsdocComment = TSESTree.Comment | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_Options_SkipDirectories = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_Options_IgnoreFiles;
  skipDirectories: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_Options_SkipDirectories;
}>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create - Class Declaration.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ClassDeclaration_Node = TSESTree.ClassDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ClassDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create - Export Named Declaration.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ExportNamedDeclaration_Node = TSESTree.ExportNamedDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ExportNamedDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create - Function Declaration.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_FunctionDeclaration_Node = TSESTree.FunctionDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_FunctionDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create - Method Definition.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_MethodDefinition_Node = TSESTree.MethodDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_MethodDefinition_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create - Property Definition.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_PropertyDefinition_Node = TSESTree.PropertyDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_PropertyDefinition_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create - TS Enum Declaration.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSEnumDeclaration_Node = TSESTree.TSEnumDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSEnumDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create - TS Interface Declaration.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSInterfaceDeclaration_Node = TSESTree.TSInterfaceDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSInterfaceDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create - TS Type Alias Declaration.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSTypeAliasDeclaration_Node = TSESTree.TSTypeAliasDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSTypeAliasDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence - Create - Variable Declaration.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_Node = TSESTree.VariableDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_IsFunctionConst = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_DeclaratorInit = TSESTree.Expression | null;
