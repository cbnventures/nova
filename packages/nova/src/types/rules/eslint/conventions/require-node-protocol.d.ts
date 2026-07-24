import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleFix, RuleFixer } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Node Protocol - Rule.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Conventions - Require Node Protocol - Check Source.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Source = TSESTree.Node | null;

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Returns = void;

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Value = string;

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Base = string | undefined;

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Raw = string;

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Quote = string;

/**
 * Rules - ESLint - Conventions - Require Node Protocol - Check Source - Fix.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Fix_Fixer = Readonly<RuleFixer>;

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_CheckSource_Fix_Returns = RuleFix;

/**
 * Rules - ESLint - Conventions - Require Node Protocol - Create.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Options_IgnoreFiles;
}>;

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Node =
  | TSESTree.ExportAllDeclaration
  | TSESTree.ExportNamedDeclaration
  | TSESTree.ImportDeclaration
  | TSESTree.ImportExpression;

export type Rules_Eslint_Conventions_RequireNodeProtocol_Runner_Create_Returns = void;
