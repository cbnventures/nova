import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { GlobalVersion } from '@docusaurus/plugin-content-docs/client';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Sidebar - Doc Sidebar.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebar_Index_DocSidebar_Props_Path = string;

export type Theme_DocSidebar_Index_DocSidebar_Props_Sidebar = PropSidebarItem[];

export type Theme_DocSidebar_Index_DocSidebar_Props_OnCollapse = (() => void) | undefined;

export type Theme_DocSidebar_Index_DocSidebar_Props_IsHidden = boolean | undefined;

export type Theme_DocSidebar_Index_DocSidebar_Props_ClassName = string | undefined;

export type Theme_DocSidebar_Index_DocSidebar_Props_Style = CSSProperties | undefined;

export type Theme_DocSidebar_Index_DocSidebar_Props = {
  path: Theme_DocSidebar_Index_DocSidebar_Props_Path;
  sidebar: Theme_DocSidebar_Index_DocSidebar_Props_Sidebar;
  onCollapse?: Theme_DocSidebar_Index_DocSidebar_Props_OnCollapse;
  isHidden?: Theme_DocSidebar_Index_DocSidebar_Props_IsHidden;
  className?: Theme_DocSidebar_Index_DocSidebar_Props_ClassName;
  style?: Theme_DocSidebar_Index_DocSidebar_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocSidebar_Index_DocSidebar_NavAriaLabel = string;

export type Theme_DocSidebar_Index_DocSidebar_Versions = GlobalVersion[];
