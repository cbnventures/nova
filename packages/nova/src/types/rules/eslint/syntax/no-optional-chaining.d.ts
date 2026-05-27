import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Syntax - No Optional Chaining - Check Chain Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Node = TSESTree.ChainExpression;

export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Returns = void;

/**
 * Rules - ESLint - Syntax - No Optional Chaining - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Syntax_NoOptionalChaining_Runner_RuleOptions_IgnoreFiles;
}>;
