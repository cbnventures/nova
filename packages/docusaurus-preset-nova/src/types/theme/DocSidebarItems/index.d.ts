import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

/**
 * Theme - Doc Sidebar Items - Doc Sidebar Items.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemsDocSidebarItemsPropsItems = readonly PropSidebarItem[];

export type ThemeDocSidebarItemsDocSidebarItemsPropsActivePath = string;

export type ThemeDocSidebarItemsDocSidebarItemsPropsLevel = number;

export type ThemeDocSidebarItemsDocSidebarItemsProps = {
  items: ThemeDocSidebarItemsDocSidebarItemsPropsItems;
  activePath: ThemeDocSidebarItemsDocSidebarItemsPropsActivePath;
  level: ThemeDocSidebarItemsDocSidebarItemsPropsLevel;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemsDocSidebarItemsVisibleItems = PropSidebarItem[];

export type ThemeDocSidebarItemsDocSidebarItemsItem = PropSidebarItem;

export type ThemeDocSidebarItemsDocSidebarItemsIndex = number;

export type ThemeDocSidebarItemsDocSidebarItemsSpread = Record<string, unknown>;
