import type { Dispatch, SetStateAction } from 'react';

import type { Shared_SearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Theme - Search Bar - Search Results - Search Results.
 *
 * @since 0.15.0
 */
export type Theme_SearchBar_SearchResults_Props = Record<string, unknown>;

export type Theme_SearchBar_SearchResults_SearchContext = import('./search-context.d.ts').Theme_SearchBar_SearchContext_Value;

export type Theme_SearchBar_SearchResults_IsOpen = boolean;

export type Theme_SearchBar_SearchResults_Results = Shared_SearchWorkerSearchHit[];

export type Theme_SearchBar_SearchResults_Error = string | undefined;

export type Theme_SearchBar_SearchResults_IsReady = boolean;

export type Theme_SearchBar_SearchResults_Query = string;

export type Theme_SearchBar_SearchResults_SearchedQuery = string;

export type Theme_SearchBar_SearchResults_ActiveIndex = number;

export type Theme_SearchBar_SearchResults_SetIsOpen = import('./search-context.d.ts').Theme_SearchBar_SearchContext_Value_SetIsOpen;

export type Theme_SearchBar_SearchResults_InputRef = import('./search-context.d.ts').Theme_SearchBar_SearchContext_Value_InputRef;

export type Theme_SearchBar_SearchResults_DropdownRef = React.RefObject<HTMLDivElement | null>;

export type Theme_SearchBar_SearchResults_WasOpenRef = React.RefObject<boolean>;

export type Theme_SearchBar_SearchResults_IsClosingState = [Theme_SearchBar_SearchResults_IsClosing, Theme_SearchBar_SearchResults_SetIsClosing];

export type Theme_SearchBar_SearchResults_IsClosing = boolean;

export type Theme_SearchBar_SearchResults_SetIsClosing = Dispatch<SetStateAction<Theme_SearchBar_SearchResults_IsClosing>>;

export type Theme_SearchBar_SearchResults_IsMountedState = [Theme_SearchBar_SearchResults_IsMounted, Theme_SearchBar_SearchResults_SetIsMounted];

export type Theme_SearchBar_SearchResults_IsMounted = boolean;

export type Theme_SearchBar_SearchResults_SetIsMounted = Dispatch<SetStateAction<Theme_SearchBar_SearchResults_IsMounted>>;

export type Theme_SearchBar_SearchResults_IsTransitionToClose = boolean;

export type Theme_SearchBar_SearchResults_HandleClickOutsideFunction = (event: Theme_SearchBar_SearchResults_MouseEvent) => void;

export type Theme_SearchBar_SearchResults_MouseEvent = MouseEvent;

export type Theme_SearchBar_SearchResults_MouseTarget = Node;

export type Theme_SearchBar_SearchResults_IsOutsideDropdown = boolean;

export type Theme_SearchBar_SearchResults_IsOutsideInput = boolean;

export type Theme_SearchBar_SearchResults_IsInsideMobileMenu = boolean;

export type Theme_SearchBar_SearchResults_AnimationFrameId = number;

export type Theme_SearchBar_SearchResults_IsInMobileMenu = boolean;

export type Theme_SearchBar_SearchResults_Timer = ReturnType<typeof setTimeout>;

export type Theme_SearchBar_SearchResults_Loading = string;

export type Theme_SearchBar_SearchResults_NoResults = string;

export type Theme_SearchBar_SearchResults_Searching = string;

export type Theme_SearchBar_SearchResults_ResultCount = number;

export type Theme_SearchBar_SearchResults_ResultsFound = string;

export type Theme_SearchBar_SearchResults_DropdownClassName = string;

export type Theme_SearchBar_SearchResults_AnimationEvent = React.AnimationEvent<HTMLDivElement>;

export type Theme_SearchBar_SearchResults_DropdownElement = HTMLElement;

export type Theme_SearchBar_SearchResults_TransitionEvent = React.TransitionEvent<HTMLDivElement>;

export type Theme_SearchBar_SearchResults_ResultItem = Shared_SearchWorkerSearchHit;

export type Theme_SearchBar_SearchResults_ResultIndex = number;

export type Theme_SearchBar_SearchResults_ResultUrl = string;

export type Theme_SearchBar_SearchResults_ActiveClassName = string;

export type Theme_SearchBar_SearchResults_SnippetSegment = Shared_SearchWorkerSearchHit['snippetSegments'][number];

export type Theme_SearchBar_SearchResults_SnippetSegmentIndex = number;

export type Theme_SearchBar_SearchResults_NoResultsFound = string;

export type Theme_SearchBar_SearchResults_StatusAnnouncement = string;

/**
 * Theme - Search Bar - Search Results - Search Results - Search Results.
 *
 * @since 0.15.0
 */
export type Theme_SearchBar_SearchResults_SearchResults_Returns = React.JSX.Element;
