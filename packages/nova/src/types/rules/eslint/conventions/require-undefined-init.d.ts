import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Undefined Init - Check Declarator.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireUndefinedInit_Runner_CheckDeclarator_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireUndefinedInit_Runner_CheckDeclarator_Node = TSESTree.VariableDeclarator;

export type Rules_Eslint_Conventions_RequireUndefinedInit_Runner_CheckDeclarator_Returns = void;

export type Rules_Eslint_Conventions_RequireUndefinedInit_Runner_CheckDeclarator_Parent = TSESTree.Node | undefined;

export type Rules_Eslint_Conventions_RequireUndefinedInit_Runner_CheckDeclarator_Grandparent = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Conventions - Require Undefined Init - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireUndefinedInit_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireUndefinedInit_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireUndefinedInit_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_RequireUndefinedInit_Runner_RuleOptions_IgnoreFiles;
}>;
