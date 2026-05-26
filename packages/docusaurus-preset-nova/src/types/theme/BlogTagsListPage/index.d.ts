import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import type { TagsListItem } from '@docusaurus/utils';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog Tags List Page - Blog Tags List Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogTagsListPageBlogTagsListPagePropsSidebar = BlogSidebar;

export type ThemeBlogTagsListPageBlogTagsListPagePropsTags = TagsListItem[];

export type ThemeBlogTagsListPageBlogTagsListPagePropsClassName = string | undefined;

export type ThemeBlogTagsListPageBlogTagsListPagePropsStyle = CSSProperties | undefined;

export type ThemeBlogTagsListPageBlogTagsListPageProps = {
  sidebar: ThemeBlogTagsListPageBlogTagsListPagePropsSidebar;
  tags: ThemeBlogTagsListPageBlogTagsListPagePropsTags;
  className?: ThemeBlogTagsListPageBlogTagsListPagePropsClassName;
  style?: ThemeBlogTagsListPageBlogTagsListPagePropsStyle;
  [key: string]: unknown;
};

export type ThemeBlogTagsListPageBlogTagsListPageHeading = string;

export type ThemeBlogTagsListPageBlogTagsListPagePropsTag = TagsListItem;
