/// <reference path="../../types/worker-globals.d.ts" />

import { LIB_REGEX_PATTERN_REGEX_SPECIAL_CHARS } from '../regex.js';

import type {
  Lib_Search_Worker_Event,
  Lib_Search_Worker_HandleInit_ErrorMessage,
  Lib_Search_Worker_HandleInit_LoadedIndex,
  Lib_Search_Worker_HandleInit_Message,
  Lib_Search_Worker_HandleInit_Parsed,
  Lib_Search_Worker_HandleInit_Response,
  Lib_Search_Worker_HandleInit_Returns,
  Lib_Search_Worker_HandleMessage_MessageData,
  Lib_Search_Worker_HandleSearch_FuzzyDistance,
  Lib_Search_Worker_HandleSearch_Hits,
  Lib_Search_Worker_HandleSearch_Message,
  Lib_Search_Worker_HandleSearch_Returns,
  Lib_Search_Worker_PerformSearch_A,
  Lib_Search_Worker_PerformSearch_AllResults,
  Lib_Search_Worker_PerformSearch_B,
  Lib_Search_Worker_PerformSearch_ContextEnd,
  Lib_Search_Worker_PerformSearch_ContextMatch,
  Lib_Search_Worker_PerformSearch_ContextPattern,
  Lib_Search_Worker_PerformSearch_ContextRadius,
  Lib_Search_Worker_PerformSearch_ContextSnippet,
  Lib_Search_Worker_PerformSearch_ContextStart,
  Lib_Search_Worker_PerformSearch_Documents,
  Lib_Search_Worker_PerformSearch_EscapedQuery,
  Lib_Search_Worker_PerformSearch_EscapedTerm,
  Lib_Search_Worker_PerformSearch_ExactResults,
  Lib_Search_Worker_PerformSearch_ExistingScore,
  Lib_Search_Worker_PerformSearch_FuzzyDistance,
  Lib_Search_Worker_PerformSearch_FuzzyQuery,
  Lib_Search_Worker_PerformSearch_FuzzyResults,
  Lib_Search_Worker_PerformSearch_HighlightPattern,
  Lib_Search_Worker_PerformSearch_Hits,
  Lib_Search_Worker_PerformSearch_Index,
  Lib_Search_Worker_PerformSearch_IsHighlight,
  Lib_Search_Worker_PerformSearch_Limit,
  Lib_Search_Worker_PerformSearch_MappedEntry,
  Lib_Search_Worker_PerformSearch_MatchedDocument,
  Lib_Search_Worker_PerformSearch_Query,
  Lib_Search_Worker_PerformSearch_Ref,
  Lib_Search_Worker_PerformSearch_RefTerm,
  Lib_Search_Worker_PerformSearch_RefTerms,
  Lib_Search_Worker_PerformSearch_Result,
  Lib_Search_Worker_PerformSearch_Returns,
  Lib_Search_Worker_PerformSearch_Score,
  Lib_Search_Worker_PerformSearch_ScoreMap,
  Lib_Search_Worker_PerformSearch_SegmentPart,
  Lib_Search_Worker_PerformSearch_SegmentPartIndex,
  Lib_Search_Worker_PerformSearch_SegmentParts,
  Lib_Search_Worker_PerformSearch_SegmentPattern,
  Lib_Search_Worker_PerformSearch_SlicedRefs,
  Lib_Search_Worker_PerformSearch_SnippetSegments,
  Lib_Search_Worker_PerformSearch_SortedRefs,
  Lib_Search_Worker_PerformSearch_Term,
  Lib_Search_Worker_PerformSearch_TermPatterns,
  Lib_Search_Worker_PerformSearch_TermsMap,
  Lib_Search_Worker_PerformSearch_TermsSet,
  Lib_Search_Worker_PerformSearch_TrimmedQuery,
  Lib_Search_Worker_PerformSearch_TypedIndex,
  Lib_Search_Worker_PerformSearch_WildcardQuery,
  Lib_Search_Worker_PerformSearch_WildcardResults,
  Lib_Search_Worker_SearchDocuments,
  Lib_Search_Worker_SearchIndex,
} from '../../types/lib/search/worker.d.ts';

declare const lunr: WorkerGlobals_LunrGlobal;

importScripts('lunr.min.js');

/**
 * Lib - Search - Worker - Search Index.
 *
 * Holds a reference to the deserialized lunr index after the worker receives
 * an init message and successfully fetches the search index JSON.
 *
 * @since 0.15.0
 */
let searchIndex: Lib_Search_Worker_SearchIndex = undefined;

/**
 * Lib - Search - Worker - Search Documents.
 *
 * Holds the document metadata array loaded alongside the lunr index so search
 * results can be mapped back to page titles, paths, and snippets.
 *
 * @since 0.15.0
 */
let searchDocuments: Lib_Search_Worker_SearchDocuments = [];

/**
 * Lib - Search - Worker - Handle Init.
 *
 * Fetches the search index JSON from the provided URL, deserializes the lunr
 * index via lunr.Index.load, stores both the index and document metadata, then
 * posts a ready response back to the main thread.
 *
 * @param message - Message.
 * @returns       Handle init.
 * @since 0.15.0
 */
async function handleInit(message: Lib_Search_Worker_HandleInit_Message): Lib_Search_Worker_HandleInit_Returns {
  try {
    const response: Lib_Search_Worker_HandleInit_Response = await fetch(message['indexUrl']);
    const parsed: Lib_Search_Worker_HandleInit_Parsed = await response.json() as Lib_Search_Worker_HandleInit_Parsed;

    if (
      parsed === null
      || typeof parsed !== 'object'
      || !('index' in parsed)
      || !('documents' in parsed)
    ) {
      throw new Error('SEARCH_INVALID_INDEX_DATA');
    }

    const loadedIndex: Lib_Search_Worker_HandleInit_LoadedIndex = lunr['Index'].load(parsed['index']);

    searchIndex = loadedIndex;
    searchDocuments = parsed['documents'];

    self.postMessage({ type: 'ready' });
  } catch (error) {
    const errorMessage: Lib_Search_Worker_HandleInit_ErrorMessage = (error instanceof Error) ? error['message'] : 'SEARCH_UNKNOWN_INIT_ERROR';

    self.postMessage({
      type: 'error', reason: errorMessage,
    });
  }

  return;
}

/**
 * Lib - Search - Worker - Handle Search.
 *
 * Validates that the index has been loaded then delegates to performSearch
 * for the actual query execution and posts the results or an error response
 * back to the main thread.
 *
 * @param message - Message.
 * @since 0.15.0
 */
function handleSearch(message: Lib_Search_Worker_HandleSearch_Message): Lib_Search_Worker_HandleSearch_Returns {
  if (searchIndex === undefined) {
    self.postMessage({
      type: 'error', reason: 'SEARCH_INDEX_NOT_INITIALIZED',
    });

    return;
  }

  const fuzzyDistance: Lib_Search_Worker_HandleSearch_FuzzyDistance = message['fuzzyDistance'] ?? 1;
  const hits: Lib_Search_Worker_HandleSearch_Hits = performSearch(searchIndex, searchDocuments, message['query'], message['limit'], fuzzyDistance);

  self.postMessage({
    type: 'results', hits,
  });

  return;
}

/**
 * Lib - Search - Worker - Perform Search.
 *
 * Runs three search strategies against the lunr index (exact, wildcard, and
 * fuzzy), merges and deduplicates the results by path keeping the highest
 * score, sorts by descending score, caps at the limit, then maps refs to metadata.
 *
 * @param index         - Index.
 * @param documents     - Documents.
 * @param query         - Query.
 * @param limit         - Limit.
 * @param fuzzyDistance - Fuzzy distance.
 * @returns             Perform search.
 * @since 0.15.0
 */
function performSearch(index: Lib_Search_Worker_PerformSearch_Index, documents: Lib_Search_Worker_PerformSearch_Documents, query: Lib_Search_Worker_PerformSearch_Query, limit: Lib_Search_Worker_PerformSearch_Limit, fuzzyDistance: Lib_Search_Worker_PerformSearch_FuzzyDistance): Lib_Search_Worker_PerformSearch_Returns {
  const trimmedQuery: Lib_Search_Worker_PerformSearch_TrimmedQuery = query.trim();

  if (trimmedQuery === '') {
    return [];
  }

  const typedIndex: Lib_Search_Worker_PerformSearch_TypedIndex = index as Lib_Search_Worker_PerformSearch_TypedIndex;

  const exactResults: Lib_Search_Worker_PerformSearch_ExactResults = typedIndex.search(trimmedQuery);
  const wildcardQuery: Lib_Search_Worker_PerformSearch_WildcardQuery = `${trimmedQuery}*`;
  const wildcardResults: Lib_Search_Worker_PerformSearch_WildcardResults = typedIndex.search(wildcardQuery);
  const fuzzyQuery: Lib_Search_Worker_PerformSearch_FuzzyQuery = `${trimmedQuery}~${fuzzyDistance}`;
  const fuzzyResults: Lib_Search_Worker_PerformSearch_FuzzyResults = typedIndex.search(fuzzyQuery);

  const allResults: Lib_Search_Worker_PerformSearch_AllResults = [
    ...exactResults,
    ...wildcardResults,
    ...fuzzyResults,
  ];

  const scoreMap: Lib_Search_Worker_PerformSearch_ScoreMap = new Map();
  const termsMap: Lib_Search_Worker_PerformSearch_TermsMap = new Map();

  for (let i = 0; i < allResults.length; i += 1) {
    const result: Lib_Search_Worker_PerformSearch_Result = allResults[i];

    if (result === undefined) {
      continue;
    }

    const existingScore: Lib_Search_Worker_PerformSearch_ExistingScore = scoreMap.get(result['ref']);

    if (existingScore === undefined || result['score'] > existingScore) {
      scoreMap.set(result['ref'], result['score']);
    }

    // Collect matched terms from lunr matchData.
    let termsSet: Lib_Search_Worker_PerformSearch_TermsSet = termsMap.get(result['ref']);

    if (termsSet === undefined) {
      termsSet = new Set();
      termsMap.set(result['ref'], termsSet);
    }

    for (const matchedTerm of Object.keys(result['matchData']['metadata'])) {
      const term: Lib_Search_Worker_PerformSearch_Term = matchedTerm;

      termsSet.add(term);
    }
  }

  const sortedRefs: Lib_Search_Worker_PerformSearch_SortedRefs = Array.from(scoreMap.entries())
    .sort((entryA, entryB) => {
      const a: Lib_Search_Worker_PerformSearch_A = entryA;
      const b: Lib_Search_Worker_PerformSearch_B = entryB;

      if (a === undefined || b === undefined) {
        return 0;
      }

      return b[1] - a[1];
    })
    .map((entry) => {
      const mappedEntry: Lib_Search_Worker_PerformSearch_MappedEntry = entry;

      if (mappedEntry === undefined) {
        return '';
      }

      return mappedEntry[0];
    });

  const slicedRefs: Lib_Search_Worker_PerformSearch_SlicedRefs = sortedRefs.slice(0, limit);
  const hits: Lib_Search_Worker_PerformSearch_Hits = [];

  for (let i = 0; i < slicedRefs.length; i += 1) {
    const ref: Lib_Search_Worker_PerformSearch_Ref = slicedRefs[i];

    if (ref === undefined) {
      continue;
    }

    const matchedDocument: Lib_Search_Worker_PerformSearch_MatchedDocument = documents.find((document) => document['path'] === ref);

    if (matchedDocument === undefined) {
      continue;
    }

    const score: Lib_Search_Worker_PerformSearch_Score = scoreMap.get(ref);

    const termPatterns: Lib_Search_Worker_PerformSearch_TermPatterns = [];
    const refTerms: Lib_Search_Worker_PerformSearch_RefTerms = termsMap.get(ref);

    if (refTerms !== undefined) {
      for (const matchedTerm of refTerms) {
        const refTerm: Lib_Search_Worker_PerformSearch_RefTerm = matchedTerm;
        const escapedTerm: Lib_Search_Worker_PerformSearch_EscapedTerm = refTerm.replace(new RegExp(LIB_REGEX_PATTERN_REGEX_SPECIAL_CHARS.source, 'g'), (match) => `\\${match}`);

        termPatterns.push(`${escapedTerm}\\w*`);
      }
    }

    const escapedQuery: Lib_Search_Worker_PerformSearch_EscapedQuery = trimmedQuery.replace(new RegExp(LIB_REGEX_PATTERN_REGEX_SPECIAL_CHARS.source, 'g'), (match) => `\\${match}`);

    termPatterns.push(escapedQuery);

    const highlightPattern: Lib_Search_Worker_PerformSearch_HighlightPattern = termPatterns.join('|');
    const segmentPattern: Lib_Search_Worker_PerformSearch_SegmentPattern = new RegExp(`(${highlightPattern})`, 'gi');

    // Generate a context-aware snippet from the body around the first match.
    const contextRadius: Lib_Search_Worker_PerformSearch_ContextRadius = 80;
    const contextPattern: Lib_Search_Worker_PerformSearch_ContextPattern = new RegExp(highlightPattern, 'gi');
    const contextMatch: Lib_Search_Worker_PerformSearch_ContextMatch = contextPattern.exec(matchedDocument['body']);
    let contextSnippet: Lib_Search_Worker_PerformSearch_ContextSnippet = matchedDocument['snippet'];

    if (contextMatch !== null) {
      const contextStart: Lib_Search_Worker_PerformSearch_ContextStart = Math.max(0, contextMatch.index - contextRadius);
      const contextEnd: Lib_Search_Worker_PerformSearch_ContextEnd = Math.min(matchedDocument['body'].length, contextMatch.index + contextMatch[0].length + contextRadius);

      contextSnippet = ((contextStart > 0) ? '…' : '') + matchedDocument['body'].slice(contextStart, contextEnd).trim() + ((contextEnd < matchedDocument['body'].length) ? '…' : '');
    }

    const segmentParts: Lib_Search_Worker_PerformSearch_SegmentParts = contextSnippet.split(segmentPattern);
    const snippetSegments: Lib_Search_Worker_PerformSearch_SnippetSegments = [];

    for (let j = 0; j < segmentParts.length; j += 1) {
      const segmentPart: Lib_Search_Worker_PerformSearch_SegmentPart = segmentParts[j] as Lib_Search_Worker_PerformSearch_SegmentPart;

      if (segmentPart === '') {
        continue;
      }

      const segmentPartIndex: Lib_Search_Worker_PerformSearch_SegmentPartIndex = j;
      const isHighlight: Lib_Search_Worker_PerformSearch_IsHighlight = segmentPartIndex % 2 === 1;

      snippetSegments.push({
        text: segmentPart,
        highlight: isHighlight,
      });
    }

    hits.push({
      path: matchedDocument['path'],
      title: matchedDocument['title'],
      snippet: contextSnippet,
      snippetSegments,
      score: (score !== undefined) ? score : 0,
    });
  }

  return hits;
}

/**
 * Lib - Search - Worker - Handle Message.
 *
 * Dispatches an incoming worker message to the appropriate handler based on
 * the message type field.
 *
 * @param event - Event.
 * @since 0.15.0
 */
const handleMessage = (event: Lib_Search_Worker_Event) => {
  const messageData: Lib_Search_Worker_HandleMessage_MessageData = event['data'];

  if (messageData['type'] === 'init') {
    void handleInit(messageData);
  } else if (messageData['type'] === 'search') {
    handleSearch(messageData);
  }

  return;
};

/**
 * Lib - Search - Worker.
 *
 * Registers the message event handler on the worker global scope so the
 * worker can receive init and search messages from the main thread.
 *
 * @since 0.15.0
 */
if (typeof self !== 'undefined') {
  self.addEventListener('message', handleMessage);
}
