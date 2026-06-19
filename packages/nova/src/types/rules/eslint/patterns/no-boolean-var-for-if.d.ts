import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Boolean Var For If - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Patterns - No Boolean Var For If - Check Variable Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Node = TSESTree.VariableDeclaration;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Returns = void;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Declarator = TSESTree.VariableDeclarator | undefined;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Init = TSESTree.Expression | null | undefined;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_VarName = string;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Parent = TSESTree.Node | undefined;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Body = TSESTree.Statement[];

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_NodeIndex = number;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_NextStatement = TSESTree.Statement | undefined;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_IfTest = TSESTree.Expression;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Scope = TSESLint.Scope.Scope;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_Variable = TSESLint.Scope.Variable | undefined;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_CheckVariableDeclaration_References = TSESLint.Scope.Reference[];

/**
 * Rules - ESLint - Patterns - No Boolean Var For If - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Patterns - No Boolean Var For If - Create - Variable Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_Create_VariableDeclaration_Node = TSESTree.VariableDeclaration;

export type Rules_Eslint_Patterns_NoBooleanVarForIf_Runner_Create_VariableDeclaration_Returns = void;
