import type { CSSProperties, Dispatch, SetStateAction } from 'react';

import type { Shared_SearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Theme - Search Page - Search Page.
 *
 * @since 0.15.0
 */
export type Theme_SearchPage_Index_SearchPage_Props_ClassName = string | undefined;

export type Theme_SearchPage_Index_SearchPage_Props_Style = CSSProperties | undefined;

export type Theme_SearchPage_Index_SearchPage_Props = {
  className?: Theme_SearchPage_Index_SearchPage_Props_ClassName;
  style?: Theme_SearchPage_Index_SearchPage_Props_Style;
  [key: string]: unknown;
};

export type Theme_SearchPage_Index_SearchPage_DocusaurusContext = ReturnType<typeof import('@docusaurus/useDocusaurusContext').default>;

export type Theme_SearchPage_Index_SearchPage_BaseUrl = string;

export type Theme_SearchPage_Index_SearchPage_WorkerUrl = string;

export type Theme_SearchPage_Index_SearchPage_ManifestUrl = string;

export type Theme_SearchPage_Index_SearchPage_PluginData_Search_SearchResultLimits = number;

export type Theme_SearchPage_Index_SearchPage_PluginData_Search_FuzzyMatchingDistance = number;

export type Theme_SearchPage_Index_SearchPage_PluginData_Search_HighlightSearchTermsOnTargetPage = boolean;

export type Theme_SearchPage_Index_SearchPage_PluginData_Search = {
  searchResultLimits?: Theme_SearchPage_Index_SearchPage_PluginData_Search_SearchResultLimits;
  fuzzyMatchingDistance?: Theme_SearchPage_Index_SearchPage_PluginData_Search_FuzzyMatchingDistance;
  highlightSearchTermsOnTargetPage?: Theme_SearchPage_Index_SearchPage_PluginData_Search_HighlightSearchTermsOnTargetPage;
} | undefined;

export type Theme_SearchPage_Index_SearchPage_PluginData = {
  search?: Theme_SearchPage_Index_SearchPage_PluginData_Search;
  [key: string]: unknown;
};

export type Theme_SearchPage_Index_SearchPage_SearchSettings = Theme_SearchPage_Index_SearchPage_PluginData_Search;

export type Theme_SearchPage_Index_SearchPage_SearchResultLimits = number;

export type Theme_SearchPage_Index_SearchPage_FuzzyMatchingDistance = number;

export type Theme_SearchPage_Index_SearchPage_HighlightSearchTerms = boolean;

export type Theme_SearchPage_Index_SearchPage_SearchWorker = import('../../lib/search/use-search-worker.d.ts').Lib_Search_UseSearchWorker_Returns;

export type Theme_SearchPage_Index_SearchPage_SearchParams = URLSearchParams;

export type Theme_SearchPage_Index_SearchPage_InitialQuery = string;

export type Theme_SearchPage_Index_SearchPage_QueryState = [Theme_SearchPage_Index_SearchPage_Query, Theme_SearchPage_Index_SearchPage_SetQuery];

export type Theme_SearchPage_Index_SearchPage_Query = string;

export type Theme_SearchPage_Index_SearchPage_SetQuery = Dispatch<SetStateAction<Theme_SearchPage_Index_SearchPage_Query>>;

export type Theme_SearchPage_Index_SearchPage_SearchedQueryState = [Theme_SearchPage_Index_SearchPage_SearchedQuery, Theme_SearchPage_Index_SearchPage_SetSearchedQuery];

export type Theme_SearchPage_Index_SearchPage_SearchedQuery = string;

export type Theme_SearchPage_Index_SearchPage_SetSearchedQuery = Dispatch<SetStateAction<Theme_SearchPage_Index_SearchPage_SearchedQuery>>;

export type Theme_SearchPage_Index_SearchPage_DebounceTimerRef = React.RefObject<ReturnType<typeof setTimeout> | undefined>;

export type Theme_SearchPage_Index_SearchPage_DispatchedQueryRef = React.RefObject<string>;

export type Theme_SearchPage_Index_SearchPage_HandleInputChangeFunction = (event: Theme_SearchPage_Index_SearchPage_InputChangeEvent) => void;

export type Theme_SearchPage_Index_SearchPage_InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type Theme_SearchPage_Index_SearchPage_InputValue = string;

export type Theme_SearchPage_Index_SearchPage_NewUrl = string;

export type Theme_SearchPage_Index_SearchPage_Title = string;

export type Theme_SearchPage_Index_SearchPage_Loading = string;

export type Theme_SearchPage_Index_SearchPage_NoResults = string;

export type Theme_SearchPage_Index_SearchPage_Searching = string;

export type Theme_SearchPage_Index_SearchPage_ResultCount = number;

export type Theme_SearchPage_Index_SearchPage_ResultsFound = string;

export type Theme_SearchPage_Index_SearchPage_ResultItem = Shared_SearchWorkerSearchHit;

export type Theme_SearchPage_Index_SearchPage_ResultUrl = string;

export type Theme_SearchPage_Index_SearchPage_ResultIndex = number;

export type Theme_SearchPage_Index_SearchPage_SnippetSegment = Shared_SearchWorkerSearchHit['snippetSegments'][number];

export type Theme_SearchPage_Index_SearchPage_SnippetSegmentIndex = number;
