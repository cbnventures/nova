import type { TabsProps, TabValue } from '@docusaurus/theme-common/internal';
import type { ReactNode } from 'react';

/**
 * Theme - Tabs.
 *
 * @since 0.15.0
 */
export type ThemeTabsProps = TabsProps;

export type ThemeTabsIsBrowser = boolean;

export type ThemeTabsContainerRef = React.RefObject<HTMLDivElement | null>;

export type ThemeTabsTabsResult = {
  selectedValue: string;
  selectValue: (value: string) => void;
  tabValues: readonly TabValue[];
  lazy: boolean;
  block: boolean;
};

export type ThemeTabsSanitizedChildren = ReactNode;

export type ThemeTabsEffectCleanupReturns = undefined;

/**
 * Theme - Tabs - Tab List.
 *
 * @since 0.15.0
 */
export type ThemeTabsTabListTabsResult = {
  selectedValue: string;
  selectValue: (value: string) => void;
  tabValues: readonly TabValue[];
};

export type ThemeTabsTabListTabValue = TabValue;

export type ThemeTabsTabListTabId = string;

export type ThemeTabsTabListAriaControls = string;

export type ThemeTabsTabListIsSelected = boolean;

/**
 * Theme - Tabs - Tab List - Handle Key Down.
 *
 * @since 0.15.0
 */
export type ThemeTabsTabListHandleKeyDownEvent = React.KeyboardEvent<HTMLLIElement>;

export type ThemeTabsTabListHandleKeyDownReturns = undefined;

export type ThemeTabsTabListHandleKeyDownCurrentIndex = number;

export type ThemeTabsTabListHandleKeyDownNextIndex = number;

export type ThemeTabsTabListHandleKeyDownNextTabValue = TabValue | undefined;

export type ThemeTabsTabListHandleKeyDownParentElement = HTMLElement | null;

export type ThemeTabsTabListHandleKeyDownTarget = HTMLLIElement | undefined;

/**
 * Theme - Tabs - Tabs - Handle Hash Change.
 *
 * @since 0.15.0
 */
export type ThemeTabsHandleHashChangeReturns = undefined;

export type ThemeTabsHashTarget = Element | null;

export type ThemeTabsHashPanel = Element | null;

export type ThemeTabsHashTabValue = string | undefined;
