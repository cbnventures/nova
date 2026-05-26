import type { Dispatch, SetStateAction } from 'react';

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

export type ThemeSearchBarSearchResultsSearchedQuery = string;

export type ThemeSearchBarSearchResultsActiveIndex = number;

export type ThemeSearchBarSearchResultsSetIsOpen = import('./search-context.d.ts').ThemeSearchBarSearchContextValueSetIsOpen;

export type ThemeSearchBarSearchResultsInputRef = import('./search-context.d.ts').ThemeSearchBarSearchContextValueInputRef;

export type ThemeSearchBarSearchResultsDropdownRef = React.RefObject<HTMLDivElement | null>;

export type ThemeSearchBarSearchResultsWasOpenRef = React.RefObject<boolean>;

export type ThemeSearchBarSearchResultsIsClosingState = [ThemeSearchBarSearchResultsIsClosing, ThemeSearchBarSearchResultsSetIsClosing];

export type ThemeSearchBarSearchResultsIsClosing = boolean;

export type ThemeSearchBarSearchResultsSetIsClosing = Dispatch<SetStateAction<ThemeSearchBarSearchResultsIsClosing>>;

export type ThemeSearchBarSearchResultsIsMountedState = [ThemeSearchBarSearchResultsIsMounted, ThemeSearchBarSearchResultsSetIsMounted];

export type ThemeSearchBarSearchResultsIsMounted = boolean;

export type ThemeSearchBarSearchResultsSetIsMounted = Dispatch<SetStateAction<ThemeSearchBarSearchResultsIsMounted>>;

export type ThemeSearchBarSearchResultsIsTransitionToClose = boolean;

export type ThemeSearchBarSearchResultsHandleClickOutsideFunction = (event: ThemeSearchBarSearchResultsMouseEvent) => void;

export type ThemeSearchBarSearchResultsMouseEvent = MouseEvent;

export type ThemeSearchBarSearchResultsMouseTarget = Node;

export type ThemeSearchBarSearchResultsIsOutsideDropdown = boolean;

export type ThemeSearchBarSearchResultsIsOutsideInput = boolean;

export type ThemeSearchBarSearchResultsIsInsideMobileMenu = boolean;

export type ThemeSearchBarSearchResultsAnimationFrameId = number;

export type ThemeSearchBarSearchResultsIsInMobileMenu = boolean;

export type ThemeSearchBarSearchResultsTimer = ReturnType<typeof setTimeout>;

export type ThemeSearchBarSearchResultsLoading = string;

export type ThemeSearchBarSearchResultsNoResults = string;

export type ThemeSearchBarSearchResultsSearching = string;

export type ThemeSearchBarSearchResultsResultCount = number;

export type ThemeSearchBarSearchResultsResultsFound = string;

export type ThemeSearchBarSearchResultsDropdownClassName = string;

export type ThemeSearchBarSearchResultsAnimationEvent = React.AnimationEvent<HTMLDivElement>;

export type ThemeSearchBarSearchResultsDropdownElement = HTMLElement;

export type ThemeSearchBarSearchResultsTransitionEvent = React.TransitionEvent<HTMLDivElement>;

export type ThemeSearchBarSearchResultsResultItem = SharedSearchWorkerSearchHit;

export type ThemeSearchBarSearchResultsResultIndex = number;

export type ThemeSearchBarSearchResultsResultUrl = string;

export type ThemeSearchBarSearchResultsActiveClassName = string;

export type ThemeSearchBarSearchResultsSnippetSegment = SharedSearchWorkerSearchHit['snippetSegments'][number];

export type ThemeSearchBarSearchResultsSnippetSegmentIndex = number;

export type ThemeSearchBarSearchResultsNoResultsFound = string;

export type ThemeSearchBarSearchResultsStatusAnnouncement = string;
