import type {
  Shared_HastNode,
  Shared_HastNodeResult,
} from '../shared.d.ts';
import type { Lib_ShikiThemes_ThemePair } from './shiki-themes.d.ts';

/**
 * Lib - Rehype Shiki.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_ModuleHighlighter = unknown;

export type Lib_RehypeShiki_ModuleHighlighterPromise = Promise<unknown> | undefined;

/**
 * Lib - Rehype Shiki - Collect Nodes.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_CollectNodes_Tree = Shared_HastNode;

export type Lib_RehypeShiki_CollectNodes_TagName = string;

export type Lib_RehypeShiki_CollectNodes_Returns = Shared_HastNodeResult[];

export type Lib_RehypeShiki_CollectNodes_Matches_Item_Node = Shared_HastNode;

export type Lib_RehypeShiki_CollectNodes_Matches_Item_Index = number;

export type Lib_RehypeShiki_CollectNodes_Matches_Item_Parent = Shared_HastNode;

export type Lib_RehypeShiki_CollectNodes_Matches_Item = {
  node: Lib_RehypeShiki_CollectNodes_Matches_Item_Node;
  index: Lib_RehypeShiki_CollectNodes_Matches_Item_Index;
  parent: Lib_RehypeShiki_CollectNodes_Matches_Item_Parent;
};

export type Lib_RehypeShiki_CollectNodes_Matches = Lib_RehypeShiki_CollectNodes_Matches_Item[];

/**
 * Lib - Rehype Shiki - Collect Nodes - Walk.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_CollectNodes_Walk_Node = Shared_HastNode;

export type Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Type = string;

export type Lib_RehypeShiki_CollectNodes_Walk_Children_Item_TagName = string | undefined;

export type Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Properties = Record<string, unknown>;

export type Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Children = Shared_HastNode[];

export type Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Value = string | undefined;

export type Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Data = Record<string, unknown> | undefined;

export type Lib_RehypeShiki_CollectNodes_Walk_Children_Item = {
  type: Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Type;
  tagName?: Lib_RehypeShiki_CollectNodes_Walk_Children_Item_TagName;
  properties?: Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Properties;
  children?: Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Children;
  value?: Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Value;
  data?: Lib_RehypeShiki_CollectNodes_Walk_Children_Item_Data;
};

export type Lib_RehypeShiki_CollectNodes_Walk_Children = Lib_RehypeShiki_CollectNodes_Walk_Children_Item[];

export type Lib_RehypeShiki_CollectNodes_Walk_Child = Shared_HastNode | undefined;

/**
 * Lib - Rehype Shiki - Extract Text.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_ExtractText_Node = Shared_HastNode;

export type Lib_RehypeShiki_ExtractText_Returns = string;

export type Lib_RehypeShiki_ExtractText_Parts = string[];

export type Lib_RehypeShiki_ExtractText_Children_Item_Type = string;

export type Lib_RehypeShiki_ExtractText_Children_Item_TagName = string | undefined;

export type Lib_RehypeShiki_ExtractText_Children_Item_Properties = Record<string, unknown>;

export type Lib_RehypeShiki_ExtractText_Children_Item_Children = Shared_HastNode[];

export type Lib_RehypeShiki_ExtractText_Children_Item_Value = string | undefined;

export type Lib_RehypeShiki_ExtractText_Children_Item_Data = Record<string, unknown> | undefined;

export type Lib_RehypeShiki_ExtractText_Children_Item = {
  type: Lib_RehypeShiki_ExtractText_Children_Item_Type;
  tagName?: Lib_RehypeShiki_ExtractText_Children_Item_TagName;
  properties?: Lib_RehypeShiki_ExtractText_Children_Item_Properties;
  children?: Lib_RehypeShiki_ExtractText_Children_Item_Children;
  value?: Lib_RehypeShiki_ExtractText_Children_Item_Value;
  data?: Lib_RehypeShiki_ExtractText_Children_Item_Data;
};

export type Lib_RehypeShiki_ExtractText_Children = Lib_RehypeShiki_ExtractText_Children_Item[];

export type Lib_RehypeShiki_ExtractText_ChildText = string;

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

export type Lib_RehypeShiki_ProcessNode_Processed_Code = string;

export type Lib_RehypeShiki_ProcessNode_Processed_HighlightedLines = number[];

export type Lib_RehypeShiki_ProcessNode_Processed_AddedLines = number[];

export type Lib_RehypeShiki_ProcessNode_Processed_RemovedLines = number[];

export type Lib_RehypeShiki_ProcessNode_Processed = {
  code: Lib_RehypeShiki_ProcessNode_Processed_Code;
  highlightedLines: Lib_RehypeShiki_ProcessNode_Processed_HighlightedLines;
  addedLines: Lib_RehypeShiki_ProcessNode_Processed_AddedLines;
  removedLines: Lib_RehypeShiki_ProcessNode_Processed_RemovedLines;
};

export type Lib_RehypeShiki_ProcessNode_ProcessedCode = string;

export type Lib_RehypeShiki_ProcessNode_HighlightedLineNumbers = number[];

export type Lib_RehypeShiki_ProcessNode_DiffAddLineNumbers = number[];

export type Lib_RehypeShiki_ProcessNode_DiffRemoveLineNumbers = number[];

export type Lib_RehypeShiki_ProcessNode_DiffResult_AddLines = number[];

export type Lib_RehypeShiki_ProcessNode_DiffResult_RemoveLines = number[];

export type Lib_RehypeShiki_ProcessNode_DiffResult = {
  addLines: Lib_RehypeShiki_ProcessNode_DiffResult_AddLines;
  removeLines: Lib_RehypeShiki_ProcessNode_DiffResult_RemoveLines;
};

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

export type Lib_RehypeShiki_ProcessNode_HighlightedHast = unknown;

export type Lib_RehypeShiki_ProcessNode_HastRoot = unknown;

export type Lib_RehypeShiki_ProcessNode_HastRootRecord = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_HastChildren = unknown[];

export type Lib_RehypeShiki_ProcessNode_PreElement = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_PreProperties = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_PreChildren = unknown[];

export type Lib_RehypeShiki_ProcessNode_InnerCode = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_InnerCodeProperties = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_TitleMatch = RegExpMatchArray | null;

export type Lib_RehypeShiki_ProcessNode_TitleDoubleQuoted = string | undefined;

export type Lib_RehypeShiki_ProcessNode_TitleSingleQuoted = string | undefined;

export type Lib_RehypeShiki_ProcessNode_Title = string | undefined;

export type Lib_RehypeShiki_ProcessNode_ShowLineNumbers = boolean;

export type Lib_RehypeShiki_ProcessNode_Live = boolean;

export type Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Type = string;

export type Lib_RehypeShiki_ProcessNode_ParentChildren_Item_TagName = string | undefined;

export type Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Properties = Record<string, unknown>;

export type Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Children = Shared_HastNode[];

export type Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Value = string | undefined;

export type Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Data = Record<string, unknown> | undefined;

export type Lib_RehypeShiki_ProcessNode_ParentChildren_Item = {
  type: Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Type;
  tagName?: Lib_RehypeShiki_ProcessNode_ParentChildren_Item_TagName;
  properties?: Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Properties;
  children?: Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Children;
  value?: Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Value;
  data?: Lib_RehypeShiki_ProcessNode_ParentChildren_Item_Data;
};

export type Lib_RehypeShiki_ProcessNode_ParentChildren = Lib_RehypeShiki_ProcessNode_ParentChildren_Item[];

/**
 * Lib - Rehype Shiki - Process Node - Line.
 *
 * @since 0.15.0
 */
export type Lib_RehypeShiki_ProcessNode_Line_LineNode = Shared_HastNode;

export type Lib_RehypeShiki_ProcessNode_Line_LineNumber = number;

export type Lib_RehypeShiki_ProcessNode_Line_LineProperties = Record<string, unknown>;

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

export type Lib_RehypeShiki_RehypeShiki_Transformer_Nodes_Item_Node = Shared_HastNode;

export type Lib_RehypeShiki_RehypeShiki_Transformer_Nodes_Item_Index = number;

export type Lib_RehypeShiki_RehypeShiki_Transformer_Nodes_Item_Parent = Shared_HastNode;

export type Lib_RehypeShiki_RehypeShiki_Transformer_Nodes_Item = {
  node: Lib_RehypeShiki_RehypeShiki_Transformer_Nodes_Item_Node;
  index: Lib_RehypeShiki_RehypeShiki_Transformer_Nodes_Item_Index;
  parent: Lib_RehypeShiki_RehypeShiki_Transformer_Nodes_Item_Parent;
};

export type Lib_RehypeShiki_RehypeShiki_Transformer_Nodes = Lib_RehypeShiki_RehypeShiki_Transformer_Nodes_Item[];

export type Lib_RehypeShiki_RehypeShiki_Transformer_EntryCodeNode = Shared_HastNode | undefined;

export type Lib_RehypeShiki_RehypeShiki_Transformer_EntryClassNameRaw = unknown;

export type Lib_RehypeShiki_RehypeShiki_Transformer_EntryClassNames = string[];

export type Lib_RehypeShiki_RehypeShiki_Transformer_EntryLang = string;

export type Lib_RehypeShiki_RehypeShiki_Transformer_EntryShikiModule_CreateHighlighter = Function;

export type Lib_RehypeShiki_RehypeShiki_Transformer_EntryShikiModule_BundledLanguages = Record<string, unknown>;

export type Lib_RehypeShiki_RehypeShiki_Transformer_EntryShikiModule = {
  createHighlighter: Lib_RehypeShiki_RehypeShiki_Transformer_EntryShikiModule_CreateHighlighter;
  bundledLanguages: Lib_RehypeShiki_RehypeShiki_Transformer_EntryShikiModule_BundledLanguages;
};

export type Lib_RehypeShiki_RehypeShiki_Transformer_LoadedLanguages = string[];

export type Lib_RehypeShiki_RehypeShiki_Transformer_IsLanguageLoaded = boolean;

export type Lib_RehypeShiki_RehypeShiki_Transformer_LanguageLoader = unknown;
