import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { useCallback, useEffect, useRef } from 'react';

import { useSearchContext } from './search-context.js';

import type {
  ThemeSearchBarSearchResultsActiveClassName,
  ThemeSearchBarSearchResultsActiveIndex,
  ThemeSearchBarSearchResultsDropdownRef,
  ThemeSearchBarSearchResultsError,
  ThemeSearchBarSearchResultsHandleClickOutsideFunction,
  ThemeSearchBarSearchResultsInputRef,
  ThemeSearchBarSearchResultsIsInsideMobileMenu,
  ThemeSearchBarSearchResultsIsOpen,
  ThemeSearchBarSearchResultsIsOutsideDropdown,
  ThemeSearchBarSearchResultsIsOutsideInput,
  ThemeSearchBarSearchResultsIsReady,
  ThemeSearchBarSearchResultsLoading,
  ThemeSearchBarSearchResultsMouseEvent,
  ThemeSearchBarSearchResultsMouseTarget,
  ThemeSearchBarSearchResultsNoResults,
  ThemeSearchBarSearchResultsProps,
  ThemeSearchBarSearchResultsQuery,
  ThemeSearchBarSearchResultsResultCount,
  ThemeSearchBarSearchResultsResultIndex,
  ThemeSearchBarSearchResultsResultItem,
  ThemeSearchBarSearchResultsResults,
  ThemeSearchBarSearchResultsResultsFound,
  ThemeSearchBarSearchResultsResultUrl,
  ThemeSearchBarSearchResultsSearchContext,
  ThemeSearchBarSearchResultsSetIsOpen,
  ThemeSearchBarSearchResultsSnippetSegment,
  ThemeSearchBarSearchResultsSnippetSegmentIndex,
} from '../../types/theme/SearchBar/search-results.d.ts';

/**
 * Theme - Search Bar - Search Results - Search Results.
 *
 * Renders the search results dropdown panel with result links,
 * empty state, and error state, closing automatically when
 * the user clicks outside the panel or the input field.
 *
 * @param {ThemeSearchBarSearchResultsProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchResults(_props: ThemeSearchBarSearchResultsProps) {
  const searchContext: ThemeSearchBarSearchResultsSearchContext = useSearchContext();
  const isOpen: ThemeSearchBarSearchResultsIsOpen = searchContext['isOpen'];
  const results: ThemeSearchBarSearchResultsResults = searchContext['results'];
  const error: ThemeSearchBarSearchResultsError = searchContext['error'];
  const isReady: ThemeSearchBarSearchResultsIsReady = searchContext['isReady'];
  const query: ThemeSearchBarSearchResultsQuery = searchContext['query'];
  const activeIndex: ThemeSearchBarSearchResultsActiveIndex = searchContext['activeIndex'];
  const setIsOpen: ThemeSearchBarSearchResultsSetIsOpen = searchContext['setIsOpen'];
  const inputRef: ThemeSearchBarSearchResultsInputRef = searchContext['inputRef'];

  const dropdownRef: ThemeSearchBarSearchResultsDropdownRef = useRef<HTMLDivElement | null>(null);

  // Click outside to close dropdown.
  const handleClickOutside: ThemeSearchBarSearchResultsHandleClickOutsideFunction = useCallback((event: ThemeSearchBarSearchResultsMouseEvent) => {
    const mouseTarget: ThemeSearchBarSearchResultsMouseTarget = event.target as ThemeSearchBarSearchResultsMouseTarget;
    const isOutsideDropdown: ThemeSearchBarSearchResultsIsOutsideDropdown = (dropdownRef.current !== null) ? (dropdownRef.current.contains(mouseTarget) === false) : true;
    const isOutsideInput: ThemeSearchBarSearchResultsIsOutsideInput = (inputRef.current !== null) ? (inputRef.current.contains(mouseTarget) === false) : true;

    // Skip click-outside on mobile — results should stay until query is cleared or menu is closed.
    const isInsideMobileMenu: ThemeSearchBarSearchResultsIsInsideMobileMenu = (dropdownRef.current !== null) ? dropdownRef.current.closest('.nova-mobile-menu-panel') !== null : false;

    if (isInsideMobileMenu === true) {
      return;
    }

    if (isOutsideDropdown === true && isOutsideInput === true) {
      setIsOpen(false);
    }

    return;
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

      return;
    };
  }, []);

  const loading: ThemeSearchBarSearchResultsLoading = translate({
    id: 'theme.SearchBar.loading',
    message: 'Loading search index\u2026',
    description: 'The message displayed while the search index is being loaded',
  });
  const noResults: ThemeSearchBarSearchResultsNoResults = translate({
    id: 'theme.SearchBar.noResults',
    message: 'No results found.',
    description: 'The message displayed when a search query returns no results',
  });

  const resultCount: ThemeSearchBarSearchResultsResultCount = results.length;
  const resultsFound: ThemeSearchBarSearchResultsResultsFound = translate(
    {
      id: 'theme.SearchBar.resultsFound',
      message: '{count} results found',
      description: 'The screen reader announcement when search results are found',
    },
    {
      count: String(resultCount),
    },
  );
  if (isOpen === false) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className="nova-search-dropdown"
      id="nova-search-results"
      role="listbox"
    >
      {(results.length > 0) && (
        <div
          className="nova-search-count"
          role="status"
          aria-live="polite"
        >
          {resultsFound}
        </div>
      )}
      {(results.length > 0) && (
        results.map((resultItem: ThemeSearchBarSearchResultsResultItem, resultIndex: ThemeSearchBarSearchResultsResultIndex) => {
          const resultUrl: ThemeSearchBarSearchResultsResultUrl = `${resultItem['path']}?_highlight=${encodeURIComponent(query)}`;
          const activeClassName: ThemeSearchBarSearchResultsActiveClassName = (resultIndex === activeIndex) ? ' nova-search-result--active' : '';

          return (
            <a
              key={resultItem['path']}
              id={`nova-search-result-${String(resultIndex)}`}
              className={`nova-search-result${activeClassName}`}
              href={resultUrl}
              role="option"
              aria-selected={resultIndex === activeIndex}
            >
              <span className="nova-search-result-title">{resultItem['title']}</span>
              <span className="nova-search-result-snippet">
                {resultItem['snippetSegments'].map((segment: ThemeSearchBarSearchResultsSnippetSegment, segmentIndex: ThemeSearchBarSearchResultsSnippetSegmentIndex) => {
                  if (segment['highlight'] === true) {
                    return (
                      <span
                        key={segmentIndex}
                        className="nova-search-result-highlight"
                      >
                        {segment['text']}
                      </span>
                    );
                  }

                  return segment['text'];
                })}
              </span>
            </a>
          );
        })
      )}
      {(error !== undefined) && (
        <div className="nova-search-empty">
          <Icon icon="lucide:alert-circle" width="14" height="14" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      {(
        isReady === false
        && query !== ''
      ) && (
        <div className="nova-search-empty">
          <Icon icon="lucide:loader" width="14" height="14" aria-hidden="true" />
          <span>{loading}</span>
        </div>
      )}
      {(
        isReady === true
        && results.length === 0
        && error === undefined
        && query !== ''
      ) && (
        <div className="nova-search-empty">
          <Icon icon="lucide:search-x" width="14" height="14" aria-hidden="true" />
          <span>{noResults}</span>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
