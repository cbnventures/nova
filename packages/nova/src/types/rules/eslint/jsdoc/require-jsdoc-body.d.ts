import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

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

/**
 * Rules - ESLint - JSDoc - Require JSDoc Body - Check Program.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_MaxLines = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_MaxWidth = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_MinLines = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_SkipDirectories = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_IgnoreFiles;
  maxLines: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_MaxLines;
  maxWidth: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_MaxWidth;
  minLines: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_MinLines;
  skipDirectories: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Options_SkipDirectories;
}>;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_AllComments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_FoundSummary = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_PastSummary = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_BodyLineCount = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_Trimmed = string;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_BodyReached = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_BodyPast = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_CheckProgram_WidthTrimmed = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Body - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_MaxLines = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_MaxWidth = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_MinLines = number;

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_SkipDirectories = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_IgnoreFiles;
  maxLines: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_MaxLines;
  maxWidth: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_MaxWidth;
  minLines: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_MinLines;
  skipDirectories: Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Options_SkipDirectories;
}>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Body - Create - Program.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocBody_Runner_Create_Program_Returns = void;
