import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Body - Check Program.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocBodyCheckProgramContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintJsdocRequireJsdocBodyCheckProgramReturns = void;

export type RulesEslintJsdocRequireJsdocBodyCheckProgramAllComments = TSESTree.Comment[];

export type RulesEslintJsdocRequireJsdocBodyCheckProgramLines = string[];

export type RulesEslintJsdocRequireJsdocBodyCheckProgramFoundSummary = boolean;

export type RulesEslintJsdocRequireJsdocBodyCheckProgramPastSummary = boolean;

export type RulesEslintJsdocRequireJsdocBodyCheckProgramBodyLineCount = number;

export type RulesEslintJsdocRequireJsdocBodyCheckProgramTrimmed = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Body - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsMaxLines = number;

export type RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsMaxWidth = number;

export type RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsMinLines = number;

export type RulesEslintJsdocRequireJsdocBodyRuleDefaultOptionsSkipDirectories = string[];

export type RulesEslintJsdocRequireJsdocBodyRuleOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocBodyRuleOptionsMaxLines = number;

export type RulesEslintJsdocRequireJsdocBodyRuleOptionsMaxWidth = number;

export type RulesEslintJsdocRequireJsdocBodyRuleOptionsMinLines = number;

export type RulesEslintJsdocRequireJsdocBodyRuleOptionsSkipDirectories = string[];

export type RulesEslintJsdocRequireJsdocBodyRuleOptions = Readonly<{
  ignoreFiles: RulesEslintJsdocRequireJsdocBodyRuleOptionsIgnoreFiles;
  maxLines: RulesEslintJsdocRequireJsdocBodyRuleOptionsMaxLines;
  maxWidth: RulesEslintJsdocRequireJsdocBodyRuleOptionsMaxWidth;
  minLines: RulesEslintJsdocRequireJsdocBodyRuleOptionsMinLines;
  skipDirectories: RulesEslintJsdocRequireJsdocBodyRuleOptionsSkipDirectories;
}>;
