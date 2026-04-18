import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import type { TagsListItem } from '@docusaurus/utils';

/**
 * Theme - Blog Tags List Page - Blog Tags List Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogTagsListPageBlogTagsListPagePropsSidebar = BlogSidebar;

export type ThemeBlogTagsListPageBlogTagsListPagePropsTags = TagsListItem[];

export type ThemeBlogTagsListPageBlogTagsListPageProps = {
  sidebar: ThemeBlogTagsListPageBlogTagsListPagePropsSidebar;
  tags: ThemeBlogTagsListPageBlogTagsListPagePropsTags;
  [key: string]: unknown;
};

export type ThemeBlogTagsListPageBlogTagsListPageHeading = string;

export type ThemeBlogTagsListPageBlogTagsListPagePropsTag = TagsListItem;
