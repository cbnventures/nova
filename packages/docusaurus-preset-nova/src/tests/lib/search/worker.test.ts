import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';

import lunr from 'lunr';
import { describe, it } from 'vitest';

import { performSearch } from '../../../lib/search/perform-search.js';

import type {
  TestsLibSearchWorkerBuildTestIndexDocumentEntry,
  TestsLibSearchWorkerBuildTestIndexDocuments,
  TestsLibSearchWorkerBuildTestIndexIndex,
  TestsLibSearchWorkerBuildTestIndexResult,
  TestsLibSearchWorkerBuildTestIndexReturns,
  TestsLibSearchWorkerDeduplicationDocuments,
  TestsLibSearchWorkerDeduplicationHit,
  TestsLibSearchWorkerDeduplicationIndex,
  TestsLibSearchWorkerDeduplicationPaths,
  TestsLibSearchWorkerDeduplicationResults,
  TestsLibSearchWorkerDeduplicationUniquePaths,
  TestsLibSearchWorkerEmptyQueryDocuments,
  TestsLibSearchWorkerEmptyQueryIndex,
  TestsLibSearchWorkerEmptyQueryResults,
  TestsLibSearchWorkerExactDocuments,
  TestsLibSearchWorkerExactFirstHit,
  TestsLibSearchWorkerExactIndex,
  TestsLibSearchWorkerExactResults,
  TestsLibSearchWorkerFuzzyDocuments,
  TestsLibSearchWorkerFuzzyIndex,
  TestsLibSearchWorkerFuzzyResults,
  TestsLibSearchWorkerLimitDocuments,
  TestsLibSearchWorkerLimitIndex,
  TestsLibSearchWorkerLimitResults,
  TestsLibSearchWorkerScoreSortingDocuments,
  TestsLibSearchWorkerScoreSortingFirstScore,
  TestsLibSearchWorkerScoreSortingIndex,
  TestsLibSearchWorkerScoreSortingLastResultIndex,
  TestsLibSearchWorkerScoreSortingLastResultItem,
  TestsLibSearchWorkerScoreSortingLastScore,
  TestsLibSearchWorkerScoreSortingResults,
  TestsLibSearchWorkerWildcardDocuments,
  TestsLibSearchWorkerWildcardIndex,
  TestsLibSearchWorkerWildcardResults,
} from '../../../types/tests/lib/search/worker.test.d.ts';

/**
 * Tests - Lib - Search - Worker - Build Test Index.
 *
 * @returns Build test index.
 * @since 0.15.0
 */
function buildTestIndex(): TestsLibSearchWorkerBuildTestIndexReturns {
  const documents: TestsLibSearchWorkerBuildTestIndexDocuments = [
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

  const index: TestsLibSearchWorkerBuildTestIndexIndex = lunr(function buildIndex() {
    this.ref('path');

    this.field('title');

    this.field('body');

    for (let i = 0; i < documents.length; i += 1) {
      const document: TestsLibSearchWorkerBuildTestIndexDocumentEntry = documents[i];

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
    const testData: TestsLibSearchWorkerBuildTestIndexResult = buildTestIndex();
    const index: TestsLibSearchWorkerExactIndex = testData['index'];
    const documents: TestsLibSearchWorkerExactDocuments = testData['documents'];
    const results: TestsLibSearchWorkerExactResults = performSearch(index, documents, 'introduction', 10);

    ok(results.length > 0);

    const firstHit: TestsLibSearchWorkerExactFirstHit = results[0];

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
    const testData: TestsLibSearchWorkerBuildTestIndexResult = buildTestIndex();
    const index: TestsLibSearchWorkerWildcardIndex = testData['index'];
    const documents: TestsLibSearchWorkerWildcardDocuments = testData['documents'];
    const results: TestsLibSearchWorkerWildcardResults = performSearch(index, documents, 'config', 10);

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
    const testData: TestsLibSearchWorkerBuildTestIndexResult = buildTestIndex();
    const index: TestsLibSearchWorkerFuzzyIndex = testData['index'];
    const documents: TestsLibSearchWorkerFuzzyDocuments = testData['documents'];
    const results: TestsLibSearchWorkerFuzzyResults = performSearch(index, documents, 'tutoril', 10);

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
    const testData: TestsLibSearchWorkerBuildTestIndexResult = buildTestIndex();
    const index: TestsLibSearchWorkerDeduplicationIndex = testData['index'];
    const documents: TestsLibSearchWorkerDeduplicationDocuments = testData['documents'];
    const results: TestsLibSearchWorkerDeduplicationResults = performSearch(index, documents, 'configuration', 10);
    const paths: TestsLibSearchWorkerDeduplicationPaths = results.map((hit: TestsLibSearchWorkerDeduplicationHit) => hit['path']);
    const uniquePaths: TestsLibSearchWorkerDeduplicationUniquePaths = new Set(paths);

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
    const testData: TestsLibSearchWorkerBuildTestIndexResult = buildTestIndex();
    const index: TestsLibSearchWorkerScoreSortingIndex = testData['index'];
    const documents: TestsLibSearchWorkerScoreSortingDocuments = testData['documents'];
    const results: TestsLibSearchWorkerScoreSortingResults = performSearch(index, documents, 'guide', 10);

    if (results.length >= 2
      && results[0] !== undefined
    ) {
      const lastResultIndex: TestsLibSearchWorkerScoreSortingLastResultIndex = results.length - 1;
      const lastResultItem: TestsLibSearchWorkerScoreSortingLastResultItem = results[lastResultIndex];

      ok(lastResultItem !== undefined);

      const firstScore: TestsLibSearchWorkerScoreSortingFirstScore = results[0]['score'];
      const lastScore: TestsLibSearchWorkerScoreSortingLastScore = lastResultItem['score'];

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
    const testData: TestsLibSearchWorkerBuildTestIndexResult = buildTestIndex();
    const index: TestsLibSearchWorkerLimitIndex = testData['index'];
    const documents: TestsLibSearchWorkerLimitDocuments = testData['documents'];
    const results: TestsLibSearchWorkerLimitResults = performSearch(index, documents, 'guide', 1);

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
    const testData: TestsLibSearchWorkerBuildTestIndexResult = buildTestIndex();
    const index: TestsLibSearchWorkerEmptyQueryIndex = testData['index'];
    const documents: TestsLibSearchWorkerEmptyQueryDocuments = testData['documents'];
    const results: TestsLibSearchWorkerEmptyQueryResults = performSearch(index, documents, '', 10);

    deepStrictEqual(results, []);

    return;
  });

  return;
});
