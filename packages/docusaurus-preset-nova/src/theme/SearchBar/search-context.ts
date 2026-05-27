import { createContext, useContext } from 'react';

import type {
  Theme_SearchBar_SearchContext_Context,
  Theme_SearchBar_SearchContext_MaybeValue,
  Theme_SearchBar_SearchContext_Returns,
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
const searchContext: Theme_SearchBar_SearchContext_Context = createContext<Theme_SearchBar_SearchContext_MaybeValue>(undefined);

/**
 * Theme - Search Bar - Search Context - Use Search Context.
 *
 * Retrieves the search context value from the nearest SearchProvider
 * ancestor, throwing an error if called outside the provider boundary
 * to surface integration mistakes during development.
 *
 * @returns {Theme_SearchBar_SearchContext_Returns}
 *
 * @since 0.15.0
 */
export function useSearchContext(): Theme_SearchBar_SearchContext_Returns {
  const context: Theme_SearchBar_SearchContext_MaybeValue = useContext(searchContext);

  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }

  return context;
}

export { searchContext };
