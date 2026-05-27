import {
  DocsSidebarProvider,
  useDocRootMetadata,
} from '@docusaurus/plugin-content-docs/client';
import DocRootLayout from '@theme/DocRoot/Layout';
import NotFoundContent from '@theme/NotFound/Content';

import type {
  Theme_DocRoot_Index_DocRoot_MergedClassName,
  Theme_DocRoot_Index_DocRoot_Props,
  Theme_DocRoot_Index_DocRoot_RouteMetadata,
} from '../../types/theme/DocRoot/index.d.ts';

/**
 * Theme - Doc Root - Doc Root.
 *
 * Resolves the current doc route metadata and wraps the
 * matched document in a sidebar provider and layout shell,
 * falling back to the not-found page for invalid routes.
 *
 * @param {Theme_DocRoot_Index_DocRoot_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocRoot(props: Theme_DocRoot_Index_DocRoot_Props) {
  const currentDocRouteMetadata: Theme_DocRoot_Index_DocRoot_RouteMetadata = useDocRootMetadata(props);

  if (
    currentDocRouteMetadata === null
    || currentDocRouteMetadata === undefined
  ) {
    return <NotFoundContent />;
  }

  const mergedClassName: Theme_DocRoot_Index_DocRoot_MergedClassName = (props['className'] !== undefined) ? `nova-doc-root-wrapper ${props['className']}` : 'nova-doc-root-wrapper';

  return (
    <DocsSidebarProvider
      name={currentDocRouteMetadata['sidebarName']}
      items={currentDocRouteMetadata['sidebarItems']}
    >
      <DocRootLayout
        className={mergedClassName}
        style={props['style']}
      >
        {currentDocRouteMetadata['docElement']}
      </DocRootLayout>
    </DocsSidebarProvider>
  );
}

export default DocRoot;
