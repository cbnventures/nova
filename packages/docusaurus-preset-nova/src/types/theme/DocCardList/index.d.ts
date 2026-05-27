import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

import type { CSSProperties } from 'react';

/**
 * Theme - Doc Card List - Doc Card List.
 *
 * @since 0.15.0
 */
export type Theme_DocCardList_Index_DocCardList_Props_Items = PropSidebarItem[] | undefined;

export type Theme_DocCardList_Index_DocCardList_Props_ClassName = string | undefined;

export type Theme_DocCardList_Index_DocCardList_Props_Style = CSSProperties | undefined;

export type Theme_DocCardList_Index_DocCardList_Props = {
  items?: Theme_DocCardList_Index_DocCardList_Props_Items;
  className?: Theme_DocCardList_Index_DocCardList_Props_ClassName;
  style?: Theme_DocCardList_Index_DocCardList_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocCardList_Index_DocCardList_FilteredItems = PropSidebarItem[];

export type Theme_DocCardList_Index_DocCardList_Item = PropSidebarItem;

export type Theme_DocCardList_Index_DocCardList_Index = number;

/**
 * Theme - Doc Card List - Doc Card List For Current Sidebar.
 *
 * @since 0.15.0
 */
export type Theme_DocCardList_Index_DocCardListForCurrentSidebar_SidebarItems = PropSidebarItem[];
