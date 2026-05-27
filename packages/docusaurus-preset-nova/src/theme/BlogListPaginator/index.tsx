import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';

import type {
  Theme_BlogListPaginator_Index_BlogListPaginator_BasePath,
  Theme_BlogListPaginator_Index_BlogListPaginator_First,
  Theme_BlogListPaginator_Index_BlogListPaginator_Last,
  Theme_BlogListPaginator_Index_BlogListPaginator_MapIndex,
  Theme_BlogListPaginator_Index_BlogListPaginator_NavAriaLabel,
  Theme_BlogListPaginator_Index_BlogListPaginator_Next,
  Theme_BlogListPaginator_Index_BlogListPaginator_Page,
  Theme_BlogListPaginator_Index_BlogListPaginator_PageNumbers,
  Theme_BlogListPaginator_Index_BlogListPaginator_PageNumbersEntry,
  Theme_BlogListPaginator_Index_BlogListPaginator_Permalink,
  Theme_BlogListPaginator_Index_BlogListPaginator_Previous,
  Theme_BlogListPaginator_Index_BlogListPaginator_Props,
  Theme_BlogListPaginator_Index_BlogListPaginator_TotalPages,
  Theme_BlogListPaginator_Index_GetBasePath_BasePath,
  Theme_BlogListPaginator_Index_GetBasePath_Page,
  Theme_BlogListPaginator_Index_GetBasePath_Permalink,
  Theme_BlogListPaginator_Index_GetPageNumbers_AllPages,
  Theme_BlogListPaginator_Index_GetPageNumbers_CurrentPage,
  Theme_BlogListPaginator_Index_GetPageNumbers_Index,
  Theme_BlogListPaginator_Index_GetPageNumbers_PageNumbers,
  Theme_BlogListPaginator_Index_GetPageNumbers_SortedPages,
  Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesComparatorFirst,
  Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesComparatorSecond,
  Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesEntry,
  Theme_BlogListPaginator_Index_GetPageNumbers_TotalPages,
  Theme_BlogListPaginator_Index_GetPageNumbers_VisibleSet,
  Theme_BlogListPaginator_Index_GetPageUrl_BasePath,
  Theme_BlogListPaginator_Index_GetPageUrl_PageNumber,
  Theme_BlogListPaginator_Index_GetPageUrl_PageUrl,
} from '../../types/theme/BlogListPaginator/index.d.ts';

/**
 * Theme - Blog List Paginator - Get Base Path.
 *
 * Derives the base path from the current page permalink by stripping
 * the trailing page segment when on pages beyond the first, returning
 * the root blog path used to construct all page URLs.
 *
 * @param {Theme_BlogListPaginator_Index_GetBasePath_Permalink} permalink - Permalink.
 * @param {Theme_BlogListPaginator_Index_GetBasePath_Page}      page      - Page.
 *
 * @returns {Theme_BlogListPaginator_Index_GetBasePath_BasePath}
 *
 * @since 0.16.0
 */
function getBasePath(permalink: Theme_BlogListPaginator_Index_GetBasePath_Permalink, page: Theme_BlogListPaginator_Index_GetBasePath_Page): Theme_BlogListPaginator_Index_GetBasePath_BasePath {
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
 * @param {Theme_BlogListPaginator_Index_GetPageUrl_BasePath}   basePath   - Base path.
 * @param {Theme_BlogListPaginator_Index_GetPageUrl_PageNumber} pageNumber - Page number.
 *
 * @returns {Theme_BlogListPaginator_Index_GetPageUrl_PageUrl}
 *
 * @since 0.16.0
 */
function getPageUrl(basePath: Theme_BlogListPaginator_Index_GetPageUrl_BasePath, pageNumber: Theme_BlogListPaginator_Index_GetPageUrl_PageNumber): Theme_BlogListPaginator_Index_GetPageUrl_PageUrl {
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
 * @param {Theme_BlogListPaginator_Index_GetPageNumbers_CurrentPage} currentPage - Current page.
 * @param {Theme_BlogListPaginator_Index_GetPageNumbers_TotalPages}  totalPages  - Total pages.
 *
 * @returns {Theme_BlogListPaginator_Index_GetPageNumbers_PageNumbers}
 *
 * @since 0.16.0
 */
function getPageNumbers(currentPage: Theme_BlogListPaginator_Index_GetPageNumbers_CurrentPage, totalPages: Theme_BlogListPaginator_Index_GetPageNumbers_TotalPages): Theme_BlogListPaginator_Index_GetPageNumbers_PageNumbers {
  if (totalPages <= 7) {
    const allPages: Theme_BlogListPaginator_Index_GetPageNumbers_AllPages = [];

    for (let index: Theme_BlogListPaginator_Index_GetPageNumbers_Index = 1; index <= totalPages; index += 1) {
      allPages.push(index);
    }

    return allPages;
  }

  const visibleSet: Theme_BlogListPaginator_Index_GetPageNumbers_VisibleSet = new Set<number>();

  visibleSet.add(1);
  visibleSet.add(totalPages);

  if (currentPage - 1 >= 1) {
    visibleSet.add(currentPage - 1);
  }

  visibleSet.add(currentPage);

  if (currentPage + 1 <= totalPages) {
    visibleSet.add(currentPage + 1);
  }

  const sortedPages: Theme_BlogListPaginator_Index_GetPageNumbers_SortedPages = Array.from(visibleSet).sort((first: Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesComparatorFirst, second: Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesComparatorSecond) => first - second);
  const pageNumbers: Theme_BlogListPaginator_Index_GetPageNumbers_PageNumbers = [];

  for (let index: Theme_BlogListPaginator_Index_GetPageNumbers_Index = 0; index < sortedPages.length; index += 1) {
    const entry: Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesEntry = sortedPages[index];

    if (entry === undefined) {
      continue;
    }

    if (index > 0) {
      const previousEntry: Theme_BlogListPaginator_Index_GetPageNumbers_SortedPagesEntry = sortedPages[index - 1];

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
 * @param {Theme_BlogListPaginator_Index_BlogListPaginator_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogListPaginator(props: Theme_BlogListPaginator_Index_BlogListPaginator_Props) {
  const page: Theme_BlogListPaginator_Index_BlogListPaginator_Page = props['metadata']['page'];
  const totalPages: Theme_BlogListPaginator_Index_BlogListPaginator_TotalPages = props['metadata']['totalPages'];

  if (totalPages <= 1) {
    return undefined;
  }

  const permalink: Theme_BlogListPaginator_Index_BlogListPaginator_Permalink = props['metadata']['permalink'];
  const basePath: Theme_BlogListPaginator_Index_BlogListPaginator_BasePath = getBasePath(permalink, page);
  const pageNumbers: Theme_BlogListPaginator_Index_BlogListPaginator_PageNumbers = getPageNumbers(page, totalPages);

  const navAriaLabel: Theme_BlogListPaginator_Index_BlogListPaginator_NavAriaLabel = translate({
    id: 'theme.blog.paginator.navAriaLabel',
    message: 'Blog list page navigation',
    description: 'The ARIA label for the blog list paginator navigation',
  });
  const first: Theme_BlogListPaginator_Index_BlogListPaginator_First = translate({
    id: 'theme.blog.paginator.first',
    message: 'First',
    description: 'The label for the link to the first blog list page',
  });
  const previous: Theme_BlogListPaginator_Index_BlogListPaginator_Previous = translate({
    id: 'theme.blog.paginator.previous',
    message: 'Prev',
    description: 'The label for the link to the previous blog list page',
  });
  const next: Theme_BlogListPaginator_Index_BlogListPaginator_Next = translate({
    id: 'theme.blog.paginator.next',
    message: 'Next',
    description: 'The label for the link to the next blog list page',
  });
  const last: Theme_BlogListPaginator_Index_BlogListPaginator_Last = translate({
    id: 'theme.blog.paginator.last',
    message: 'Last',
    description: 'The label for the link to the last blog list page',
  });

  return (
    <nav
      className={(props['className'] !== undefined) ? `nova-blog-list-paginator ${props['className']}` : 'nova-blog-list-paginator'}
      style={props['style']}
      aria-label={navAriaLabel}
    >
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
      {pageNumbers.map((entry: Theme_BlogListPaginator_Index_BlogListPaginator_PageNumbersEntry, index: Theme_BlogListPaginator_Index_BlogListPaginator_MapIndex) => {
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
