import { LIB_REGEX_SPECIAL_CHARACTERS } from '../regex.js';

import type {
  Lib_Search_PerformSearch_PerformSearch_A,
  Lib_Search_PerformSearch_PerformSearch_AllResults,
  Lib_Search_PerformSearch_PerformSearch_B,
  Lib_Search_PerformSearch_PerformSearch_ContextEnd,
  Lib_Search_PerformSearch_PerformSearch_ContextMatch,
  Lib_Search_PerformSearch_PerformSearch_ContextPattern,
  Lib_Search_PerformSearch_PerformSearch_ContextRadius,
  Lib_Search_PerformSearch_PerformSearch_ContextSnippet,
  Lib_Search_PerformSearch_PerformSearch_ContextStart,
  Lib_Search_PerformSearch_PerformSearch_Documents,
  Lib_Search_PerformSearch_PerformSearch_EscapedQuery,
  Lib_Search_PerformSearch_PerformSearch_EscapedTerm,
  Lib_Search_PerformSearch_PerformSearch_ExactResults,
  Lib_Search_PerformSearch_PerformSearch_ExistingScore,
  Lib_Search_PerformSearch_PerformSearch_FuzzyDistance,
  Lib_Search_PerformSearch_PerformSearch_FuzzyQuery,
  Lib_Search_PerformSearch_PerformSearch_FuzzyResults,
  Lib_Search_PerformSearch_PerformSearch_HighlightPattern,
  Lib_Search_PerformSearch_PerformSearch_Hits,
  Lib_Search_PerformSearch_PerformSearch_Index,
  Lib_Search_PerformSearch_PerformSearch_IsHighlight,
  Lib_Search_PerformSearch_PerformSearch_Limit,
  Lib_Search_PerformSearch_PerformSearch_MappedEntry,
  Lib_Search_PerformSearch_PerformSearch_MatchedDocument,
  Lib_Search_PerformSearch_PerformSearch_Query,
  Lib_Search_PerformSearch_PerformSearch_Ref,
  Lib_Search_PerformSearch_PerformSearch_RefTerm,
  Lib_Search_PerformSearch_PerformSearch_RefTerms,
  Lib_Search_PerformSearch_PerformSearch_Result,
  Lib_Search_PerformSearch_PerformSearch_Returns,
  Lib_Search_PerformSearch_PerformSearch_Score,
  Lib_Search_PerformSearch_PerformSearch_ScoreMap,
  Lib_Search_PerformSearch_PerformSearch_SegmentPart,
  Lib_Search_PerformSearch_PerformSearch_SegmentPartIndex,
  Lib_Search_PerformSearch_PerformSearch_SegmentParts,
  Lib_Search_PerformSearch_PerformSearch_SegmentPattern,
  Lib_Search_PerformSearch_PerformSearch_SlicedRefs,
  Lib_Search_PerformSearch_PerformSearch_SnippetSegments,
  Lib_Search_PerformSearch_PerformSearch_SortedRefs,
  Lib_Search_PerformSearch_PerformSearch_Term,
  Lib_Search_PerformSearch_PerformSearch_TermPatterns,
  Lib_Search_PerformSearch_PerformSearch_TermsMap,
  Lib_Search_PerformSearch_PerformSearch_TermsSet,
  Lib_Search_PerformSearch_PerformSearch_TrimmedQuery,
  Lib_Search_PerformSearch_PerformSearch_TypedIndex,
  Lib_Search_PerformSearch_PerformSearch_WildcardQuery,
  Lib_Search_PerformSearch_PerformSearch_WildcardResults,
} from '../../types/lib/search/perform-search.d.ts';

/**
 * Lib - Search - Perform Search - Perform Search.
 *
 * Runs three search strategies against the lunr index (exact, wildcard,
 * and fuzzy), deduplicates by path keeping the highest score, sorts by
 * descending score, caps at the limit, then maps refs to metadata.
 *
 * @param index         - Index.
 * @param documents     - Documents.
 * @param query         - Query.
 * @param limit         - Limit.
 * @param fuzzyDistance - Fuzzy distance.
 * @returns             Perform search.
 * @since 0.15.0
 */
export function performSearch(index: Lib_Search_PerformSearch_PerformSearch_Index, documents: Lib_Search_PerformSearch_PerformSearch_Documents, query: Lib_Search_PerformSearch_PerformSearch_Query, limit: Lib_Search_PerformSearch_PerformSearch_Limit, fuzzyDistance: Lib_Search_PerformSearch_PerformSearch_FuzzyDistance): Lib_Search_PerformSearch_PerformSearch_Returns {
  const trimmedQuery: Lib_Search_PerformSearch_PerformSearch_TrimmedQuery = query.trim();

  if (trimmedQuery === '') {
    return [];
  }

  const typedIndex: Lib_Search_PerformSearch_PerformSearch_TypedIndex = index as Lib_Search_PerformSearch_PerformSearch_TypedIndex;

  const exactResults: Lib_Search_PerformSearch_PerformSearch_ExactResults = typedIndex.search(trimmedQuery);
  const wildcardQuery: Lib_Search_PerformSearch_PerformSearch_WildcardQuery = `${trimmedQuery}*`;
  const wildcardResults: Lib_Search_PerformSearch_PerformSearch_WildcardResults = typedIndex.search(wildcardQuery);
  const fuzzyQuery: Lib_Search_PerformSearch_PerformSearch_FuzzyQuery = `${trimmedQuery}~${fuzzyDistance}`;
  const fuzzyResults: Lib_Search_PerformSearch_PerformSearch_FuzzyResults = typedIndex.search(fuzzyQuery);

  const allResults: Lib_Search_PerformSearch_PerformSearch_AllResults = [
    ...exactResults,
    ...wildcardResults,
    ...fuzzyResults,
  ];

  const scoreMap: Lib_Search_PerformSearch_PerformSearch_ScoreMap = new Map();
  const termsMap: Lib_Search_PerformSearch_PerformSearch_TermsMap = new Map();

  for (let i = 0; i < allResults.length; i += 1) {
    const result: Lib_Search_PerformSearch_PerformSearch_Result = allResults[i];

    if (result === undefined) {
      continue;
    }

    const existingScore: Lib_Search_PerformSearch_PerformSearch_ExistingScore = scoreMap.get(result['ref']);

    if (existingScore === undefined || result['score'] > existingScore) {
      scoreMap.set(result['ref'], result['score']);
    }

    // Collect matched terms from lunr matchData.
    let termsSet: Lib_Search_PerformSearch_PerformSearch_TermsSet = termsMap.get(result['ref']);

    if (termsSet === undefined) {
      termsSet = new Set();
      termsMap.set(result['ref'], termsSet);
    }

    for (const matchedTerm of Object.keys(result['matchData']['metadata'])) {
      const term: Lib_Search_PerformSearch_PerformSearch_Term = matchedTerm;

      termsSet.add(term);
    }
  }

  const sortedRefs: Lib_Search_PerformSearch_PerformSearch_SortedRefs = Array.from(scoreMap.entries())
    .sort((entryA, entryB) => {
      const a: Lib_Search_PerformSearch_PerformSearch_A = entryA;
      const b: Lib_Search_PerformSearch_PerformSearch_B = entryB;

      if (a === undefined || b === undefined) {
        return 0;
      }

      return b[1] - a[1];
    })
    .map((entry) => {
      const mappedEntry: Lib_Search_PerformSearch_PerformSearch_MappedEntry = entry;

      if (mappedEntry === undefined) {
        return '';
      }

      return mappedEntry[0];
    });

  const slicedRefs: Lib_Search_PerformSearch_PerformSearch_SlicedRefs = sortedRefs.slice(0, limit);
  const hits: Lib_Search_PerformSearch_PerformSearch_Hits = [];

  for (let i = 0; i < slicedRefs.length; i += 1) {
    const ref: Lib_Search_PerformSearch_PerformSearch_Ref = slicedRefs[i];

    if (ref === undefined) {
      continue;
    }

    const matchedDocument: Lib_Search_PerformSearch_PerformSearch_MatchedDocument = documents.find((document) => document['path'] === ref);

    if (matchedDocument === undefined) {
      continue;
    }

    const score: Lib_Search_PerformSearch_PerformSearch_Score = scoreMap.get(ref);

    const termPatterns: Lib_Search_PerformSearch_PerformSearch_TermPatterns = [];
    const refTerms: Lib_Search_PerformSearch_PerformSearch_RefTerms = termsMap.get(ref);

    if (refTerms !== undefined) {
      for (const matchedTerm of refTerms) {
        const refTerm: Lib_Search_PerformSearch_PerformSearch_RefTerm = matchedTerm;
        const escapedTerm: Lib_Search_PerformSearch_PerformSearch_EscapedTerm = refTerm.replace(new RegExp(LIB_REGEX_SPECIAL_CHARACTERS.source, 'g'), (match) => `\\${match}`);

        termPatterns.push(`${escapedTerm}\\w*`);
      }
    }

    const escapedQuery: Lib_Search_PerformSearch_PerformSearch_EscapedQuery = trimmedQuery.replace(new RegExp(LIB_REGEX_SPECIAL_CHARACTERS.source, 'g'), (match) => `\\${match}`);

    termPatterns.push(escapedQuery);

    const highlightPattern: Lib_Search_PerformSearch_PerformSearch_HighlightPattern = termPatterns.join('|');
    const segmentPattern: Lib_Search_PerformSearch_PerformSearch_SegmentPattern = new RegExp(`(${highlightPattern})`, 'gi');

    // Generate a context-aware snippet from the body around the first match.
    const contextRadius: Lib_Search_PerformSearch_PerformSearch_ContextRadius = 80;
    const contextPattern: Lib_Search_PerformSearch_PerformSearch_ContextPattern = new RegExp(highlightPattern, 'gi');
    const contextMatch: Lib_Search_PerformSearch_PerformSearch_ContextMatch = contextPattern.exec(matchedDocument['body']);
    let contextSnippet: Lib_Search_PerformSearch_PerformSearch_ContextSnippet = matchedDocument['snippet'];

    if (contextMatch !== null) {
      const contextStart: Lib_Search_PerformSearch_PerformSearch_ContextStart = Math.max(0, contextMatch.index - contextRadius);
      const contextEnd: Lib_Search_PerformSearch_PerformSearch_ContextEnd = Math.min(matchedDocument['body'].length, contextMatch.index + contextMatch[0].length + contextRadius);

      contextSnippet = ((contextStart > 0) ? '…' : '') + matchedDocument['body'].slice(contextStart, contextEnd).trim() + ((contextEnd < matchedDocument['body'].length) ? '…' : '');
    }

    const segmentParts: Lib_Search_PerformSearch_PerformSearch_SegmentParts = contextSnippet.split(segmentPattern);
    const snippetSegments: Lib_Search_PerformSearch_PerformSearch_SnippetSegments = [];

    for (let j = 0; j < segmentParts.length; j += 1) {
      const segmentPart: Lib_Search_PerformSearch_PerformSearch_SegmentPart = segmentParts[j] as Lib_Search_PerformSearch_PerformSearch_SegmentPart;

      if (segmentPart === '') {
        continue;
      }

      const segmentPartIndex: Lib_Search_PerformSearch_PerformSearch_SegmentPartIndex = j;
      const isHighlight: Lib_Search_PerformSearch_PerformSearch_IsHighlight = segmentPartIndex % 2 === 1;

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
