import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import {
  useCallback, useEffect, useLayoutEffect, useRef,
} from 'react';

import { useSearchContext } from './search-context.js';

import type {
  Theme_SearchBar_SearchInput_ActiveIndex,
  Theme_SearchBar_SearchInput_AnimationEvent,
  Theme_SearchBar_SearchInput_AriaLabel,
  Theme_SearchBar_SearchInput_Body,
  Theme_SearchBar_SearchInput_ClassName,
  Theme_SearchBar_SearchInput_ClearSearchAriaLabel,
  Theme_SearchBar_SearchInput_DestinationUrl,
  Theme_SearchBar_SearchInput_Direction,
  Theme_SearchBar_SearchInput_HandleInputChangeFunction,
  Theme_SearchBar_SearchInput_HandleQueryChange,
  Theme_SearchBar_SearchInput_InputChangeEvent,
  Theme_SearchBar_SearchInput_InputKeyboardEvent,
  Theme_SearchBar_SearchInput_InputRef,
  Theme_SearchBar_SearchInput_InputValue,
  Theme_SearchBar_SearchInput_IsActive,
  Theme_SearchBar_SearchInput_IsMac,
  Theme_SearchBar_SearchInput_IsOpen,
  Theme_SearchBar_SearchInput_IsShortcutMatch,
  Theme_SearchBar_SearchInput_KeyboardEvent,
  Theme_SearchBar_SearchInput_NextIndex,
  Theme_SearchBar_SearchInput_Placeholder,
  Theme_SearchBar_SearchInput_PreviousIndex,
  Theme_SearchBar_SearchInput_PreviousIsActiveRef,
  Theme_SearchBar_SearchInput_Props,
  Theme_SearchBar_SearchInput_Query,
  Theme_SearchBar_SearchInput_ResultCount,
  Theme_SearchBar_SearchInput_Results,
  Theme_SearchBar_SearchInput_SearchContext,
  Theme_SearchBar_SearchInput_SearchInput_HandleKeyDown_CallbackFunction,
  Theme_SearchBar_SearchInput_SearchInput_HandleKeyDown_Function,
  Theme_SearchBar_SearchInput_SearchInput_OnSwapEnd_Function,
  Theme_SearchBar_SearchInput_SelectedResult,
  Theme_SearchBar_SearchInput_SetActiveIndex,
  Theme_SearchBar_SearchInput_SetIsOpen,
} from '../../types/theme/SearchBar/search-input.d.ts';

/**
 * Theme - Search Bar - Search Input - Search Input.
 *
 * Renders the search text field with a clear button, registers the
 * global Cmd+K / Ctrl+K shortcut, and handles keyboard navigation
 * for cycling through search results via arrow keys.
 *
 * @param {Theme_SearchBar_SearchInput_Props} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchInput(_props: Theme_SearchBar_SearchInput_Props) {
  const searchContext: Theme_SearchBar_SearchInput_SearchContext = useSearchContext();
  const query: Theme_SearchBar_SearchInput_Query = searchContext['query'];
  const isOpen: Theme_SearchBar_SearchInput_IsOpen = searchContext['isOpen'];
  const setIsOpen: Theme_SearchBar_SearchInput_SetIsOpen = searchContext['setIsOpen'];
  const activeIndex: Theme_SearchBar_SearchInput_ActiveIndex = searchContext['activeIndex'];
  const setActiveIndex: Theme_SearchBar_SearchInput_SetActiveIndex = searchContext['setActiveIndex'];
  const results: Theme_SearchBar_SearchInput_Results = searchContext['results'];
  const handleQueryChange: Theme_SearchBar_SearchInput_HandleQueryChange = searchContext['handleQueryChange'];
  const inputRef: Theme_SearchBar_SearchInput_InputRef = searchContext['inputRef'];

  const isActive: Theme_SearchBar_SearchInput_IsActive = (query !== '');
  const previousIsActiveRef: Theme_SearchBar_SearchInput_PreviousIsActiveRef = useRef<boolean>(isActive);

  // Mobile-menu body swap animation. When the search activates or
  // deactivates inside the mobile menu, add a direction-specific class to
  // the body wrapper so the shared keyframes can run the
  // collapse-then-expand cycle and flip items/dropdown visibility at the
  // midpoint. Desktop SearchInput instances no-op because the closest
  // panel selector misses.
  //
  // useLayoutEffect (not useEffect) so the class lands in the same paint
  // as the React commit that flipped data-search-active and added the
  // dropdown .closing class - otherwise the browser paints one frame
  // with the dropdown hidden by the static .closing rule but the body
  // not yet animating, showing a blank flash.
  useLayoutEffect(() => {
    if (previousIsActiveRef.current === isActive) {
      return;
    }

    const direction: Theme_SearchBar_SearchInput_Direction = (isActive === true) ? 'in' : 'out';

    previousIsActiveRef.current = isActive;

    if (inputRef.current === null) {
      return;
    }

    if (inputRef.current.closest('.nova-mobile-menu-panel') === null) {
      return;
    }

    const body: Theme_SearchBar_SearchInput_Body = document.querySelector<HTMLDivElement>('.nova-mobile-menu-body');

    if (body === null) {
      return;
    }

    const className: Theme_SearchBar_SearchInput_ClassName = `nova-mobile-menu-body-swapping-${direction}`;

    body.classList.add(className);

    // Strip the swap class on animationend so the next swap-in/swap-out starts
    // a fresh body animation. The body's keyframes (max-height: 100dvh -> 0 ->
    // 100dvh) used to share a single animation-name across both directions,
    // which made the browser see the second cycle's animation-name as
    // unchanged and never replay the collapse - subsequent cycles snapped
    // instead of sliding. Now the keyframes have direction-specific names
    // (slide-swap-in / slide-swap-out) so animationend fires per cycle.
    const onSwapEnd: Theme_SearchBar_SearchInput_SearchInput_OnSwapEnd_Function = (event: Theme_SearchBar_SearchInput_AnimationEvent) => {
      if (event.target !== body) {
        return;
      }

      // No animationName filter: cssnano in the prod bundle renames keyframes
      // to single letters (slide-swap-in -> c, slide-swap-out -> d), so a
      // source-name check would never match in prod and the swap class would
      // persist forever. The event.target === body check above is enough on
      // its own - body only ever runs one animation at a time.
      body.classList.remove(className);

      body.removeEventListener('animationend', onSwapEnd);

      return;
    };

    body.addEventListener('animationend', onSwapEnd);

    return () => {
      body.removeEventListener('animationend', onSwapEnd);

      body.classList.remove(className);

      return;
    };
  }, [isActive]);

  // Global keyboard shortcut (Cmd+K / Ctrl+K).
  useEffect(() => {
    const handleKeyDown: Theme_SearchBar_SearchInput_SearchInput_HandleKeyDown_Function = (event: Theme_SearchBar_SearchInput_KeyboardEvent) => {
      const isMac: Theme_SearchBar_SearchInput_IsMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isShortcutMatch: Theme_SearchBar_SearchInput_IsShortcutMatch = (isMac === true) ? (event.metaKey === true && event.key === 'k') : (event.ctrlKey === true && event.key === 'k');

      if (isShortcutMatch === true) {
        event.preventDefault();

        setIsOpen(true);

        if (inputRef.current !== null) {
          inputRef.current.focus();
        }
      }

      return;
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      return;
    };
  }, []);

  // Input change handler. Drives `isOpen` synchronously off the field
  // value so the dropdown mounts/unmounts in the same tick as `query`
  // changes - search-provider also calls `setIsOpen` from inside a 200ms
  // debounce, but the animation system needs the mount to land at t=0
  // (start of the swap), not at the debounce midpoint.
  const handleInputChange: Theme_SearchBar_SearchInput_HandleInputChangeFunction = useCallback((event: Theme_SearchBar_SearchInput_InputChangeEvent) => {
    const inputValue: Theme_SearchBar_SearchInput_InputValue = event.target.value;

    handleQueryChange(inputValue);

    setIsOpen(inputValue !== '');

    return;
  }, [
    handleQueryChange,
    setIsOpen,
  ]);

  // Keyboard navigation within results.
  const handleKeyDown: Theme_SearchBar_SearchInput_SearchInput_HandleKeyDown_CallbackFunction = useCallback((event: Theme_SearchBar_SearchInput_InputKeyboardEvent) => {
    const resultCount: Theme_SearchBar_SearchInput_ResultCount = results.length;

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      const nextIndex: Theme_SearchBar_SearchInput_NextIndex = (activeIndex + 1 < resultCount) ? activeIndex + 1 : 0;

      setActiveIndex(nextIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();

      const previousIndex: Theme_SearchBar_SearchInput_PreviousIndex = (activeIndex - 1 >= 0) ? activeIndex - 1 : resultCount - 1;

      setActiveIndex(previousIndex);
    } else if (event.key === 'Enter') {
      event.preventDefault();

      const selectedResult: Theme_SearchBar_SearchInput_SelectedResult = results[activeIndex];

      if (selectedResult !== undefined) {
        const destinationUrl: Theme_SearchBar_SearchInput_DestinationUrl = `${selectedResult['path']}?_highlight=${encodeURIComponent(query)}`;

        window.location.href = destinationUrl;
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }

    return;
  }, [
    activeIndex,
    results,
    query,
  ]);

  const searchPlaceholder: Theme_SearchBar_SearchInput_Placeholder = translate({
    id: 'theme.SearchBar.placeholder',
    message: 'Search',
    description: 'The placeholder text for the search input field',
  });
  const searchAriaLabel: Theme_SearchBar_SearchInput_AriaLabel = translate({
    id: 'theme.SearchBar.ariaLabel',
    message: 'Search',
    description: 'The ARIA label for the search input field',
  });
  const clearSearchAriaLabel: Theme_SearchBar_SearchInput_ClearSearchAriaLabel = translate({
    id: 'theme.SearchBar.clearSearchAriaLabel',
    message: 'Clear search',
    description: 'The ARIA label for the button that clears the search input',
  });

  return (
    <div
      className="nova-search-bar"
      data-search-active={(isActive === true) ? 'true' : 'false'}
    >
      <input
        ref={inputRef}
        className="nova-search-bar-input"
        type="search"
        placeholder={searchPlaceholder}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (query !== '') {
            setIsOpen(true);
          }

          return;
        }}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="nova-search-results"
        aria-activedescendant={(activeIndex >= 0) ? `nova-search-result-${String(activeIndex)}` : undefined}
        aria-autocomplete="list"
        aria-label={searchAriaLabel}
      />
      {(query !== '') && (
        <button
          className="nova-search-bar-clear"
          type="button"
          onClick={() => {
            handleQueryChange('');
            setIsOpen(false);

            if (inputRef.current !== null) {
              inputRef.current.focus();
            }

            return;
          }}
          aria-label={clearSearchAriaLabel}
        >
          <Icon icon="lucide:x" width="14" height="14" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
