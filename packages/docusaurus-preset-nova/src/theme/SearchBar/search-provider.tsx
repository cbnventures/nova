import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useSearchWorker } from '../../lib/search/use-search-worker.js';

import { searchContext } from './search-context.js';

import type {
  Theme_SearchBar_SearchProvider_ActiveIndex,
  Theme_SearchBar_SearchProvider_ActiveIndexState,
  Theme_SearchBar_SearchProvider_BaseUrl,
  Theme_SearchBar_SearchProvider_ContextValue,
  Theme_SearchBar_SearchProvider_DebounceTimerRef,
  Theme_SearchBar_SearchProvider_DispatchedQueryRef,
  Theme_SearchBar_SearchProvider_DocusaurusContext,
  Theme_SearchBar_SearchProvider_HandleQueryChangeFunction,
  Theme_SearchBar_SearchProvider_HandleQueryChangeValue,
  Theme_SearchBar_SearchProvider_InputRef,
  Theme_SearchBar_SearchProvider_IsOpen,
  Theme_SearchBar_SearchProvider_IsOpenState,
  Theme_SearchBar_SearchProvider_ManifestUrl,
  Theme_SearchBar_SearchProvider_Props,
  Theme_SearchBar_SearchProvider_Props_Children,
  Theme_SearchBar_SearchProvider_Query,
  Theme_SearchBar_SearchProvider_QueryState,
  Theme_SearchBar_SearchProvider_SearchedQuery,
  Theme_SearchBar_SearchProvider_SearchedQueryState,
  Theme_SearchBar_SearchProvider_SearchWorker,
  Theme_SearchBar_SearchProvider_SetActiveIndex,
  Theme_SearchBar_SearchProvider_SetIsOpen,
  Theme_SearchBar_SearchProvider_SetQuery,
  Theme_SearchBar_SearchProvider_SetSearchedQuery,
  Theme_SearchBar_SearchProvider_WorkerUrl,
} from '../../types/theme/SearchBar/search-provider.d.ts';

/**
 * Theme - Search Bar - Search Provider - Search Provider.
 *
 * Initializes the search worker, owns shared search state, and
 * provides the context value consumed by SearchInput and
 * SearchResults through the React context tree.
 *
 * @param {Theme_SearchBar_SearchProvider_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchProvider(props: Theme_SearchBar_SearchProvider_Props) {
  const children: Theme_SearchBar_SearchProvider_Props_Children = props['children'];

  const docusaurusContext: Theme_SearchBar_SearchProvider_DocusaurusContext = useDocusaurusContext();
  const baseUrl: Theme_SearchBar_SearchProvider_BaseUrl = docusaurusContext['siteConfig']['baseUrl'];

  const workerUrl: Theme_SearchBar_SearchProvider_WorkerUrl = `${baseUrl}search-worker.js`;
  const manifestUrl: Theme_SearchBar_SearchProvider_ManifestUrl = `${baseUrl}search-manifest.json`;

  const searchWorker: Theme_SearchBar_SearchProvider_SearchWorker = useSearchWorker({
    workerUrl, manifestUrl,
  });

  const queryState: Theme_SearchBar_SearchProvider_QueryState = useState<Theme_SearchBar_SearchProvider_Query>('');
  const query: Theme_SearchBar_SearchProvider_Query = queryState[0];
  const setQuery: Theme_SearchBar_SearchProvider_SetQuery = queryState[1];

  const searchedQueryState: Theme_SearchBar_SearchProvider_SearchedQueryState = useState<Theme_SearchBar_SearchProvider_SearchedQuery>('');
  const searchedQuery: Theme_SearchBar_SearchProvider_SearchedQuery = searchedQueryState[0];
  const setSearchedQuery: Theme_SearchBar_SearchProvider_SetSearchedQuery = searchedQueryState[1];

  const isOpenState: Theme_SearchBar_SearchProvider_IsOpenState = useState<Theme_SearchBar_SearchProvider_IsOpen>(false);
  const isOpen: Theme_SearchBar_SearchProvider_IsOpen = isOpenState[0];
  const setIsOpen: Theme_SearchBar_SearchProvider_SetIsOpen = isOpenState[1];

  const activeIndexState: Theme_SearchBar_SearchProvider_ActiveIndexState = useState<Theme_SearchBar_SearchProvider_ActiveIndex>(-1);
  const activeIndex: Theme_SearchBar_SearchProvider_ActiveIndex = activeIndexState[0];
  const setActiveIndex: Theme_SearchBar_SearchProvider_SetActiveIndex = activeIndexState[1];

  const inputRef: Theme_SearchBar_SearchProvider_InputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimerRef: Theme_SearchBar_SearchProvider_DebounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dispatchedQueryRef: Theme_SearchBar_SearchProvider_DispatchedQueryRef = useRef<string>('');

  const handleQueryChange: Theme_SearchBar_SearchProvider_HandleQueryChangeFunction = useCallback((value: Theme_SearchBar_SearchProvider_HandleQueryChangeValue) => {
    setQuery(value);

    setActiveIndex(-1);

    if (debounceTimerRef.current !== undefined) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (value !== '') {
        dispatchedQueryRef.current = value;

        searchWorker.search(value);

        setIsOpen(true);
      } else {
        dispatchedQueryRef.current = '';

        setSearchedQuery('');

        setIsOpen(false);
      }

      return;
    }, 200);

    return;
  }, [searchWorker['search']]);

  // Dispatch pending query when the worker becomes ready.
  useEffect(() => {
    if (searchWorker['isReady'] === true && query !== '') {
      dispatchedQueryRef.current = query;

      searchWorker.search(query);

      setIsOpen(true);
    }

    return;
  }, [searchWorker['isReady']]);

  // Mark the dispatched query as searched only when the worker has actually
  // responded (results or error change). This is what hides the mobile menu
  // items + the "no results" message: both wait for a real worker response,
  // not just a debounce-fired dispatch. Skip the initial mount where results
  // is the empty-array default and no query has been dispatched yet.
  useEffect(() => {
    if (dispatchedQueryRef.current !== '') {
      setSearchedQuery(dispatchedQueryRef.current);
    }

    return;
  }, [
    searchWorker['results'],
    searchWorker['error'],
  ]);

  const contextValue: Theme_SearchBar_SearchProvider_ContextValue = {
    query,
    searchedQuery,
    results: searchWorker['results'],
    error: searchWorker['error'],
    isReady: searchWorker['isReady'],
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    handleQueryChange,
    inputRef,
  };

  return (
    <searchContext.Provider value={contextValue}>
      {children}
    </searchContext.Provider>
  );
}

export default SearchProvider;
