import type {
  Shared_SearchWorkerDocument,
  Shared_SearchWorkerDocuments,
  Shared_SearchWorkerInitMessage,
  Shared_SearchWorkerLunrResult,
  Shared_SearchWorkerMessage,
  Shared_SearchWorkerSearchHit,
  Shared_SearchWorkerSearchMessage,
} from '../../shared.d.ts';

/**
 * Lib - Search - Worker - Search Index.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_SearchIndex = unknown;

/**
 * Lib - Search - Worker - Search Documents.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_SearchDocuments = Array<{
  path: string;
  title: string;
  snippet: string;
  body: string;
}>;

/**
 * Lib - Search - Worker - Event.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_Event = MessageEvent<{
  type: 'init';
  indexUrl: string;
} | {
  type: 'search';
  query: string;
  limit: number;
}>;

/**
 * Lib - Search - Worker - Listener Event.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_ListenerEvent = MessageEvent<Shared_SearchWorkerMessage>;

/**
 * Lib - Search - Worker - Listener Message Data.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_ListenerMessageData = Shared_SearchWorkerMessage;

/**
 * Lib - Search - Worker - Lunr Global.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_LunrGlobal_Index_Load = (serializedIndex: unknown) => unknown;

export type Lib_Search_Worker_LunrGlobal_Index = {
  load: Lib_Search_Worker_LunrGlobal_Index_Load;
};

export type Lib_Search_Worker_LunrGlobal = {
  Index: Lib_Search_Worker_LunrGlobal_Index;
};

/**
 * Lib - Search - Worker - Handle Init.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_HandleInit_Message = Shared_SearchWorkerInitMessage;

export type Lib_Search_Worker_HandleInit_Returns = Promise<void>;

export type Lib_Search_Worker_HandleInit_Response = Response;

export type Lib_Search_Worker_HandleInit_Parsed = Lib_Search_Worker_HandleInit_ParsedShape;

export type Lib_Search_Worker_HandleInit_ParsedShape_Index = unknown;

export type Lib_Search_Worker_HandleInit_ParsedShape_Documents = Shared_SearchWorkerDocument[];

export type Lib_Search_Worker_HandleInit_ParsedShape = {
  index: Lib_Search_Worker_HandleInit_ParsedShape_Index;
  documents: Lib_Search_Worker_HandleInit_ParsedShape_Documents;
};

export type Lib_Search_Worker_HandleInit_LoadedIndex = unknown;

export type Lib_Search_Worker_HandleInit_ErrorMessage = string;

/**
 * Lib - Search - Worker - Handle Message.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_HandleMessage_MessageData = Shared_SearchWorkerInitMessage | Shared_SearchWorkerSearchMessage;

/**
 * Lib - Search - Worker - Handle Search.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_HandleSearch_Message = Shared_SearchWorkerSearchMessage;

export type Lib_Search_Worker_HandleSearch_Returns = void;

export type Lib_Search_Worker_HandleSearch_Hits = Array<{
  path: string;
  title: string;
  snippet: string;
  snippetSegments: Array<{
    text: string;
    highlight: boolean;
  }>;
  score: number;
}>;

/**
 * Lib - Search - Worker - Perform Search.
 *
 * @since 0.15.0
 */
export type Lib_Search_Worker_PerformSearch_Returns = Shared_SearchWorkerSearchHit[];

export type Lib_Search_Worker_PerformSearch_Index = unknown;

export type Lib_Search_Worker_PerformSearch_Documents = Shared_SearchWorkerDocuments;

export type Lib_Search_Worker_PerformSearch_Query = string;

export type Lib_Search_Worker_PerformSearch_Limit = number;

export type Lib_Search_Worker_PerformSearch_TrimmedQuery = string;

export type Lib_Search_Worker_PerformSearch_TypedIndex_Search = (query: string) => Shared_SearchWorkerLunrResult[];

export type Lib_Search_Worker_PerformSearch_TypedIndex = {
  search: Lib_Search_Worker_PerformSearch_TypedIndex_Search;
};

export type Lib_Search_Worker_PerformSearch_ExactResults = Array<{
  ref: string;
  score: number;
  matchData: {
    metadata: Record<string, unknown>;
  };
}>;

export type Lib_Search_Worker_PerformSearch_WildcardQuery = string;

export type Lib_Search_Worker_PerformSearch_WildcardResults = Array<{
  ref: string;
  score: number;
  matchData: {
    metadata: Record<string, unknown>;
  };
}>;

export type Lib_Search_Worker_PerformSearch_FuzzyQuery = string;

export type Lib_Search_Worker_PerformSearch_FuzzyResults = Array<{
  ref: string;
  score: number;
  matchData: {
    metadata: Record<string, unknown>;
  };
}>;

export type Lib_Search_Worker_PerformSearch_AllResults = Array<{
  ref: string;
  score: number;
  matchData: {
    metadata: Record<string, unknown>;
  };
}>;

export type Lib_Search_Worker_PerformSearch_ScoreMap = Map<string, number>;

export type Lib_Search_Worker_PerformSearch_TermsMap = Map<string, Set<string>>;

export type Lib_Search_Worker_PerformSearch_Result = Shared_SearchWorkerLunrResult | undefined;

export type Lib_Search_Worker_PerformSearch_ExistingScore = number | undefined;

export type Lib_Search_Worker_PerformSearch_TermsSet = Set<string> | undefined;

export type Lib_Search_Worker_PerformSearch_Term = string;

export type Lib_Search_Worker_PerformSearch_SortedRefs = string[];

export type Lib_Search_Worker_PerformSearch_A = [string, number] | undefined;

export type Lib_Search_Worker_PerformSearch_B = [string, number] | undefined;

export type Lib_Search_Worker_PerformSearch_MappedEntry = [string, number] | undefined;

export type Lib_Search_Worker_PerformSearch_SlicedRefs = string[];

export type Lib_Search_Worker_PerformSearch_Hits = Array<{
  path: string;
  title: string;
  snippet: string;
  snippetSegments: Array<{
    text: string;
    highlight: boolean;
  }>;
  score: number;
}>;

export type Lib_Search_Worker_PerformSearch_Ref = string | undefined;

export type Lib_Search_Worker_PerformSearch_MatchedDocument = Shared_SearchWorkerDocument | undefined;

export type Lib_Search_Worker_PerformSearch_Score = number | undefined;

export type Lib_Search_Worker_PerformSearch_TermPatterns = string[];

export type Lib_Search_Worker_PerformSearch_RefTerms = Set<string> | undefined;

export type Lib_Search_Worker_PerformSearch_RefTerm = string;

export type Lib_Search_Worker_PerformSearch_EscapedTerm = string;

export type Lib_Search_Worker_PerformSearch_EscapedQuery = string;

export type Lib_Search_Worker_PerformSearch_HighlightPattern = string;

export type Lib_Search_Worker_PerformSearch_SegmentPattern = RegExp;

export type Lib_Search_Worker_PerformSearch_ContextRadius = number;

export type Lib_Search_Worker_PerformSearch_ContextPattern = RegExp;

export type Lib_Search_Worker_PerformSearch_ContextMatch = RegExpExecArray | null;

export type Lib_Search_Worker_PerformSearch_ContextSnippet = string;

export type Lib_Search_Worker_PerformSearch_ContextStart = number;

export type Lib_Search_Worker_PerformSearch_ContextEnd = number;

export type Lib_Search_Worker_PerformSearch_SegmentParts = string[];

export type Lib_Search_Worker_PerformSearch_SnippetSegments = Shared_SearchWorkerSearchHit['snippetSegments'];

export type Lib_Search_Worker_PerformSearch_SegmentPart = string;

export type Lib_Search_Worker_PerformSearch_SegmentPartIndex = number;

export type Lib_Search_Worker_PerformSearch_IsHighlight = boolean;

export type Lib_Search_Worker_PerformSearch_Document = Shared_SearchWorkerDocument;

export type Lib_Search_Worker_PerformSearch_Entry = [string, number] | undefined;

export type Lib_Search_Worker_PerformSearch_EscapeMatch = string;

export type Lib_Search_Worker_PerformSearch_MatchedTerm = string;

export type Lib_Search_Worker_PerformSearch_MaybeTermsSet = Lib_Search_Worker_PerformSearch_TermsSet | undefined;

export type Lib_Search_Worker_PerformSearch_ScoreEntries = IterableIterator<[string, number]>;

export type Lib_Search_Worker_PerformSearch_SegmentIsHighlight = boolean;
