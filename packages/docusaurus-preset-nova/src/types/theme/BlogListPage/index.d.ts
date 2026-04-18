import type { BlogPaginatedMetadata, BlogSidebar, PropBlogPostContent } from '@docusaurus/plugin-content-blog';

/**
 * Theme - Blog List Page - Blog List Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogListPageBlogListPagePropsSidebar = BlogSidebar;

export type ThemeBlogListPageBlogListPagePropsMetadata = BlogPaginatedMetadata;

export type ThemeBlogListPageBlogListPagePropsItemContent = PropBlogPostContent;

export type ThemeBlogListPageBlogListPagePropsItem = {
  content: ThemeBlogListPageBlogListPagePropsItemContent;
  [key: string]: unknown;
};

export type ThemeBlogListPageBlogListPagePropsItems = readonly ThemeBlogListPageBlogListPagePropsItem[];

export type ThemeBlogListPageBlogListPageProps = {
  sidebar: ThemeBlogListPageBlogListPagePropsSidebar;
  metadata: ThemeBlogListPageBlogListPagePropsMetadata;
  items: ThemeBlogListPageBlogListPagePropsItems;
  [key: string]: unknown;
};

export type ThemeBlogListPageBlogListPageTitle = string;
