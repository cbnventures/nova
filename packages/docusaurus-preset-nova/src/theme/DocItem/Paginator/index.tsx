import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { usePluginData } from '@docusaurus/useGlobalData';
import DocPaginator from '@theme/DocPaginator';

import type {
  ThemeDocItemPaginatorDocItemPaginatorDescription,
  ThemeDocItemPaginatorDocItemPaginatorDoc,
  ThemeDocItemPaginatorDocItemPaginatorDocDescriptions,
  ThemeDocItemPaginatorDocItemPaginatorGlobalData,
  ThemeDocItemPaginatorDocItemPaginatorSpread,
} from '../../../types/theme/DocItem/Paginator/index.d.ts';

/**
 * Theme - Doc Item - Paginator - Doc Item Paginator.
 *
 * Renders previous and next navigation links below a doc page
 * by reading pagination metadata from the current doc context
 * and resolving descriptions from the theme global data.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemPaginator() {
  const doc: ThemeDocItemPaginatorDocItemPaginatorDoc = useDoc();
  const globalData: ThemeDocItemPaginatorDocItemPaginatorGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as ThemeDocItemPaginatorDocItemPaginatorGlobalData;
  const docDescriptions: ThemeDocItemPaginatorDocItemPaginatorDocDescriptions = (globalData['docDescriptions'] ?? {}) as ThemeDocItemPaginatorDocItemPaginatorDocDescriptions;
  const paginatorSpread: ThemeDocItemPaginatorDocItemPaginatorSpread = {};

  if (doc['metadata']['previous'] !== undefined) {
    const previousDescription: ThemeDocItemPaginatorDocItemPaginatorDescription = docDescriptions[doc['metadata']['previous']['permalink']];

    Reflect.set(paginatorSpread, 'previous', {
      permalink: doc['metadata']['previous']['permalink'],
      title: doc['metadata']['previous']['title'],
      description: previousDescription,
    });
  }

  if (doc['metadata']['next'] !== undefined) {
    const nextDescription: ThemeDocItemPaginatorDocItemPaginatorDescription = docDescriptions[doc['metadata']['next']['permalink']];

    Reflect.set(paginatorSpread, 'next', {
      permalink: doc['metadata']['next']['permalink'],
      title: doc['metadata']['next']['title'],
      description: nextDescription,
    });
  }

  return (
    <DocPaginator
      {...paginatorSpread}
    />
  );
}

export default DocItemPaginator;
