/**
 * Tests - Lib - Search - Worker.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_Document_Path = string;

export type Tests_Lib_Search_Worker_Document_Title = string;

export type Tests_Lib_Search_Worker_Document_Snippet = string;

export type Tests_Lib_Search_Worker_Document_Body = string;

export type Tests_Lib_Search_Worker_Document = {
  path: Tests_Lib_Search_Worker_Document_Path;
  title: Tests_Lib_Search_Worker_Document_Title;
  snippet: Tests_Lib_Search_Worker_Document_Snippet;
  body: Tests_Lib_Search_Worker_Document_Body;
};

export type Tests_Lib_Search_Worker_Documents = Tests_Lib_Search_Worker_Document[];

export type Tests_Lib_Search_Worker_Hit_Path = string;

export type Tests_Lib_Search_Worker_Hit_Title = string;

export type Tests_Lib_Search_Worker_Hit_Snippet = string;

export type Tests_Lib_Search_Worker_Hit_Score = number;

export type Tests_Lib_Search_Worker_Hit = {
  path: Tests_Lib_Search_Worker_Hit_Path;
  title: Tests_Lib_Search_Worker_Hit_Title;
  snippet: Tests_Lib_Search_Worker_Hit_Snippet;
  score: Tests_Lib_Search_Worker_Hit_Score;
};

export type Tests_Lib_Search_Worker_TestData_Index = unknown;

export type Tests_Lib_Search_Worker_TestData_Documents = Tests_Lib_Search_Worker_Documents;

export type Tests_Lib_Search_Worker_TestData = {
  index: Tests_Lib_Search_Worker_TestData_Index;
  documents: Tests_Lib_Search_Worker_TestData_Documents;
};

export type Tests_Lib_Search_Worker_Results = Tests_Lib_Search_Worker_Hit[];

export type Tests_Lib_Search_Worker_FirstHit = Tests_Lib_Search_Worker_Hit | undefined;

export type Tests_Lib_Search_Worker_NarrowResults = Tests_Lib_Search_Worker_Hit[];

export type Tests_Lib_Search_Worker_WiderResults = Tests_Lib_Search_Worker_Hit[];

export type Tests_Lib_Search_Worker_Paths = string[];

export type Tests_Lib_Search_Worker_UniquePaths = Set<string>;

export type Tests_Lib_Search_Worker_LastResultIndex = number;

export type Tests_Lib_Search_Worker_LastResultItem = Tests_Lib_Search_Worker_Hit | undefined;

export type Tests_Lib_Search_Worker_FirstScore = number;

export type Tests_Lib_Search_Worker_LastScore = number;

/**
 * Tests - Lib - Search - Worker - Build Test Index.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_BuildTestIndex_Returns_Index = unknown;

export type Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item_Path = string;

export type Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item_Title = string;

export type Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item_Snippet = string;

export type Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item_Body = string;

export type Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item = {
  path: Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item_Path;
  title: Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item_Title;
  snippet: Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item_Snippet;
  body: Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item_Body;
};

export type Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents = Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item[];

export type Tests_Lib_Search_Worker_BuildTestIndex_Returns = {
  index: Tests_Lib_Search_Worker_BuildTestIndex_Returns_Index;
  documents: Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents;
};

export type Tests_Lib_Search_Worker_BuildTestIndex_Index = unknown;

export type Tests_Lib_Search_Worker_BuildTestIndex_Document = Tests_Lib_Search_Worker_BuildTestIndex_Returns_Documents_Item | undefined;

/**
 * Tests - Lib - Search - Worker - Map Hit Path.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_MapHitPath_Hit_Path = string;

export type Tests_Lib_Search_Worker_MapHitPath_Hit = {
  path: Tests_Lib_Search_Worker_MapHitPath_Hit_Path;
};

export type Tests_Lib_Search_Worker_MapHitPath_Returns = string;

/**
 * Tests - Lib - Search - Worker - PerformSearch Deduplication - Returns Unique Paths With No Duplicates.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_PerformSearchDeduplication_ReturnsUniquePathsWithNoDuplicates_Index = unknown;

/**
 * Tests - Lib - Search - Worker - PerformSearch Empty Query - Returns An Empty Array For An Empty Query.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_PerformSearchEmptyQuery_ReturnsAnEmptyArrayForAnEmptyQuery_Index = unknown;

/**
 * Tests - Lib - Search - Worker - PerformSearch Exact - Returns Matching Documents For An Exact Query.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_PerformSearchExact_ReturnsMatchingDocumentsForAnExactQuery_Index = unknown;

/**
 * Tests - Lib - Search - Worker - PerformSearch Fuzzy - Matches Near Miss Queries Via Fuzzy Strategy.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_PerformSearchFuzzy_MatchesNearMissQueriesViaFuzzyStrategy_Index = unknown;

/**
 * Tests - Lib - Search - Worker - PerformSearch Fuzzy Distance - Widens Fuzzy Matching As The Distance Increases.
 *
 * @since 0.19.0
 */
export type Tests_Lib_Search_Worker_PerformSearchFuzzyDistance_WidensFuzzyMatchingAsTheDistanceIncreases_Index = unknown;

/**
 * Tests - Lib - Search - Worker - PerformSearch Limit - Caps Results At The Specified Limit.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_PerformSearchLimit_CapsResultsAtTheSpecifiedLimit_Index = unknown;

/**
 * Tests - Lib - Search - Worker - PerformSearch Score Sorting - Returns Results Sorted By Score Descending.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_PerformSearchScoreSorting_ReturnsResultsSortedByScoreDescending_Index = unknown;

/**
 * Tests - Lib - Search - Worker - PerformSearch Wildcard - Matches Prefix Queries Via Wildcard Strategy.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Search_Worker_PerformSearchWildcard_MatchesPrefixQueriesViaWildcardStrategy_Index = unknown;
