import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';

import lunr from 'lunr';
import { describe, it } from 'vitest';

import { performSearch } from '../../../lib/search/perform-search.js';

import type {
  Tests_Lib_Search_Worker_BuildTestIndex_DocumentEntry,
  Tests_Lib_Search_Worker_BuildTestIndex_Documents,
  Tests_Lib_Search_Worker_BuildTestIndex_Index,
  Tests_Lib_Search_Worker_BuildTestIndex_Result,
  Tests_Lib_Search_Worker_BuildTestIndex_Returns,
  Tests_Lib_Search_Worker_DeduplicationDocuments,
  Tests_Lib_Search_Worker_DeduplicationHit,
  Tests_Lib_Search_Worker_DeduplicationIndex,
  Tests_Lib_Search_Worker_DeduplicationPaths,
  Tests_Lib_Search_Worker_DeduplicationResults,
  Tests_Lib_Search_Worker_DeduplicationUniquePaths,
  Tests_Lib_Search_Worker_EmptyQueryDocuments,
  Tests_Lib_Search_Worker_EmptyQueryIndex,
  Tests_Lib_Search_Worker_EmptyQueryResults,
  Tests_Lib_Search_Worker_ExactDocuments,
  Tests_Lib_Search_Worker_ExactFirstHit,
  Tests_Lib_Search_Worker_ExactIndex,
  Tests_Lib_Search_Worker_ExactResults,
  Tests_Lib_Search_Worker_FuzzyDocuments,
  Tests_Lib_Search_Worker_FuzzyIndex,
  Tests_Lib_Search_Worker_FuzzyResults,
  Tests_Lib_Search_Worker_LimitDocuments,
  Tests_Lib_Search_Worker_LimitIndex,
  Tests_Lib_Search_Worker_LimitResults,
  Tests_Lib_Search_Worker_ScoreSortingDocuments,
  Tests_Lib_Search_Worker_ScoreSortingFirstScore,
  Tests_Lib_Search_Worker_ScoreSortingIndex,
  Tests_Lib_Search_Worker_ScoreSortingLastResultIndex,
  Tests_Lib_Search_Worker_ScoreSortingLastResultItem,
  Tests_Lib_Search_Worker_ScoreSortingLastScore,
  Tests_Lib_Search_Worker_ScoreSortingResults,
  Tests_Lib_Search_Worker_WildcardDocuments,
  Tests_Lib_Search_Worker_WildcardIndex,
  Tests_Lib_Search_Worker_WildcardResults,
} from '../../../types/tests/lib/search/worker.test.d.ts';

/**
 * Tests - Lib - Search - Worker - Build Test Index.
 *
 * @returns Build test index.
 * @since 0.15.0
 */
function buildTestIndex(): Tests_Lib_Search_Worker_BuildTestIndex_Returns {
  const documents: Tests_Lib_Search_Worker_BuildTestIndex_Documents = [
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
      const document: Tests_Lib_Search_Worker_BuildTestIndex_DocumentEntry = documents[i];

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
    const testData: Tests_Lib_Search_Worker_BuildTestIndex_Result = buildTestIndex();
    const index: Tests_Lib_Search_Worker_ExactIndex = testData['index'];
    const documents: Tests_Lib_Search_Worker_ExactDocuments = testData['documents'];
    const results: Tests_Lib_Search_Worker_ExactResults = performSearch(index, documents, 'introduction', 10);

    ok(results.length > 0);

    const firstHit: Tests_Lib_Search_Worker_ExactFirstHit = results[0];

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
    const testData: Tests_Lib_Search_Worker_BuildTestIndex_Result = buildTestIndex();
    const index: Tests_Lib_Search_Worker_WildcardIndex = testData['index'];
    const documents: Tests_Lib_Search_Worker_WildcardDocuments = testData['documents'];
    const results: Tests_Lib_Search_Worker_WildcardResults = performSearch(index, documents, 'config', 10);

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
    const testData: Tests_Lib_Search_Worker_BuildTestIndex_Result = buildTestIndex();
    const index: Tests_Lib_Search_Worker_FuzzyIndex = testData['index'];
    const documents: Tests_Lib_Search_Worker_FuzzyDocuments = testData['documents'];
    const results: Tests_Lib_Search_Worker_FuzzyResults = performSearch(index, documents, 'tutoril', 10);

    ok(results.length > 0);

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
    const testData: Tests_Lib_Search_Worker_BuildTestIndex_Result = buildTestIndex();
    const index: Tests_Lib_Search_Worker_DeduplicationIndex = testData['index'];
    const documents: Tests_Lib_Search_Worker_DeduplicationDocuments = testData['documents'];
    const results: Tests_Lib_Search_Worker_DeduplicationResults = performSearch(index, documents, 'configuration', 10);
    const paths: Tests_Lib_Search_Worker_DeduplicationPaths = results.map((hit: Tests_Lib_Search_Worker_DeduplicationHit) => hit['path']);
    const uniquePaths: Tests_Lib_Search_Worker_DeduplicationUniquePaths = new Set(paths);

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
    const testData: Tests_Lib_Search_Worker_BuildTestIndex_Result = buildTestIndex();
    const index: Tests_Lib_Search_Worker_ScoreSortingIndex = testData['index'];
    const documents: Tests_Lib_Search_Worker_ScoreSortingDocuments = testData['documents'];
    const results: Tests_Lib_Search_Worker_ScoreSortingResults = performSearch(index, documents, 'guide', 10);

    if (results.length >= 2
      && results[0] !== undefined
    ) {
      const lastResultIndex: Tests_Lib_Search_Worker_ScoreSortingLastResultIndex = results.length - 1;
      const lastResultItem: Tests_Lib_Search_Worker_ScoreSortingLastResultItem = results[lastResultIndex];

      ok(lastResultItem !== undefined);

      const firstScore: Tests_Lib_Search_Worker_ScoreSortingFirstScore = results[0]['score'];
      const lastScore: Tests_Lib_Search_Worker_ScoreSortingLastScore = lastResultItem['score'];

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
    const testData: Tests_Lib_Search_Worker_BuildTestIndex_Result = buildTestIndex();
    const index: Tests_Lib_Search_Worker_LimitIndex = testData['index'];
    const documents: Tests_Lib_Search_Worker_LimitDocuments = testData['documents'];
    const results: Tests_Lib_Search_Worker_LimitResults = performSearch(index, documents, 'guide', 1);

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
    const testData: Tests_Lib_Search_Worker_BuildTestIndex_Result = buildTestIndex();
    const index: Tests_Lib_Search_Worker_EmptyQueryIndex = testData['index'];
    const documents: Tests_Lib_Search_Worker_EmptyQueryDocuments = testData['documents'];
    const results: Tests_Lib_Search_Worker_EmptyQueryResults = performSearch(index, documents, '', 10);

    deepStrictEqual(results, []);

    return;
  });

  return;
});
