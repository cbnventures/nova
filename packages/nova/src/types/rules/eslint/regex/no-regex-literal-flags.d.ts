import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Regex - No Regex Literal Flags - Rule.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Regex - No Regex Literal Flags - Check Literal.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Node = TSESTree.Literal;

export type Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Returns = void;

/**
 * Rules - ESLint - Regex - No Regex Literal Flags - Create.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Regex - No Regex Literal Flags - Create - Literal.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_Create_Literal_Node = TSESTree.Literal;

export type Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_Create_Literal_Returns = void;
