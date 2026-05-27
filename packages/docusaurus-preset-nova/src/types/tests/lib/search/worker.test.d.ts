import type {
  Shared_SearchWorkerSearchHit,
  Shared_SearchWorkerTestDocument,
} from '../../../shared.d.ts';

/**
 * Tests - Lib - Search - Worker - Build Test Index.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_BuildTestIndex_Returns = Tests_Lib_Search_Worker_BuildTestIndex_Result;

export type Tests_Lib_Search_Worker_BuildTestIndex_Documents = Shared_SearchWorkerTestDocument[];

export type Tests_Lib_Search_Worker_BuildTestIndex_Index = unknown;

export type Tests_Lib_Search_Worker_BuildTestIndex_DocumentEntry = Shared_SearchWorkerTestDocument | undefined;

export type Tests_Lib_Search_Worker_BuildTestIndex_Result_Index = unknown;

export type Tests_Lib_Search_Worker_BuildTestIndex_Result_Documents = Tests_Lib_Search_Worker_BuildTestIndex_Documents;

export type Tests_Lib_Search_Worker_BuildTestIndex_Result = {
  index: Tests_Lib_Search_Worker_BuildTestIndex_Result_Index;
  documents: Tests_Lib_Search_Worker_BuildTestIndex_Result_Documents;
};

/**
 * Tests - Lib - Search - Worker - PerformSearch Deduplication.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_DeduplicationIndex = unknown;

export type Tests_Lib_Search_Worker_DeduplicationDocuments = Shared_SearchWorkerTestDocument[];

export type Tests_Lib_Search_Worker_DeduplicationResults = Shared_SearchWorkerSearchHit[];

export type Tests_Lib_Search_Worker_DeduplicationPaths = string[];

export type Tests_Lib_Search_Worker_DeduplicationHit = Shared_SearchWorkerSearchHit;

export type Tests_Lib_Search_Worker_DeduplicationUniquePaths = Set<string>;

/**
 * Tests - Lib - Search - Worker - PerformSearch Empty Query.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_EmptyQueryIndex = unknown;

export type Tests_Lib_Search_Worker_EmptyQueryDocuments = Shared_SearchWorkerTestDocument[];

export type Tests_Lib_Search_Worker_EmptyQueryResults = Shared_SearchWorkerSearchHit[];

/**
 * Tests - Lib - Search - Worker - PerformSearch Exact.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_ExactIndex = unknown;

export type Tests_Lib_Search_Worker_ExactDocuments = Shared_SearchWorkerTestDocument[];

export type Tests_Lib_Search_Worker_ExactResults = Shared_SearchWorkerSearchHit[];

export type Tests_Lib_Search_Worker_ExactFirstHit = Shared_SearchWorkerSearchHit | undefined;

/**
 * Tests - Lib - Search - Worker - PerformSearch Fuzzy.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_FuzzyIndex = unknown;

export type Tests_Lib_Search_Worker_FuzzyDocuments = Shared_SearchWorkerTestDocument[];

export type Tests_Lib_Search_Worker_FuzzyResults = Shared_SearchWorkerSearchHit[];

/**
 * Tests - Lib - Search - Worker - PerformSearch Limit.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_LimitIndex = unknown;

export type Tests_Lib_Search_Worker_LimitDocuments = Shared_SearchWorkerTestDocument[];

export type Tests_Lib_Search_Worker_LimitResults = Shared_SearchWorkerSearchHit[];

/**
 * Tests - Lib - Search - Worker - PerformSearch Score Sorting.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_ScoreSortingIndex = unknown;

export type Tests_Lib_Search_Worker_ScoreSortingDocuments = Shared_SearchWorkerTestDocument[];

export type Tests_Lib_Search_Worker_ScoreSortingResults = Shared_SearchWorkerSearchHit[];

export type Tests_Lib_Search_Worker_ScoreSortingLastResultIndex = number;

export type Tests_Lib_Search_Worker_ScoreSortingLastResultItem = Shared_SearchWorkerSearchHit | undefined;

export type Tests_Lib_Search_Worker_ScoreSortingFirstScore = number;

export type Tests_Lib_Search_Worker_ScoreSortingLastScore = number;

/**
 * Tests - Lib - Search - Worker - PerformSearch Wildcard.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_WildcardIndex = unknown;

export type Tests_Lib_Search_Worker_WildcardDocuments = Shared_SearchWorkerTestDocument[];

export type Tests_Lib_Search_Worker_WildcardResults = Shared_SearchWorkerSearchHit[];
