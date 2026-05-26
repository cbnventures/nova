import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useSearchWorker } from '../../lib/search/use-search-worker.js';

import { searchContext } from './search-context.js';

import type {
  ThemeSearchBarSearchProviderActiveIndex,
  ThemeSearchBarSearchProviderActiveIndexState,
  ThemeSearchBarSearchProviderBaseUrl,
  ThemeSearchBarSearchProviderContextValue,
  ThemeSearchBarSearchProviderDebounceTimerRef,
  ThemeSearchBarSearchProviderDispatchedQueryRef,
  ThemeSearchBarSearchProviderDocusaurusContext,
  ThemeSearchBarSearchProviderHandleQueryChangeFunction,
  ThemeSearchBarSearchProviderHandleQueryChangeValue,
  ThemeSearchBarSearchProviderInputRef,
  ThemeSearchBarSearchProviderIsOpen,
  ThemeSearchBarSearchProviderIsOpenState,
  ThemeSearchBarSearchProviderManifestUrl,
  ThemeSearchBarSearchProviderProps,
  ThemeSearchBarSearchProviderPropsChildren,
  ThemeSearchBarSearchProviderQuery,
  ThemeSearchBarSearchProviderQueryState,
  ThemeSearchBarSearchProviderSearchedQuery,
  ThemeSearchBarSearchProviderSearchedQueryState,
  ThemeSearchBarSearchProviderSearchWorker,
  ThemeSearchBarSearchProviderSetActiveIndex,
  ThemeSearchBarSearchProviderSetIsOpen,
  ThemeSearchBarSearchProviderSetQuery,
  ThemeSearchBarSearchProviderSetSearchedQuery,
  ThemeSearchBarSearchProviderWorkerUrl,
} from '../../types/theme/SearchBar/search-provider.d.ts';

/**
 * Theme - Search Bar - Search Provider - Search Provider.
 *
 * Initializes the search worker, owns shared search state, and
 * provides the context value consumed by SearchInput and
 * SearchResults through the React context tree.
 *
 * @param {ThemeSearchBarSearchProviderProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchProvider(props: ThemeSearchBarSearchProviderProps) {
  const children: ThemeSearchBarSearchProviderPropsChildren = props['children'];

  const docusaurusContext: ThemeSearchBarSearchProviderDocusaurusContext = useDocusaurusContext();
  const baseUrl: ThemeSearchBarSearchProviderBaseUrl = docusaurusContext['siteConfig']['baseUrl'];

  const workerUrl: ThemeSearchBarSearchProviderWorkerUrl = `${baseUrl}search-worker.js`;
  const manifestUrl: ThemeSearchBarSearchProviderManifestUrl = `${baseUrl}search-manifest.json`;

  const searchWorker: ThemeSearchBarSearchProviderSearchWorker = useSearchWorker({
    workerUrl, manifestUrl,
  });

  const queryState: ThemeSearchBarSearchProviderQueryState = useState<ThemeSearchBarSearchProviderQuery>('');
  const query: ThemeSearchBarSearchProviderQuery = queryState[0];
  const setQuery: ThemeSearchBarSearchProviderSetQuery = queryState[1];

  const searchedQueryState: ThemeSearchBarSearchProviderSearchedQueryState = useState<ThemeSearchBarSearchProviderSearchedQuery>('');
  const searchedQuery: ThemeSearchBarSearchProviderSearchedQuery = searchedQueryState[0];
  const setSearchedQuery: ThemeSearchBarSearchProviderSetSearchedQuery = searchedQueryState[1];

  const isOpenState: ThemeSearchBarSearchProviderIsOpenState = useState<ThemeSearchBarSearchProviderIsOpen>(false);
  const isOpen: ThemeSearchBarSearchProviderIsOpen = isOpenState[0];
  const setIsOpen: ThemeSearchBarSearchProviderSetIsOpen = isOpenState[1];

  const activeIndexState: ThemeSearchBarSearchProviderActiveIndexState = useState<ThemeSearchBarSearchProviderActiveIndex>(-1);
  const activeIndex: ThemeSearchBarSearchProviderActiveIndex = activeIndexState[0];
  const setActiveIndex: ThemeSearchBarSearchProviderSetActiveIndex = activeIndexState[1];

  const inputRef: ThemeSearchBarSearchProviderInputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimerRef: ThemeSearchBarSearchProviderDebounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dispatchedQueryRef: ThemeSearchBarSearchProviderDispatchedQueryRef = useRef<string>('');

  const handleQueryChange: ThemeSearchBarSearchProviderHandleQueryChangeFunction = useCallback((value: ThemeSearchBarSearchProviderHandleQueryChangeValue) => {
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

  const contextValue: ThemeSearchBarSearchProviderContextValue = {
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
