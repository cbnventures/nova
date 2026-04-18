import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

/**
 * Theme - Doc Card List - Doc Card List.
 *
 * @since 0.15.0
 */
export type ThemeDocCardListDocCardListPropsItems = PropSidebarItem[] | undefined;

export type ThemeDocCardListDocCardListProps = {
  items?: ThemeDocCardListDocCardListPropsItems;
  [key: string]: unknown;
};

export type ThemeDocCardListDocCardListFilteredItems = PropSidebarItem[];

export type ThemeDocCardListDocCardListItem = PropSidebarItem;

export type ThemeDocCardListDocCardListIndex = number;

/**
 * Theme - Doc Card List - Doc Card List For Current Sidebar.
 *
 * @since 0.15.0
 */
export type ThemeDocCardListDocCardListForCurrentSidebarSidebarItems = PropSidebarItem[];
