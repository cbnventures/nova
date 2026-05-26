import type { BlogPaginatedMetadata, BlogSidebar, PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { TagModule } from '@docusaurus/utils';
import type { CSSProperties } from 'react';

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

export type ThemeBlogTagsPostsPageBlogTagsPostsPagePropsClassName = string | undefined;

export type ThemeBlogTagsPostsPageBlogTagsPostsPagePropsStyle = CSSProperties | undefined;

export type ThemeBlogTagsPostsPageBlogTagsPostsPageProps = {
  sidebar: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsSidebar;
  tag: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsTag;
  listMetadata: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsListMetadata;
  items: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsItems;
  className?: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsClassName;
  style?: ThemeBlogTagsPostsPageBlogTagsPostsPagePropsStyle;
  [key: string]: unknown;
};

export type ThemeBlogTagsPostsPageBlogTagsPostsPageTitle = string;

export type ThemeBlogTagsPostsPageBlogTagsPostsPageViewAllTags = string;
