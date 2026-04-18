import {
  DocsVersionProvider,
  getDocsVersionSearchTag,
} from '@docusaurus/plugin-content-docs/client';
import renderRoutes from '@docusaurus/renderRoutes';
import { PageMetadata } from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';

import type {
  ThemeDocVersionRootDocVersionRootProps,
  ThemeDocVersionRootDocVersionRootRendered,
  ThemeDocVersionRootDocVersionRootSearchTag,
} from '../../types/theme/DocVersionRoot/index.d.ts';

/**
 * Theme - Doc Version Root - Doc Version Root.
 *
 * Wraps versioned documentation routes in the version
 * context provider and injects search and noindex metadata
 * based on the active version configuration.
 *
 * @param {ThemeDocVersionRootDocVersionRootProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocVersionRoot(props: ThemeDocVersionRootDocVersionRootProps) {
  const rendered: ThemeDocVersionRootDocVersionRootRendered = renderRoutes(props['route']['routes']);
  const searchTag: ThemeDocVersionRootDocVersionRootSearchTag = getDocsVersionSearchTag(
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
