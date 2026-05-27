import type { CSSProperties } from 'react';

/**
 * Theme - Doc Sidebar Item - Link - Doc Sidebar Item Link.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Item_Href = string;

export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Item_Label = string;

export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Item = {
  href: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Item_Href;
  label: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Item_Label;
  [key: string]: unknown;
};

export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_ActivePath = string;

export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Level = number;

export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_ClassName = string | undefined;

export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Style = CSSProperties | undefined;

export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props = {
  item: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Item;
  activePath: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_ActivePath;
  level: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Level;
  className?: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_ClassName;
  style?: Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_IsActive = boolean;

export type Theme_DocSidebarItem_Link_Index_DocSidebarItemLink_AriaCurrent = 'page' | undefined;
