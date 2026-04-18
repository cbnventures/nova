import type { BlogPaginatedMetadata, BlogSidebar, PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { TagModule } from '@docusaurus/utils';

/**
 * Theme - Blog Tags Posts Page - Blog Tags Posts Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogTagsPostsPageBlogTagsPostsPagePropsSidebar = BlogSidebar;

export type ThemeBlogTagsPostsPageBlogTagsPostsPagePropsTag = TagModule;

export type ThemeBlogTagsPostsPageBlogTagsPostsPagePropsListMetadata = BlogPaginatedMetadata;

export type ThemeBlogTagsPostsPageBlogTagsPostsPagePropsItemContent = PropBlogPostContent;

export type ThemeBlogTagsPostsPageBlogTagsPostsPagePropsItem = {
  content: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsItemContent;
  [key: string]: unknown;
};

export type ThemeBlogTagsPostsPageBlogTagsPostsPagePropsItems = readonly ThemeBlogTagsPostsPageBlogTagsPostsPagePropsItem[];

export type ThemeBlogTagsPostsPageBlogTagsPostsPageProps = {
  sidebar: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsSidebar;
  tag: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsTag;
  listMetadata: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsListMetadata;
  items: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsItems;
  [key: string]: unknown;
};

export type ThemeBlogTagsPostsPageBlogTagsPostsPageTitle = string;

export type ThemeBlogTagsPostsPageBlogTagsPostsPageViewAllTags = string;
