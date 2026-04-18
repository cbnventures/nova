import { createContext, useContext } from 'react';

import type {
  ThemeSearchBarSearchContextContext,
  ThemeSearchBarSearchContextMaybeValue,
  ThemeSearchBarSearchContextReturns,
} from '../../types/theme/SearchBar/search-context.d.ts';

/**
 * Theme - Search Bar - Search Context - Search Context.
 *
 * React context that holds the shared search state consumed by
 * SearchInput and SearchResults, created with an undefined default
 * to enforce provider boundaries at runtime.
 *
 * @since 0.15.0
 */
const searchContext: ThemeSearchBarSearchContextContext = createContext<ThemeSearchBarSearchContextMaybeValue>(undefined);

/**
 * Theme - Search Bar - Search Context - Use Search Context.
 *
 * Retrieves the search context value from the nearest SearchProvider
 * ancestor, throwing an error if called outside the provider boundary
 * to surface integration mistakes during development.
 *
 * @returns {ThemeSearchBarSearchContextReturns}
 *
 * @since 0.15.0
 */
export function useSearchContext(): ThemeSearchBarSearchContextReturns {
  const context: ThemeSearchBarSearchContextMaybeValue = useContext(searchContext);

  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }

  return context;
}

export { searchContext };
