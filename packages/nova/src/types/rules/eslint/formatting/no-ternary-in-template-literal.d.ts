import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal - Check Template Literal.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Node = TSESTree.TemplateLiteral;

export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Returns = void;

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_RuleOptions_IgnoreFiles;
}>;
