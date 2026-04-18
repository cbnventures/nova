import type { Dispatch, SetStateAction } from 'react';

/**
 * Theme - Search Bar - Search Provider - Search Provider.
 *
 * @since 0.15.0
 */
export type ThemeSearchBarSearchProviderPropsChildren = React.ReactNode;

export type ThemeSearchBarSearchProviderProps = {
  children: ThemeSearchBarSearchProviderPropsChildren;
};

export type ThemeSearchBarSearchProviderDocusaurusContext = ReturnType<typeof import('@docusaurus/useDocusaurusContext').default>;

export type ThemeSearchBarSearchProviderBaseUrl = string;

export type ThemeSearchBarSearchProviderWorkerUrl = string;

export type ThemeSearchBarSearchProviderManifestUrl = string;

export type ThemeSearchBarSearchProviderSearchWorker = import('../../lib/search/use-search-worker.d.ts').LibSearchUseSearchWorkerReturns;

export type ThemeSearchBarSearchProviderQueryState = [ThemeSearchBarSearchProviderQuery, ThemeSearchBarSearchProviderSetQuery];

export type ThemeSearchBarSearchProviderQuery = string;

export type ThemeSearchBarSearchProviderSetQuery = Dispatch<SetStateAction<ThemeSearchBarSearchProviderQuery>>;

export type ThemeSearchBarSearchProviderIsOpenState = [ThemeSearchBarSearchProviderIsOpen, ThemeSearchBarSearchProviderSetIsOpen];

export type ThemeSearchBarSearchProviderIsOpen = boolean;

export type ThemeSearchBarSearchProviderSetIsOpen = Dispatch<SetStateAction<ThemeSearchBarSearchProviderIsOpen>>;

export type ThemeSearchBarSearchProviderActiveIndexState = [ThemeSearchBarSearchProviderActiveIndex, ThemeSearchBarSearchProviderSetActiveIndex];

export type ThemeSearchBarSearchProviderActiveIndex = number;

export type ThemeSearchBarSearchProviderSetActiveIndex = Dispatch<SetStateAction<ThemeSearchBarSearchProviderActiveIndex>>;

export type ThemeSearchBarSearchProviderInputRef = React.RefObject<HTMLInputElement | null>;

export type ThemeSearchBarSearchProviderDebounceTimerRef = React.RefObject<ReturnType<typeof setTimeout> | undefined>;

export type ThemeSearchBarSearchProviderHandleQueryChangeFunction = (value: ThemeSearchBarSearchProviderHandleQueryChangeValue) => void;

export type ThemeSearchBarSearchProviderHandleQueryChangeValue = string;

export type ThemeSearchBarSearchProviderContextValue = import('./search-context.d.ts').ThemeSearchBarSearchContextValue;
