import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Syntax - No Optional Chaining - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Syntax - No Optional Chaining - Check Chain Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Node = TSESTree.ChainExpression;

export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Returns = void;

/**
 * Rules - ESLint - Syntax - No Optional Chaining - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Syntax_NoOptionalChaining_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Syntax - No Optional Chaining - Create - Chain Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_Create_ChainExpression_Node = TSESTree.ChainExpression;

export type Rules_Eslint_Syntax_NoOptionalChaining_Runner_Create_ChainExpression_Returns = void;
