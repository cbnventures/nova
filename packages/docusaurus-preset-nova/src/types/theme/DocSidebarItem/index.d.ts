import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Sidebar Item - Doc Sidebar Item.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemDocSidebarItemPropsItem = PropSidebarItem;

export type ThemeDocSidebarItemDocSidebarItemPropsActivePath = string;

export type ThemeDocSidebarItemDocSidebarItemPropsLevel = number;

export type ThemeDocSidebarItemDocSidebarItemPropsIndex = number;

export type ThemeDocSidebarItemDocSidebarItemPropsClassName = string | undefined;

export type ThemeDocSidebarItemDocSidebarItemPropsStyle = CSSProperties | undefined;

export type ThemeDocSidebarItemDocSidebarItemProps = {
  item: ThemeDocSidebarItemDocSidebarItemPropsItem;
  activePath: ThemeDocSidebarItemDocSidebarItemPropsActivePath;
  level: ThemeDocSidebarItemDocSidebarItemPropsLevel;
  index: ThemeDocSidebarItemDocSidebarItemPropsIndex;
  className?: ThemeDocSidebarItemDocSidebarItemPropsClassName;
  style?: ThemeDocSidebarItemDocSidebarItemPropsStyle;
  [key: string]: unknown;
};
