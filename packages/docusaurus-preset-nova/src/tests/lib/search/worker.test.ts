import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';

import lunr from 'lunr';
import { describe, it } from 'vitest';

import { performSearch } from '../../../lib/search/perform-search.js';

import type {
  Tests_Lib_Search_Worker_BuildTestIndex_Document,
  Tests_Lib_Search_Worker_BuildTestIndex_Index,
  Tests_Lib_Search_Worker_BuildTestIndex_Returns,
  Tests_Lib_Search_Worker_Documents,
  Tests_Lib_Search_Worker_FirstHit,
  Tests_Lib_Search_Worker_FirstScore,
  Tests_Lib_Search_Worker_LastResultIndex,
  Tests_Lib_Search_Worker_LastResultItem,
  Tests_Lib_Search_Worker_LastScore,
  Tests_Lib_Search_Worker_MapHitPath_Hit,
  Tests_Lib_Search_Worker_MapHitPath_Returns,
  Tests_Lib_Search_Worker_NarrowResults,
  Tests_Lib_Search_Worker_Paths,
  Tests_Lib_Search_Worker_PerformSearchDeduplication_ReturnsUniquePathsWithNoDuplicates_Index,
  Tests_Lib_Search_Worker_PerformSearchEmptyQuery_ReturnsAnEmptyArrayForAnEmptyQuery_Index,
  Tests_Lib_Search_Worker_PerformSearchExact_ReturnsMatchingDocumentsForAnExactQuery_Index,
  Tests_Lib_Search_Worker_PerformSearchFuzzy_MatchesNearMissQueriesViaFuzzyStrategy_Index,
  Tests_Lib_Search_Worker_PerformSearchFuzzyDistance_WidensFuzzyMatchingAsTheDistanceIncreases_Index,
  Tests_Lib_Search_Worker_PerformSearchLimit_CapsResultsAtTheSpecifiedLimit_Index,
  Tests_Lib_Search_Worker_PerformSearchScoreSorting_ReturnsResultsSortedByScoreDescending_Index,
  Tests_Lib_Search_Worker_PerformSearchWildcard_MatchesPrefixQueriesViaWildcardStrategy_Index,
  Tests_Lib_Search_Worker_Results,
  Tests_Lib_Search_Worker_TestData,
  Tests_Lib_Search_Worker_UniquePaths,
  Tests_Lib_Search_Worker_WiderResults,
} from '../../../types/tests/lib/search/worker.test.d.ts';

/**
 * Tests - Lib - Search - Worker - Map Hit Path.
 *
 * @param {Tests_Lib_Search_Worker_MapHitPath_Hit} hit - Hit.
 *
 * @returns {Tests_Lib_Search_Worker_MapHitPath_Returns}
 *
 * @since 0.15.0
 */
const mapHitPath = (hit: Tests_Lib_Search_Worker_MapHitPath_Hit): Tests_Lib_Search_Worker_MapHitPath_Returns => hit['path'];

/**
 * Tests - Lib - Search - Worker - Build Test Index.
 *
 * @returns Build test index.
 * @since 0.15.0
 */
function buildTestIndex(): Tests_Lib_Search_Worker_BuildTestIndex_Returns {
  const documents: Tests_Lib_Search_Worker_Documents = [
    {
      path: '/docs/intro',
      title: 'Introduction',
      snippet: 'Getting started with the project',
      body: 'Getting started guide for new users',
    },
    {
      path: '/docs/api',
      title: 'API Reference',
      snippet: 'Complete function documentation',
      body: 'Function documentation and examples',
    },
    {
      path: '/docs/config',
      title: 'Configuration',
      snippet: 'How to configure the application',
      body: 'Configuration options and settings reference',
    },
    {
      path: '/docs/tutorial',
      title: 'Tutorial',
      snippet: 'Step by step tutorial guide',
      body: 'Tutorial walkthrough for building your first app',
    },
    {
      path: '/docs/faq',
      title: 'Frequently Asked Questions',
      snippet: 'Common questions and answers',
      body: 'Answers to frequently asked questions about configuration',
    },
  ];

  const index: Tests_Lib_Search_Worker_BuildTestIndex_Index = lunr(function buildIndex() {
    this.ref('path');

    this.field('title');

    this.field('body');

    for (let i = 0; i < documents.length; i += 1) {
      const document: Tests_Lib_Search_Worker_BuildTestIndex_Document = documents[i];

      if (document !== undefined) {
        this.add(document);
      }
    }

    return;
  });

  return {
    index,
    documents,
  };
}

/**
 * Tests - Lib - Search - Worker - PerformSearch Exact.
 *
 * @since 0.15.0
 */
describe('performSearch exact', async () => {
  it('returns matching documents for an exact query', () => {
    const testData: Tests_Lib_Search_Worker_TestData = buildTestIndex();
    const index: Tests_Lib_Search_Worker_PerformSearchExact_ReturnsMatchingDocumentsForAnExactQuery_Index = testData['index'];
    const documents: Tests_Lib_Search_Worker_Documents = testData['documents'];
    const results: Tests_Lib_Search_Worker_Results = performSearch(index, documents, 'introduction', 10, 1);

    ok(results.length > 0);

    const firstHit: Tests_Lib_Search_Worker_FirstHit = results[0];

    if (firstHit !== undefined) {
      strictEqual(firstHit['path'], '/docs/intro');
      strictEqual(firstHit['title'], 'Introduction');
    }

    ok(firstHit !== undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Worker - PerformSearch Wildcard.
 *
 * @since 0.15.0
 */
describe('performSearch wildcard', async () => {
  it('matches prefix queries via wildcard strategy', () => {
    const testData: Tests_Lib_Search_Worker_TestData = buildTestIndex();
    const index: Tests_Lib_Search_Worker_PerformSearchWildcard_MatchesPrefixQueriesViaWildcardStrategy_Index = testData['index'];
    const documents: Tests_Lib_Search_Worker_Documents = testData['documents'];
    const results: Tests_Lib_Search_Worker_Results = performSearch(index, documents, 'config', 10, 1);

    ok(results.length > 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Worker - PerformSearch Fuzzy.
 *
 * @since 0.15.0
 */
describe('performSearch fuzzy', async () => {
  it('matches near-miss queries via fuzzy strategy', () => {
    const testData: Tests_Lib_Search_Worker_TestData = buildTestIndex();
    const index: Tests_Lib_Search_Worker_PerformSearchFuzzy_MatchesNearMissQueriesViaFuzzyStrategy_Index = testData['index'];
    const documents: Tests_Lib_Search_Worker_Documents = testData['documents'];
    const results: Tests_Lib_Search_Worker_Results = performSearch(index, documents, 'tutoril', 10, 1);

    ok(results.length > 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Worker - PerformSearch Fuzzy Distance.
 *
 * @since 0.18.1
 */
describe('performSearch fuzzy distance', async () => {
  it('widens fuzzy matching as the distance increases', () => {
    const testData: Tests_Lib_Search_Worker_TestData = buildTestIndex();
    const index: Tests_Lib_Search_Worker_PerformSearchFuzzyDistance_WidensFuzzyMatchingAsTheDistanceIncreases_Index = testData['index'];
    const documents: Tests_Lib_Search_Worker_Documents = testData['documents'];
    const narrowResults: Tests_Lib_Search_Worker_NarrowResults = performSearch(index, documents, 'tutorail', 10, 1);
    const widerResults: Tests_Lib_Search_Worker_WiderResults = performSearch(index, documents, 'tutorail', 10, 2);

    ok(widerResults.length >= narrowResults.length);
    ok(widerResults.length > 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Worker - PerformSearch Deduplication.
 *
 * @since 0.15.0
 */
describe('performSearch deduplication', async () => {
  it('returns unique paths with no duplicates', () => {
    const testData: Tests_Lib_Search_Worker_TestData = buildTestIndex();
    const index: Tests_Lib_Search_Worker_PerformSearchDeduplication_ReturnsUniquePathsWithNoDuplicates_Index = testData['index'];
    const documents: Tests_Lib_Search_Worker_Documents = testData['documents'];
    const results: Tests_Lib_Search_Worker_Results = performSearch(index, documents, 'configuration', 10, 1);
    const paths: Tests_Lib_Search_Worker_Paths = results.map(mapHitPath);
    const uniquePaths: Tests_Lib_Search_Worker_UniquePaths = new Set(paths);

    strictEqual(paths.length, uniquePaths.size);

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Worker - PerformSearch Score Sorting.
 *
 * @since 0.15.0
 */
describe('performSearch score sorting', async () => {
  it('returns results sorted by score descending', () => {
    const testData: Tests_Lib_Search_Worker_TestData = buildTestIndex();
    const index: Tests_Lib_Search_Worker_PerformSearchScoreSorting_ReturnsResultsSortedByScoreDescending_Index = testData['index'];
    const documents: Tests_Lib_Search_Worker_Documents = testData['documents'];
    const results: Tests_Lib_Search_Worker_Results = performSearch(index, documents, 'guide', 10, 1);

    if (results.length >= 2
      && results[0] !== undefined
    ) {
      const lastResultIndex: Tests_Lib_Search_Worker_LastResultIndex = results.length - 1;
      const lastResultItem: Tests_Lib_Search_Worker_LastResultItem = results[lastResultIndex];

      ok(lastResultItem !== undefined);

      const firstScore: Tests_Lib_Search_Worker_FirstScore = results[0]['score'];
      const lastScore: Tests_Lib_Search_Worker_LastScore = lastResultItem['score'];

      ok(firstScore >= lastScore);
    }

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Worker - PerformSearch Limit.
 *
 * @since 0.15.0
 */
describe('performSearch limit', async () => {
  it('caps results at the specified limit', () => {
    const testData: Tests_Lib_Search_Worker_TestData = buildTestIndex();
    const index: Tests_Lib_Search_Worker_PerformSearchLimit_CapsResultsAtTheSpecifiedLimit_Index = testData['index'];
    const documents: Tests_Lib_Search_Worker_Documents = testData['documents'];
    const results: Tests_Lib_Search_Worker_Results = performSearch(index, documents, 'guide', 1, 1);

    ok(results.length <= 1);

    return;
  });

  return;
});

/**
 * Tests - Lib - Search - Worker - PerformSearch Empty Query.
 *
 * @since 0.15.0
 */
describe('performSearch empty query', async () => {
  it('returns an empty array for an empty query', () => {
    const testData: Tests_Lib_Search_Worker_TestData = buildTestIndex();
    const index: Tests_Lib_Search_Worker_PerformSearchEmptyQuery_ReturnsAnEmptyArrayForAnEmptyQuery_Index = testData['index'];
    const documents: Tests_Lib_Search_Worker_Documents = testData['documents'];
    const results: Tests_Lib_Search_Worker_Results = performSearch(index, documents, '', 10, 1);

    deepStrictEqual(results, []);

    return;
  });

  return;
});
