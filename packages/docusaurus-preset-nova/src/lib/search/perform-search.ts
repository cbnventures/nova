import { LIB_REGEX_SPECIAL_CHARACTERS } from '../regex.js';

import type {
  LibSearchWorkerPerformSearchAllResults,
  LibSearchWorkerPerformSearchContextEnd,
  LibSearchWorkerPerformSearchContextMatch,
  LibSearchWorkerPerformSearchContextPattern,
  LibSearchWorkerPerformSearchContextRadius,
  LibSearchWorkerPerformSearchContextSnippet,
  LibSearchWorkerPerformSearchContextStart,
  LibSearchWorkerPerformSearchDocument,
  LibSearchWorkerPerformSearchDocuments,
  LibSearchWorkerPerformSearchEntry,
  LibSearchWorkerPerformSearchEscapedQuery,
  LibSearchWorkerPerformSearchEscapeMatch,
  LibSearchWorkerPerformSearchExactResults,
  LibSearchWorkerPerformSearchExistingScore,
  LibSearchWorkerPerformSearchFuzzyQuery,
  LibSearchWorkerPerformSearchFuzzyResults,
  LibSearchWorkerPerformSearchHighlightPattern,
  LibSearchWorkerPerformSearchHits,
  LibSearchWorkerPerformSearchIndex,
  LibSearchWorkerPerformSearchLimit,
  LibSearchWorkerPerformSearchMatchedDocument,
  LibSearchWorkerPerformSearchMatchedTerm,
  LibSearchWorkerPerformSearchMaybeTermsSet,
  LibSearchWorkerPerformSearchQuery,
  LibSearchWorkerPerformSearchRef,
  LibSearchWorkerPerformSearchResult,
  LibSearchWorkerPerformSearchReturns,
  LibSearchWorkerPerformSearchScoreMap,
  LibSearchWorkerPerformSearchSegmentIsHighlight,
  LibSearchWorkerPerformSearchSegmentPart,
  LibSearchWorkerPerformSearchSegmentPartIndex,
  LibSearchWorkerPerformSearchSegmentParts,
  LibSearchWorkerPerformSearchSegmentPattern,
  LibSearchWorkerPerformSearchSlicedRefs,
  LibSearchWorkerPerformSearchSnippetSegments,
  LibSearchWorkerPerformSearchSortedRefs,
  LibSearchWorkerPerformSearchTermPatterns,
  LibSearchWorkerPerformSearchTermsMap,
  LibSearchWorkerPerformSearchTrimmedQuery,
  LibSearchWorkerPerformSearchTypedIndex,
  LibSearchWorkerPerformSearchWildcardQuery,
  LibSearchWorkerPerformSearchWildcardResults,
} from '../../types/lib/search/worker.d.ts';

/**
 * Lib - Search - Perform Search - Perform Search.
 *
 * Runs three search strategies against the lunr index (exact, wildcard,
 * and fuzzy), deduplicates by path keeping the highest score, sorts by
 * descending score, caps at the limit, then maps refs to metadata.
 *
 * @param index     - Index.
 * @param documents - Documents.
 * @param query     - Query.
 * @param limit     - Limit.
 * @returns         Perform search.
 * @since 0.15.0
 */
export function performSearch(index: LibSearchWorkerPerformSearchIndex, documents: LibSearchWorkerPerformSearchDocuments, query: LibSearchWorkerPerformSearchQuery, limit: LibSearchWorkerPerformSearchLimit): LibSearchWorkerPerformSearchReturns {
  const trimmedQuery: LibSearchWorkerPerformSearchTrimmedQuery = query.trim();

  if (trimmedQuery === '') {
    return [];
  }

  const typedIndex: LibSearchWorkerPerformSearchTypedIndex = index as LibSearchWorkerPerformSearchTypedIndex;

  const exactResults: LibSearchWorkerPerformSearchExactResults = typedIndex.search(trimmedQuery);
  const wildcardQuery: LibSearchWorkerPerformSearchWildcardQuery = `${trimmedQuery}*`;
  const wildcardResults: LibSearchWorkerPerformSearchWildcardResults = typedIndex.search(wildcardQuery);
  const fuzzyQuery: LibSearchWorkerPerformSearchFuzzyQuery = `${trimmedQuery}~1`;
  const fuzzyResults: LibSearchWorkerPerformSearchFuzzyResults = typedIndex.search(fuzzyQuery);

  const allResults: LibSearchWorkerPerformSearchAllResults = [
    ...exactResults,
    ...wildcardResults,
    ...fuzzyResults,
  ];

  const scoreMap: LibSearchWorkerPerformSearchScoreMap = new Map();
  const termsMap: LibSearchWorkerPerformSearchTermsMap = new Map();

  for (let i = 0; i < allResults.length; i += 1) {
    const result: LibSearchWorkerPerformSearchResult = allResults[i];

    if (result === undefined) {
      continue;
    }

    const existingScore: LibSearchWorkerPerformSearchExistingScore = scoreMap.get(result['ref']);

    if (existingScore === undefined || result['score'] > existingScore) {
      scoreMap.set(result['ref'], result['score']);
    }

    // Collect matched terms from lunr matchData.
    let termsSet: LibSearchWorkerPerformSearchMaybeTermsSet = termsMap.get(result['ref']);

    if (termsSet === undefined) {
      termsSet = new Set();
      termsMap.set(result['ref'], termsSet);
    }

    for (const matchedTerm of Object.keys(result['matchData']['metadata'])) {
      const term: LibSearchWorkerPerformSearchMatchedTerm = matchedTerm;

      termsSet.add(term);
    }
  }

  const sortedRefs: LibSearchWorkerPerformSearchSortedRefs = Array.from(scoreMap.entries())
    .sort((entryA, entryB) => {
      const a: LibSearchWorkerPerformSearchEntry = entryA;
      const b: LibSearchWorkerPerformSearchEntry = entryB;

      if (a === undefined || b === undefined) {
        return 0;
      }

      return b[1] - a[1];
    })
    .map((entry) => {
      const mappedEntry: LibSearchWorkerPerformSearchEntry = entry;

      if (mappedEntry === undefined) {
        return '';
      }

      return mappedEntry[0];
    });

  const slicedRefs: LibSearchWorkerPerformSearchSlicedRefs = sortedRefs.slice(0, limit);
  const hits: LibSearchWorkerPerformSearchHits = [];

  for (let i = 0; i < slicedRefs.length; i += 1) {
    const ref: LibSearchWorkerPerformSearchRef = slicedRefs[i];

    if (ref === undefined) {
      continue;
    }

    const matchedDocument: LibSearchWorkerPerformSearchMatchedDocument = documents.find((document: LibSearchWorkerPerformSearchDocument) => document['path'] === ref);

    if (matchedDocument === undefined) {
      continue;
    }

    const score: LibSearchWorkerPerformSearchExistingScore = scoreMap.get(ref);

    const termPatterns: LibSearchWorkerPerformSearchTermPatterns = [];
    const refTerms: LibSearchWorkerPerformSearchMaybeTermsSet = termsMap.get(ref);

    if (refTerms !== undefined) {
      for (const matchedTerm of refTerms) {
        const term: LibSearchWorkerPerformSearchMatchedTerm = matchedTerm;
        const escapedTerm: LibSearchWorkerPerformSearchEscapedQuery = term.replace(new RegExp(LIB_REGEX_SPECIAL_CHARACTERS.source, 'g'), (match: LibSearchWorkerPerformSearchEscapeMatch) => `\\${match}`);

        termPatterns.push(`${escapedTerm}\\w*`);
      }
    }

    const escapedQuery: LibSearchWorkerPerformSearchEscapedQuery = trimmedQuery.replace(new RegExp(LIB_REGEX_SPECIAL_CHARACTERS.source, 'g'), (match: LibSearchWorkerPerformSearchEscapeMatch) => `\\${match}`);

    termPatterns.push(escapedQuery);

    const highlightPattern: LibSearchWorkerPerformSearchHighlightPattern = termPatterns.join('|');
    const segmentPattern: LibSearchWorkerPerformSearchSegmentPattern = new RegExp(`(${highlightPattern})`, 'gi');

    // Generate a context-aware snippet from the body around the first match.
    const contextRadius: LibSearchWorkerPerformSearchContextRadius = 80;
    const contextPattern: LibSearchWorkerPerformSearchContextPattern = new RegExp(highlightPattern, 'gi');
    const contextMatch: LibSearchWorkerPerformSearchContextMatch = contextPattern.exec(matchedDocument['body']);
    let contextSnippet: LibSearchWorkerPerformSearchContextSnippet = matchedDocument['snippet'];

    if (contextMatch !== null) {
      const contextStart: LibSearchWorkerPerformSearchContextStart = Math.max(0, contextMatch.index - contextRadius);
      const contextEnd: LibSearchWorkerPerformSearchContextEnd = Math.min(matchedDocument['body'].length, contextMatch.index + contextMatch[0].length + contextRadius);

      contextSnippet = ((contextStart > 0) ? '\u2026' : '') + matchedDocument['body'].slice(contextStart, contextEnd).trim() + ((contextEnd < matchedDocument['body'].length) ? '\u2026' : '');
    }

    const segmentParts: LibSearchWorkerPerformSearchSegmentParts = contextSnippet.split(segmentPattern);
    const snippetSegments: LibSearchWorkerPerformSearchSnippetSegments = [];

    for (let j = 0; j < segmentParts.length; j += 1) {
      const segmentPart: LibSearchWorkerPerformSearchSegmentPart = segmentParts[j] as LibSearchWorkerPerformSearchSegmentPart;

      if (segmentPart === '') {
        continue;
      }

      const segmentPartIndex: LibSearchWorkerPerformSearchSegmentPartIndex = j;
      const isHighlight: LibSearchWorkerPerformSearchSegmentIsHighlight = segmentPartIndex % 2 === 1;

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
