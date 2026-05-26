import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Sidebar Items - Doc Sidebar Items.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemsDocSidebarItemsPropsItems = readonly PropSidebarItem[];

export type ThemeDocSidebarItemsDocSidebarItemsPropsActivePath = string;

export type ThemeDocSidebarItemsDocSidebarItemsPropsLevel = number;

export type ThemeDocSidebarItemsDocSidebarItemsPropsClassName = string | undefined;

export type ThemeDocSidebarItemsDocSidebarItemsPropsStyle = CSSProperties | undefined;

export type ThemeDocSidebarItemsDocSidebarItemsProps = {
  items: ThemeDocSidebarItemsDocSidebarItemsPropsItems;
  activePath: ThemeDocSidebarItemsDocSidebarItemsPropsActivePath;
  level: ThemeDocSidebarItemsDocSidebarItemsPropsLevel;
  className?: ThemeDocSidebarItemsDocSidebarItemsPropsClassName;
  style?: ThemeDocSidebarItemsDocSidebarItemsPropsStyle;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemsDocSidebarItemsVisibleItems = PropSidebarItem[];

export type ThemeDocSidebarItemsDocSidebarItemsItem = PropSidebarItem;

export type ThemeDocSidebarItemsDocSidebarItemsIndex = number;

export type ThemeDocSidebarItemsDocSidebarItemsSpread = Record<string, unknown>;
