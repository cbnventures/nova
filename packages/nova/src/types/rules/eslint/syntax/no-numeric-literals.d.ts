import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Syntax - No Numeric Literals - Check Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Node = TSESTree.Literal;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options_AllowHex = boolean;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options_AllowBinary = boolean;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options_AllowOctal = boolean;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options = {
  allowHex: Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options_AllowHex;
  allowBinary: Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options_AllowBinary;
  allowOctal: Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options_AllowOctal;
};

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Returns = void;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Raw = string | undefined;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Lowered = string;

/**
 * Rules - ESLint - Syntax - No Numeric Literals - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsAllowBinary = boolean;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsAllowHex = boolean;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsAllowOctal = boolean;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleOptions_AllowHex = boolean;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleOptions_AllowBinary = boolean;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleOptions_AllowOctal = boolean;

export type Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleOptions_IgnoreFiles;
  allowHex: Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleOptions_AllowHex;
  allowBinary: Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleOptions_AllowBinary;
  allowOctal: Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleOptions_AllowOctal;
}>;
