import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Blog Layout - Blog Layout.
 *
 * @since 0.15.0
 */
export type Theme_BlogLayout_Index_BlogLayout_Sidebar = BlogSidebar;

export type Theme_BlogLayout_Index_BlogLayout_Toc = ReactNode;

export type Theme_BlogLayout_Index_BlogLayout_Children = ReactNode;

export type Theme_BlogLayout_Index_BlogLayout_Props_Sidebar = BlogSidebar;

export type Theme_BlogLayout_Index_BlogLayout_Props_Toc = ReactNode;

export type Theme_BlogLayout_Index_BlogLayout_Props_Children = ReactNode;

export type Theme_BlogLayout_Index_BlogLayout_Props_Header = ReactNode;

export type Theme_BlogLayout_Index_BlogLayout_Props_ShowHeader = boolean;

export type Theme_BlogLayout_Index_BlogLayout_Props_ClassName = string | undefined;

export type Theme_BlogLayout_Index_BlogLayout_Props_Style = CSSProperties | undefined;

export type Theme_BlogLayout_Index_BlogLayout_Props = {
  sidebar?: Theme_BlogLayout_Index_BlogLayout_Props_Sidebar;
  toc?: Theme_BlogLayout_Index_BlogLayout_Props_Toc;
  header?: Theme_BlogLayout_Index_BlogLayout_Props_Header;
  showHeader?: Theme_BlogLayout_Index_BlogLayout_Props_ShowHeader;
  children: Theme_BlogLayout_Index_BlogLayout_Props_Children;
  className?: Theme_BlogLayout_Index_BlogLayout_Props_ClassName;
  style?: Theme_BlogLayout_Index_BlogLayout_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogLayout_Index_BlogLayout_ThemeConfigCast = unknown;

export type Theme_BlogLayout_Index_BlogLayout_ThemeConfig = Record<string, unknown>;

export type Theme_BlogLayout_Index_BlogLayout_BlogConfig_Layout = Theme_BlogLayout_Index_BlogLayout;

export type Theme_BlogLayout_Index_BlogLayout_BlogConfig = {
  layout: Theme_BlogLayout_Index_BlogLayout_BlogConfig_Layout;
  [key: string]: unknown;
};

export type Theme_BlogLayout_Index_BlogLayout_Heading = string;

export type Theme_BlogLayout_Index_BlogLayout_Description = string;

export type Theme_BlogLayout_Index_BlogLayout = {
  heading: Theme_BlogLayout_Index_BlogLayout_Heading;
  description: Theme_BlogLayout_Index_BlogLayout_Description;
};

export type Theme_BlogLayout_Index_BlogLayout_HasSidebar = boolean;

export type Theme_BlogLayout_Index_BlogLayout_HasToc = boolean;

export type Theme_BlogLayout_Index_BlogLayout_ShowHeader = boolean;

export type Theme_BlogLayout_Index_BlogLayout_MainClassName = string;
