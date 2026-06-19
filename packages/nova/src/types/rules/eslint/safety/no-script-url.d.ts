import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Safety - No Script URL - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Safety_NoScriptUrl_Runner_RuleDefaultOptionsAllowedPatterns = string[];

export type Rules_Eslint_Safety_NoScriptUrl_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Safety - No Script URL - Check Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Node = TSESTree.Literal;

export type Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_AllowedPatterns = string[];

export type Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Returns = void;

export type Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Value = unknown;

export type Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Lowered = string;

/**
 * Rules - ESLint - Safety - No Script URL - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Safety_NoScriptUrl_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Safety_NoScriptUrl_Runner_Create_Options_AllowedPatterns = string[];

export type Rules_Eslint_Safety_NoScriptUrl_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Safety_NoScriptUrl_Runner_Create_Options_IgnoreFiles;
  allowedPatterns: Rules_Eslint_Safety_NoScriptUrl_Runner_Create_Options_AllowedPatterns;
}>;

/**
 * Rules - ESLint - Safety - No Script URL - Create - Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Safety_NoScriptUrl_Runner_Create_Literal_Node = TSESTree.Literal;

export type Rules_Eslint_Safety_NoScriptUrl_Runner_Create_Literal_Returns = void;
