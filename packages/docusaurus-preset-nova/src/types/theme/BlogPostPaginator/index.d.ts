import type { CSSProperties } from 'react';

/**
 * Theme - Blog Post Paginator - Blog Post Paginator.
 *
 * @since 0.15.0
 */
export type Theme_BlogPostPaginator_Index_BlogPostPaginator_Item_Title = string;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_Item_Permalink = string;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_Item = {
  title: Theme_BlogPostPaginator_Index_BlogPostPaginator_Item_Title;
  permalink: Theme_BlogPostPaginator_Index_BlogPostPaginator_Item_Permalink;
  [key: string]: unknown;
};

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_Props_NextItem = Theme_BlogPostPaginator_Index_BlogPostPaginator_Item | undefined;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_Props_PrevItem = Theme_BlogPostPaginator_Index_BlogPostPaginator_Item | undefined;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_Props_ClassName = string | undefined;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_Props_Style = CSSProperties | undefined;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_Props = {
  nextItem?: Theme_BlogPostPaginator_Index_BlogPostPaginator_Props_NextItem;
  prevItem?: Theme_BlogPostPaginator_Index_BlogPostPaginator_Props_PrevItem;
  className?: Theme_BlogPostPaginator_Index_BlogPostPaginator_Props_ClassName;
  style?: Theme_BlogPostPaginator_Index_BlogPostPaginator_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost_Title = string;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost_Description = string;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost_Permalink = string;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost_Date = string;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost = {
  title: Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost_Title;
  description: Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost_Description;
  permalink: Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost_Permalink;
  date: Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost_Date;
};

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData = {
  blogPosts?: Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData_BlogPosts;
  [key: string]: unknown;
};

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData_BlogPosts = Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost[];

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_NavAriaLabel = string;

export type Theme_BlogPostPaginator_Index_BlogPostPaginator_Heading = string;

/**
 * Theme - Blog Post Paginator - Next Link.
 *
 * @since 0.18.0
 */
export type Theme_BlogPostPaginator_Index_NextLink_Props_NextItem = Theme_BlogPostPaginator_Index_BlogPostPaginator_Item;

export type Theme_BlogPostPaginator_Index_NextLink_Props_BlogPosts = Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData_BlogPosts;

export type Theme_BlogPostPaginator_Index_NextLink_Props_ClassName = string | undefined;

export type Theme_BlogPostPaginator_Index_NextLink_Props_Style = CSSProperties | undefined;

export type Theme_BlogPostPaginator_Index_NextLink_Props = {
  nextItem: Theme_BlogPostPaginator_Index_NextLink_Props_NextItem;
  blogPosts: Theme_BlogPostPaginator_Index_NextLink_Props_BlogPosts;
  className?: Theme_BlogPostPaginator_Index_NextLink_Props_ClassName;
  style?: Theme_BlogPostPaginator_Index_NextLink_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogPostPaginator_Index_NextLink_Label = string;

export type Theme_BlogPostPaginator_Index_NextLink_AriaLabel = string;

export type Theme_BlogPostPaginator_Index_NextLink_Permalink = string;

export type Theme_BlogPostPaginator_Index_NextLink_Post = Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost | undefined;

export type Theme_BlogPostPaginator_Index_NextLink_Description = string | undefined;

/**
 * Theme - Blog Post Paginator - Prev Link.
 *
 * @since 0.18.0
 */
export type Theme_BlogPostPaginator_Index_PrevLink_Props_PrevItem = Theme_BlogPostPaginator_Index_BlogPostPaginator_Item;

export type Theme_BlogPostPaginator_Index_PrevLink_Props_BlogPosts = Theme_BlogPostPaginator_Index_BlogPostPaginator_GlobalData_BlogPosts;

export type Theme_BlogPostPaginator_Index_PrevLink_Props_ClassName = string | undefined;

export type Theme_BlogPostPaginator_Index_PrevLink_Props_Style = CSSProperties | undefined;

export type Theme_BlogPostPaginator_Index_PrevLink_Props = {
  prevItem: Theme_BlogPostPaginator_Index_PrevLink_Props_PrevItem;
  blogPosts: Theme_BlogPostPaginator_Index_PrevLink_Props_BlogPosts;
  className?: Theme_BlogPostPaginator_Index_PrevLink_Props_ClassName;
  style?: Theme_BlogPostPaginator_Index_PrevLink_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogPostPaginator_Index_PrevLink_Label = string;

export type Theme_BlogPostPaginator_Index_PrevLink_AriaLabel = string;

export type Theme_BlogPostPaginator_Index_PrevLink_Permalink = string;

export type Theme_BlogPostPaginator_Index_PrevLink_Post = Theme_BlogPostPaginator_Index_BlogPostPaginator_BlogPost | undefined;

export type Theme_BlogPostPaginator_Index_PrevLink_Description = string | undefined;
