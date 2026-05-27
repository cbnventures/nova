import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { usePluginData } from '@docusaurus/useGlobalData';
import DocPaginator from '@theme/DocPaginator';

import type {
  Theme_DocItem_Paginator_Index_DocItemPaginator_Description,
  Theme_DocItem_Paginator_Index_DocItemPaginator_Doc,
  Theme_DocItem_Paginator_Index_DocItemPaginator_DocDescriptions,
  Theme_DocItem_Paginator_Index_DocItemPaginator_GlobalData,
  Theme_DocItem_Paginator_Index_DocItemPaginator_MergedClassName,
  Theme_DocItem_Paginator_Index_DocItemPaginator_Props,
  Theme_DocItem_Paginator_Index_DocItemPaginator_Spread,
} from '../../../types/theme/DocItem/Paginator/index.d.ts';

/**
 * Theme - Doc Item - Paginator - Doc Item Paginator.
 *
 * Renders previous and next navigation links below a doc page
 * by reading pagination metadata from the current doc context
 * and resolving descriptions from the theme global data.
 *
 * @param {Theme_DocItem_Paginator_Index_DocItemPaginator_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemPaginator(props: Theme_DocItem_Paginator_Index_DocItemPaginator_Props) {
  const doc: Theme_DocItem_Paginator_Index_DocItemPaginator_Doc = useDoc();
  const globalData: Theme_DocItem_Paginator_Index_DocItemPaginator_GlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as Theme_DocItem_Paginator_Index_DocItemPaginator_GlobalData;
  const docDescriptions: Theme_DocItem_Paginator_Index_DocItemPaginator_DocDescriptions = (globalData['docDescriptions'] ?? {}) as Theme_DocItem_Paginator_Index_DocItemPaginator_DocDescriptions;
  const paginatorSpread: Theme_DocItem_Paginator_Index_DocItemPaginator_Spread = {};

  if (doc['metadata']['previous'] !== undefined) {
    const previousDescription: Theme_DocItem_Paginator_Index_DocItemPaginator_Description = docDescriptions[doc['metadata']['previous']['permalink']];

    Reflect.set(paginatorSpread, 'previous', {
      permalink: doc['metadata']['previous']['permalink'],
      title: doc['metadata']['previous']['title'],
      description: previousDescription,
    });
  }

  if (doc['metadata']['next'] !== undefined) {
    const nextDescription: Theme_DocItem_Paginator_Index_DocItemPaginator_Description = docDescriptions[doc['metadata']['next']['permalink']];

    Reflect.set(paginatorSpread, 'next', {
      permalink: doc['metadata']['next']['permalink'],
      title: doc['metadata']['next']['title'],
      description: nextDescription,
    });
  }

  const mergedClassName: Theme_DocItem_Paginator_Index_DocItemPaginator_MergedClassName = (props['className'] !== undefined) ? `nova-doc-item-paginator ${props['className']}` : 'nova-doc-item-paginator';

  return (
    <DocPaginator
      className={mergedClassName}
      style={props['style']}
      {...paginatorSpread}
    />
  );
}

export default DocItemPaginator;
