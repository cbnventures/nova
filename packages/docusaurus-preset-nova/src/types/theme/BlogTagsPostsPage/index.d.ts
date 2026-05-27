import type { BlogPaginatedMetadata, BlogSidebar, PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { TagModule } from '@docusaurus/utils';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog Tags Posts Page - Blog Tags Posts Page.
 *
 * @since 0.15.0
 */
export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_Sidebar = BlogSidebar;

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_Tag = TagModule;

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_ListMetadata = BlogPaginatedMetadata;

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_PropsItem_Content = PropBlogPostContent;

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_PropsItem = {
  content: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_PropsItem_Content;
  [key: string]: unknown;
};

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_Items = readonly Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_PropsItem[];

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_ClassName = string | undefined;

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_Style = CSSProperties | undefined;

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props = {
  sidebar: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_Sidebar;
  tag: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_Tag;
  listMetadata: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_ListMetadata;
  items: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_Items;
  className?: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_ClassName;
  style?: Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_Title = string;

export type Theme_BlogTagsPostsPage_Index_BlogTagsPostsPage_ViewAllTags = string;
