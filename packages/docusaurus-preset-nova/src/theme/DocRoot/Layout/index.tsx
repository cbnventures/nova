import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';

import type {
  Theme_DocRoot_Layout_Index_DocRootLayout_Props,
  Theme_DocRoot_Layout_Index_DocRootLayout_Sidebar,
} from '../../../types/theme/DocRoot/Layout/index.d.ts';

/**
 * Theme - Doc Root - Layout - Doc Root Layout.
 *
 * Replaces the default Docusaurus DocRoot layout with a plain wrapper
 * that renders a sidebar and main content area without flexbox,
 * module CSS, or collapsible sidebar state.
 *
 * @param {Theme_DocRoot_Layout_Index_DocRootLayout_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocRootLayout(props: Theme_DocRoot_Layout_Index_DocRootLayout_Props) {
  const sidebar: Theme_DocRoot_Layout_Index_DocRootLayout_Sidebar = useDocsSidebar();

  if (sidebar !== null && sidebar !== undefined) {
    return (
      <div
        className={(props['className'] !== undefined) ? `nova-doc-root ${props['className']}` : 'nova-doc-root'}
        style={props['style']}
      >
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
    <div
      className={(props['className'] !== undefined) ? `nova-doc-root ${props['className']}` : 'nova-doc-root'}
      style={props['style']}
    >
      <div className="nova-container">
        <DocRootLayoutMain hiddenSidebarContainer={false}>
          {props['children']}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}

export default DocRootLayout;
