import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Sidebar Item - Doc Sidebar Item.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarItem_Index_DocSidebarItem_Props_Item = PropSidebarItem;

export type Theme_DocSidebarItem_Index_DocSidebarItem_Props_ActivePath = string;

export type Theme_DocSidebarItem_Index_DocSidebarItem_Props_Level = number;

export type Theme_DocSidebarItem_Index_DocSidebarItem_Props_Index = number;

export type Theme_DocSidebarItem_Index_DocSidebarItem_Props_ClassName = string | undefined;

export type Theme_DocSidebarItem_Index_DocSidebarItem_Props_Style = CSSProperties | undefined;

export type Theme_DocSidebarItem_Index_DocSidebarItem_Props = {
  item: Theme_DocSidebarItem_Index_DocSidebarItem_Props_Item;
  activePath: Theme_DocSidebarItem_Index_DocSidebarItem_Props_ActivePath;
  level: Theme_DocSidebarItem_Index_DocSidebarItem_Props_Level;
  index: Theme_DocSidebarItem_Index_DocSidebarItem_Props_Index;
  className?: Theme_DocSidebarItem_Index_DocSidebarItem_Props_ClassName;
  style?: Theme_DocSidebarItem_Index_DocSidebarItem_Props_Style;
  [key: string]: unknown;
};
