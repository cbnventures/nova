import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import type { TagsListItem } from '@docusaurus/utils';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog Tags List Page - Blog Tags List Page.
 *
 * @since 0.15.0
 */
export type Theme_BlogTagsListPage_Index_BlogTagsListPage_Props_Sidebar = BlogSidebar;

export type Theme_BlogTagsListPage_Index_BlogTagsListPage_Props_Tags = TagsListItem[];

export type Theme_BlogTagsListPage_Index_BlogTagsListPage_Props_ClassName = string | undefined;

export type Theme_BlogTagsListPage_Index_BlogTagsListPage_Props_Style = CSSProperties | undefined;

export type Theme_BlogTagsListPage_Index_BlogTagsListPage_Props = {
  sidebar: Theme_BlogTagsListPage_Index_BlogTagsListPage_Props_Sidebar;
  tags: Theme_BlogTagsListPage_Index_BlogTagsListPage_Props_Tags;
  className?: Theme_BlogTagsListPage_Index_BlogTagsListPage_Props_ClassName;
  style?: Theme_BlogTagsListPage_Index_BlogTagsListPage_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogTagsListPage_Index_BlogTagsListPage_Heading = string;

export type Theme_BlogTagsListPage_Index_BlogTagsListPage_PropsTag = TagsListItem;
