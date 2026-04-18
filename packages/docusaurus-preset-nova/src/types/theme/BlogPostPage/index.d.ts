import type { BlogMetadata, BlogSidebar, PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { BlogPostContextValue } from '@docusaurus/plugin-content-blog/client';
import type { ReactNode } from 'react';

/**
 * Theme - Blog Post Page - Blog Post Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogPostPageBlogPostPagePropsSidebar = BlogSidebar;

export type ThemeBlogPostPageBlogPostPagePropsContent = PropBlogPostContent;

export type ThemeBlogPostPageBlogPostPagePropsBlogMetadata = BlogMetadata;

export type ThemeBlogPostPageBlogPostPageProps = {
  sidebar: ThemeBlogPostPageBlogPostPagePropsSidebar;
  content: ThemeBlogPostPageBlogPostPagePropsContent;
  blogMetadata: ThemeBlogPostPageBlogPostPagePropsBlogMetadata;
  [key: string]: unknown;
};

export type ThemeBlogPostPageBlogPostPageBlogPostContent = PropBlogPostContent;

/**
 * Theme - Blog Post Page - Blog Post Page Content.
 *
 * @since 0.15.0
 */
export type ThemeBlogPostPageBlogPostPageContentPropsChildren = ReactNode;

export type ThemeBlogPostPageBlogPostPageContentPropsSidebar = BlogSidebar;

export type ThemeBlogPostPageBlogPostPageContentProps = {
  sidebar: ThemeBlogPostPageBlogPostPageContentPropsSidebar;
  children: ThemeBlogPostPageBlogPostPageContentPropsChildren;
  [key: string]: unknown;
};

export type ThemeBlogPostPageBlogPostPageContentBlogPost = BlogPostContextValue;

export type ThemeBlogPostPageBlogPostPageContentMetadataNextItemTitle = string;

export type ThemeBlogPostPageBlogPostPageContentMetadataNextItemPermalink = string;

export type ThemeBlogPostPageBlogPostPageContentMetadataNextItem = {
  title: ThemeBlogPostPageBlogPostPageContentMetadataNextItemTitle;
  permalink: ThemeBlogPostPageBlogPostPageContentMetadataNextItemPermalink;
  [key: string]: unknown;
};

export type ThemeBlogPostPageBlogPostPageContentNextItem = ThemeBlogPostPageBlogPostPageContentMetadataNextItem | undefined;

export type ThemeBlogPostPageBlogPostPageContentMetadataPrevItemTitle = string;

export type ThemeBlogPostPageBlogPostPageContentMetadataPrevItemPermalink = string;

export type ThemeBlogPostPageBlogPostPageContentMetadataPrevItem = {
  title: ThemeBlogPostPageBlogPostPageContentMetadataPrevItemTitle;
  permalink: ThemeBlogPostPageBlogPostPageContentMetadataPrevItemPermalink;
  [key: string]: unknown;
};

export type ThemeBlogPostPageBlogPostPageContentPrevItem = ThemeBlogPostPageBlogPostPageContentMetadataPrevItem | undefined;

export type ThemeBlogPostPageBlogPostPageContentHideTableOfContents = boolean | undefined;

export type ThemeBlogPostPageBlogPostPageContentTocMinHeadingLevel = number | undefined;

export type ThemeBlogPostPageBlogPostPageContentTocMaxHeadingLevel = number | undefined;

export type ThemeBlogPostPageBlogPostPageContentTocSpread = Record<string, unknown>;

export type ThemeBlogPostPageBlogPostPageContentMetadataSpread = Record<string, unknown>;

export type ThemeBlogPostPageBlogPostPageContentMetadataImage = string | undefined;

export type ThemeBlogPostPageBlogPostPageContentCanRenderToc = boolean;

export type ThemeBlogPostPageBlogPostPageContentToc = ReactNode;

export type ThemeBlogPostPageBlogPostPageContentPaginatorSpread = Record<string, unknown>;
