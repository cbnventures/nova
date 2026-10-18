import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Rule.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Check Node.
 *
 * @since 0.32.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Node = TSESTree.FunctionDeclaration | TSESTree.MethodDefinition | TSESTree.PropertyDefinition | TSESTree.VariableDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Target = TSESTree.Node;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Comments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_JsdocComment = TSESTree.Comment | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_HasReturnTag = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_CurrentLine = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Stripped = string;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Match = RegExpExecArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_MatchName = string | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Check Program.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_AllComments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Line = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Stripped = string;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Match = RegExpExecArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_MatchName = string | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Create.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Create - Function Declaration.
 *
 * @since 0.32.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_FunctionDeclaration_Node = TSESTree.FunctionDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_FunctionDeclaration_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Create - Method Definition.
 *
 * @since 0.32.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_MethodDefinition_Node = TSESTree.MethodDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_MethodDefinition_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Create - Program.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Program_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Create - Property Definition.
 *
 * @since 0.32.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_PropertyDefinition_Node = TSESTree.PropertyDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_PropertyDefinition_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_PropertyDefinition_Value = TSESTree.Expression | null;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Create - Variable Declaration.
 *
 * @since 0.32.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_Node = TSESTree.VariableDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_IsFunctionConst = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_DeclaratorInit = TSESTree.Expression | null;
