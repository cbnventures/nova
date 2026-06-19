import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal - Check Template Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Node = TSESTree.TemplateLiteral;

export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Returns = void;

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal - Create - Template Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_Create_TemplateLiteral_Node = TSESTree.TemplateLiteral;

export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_Create_TemplateLiteral_Returns = void;
