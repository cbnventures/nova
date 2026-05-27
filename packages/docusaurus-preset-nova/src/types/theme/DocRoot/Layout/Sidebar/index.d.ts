import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type {
  CSSProperties,
  Dispatch,
  SetStateAction,
} from 'react';

/**
 * Theme - Doc Root - Layout - Sidebar - Doc Root Layout Sidebar.
 *
 * @since 0.15.0
 */
export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props_Sidebar = PropSidebarItem[];

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props_ClassName = string | undefined;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props_Style = CSSProperties | undefined;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props = {
  sidebar: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props_Sidebar;
  className?: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props_ClassName;
  style?: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ThemeConfigCast = unknown;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ThemeConfig = Record<string, unknown>;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_DocsConfig_Sidebar = Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SidebarConfig;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_DocsConfig = {
  sidebar: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_DocsConfig_Sidebar;
  [key: string]: unknown;
};

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SidebarConfig_Hideable = boolean;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SidebarConfig = {
  hideable: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SidebarConfig_Hideable;
  [key: string]: unknown;
};

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Hideable = boolean;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_LocationPathname = string;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Location = Record<string, unknown> & {
  pathname: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_LocationPathname;
};

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Pathname = string;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_InitialCollapsed = boolean;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_StoredValue = string | null;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_CollapsedState = [Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Collapsed, Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SetCollapsed];

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Collapsed = boolean;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SetCollapsed = Dispatch<SetStateAction<Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Collapsed>>;

export type Theme_DocRoot_Layout_Sidebar_Index_SidebarExpandAriaLabel = string;

export type Theme_DocRoot_Layout_Sidebar_Index_SidebarCollapseAriaLabel = string;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_AsideClassName = string;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ToggleLabel = string;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ToggleIndicator = string;

export type Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_NextCollapsedString = string;
