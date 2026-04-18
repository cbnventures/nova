import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

import type {
  SharedJsdocHierarchyCreateOptions,
  SharedJsdocHierarchyFindSummaryInfoResult,
} from '../../../shared.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Build Fixed Comment.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentCommentValue = string;

export type RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentSummaryIndex = number;

export type RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentOldSummary = string;

export type RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentNewSummary = string;

export type RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentReturns = string;

export type RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentLines = string[];

export type RulesEslintJsdocRequireJsdocHierarchyBuildFixedCommentLine = string | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Check Class.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyCheckClassContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintJsdocRequireJsdocHierarchyCheckClassNode = TSESTree.ClassDeclaration;

export type RulesEslintJsdocRequireJsdocHierarchyCheckClassReturns = void;

export type RulesEslintJsdocRequireJsdocHierarchyCheckClassComments = TSESTree.Comment[];

export type RulesEslintJsdocRequireJsdocHierarchyCheckClassJsdocComment = TSESTree.Comment | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckClassExpected = string;

export type RulesEslintJsdocRequireJsdocHierarchyCheckClassSummaryInfo = SharedJsdocHierarchyFindSummaryInfoResult | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckClassFixedValue = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Check Method.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyCheckMethodContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintJsdocRequireJsdocHierarchyCheckMethodNode = TSESTree.MethodDefinition;

export type RulesEslintJsdocRequireJsdocHierarchyCheckMethodReturns = void;

export type RulesEslintJsdocRequireJsdocHierarchyCheckMethodComments = TSESTree.Comment[];

export type RulesEslintJsdocRequireJsdocHierarchyCheckMethodJsdocComment = TSESTree.Comment | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckMethodMethodName = string;

export type RulesEslintJsdocRequireJsdocHierarchyCheckMethodExpected = string;

export type RulesEslintJsdocRequireJsdocHierarchyCheckMethodSummaryInfo = SharedJsdocHierarchyFindSummaryInfoResult | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckMethodFixedValue = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Check Node.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeNode = TSESTree.Node;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeReturns = void;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeComments = TSESTree.Comment[];

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeJsdocComment = TSESTree.Comment | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodePathParts = string[];

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeParent = TSESTree.Node | null | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeExpected = string;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeSummaryInfo = SharedJsdocHierarchyFindSummaryInfoResult | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeSuffix = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeDescribeString = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeDescribeSuffix = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeName = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeFixedValue = string;

export type RulesEslintJsdocRequireJsdocHierarchyCheckNodeVarName = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Dedup Against Path.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathWords = string[];

export type RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPathParts = string[];

export type RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathReturns = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPrefixLength = number;

export type RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathMatches = boolean;

export type RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathSuffixStart = number;

export type RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathWordAtIndex = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathPartAtSuffix = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyDedupAgainstPathRemaining = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Describe Suffix.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixDescribeString = string;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPathParts = string[];

export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixReturns = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixWords = string[];

export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPrettyWords = string[];

export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixLoweredWord = string;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixKnownName = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixDotIndex = number;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixMethodPart = string;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveDescribeSuffixPrettyName = string;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Derive Hierarchy.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyFilename = string;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchySegments = string[];

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyOptions = SharedJsdocHierarchyCreateOptions;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyReturns = string;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchySrcIndex = number;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAnchorIndex = number;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAnchorToken = string;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyLastSlashIndex = number;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyFilenameStem = string;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyPrettySegments = string[];

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyPrettyParts = string[];

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyAllParts = string[];

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyRelativePath = string;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyStripped = string;

export type RulesEslintJsdocRequireJsdocHierarchyDeriveHierarchyParts = string[];

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Extract Describe String.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringNode = TSESTree.ExpressionStatement;

export type RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringReturns = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringIsDescribe = boolean;

export type RulesEslintJsdocRequireJsdocHierarchyExtractDescribeStringFirstArg = TSESTree.CallExpressionArgument | undefined;

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
export type RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoCommentValue = string;

export type RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoReturns = SharedJsdocHierarchyFindSummaryInfoResult | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoLines = string[];

export type RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoLine = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoTrimmed = string;

export type RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoResultIndex = number;

export type RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoResultText = string;

export type RulesEslintJsdocRequireJsdocHierarchyFindSummaryInfoResult = SharedJsdocHierarchyFindSummaryInfoResult;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Known Names.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyKnownNames = Map<string, string>;

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
export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameName = string;

export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameReturns = string;

export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameWords = RegExpMatchArray | null;

export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameResult = string[];

export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameIndex = number;

export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameLowered = string;

export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameNext = string;

export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNamePair = string;

export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameKnownPair = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyPrettyMethodNameKnownName = string | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Pretty Segment.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyPrettySegmentSegment = string;

export type RulesEslintJsdocRequireJsdocHierarchyPrettySegmentReturns = string;

export type RulesEslintJsdocRequireJsdocHierarchyPrettySegmentKnownName = string | undefined;

export type RulesEslintJsdocRequireJsdocHierarchyPrettySegmentWordName = string | undefined;

/**
 * Rules - ESLint - JSDoc - Require JSDoc Hierarchy - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsAnchorDirectories = string[];

export type RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsKnownNames = Record<string, string>;

export type RulesEslintJsdocRequireJsdocHierarchyRuleDefaultOptionsStripDirectories = string[];

export type RulesEslintJsdocRequireJsdocHierarchyRuleOptions = SharedJsdocHierarchyCreateOptions;

export type RulesEslintJsdocRequireJsdocHierarchyRuleOptionsKnownNames = Record<string, string>;

export type RulesEslintJsdocRequireJsdocHierarchyRuleUserEntries = [string, string][];

export type RulesEslintJsdocRequireJsdocHierarchyRuleOptionsAnchorDirectories = string[];

export type RulesEslintJsdocRequireJsdocHierarchyRuleOptionsStripDirectories = string[];
