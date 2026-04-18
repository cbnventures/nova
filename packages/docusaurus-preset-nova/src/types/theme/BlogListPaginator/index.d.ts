import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';

/**
 * Theme - Blog List Paginator - Blog List Paginator.
 *
 * @since 0.15.0
 */
export type ThemeBlogListPaginatorBlogListPaginatorPropsMetadata = BlogPaginatedMetadata;

export type ThemeBlogListPaginatorBlogListPaginatorProps = {
  metadata: ThemeBlogListPaginatorBlogListPaginatorPropsMetadata;
  [key: string]: unknown;
};

export type ThemeBlogListPaginatorBlogListPaginatorPage = number;

export type ThemeBlogListPaginatorBlogListPaginatorTotalPages = number;

export type ThemeBlogListPaginatorBlogListPaginatorPermalink = string;

export type ThemeBlogListPaginatorBlogListPaginatorBasePath = string;

export type ThemeBlogListPaginatorBlogListPaginatorPageNumbers = ThemeBlogListPaginatorBlogListPaginatorPageNumbersEntry[];

export type ThemeBlogListPaginatorBlogListPaginatorNavAriaLabel = string;

export type ThemeBlogListPaginatorBlogListPaginatorFirst = string;

export type ThemeBlogListPaginatorBlogListPaginatorPrevious = string;

export type ThemeBlogListPaginatorBlogListPaginatorNext = string;

export type ThemeBlogListPaginatorBlogListPaginatorLast = string;

export type ThemeBlogListPaginatorBlogListPaginatorPageNumbersEntry = number | '...';

export type ThemeBlogListPaginatorBlogListPaginatorMapIndex = number;

/**
 * Theme - Blog List Paginator - Get Base Path.
 *
 * @since 0.16.0
 */
export type ThemeBlogListPaginatorGetBasePathPermalink = string;

export type ThemeBlogListPaginatorGetBasePathPage = number;

export type ThemeBlogListPaginatorGetBasePathBasePath = string;

/**
 * Theme - Blog List Paginator - Get Page Numbers.
 *
 * @since 0.16.0
 */
export type ThemeBlogListPaginatorGetPageNumbersCurrentPage = number;

export type ThemeBlogListPaginatorGetPageNumbersTotalPages = number;

export type ThemeBlogListPaginatorGetPageNumbersPageNumbersEntry = number | '...';

export type ThemeBlogListPaginatorGetPageNumbersPageNumbers = ThemeBlogListPaginatorGetPageNumbersPageNumbersEntry[];

export type ThemeBlogListPaginatorGetPageNumbersAllPages = ThemeBlogListPaginatorGetPageNumbersPageNumbersEntry[];

export type ThemeBlogListPaginatorGetPageNumbersIndex = number;

export type ThemeBlogListPaginatorGetPageNumbersVisibleSet = Set<number>;

export type ThemeBlogListPaginatorGetPageNumbersSortedPages = number[];

export type ThemeBlogListPaginatorGetPageNumbersSortedPagesComparatorFirst = number;

export type ThemeBlogListPaginatorGetPageNumbersSortedPagesComparatorSecond = number;

export type ThemeBlogListPaginatorGetPageNumbersSortedPagesEntry = number | undefined;

/**
 * Theme - Blog List Paginator - Get Page URL.
 *
 * @since 0.16.0
 */
export type ThemeBlogListPaginatorGetPageUrlBasePath = string;

export type ThemeBlogListPaginatorGetPageUrlPageNumber = number;

export type ThemeBlogListPaginatorGetPageUrlPageUrl = string;
