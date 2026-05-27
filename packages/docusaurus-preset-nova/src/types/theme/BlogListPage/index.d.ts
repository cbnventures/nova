import type { BlogPaginatedMetadata, BlogSidebar, PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog List Page - Blog List Page.
 *
 * @since 0.15.0
 */
export type Theme_BlogListPage_Index_BlogListPage_Props_Sidebar = BlogSidebar;

export type Theme_BlogListPage_Index_BlogListPage_Props_Metadata = BlogPaginatedMetadata;

export type Theme_BlogListPage_Index_BlogListPage_PropsItem_Content = PropBlogPostContent;

export type Theme_BlogListPage_Index_BlogListPage_PropsItem = {
  content: Theme_BlogListPage_Index_BlogListPage_PropsItem_Content;
  [key: string]: unknown;
};

export type Theme_BlogListPage_Index_BlogListPage_Props_Items = readonly Theme_BlogListPage_Index_BlogListPage_PropsItem[];

export type Theme_BlogListPage_Index_BlogListPage_Props_ClassName = string | undefined;

export type Theme_BlogListPage_Index_BlogListPage_Props_Style = CSSProperties | undefined;

export type Theme_BlogListPage_Index_BlogListPage_Props = {
  sidebar: Theme_BlogListPage_Index_BlogListPage_Props_Sidebar;
  metadata: Theme_BlogListPage_Index_BlogListPage_Props_Metadata;
  items: Theme_BlogListPage_Index_BlogListPage_Props_Items;
  className?: Theme_BlogListPage_Index_BlogListPage_Props_ClassName;
  style?: Theme_BlogListPage_Index_BlogListPage_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogListPage_Index_BlogListPage_Title = string;
