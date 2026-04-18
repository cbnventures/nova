/**
 * Worker Globals - Handle Init.
 *
 * @since 0.15.0
 */
type WorkerGlobalsHandleInitMessage = import('./lib/search/worker.d.ts').LibSearchWorkerHandleInitMessage;
type WorkerGlobalsHandleInitReturns = import('./lib/search/worker.d.ts').LibSearchWorkerHandleInitReturns;
type WorkerGlobalsHandleInitResponse = import('./lib/search/worker.d.ts').LibSearchWorkerHandleInitResponse;
type WorkerGlobalsHandleInitParsed = import('./lib/search/worker.d.ts').LibSearchWorkerHandleInitParsed;
type WorkerGlobalsHandleInitLoadedIndex = import('./lib/search/worker.d.ts').LibSearchWorkerHandleInitLoadedIndex;
type WorkerGlobalsHandleInitErrorMessage = import('./lib/search/worker.d.ts').LibSearchWorkerHandleInitErrorMessage;

/**
 * Worker Globals - Handle Search.
 *
 * @since 0.15.0
 */
type WorkerGlobalsHandleSearchMessage = import('./lib/search/worker.d.ts').LibSearchWorkerHandleSearchMessage;
type WorkerGlobalsHandleSearchReturns = import('./lib/search/worker.d.ts').LibSearchWorkerHandleSearchReturns;

/**
 * Worker Globals - Listener.
 *
 * @since 0.15.0
 */
type WorkerGlobalsListenerEvent = import('./lib/search/worker.d.ts').LibSearchWorkerListenerEvent;
type WorkerGlobalsListenerMessageData = import('./lib/search/worker.d.ts').LibSearchWorkerListenerMessageData;

/**
 * Worker Globals - Lunr Global.
 *
 * @since 0.15.0
 */
type WorkerGlobalsLunrGlobal = import('./lib/search/worker.d.ts').LibSearchWorkerLunrGlobal;

/**
 * Worker Globals - Perform Search.
 *
 * @since 0.15.0
 */
type WorkerGlobalsPerformSearchReturns = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchReturns;
type WorkerGlobalsPerformSearchIndex = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchIndex;
type WorkerGlobalsPerformSearchDocuments = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchDocuments;
type WorkerGlobalsPerformSearchQuery = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchQuery;
type WorkerGlobalsPerformSearchLimit = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchLimit;
type WorkerGlobalsPerformSearchTrimmedQuery = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchTrimmedQuery;
type WorkerGlobalsPerformSearchTypedIndex = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchTypedIndex;
type WorkerGlobalsPerformSearchExactResults = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchExactResults;
type WorkerGlobalsPerformSearchWildcardQuery = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchWildcardQuery;
type WorkerGlobalsPerformSearchWildcardResults = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchWildcardResults;
type WorkerGlobalsPerformSearchFuzzyQuery = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchFuzzyQuery;
type WorkerGlobalsPerformSearchFuzzyResults = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchFuzzyResults;
type WorkerGlobalsPerformSearchAllResults = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchAllResults;
type WorkerGlobalsPerformSearchScoreMap = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchScoreMap;
type WorkerGlobalsPerformSearchResult = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchResult;
type WorkerGlobalsPerformSearchExistingScore = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchExistingScore;
type WorkerGlobalsPerformSearchSortedRefs = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchSortedRefs;
type WorkerGlobalsPerformSearchEntry = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchEntry;
type WorkerGlobalsPerformSearchSlicedRefs = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchSlicedRefs;
type WorkerGlobalsPerformSearchHits = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchHits;
type WorkerGlobalsPerformSearchRef = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchRef;
type WorkerGlobalsPerformSearchMatchedDocument = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchMatchedDocument;
type WorkerGlobalsPerformSearchTermsMap = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchTermsMap;
type WorkerGlobalsPerformSearchTermsSet = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchTermsSet;
type WorkerGlobalsPerformSearchMaybeTermsSet = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchMaybeTermsSet;
type WorkerGlobalsPerformSearchMatchedTerm = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchMatchedTerm;
type WorkerGlobalsPerformSearchTermPatterns = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchTermPatterns;
type WorkerGlobalsPerformSearchHighlightPattern = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchHighlightPattern;
type WorkerGlobalsPerformSearchContextPattern = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchContextPattern;
type WorkerGlobalsPerformSearchContextMatch = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchContextMatch;
type WorkerGlobalsPerformSearchContextStart = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchContextStart;
type WorkerGlobalsPerformSearchContextEnd = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchContextEnd;
type WorkerGlobalsPerformSearchContextSnippet = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchContextSnippet;
type WorkerGlobalsPerformSearchContextRadius = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchContextRadius;
type WorkerGlobalsPerformSearchEscapeMatch = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchEscapeMatch;
type WorkerGlobalsPerformSearchEscapedQuery = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchEscapedQuery;
type WorkerGlobalsPerformSearchSnippetSegments = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchSnippetSegments;
type WorkerGlobalsPerformSearchSegmentPattern = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchSegmentPattern;
type WorkerGlobalsPerformSearchSegmentParts = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchSegmentParts;
type WorkerGlobalsPerformSearchSegmentPart = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchSegmentPart;
type WorkerGlobalsPerformSearchSegmentPartIndex = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchSegmentPartIndex;
type WorkerGlobalsPerformSearchSegmentIsHighlight = import('./lib/search/worker.d.ts').LibSearchWorkerPerformSearchSegmentIsHighlight;

/**
 * Worker Globals - Search Documents.
 *
 * @since 0.15.0
 */
type WorkerGlobalsSearchDocuments = import('./lib/search/worker.d.ts').LibSearchWorkerSearchDocuments;

/**
 * Worker Globals - Search Index.
 *
 * @since 0.15.0
 */
type WorkerGlobalsSearchIndex = import('./lib/search/worker.d.ts').LibSearchWorkerSearchIndex;

/**
 * Worker Globals - Shared Document.
 *
 * @since 0.15.0
 */
type WorkerGlobalsSharedDocument = import('./shared.d.ts').SharedSearchWorkerDocument;
