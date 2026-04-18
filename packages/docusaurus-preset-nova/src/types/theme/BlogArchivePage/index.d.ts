import type { PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { ReactNode } from 'react';

/**
 * Theme - Blog Archive Page - Blog Archive Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogArchivePageBlogArchivePageArchiveBlogPost = PropBlogPostContent;

export type ThemeBlogArchivePageBlogArchivePageArchiveBlogPosts = readonly ThemeBlogArchivePageBlogArchivePageArchiveBlogPost[];

export type ThemeBlogArchivePageBlogArchivePagePropsArchiveBlogPosts = readonly ThemeBlogArchivePageBlogArchivePageArchiveBlogPost[];

export type ThemeBlogArchivePageBlogArchivePagePropsArchive = {
  blogPosts: ThemeBlogArchivePageBlogArchivePagePropsArchiveBlogPosts;
  [key: string]: unknown;
};

export type ThemeBlogArchivePageBlogArchivePageProps = {
  archive: ThemeBlogArchivePageBlogArchivePagePropsArchive;
  [key: string]: unknown;
};

export type ThemeBlogArchivePageBlogArchivePageDateTimeFormat = Intl.DateTimeFormat;

export type ThemeBlogArchivePageYearGroups = ThemeBlogArchivePageYearGroup[];

export type ThemeBlogArchivePageYearGroup = {
  year: ThemeBlogArchivePageYear;
  posts: ThemeBlogArchivePageYearPosts;
};

export type ThemeBlogArchivePageYearPost = PropBlogPostContent;

export type ThemeBlogArchivePageYearPostMetadataDate = string;

export type ThemeBlogArchivePageYearPostMetadataPermalink = string;

export type ThemeBlogArchivePageYearPostMetadataTitle = string;

export type ThemeBlogArchivePageYearPostMetadata = {
  date: ThemeBlogArchivePageYearPostMetadataDate;
  permalink: ThemeBlogArchivePageYearPostMetadataPermalink;
  title: ThemeBlogArchivePageYearPostMetadataTitle;
  [key: string]: unknown;
};

export type ThemeBlogArchivePageBlogArchivePageFormattedDate = string;

export type ThemeBlogArchivePageBlogArchivePageTitle = ReactNode;

export type ThemeBlogArchivePageYearPosts = ThemeBlogArchivePageYearPost[];

export type ThemeBlogArchivePageYear = string;

/**
 * Theme - Blog Archive Page - List Posts By Years.
 *
 * @since 0.15.0
 */
export type ThemeBlogArchivePageBlogArchivePageHeading = string;

export type ThemeBlogArchivePageListPostsByYearsBlogPosts = readonly ThemeBlogArchivePageYearPost[];

export type ThemeBlogArchivePageListPostsByYearsPostsByYear = Map<ThemeBlogArchivePageYear, ThemeBlogArchivePageYearPost[]>;

export type ThemeBlogArchivePageListPostsByYearsYear = string;

export type ThemeBlogArchivePageListPostsByYearsExistingPosts = ThemeBlogArchivePageYearPost[];
