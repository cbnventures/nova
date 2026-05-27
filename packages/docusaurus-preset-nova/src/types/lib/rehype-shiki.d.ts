import type {
  Shared_HastNode,
  Shared_HastNodeResult,
} from '../shared.d.ts';
import type { Lib_ShikiThemes_ThemePair } from './shiki-themes.d.ts';

/**
 * Lib - Rehype Shiki - Collect Nodes.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_CollectNodes_Tree = Shared_HastNode;

export type Lib_RehypeShiki_CollectNodes_TagName = string;

export type Lib_RehypeShiki_CollectNodes_Returns = Shared_HastNodeResult[];

export type Lib_RehypeShiki_CollectNodes_Matches = Shared_HastNodeResult[];

export type Lib_RehypeShiki_CollectNodes_Walk_Node = Shared_HastNode;

export type Lib_RehypeShiki_CollectNodes_Children = Shared_HastNode[];

export type Lib_RehypeShiki_CollectNodes_Child = Shared_HastNode | undefined;

/**
 * Lib - Rehype Shiki - Extract Text.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_ExtractText_Node = Shared_HastNode;

export type Lib_RehypeShiki_ExtractText_Returns = string;

export type Lib_RehypeShiki_ExtractText_Parts = string[];

export type Lib_RehypeShiki_ExtractText_Children = Shared_HastNode[];

export type Lib_RehypeShiki_ExtractText_ChildText = string;

/**
 * Lib - Rehype Shiki - Module Highlighter.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_ModuleHighlighterHighlighter = unknown;

export type Lib_RehypeShiki_ModuleHighlighterHighlighterPromise = Promise<unknown> | undefined;

/**
 * Lib - Rehype Shiki - Parse Line Range.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_ParseLineRange_Metastring = string;

export type Lib_RehypeShiki_ParseLineRange_Returns = number[];

export type Lib_RehypeShiki_ParseLineRange_Result = number[];

export type Lib_RehypeShiki_ParseLineRange_Match = RegExpMatchArray | null;

export type Lib_RehypeShiki_ParseLineRange_RangeContent = string | undefined;

export type Lib_RehypeShiki_ParseLineRange_Parts = string[];

export type Lib_RehypeShiki_ParseLineRange_DashIndex = number;

export type Lib_RehypeShiki_ParseLineRange_TrimmedPart = string;

export type Lib_RehypeShiki_ParseLineRange_LineNumber = number;

export type Lib_RehypeShiki_ParseLineRange_Start = number;

export type Lib_RehypeShiki_ParseLineRange_End = number;

/**
 * Lib - Rehype Shiki - Process Diff Lines.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_ProcessDiffLines_Code = string;

export type Lib_RehypeShiki_ProcessDiffLines_Returns = Lib_RehypeShiki_ProcessDiffLines_Result;

export type Lib_RehypeShiki_ProcessDiffLines_Lines = string[];

export type Lib_RehypeShiki_ProcessDiffLines_AddLines = number[];

export type Lib_RehypeShiki_ProcessDiffLines_RemoveLines = number[];

export type Lib_RehypeShiki_ProcessDiffLines_FirstChar = string;

export type Lib_RehypeShiki_ProcessDiffLines_Result_AddLines = number[];

export type Lib_RehypeShiki_ProcessDiffLines_Result_RemoveLines = number[];

export type Lib_RehypeShiki_ProcessDiffLines_Result = {
  addLines: Lib_RehypeShiki_ProcessDiffLines_Result_AddLines;
  removeLines: Lib_RehypeShiki_ProcessDiffLines_Result_RemoveLines;
};

/**
 * Lib - Rehype Shiki - Process Magic Comments.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_ProcessMagicComments_Code = string;

export type Lib_RehypeShiki_ProcessMagicComments_Returns = Lib_RehypeShiki_ProcessMagicComments_Result;

export type Lib_RehypeShiki_ProcessMagicComments_Result_Code = string;

export type Lib_RehypeShiki_ProcessMagicComments_Result_HighlightedLines = number[];

export type Lib_RehypeShiki_ProcessMagicComments_Result_AddedLines = number[];

export type Lib_RehypeShiki_ProcessMagicComments_Result_RemovedLines = number[];

export type Lib_RehypeShiki_ProcessMagicComments_Result = {
  code: Lib_RehypeShiki_ProcessMagicComments_Result_Code;
  highlightedLines: Lib_RehypeShiki_ProcessMagicComments_Result_HighlightedLines;
  addedLines: Lib_RehypeShiki_ProcessMagicComments_Result_AddedLines;
  removedLines: Lib_RehypeShiki_ProcessMagicComments_Result_RemovedLines;
};

export type Lib_RehypeShiki_ProcessMagicComments_Lines = string[];

export type Lib_RehypeShiki_ProcessMagicComments_OutputLines = string[];

export type Lib_RehypeShiki_ProcessMagicComments_HighlightedLines = number[];

export type Lib_RehypeShiki_ProcessMagicComments_AddedLines = number[];

export type Lib_RehypeShiki_ProcessMagicComments_RemovedLines = number[];

export type Lib_RehypeShiki_ProcessMagicComments_OutputLineNumber = number;

export type Lib_RehypeShiki_ProcessMagicComments_IsHighlightNext = boolean;

export type Lib_RehypeShiki_ProcessMagicComments_InsideHighlightBlock = boolean;

export type Lib_RehypeShiki_ProcessMagicComments_InsideAddBlock = boolean;

export type Lib_RehypeShiki_ProcessMagicComments_InsideRemoveBlock = boolean;

export type Lib_RehypeShiki_ProcessMagicComments_TrimmedLine = string;

/**
 * Lib - Rehype Shiki - Process Node.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_ProcessNode_Node = Shared_HastNode;

export type Lib_RehypeShiki_ProcessNode_Index = number;

export type Lib_RehypeShiki_ProcessNode_Parent = Shared_HastNode;

export type Lib_RehypeShiki_ProcessNode_Highlighter = unknown;

export type Lib_RehypeShiki_ProcessNode_Options = Lib_ShikiThemes_ThemePair;

export type Lib_RehypeShiki_ProcessNode_CodeNode = Shared_HastNode | undefined;

export type Lib_RehypeShiki_ProcessNode_ClassNameRaw = unknown;

export type Lib_RehypeShiki_ProcessNode_ClassNames = string[];

export type Lib_RehypeShiki_ProcessNode_LangClass = string | undefined;

export type Lib_RehypeShiki_ProcessNode_Lang = string;

export type Lib_RehypeShiki_ProcessNode_RawText = string;

export type Lib_RehypeShiki_ProcessNode_MetaValue = unknown;

export type Lib_RehypeShiki_ProcessNode_MetastringValue = unknown;

export type Lib_RehypeShiki_ProcessNode_Metastring = string;

export type Lib_RehypeShiki_ProcessNode_ProcessedCode = string;

export type Lib_RehypeShiki_ProcessNode_HighlightedLineNumbers = number[];

export type Lib_RehypeShiki_ProcessNode_DiffAddLineNumbers = number[];

export type Lib_RehypeShiki_ProcessNode_DiffRemoveLineNumbers = number[];

export type Lib_RehypeShiki_ProcessNode_TypedHighlighter_CodeToHtml = Function;

export type Lib_RehypeShiki_ProcessNode_TypedHighlighter_CodeToHast = Function;

export type Lib_RehypeShiki_ProcessNode_TypedHighlighter_GetLoadedLanguages = () => string[];

export type Lib_RehypeShiki_ProcessNode_TypedHighlighter_LoadLanguage = (language: unknown) => Promise<void>;

export type Lib_RehypeShiki_ProcessNode_TypedHighlighter = {
  codeToHtml: Lib_RehypeShiki_ProcessNode_TypedHighlighter_CodeToHtml;
  codeToHast: Lib_RehypeShiki_ProcessNode_TypedHighlighter_CodeToHast;
  getLoadedLanguages: Lib_RehypeShiki_ProcessNode_TypedHighlighter_GetLoadedLanguages;
  loadLanguage: Lib_RehypeShiki_ProcessNode_TypedHighlighter_LoadLanguage;
};

export type Lib_RehypeShiki_ProcessNode_HighlightedHtml = unknown;

export type Lib_RehypeShiki_ProcessNode_Line_Node = Shared_HastNode;

export type Lib_RehypeShiki_ProcessNode_Line_Number = number;

export type Lib_RehypeShiki_ProcessNode_Line_Properties = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_MarkedHtml = unknown;

export type Lib_RehypeShiki_ProcessNode_HastRootRecord = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_HastChildren = unknown[];

export type Lib_RehypeShiki_ProcessNode_HastPreElement = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_HastPreChildren = unknown[];

export type Lib_RehypeShiki_ProcessNode_HastCodeElement = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_TitleMatch = RegExpMatchArray | null;

export type Lib_RehypeShiki_ProcessNode_Title = string | undefined;

export type Lib_RehypeShiki_ProcessNode_ShowLineNumbers = boolean;

export type Lib_RehypeShiki_ProcessNode_Live = boolean;

export type Lib_RehypeShiki_ProcessNode_ParentChildren = Shared_HastNode[];

/**
 * Lib - Rehype Shiki - Rehype Shiki.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_RehypeShiki_Options = Lib_ShikiThemes_ThemePair;

export type Lib_RehypeShiki_RehypeShiki_Returns = Lib_RehypeShiki_RehypeShiki_Transformer;

export type Lib_RehypeShiki_RehypeShiki_Transformer = (tree: Shared_HastNode) => Promise<void>;

/**
 * Lib - Rehype Shiki - Rehype Shiki - Transformer.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_RehypeShiki_Transformer_Tree = Shared_HastNode;

export type Lib_RehypeShiki_RehypeShiki_Transformer_Returns = Promise<void>;

export type Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule_CreateHighlighter = Function;

export type Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule_BundledLanguages = Record<string, unknown>;

export type Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule = {
  createHighlighter: Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule_CreateHighlighter;
  bundledLanguages: Lib_RehypeShiki_RehypeShiki_Transformer_ShikiModule_BundledLanguages;
};

export type Lib_RehypeShiki_RehypeShiki_Transformer_Nodes = Shared_HastNodeResult[];

export type Lib_RehypeShiki_RehypeShiki_Transformer_LoadedLanguages = string[];

export type Lib_RehypeShiki_RehypeShiki_Transformer_IsLanguageLoaded = boolean;

export type Lib_RehypeShiki_RehypeShiki_Transformer_BundledLanguageLoader = unknown;
