import type { CSSProperties } from 'react';

/**
 * Theme - Blog Post Paginator - Blog Post Paginator.
 *
 * @since 0.15.0
 */
export type ThemeBlogPostPaginatorBlogPostPaginatorItemTitle = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorItemPermalink = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorItem = {
  title: ThemeBlogPostPaginatorBlogPostPaginatorItemTitle;
  permalink: ThemeBlogPostPaginatorBlogPostPaginatorItemPermalink;
  [key: string]: unknown;
};

export type ThemeBlogPostPaginatorBlogPostPaginatorPropsNextItem = ThemeBlogPostPaginatorBlogPostPaginatorItem | undefined;

export type ThemeBlogPostPaginatorBlogPostPaginatorPropsPrevItem = ThemeBlogPostPaginatorBlogPostPaginatorItem | undefined;

export type ThemeBlogPostPaginatorBlogPostPaginatorPropsClassName = string | undefined;

export type ThemeBlogPostPaginatorBlogPostPaginatorPropsStyle = CSSProperties | undefined;

export type ThemeBlogPostPaginatorBlogPostPaginatorProps = {
  nextItem?: ThemeBlogPostPaginatorBlogPostPaginatorPropsNextItem;
  prevItem?: ThemeBlogPostPaginatorBlogPostPaginatorPropsPrevItem;
  className?: ThemeBlogPostPaginatorBlogPostPaginatorPropsClassName;
  style?: ThemeBlogPostPaginatorBlogPostPaginatorPropsStyle;
  [key: string]: unknown;
};

export type ThemeBlogPostPaginatorBlogPostPaginatorBlogPostTitle = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorBlogPostDescription = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorBlogPostPermalink = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorBlogPostDate = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorBlogPost = {
  title: ThemeBlogPostPaginatorBlogPostPaginatorBlogPostTitle;
  description: ThemeBlogPostPaginatorBlogPostPaginatorBlogPostDescription;
  permalink: ThemeBlogPostPaginatorBlogPostPaginatorBlogPostPermalink;
  date: ThemeBlogPostPaginatorBlogPostPaginatorBlogPostDate;
};

export type ThemeBlogPostPaginatorBlogPostPaginatorGlobalData = {
  blogPosts?: ThemeBlogPostPaginatorBlogPostPaginatorBlogPosts;
  [key: string]: unknown;
};

export type ThemeBlogPostPaginatorBlogPostPaginatorBlogPosts = ThemeBlogPostPaginatorBlogPostPaginatorBlogPost[];

export type ThemeBlogPostPaginatorBlogPostPaginatorNavAriaLabel = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorHeading = string;

/**
 * Theme - Blog Post Paginator - Next Link.
 *
 * @since 0.18.0
 */
export type ThemeBlogPostPaginatorNextLinkPropsNextItem = ThemeBlogPostPaginatorBlogPostPaginatorItem;

export type ThemeBlogPostPaginatorNextLinkPropsBlogPosts = ThemeBlogPostPaginatorBlogPostPaginatorBlogPosts;

export type ThemeBlogPostPaginatorNextLinkPropsClassName = string | undefined;

export type ThemeBlogPostPaginatorNextLinkPropsStyle = CSSProperties | undefined;

export type ThemeBlogPostPaginatorNextLinkProps = {
  nextItem: ThemeBlogPostPaginatorNextLinkPropsNextItem;
  blogPosts: ThemeBlogPostPaginatorNextLinkPropsBlogPosts;
  className?: ThemeBlogPostPaginatorNextLinkPropsClassName;
  style?: ThemeBlogPostPaginatorNextLinkPropsStyle;
  [key: string]: unknown;
};

export type ThemeBlogPostPaginatorNextLinkLabel = string;

export type ThemeBlogPostPaginatorNextLinkAriaLabel = string;

export type ThemeBlogPostPaginatorNextLinkPermalink = string;

export type ThemeBlogPostPaginatorNextLinkPost = ThemeBlogPostPaginatorBlogPostPaginatorBlogPost | undefined;

export type ThemeBlogPostPaginatorNextLinkDescription = string | undefined;

/**
 * Theme - Blog Post Paginator - Prev Link.
 *
 * @since 0.18.0
 */
export type ThemeBlogPostPaginatorPrevLinkPropsPrevItem = ThemeBlogPostPaginatorBlogPostPaginatorItem;

export type ThemeBlogPostPaginatorPrevLinkPropsBlogPosts = ThemeBlogPostPaginatorBlogPostPaginatorBlogPosts;

export type ThemeBlogPostPaginatorPrevLinkPropsClassName = string | undefined;

export type ThemeBlogPostPaginatorPrevLinkPropsStyle = CSSProperties | undefined;

export type ThemeBlogPostPaginatorPrevLinkProps = {
  prevItem: ThemeBlogPostPaginatorPrevLinkPropsPrevItem;
  blogPosts: ThemeBlogPostPaginatorPrevLinkPropsBlogPosts;
  className?: ThemeBlogPostPaginatorPrevLinkPropsClassName;
  style?: ThemeBlogPostPaginatorPrevLinkPropsStyle;
  [key: string]: unknown;
};

export type ThemeBlogPostPaginatorPrevLinkLabel = string;

export type ThemeBlogPostPaginatorPrevLinkAriaLabel = string;

export type ThemeBlogPostPaginatorPrevLinkPermalink = string;

export type ThemeBlogPostPaginatorPrevLinkPost = ThemeBlogPostPaginatorBlogPostPaginatorBlogPost | undefined;

export type ThemeBlogPostPaginatorPrevLinkDescription = string | undefined;
