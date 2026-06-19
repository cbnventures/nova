import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Template Curly In String - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Patterns - No Template Curly In String - Check Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_CheckLiteral_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_CheckLiteral_Node = TSESTree.Literal;

export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_CheckLiteral_Returns = void;

export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_CheckLiteral_Parent = TSESTree.Node | undefined;

export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_CheckLiteral_IsRegExpArgument = boolean;

export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_CheckLiteral_TemplateCurly = string;

/**
 * Rules - ESLint - Patterns - No Template Curly In String - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Patterns - No Template Curly In String - Create - Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_Create_Literal_Node = TSESTree.Literal;

export type Rules_Eslint_Patterns_NoTemplateCurlyInString_Runner_Create_Literal_Returns = void;
