import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';

import type {
  ThemeBlogListPaginatorBlogListPaginatorBasePath,
  ThemeBlogListPaginatorBlogListPaginatorFirst,
  ThemeBlogListPaginatorBlogListPaginatorLast,
  ThemeBlogListPaginatorBlogListPaginatorMapIndex,
  ThemeBlogListPaginatorBlogListPaginatorNavAriaLabel,
  ThemeBlogListPaginatorBlogListPaginatorNext,
  ThemeBlogListPaginatorBlogListPaginatorPage,
  ThemeBlogListPaginatorBlogListPaginatorPageNumbers,
  ThemeBlogListPaginatorBlogListPaginatorPageNumbersEntry,
  ThemeBlogListPaginatorBlogListPaginatorPermalink,
  ThemeBlogListPaginatorBlogListPaginatorPrevious,
  ThemeBlogListPaginatorBlogListPaginatorProps,
  ThemeBlogListPaginatorBlogListPaginatorTotalPages,
  ThemeBlogListPaginatorGetBasePathBasePath,
  ThemeBlogListPaginatorGetBasePathPage,
  ThemeBlogListPaginatorGetBasePathPermalink,
  ThemeBlogListPaginatorGetPageNumbersAllPages,
  ThemeBlogListPaginatorGetPageNumbersCurrentPage,
  ThemeBlogListPaginatorGetPageNumbersIndex,
  ThemeBlogListPaginatorGetPageNumbersPageNumbers,
  ThemeBlogListPaginatorGetPageNumbersSortedPages,
  ThemeBlogListPaginatorGetPageNumbersSortedPagesComparatorFirst,
  ThemeBlogListPaginatorGetPageNumbersSortedPagesComparatorSecond,
  ThemeBlogListPaginatorGetPageNumbersSortedPagesEntry,
  ThemeBlogListPaginatorGetPageNumbersTotalPages,
  ThemeBlogListPaginatorGetPageNumbersVisibleSet,
  ThemeBlogListPaginatorGetPageUrlBasePath,
  ThemeBlogListPaginatorGetPageUrlPageNumber,
  ThemeBlogListPaginatorGetPageUrlPageUrl,
} from '../../types/theme/BlogListPaginator/index.d.ts';

/**
 * Theme - Blog List Paginator - Get Base Path.
 *
 * Derives the base path from the current page permalink by stripping
 * the trailing page segment when on pages beyond the first, returning
 * the root blog path used to construct all page URLs.
 *
 * @param {ThemeBlogListPaginatorGetBasePathPermalink} permalink - Permalink.
 * @param {ThemeBlogListPaginatorGetBasePathPage}      page      - Page.
 *
 * @returns {ThemeBlogListPaginatorGetBasePathBasePath}
 *
 * @since 0.16.0
 */
function getBasePath(permalink: ThemeBlogListPaginatorGetBasePathPermalink, page: ThemeBlogListPaginatorGetBasePathPage): ThemeBlogListPaginatorGetBasePathBasePath {
  if (page === 1) {
    return permalink;
  }

  return permalink.replace(`/page/${String(page)}`, '');
}

/**
 * Theme - Blog List Paginator - Get Page URL.
 *
 * Constructs the URL for a specific page number by appending
 * the page segment to the base path, returning the base
 * path directly for page one.
 *
 * @param {ThemeBlogListPaginatorGetPageUrlBasePath}   basePath   - Base path.
 * @param {ThemeBlogListPaginatorGetPageUrlPageNumber} pageNumber - Page number.
 *
 * @returns {ThemeBlogListPaginatorGetPageUrlPageUrl}
 *
 * @since 0.16.0
 */
function getPageUrl(basePath: ThemeBlogListPaginatorGetPageUrlBasePath, pageNumber: ThemeBlogListPaginatorGetPageUrlPageNumber): ThemeBlogListPaginatorGetPageUrlPageUrl {
  if (pageNumber === 1) {
    return basePath;
  }

  return `${basePath}/page/${String(pageNumber)}`;
}

/**
 * Theme - Blog List Paginator - Get Page Numbers.
 *
 * Generates an array of page numbers and ellipsis markers for the pagination
 * strip, always including the first page, last page, and one neighbor on each
 * side of the current page, with ellipsis replacing gaps of two or more pages.
 *
 * @param {ThemeBlogListPaginatorGetPageNumbersCurrentPage} currentPage - Current page.
 * @param {ThemeBlogListPaginatorGetPageNumbersTotalPages}  totalPages  - Total pages.
 *
 * @returns {ThemeBlogListPaginatorGetPageNumbersPageNumbers}
 *
 * @since 0.16.0
 */
function getPageNumbers(currentPage: ThemeBlogListPaginatorGetPageNumbersCurrentPage, totalPages: ThemeBlogListPaginatorGetPageNumbersTotalPages): ThemeBlogListPaginatorGetPageNumbersPageNumbers {
  if (totalPages <= 7) {
    const allPages: ThemeBlogListPaginatorGetPageNumbersAllPages = [];

    for (let index: ThemeBlogListPaginatorGetPageNumbersIndex = 1; index <= totalPages; index += 1) {
      allPages.push(index);
    }

    return allPages;
  }

  const visibleSet: ThemeBlogListPaginatorGetPageNumbersVisibleSet = new Set<number>();

  visibleSet.add(1);
  visibleSet.add(totalPages);

  if (currentPage - 1 >= 1) {
    visibleSet.add(currentPage - 1);
  }

  visibleSet.add(currentPage);

  if (currentPage + 1 <= totalPages) {
    visibleSet.add(currentPage + 1);
  }

  const sortedPages: ThemeBlogListPaginatorGetPageNumbersSortedPages = Array.from(visibleSet).sort((first: ThemeBlogListPaginatorGetPageNumbersSortedPagesComparatorFirst, second: ThemeBlogListPaginatorGetPageNumbersSortedPagesComparatorSecond) => first - second);
  const pageNumbers: ThemeBlogListPaginatorGetPageNumbersPageNumbers = [];

  for (let index: ThemeBlogListPaginatorGetPageNumbersIndex = 0; index < sortedPages.length; index += 1) {
    const entry: ThemeBlogListPaginatorGetPageNumbersSortedPagesEntry = sortedPages[index];

    if (entry === undefined) {
      continue;
    }

    if (index > 0) {
      const previousEntry: ThemeBlogListPaginatorGetPageNumbersSortedPagesEntry = sortedPages[index - 1];

      if (previousEntry !== undefined && entry - previousEntry > 1) {
        pageNumbers.push('...');
      }
    }

    pageNumbers.push(entry);
  }

  return pageNumbers;
}

/**
 * Theme - Blog List Paginator - Blog List Paginator.
 *
 * Renders a page-by-page navigation strip with first, previous,
 * numbered page links with ellipsis truncation, next, and last
 * controls for paginated blog listing pages.
 *
 * @param {ThemeBlogListPaginatorBlogListPaginatorProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogListPaginator(props: ThemeBlogListPaginatorBlogListPaginatorProps) {
  const page: ThemeBlogListPaginatorBlogListPaginatorPage = props['metadata']['page'];
  const totalPages: ThemeBlogListPaginatorBlogListPaginatorTotalPages = props['metadata']['totalPages'];

  if (totalPages <= 1) {
    return undefined;
  }

  const permalink: ThemeBlogListPaginatorBlogListPaginatorPermalink = props['metadata']['permalink'];
  const basePath: ThemeBlogListPaginatorBlogListPaginatorBasePath = getBasePath(permalink, page);
  const pageNumbers: ThemeBlogListPaginatorBlogListPaginatorPageNumbers = getPageNumbers(page, totalPages);

  const navAriaLabel: ThemeBlogListPaginatorBlogListPaginatorNavAriaLabel = translate({
    id: 'theme.blog.paginator.navAriaLabel',
    message: 'Blog list page navigation',
    description: 'The ARIA label for the blog list paginator navigation',
  });
  const first: ThemeBlogListPaginatorBlogListPaginatorFirst = translate({
    id: 'theme.blog.paginator.first',
    message: 'First',
    description: 'The label for the link to the first blog list page',
  });
  const previous: ThemeBlogListPaginatorBlogListPaginatorPrevious = translate({
    id: 'theme.blog.paginator.previous',
    message: 'Prev',
    description: 'The label for the link to the previous blog list page',
  });
  const next: ThemeBlogListPaginatorBlogListPaginatorNext = translate({
    id: 'theme.blog.paginator.next',
    message: 'Next',
    description: 'The label for the link to the next blog list page',
  });
  const last: ThemeBlogListPaginatorBlogListPaginatorLast = translate({
    id: 'theme.blog.paginator.last',
    message: 'Last',
    description: 'The label for the link to the last blog list page',
  });

  return (
    <nav className="nova-blog-list-paginator" aria-label={navAriaLabel}>
      {(page > 1) && (
        <>
          <Link className="nova-blog-list-paginator-nav" to={getPageUrl(basePath, 1)}>
            {`\u00AB ${first}`}
          </Link>
          <Link className="nova-blog-list-paginator-nav" to={getPageUrl(basePath, page - 1)}>
            {`\u2039 ${previous}`}
          </Link>
        </>
      )}
      {pageNumbers.map((entry: ThemeBlogListPaginatorBlogListPaginatorPageNumbersEntry, index: ThemeBlogListPaginatorBlogListPaginatorMapIndex) => {
        if (entry === '...') {
          return (
            <span key={`ellipsis-${String(index)}`} className="nova-blog-list-paginator-ellipsis">
              {'\u2026'}
            </span>
          );
        }

        if (entry === page) {
          return (
            <span key={entry} className="nova-blog-list-paginator-page nova-blog-list-paginator-page-active" aria-current="page">
              {entry}
            </span>
          );
        }

        return (
          <Link key={entry} className="nova-blog-list-paginator-page" to={getPageUrl(basePath, entry)}>
            {entry}
          </Link>
        );
      })}
      {(page < totalPages) && (
        <>
          <Link className="nova-blog-list-paginator-nav" to={getPageUrl(basePath, page + 1)}>
            {`${next} \u203A`}
          </Link>
          <Link className="nova-blog-list-paginator-nav" to={getPageUrl(basePath, totalPages)}>
            {`${last} \u00BB`}
          </Link>
        </>
      )}
    </nav>
  );
}

export default BlogListPaginator;
