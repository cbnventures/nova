import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Assign Then Return - Check Return.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Node = TSESTree.ReturnStatement;

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Returns = void;

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Argument = TSESTree.Expression | null;

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Parent = TSESTree.Node | undefined;

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Body = TSESTree.ProgramStatement[] | TSESTree.Statement[];

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_NodeIndex = number;

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_PrevStatement = TSESTree.ProgramStatement | TSESTree.Statement | undefined;

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Declarations = TSESTree.VariableDeclarator[];

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Declarator = TSESTree.VariableDeclarator | undefined;

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_InitText = string;

/**
 * Rules - ESLint - Patterns - No Assign Then Return - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoAssignThenReturn_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_RuleOptions_IgnoreFiles;
}>;
