import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Rule.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Check Program.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_AllComments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Line = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Stripped = string;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Match = RegExpExecArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_MatchName = string | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Create.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns - Create - Program.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Program_Returns = void;
