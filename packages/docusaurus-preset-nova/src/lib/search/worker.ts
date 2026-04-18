/// <reference path="../../types/worker-globals.d.ts" />

declare const lunr: WorkerGlobalsLunrGlobal;

importScripts('lunr.min.js');

/**
 * Lib - Search - Worker - Search Index.
 *
 * Holds a reference to the deserialized lunr index after the worker receives
 * an init message and successfully fetches the search index JSON.
 *
 * @since 0.15.0
 */
let searchIndex: WorkerGlobalsSearchIndex = undefined;

/**
 * Lib - Search - Worker - Search Documents.
 *
 * Holds the document metadata array loaded alongside the lunr index so search
 * results can be mapped back to page titles, paths, and snippets.
 *
 * @since 0.15.0
 */
let searchDocuments: WorkerGlobalsSearchDocuments = [];

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
async function handleInit(message: WorkerGlobalsHandleInitMessage): WorkerGlobalsHandleInitReturns {
  try {
    const response: WorkerGlobalsHandleInitResponse = await fetch(message['indexUrl']);
    const parsed: WorkerGlobalsHandleInitParsed = await response.json() as WorkerGlobalsHandleInitParsed;

    if (
      parsed === null
      || typeof parsed !== 'object'
      || !('index' in parsed)
      || !('documents' in parsed)
    ) {
      throw new Error('SEARCH_INVALID_INDEX_DATA');
    }

    const loadedIndex: WorkerGlobalsHandleInitLoadedIndex = lunr['Index'].load(parsed['index']);

    searchIndex = loadedIndex;
    searchDocuments = parsed['documents'];

    self.postMessage({ type: 'ready' });
  } catch (error) {
    const errorMessage: WorkerGlobalsHandleInitErrorMessage = (error instanceof Error) ? error['message'] : 'SEARCH_UNKNOWN_INIT_ERROR';

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
function handleSearch(message: WorkerGlobalsHandleSearchMessage): WorkerGlobalsHandleSearchReturns {
  if (searchIndex === undefined) {
    self.postMessage({
      type: 'error', reason: 'SEARCH_INDEX_NOT_INITIALIZED',
    });

    return;
  }

  const hits: WorkerGlobalsPerformSearchReturns = performSearch(searchIndex, searchDocuments, message['query'], message['limit']);

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
function performSearch(index: WorkerGlobalsPerformSearchIndex, documents: WorkerGlobalsPerformSearchDocuments, query: WorkerGlobalsPerformSearchQuery, limit: WorkerGlobalsPerformSearchLimit): WorkerGlobalsPerformSearchReturns {
  const trimmedQuery: WorkerGlobalsPerformSearchTrimmedQuery = query.trim();

  if (trimmedQuery === '') {
    return [];
  }

  const typedIndex: WorkerGlobalsPerformSearchTypedIndex = index as WorkerGlobalsPerformSearchTypedIndex;

  const exactResults: WorkerGlobalsPerformSearchExactResults = typedIndex.search(trimmedQuery);
  const wildcardQuery: WorkerGlobalsPerformSearchWildcardQuery = `${trimmedQuery}*`;
  const wildcardResults: WorkerGlobalsPerformSearchWildcardResults = typedIndex.search(wildcardQuery);
  const fuzzyQuery: WorkerGlobalsPerformSearchFuzzyQuery = `${trimmedQuery}~1`;
  const fuzzyResults: WorkerGlobalsPerformSearchFuzzyResults = typedIndex.search(fuzzyQuery);

  const allResults: WorkerGlobalsPerformSearchAllResults = [
    ...exactResults,
    ...wildcardResults,
    ...fuzzyResults,
  ];

  const scoreMap: WorkerGlobalsPerformSearchScoreMap = new Map();
  const termsMap: WorkerGlobalsPerformSearchTermsMap = new Map();

  for (let i = 0; i < allResults.length; i += 1) {
    const result: WorkerGlobalsPerformSearchResult = allResults[i];

    if (result === undefined) {
      continue;
    }

    const existingScore: WorkerGlobalsPerformSearchExistingScore = scoreMap.get(result['ref']);

    if (existingScore === undefined || result['score'] > existingScore) {
      scoreMap.set(result['ref'], result['score']);
    }

    // Collect matched terms from lunr matchData.
    let termsSet: WorkerGlobalsPerformSearchMaybeTermsSet = termsMap.get(result['ref']);

    if (termsSet === undefined) {
      termsSet = new Set();
      termsMap.set(result['ref'], termsSet);
    }

    for (const matchedTerm of Object.keys(result['matchData']['metadata'])) {
      const term: WorkerGlobalsPerformSearchMatchedTerm = matchedTerm;

      termsSet.add(term);
    }
  }

  const sortedRefs: WorkerGlobalsPerformSearchSortedRefs = Array.from(scoreMap.entries())
    .sort((entryA, entryB) => {
      const a: WorkerGlobalsPerformSearchEntry = entryA;
      const b: WorkerGlobalsPerformSearchEntry = entryB;

      if (a === undefined || b === undefined) {
        return 0;
      }

      return b[1] - a[1];
    })
    .map((entry) => {
      const mappedEntry: WorkerGlobalsPerformSearchEntry = entry;

      if (mappedEntry === undefined) {
        return '';
      }

      return mappedEntry[0];
    });

  const slicedRefs: WorkerGlobalsPerformSearchSlicedRefs = sortedRefs.slice(0, limit);
  const hits: WorkerGlobalsPerformSearchHits = [];

  for (let i = 0; i < slicedRefs.length; i += 1) {
    const ref: WorkerGlobalsPerformSearchRef = slicedRefs[i];

    if (ref === undefined) {
      continue;
    }

    const matchedDocument: WorkerGlobalsPerformSearchMatchedDocument = documents.find((document: WorkerGlobalsSharedDocument) => document['path'] === ref);

    if (matchedDocument === undefined) {
      continue;
    }

    const score: WorkerGlobalsPerformSearchExistingScore = scoreMap.get(ref);

    const termPatterns: WorkerGlobalsPerformSearchTermPatterns = [];
    const refTerms: WorkerGlobalsPerformSearchMaybeTermsSet = termsMap.get(ref);

    if (refTerms !== undefined) {
      for (const matchedTerm of refTerms) {
        const term: WorkerGlobalsPerformSearchMatchedTerm = matchedTerm;
        const escapedTerm: WorkerGlobalsPerformSearchEscapedQuery = term.replace(new RegExp('[.*+?^${}()|[\\]\\\\]', 'g'), (match: WorkerGlobalsPerformSearchEscapeMatch) => `\\${match}`);

        termPatterns.push(`${escapedTerm}\\w*`);
      }
    }

    const escapedQuery: WorkerGlobalsPerformSearchEscapedQuery = trimmedQuery.replace(new RegExp('[.*+?^${}()|[\\]\\\\]', 'g'), (match: WorkerGlobalsPerformSearchEscapeMatch) => `\\${match}`);

    termPatterns.push(escapedQuery);

    const highlightPattern: WorkerGlobalsPerformSearchHighlightPattern = termPatterns.join('|');
    const segmentPattern: WorkerGlobalsPerformSearchSegmentPattern = new RegExp(`(${highlightPattern})`, 'gi');

    // Generate a context-aware snippet from the body around the first match.
    const contextRadius: WorkerGlobalsPerformSearchContextRadius = 80;
    const contextPattern: WorkerGlobalsPerformSearchContextPattern = new RegExp(highlightPattern, 'gi');
    const contextMatch: WorkerGlobalsPerformSearchContextMatch = contextPattern.exec(matchedDocument['body']);
    let contextSnippet: WorkerGlobalsPerformSearchContextSnippet = matchedDocument['snippet'];

    if (contextMatch !== null) {
      const contextStart: WorkerGlobalsPerformSearchContextStart = Math.max(0, contextMatch.index - contextRadius);
      const contextEnd: WorkerGlobalsPerformSearchContextEnd = Math.min(matchedDocument['body'].length, contextMatch.index + contextMatch[0].length + contextRadius);

      contextSnippet = ((contextStart > 0) ? '\u2026' : '') + matchedDocument['body'].slice(contextStart, contextEnd).trim() + ((contextEnd < matchedDocument['body'].length) ? '\u2026' : '');
    }

    const segmentParts: WorkerGlobalsPerformSearchSegmentParts = contextSnippet.split(segmentPattern);
    const snippetSegments: WorkerGlobalsPerformSearchSnippetSegments = [];

    for (let j = 0; j < segmentParts.length; j += 1) {
      const segmentPart: WorkerGlobalsPerformSearchSegmentPart = segmentParts[j] as WorkerGlobalsPerformSearchSegmentPart;

      if (segmentPart === '') {
        continue;
      }

      const segmentPartIndex: WorkerGlobalsPerformSearchSegmentPartIndex = j;
      const isHighlight: WorkerGlobalsPerformSearchSegmentIsHighlight = segmentPartIndex % 2 === 1;

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
  self.addEventListener('message', (event: WorkerGlobalsListenerEvent) => {
    const messageData: WorkerGlobalsListenerMessageData = event['data'];

    if (messageData['type'] === 'init') {
      void handleInit(messageData);
    } else if (messageData['type'] === 'search') {
      handleSearch(messageData);
    }

    return;
  });
}
