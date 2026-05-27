import {
  DocsVersionProvider,
  getDocsVersionSearchTag,
} from '@docusaurus/plugin-content-docs/client';
import renderRoutes from '@docusaurus/renderRoutes';
import { PageMetadata } from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';

import type {
  Theme_DocVersionRoot_Index_DocVersionRoot_Props,
  Theme_DocVersionRoot_Index_DocVersionRoot_Rendered,
  Theme_DocVersionRoot_Index_DocVersionRoot_SearchTag,
} from '../../types/theme/DocVersionRoot/index.d.ts';

/**
 * Theme - Doc Version Root - Doc Version Root.
 *
 * Wraps versioned documentation routes in the version
 * context provider and injects search and noindex metadata
 * based on the active version configuration.
 *
 * @param {Theme_DocVersionRoot_Index_DocVersionRoot_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocVersionRoot(props: Theme_DocVersionRoot_Index_DocVersionRoot_Props) {
  const rendered: Theme_DocVersionRoot_Index_DocVersionRoot_Rendered = renderRoutes(props['route']['routes']);
  const searchTag: Theme_DocVersionRoot_Index_DocVersionRoot_SearchTag = getDocsVersionSearchTag(
    props['version']['pluginId'],
    props['version']['version'],
  );

  return (
    <>
      <SearchMetadata
        version={props['version']['version']}
        tag={searchTag}
      />
      <PageMetadata>
        {(props['version']['noIndex'] === true) && (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </PageMetadata>
      <DocsVersionProvider version={props['version']}>
        {rendered}
      </DocsVersionProvider>
    </>
  );
}

export default DocVersionRoot;
