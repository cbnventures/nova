import type {
  AuthorItemProp,
  BlogPaginatedMetadata,
  BlogSidebar,
  PropBlogPostContent,
} from '@docusaurus/plugin-content-blog';
import type { useBlogMetadata } from '@docusaurus/plugin-content-blog/client';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog - Pages - Blog Authors Posts Page - Blog Authors Posts Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsSidebar = BlogSidebar;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsAuthor = AuthorItemProp;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsListMetadata = BlogPaginatedMetadata;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItemContent = PropBlogPostContent;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItem = {
  content: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItemContent;
  [key: string]: unknown;
};

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItems = readonly ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItem[];

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsClassName = string | undefined;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsStyle = CSSProperties | undefined;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageProps = {
  sidebar: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsSidebar;
  author: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsAuthor;
  listMetadata: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsListMetadata;
  items: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItems;
  className?: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsClassName;
  style?: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsStyle;
  [key: string]: unknown;
};

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageTitle = string;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageDescription = string | undefined;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageItem = ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItem;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageItemContent = PropBlogPostContent;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageAuthorName = string | undefined;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageAuthorCount = number;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePostSuffix = string;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePostPluralSuffix = string;

/**
 * Theme - Blog - Pages - Blog Authors Posts Page - View All Authors Link.
 *
 * @since 0.18.0
 */
export type ThemeBlogPagesBlogAuthorsPostsPageViewAllAuthorsLinkBlogMetadata = ReturnType<typeof useBlogMetadata>;
