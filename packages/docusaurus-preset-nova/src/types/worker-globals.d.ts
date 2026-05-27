/**
 * Worker Globals - Handle Init.
 *
 * @since 0.15.0
 */
type WorkerGlobals_HandleInitMessage = import('./lib/search/worker.d.ts').Lib_Search_Worker_HandleInit_Message;
type WorkerGlobals_HandleInitReturns = import('./lib/search/worker.d.ts').Lib_Search_Worker_HandleInit_Returns;
type WorkerGlobals_HandleInitResponse = import('./lib/search/worker.d.ts').Lib_Search_Worker_HandleInit_Response;
type WorkerGlobals_HandleInitParsed = import('./lib/search/worker.d.ts').Lib_Search_Worker_HandleInit_Parsed;
type WorkerGlobals_HandleInitLoadedIndex = import('./lib/search/worker.d.ts').Lib_Search_Worker_HandleInit_LoadedIndex;
type WorkerGlobals_HandleInitErrorMessage = import('./lib/search/worker.d.ts').Lib_Search_Worker_HandleInit_ErrorMessage;

/**
 * Worker Globals - Handle Search.
 *
 * @since 0.15.0
 */
type WorkerGlobals_HandleSearchMessage = import('./lib/search/worker.d.ts').Lib_Search_Worker_HandleSearch_Message;
type WorkerGlobals_HandleSearchReturns = import('./lib/search/worker.d.ts').Lib_Search_Worker_HandleSearch_Returns;

/**
 * Worker Globals - Listener.
 *
 * @since 0.15.0
 */
type WorkerGlobals_ListenerEvent = import('./lib/search/worker.d.ts').Lib_Search_Worker_ListenerEvent;
type WorkerGlobals_ListenerMessageData = import('./lib/search/worker.d.ts').Lib_Search_Worker_ListenerMessageData;

/**
 * Worker Globals - Lunr Global.
 *
 * @since 0.15.0
 */
type WorkerGlobals_LunrGlobal = import('./lib/search/worker.d.ts').Lib_Search_Worker_LunrGlobal;

/**
 * Worker Globals - Perform Search.
 *
 * @since 0.15.0
 */
type WorkerGlobals_PerformSearchReturns = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_Returns;
type WorkerGlobals_PerformSearchIndex = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_Index;
type WorkerGlobals_PerformSearchDocuments = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_Documents;
type WorkerGlobals_PerformSearchQuery = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_Query;
type WorkerGlobals_PerformSearchLimit = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_Limit;
type WorkerGlobals_PerformSearchTrimmedQuery = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_TrimmedQuery;
type WorkerGlobals_PerformSearchTypedIndex = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_TypedIndex;
type WorkerGlobals_PerformSearchExactResults = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_ExactResults;
type WorkerGlobals_PerformSearchWildcardQuery = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_WildcardQuery;
type WorkerGlobals_PerformSearchWildcardResults = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_WildcardResults;
type WorkerGlobals_PerformSearchFuzzyQuery = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_FuzzyQuery;
type WorkerGlobals_PerformSearchFuzzyResults = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_FuzzyResults;
type WorkerGlobals_PerformSearchAllResults = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_AllResults;
type WorkerGlobals_PerformSearchScoreMap = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_ScoreMap;
type WorkerGlobals_PerformSearchResult = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_Result;
type WorkerGlobals_PerformSearchExistingScore = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_ExistingScore;
type WorkerGlobals_PerformSearchSortedRefs = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_SortedRefs;
type WorkerGlobals_PerformSearchEntry = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_Entry;
type WorkerGlobals_PerformSearchSlicedRefs = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_SlicedRefs;
type WorkerGlobals_PerformSearchHits = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_Hits;
type WorkerGlobals_PerformSearchRef = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_Ref;
type WorkerGlobals_PerformSearchMatchedDocument = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_MatchedDocument;
type WorkerGlobals_PerformSearchTermsMap = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_TermsMap;
type WorkerGlobals_PerformSearchTermsSet = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_TermsSet;
type WorkerGlobals_PerformSearchMaybeTermsSet = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_MaybeTermsSet;
type WorkerGlobals_PerformSearchMatchedTerm = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_MatchedTerm;
type WorkerGlobals_PerformSearchTermPatterns = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_TermPatterns;
type WorkerGlobals_PerformSearchHighlightPattern = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_HighlightPattern;
type WorkerGlobals_PerformSearchContextPattern = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_ContextPattern;
type WorkerGlobals_PerformSearchContextMatch = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_ContextMatch;
type WorkerGlobals_PerformSearchContextStart = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_ContextStart;
type WorkerGlobals_PerformSearchContextEnd = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_ContextEnd;
type WorkerGlobals_PerformSearchContextSnippet = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_ContextSnippet;
type WorkerGlobals_PerformSearchContextRadius = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_ContextRadius;
type WorkerGlobals_PerformSearchEscapeMatch = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_EscapeMatch;
type WorkerGlobals_PerformSearchEscapedQuery = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_EscapedQuery;
type WorkerGlobals_PerformSearchSnippetSegments = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_SnippetSegments;
type WorkerGlobals_PerformSearchSegmentPattern = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_SegmentPattern;
type WorkerGlobals_PerformSearchSegmentParts = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_SegmentParts;
type WorkerGlobals_PerformSearchSegmentPart = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_SegmentPart;
type WorkerGlobals_PerformSearchSegmentPartIndex = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_SegmentPartIndex;
type WorkerGlobals_PerformSearchSegmentIsHighlight = import('./lib/search/worker.d.ts').Lib_Search_Worker_PerformSearch_SegmentIsHighlight;

/**
 * Worker Globals - Search Documents.
 *
 * @since 0.15.0
 */
type WorkerGlobals_SearchDocuments = import('./lib/search/worker.d.ts').Lib_Search_Worker_SearchDocuments;

/**
 * Worker Globals - Search Index.
 *
 * @since 0.15.0
 */
type WorkerGlobals_SearchIndex = import('./lib/search/worker.d.ts').Lib_Search_Worker_SearchIndex;

/**
 * Worker Globals - Shared Document.
 *
 * @since 0.15.0
 */
type WorkerGlobals_SharedDocument = import('./shared.d.ts').Shared_SearchWorkerDocument;
