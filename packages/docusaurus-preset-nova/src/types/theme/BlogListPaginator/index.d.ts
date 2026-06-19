import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog List Paginator - Blog List Paginator.
 *
 * @since 0.15.0
 */
export type Theme_BlogListPaginator_Index_BlogListPaginator_Props_Metadata = BlogPaginatedMetadata;

export type Theme_BlogListPaginator_Index_BlogListPaginator_Props_ClassName = string | undefined;

export type Theme_BlogListPaginator_Index_BlogListPaginator_Props_Style = CSSProperties | undefined;

export type Theme_BlogListPaginator_Index_BlogListPaginator_Props = {
  metadata: Theme_BlogListPaginator_Index_BlogListPaginator_Props_Metadata;
  className?: Theme_BlogListPaginator_Index_BlogListPaginator_Props_ClassName;
  style?: Theme_BlogListPaginator_Index_BlogListPaginator_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogListPaginator_Index_BlogListPaginator_Page = number;

export type Theme_BlogListPaginator_Index_BlogListPaginator_TotalPages = number;

export type Theme_BlogListPaginator_Index_BlogListPaginator_Permalink = string;

export type Theme_BlogListPaginator_Index_BlogListPaginator_BasePath = string;

export type Theme_BlogListPaginator_Index_BlogListPaginator_PageNumbers = (number | '...')[];

export type Theme_BlogListPaginator_Index_BlogListPaginator_NavAriaLabel = string;

export type Theme_BlogListPaginator_Index_BlogListPaginator_First = string;

export type Theme_BlogListPaginator_Index_BlogListPaginator_Previous = string;

export type Theme_BlogListPaginator_Index_BlogListPaginator_Next = string;

export type Theme_BlogListPaginator_Index_BlogListPaginator_Last = string;

export type Theme_BlogListPaginator_Index_BlogListPaginator_PageNumbersEntry = number | '...';

export type Theme_BlogListPaginator_Index_BlogListPaginator_MapIndex = number;

/**
 * Theme - Blog List Paginator - Get Base Path.
 *
 * @since 0.16.0
 */
export type Theme_BlogListPaginator_Index_GetBasePath_Permalink = string;

export type Theme_BlogListPaginator_Index_GetBasePath_Page = number;

export type Theme_BlogListPaginator_Index_GetBasePath_BasePath = string;

/**
 * Theme - Blog List Paginator - Get Page Numbers.
 *
 * @since 0.16.0
 */
export type Theme_BlogListPaginator_Index_GetPageNumbers_CurrentPage = number;

export type Theme_BlogListPaginator_Index_GetPageNumbers_TotalPages = number;

export type Theme_BlogListPaginator_Index_GetPageNumbers_PageNumbersEntry = number | '...';

export type Theme_BlogListPaginator_Index_GetPageNumbers_PageNumbers = Theme_BlogListPaginator_Index_GetPageNumbers_PageNumbersEntry[];

export type Theme_BlogListPaginator_Index_GetPageNumbers_AllPages = Theme_BlogListPaginator_Index_GetPageNumbers_PageNumbersEntry[];

export type Theme_BlogListPaginator_Index_GetPageNumbers_Index = number;

export type Theme_BlogListPaginator_Index_GetPageNumbers_VisibleSet = Set<number>;

export type Theme_BlogListPaginator_Index_GetPageNumbers_SortedPages = number[];

export type Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesComparatorFirst = number;

export type Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesComparatorSecond = number;

export type Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesEntry = number | undefined;

/**
 * Theme - Blog List Paginator - Get Page URL.
 *
 * @since 0.16.0
 */
export type Theme_BlogListPaginator_Index_GetPageUrl_BasePath = string;

export type Theme_BlogListPaginator_Index_GetPageUrl_PageNumber = number;

export type Theme_BlogListPaginator_Index_GetPageUrl_PageUrl = string;
