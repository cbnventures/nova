import type { Dispatch, SetStateAction } from 'react';

/**
 * Theme - Search Bar - Search Provider - Search Provider.
 *
 * @since 0.15.0
 */
export type Theme_SearchBar_SearchProvider_Props_Children = React.ReactNode;

export type Theme_SearchBar_SearchProvider_Props = {
  children: Theme_SearchBar_SearchProvider_Props_Children;
};

export type Theme_SearchBar_SearchProvider_SearchProvider_Returns = React.JSX.Element;

export type Theme_SearchBar_SearchProvider_DocusaurusContext = ReturnType<typeof import('@docusaurus/useDocusaurusContext').default>;

export type Theme_SearchBar_SearchProvider_BaseUrl = string;

export type Theme_SearchBar_SearchProvider_WorkerUrl = string;

export type Theme_SearchBar_SearchProvider_ManifestUrl = string;

export type Theme_SearchBar_SearchProvider_SearchWorker = import('../../lib/search/use-search-worker.d.ts').Lib_Search_UseSearchWorker_Returns;

export type Theme_SearchBar_SearchProvider_QueryState = [Theme_SearchBar_SearchProvider_Query, Theme_SearchBar_SearchProvider_SetQuery];

export type Theme_SearchBar_SearchProvider_Query = string;

export type Theme_SearchBar_SearchProvider_SetQuery = Dispatch<SetStateAction<Theme_SearchBar_SearchProvider_Query>>;

export type Theme_SearchBar_SearchProvider_SearchedQueryState = [Theme_SearchBar_SearchProvider_SearchedQuery, Theme_SearchBar_SearchProvider_SetSearchedQuery];

export type Theme_SearchBar_SearchProvider_SearchedQuery = string;

export type Theme_SearchBar_SearchProvider_SetSearchedQuery = Dispatch<SetStateAction<Theme_SearchBar_SearchProvider_SearchedQuery>>;

export type Theme_SearchBar_SearchProvider_IsOpenState = [Theme_SearchBar_SearchProvider_IsOpen, Theme_SearchBar_SearchProvider_SetIsOpen];

export type Theme_SearchBar_SearchProvider_IsOpen = boolean;

export type Theme_SearchBar_SearchProvider_SetIsOpen = Dispatch<SetStateAction<Theme_SearchBar_SearchProvider_IsOpen>>;

export type Theme_SearchBar_SearchProvider_ActiveIndexState = [Theme_SearchBar_SearchProvider_ActiveIndex, Theme_SearchBar_SearchProvider_SetActiveIndex];

export type Theme_SearchBar_SearchProvider_ActiveIndex = number;

export type Theme_SearchBar_SearchProvider_SetActiveIndex = Dispatch<SetStateAction<Theme_SearchBar_SearchProvider_ActiveIndex>>;

export type Theme_SearchBar_SearchProvider_InputRef = React.RefObject<HTMLInputElement | null>;

export type Theme_SearchBar_SearchProvider_DebounceTimerRef = React.RefObject<ReturnType<typeof setTimeout> | undefined>;

export type Theme_SearchBar_SearchProvider_DispatchedQueryRef = React.RefObject<string>;

export type Theme_SearchBar_SearchProvider_HandleQueryChangeFunction = (value: Theme_SearchBar_SearchProvider_HandleQueryChangeValue) => void;

export type Theme_SearchBar_SearchProvider_HandleQueryChangeValue = string;

export type Theme_SearchBar_SearchProvider_ContextValue = import('./search-context.d.ts').Theme_SearchBar_SearchContext_Value;
