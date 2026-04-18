import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Alignment - Check Program.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramReturns = void;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllComments = TSESTree.Comment[];

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramLines = string[];

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParamLines = string[];

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramNameStartPositions = number[];

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramDashPositions = number[];

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatch = RegExpExecArray | null;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatchType = string | undefined;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatchName = string | undefined;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMatchDash = string | undefined;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramTypeEndIndex = number;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramNameStartIndex = number;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramDashIndex = number;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllTypeEndsSame = boolean;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllNameStartsSame = boolean;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramAllDashesSame = boolean;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixedLines = string[];

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMaxTypeLength = number;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramMaxNameLength = number;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryIndex = number;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryPrefix = string;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryType = string;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryName = string;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryDescription = string;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntry = {
  index: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryIndex;
  prefix: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryPrefix;
  type: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryType;
  name: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryName;
  description: RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntryDescription;
};

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntries = RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramParsedEntry[];

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixedLine = string | undefined;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixMatch = RegExpMatchArray | null;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramTypeLength = number;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramTypeWithBraces = string;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramPadAfterType = number;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramPadAfterName = number;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramRebuiltLine = string;

export type RulesEslintJsdocRequireJsdocParamAlignmentCheckProgramFixedValue = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Alignment - Fix Pattern.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Alignment - Param Pattern.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Alignment - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocParamAlignmentRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocParamAlignmentRuleOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocParamAlignmentRuleOptions = Readonly<{
  ignoreFiles: RulesEslintJsdocRequireJsdocParamAlignmentRuleOptionsIgnoreFiles;
}>;
