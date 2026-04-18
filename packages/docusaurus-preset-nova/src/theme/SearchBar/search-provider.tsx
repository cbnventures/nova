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
  ThemeSearchBarSearchProviderSearchWorker,
  ThemeSearchBarSearchProviderSetActiveIndex,
  ThemeSearchBarSearchProviderSetIsOpen,
  ThemeSearchBarSearchProviderSetQuery,
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

  const isOpenState: ThemeSearchBarSearchProviderIsOpenState = useState<ThemeSearchBarSearchProviderIsOpen>(false);
  const isOpen: ThemeSearchBarSearchProviderIsOpen = isOpenState[0];
  const setIsOpen: ThemeSearchBarSearchProviderSetIsOpen = isOpenState[1];

  const activeIndexState: ThemeSearchBarSearchProviderActiveIndexState = useState<ThemeSearchBarSearchProviderActiveIndex>(-1);
  const activeIndex: ThemeSearchBarSearchProviderActiveIndex = activeIndexState[0];
  const setActiveIndex: ThemeSearchBarSearchProviderSetActiveIndex = activeIndexState[1];

  const inputRef: ThemeSearchBarSearchProviderInputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimerRef: ThemeSearchBarSearchProviderDebounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleQueryChange: ThemeSearchBarSearchProviderHandleQueryChangeFunction = useCallback((value: ThemeSearchBarSearchProviderHandleQueryChangeValue) => {
    setQuery(value);

    setActiveIndex(-1);

    if (debounceTimerRef.current !== undefined) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (value !== '') {
        searchWorker.search(value);

        setIsOpen(true);
      } else {
        setIsOpen(false);
      }

      return;
    }, 200);

    return;
  }, [searchWorker['search']]);

  // Dispatch pending query when the worker becomes ready.
  useEffect(() => {
    if (searchWorker['isReady'] === true && query !== '') {
      searchWorker.search(query);

      setIsOpen(true);
    }

    return;
  }, [searchWorker['isReady']]);

  const contextValue: ThemeSearchBarSearchProviderContextValue = {
    query,
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
