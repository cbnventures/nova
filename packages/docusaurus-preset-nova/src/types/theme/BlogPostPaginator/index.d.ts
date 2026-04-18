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

export type ThemeBlogPostPaginatorBlogPostPaginatorProps = {
  nextItem?: ThemeBlogPostPaginatorBlogPostPaginatorPropsNextItem;
  prevItem?: ThemeBlogPostPaginatorBlogPostPaginatorPropsPrevItem;
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

export type ThemeBlogPostPaginatorBlogPostPaginatorGoBackLabel = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorContinueReadingLabel = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorGoBackAriaLabel = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorPreviousPermalink = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorPreviousPost = ThemeBlogPostPaginatorBlogPostPaginatorBlogPost | undefined;

export type ThemeBlogPostPaginatorBlogPostPaginatorPreviousDescription = string | undefined;

export type ThemeBlogPostPaginatorBlogPostPaginatorContinueReadingAriaLabel = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorNextPermalink = string;

export type ThemeBlogPostPaginatorBlogPostPaginatorNextPost = ThemeBlogPostPaginatorBlogPostPaginatorBlogPost | undefined;

export type ThemeBlogPostPaginatorBlogPostPaginatorNextDescription = string | undefined;
