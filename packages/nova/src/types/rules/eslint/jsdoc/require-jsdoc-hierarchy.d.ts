import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

import type {
  Shared_JsdocHierarchyCreateOptions as SharedJsdocHierarchyCreateOptions,
  Shared_JsdocHierarchyFindSummaryInfoResult as SharedJsdocHierarchyFindSummaryInfoResult,
} from '../../../shared.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Build Fixed Comment.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_CommentValue = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_SummaryIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_OldSummary = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_NewSummary = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Returns = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_BuildFixedComment_Line = string | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Check Class.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Node = TSESTree.ClassDeclaration;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Comments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_JsdocComment = TSESTree.Comment | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_Expected = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_SummaryInfo = SharedJsdocHierarchyFindSummaryInfoResult | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckClass_FixedValue = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Check Method.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Node = TSESTree.MethodDefinition;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Comments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_JsdocComment = TSESTree.Comment | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_MethodName = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_Expected = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_SummaryInfo = SharedJsdocHierarchyFindSummaryInfoResult | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckMethod_FixedValue = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Check Node.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Node = TSESTree.Node;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Returns = void;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Comments = TSESTree.Comment[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_JsdocComment = TSESTree.Comment | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_PathParts = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Parent = TSESTree.Node | null | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Expected = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_SummaryInfo = SharedJsdocHierarchyFindSummaryInfoResult | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Suffix = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_DescribeString = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_DescribeSuffix = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_Name = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_FixedValue = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_CheckNode_VarName = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Dedup Against Path.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Words = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PathParts = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Returns = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PrefixLength = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Matches = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_SuffixStart = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_WordAtIndex = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_PartAtSuffix = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DedupAgainstPath_Remaining = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Describe Suffix.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_DescribeString = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PathParts = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_Returns = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_Words = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PrettyWords = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_LoweredWord = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_KnownName = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_DotIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_MethodPart = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveDescribeSuffix_PrettyName = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Hierarchy.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_SrcIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_AnchorIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_AnchorToken = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_RelativePath = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_RawSegments = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_LastSegmentIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Filename = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Segments = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Options = SharedJsdocHierarchyCreateOptions;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Returns = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_Parts = ReadonlyArray<string>;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_LastSlashIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_SafeExtensionPattern = RegExp;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_FilenameStem = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_NormalizedStem = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_PrettySegments = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_PrettyParts = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveHierarchy_AllParts = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Invalid Prefix Diagnostic.
 *
 * @since 0.17.1
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject_Segment = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject_Prefix = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject = {
  segment: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject_Segment;
  prefix: Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject_Prefix;
};

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Returns = Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_ReturnsObject | null;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Filename = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Options = SharedJsdocHierarchyCreateOptions;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Parts = ReadonlyArray<string>;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_FirstSegment = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DeriveInvalidPrefixDiagnostic_Prefix = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Path Parts.
 *
 * @since 0.17.1
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Filename = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Options = SharedJsdocHierarchyCreateOptions;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_DerivePathParts_Returns = ReadonlyArray<string>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Extract Describe String.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_Node = TSESTree.ExpressionStatement;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_Returns = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_IsDescribe = boolean;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_ExtractDescribeString_FirstArg = TSESTree.CallExpressionArgument | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Extract Node Name.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Find Summary Info.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_CommentValue = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Returns = SharedJsdocHierarchyFindSummaryInfoResult | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Lines = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Line = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Trimmed = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_ResultIndex = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_ResultText = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_FindSummaryInfo_Result = SharedJsdocHierarchyFindSummaryInfoResult;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Known Names.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_KnownNames = Map<string, string>;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Merged Names.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Pretty Method Name.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Name = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Returns = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Words = RegExpMatchArray | null;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Result = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Index = number;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Lowered = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Next = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_Pair = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_KnownPair = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettyMethodName_KnownName = string | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Pretty Segment.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_Segment = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_Returns = string;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_KnownName = string | undefined;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_PrettySegment_WordName = string | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsAnchorDirectories = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsKnownNames = Record<string, string>;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleDefaultOptionsStripDirectories = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleOptions = SharedJsdocHierarchyCreateOptions;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleOptionsKnownNames = Record<string, string>;

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleUserEntries = [string, string][];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleOptionsAnchorDirectories = string[];

export type Rules_Eslint_Jsdoc_RequireJsdocHierarchy_Runner_RuleOptionsStripDirectories = string[];
