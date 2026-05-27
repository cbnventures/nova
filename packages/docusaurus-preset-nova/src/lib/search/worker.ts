/// <reference path="../../types/worker-globals.d.ts" />

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
let searchIndex: WorkerGlobals_SearchIndex = undefined;

/**
 * Lib - Search - Worker - Search Documents.
 *
 * Holds the document metadata array loaded alongside the lunr index so search
 * results can be mapped back to page titles, paths, and snippets.
 *
 * @since 0.15.0
 */
let searchDocuments: WorkerGlobals_SearchDocuments = [];

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
async function handleInit(message: WorkerGlobals_HandleInitMessage): WorkerGlobals_HandleInitReturns {
  try {
    const response: WorkerGlobals_HandleInitResponse = await fetch(message['indexUrl']);
    const parsed: WorkerGlobals_HandleInitParsed = await response.json() as WorkerGlobals_HandleInitParsed;

    if (
      parsed === null
      || typeof parsed !== 'object'
      || !('index' in parsed)
      || !('documents' in parsed)
    ) {
      throw new Error('SEARCH_INVALID_INDEX_DATA');
    }

    const loadedIndex: WorkerGlobals_HandleInitLoadedIndex = lunr['Index'].load(parsed['index']);

    searchIndex = loadedIndex;
    searchDocuments = parsed['documents'];

    self.postMessage({ type: 'ready' });
  } catch (error) {
    const errorMessage: WorkerGlobals_HandleInitErrorMessage = (error instanceof Error) ? error['message'] : 'SEARCH_UNKNOWN_INIT_ERROR';

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
function handleSearch(message: WorkerGlobals_HandleSearchMessage): WorkerGlobals_HandleSearchReturns {
  if (searchIndex === undefined) {
    self.postMessage({
      type: 'error', reason: 'SEARCH_INDEX_NOT_INITIALIZED',
    });

    return;
  }

  const hits: WorkerGlobals_PerformSearchReturns = performSearch(searchIndex, searchDocuments, message['query'], message['limit']);

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
 * @param index     - Index.
 * @param documents - Documents.
 * @param query     - Query.
 * @param limit     - Limit.
 * @returns         Perform search.
 * @since 0.15.0
 */
function performSearch(index: WorkerGlobals_PerformSearchIndex, documents: WorkerGlobals_PerformSearchDocuments, query: WorkerGlobals_PerformSearchQuery, limit: WorkerGlobals_PerformSearchLimit): WorkerGlobals_PerformSearchReturns {
  const trimmedQuery: WorkerGlobals_PerformSearchTrimmedQuery = query.trim();

  if (trimmedQuery === '') {
    return [];
  }

  const typedIndex: WorkerGlobals_PerformSearchTypedIndex = index as WorkerGlobals_PerformSearchTypedIndex;

  const exactResults: WorkerGlobals_PerformSearchExactResults = typedIndex.search(trimmedQuery);
  const wildcardQuery: WorkerGlobals_PerformSearchWildcardQuery = `${trimmedQuery}*`;
  const wildcardResults: WorkerGlobals_PerformSearchWildcardResults = typedIndex.search(wildcardQuery);
  const fuzzyQuery: WorkerGlobals_PerformSearchFuzzyQuery = `${trimmedQuery}~1`;
  const fuzzyResults: WorkerGlobals_PerformSearchFuzzyResults = typedIndex.search(fuzzyQuery);

  const allResults: WorkerGlobals_PerformSearchAllResults = [
    ...exactResults,
    ...wildcardResults,
    ...fuzzyResults,
  ];

  const scoreMap: WorkerGlobals_PerformSearchScoreMap = new Map();
  const termsMap: WorkerGlobals_PerformSearchTermsMap = new Map();

  for (let i = 0; i < allResults.length; i += 1) {
    const result: WorkerGlobals_PerformSearchResult = allResults[i];

    if (result === undefined) {
      continue;
    }

    const existingScore: WorkerGlobals_PerformSearchExistingScore = scoreMap.get(result['ref']);

    if (existingScore === undefined || result['score'] > existingScore) {
      scoreMap.set(result['ref'], result['score']);
    }

    // Collect matched terms from lunr matchData.
    let termsSet: WorkerGlobals_PerformSearchMaybeTermsSet = termsMap.get(result['ref']);

    if (termsSet === undefined) {
      termsSet = new Set();
      termsMap.set(result['ref'], termsSet);
    }

    for (const matchedTerm of Object.keys(result['matchData']['metadata'])) {
      const term: WorkerGlobals_PerformSearchMatchedTerm = matchedTerm;

      termsSet.add(term);
    }
  }

  const sortedRefs: WorkerGlobals_PerformSearchSortedRefs = Array.from(scoreMap.entries())
    .sort((entryA, entryB) => {
      const a: WorkerGlobals_PerformSearchEntry = entryA;
      const b: WorkerGlobals_PerformSearchEntry = entryB;

      if (a === undefined || b === undefined) {
        return 0;
      }

      return b[1] - a[1];
    })
    .map((entry) => {
      const mappedEntry: WorkerGlobals_PerformSearchEntry = entry;

      if (mappedEntry === undefined) {
        return '';
      }

      return mappedEntry[0];
    });

  const slicedRefs: WorkerGlobals_PerformSearchSlicedRefs = sortedRefs.slice(0, limit);
  const hits: WorkerGlobals_PerformSearchHits = [];

  for (let i = 0; i < slicedRefs.length; i += 1) {
    const ref: WorkerGlobals_PerformSearchRef = slicedRefs[i];

    if (ref === undefined) {
      continue;
    }

    const matchedDocument: WorkerGlobals_PerformSearchMatchedDocument = documents.find((document: WorkerGlobals_SharedDocument) => document['path'] === ref);

    if (matchedDocument === undefined) {
      continue;
    }

    const score: WorkerGlobals_PerformSearchExistingScore = scoreMap.get(ref);

    const termPatterns: WorkerGlobals_PerformSearchTermPatterns = [];
    const refTerms: WorkerGlobals_PerformSearchMaybeTermsSet = termsMap.get(ref);

    if (refTerms !== undefined) {
      for (const matchedTerm of refTerms) {
        const term: WorkerGlobals_PerformSearchMatchedTerm = matchedTerm;
        const escapedTerm: WorkerGlobals_PerformSearchEscapedQuery = term.replace(new RegExp('[.*+?^${}()|[\\]\\\\]', 'g'), (match: WorkerGlobals_PerformSearchEscapeMatch) => `\\${match}`);

        termPatterns.push(`${escapedTerm}\\w*`);
      }
    }

    const escapedQuery: WorkerGlobals_PerformSearchEscapedQuery = trimmedQuery.replace(new RegExp('[.*+?^${}()|[\\]\\\\]', 'g'), (match: WorkerGlobals_PerformSearchEscapeMatch) => `\\${match}`);

    termPatterns.push(escapedQuery);

    const highlightPattern: WorkerGlobals_PerformSearchHighlightPattern = termPatterns.join('|');
    const segmentPattern: WorkerGlobals_PerformSearchSegmentPattern = new RegExp(`(${highlightPattern})`, 'gi');

    // Generate a context-aware snippet from the body around the first match.
    const contextRadius: WorkerGlobals_PerformSearchContextRadius = 80;
    const contextPattern: WorkerGlobals_PerformSearchContextPattern = new RegExp(highlightPattern, 'gi');
    const contextMatch: WorkerGlobals_PerformSearchContextMatch = contextPattern.exec(matchedDocument['body']);
    let contextSnippet: WorkerGlobals_PerformSearchContextSnippet = matchedDocument['snippet'];

    if (contextMatch !== null) {
      const contextStart: WorkerGlobals_PerformSearchContextStart = Math.max(0, contextMatch.index - contextRadius);
      const contextEnd: WorkerGlobals_PerformSearchContextEnd = Math.min(matchedDocument['body'].length, contextMatch.index + contextMatch[0].length + contextRadius);

      contextSnippet = ((contextStart > 0) ? '\u2026' : '') + matchedDocument['body'].slice(contextStart, contextEnd).trim() + ((contextEnd < matchedDocument['body'].length) ? '\u2026' : '');
    }

    const segmentParts: WorkerGlobals_PerformSearchSegmentParts = contextSnippet.split(segmentPattern);
    const snippetSegments: WorkerGlobals_PerformSearchSnippetSegments = [];

    for (let j = 0; j < segmentParts.length; j += 1) {
      const segmentPart: WorkerGlobals_PerformSearchSegmentPart = segmentParts[j] as WorkerGlobals_PerformSearchSegmentPart;

      if (segmentPart === '') {
        continue;
      }

      const segmentPartIndex: WorkerGlobals_PerformSearchSegmentPartIndex = j;
      const isHighlight: WorkerGlobals_PerformSearchSegmentIsHighlight = segmentPartIndex % 2 === 1;

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
 * Lib - Search - Worker.
 *
 * Registers the message event handler on the worker global scope that
 * dispatches incoming messages to the appropriate handler based on the
 * message type field.
 *
 * @since 0.15.0
 */
if (typeof self !== 'undefined') {
  self.addEventListener('message', (event: WorkerGlobals_ListenerEvent) => {
    const messageData: WorkerGlobals_ListenerMessageData = event['data'];

    if (messageData['type'] === 'init') {
      void handleInit(messageData);
    } else if (messageData['type'] === 'search') {
      handleSearch(messageData);
    }

    return;
  });
}
