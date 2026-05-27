import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useSearchContext } from './search-context.js';

import type {
  Theme_SearchBar_SearchResults_ActiveClassName,
  Theme_SearchBar_SearchResults_ActiveIndex,
  Theme_SearchBar_SearchResults_AnimationEvent,
  Theme_SearchBar_SearchResults_AnimationFrameId,
  Theme_SearchBar_SearchResults_DropdownClassName,
  Theme_SearchBar_SearchResults_DropdownElement,
  Theme_SearchBar_SearchResults_DropdownRef,
  Theme_SearchBar_SearchResults_Error,
  Theme_SearchBar_SearchResults_HandleClickOutsideFunction,
  Theme_SearchBar_SearchResults_InputRef,
  Theme_SearchBar_SearchResults_IsClosing,
  Theme_SearchBar_SearchResults_IsClosingState,
  Theme_SearchBar_SearchResults_IsInMobileMenu,
  Theme_SearchBar_SearchResults_IsInsideMobileMenu,
  Theme_SearchBar_SearchResults_IsMounted,
  Theme_SearchBar_SearchResults_IsMountedState,
  Theme_SearchBar_SearchResults_IsOpen,
  Theme_SearchBar_SearchResults_IsOutsideDropdown,
  Theme_SearchBar_SearchResults_IsOutsideInput,
  Theme_SearchBar_SearchResults_IsReady,
  Theme_SearchBar_SearchResults_IsTransitionToClose,
  Theme_SearchBar_SearchResults_Loading,
  Theme_SearchBar_SearchResults_MouseEvent,
  Theme_SearchBar_SearchResults_MouseTarget,
  Theme_SearchBar_SearchResults_NoResults,
  Theme_SearchBar_SearchResults_Props,
  Theme_SearchBar_SearchResults_Query,
  Theme_SearchBar_SearchResults_ResultCount,
  Theme_SearchBar_SearchResults_ResultIndex,
  Theme_SearchBar_SearchResults_ResultItem,
  Theme_SearchBar_SearchResults_Results,
  Theme_SearchBar_SearchResults_ResultsFound,
  Theme_SearchBar_SearchResults_ResultUrl,
  Theme_SearchBar_SearchResults_SearchContext,
  Theme_SearchBar_SearchResults_SearchedQuery,
  Theme_SearchBar_SearchResults_Searching,
  Theme_SearchBar_SearchResults_SetIsClosing,
  Theme_SearchBar_SearchResults_SetIsMounted,
  Theme_SearchBar_SearchResults_SetIsOpen,
  Theme_SearchBar_SearchResults_SnippetSegment,
  Theme_SearchBar_SearchResults_SnippetSegmentIndex,
  Theme_SearchBar_SearchResults_Timer,
  Theme_SearchBar_SearchResults_TransitionEvent,
  Theme_SearchBar_SearchResults_WasOpenRef,
} from '../../types/theme/SearchBar/search-results.d.ts';

/**
 * Theme - Search Bar - Search Results - Search Results.
 *
 * Renders the search results dropdown panel with result links,
 * empty state, and error state, closing automatically when
 * the user clicks outside the panel or the input field.
 *
 * @param {Theme_SearchBar_SearchResults_Props} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchResults(_props: Theme_SearchBar_SearchResults_Props) {
  const searchContext: Theme_SearchBar_SearchResults_SearchContext = useSearchContext();
  const isOpen: Theme_SearchBar_SearchResults_IsOpen = searchContext['isOpen'];
  const results: Theme_SearchBar_SearchResults_Results = searchContext['results'];
  const error: Theme_SearchBar_SearchResults_Error = searchContext['error'];
  const isReady: Theme_SearchBar_SearchResults_IsReady = searchContext['isReady'];
  const query: Theme_SearchBar_SearchResults_Query = searchContext['query'];
  const searchedQuery: Theme_SearchBar_SearchResults_SearchedQuery = searchContext['searchedQuery'];
  const activeIndex: Theme_SearchBar_SearchResults_ActiveIndex = searchContext['activeIndex'];
  const setIsOpen: Theme_SearchBar_SearchResults_SetIsOpen = searchContext['setIsOpen'];
  const inputRef: Theme_SearchBar_SearchResults_InputRef = searchContext['inputRef'];

  const dropdownRef: Theme_SearchBar_SearchResults_DropdownRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef: Theme_SearchBar_SearchResults_WasOpenRef = useRef<boolean>(false);

  const isClosingState: Theme_SearchBar_SearchResults_IsClosingState = useState<Theme_SearchBar_SearchResults_IsClosing>(false);
  const isClosing: Theme_SearchBar_SearchResults_IsClosing = isClosingState[0];
  const setIsClosing: Theme_SearchBar_SearchResults_SetIsClosing = isClosingState[1];

  const isMountedState: Theme_SearchBar_SearchResults_IsMountedState = useState<Theme_SearchBar_SearchResults_IsMounted>(false);
  const isMounted: Theme_SearchBar_SearchResults_IsMounted = isMountedState[0];
  const setIsMounted: Theme_SearchBar_SearchResults_SetIsMounted = isMountedState[1];

  // Detect open -> close transition. Done during render (not in a useEffect)
  // so the same render that flips isOpen to false also keeps the dropdown
  // mounted with the closing class - otherwise React commits null first
  // (unmount), then the useEffect re-mounts with the closing class, which
  // produces a visible flash. The setIsClosing call below schedules a
  // re-render that picks up the real isClosing=true state.
  const isTransitionToClose: Theme_SearchBar_SearchResults_IsTransitionToClose = (
    wasOpenRef.current === true
    && isOpen === false
    && isClosing === false
  );

  if (isTransitionToClose === true) {
    setIsClosing(true);
  }

  // Detect close -> open transition while a close is still in flight. When the
  // user clears search and types again within the 1000ms swap-out animation,
  // the body's swap class flips from -out to -in and the dropdown's animation
  // switches from hide-at-mid to show-at-mid - which fires animationcancel,
  // not animationend, so the existing onAnimationEnd handler never gets to
  // call setIsClosing(false). The .closing class would then survive the
  // swap-in animation and hide the dropdown the moment the swap class is
  // stripped on swap-in's animationend.
  if (isOpen === true && isClosing === true) {
    setIsClosing(false);
  }

  // Reset isMounted on each isOpen false -> true transition so the mounting
  // class fires on EVERY dropdown appearance, not just the first one.
  // SearchResults stays mounted across searches (only its dropdown div mounts
  // and unmounts), so the [] useEffect that sets isMounted=true never re-runs
  // after the first open without this manual reset.
  if (
    wasOpenRef.current === false
    && isOpen === true
    && isMounted === true
  ) {
    setIsMounted(false);
  }

  wasOpenRef.current = isOpen;

  // Click outside to close dropdown.
  const handleClickOutside: Theme_SearchBar_SearchResults_HandleClickOutsideFunction = useCallback((event: Theme_SearchBar_SearchResults_MouseEvent) => {
    const mouseTarget: Theme_SearchBar_SearchResults_MouseTarget = event.target as Theme_SearchBar_SearchResults_MouseTarget;
    const isOutsideDropdown: Theme_SearchBar_SearchResults_IsOutsideDropdown = (dropdownRef.current !== null) ? (dropdownRef.current.contains(mouseTarget) === false) : true;
    const isOutsideInput: Theme_SearchBar_SearchResults_IsOutsideInput = (inputRef.current !== null) ? (inputRef.current.contains(mouseTarget) === false) : true;

    // Skip click-outside on mobile - results should stay until query is cleared or menu is closed.
    const isInsideMobileMenu: Theme_SearchBar_SearchResults_IsInsideMobileMenu = (dropdownRef.current !== null) ? dropdownRef.current.closest('.nova-mobile-menu-panel') !== null : false;

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

  // Prod-safe mount transition trigger. cssnano strips @starting-style from
  // the prod CSS bundle, so the dropdown's CSS-only mount transition never
  // fires - it pops in at the visible target before the body keyframe gets a
  // chance to clip it. This effect attaches the .nova-search-dropdown-mounting
  // class for one frame (initial render via the className below), then clears
  // it on the next requestAnimationFrame. The cascade switches from the
  // mounting rule (hidden) to the swap-in/has rule (visible), and the
  // transition fires from hidden to visible like @starting-style would have.
  // The [isOpen] dep ensures the effect re-fires on every dropdown opening,
  // not just the first - SearchResults persists across searches but the
  // dropdown DOM only mounts when isOpen flips true.
  useEffect(() => {
    if (isOpen === false) {
      return;
    }

    const id: Theme_SearchBar_SearchResults_AnimationFrameId = requestAnimationFrame(() => {
      setIsMounted(true);

      return;
    });

    return () => {
      cancelAnimationFrame(id);

      return;
    };
  }, [isOpen]);

  // Fallback unmount timer for the mobile menu close. The onTransitionEnd
  // handler below is the preferred path, but with rapid type/clear flips the
  // dropdown's max-height transition can be cancelled and re-applied with the
  // same target value (steps(2, jump-none) holds at the start value for the
  // first half of the cycle, so flips faster than 500ms never produce a value
  // change), in which case transitionend never fires and the dropdown stays
  // mounted with .closing forever. This timer guarantees unmount 1050ms after
  // isClosing flips true. If the user re-opens before then, the reopen check
  // in render flips isClosing back to false and the cleanup cancels the timer.
  useEffect(() => {
    if (isClosing === false) {
      return;
    }

    if (dropdownRef.current === null) {
      return;
    }

    const isInMobileMenu: Theme_SearchBar_SearchResults_IsInMobileMenu = dropdownRef.current.closest('.nova-mobile-menu-panel') !== null;

    if (isInMobileMenu === false) {
      return;
    }

    const timer: Theme_SearchBar_SearchResults_Timer = setTimeout(() => {
      setIsClosing(false);

      return;
    }, 1050);

    return () => {
      clearTimeout(timer);

      return;
    };
  }, [isClosing]);

  const loading: Theme_SearchBar_SearchResults_Loading = translate({
    id: 'theme.SearchBar.loading',
    message: 'Loading search index\u2026',
    description: 'The message displayed while the search index is being loaded',
  });
  const noResults: Theme_SearchBar_SearchResults_NoResults = translate({
    id: 'theme.SearchBar.noResults',
    message: 'No results found.',
    description: 'The message displayed when a search query returns no results',
  });
  const searching: Theme_SearchBar_SearchResults_Searching = translate({
    id: 'theme.SearchBar.searching',
    message: 'Searching…',
    description: 'The message displayed while the query is being processed and fresh results have not yet returned',
  });

  const resultCount: Theme_SearchBar_SearchResults_ResultCount = results.length;
  const resultsFound: Theme_SearchBar_SearchResults_ResultsFound = translate(
    {
      id: 'theme.SearchBar.resultsFound',
      message: '{count} results found',
      description: 'The screen reader announcement when search results are found',
    },
    {
      count: String(resultCount),
    },
  );
  if (
    isOpen === false
    && isClosing === false
    && isTransitionToClose === false
  ) {
    return null;
  }

  const baseDropdownClassName: Theme_SearchBar_SearchResults_DropdownClassName = (isClosing === true || isTransitionToClose === true) ? 'nova-search-dropdown nova-search-dropdown-closing' : 'nova-search-dropdown';
  const dropdownClassName: Theme_SearchBar_SearchResults_DropdownClassName = (isMounted === false) ? `${baseDropdownClassName} nova-search-dropdown-mounting` : baseDropdownClassName;

  return (
    <div
      ref={dropdownRef}
      className={dropdownClassName}
      id="nova-search-results"
      role="listbox"
      onAnimationEnd={(event: Theme_SearchBar_SearchResults_AnimationEvent) => {
        if (isClosing === false) {
          return;
        }

        // Desktop closes via the 1ms `nova-search-dropdown-unmount` keyframe
        // attached to `.nova-search-dropdown-closing` - its animationend is
        // the close signal. Mobile uses CSS transitions (handled in
        // onTransitionEnd below) and would otherwise unmount mid-swap on
        // that same 1ms keyframe, so we return early on mobile here.
        const dropdownElement: Theme_SearchBar_SearchResults_DropdownElement = event.target as Theme_SearchBar_SearchResults_DropdownElement;
        const isInMobileMenu: Theme_SearchBar_SearchResults_IsInMobileMenu = dropdownElement.closest('.nova-mobile-menu-panel') !== null;

        if (isInMobileMenu === true) {
          return;
        }

        setIsClosing(false);

        return;
      }}
      onTransitionEnd={(event: Theme_SearchBar_SearchResults_TransitionEvent) => {
        if (isClosing === false) {
          return;
        }

        // Ignore transitionend events bubbled from children inside the
        // dropdown (search results, empty states, loading spinner).
        if (event.target !== dropdownRef.current) {
          return;
        }

        // The dropdown has two transitions running in parallel during a
        // mobile close: max-height (1000ms) and visibility (0s + 500ms
        // delay). Only max-height's completion at the full 1000ms is the
        // canonical "fully closed" signal - visibility's transitionend
        // fires at 500ms which is mid-swap.
        if (event.propertyName !== 'max-height') {
          return;
        }

        const dropdownElement: Theme_SearchBar_SearchResults_DropdownElement = event.target as Theme_SearchBar_SearchResults_DropdownElement;
        const isInMobileMenu: Theme_SearchBar_SearchResults_IsInMobileMenu = dropdownElement.closest('.nova-mobile-menu-panel') !== null;

        if (isInMobileMenu === false) {
          return;
        }

        setIsClosing(false);

        return;
      }}
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
        results.map((resultItem: Theme_SearchBar_SearchResults_ResultItem, resultIndex: Theme_SearchBar_SearchResults_ResultIndex) => {
          const resultUrl: Theme_SearchBar_SearchResults_ResultUrl = `${resultItem['path']}?_highlight=${encodeURIComponent(query)}`;
          const activeClassName: Theme_SearchBar_SearchResults_ActiveClassName = (resultIndex === activeIndex) ? ' nova-search-result--active' : '';

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
                {resultItem['snippetSegments'].map((segment: Theme_SearchBar_SearchResults_SnippetSegment, segmentIndex: Theme_SearchBar_SearchResults_SnippetSegmentIndex) => {
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
        && error === undefined
        && query !== ''
        && searchedQuery !== query
        && results.length === 0
      ) && (
        <div className="nova-search-empty">
          <Icon icon="lucide:loader" width="14" height="14" aria-hidden="true" />
          <span>{searching}</span>
        </div>
      )}
      {(
        isReady === true
        && results.length === 0
        && error === undefined
        && query !== ''
        && searchedQuery === query
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
