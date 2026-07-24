import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleFix, RuleFixer } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Canonical Tag Order.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_CanonicalTagOrder = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Rule.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_RuleDefaultOptionsIgnoreFiles = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Check Program.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_AllComments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagEntry_LineIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagEntry_Rank = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagEntry = {
  lineIndex: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagEntry_LineIndex;
  rank: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagEntry_Rank;
};

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagEntries = Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagEntry[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Line = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Stripped = string;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Match = RegExpExecArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_MatchName = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_TagRank = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_OrderViolation = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_SpacingViolation = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_MessageId = 'tagOrder' | 'tagSpacing';

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Rebuilt = string;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Fix_Fixer = RuleFixer;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_CheckProgram_Fix_Returns = RuleFix;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Create.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Create_Options_IgnoreFiles;
}>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Create - Program.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Create_Program_Returns = void;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Has Order Violation.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entry_LineIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entry_Rank = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entry = {
  lineIndex: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entry_LineIndex;
  rank: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entry_Rank;
};

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entries = Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entry[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Returns = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Previous = Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entry | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Current = Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasOrderViolation_Entry | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Has Spacing Violation.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entry_LineIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entry_Rank = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entry = {
  lineIndex: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entry_LineIndex;
  rank: Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entry_Rank;
};

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entries = Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entry[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Returns = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Previous = Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entry | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Current = Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Entry | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_BlankCount = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_HasText = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_Line = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_HasSpacingViolation_StrippedLine = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Rebuild.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Returns = string;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Blank = string;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_StarMatch = RegExpExecArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_LastLine = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Body = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_FirstTagIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_BodyLine = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Head = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_HeadLast = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_ParamLines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_PrivateGroup = string[] | null;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_ReturnsGroup = string[] | null;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_SinceGroup = string[] | null;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_DeprecatedGroup = string[] | null;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Index = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Line = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Name = string | null;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Group = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Next = number;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_ContinuationLine = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Groups = string[][];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_TagSection = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_EmitGroup = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_Rebuild_Result = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Tag Order - Tag Name Of.
 *
 * @since 0.21.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Line = string;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Returns = string | null;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Stripped = string;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_Match = RegExpExecArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocTagOrder_Runner_TagNameOf_MatchName = string | undefined;
