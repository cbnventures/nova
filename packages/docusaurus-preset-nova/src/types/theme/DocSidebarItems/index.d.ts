import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Sidebar Items - Doc Sidebar Items.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarItems_Index_DocSidebarItems_Props_Items = readonly PropSidebarItem[];

export type Theme_DocSidebarItems_Index_DocSidebarItems_Props_ActivePath = string;

export type Theme_DocSidebarItems_Index_DocSidebarItems_Props_Level = number;

export type Theme_DocSidebarItems_Index_DocSidebarItems_Props_ClassName = string | undefined;

export type Theme_DocSidebarItems_Index_DocSidebarItems_Props_Style = CSSProperties | undefined;

export type Theme_DocSidebarItems_Index_DocSidebarItems_Props = {
  items: Theme_DocSidebarItems_Index_DocSidebarItems_Props_Items;
  activePath: Theme_DocSidebarItems_Index_DocSidebarItems_Props_ActivePath;
  level: Theme_DocSidebarItems_Index_DocSidebarItems_Props_Level;
  className?: Theme_DocSidebarItems_Index_DocSidebarItems_Props_ClassName;
  style?: Theme_DocSidebarItems_Index_DocSidebarItems_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocSidebarItems_Index_DocSidebarItems_VisibleItems = PropSidebarItem[];

export type Theme_DocSidebarItems_Index_DocSidebarItems_Item = PropSidebarItem;

export type Theme_DocSidebarItems_Index_DocSidebarItems_Index = number;

export type Theme_DocSidebarItems_Index_DocSidebarItems_Spread = Record<string, unknown>;
