import type { Dispatch, SetStateAction } from 'react';

import type { Shared_SearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Theme - Search Bar - Search Context - Search Context.
 *
 * @since 0.15.0
 */
export type Theme_SearchBar_SearchContext_Value_Query = string;

export type Theme_SearchBar_SearchContext_Value_SearchedQuery = string;

export type Theme_SearchBar_SearchContext_Value_Results = Shared_SearchWorkerSearchHit[];

export type Theme_SearchBar_SearchContext_Value_Error = string | undefined;

export type Theme_SearchBar_SearchContext_Value_IsReady = boolean;

export type Theme_SearchBar_SearchContext_Value_IsOpen = boolean;

export type Theme_SearchBar_SearchContext_Value_SetIsOpen = Dispatch<SetStateAction<Theme_SearchBar_SearchContext_Value_IsOpen>>;

export type Theme_SearchBar_SearchContext_Value_ActiveIndex = number;

export type Theme_SearchBar_SearchContext_Value_SetActiveIndex = Dispatch<SetStateAction<Theme_SearchBar_SearchContext_Value_ActiveIndex>>;

export type Theme_SearchBar_SearchContext_Value_HandleQueryChange = (value: Theme_SearchBar_SearchContext_HandleQueryChangeValue) => void;

export type Theme_SearchBar_SearchContext_HandleQueryChangeValue = string;

export type Theme_SearchBar_SearchContext_Value_InputRef = React.RefObject<HTMLInputElement | null>;

export type Theme_SearchBar_SearchContext_Value = {
  query: Theme_SearchBar_SearchContext_Value_Query;
  searchedQuery: Theme_SearchBar_SearchContext_Value_SearchedQuery;
  results: Theme_SearchBar_SearchContext_Value_Results;
  error: Theme_SearchBar_SearchContext_Value_Error;
  isReady: Theme_SearchBar_SearchContext_Value_IsReady;
  isOpen: Theme_SearchBar_SearchContext_Value_IsOpen;
  setIsOpen: Theme_SearchBar_SearchContext_Value_SetIsOpen;
  activeIndex: Theme_SearchBar_SearchContext_Value_ActiveIndex;
  setActiveIndex: Theme_SearchBar_SearchContext_Value_SetActiveIndex;
  handleQueryChange: Theme_SearchBar_SearchContext_Value_HandleQueryChange;
  inputRef: Theme_SearchBar_SearchContext_Value_InputRef;
};

export type Theme_SearchBar_SearchContext_MaybeValue = Theme_SearchBar_SearchContext_Value | undefined;

export type Theme_SearchBar_SearchContext_SearchContext = React.Context<Theme_SearchBar_SearchContext_MaybeValue>;

export type Theme_SearchBar_SearchContext_Returns = Theme_SearchBar_SearchContext_Value;

/**
 * Theme - Search Bar - Search Context - Use Search Context.
 *
 * @since 0.15.0
 */
export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_Query = string;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_SearchedQuery = string;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_Results = Shared_SearchWorkerSearchHit[];

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_Error = string | undefined;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_IsReady = boolean;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_IsOpen = boolean;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_SetIsOpen = Dispatch<SetStateAction<Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_IsOpen>>;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_ActiveIndex = number;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_SetActiveIndex = Dispatch<SetStateAction<Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_ActiveIndex>>;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_HandleQueryChange = (value: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_HandleQueryChangeValue) => void;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_HandleQueryChangeValue = string;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_InputRef = React.RefObject<HTMLInputElement | null>;

export type Theme_SearchBar_SearchContext_UseSearchContext_Context_Value = {
  query: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_Query;
  searchedQuery: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_SearchedQuery;
  results: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_Results;
  error: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_Error;
  isReady: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_IsReady;
  isOpen: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_IsOpen;
  setIsOpen: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_SetIsOpen;
  activeIndex: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_ActiveIndex;
  setActiveIndex: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_SetActiveIndex;
  handleQueryChange: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_HandleQueryChange;
  inputRef: Theme_SearchBar_SearchContext_UseSearchContext_Context_Value_InputRef;
};

export type Theme_SearchBar_SearchContext_UseSearchContext_Context = Theme_SearchBar_SearchContext_UseSearchContext_Context_Value | undefined;
