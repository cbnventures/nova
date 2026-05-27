import renderRoutes from '@docusaurus/renderRoutes';
import Layout from '@theme/Layout';

import type {
  Theme_DocsRoot_Index_DocsRoot_Props,
  Theme_DocsRoot_Index_DocsRoot_Rendered,
} from '../../types/theme/DocsRoot/index.d.ts';

/**
 * Theme - Docs Root - Docs Root.
 *
 * Renders the top-level docs wrapper that places all
 * documentation routes inside the site layout shell.
 *
 * @param {Theme_DocsRoot_Index_DocsRoot_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocsRoot(props: Theme_DocsRoot_Index_DocsRoot_Props) {
  const rendered: Theme_DocsRoot_Index_DocsRoot_Rendered = renderRoutes(props['route']['routes']);

  return (
    <Layout>
      {rendered}
    </Layout>
  );
}

export default DocsRoot;
