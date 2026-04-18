import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

/**
 * Theme - Doc Sidebar Item - Doc Sidebar Item.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemDocSidebarItemPropsItem = PropSidebarItem;

export type ThemeDocSidebarItemDocSidebarItemPropsActivePath = string;

export type ThemeDocSidebarItemDocSidebarItemPropsLevel = number;

export type ThemeDocSidebarItemDocSidebarItemPropsIndex = number;

export type ThemeDocSidebarItemDocSidebarItemProps = {
  item: ThemeDocSidebarItemDocSidebarItemPropsItem;
  activePath: ThemeDocSidebarItemDocSidebarItemPropsActivePath;
  level: ThemeDocSidebarItemDocSidebarItemPropsLevel;
  index: ThemeDocSidebarItemDocSidebarItemPropsIndex;
  [key: string]: unknown;
};
