import { useCurrentSidebarCategory } from '@docusaurus/plugin-content-docs/client';
import { PageMetadata } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocSidebarMobile from '@theme/DocSidebarMobile';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import Heading from '@theme/Heading';

import type {
  ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPageCategory,
  ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPageImageUrl,
  ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPageMetadataSpread,
  ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPagePaginatorSpread,
  ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPageProps,
} from '../../types/theme/DocCategoryGeneratedIndexPage/index.d.ts';

/**
 * Theme - Doc Category Generated Index Page - Doc Category Generated Index Page.
 *
 * Renders a generated category index page with metadata, breadcrumbs, a heading
 * with optional description, a grid of child doc cards,
 * and previous/next pagination.
 *
 * @param {ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocCategoryGeneratedIndexPage(props: ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPageProps) {
  const category: ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPageCategory = useCurrentSidebarCategory();
  const imageUrl: ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPageImageUrl = useBaseUrl(props['categoryGeneratedIndex']['image']);
  const metadataSpread: ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPageMetadataSpread = {};

  if (props['categoryGeneratedIndex']['description'] !== undefined) {
    Reflect.set(metadataSpread, 'description', props['categoryGeneratedIndex']['description']);
  }

  if (props['categoryGeneratedIndex']['keywords'] !== undefined) {
    Reflect.set(metadataSpread, 'keywords', props['categoryGeneratedIndex']['keywords']);
  }

  if (imageUrl !== undefined) {
    Reflect.set(metadataSpread, 'image', imageUrl);
  }

  const paginatorSpread: ThemeDocCategoryGeneratedIndexPageDocCategoryGeneratedIndexPagePaginatorSpread = {};

  if (props['categoryGeneratedIndex']['navigation']['previous'] !== undefined) {
    Reflect.set(paginatorSpread, 'previous', props['categoryGeneratedIndex']['navigation']['previous']);
  }

  if (props['categoryGeneratedIndex']['navigation']['next'] !== undefined) {
    Reflect.set(paginatorSpread, 'next', props['categoryGeneratedIndex']['navigation']['next']);
  }

  return (
    <>
      <PageMetadata
        title={props['categoryGeneratedIndex']['title']}
        {...metadataSpread}
      />
      <div className="nova-category-index">
        <article>
          <DocSidebarMobile />
          <DocBreadcrumbs />
          <DocVersionBanner />
          <DocVersionBadge />
          <header>
            <Heading as="h1">
              {props['categoryGeneratedIndex']['title']}
            </Heading>
            {(props['categoryGeneratedIndex']['description'] !== undefined) && (
              <p>{props['categoryGeneratedIndex']['description']}</p>
            )}
          </header>
          <DocCardList items={category['items']} />
        </article>
        <DocPaginator
          {...paginatorSpread}
        />
      </div>
    </>
  );
}

export default DocCategoryGeneratedIndexPage;
