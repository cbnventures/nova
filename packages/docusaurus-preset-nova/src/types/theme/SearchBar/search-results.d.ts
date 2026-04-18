import type { SharedSearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Theme - Search Bar - Search Results - Search Results.
 *
 * @since 0.15.0
 */
export type ThemeSearchBarSearchResultsProps = Record<string, unknown>;

export type ThemeSearchBarSearchResultsSearchContext = import('./search-context.d.ts').ThemeSearchBarSearchContextValue;

export type ThemeSearchBarSearchResultsIsOpen = boolean;

export type ThemeSearchBarSearchResultsResults = SharedSearchWorkerSearchHit[];

export type ThemeSearchBarSearchResultsError = string | undefined;

export type ThemeSearchBarSearchResultsIsReady = boolean;

export type ThemeSearchBarSearchResultsQuery = string;

export type ThemeSearchBarSearchResultsActiveIndex = number;

export type ThemeSearchBarSearchResultsSetIsOpen = import('./search-context.d.ts').ThemeSearchBarSearchContextValueSetIsOpen;

export type ThemeSearchBarSearchResultsInputRef = import('./search-context.d.ts').ThemeSearchBarSearchContextValueInputRef;

export type ThemeSearchBarSearchResultsDropdownRef = React.RefObject<HTMLDivElement | null>;

export type ThemeSearchBarSearchResultsHandleClickOutsideFunction = (event: ThemeSearchBarSearchResultsMouseEvent) => void;

export type ThemeSearchBarSearchResultsMouseEvent = MouseEvent;

export type ThemeSearchBarSearchResultsMouseTarget = Node;

export type ThemeSearchBarSearchResultsIsOutsideDropdown = boolean;

export type ThemeSearchBarSearchResultsIsOutsideInput = boolean;

export type ThemeSearchBarSearchResultsIsInsideMobileMenu = boolean;

export type ThemeSearchBarSearchResultsLoading = string;

export type ThemeSearchBarSearchResultsNoResults = string;

export type ThemeSearchBarSearchResultsResultCount = number;

export type ThemeSearchBarSearchResultsResultsFound = string;

export type ThemeSearchBarSearchResultsNoResultsFound = string;

export type ThemeSearchBarSearchResultsStatusAnnouncement = string;

export type ThemeSearchBarSearchResultsResultItem = SharedSearchWorkerSearchHit;

export type ThemeSearchBarSearchResultsResultIndex = number;

export type ThemeSearchBarSearchResultsResultUrl = string;

export type ThemeSearchBarSearchResultsActiveClassName = string;

export type ThemeSearchBarSearchResultsSnippetSegment = SharedSearchWorkerSearchHit['snippetSegments'][number];

export type ThemeSearchBarSearchResultsSnippetSegmentIndex = number;
