import type { DocusaurusContext } from '@docusaurus/types';
import type { CSSProperties } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Blocks - Blog Preview - Blocks Blog Preview.
 *
 * @since 0.15.0
 */
export type BlocksBlogPreviewBlocksBlogPreviewPostTitle = string;

export type BlocksBlogPreviewBlocksBlogPreviewPostDescription = string;

export type BlocksBlogPreviewBlocksBlogPreviewPostPermalink = string;

export type BlocksBlogPreviewBlocksBlogPreviewPostDate = string;

export type BlocksBlogPreviewBlocksBlogPreviewPost = {
  title: BlocksBlogPreviewBlocksBlogPreviewPostTitle;
  description: BlocksBlogPreviewBlocksBlogPreviewPostDescription;
  permalink: BlocksBlogPreviewBlocksBlogPreviewPostPermalink;
  date: BlocksBlogPreviewBlocksBlogPreviewPostDate;
};

export type BlocksBlogPreviewBlocksBlogPreviewPosts = BlocksBlogPreviewBlocksBlogPreviewPost[];

export type BlocksBlogPreviewBlocksBlogPreviewPropsHeading = string;

export type BlocksBlogPreviewBlocksBlogPreviewPropsDescription = string | undefined;

export type BlocksBlogPreviewBlocksBlogPreviewPropsPosts = BlocksBlogPreviewBlocksBlogPreviewPost[];

export type BlocksBlogPreviewBlocksBlogPreviewPropsSurface = SharedSurface | undefined;

export type BlocksBlogPreviewBlocksBlogPreviewPropsAuto = boolean | undefined;

export type BlocksBlogPreviewBlocksBlogPreviewPropsLimit = number | undefined;

export type BlocksBlogPreviewBlocksBlogPreviewPropsSort = 'newest' | 'oldest' | undefined;

export type BlocksBlogPreviewBlocksBlogPreviewPropsClassName = string | undefined;

export type BlocksBlogPreviewBlocksBlogPreviewPropsStyle = CSSProperties | undefined;

export type BlocksBlogPreviewBlocksBlogPreviewProps = {
  heading: BlocksBlogPreviewBlocksBlogPreviewPropsHeading;
  description?: BlocksBlogPreviewBlocksBlogPreviewPropsDescription;
  posts?: BlocksBlogPreviewBlocksBlogPreviewPropsPosts;
  surface?: BlocksBlogPreviewBlocksBlogPreviewPropsSurface;
  auto?: BlocksBlogPreviewBlocksBlogPreviewPropsAuto;
  limit?: BlocksBlogPreviewBlocksBlogPreviewPropsLimit;
  sort?: BlocksBlogPreviewBlocksBlogPreviewPropsSort;
  className?: BlocksBlogPreviewBlocksBlogPreviewPropsClassName;
  style?: BlocksBlogPreviewBlocksBlogPreviewPropsStyle;
};

export type BlocksBlogPreviewBlocksBlogPreviewContext = DocusaurusContext;

export type BlocksBlogPreviewBlocksBlogPreviewCurrentLocale = string;

export type BlocksBlogPreviewBlocksBlogPreviewSectionClassName = string;

export type BlocksBlogPreviewReadMore = string;

export type BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPostTitle = string;

export type BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPostDescription = string;

export type BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPostPermalink = string;

export type BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPostDate = string;

export type BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPost = {
  title: BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPostTitle;
  description: BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPostDescription;
  permalink: BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPostPermalink;
  date: BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPostDate;
};

export type BlocksBlogPreviewBlocksBlogPreviewGlobalData = {
  blogPosts?: BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPosts;
  [key: string]: unknown;
};

export type BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPosts = BlocksBlogPreviewBlocksBlogPreviewGlobalDataBlogPost[];

export type BlocksBlogPreviewBlocksBlogPreviewResolvedPosts = BlocksBlogPreviewBlocksBlogPreviewPost[];

export type BlocksBlogPreviewBlocksBlogPreviewSortDirection = number;

export type BlocksBlogPreviewBlocksBlogPreviewSortedPosts = BlocksBlogPreviewBlocksBlogPreviewPost[];

export type BlocksBlogPreviewBlocksBlogPreviewLimitedPosts = BlocksBlogPreviewBlocksBlogPreviewPost[];

export type BlocksBlogPreviewBlocksBlogPreviewNoPosts = string;

export type BlocksBlogPreviewBlocksBlogPreviewDateObject = Date;

export type BlocksBlogPreviewBlocksBlogPreviewFormattedDate = string;
