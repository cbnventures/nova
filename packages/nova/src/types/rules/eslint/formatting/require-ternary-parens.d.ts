import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleFix, RuleFixer } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Ternary Parens - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - Formatting - Require Ternary Parens - Check Conditional Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Node = TSESTree.ConditionalExpression;

export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Returns = void;

export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_SourceText = string;

export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_TestStart = number;

export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_CharBefore = string | undefined;

/**
 * Rules - ESLint - Formatting - Require Ternary Parens - Check Conditional Expression - Fix.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Fix_Fixer = RuleFixer;

export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Fix_Returns = RuleFix[];

/**
 * Rules - ESLint - Formatting - Require Ternary Parens - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - Formatting - Require Ternary Parens - Create - Conditional Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_ConditionalExpression_Node = TSESTree.ConditionalExpression;

export type Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_ConditionalExpression_Returns = void;
