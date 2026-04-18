import type {
  SharedSearchWorkerDocument,
  SharedSearchWorkerDocuments,
  SharedSearchWorkerInitMessage,
  SharedSearchWorkerLunrResult,
  SharedSearchWorkerMessage,
  SharedSearchWorkerSearchHit,
  SharedSearchWorkerSearchMessage,
} from '../../shared.d.ts';

/**
 * Lib - Search - Worker - Handle Init.
 *
 * @since 0.15.0
 */
export type LibSearchWorkerHandleInitMessage = SharedSearchWorkerInitMessage;

export type LibSearchWorkerHandleInitReturns = Promise<void>;

export type LibSearchWorkerHandleInitResponse = Response;

export type LibSearchWorkerHandleInitParsed = LibSearchWorkerHandleInitParsedShape;

export type LibSearchWorkerHandleInitParsedShapeIndex = unknown;

export type LibSearchWorkerHandleInitParsedShapeDocuments = SharedSearchWorkerDocument[];

export type LibSearchWorkerHandleInitParsedShape = {
  index: LibSearchWorkerHandleInitParsedShapeIndex;
  documents: LibSearchWorkerHandleInitParsedShapeDocuments;
};

export type LibSearchWorkerHandleInitLoadedIndex = unknown;

export type LibSearchWorkerHandleInitErrorMessage = string;

/**
 * Lib - Search - Worker - Handle Search.
 *
 * @since 0.15.0
 */
export type LibSearchWorkerHandleSearchMessage = SharedSearchWorkerSearchMessage;

export type LibSearchWorkerHandleSearchReturns = void;

/**
 * Lib - Search - Worker - Listener.
 *
 * @since 0.15.0
 */
export type LibSearchWorkerListenerEvent = MessageEvent<SharedSearchWorkerMessage>;

export type LibSearchWorkerListenerMessageData = SharedSearchWorkerMessage;

/**
 * Lib - Search - Worker - Lunr Global.
 *
 * @since 0.15.0
 */
export type LibSearchWorkerLunrGlobalIndexLoad = (serializedIndex: unknown) => unknown;

export type LibSearchWorkerLunrGlobalIndex = {
  load: LibSearchWorkerLunrGlobalIndexLoad;
};

export type LibSearchWorkerLunrGlobal = {
  Index: LibSearchWorkerLunrGlobalIndex;
};

/**
 * Lib - Search - Worker - Perform Search.
 *
 * @since 0.15.0
 */
export type LibSearchWorkerPerformSearchReturns = SharedSearchWorkerSearchHit[];

export type LibSearchWorkerPerformSearchIndex = unknown;

export type LibSearchWorkerPerformSearchDocuments = SharedSearchWorkerDocuments;

export type LibSearchWorkerPerformSearchQuery = string;

export type LibSearchWorkerPerformSearchLimit = number;

export type LibSearchWorkerPerformSearchTrimmedQuery = string;

export type LibSearchWorkerPerformSearchTypedIndexSearch = (query: string) => SharedSearchWorkerLunrResult[];

export type LibSearchWorkerPerformSearchTypedIndex = {
  search: LibSearchWorkerPerformSearchTypedIndexSearch;
};

export type LibSearchWorkerPerformSearchExactResults = SharedSearchWorkerLunrResult[];

export type LibSearchWorkerPerformSearchWildcardQuery = string;

export type LibSearchWorkerPerformSearchWildcardResults = SharedSearchWorkerLunrResult[];

export type LibSearchWorkerPerformSearchFuzzyQuery = string;

export type LibSearchWorkerPerformSearchFuzzyResults = SharedSearchWorkerLunrResult[];

export type LibSearchWorkerPerformSearchAllResults = SharedSearchWorkerLunrResult[];

export type LibSearchWorkerPerformSearchScoreMap = Map<string, number>;

export type LibSearchWorkerPerformSearchResult = SharedSearchWorkerLunrResult | undefined;

export type LibSearchWorkerPerformSearchExistingScore = number | undefined;

export type LibSearchWorkerPerformSearchScoreEntries = IterableIterator<[string, number]>;

export type LibSearchWorkerPerformSearchSortedRefs = string[];

export type LibSearchWorkerPerformSearchEntry = [string, number] | undefined;

export type LibSearchWorkerPerformSearchSlicedRefs = string[];

export type LibSearchWorkerPerformSearchHits = SharedSearchWorkerSearchHit[];

export type LibSearchWorkerPerformSearchRef = string | undefined;

export type LibSearchWorkerPerformSearchMatchedDocument = SharedSearchWorkerDocument | undefined;

export type LibSearchWorkerPerformSearchDocument = SharedSearchWorkerDocument;

export type LibSearchWorkerPerformSearchSnippetSegments = SharedSearchWorkerSearchHit['snippetSegments'];

export type LibSearchWorkerPerformSearchTermsMap = Map<string, Set<string>>;

export type LibSearchWorkerPerformSearchTermsSet = Set<string>;

export type LibSearchWorkerPerformSearchMaybeTermsSet = LibSearchWorkerPerformSearchTermsSet | undefined;

export type LibSearchWorkerPerformSearchMatchedTerm = string;

export type LibSearchWorkerPerformSearchTermPatterns = string[];

export type LibSearchWorkerPerformSearchEscapeMatch = string;

export type LibSearchWorkerPerformSearchEscapedQuery = string;

export type LibSearchWorkerPerformSearchHighlightPattern = string;

export type LibSearchWorkerPerformSearchContextPattern = RegExp;

export type LibSearchWorkerPerformSearchContextMatch = RegExpExecArray | null;

export type LibSearchWorkerPerformSearchContextStart = number;

export type LibSearchWorkerPerformSearchContextEnd = number;

export type LibSearchWorkerPerformSearchContextSnippet = string;

export type LibSearchWorkerPerformSearchContextRadius = number;

export type LibSearchWorkerPerformSearchSegmentPattern = RegExp;

export type LibSearchWorkerPerformSearchSegmentParts = string[];

export type LibSearchWorkerPerformSearchSegmentPart = string;

export type LibSearchWorkerPerformSearchSegmentPartIndex = number;

export type LibSearchWorkerPerformSearchSegmentIsHighlight = boolean;

/**
 * Lib - Search - Worker - Search Documents.
 *
 * @since 0.15.0
 */
export type LibSearchWorkerSearchDocuments = SharedSearchWorkerDocuments;

/**
 * Lib - Search - Worker - Search Index.
 *
 * @since 0.15.0
 */
export type LibSearchWorkerSearchIndex = unknown;
