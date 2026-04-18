import type { DocusaurusContext } from '@docusaurus/types';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Components - Blog Preview - Components Blog Preview.
 *
 * @since 0.15.0
 */
export type ComponentsBlogPreviewComponentsBlogPreviewPostTitle = string;

export type ComponentsBlogPreviewComponentsBlogPreviewPostDescription = string;

export type ComponentsBlogPreviewComponentsBlogPreviewPostPermalink = string;

export type ComponentsBlogPreviewComponentsBlogPreviewPostDate = string;

export type ComponentsBlogPreviewComponentsBlogPreviewPost = {
  title: ComponentsBlogPreviewComponentsBlogPreviewPostTitle;
  description: ComponentsBlogPreviewComponentsBlogPreviewPostDescription;
  permalink: ComponentsBlogPreviewComponentsBlogPreviewPostPermalink;
  date: ComponentsBlogPreviewComponentsBlogPreviewPostDate;
};

export type ComponentsBlogPreviewComponentsBlogPreviewPosts = ComponentsBlogPreviewComponentsBlogPreviewPost[];

export type ComponentsBlogPreviewComponentsBlogPreviewPropsHeading = string;

export type ComponentsBlogPreviewComponentsBlogPreviewPropsDescription = string | undefined;

export type ComponentsBlogPreviewComponentsBlogPreviewPropsPosts = ComponentsBlogPreviewComponentsBlogPreviewPost[];

export type ComponentsBlogPreviewComponentsBlogPreviewPropsSurface = SharedSurface | undefined;

export type ComponentsBlogPreviewComponentsBlogPreviewPropsAuto = boolean | undefined;

export type ComponentsBlogPreviewComponentsBlogPreviewPropsLimit = number | undefined;

export type ComponentsBlogPreviewComponentsBlogPreviewPropsSort = 'newest' | 'oldest' | undefined;

export type ComponentsBlogPreviewComponentsBlogPreviewProps = {
  heading: ComponentsBlogPreviewComponentsBlogPreviewPropsHeading;
  description?: ComponentsBlogPreviewComponentsBlogPreviewPropsDescription;
  posts?: ComponentsBlogPreviewComponentsBlogPreviewPropsPosts;
  surface?: ComponentsBlogPreviewComponentsBlogPreviewPropsSurface;
  auto?: ComponentsBlogPreviewComponentsBlogPreviewPropsAuto;
  limit?: ComponentsBlogPreviewComponentsBlogPreviewPropsLimit;
  sort?: ComponentsBlogPreviewComponentsBlogPreviewPropsSort;
};

export type ComponentsBlogPreviewComponentsBlogPreviewContext = DocusaurusContext;

export type ComponentsBlogPreviewComponentsBlogPreviewCurrentLocale = string;

export type ComponentsBlogPreviewComponentsBlogPreviewSectionClassName = string;

export type ComponentsBlogPreviewReadMore = string;

export type ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPostTitle = string;

export type ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPostDescription = string;

export type ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPostPermalink = string;

export type ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPostDate = string;

export type ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPost = {
  title: ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPostTitle;
  description: ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPostDescription;
  permalink: ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPostPermalink;
  date: ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPostDate;
};

export type ComponentsBlogPreviewComponentsBlogPreviewGlobalData = {
  blogPosts?: ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPosts;
  [key: string]: unknown;
};

export type ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPosts = ComponentsBlogPreviewComponentsBlogPreviewGlobalDataBlogPost[];

export type ComponentsBlogPreviewComponentsBlogPreviewResolvedPosts = ComponentsBlogPreviewComponentsBlogPreviewPost[];

export type ComponentsBlogPreviewComponentsBlogPreviewSortDirection = number;

export type ComponentsBlogPreviewComponentsBlogPreviewSortedPosts = ComponentsBlogPreviewComponentsBlogPreviewPost[];

export type ComponentsBlogPreviewComponentsBlogPreviewLimitedPosts = ComponentsBlogPreviewComponentsBlogPreviewPost[];

export type ComponentsBlogPreviewComponentsBlogPreviewNoPosts = string;

export type ComponentsBlogPreviewComponentsBlogPreviewDateObject = Date;

export type ComponentsBlogPreviewComponentsBlogPreviewFormattedDate = string;
