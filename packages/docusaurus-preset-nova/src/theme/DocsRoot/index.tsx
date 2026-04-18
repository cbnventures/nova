import renderRoutes from '@docusaurus/renderRoutes';
import Layout from '@theme/Layout';

import type {
  ThemeDocsRootDocsRootProps,
  ThemeDocsRootDocsRootRendered,
} from '../../types/theme/DocsRoot/index.d.ts';

/**
 * Theme - Docs Root - Docs Root.
 *
 * Renders the top-level docs wrapper that places all
 * documentation routes inside the site layout shell.
 *
 * @param {ThemeDocsRootDocsRootProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocsRoot(props: ThemeDocsRootDocsRootProps) {
  const rendered: ThemeDocsRootDocsRootRendered = renderRoutes(props['route']['routes']);

  return (
    <Layout>
      {rendered}
    </Layout>
  );
}

export default DocsRoot;
