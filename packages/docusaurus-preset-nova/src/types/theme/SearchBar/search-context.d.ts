import type { Dispatch, SetStateAction } from 'react';

import type { SharedSearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Theme - Search Bar - Search Context - Search Context.
 *
 * @since 0.15.0
 */
export type ThemeSearchBarSearchContextValueQuery = string;

export type ThemeSearchBarSearchContextValueResults = SharedSearchWorkerSearchHit[];

export type ThemeSearchBarSearchContextValueError = string | undefined;

export type ThemeSearchBarSearchContextValueIsReady = boolean;

export type ThemeSearchBarSearchContextValueIsOpen = boolean;

export type ThemeSearchBarSearchContextValueSetIsOpen = Dispatch<SetStateAction<ThemeSearchBarSearchContextValueIsOpen>>;

export type ThemeSearchBarSearchContextValueActiveIndex = number;

export type ThemeSearchBarSearchContextValueSetActiveIndex = Dispatch<SetStateAction<ThemeSearchBarSearchContextValueActiveIndex>>;

export type ThemeSearchBarSearchContextValueHandleQueryChange = (value: ThemeSearchBarSearchContextHandleQueryChangeValue) => void;

export type ThemeSearchBarSearchContextHandleQueryChangeValue = string;

export type ThemeSearchBarSearchContextValueInputRef = React.RefObject<HTMLInputElement | null>;

export type ThemeSearchBarSearchContextValue = {
  query: ThemeSearchBarSearchContextValueQuery;
  results: ThemeSearchBarSearchContextValueResults;
  error: ThemeSearchBarSearchContextValueError;
  isReady: ThemeSearchBarSearchContextValueIsReady;
  isOpen: ThemeSearchBarSearchContextValueIsOpen;
  setIsOpen: ThemeSearchBarSearchContextValueSetIsOpen;
  activeIndex: ThemeSearchBarSearchContextValueActiveIndex;
  setActiveIndex: ThemeSearchBarSearchContextValueSetActiveIndex;
  handleQueryChange: ThemeSearchBarSearchContextValueHandleQueryChange;
  inputRef: ThemeSearchBarSearchContextValueInputRef;
};

export type ThemeSearchBarSearchContextMaybeValue = ThemeSearchBarSearchContextValue | undefined;

export type ThemeSearchBarSearchContextContext = React.Context<ThemeSearchBarSearchContextMaybeValue>;

/**
 * Theme - Search Bar - Search Context - Use Search Context.
 *
 * @since 0.15.0
 */
export type ThemeSearchBarSearchContextReturns = ThemeSearchBarSearchContextValue;
