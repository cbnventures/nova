import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Name - Check Program.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocParamNameCheckProgramContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramReturns = void;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramAllComments = TSESTree.Comment[];

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramLines = string[];

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramFixedValue = string;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramMismatchParamName = string;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramMismatchExpected = string;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramMismatch = {
  paramName: RulesEslintJsdocRequireJsdocParamNameCheckProgramMismatchParamName;
  expected: RulesEslintJsdocRequireJsdocParamNameCheckProgramMismatchExpected;
};

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramMismatches = RulesEslintJsdocRequireJsdocParamNameCheckProgramMismatch[];

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramMatch = RegExpExecArray | null;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramParamName = string | undefined;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramRawDescription = string | undefined;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramDescription = string;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramWords = string;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramExpected = string;

export type RulesEslintJsdocRequireJsdocParamNameCheckProgramFinalFixedValue = string;

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
export type RulesEslintJsdocRequireJsdocParamNameRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocParamNameRuleOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocParamNameRuleOptions = Readonly<{
  ignoreFiles: RulesEslintJsdocRequireJsdocParamNameRuleOptionsIgnoreFiles;
}>;
