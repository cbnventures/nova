import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Body - Check Program.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_AllComments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_FoundSummary = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_PastSummary = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_BodyLineCount = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Trimmed = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Body - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleDefaultOptionsMaxLines = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleDefaultOptionsMaxWidth = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleDefaultOptionsMinLines = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleDefaultOptionsSkipDirectories = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_MaxLines = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_MaxWidth = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_MinLines = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_SkipDirectories = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_IgnoreFiles;
  maxLines: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_MaxLines;
  maxWidth: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_MaxWidth;
  minLines: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_MinLines;
  skipDirectories: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_RuleOptions_SkipDirectories;
}>;
