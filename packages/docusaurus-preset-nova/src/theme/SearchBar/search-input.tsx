import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { useCallback, useEffect } from 'react';

import { useSearchContext } from './search-context.js';

import type {
  ThemeSearchBarSearchInputActiveIndex,
  ThemeSearchBarSearchInputAriaLabel,
  ThemeSearchBarSearchInputClearSearchAriaLabel,
  ThemeSearchBarSearchInputDestinationUrl,
  ThemeSearchBarSearchInputHandleInputChangeFunction,
  ThemeSearchBarSearchInputHandleKeyDownCallbackFunction,
  ThemeSearchBarSearchInputHandleKeyDownFunction,
  ThemeSearchBarSearchInputHandleQueryChange,
  ThemeSearchBarSearchInputInputChangeEvent,
  ThemeSearchBarSearchInputInputKeyboardEvent,
  ThemeSearchBarSearchInputInputRef,
  ThemeSearchBarSearchInputInputValue,
  ThemeSearchBarSearchInputIsMac,
  ThemeSearchBarSearchInputIsOpen,
  ThemeSearchBarSearchInputIsShortcutMatch,
  ThemeSearchBarSearchInputKeyboardEvent,
  ThemeSearchBarSearchInputNextIndex,
  ThemeSearchBarSearchInputPlaceholder,
  ThemeSearchBarSearchInputPreviousIndex,
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

  // Debounced input change handler.
  const handleInputChange: ThemeSearchBarSearchInputHandleInputChangeFunction = useCallback((event: ThemeSearchBarSearchInputInputChangeEvent) => {
    const inputValue: ThemeSearchBarSearchInputInputValue = event.target.value;

    handleQueryChange(inputValue);

    return;
  }, [handleQueryChange]);

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
    <div className="nova-search-bar">
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
