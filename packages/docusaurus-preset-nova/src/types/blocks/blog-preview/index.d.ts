import type { DocusaurusContext } from '@docusaurus/types';
import type { CSSProperties } from 'react';

import type { Shared_Surface } from '../../shared.d.ts';

/**
 * Blocks - Blog Preview - Blocks Blog Preview.
 *
 * @since 0.15.0
 */
export type Blocks_BlogPreview_Index_BlocksBlogPreview_Post_Title = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Post_Description = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Post_Permalink = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Post_Date = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Post = {
  title: Blocks_BlogPreview_Index_BlocksBlogPreview_Post_Title;
  description: Blocks_BlogPreview_Index_BlocksBlogPreview_Post_Description;
  permalink: Blocks_BlogPreview_Index_BlocksBlogPreview_Post_Permalink;
  date: Blocks_BlogPreview_Index_BlocksBlogPreview_Post_Date;
};

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Posts = Blocks_BlogPreview_Index_BlocksBlogPreview_Post[];

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Heading = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Description = string | undefined;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Posts = Blocks_BlogPreview_Index_BlocksBlogPreview_Post[];

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Surface = Shared_Surface | undefined;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Auto = boolean | undefined;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Limit = number | undefined;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Sort = 'newest' | 'oldest' | undefined;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props_ClassName = string | undefined;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Style = CSSProperties | undefined;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Props = {
  heading: Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Heading;
  description?: Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Description;
  posts?: Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Posts;
  surface?: Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Surface;
  auto?: Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Auto;
  limit?: Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Limit;
  sort?: Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Sort;
  className?: Blocks_BlogPreview_Index_BlocksBlogPreview_Props_ClassName;
  style?: Blocks_BlogPreview_Index_BlocksBlogPreview_Props_Style;
};

export type Blocks_BlogPreview_Index_BlocksBlogPreview_Context = DocusaurusContext;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_CurrentLocale = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_SectionClassName = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_ReadMore = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost_Title = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost_Description = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost_Permalink = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost_Date = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost = {
  title: Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost_Title;
  description: Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost_Description;
  permalink: Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost_Permalink;
  date: Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost_Date;
};

export type Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalData = {
  blogPosts?: Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalData_BlogPosts;
  [key: string]: unknown;
};

export type Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalData_BlogPosts = Blocks_BlogPreview_Index_BlocksBlogPreview_GlobalDataBlogPost[];

export type Blocks_BlogPreview_Index_BlocksBlogPreview_ResolvedPosts = Blocks_BlogPreview_Index_BlocksBlogPreview_Post[];

export type Blocks_BlogPreview_Index_BlocksBlogPreview_SortDirection = number;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_SortedPosts = Blocks_BlogPreview_Index_BlocksBlogPreview_Post[];

export type Blocks_BlogPreview_Index_BlocksBlogPreview_LimitedPosts = Blocks_BlogPreview_Index_BlocksBlogPreview_Post[];

export type Blocks_BlogPreview_Index_BlocksBlogPreview_NoPosts = string;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_DateObject = Date;

export type Blocks_BlogPreview_Index_BlocksBlogPreview_FormattedDate = string;
