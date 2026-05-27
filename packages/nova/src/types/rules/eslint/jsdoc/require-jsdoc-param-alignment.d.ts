import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Alignment - Check Program.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllComments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParamLines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_NameStartPositions = number[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_DashPositions = number[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Match = RegExpExecArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MatchType = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MatchName = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MatchDash = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_TypeEndIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_NameStartIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_DashIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllTypeEndsSame = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllNameStartsSame = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_AllDashesSame = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_FixedLines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MaxTypeLength = number;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_MaxNameLength = number;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Index = number;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Prefix = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Type = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Name = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Description = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry = {
  index: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Index;
  prefix: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Prefix;
  type: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Type;
  name: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Name;
  description: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry_Description;
};

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntries = Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_ParsedEntry[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_FixedLine = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_Fix_Match = RegExpMatchArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_TypeLength = number;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_TypeWithBraces = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_PadAfterType = number;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_PadAfterName = number;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_RebuiltLine = string;

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_CheckProgram_FixedValue = string;

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
export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocParamAlignment_Runner_RuleOptions_IgnoreFiles;
}>;
