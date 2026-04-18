import type {
  SharedHastNode,
  SharedHastNodeResult,
} from '../shared.d.ts';
import type { LibShikiThemesThemePair } from './shiki-themes.d.ts';

/**
 * Lib - Rehype Shiki - Collect Nodes.
 *
 * @since 0.15.0
 */
export type LibRehypeShikiCollectNodesTree = SharedHastNode;

export type LibRehypeShikiCollectNodesTagName = string;

export type LibRehypeShikiCollectNodesReturns = SharedHastNodeResult[];

export type LibRehypeShikiCollectNodesMatches = SharedHastNodeResult[];

export type LibRehypeShikiCollectNodesWalkNode = SharedHastNode;

export type LibRehypeShikiCollectNodesChildren = SharedHastNode[];

export type LibRehypeShikiCollectNodesChild = SharedHastNode | undefined;

/**
 * Lib - Rehype Shiki - Extract Text.
 *
 * @since 0.15.0
 */
export type LibRehypeShikiExtractTextNode = SharedHastNode;

export type LibRehypeShikiExtractTextReturns = string;

export type LibRehypeShikiExtractTextParts = string[];

export type LibRehypeShikiExtractTextChildren = SharedHastNode[];

export type LibRehypeShikiExtractTextChildText = string;

/**
 * Lib - Rehype Shiki - Module Highlighter.
 *
 * @since 0.15.0
 */
export type LibRehypeShikiModuleHighlighterHighlighter = unknown;

export type LibRehypeShikiModuleHighlighterHighlighterPromise = Promise<unknown> | undefined;

/**
 * Lib - Rehype Shiki - Parse Line Range.
 *
 * @since 0.15.0
 */
export type LibRehypeShikiParseLineRangeMetastring = string;

export type LibRehypeShikiParseLineRangeReturns = number[];

export type LibRehypeShikiParseLineRangeResult = number[];

export type LibRehypeShikiParseLineRangeMatch = RegExpMatchArray | null;

export type LibRehypeShikiParseLineRangeRangeContent = string | undefined;

export type LibRehypeShikiParseLineRangeParts = string[];

export type LibRehypeShikiParseLineRangeDashIndex = number;

export type LibRehypeShikiParseLineRangeTrimmedPart = string;

export type LibRehypeShikiParseLineRangeLineNumber = number;

export type LibRehypeShikiParseLineRangeStart = number;

export type LibRehypeShikiParseLineRangeEnd = number;

/**
 * Lib - Rehype Shiki - Process Diff Lines.
 *
 * @since 0.15.0
 */
export type LibRehypeShikiProcessDiffLinesCode = string;

export type LibRehypeShikiProcessDiffLinesReturns = LibRehypeShikiProcessDiffLinesResult;

export type LibRehypeShikiProcessDiffLinesLines = string[];

export type LibRehypeShikiProcessDiffLinesAddLines = number[];

export type LibRehypeShikiProcessDiffLinesRemoveLines = number[];

export type LibRehypeShikiProcessDiffLinesFirstChar = string;

export type LibRehypeShikiProcessDiffLinesResultAddLines = number[];

export type LibRehypeShikiProcessDiffLinesResultRemoveLines = number[];

export type LibRehypeShikiProcessDiffLinesResult = {
  addLines: LibRehypeShikiProcessDiffLinesResultAddLines;
  removeLines: LibRehypeShikiProcessDiffLinesResultRemoveLines;
};

/**
 * Lib - Rehype Shiki - Process Magic Comments.
 *
 * @since 0.15.0
 */
export type LibRehypeShikiProcessMagicCommentsCode = string;

export type LibRehypeShikiProcessMagicCommentsReturns = LibRehypeShikiProcessMagicCommentsResult;

export type LibRehypeShikiProcessMagicCommentsResultCode = string;

export type LibRehypeShikiProcessMagicCommentsResultHighlightedLines = number[];

export type LibRehypeShikiProcessMagicCommentsResult = {
  code: LibRehypeShikiProcessMagicCommentsResultCode;
  highlightedLines: LibRehypeShikiProcessMagicCommentsResultHighlightedLines;
};

export type LibRehypeShikiProcessMagicCommentsLines = string[];

export type LibRehypeShikiProcessMagicCommentsOutputLines = string[];

export type LibRehypeShikiProcessMagicCommentsHighlightedLines = number[];

export type LibRehypeShikiProcessMagicCommentsOutputLineNumber = number;

export type LibRehypeShikiProcessMagicCommentsIsHighlightNext = boolean;

export type LibRehypeShikiProcessMagicCommentsInsideHighlightBlock = boolean;

export type LibRehypeShikiProcessMagicCommentsTrimmedLine = string;

/**
 * Lib - Rehype Shiki - Process Node.
 *
 * @since 0.15.0
 */
export type LibRehypeShikiProcessNodeNode = SharedHastNode;

export type LibRehypeShikiProcessNodeIndex = number;

export type LibRehypeShikiProcessNodeParent = SharedHastNode;

export type LibRehypeShikiProcessNodeHighlighter = unknown;

export type LibRehypeShikiProcessNodeOptions = LibShikiThemesThemePair;

export type LibRehypeShikiProcessNodeCodeNode = SharedHastNode | undefined;

export type LibRehypeShikiProcessNodeClassNameRaw = unknown;

export type LibRehypeShikiProcessNodeClassNames = string[];

export type LibRehypeShikiProcessNodeLangClass = string | undefined;

export type LibRehypeShikiProcessNodeLang = string;

export type LibRehypeShikiProcessNodeRawText = string;

export type LibRehypeShikiProcessNodeMetaValue = unknown;

export type LibRehypeShikiProcessNodeMetastringValue = unknown;

export type LibRehypeShikiProcessNodeMetastring = string;

export type LibRehypeShikiProcessNodeProcessedCode = string;

export type LibRehypeShikiProcessNodeHighlightedLineNumbers = number[];

export type LibRehypeShikiProcessNodeDiffAddLineNumbers = number[];

export type LibRehypeShikiProcessNodeDiffRemoveLineNumbers = number[];

export type LibRehypeShikiProcessNodeTypedHighlighterCodeToHtml = Function;

export type LibRehypeShikiProcessNodeTypedHighlighterCodeToHast = Function;

export type LibRehypeShikiProcessNodeTypedHighlighterGetLoadedLanguages = () => string[];

export type LibRehypeShikiProcessNodeTypedHighlighterLoadLanguage = (language: unknown) => Promise<void>;

export type LibRehypeShikiProcessNodeTypedHighlighter = {
  codeToHtml: LibRehypeShikiProcessNodeTypedHighlighterCodeToHtml;
  codeToHast: LibRehypeShikiProcessNodeTypedHighlighterCodeToHast;
  getLoadedLanguages: LibRehypeShikiProcessNodeTypedHighlighterGetLoadedLanguages;
  loadLanguage: LibRehypeShikiProcessNodeTypedHighlighterLoadLanguage;
};

export type LibRehypeShikiProcessNodeHighlightedHtml = unknown;

export type LibRehypeShikiProcessNodeLineNode = SharedHastNode;

export type LibRehypeShikiProcessNodeLineNumber = number;

export type LibRehypeShikiProcessNodeLineProperties = Record<string, unknown>;

export type LibRehypeShikiProcessNodeMarkedHtml = unknown;

export type LibRehypeShikiProcessNodeHastRootRecord = Record<string, unknown>;

export type LibRehypeShikiProcessNodeHastChildren = unknown[];

export type LibRehypeShikiProcessNodeHastPreElement = Record<string, unknown>;

export type LibRehypeShikiProcessNodeParentChildren = SharedHastNode[];

/**
 * Lib - Rehype Shiki - Rehype Shiki.
 *
 * @since 0.15.0
 */
export type LibRehypeShikiRehypeShikiOptions = LibShikiThemesThemePair;

export type LibRehypeShikiRehypeShikiReturns = LibRehypeShikiRehypeShikiTransformer;

export type LibRehypeShikiRehypeShikiTransformer = (tree: SharedHastNode) => Promise<void>;

/**
 * Lib - Rehype Shiki - Rehype Shiki - Transformer.
 *
 * @since 0.15.0
 */
export type LibRehypeShikiRehypeShikiTransformerTree = SharedHastNode;

export type LibRehypeShikiRehypeShikiTransformerReturns = Promise<void>;

export type LibRehypeShikiRehypeShikiTransformerShikiModuleCreateHighlighter = Function;

export type LibRehypeShikiRehypeShikiTransformerShikiModuleBundledLanguages = Record<string, unknown>;

export type LibRehypeShikiRehypeShikiTransformerShikiModule = {
  createHighlighter: LibRehypeShikiRehypeShikiTransformerShikiModuleCreateHighlighter;
  bundledLanguages: LibRehypeShikiRehypeShikiTransformerShikiModuleBundledLanguages;
};

export type LibRehypeShikiRehypeShikiTransformerNodes = SharedHastNodeResult[];

export type LibRehypeShikiRehypeShikiTransformerLoadedLanguages = string[];

export type LibRehypeShikiRehypeShikiTransformerIsLanguageLoaded = boolean;

export type LibRehypeShikiRehypeShikiTransformerBundledLanguageLoader = unknown;
