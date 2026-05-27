import type { PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog Archive Page - Blog Archive Page.
 *
 * @since 0.15.0
 */
export type Theme_BlogArchivePage_Index_BlogArchivePage_ArchiveBlogPost = PropBlogPostContent;

export type Theme_BlogArchivePage_Index_BlogArchivePage_ArchiveBlogPosts = readonly Theme_BlogArchivePage_Index_BlogArchivePage_ArchiveBlogPost[];

export type Theme_BlogArchivePage_Index_BlogArchivePage_Props_Archive_BlogPosts = readonly Theme_BlogArchivePage_Index_BlogArchivePage_ArchiveBlogPost[];

export type Theme_BlogArchivePage_Index_BlogArchivePage_Props_Archive = {
  blogPosts: Theme_BlogArchivePage_Index_BlogArchivePage_Props_Archive_BlogPosts;
  [key: string]: unknown;
};

export type Theme_BlogArchivePage_Index_BlogArchivePage_Props_ClassName = string | undefined;

export type Theme_BlogArchivePage_Index_BlogArchivePage_Props_Style = CSSProperties | undefined;

export type Theme_BlogArchivePage_Index_BlogArchivePage_Props = {
  archive: Theme_BlogArchivePage_Index_BlogArchivePage_Props_Archive;
  className?: Theme_BlogArchivePage_Index_BlogArchivePage_Props_ClassName;
  style?: Theme_BlogArchivePage_Index_BlogArchivePage_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogArchivePage_Index_BlogArchivePage_DateTimeFormat = Intl.DateTimeFormat;

export type Theme_BlogArchivePage_Index_BlogArchivePage_YearGroups = Theme_BlogArchivePage_Index_BlogArchivePage_YearGroup[];

export type Theme_BlogArchivePage_Index_BlogArchivePage_YearGroup = {
  year: Theme_BlogArchivePage_Index_BlogArchivePage_YearGroup_Year;
  posts: Theme_BlogArchivePage_Index_BlogArchivePage_YearGroup_Posts;
};

export type Theme_BlogArchivePage_Index_BlogArchivePage_YearPost = PropBlogPostContent;

export type Theme_BlogArchivePage_Index_BlogArchivePage_YearPostMetadata_Date = string;

export type Theme_BlogArchivePage_Index_BlogArchivePage_YearPostMetadata_Permalink = string;

export type Theme_BlogArchivePage_Index_BlogArchivePage_YearPostMetadata_Title = string;

export type Theme_BlogArchivePage_Index_BlogArchivePage_YearPostMetadata = {
  date: Theme_BlogArchivePage_Index_BlogArchivePage_YearPostMetadata_Date;
  permalink: Theme_BlogArchivePage_Index_BlogArchivePage_YearPostMetadata_Permalink;
  title: Theme_BlogArchivePage_Index_BlogArchivePage_YearPostMetadata_Title;
  [key: string]: unknown;
};

export type Theme_BlogArchivePage_Index_BlogArchivePage_FormattedDate = string;

export type Theme_BlogArchivePage_Index_BlogArchivePage_YearGroup_Posts = Theme_BlogArchivePage_Index_BlogArchivePage_YearPost[];

export type Theme_BlogArchivePage_Index_BlogArchivePage_YearGroup_Year = string;

/**
 * Theme - Blog Archive Page - List Posts By Years.
 *
 * @since 0.15.0
 */
export type Theme_BlogArchivePage_Index_BlogArchivePage_Heading = string;

export type Theme_BlogArchivePage_Index_BlogArchivePage_Description = string;

export type Theme_BlogArchivePage_Index_ListPostsByYears_BlogPosts = readonly Theme_BlogArchivePage_Index_BlogArchivePage_YearPost[];

export type Theme_BlogArchivePage_Index_ListPostsByYears_PostsByYear = Map<Theme_BlogArchivePage_Index_BlogArchivePage_YearGroup_Year, Theme_BlogArchivePage_Index_BlogArchivePage_YearPost[]>;

export type Theme_BlogArchivePage_Index_ListPostsByYears_Year = string;

export type Theme_BlogArchivePage_Index_ListPostsByYears_ExistingPosts = Theme_BlogArchivePage_Index_BlogArchivePage_YearPost[];
