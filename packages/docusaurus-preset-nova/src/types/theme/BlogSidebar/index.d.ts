import type { BlogSidebar, BlogSidebarItem } from '@docusaurus/plugin-content-blog';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog Sidebar - Blog Sidebar.
 *
 * @since 0.15.0
 */
export type Theme_BlogSidebar_Index_BlogSidebar_Props_Sidebar = BlogSidebar | undefined;

export type Theme_BlogSidebar_Index_BlogSidebar_Props_ClassName = string | undefined;

export type Theme_BlogSidebar_Index_BlogSidebar_Props_Style = CSSProperties | undefined;

export type Theme_BlogSidebar_Index_BlogSidebar_Props = {
  sidebar?: Theme_BlogSidebar_Index_BlogSidebar_Props_Sidebar;
  className?: Theme_BlogSidebar_Index_BlogSidebar_Props_ClassName;
  style?: Theme_BlogSidebar_Index_BlogSidebar_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogSidebar_Index_BlogSidebar_ThemeConfigCast = unknown;

export type Theme_BlogSidebar_Index_BlogSidebar_ThemeConfig = Record<string, unknown>;

export type Theme_BlogSidebar_Index_BlogSidebar_BlogConfig_Sidebar = Theme_BlogSidebar_Index_BlogSidebar_SidebarConfig;

export type Theme_BlogSidebar_Index_BlogSidebar_BlogConfig = {
  sidebar: Theme_BlogSidebar_Index_BlogSidebar_BlogConfig_Sidebar;
  [key: string]: unknown;
};

export type Theme_BlogSidebar_Index_BlogSidebar_SidebarConfig_GroupByYear = boolean;

export type Theme_BlogSidebar_Index_BlogSidebar_SidebarConfig = {
  groupByYear: Theme_BlogSidebar_Index_BlogSidebar_SidebarConfig_GroupByYear;
  [key: string]: unknown;
};

export type Theme_BlogSidebar_Index_BlogSidebar_GroupByYear = boolean;

export type Theme_BlogSidebar_Index_BlogSidebar_GlobalData = Record<string, unknown>;

export type Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor_ImageURL = string | undefined;

export type Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor_Key = string;

export type Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor_Name = string | undefined;

export type Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor_Permalink = string | undefined;

export type Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor = {
  imageURL: Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor_ImageURL;
  key: Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor_Key;
  name: Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor_Name;
  permalink: Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor_Permalink;
};

export type Theme_BlogSidebar_Index_BlogSidebar_BlogAuthors = Theme_BlogSidebar_Index_BlogSidebar_BlogAuthor[];

export type Theme_BlogSidebar_Index_BlogSidebar_AriaLabel = string;

export type Theme_BlogSidebar_Index_BlogSidebar_AuthorsLabel = string;

export type Theme_BlogSidebar_Index_BlogSidebar_SubscribeLabel = string;

export type Theme_BlogSidebar_Index_BlogSidebar_FeedUrl = string;

export type Theme_BlogSidebar_Index_BlogSidebar_CurrentYear = string;

export type Theme_BlogSidebar_Index_BlogSidebar_Sidebar = BlogSidebar;

export type Theme_BlogSidebar_Index_BlogSidebar_Title = string;

export type Theme_BlogSidebar_Index_BlogSidebar_Items = BlogSidebarItem[];

export type Theme_BlogSidebar_Index_BlogSidebar_Item = BlogSidebarItem;

export type Theme_BlogSidebar_Index_BlogSidebar_ItemDate = Date;

export type Theme_BlogSidebar_Index_BlogSidebar_ItemFullYear = number;

export type Theme_BlogSidebar_Index_BlogSidebar_ItemYear = string;

export type Theme_BlogSidebar_Index_BlogSidebar_ShowYearHeading = boolean;
