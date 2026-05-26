import type { CSSProperties, Dispatch, SetStateAction } from 'react';

import type { SharedSearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Theme - Search Page - Search Page.
 *
 * @since 0.15.0
 */
export type ThemeSearchPageSearchPagePropsClassName = string | undefined;

export type ThemeSearchPageSearchPagePropsStyle = CSSProperties | undefined;

export type ThemeSearchPageSearchPageProps = {
  className?: ThemeSearchPageSearchPagePropsClassName;
  style?: ThemeSearchPageSearchPagePropsStyle;
  [key: string]: unknown;
};

export type ThemeSearchPageSearchPageDocusaurusContext = ReturnType<typeof import('@docusaurus/useDocusaurusContext').default>;

export type ThemeSearchPageSearchPageBaseUrl = string;

export type ThemeSearchPageSearchPageWorkerUrl = string;

export type ThemeSearchPageSearchPageManifestUrl = string;

export type ThemeSearchPageSearchPageSearchWorker = import('../../lib/search/use-search-worker.d.ts').LibSearchUseSearchWorkerReturns;

export type ThemeSearchPageSearchPageSearchParams = URLSearchParams;

export type ThemeSearchPageSearchPageInitialQuery = string;

export type ThemeSearchPageSearchPageQueryState = [ThemeSearchPageSearchPageQuery, ThemeSearchPageSearchPageSetQuery];

export type ThemeSearchPageSearchPageQuery = string;

export type ThemeSearchPageSearchPageSetQuery = Dispatch<SetStateAction<ThemeSearchPageSearchPageQuery>>;

export type ThemeSearchPageSearchPageSearchedQueryState = [ThemeSearchPageSearchPageSearchedQuery, ThemeSearchPageSearchPageSetSearchedQuery];

export type ThemeSearchPageSearchPageSearchedQuery = string;

export type ThemeSearchPageSearchPageSetSearchedQuery = Dispatch<SetStateAction<ThemeSearchPageSearchPageSearchedQuery>>;

export type ThemeSearchPageSearchPageDebounceTimerRef = React.RefObject<ReturnType<typeof setTimeout> | undefined>;

export type ThemeSearchPageSearchPageDispatchedQueryRef = React.RefObject<string>;

export type ThemeSearchPageSearchPageHandleInputChangeFunction = (event: ThemeSearchPageSearchPageInputChangeEvent) => void;

export type ThemeSearchPageSearchPageInputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type ThemeSearchPageSearchPageInputValue = string;

export type ThemeSearchPageSearchPageNewUrl = string;

export type ThemeSearchPageSearchPageTitle = string;

export type ThemeSearchPageSearchPageLoading = string;

export type ThemeSearchPageSearchPageNoResults = string;

export type ThemeSearchPageSearchPageSearching = string;

export type ThemeSearchPageSearchPageResultCount = number;

export type ThemeSearchPageSearchPageResultsFound = string;

export type ThemeSearchPageSearchPageResultItem = SharedSearchWorkerSearchHit;

export type ThemeSearchPageSearchPageResultUrl = string;

export type ThemeSearchPageSearchPageResultIndex = number;

export type ThemeSearchPageSearchPageSnippetSegment = SharedSearchWorkerSearchHit['snippetSegments'][number];

export type ThemeSearchPageSearchPageSnippetSegmentIndex = number;
