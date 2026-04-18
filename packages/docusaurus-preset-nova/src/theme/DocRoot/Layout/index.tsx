import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';

import type {
  ThemeDocRootLayoutDocRootLayoutProps,
  ThemeDocRootLayoutDocRootLayoutSidebar,
} from '../../../types/theme/DocRoot/Layout/index.d.ts';

/**
 * Theme - Doc Root - Layout - Doc Root Layout.
 *
 * Replaces the default Docusaurus DocRoot layout with a plain wrapper
 * that renders a sidebar and main content area without flexbox,
 * module CSS, or collapsible sidebar state.
 *
 * @param {ThemeDocRootLayoutDocRootLayoutProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocRootLayout(props: ThemeDocRootLayoutDocRootLayoutProps) {
  const sidebar: ThemeDocRootLayoutDocRootLayoutSidebar = useDocsSidebar();

  if (sidebar !== null && sidebar !== undefined) {
    return (
      <div className="nova-doc-root">
        <div className="nova-container nova-grid">
          <DocRootLayoutSidebar
            sidebar={sidebar['items']}
            hiddenSidebarContainer={false}
            setHiddenSidebarContainer={() => undefined}
          />
          <DocRootLayoutMain hiddenSidebarContainer={false}>
            {props['children']}
          </DocRootLayoutMain>
        </div>
      </div>
    );
  }

  return (
    <div className="nova-doc-root">
      <div className="nova-container">
        <DocRootLayoutMain hiddenSidebarContainer={false}>
          {props['children']}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}

export default DocRootLayout;
