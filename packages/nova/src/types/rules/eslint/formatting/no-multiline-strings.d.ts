import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Backslash Continuation Pattern.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Escaped Newline Pattern.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Newline Character.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleDefaultOptionsAllowEscapeSequences = boolean;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Check Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Node = TSESTree.Literal;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_AllowEscapeSequences = boolean;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Returns = void;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Raw = string;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_RawInner = string;

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Check Template Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Node = TSESTree.TemplateLiteral;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_AllowEscapeSequences = boolean;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Returns = void;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Raw = string;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiRawParts = string[];

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiValue_Raw = string;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiValue_Cooked = string | null;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiValue = {
  raw: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiValue_Raw;
  cooked: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiValue_Cooked;
};

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_Options_AllowEscapeSequences = boolean;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_Options_IgnoreFiles;
  allowEscapeSequences: Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_Options_AllowEscapeSequences;
}>;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_AllowEscapeSequences = boolean;

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Create - Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_Literal_Node = TSESTree.Literal;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_Literal_Returns = void;

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Create - Template Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_TemplateLiteral_Node = TSESTree.TemplateLiteral;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_Create_TemplateLiteral_Returns = void;

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Has Internal Escaped Newlines.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Parts = string[];

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Returns = boolean;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_WorkingParts = string[];

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_First = string | undefined;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_StrippedFirst = string;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_LastIndex = number;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Last = string | undefined;

export type Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_StrippedLast = string;
