import type {
  SharedSearchWorkerSearchHit,
  SharedSearchWorkerTestDocument,
} from '../../../shared.d.ts';

/**
 * Tests - Lib - Search - Worker - Build Test Index.
 *
 * @since 0.15.0
 */
export type TestsLibSearchWorkerBuildTestIndexReturns = TestsLibSearchWorkerBuildTestIndexResult;

export type TestsLibSearchWorkerBuildTestIndexDocuments = SharedSearchWorkerTestDocument[];

export type TestsLibSearchWorkerBuildTestIndexIndex = unknown;

export type TestsLibSearchWorkerBuildTestIndexDocumentEntry = SharedSearchWorkerTestDocument | undefined;

export type TestsLibSearchWorkerBuildTestIndexResultIndex = unknown;

export type TestsLibSearchWorkerBuildTestIndexResultDocuments = TestsLibSearchWorkerBuildTestIndexDocuments;

export type TestsLibSearchWorkerBuildTestIndexResult = {
  index: TestsLibSearchWorkerBuildTestIndexResultIndex;
  documents: TestsLibSearchWorkerBuildTestIndexResultDocuments;
};

/**
 * Tests - Lib - Search - Worker - PerformSearch Deduplication.
 *
 * @since 0.15.0
 */
export type TestsLibSearchWorkerDeduplicationIndex = unknown;

export type TestsLibSearchWorkerDeduplicationDocuments = SharedSearchWorkerTestDocument[];

export type TestsLibSearchWorkerDeduplicationResults = SharedSearchWorkerSearchHit[];

export type TestsLibSearchWorkerDeduplicationPaths = string[];

export type TestsLibSearchWorkerDeduplicationHit = SharedSearchWorkerSearchHit;

export type TestsLibSearchWorkerDeduplicationUniquePaths = Set<string>;

/**
 * Tests - Lib - Search - Worker - PerformSearch Empty Query.
 *
 * @since 0.15.0
 */
export type TestsLibSearchWorkerEmptyQueryIndex = unknown;

export type TestsLibSearchWorkerEmptyQueryDocuments = SharedSearchWorkerTestDocument[];

export type TestsLibSearchWorkerEmptyQueryResults = SharedSearchWorkerSearchHit[];

/**
 * Tests - Lib - Search - Worker - PerformSearch Exact.
 *
 * @since 0.15.0
 */
export type TestsLibSearchWorkerExactIndex = unknown;

export type TestsLibSearchWorkerExactDocuments = SharedSearchWorkerTestDocument[];

export type TestsLibSearchWorkerExactResults = SharedSearchWorkerSearchHit[];

export type TestsLibSearchWorkerExactFirstHit = SharedSearchWorkerSearchHit | undefined;

/**
 * Tests - Lib - Search - Worker - PerformSearch Fuzzy.
 *
 * @since 0.15.0
 */
export type TestsLibSearchWorkerFuzzyIndex = unknown;

export type TestsLibSearchWorkerFuzzyDocuments = SharedSearchWorkerTestDocument[];

export type TestsLibSearchWorkerFuzzyResults = SharedSearchWorkerSearchHit[];

/**
 * Tests - Lib - Search - Worker - PerformSearch Limit.
 *
 * @since 0.15.0
 */
export type TestsLibSearchWorkerLimitIndex = unknown;

export type TestsLibSearchWorkerLimitDocuments = SharedSearchWorkerTestDocument[];

export type TestsLibSearchWorkerLimitResults = SharedSearchWorkerSearchHit[];

/**
 * Tests - Lib - Search - Worker - PerformSearch Score Sorting.
 *
 * @since 0.15.0
 */
export type TestsLibSearchWorkerScoreSortingIndex = unknown;

export type TestsLibSearchWorkerScoreSortingDocuments = SharedSearchWorkerTestDocument[];

export type TestsLibSearchWorkerScoreSortingResults = SharedSearchWorkerSearchHit[];

export type TestsLibSearchWorkerScoreSortingLastResultIndex = number;

export type TestsLibSearchWorkerScoreSortingLastResultItem = SharedSearchWorkerSearchHit | undefined;

export type TestsLibSearchWorkerScoreSortingFirstScore = number;

export type TestsLibSearchWorkerScoreSortingLastScore = number;

/**
 * Tests - Lib - Search - Worker - PerformSearch Wildcard.
 *
 * @since 0.15.0
 */
export type TestsLibSearchWorkerWildcardIndex = unknown;

export type TestsLibSearchWorkerWildcardDocuments = SharedSearchWorkerTestDocument[];

export type TestsLibSearchWorkerWildcardResults = SharedSearchWorkerSearchHit[];
