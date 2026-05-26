import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import {
  useCallback, useEffect, useLayoutEffect, useRef,
} from 'react';

import { useSearchContext } from './search-context.js';

import type {
  ThemeSearchBarSearchInputActiveIndex,
  ThemeSearchBarSearchInputAnimationEvent,
  ThemeSearchBarSearchInputAriaLabel,
  ThemeSearchBarSearchInputBody,
  ThemeSearchBarSearchInputClassName,
  ThemeSearchBarSearchInputClearSearchAriaLabel,
  ThemeSearchBarSearchInputDestinationUrl,
  ThemeSearchBarSearchInputDirection,
  ThemeSearchBarSearchInputHandleInputChangeFunction,
  ThemeSearchBarSearchInputHandleKeyDownCallbackFunction,
  ThemeSearchBarSearchInputHandleKeyDownFunction,
  ThemeSearchBarSearchInputHandleQueryChange,
  ThemeSearchBarSearchInputInputChangeEvent,
  ThemeSearchBarSearchInputInputKeyboardEvent,
  ThemeSearchBarSearchInputInputRef,
  ThemeSearchBarSearchInputInputValue,
  ThemeSearchBarSearchInputIsActive,
  ThemeSearchBarSearchInputIsMac,
  ThemeSearchBarSearchInputIsOpen,
  ThemeSearchBarSearchInputIsShortcutMatch,
  ThemeSearchBarSearchInputKeyboardEvent,
  ThemeSearchBarSearchInputNextIndex,
  ThemeSearchBarSearchInputOnSwapEndFunction,
  ThemeSearchBarSearchInputPlaceholder,
  ThemeSearchBarSearchInputPreviousIndex,
  ThemeSearchBarSearchInputPreviousIsActiveRef,
  ThemeSearchBarSearchInputProps,
  ThemeSearchBarSearchInputQuery,
  ThemeSearchBarSearchInputResultCount,
  ThemeSearchBarSearchInputResults,
  ThemeSearchBarSearchInputSearchContext,
  ThemeSearchBarSearchInputSelectedResult,
  ThemeSearchBarSearchInputSetActiveIndex,
  ThemeSearchBarSearchInputSetIsOpen,
} from '../../types/theme/SearchBar/search-input.d.ts';

/**
 * Theme - Search Bar - Search Input - Search Input.
 *
 * Renders the search text field with a clear button, registers the
 * global Cmd+K / Ctrl+K shortcut, and handles keyboard navigation
 * for cycling through search results via arrow keys.
 *
 * @param {ThemeSearchBarSearchInputProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchInput(_props: ThemeSearchBarSearchInputProps) {
  const searchContext: ThemeSearchBarSearchInputSearchContext = useSearchContext();
  const query: ThemeSearchBarSearchInputQuery = searchContext['query'];
  const isOpen: ThemeSearchBarSearchInputIsOpen = searchContext['isOpen'];
  const setIsOpen: ThemeSearchBarSearchInputSetIsOpen = searchContext['setIsOpen'];
  const activeIndex: ThemeSearchBarSearchInputActiveIndex = searchContext['activeIndex'];
  const setActiveIndex: ThemeSearchBarSearchInputSetActiveIndex = searchContext['setActiveIndex'];
  const results: ThemeSearchBarSearchInputResults = searchContext['results'];
  const handleQueryChange: ThemeSearchBarSearchInputHandleQueryChange = searchContext['handleQueryChange'];
  const inputRef: ThemeSearchBarSearchInputInputRef = searchContext['inputRef'];

  const isActive: ThemeSearchBarSearchInputIsActive = (query !== '');
  const previousIsActiveRef: ThemeSearchBarSearchInputPreviousIsActiveRef = useRef<boolean>(isActive);

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

    const direction: ThemeSearchBarSearchInputDirection = (isActive === true) ? 'in' : 'out';

    previousIsActiveRef.current = isActive;

    if (inputRef.current === null) {
      return;
    }

    if (inputRef.current.closest('.nova-mobile-menu-panel') === null) {
      return;
    }

    const body: ThemeSearchBarSearchInputBody = document.querySelector<HTMLDivElement>('.nova-mobile-menu-body');

    if (body === null) {
      return;
    }

    const className: ThemeSearchBarSearchInputClassName = `nova-mobile-menu-body-swapping-${direction}`;

    body.classList.add(className);

    // Strip the swap class on animationend so the next swap-in/swap-out starts
    // a fresh body animation. The body's keyframes (max-height: 100dvh -> 0 ->
    // 100dvh) used to share a single animation-name across both directions,
    // which made the browser see the second cycle's animation-name as
    // unchanged and never replay the collapse - subsequent cycles snapped
    // instead of sliding. Now the keyframes have direction-specific names
    // (slide-swap-in / slide-swap-out) so animationend fires per cycle.
    const onSwapEnd: ThemeSearchBarSearchInputOnSwapEndFunction = (event: ThemeSearchBarSearchInputAnimationEvent) => {
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
    const handleKeyDown: ThemeSearchBarSearchInputHandleKeyDownFunction = (event: ThemeSearchBarSearchInputKeyboardEvent) => {
      const isMac: ThemeSearchBarSearchInputIsMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isShortcutMatch: ThemeSearchBarSearchInputIsShortcutMatch = (isMac === true) ? (event.metaKey === true && event.key === 'k') : (event.ctrlKey === true && event.key === 'k');

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
  const handleInputChange: ThemeSearchBarSearchInputHandleInputChangeFunction = useCallback((event: ThemeSearchBarSearchInputInputChangeEvent) => {
    const inputValue: ThemeSearchBarSearchInputInputValue = event.target.value;

    handleQueryChange(inputValue);

    setIsOpen(inputValue !== '');

    return;
  }, [
    handleQueryChange,
    setIsOpen,
  ]);

  // Keyboard navigation within results.
  const handleKeyDown: ThemeSearchBarSearchInputHandleKeyDownCallbackFunction = useCallback((event: ThemeSearchBarSearchInputInputKeyboardEvent) => {
    const resultCount: ThemeSearchBarSearchInputResultCount = results.length;

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      const nextIndex: ThemeSearchBarSearchInputNextIndex = (activeIndex + 1 < resultCount) ? activeIndex + 1 : 0;

      setActiveIndex(nextIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();

      const previousIndex: ThemeSearchBarSearchInputPreviousIndex = (activeIndex - 1 >= 0) ? activeIndex - 1 : resultCount - 1;

      setActiveIndex(previousIndex);
    } else if (event.key === 'Enter') {
      event.preventDefault();

      const selectedResult: ThemeSearchBarSearchInputSelectedResult = results[activeIndex];

      if (selectedResult !== undefined) {
        const destinationUrl: ThemeSearchBarSearchInputDestinationUrl = `${selectedResult['path']}?_highlight=${encodeURIComponent(query)}`;

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

  const searchPlaceholder: ThemeSearchBarSearchInputPlaceholder = translate({
    id: 'theme.SearchBar.placeholder',
    message: 'Search',
    description: 'The placeholder text for the search input field',
  });
  const searchAriaLabel: ThemeSearchBarSearchInputAriaLabel = translate({
    id: 'theme.SearchBar.ariaLabel',
    message: 'Search',
    description: 'The ARIA label for the search input field',
  });
  const clearSearchAriaLabel: ThemeSearchBarSearchInputClearSearchAriaLabel = translate({
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
