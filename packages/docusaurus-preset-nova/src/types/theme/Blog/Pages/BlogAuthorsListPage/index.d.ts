import type { BlogSidebar } from '@docusaurus/plugin-content-blog';

/**
 * Theme - Blog - Pages - Blog Authors List Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogPagesBlogAuthorsListPageAuthorImageUrl = string | undefined;

export type ThemeBlogPagesBlogAuthorsListPageAuthorTitle = string | undefined;

export type ThemeBlogPagesBlogAuthorsListPageAuthorPage = {
  permalink: string;
  [key: string]: unknown;
} | null | undefined;

export type ThemeBlogPagesBlogAuthorsListPageAuthorPermalink = string | undefined;

/**
 * Theme - Blog - Pages - Blog Authors List Page - Blog Authors List Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsSidebar = BlogSidebar;

export type ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsAuthorName = string | undefined;

export type ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsAuthorKey = string;

export type ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsAuthor = {
  name: ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsAuthorName;
  key: ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsAuthorKey;
  [key: string]: unknown;
};

export type ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsAuthors = ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsAuthor[];

export type ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageProps = {
  sidebar: ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsSidebar;
  authors: ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsAuthors;
};

export type ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageHeading = string;

export type ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPageAuthor = ThemeBlogPagesBlogAuthorsListPageBlogAuthorsListPagePropsAuthor;
