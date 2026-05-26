import {
  DocsSidebarProvider,
  useDocRootMetadata,
} from '@docusaurus/plugin-content-docs/client';
import DocRootLayout from '@theme/DocRoot/Layout';
import NotFoundContent from '@theme/NotFound/Content';

import type {
  ThemeDocRootDocRootMergedClassName,
  ThemeDocRootDocRootProps,
  ThemeDocRootDocRootRouteMetadata,
} from '../../types/theme/DocRoot/index.d.ts';

/**
 * Theme - Doc Root - Doc Root.
 *
 * Resolves the current doc route metadata and wraps the
 * matched document in a sidebar provider and layout shell,
 * falling back to the not-found page for invalid routes.
 *
 * @param {ThemeDocRootDocRootProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocRoot(props: ThemeDocRootDocRootProps) {
  const currentDocRouteMetadata: ThemeDocRootDocRootRouteMetadata = useDocRootMetadata(props);

  if (
    currentDocRouteMetadata === null
    || currentDocRouteMetadata === undefined
  ) {
    return <NotFoundContent />;
  }

  const mergedClassName: ThemeDocRootDocRootMergedClassName = (props['className'] !== undefined) ? `nova-doc-root-wrapper ${props['className']}` : 'nova-doc-root-wrapper';

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
