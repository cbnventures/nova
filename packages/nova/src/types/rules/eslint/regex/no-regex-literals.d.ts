import type { Stats } from 'node:fs';

import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Regex - No Regex Literals - Rule.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleDefaultOptionsRegexFile = string;

/**
 * Rules - ESLint - Regex - No Regex Literals - Check Literal.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Node = TSESTree.Literal;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options_IgnoreFiles = string[];

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options_RegexFile = string;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options_IgnoreFiles;
  regexFile: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options_RegexFile;
}>;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Returns = void;

/**
 * Rules - ESLint - Regex - No Regex Literals - Check Reg Exp Constructor.
 *
 * @since 0.20.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Node = TSESTree.NewExpression | TSESTree.CallExpression;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Options_IgnoreFiles = string[];

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Options_RegexFile = string;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Options_IgnoreFiles;
  regexFile: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Options_RegexFile;
}>;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Returns = void;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_FirstArgument = TSESTree.Node | undefined;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_IsStringLiteral = boolean;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_IsStaticTemplate = boolean;

/**
 * Rules - ESLint - Regex - No Regex Literals - Create.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Options_RegexFile = string;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Options_IgnoreFiles;
  regexFile: Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Options_RegexFile;
}>;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_RegexFilePath = string | undefined;

/**
 * Rules - ESLint - Regex - No Regex Literals - Create - Call Expression.
 *
 * @since 0.20.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_CallExpression_Node = TSESTree.CallExpression;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_CallExpression_Returns = void;

/**
 * Rules - ESLint - Regex - No Regex Literals - Create - Literal.
 *
 * @since 0.13.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Node = TSESTree.Literal;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Returns = void;

/**
 * Rules - ESLint - Regex - No Regex Literals - Create - New Expression.
 *
 * @since 0.20.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_NewExpression_Node = TSESTree.NewExpression;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_NewExpression_Returns = void;

/**
 * Rules - ESLint - Regex - No Regex Literals - Resolve Regex File.
 *
 * @since 0.26.0
 */
export type Rules_Eslint_Regex_NoRegexLiterals_Runner_ResolveRegexFile_Context = Readonly<RuleContext<string, readonly unknown[]>>;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_ResolveRegexFile_RegexFile = string;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_ResolveRegexFile_Returns = string | undefined;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_ResolveRegexFile_RegexFilePath = string;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_ResolveRegexFile_RegexFileStats = Stats;

export type Rules_Eslint_Regex_NoRegexLiterals_Runner_ResolveRegexFile_IsRegexFile = boolean;
