import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Name - Check Program.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_AllComments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_FixedValue = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Mismatch_ParamName = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Mismatch_Expected = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Mismatch = {
  paramName: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Mismatch_ParamName;
  expected: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Mismatch_Expected;
};

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Mismatches = Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Mismatch[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Match = RegExpExecArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_ParamName = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_RawDescription = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Description = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Words = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Expected = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_FinalFixedValue = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Name - Param Pattern.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Name - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_RuleOptions_IgnoreFiles;
}>;
