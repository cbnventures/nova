import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import DocSidebar from '@theme/DocSidebar';
import { useState } from 'react';

import type {
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_AsideClassName,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Collapsed,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_CollapsedState,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_DocsConfig,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Hideable,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_InitialCollapsed,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_NextCollapsedString,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Pathname,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SetCollapsed,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SidebarConfig,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_StoredValue,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ThemeConfig,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ThemeConfigCast,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ToggleIndicator,
  Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ToggleLabel,
  Theme_DocRoot_Layout_Sidebar_Index_SidebarCollapseAriaLabel,
  Theme_DocRoot_Layout_Sidebar_Index_SidebarExpandAriaLabel,
} from '../../../../types/theme/DocRoot/Layout/Sidebar/index.d.ts';

/**
 * Theme - Doc Root - Layout - Sidebar - Doc Root Layout Sidebar.
 *
 * Renders a plain aside element wrapping the DocSidebar component with
 * an optional collapse toggle button when the hideable setting is
 * enabled, persisting the collapsed state in localStorage.
 *
 * @param {Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocRootLayoutSidebar(props: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Props) {
  const themeConfig: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ThemeConfig = useThemeConfig() as Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ThemeConfigCast as Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ThemeConfig;
  const docsConfig: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_DocsConfig = themeConfig['docs'] as Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_DocsConfig;
  const sidebarConfig: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SidebarConfig = docsConfig['sidebar'];
  const hideableValue: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Hideable = (sidebarConfig['hideable'] ?? false);
  const pathname: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Pathname = useLocation()['pathname'];

  const initialCollapsed: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_InitialCollapsed = (() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const storedValue: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_StoredValue = localStorage.getItem('docusaurus.sidebar.collapsed');

    return storedValue === 'true';
  })();

  const collapsedState: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_CollapsedState = useState<Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Collapsed>(initialCollapsed);
  const collapsed: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Collapsed = collapsedState[0];
  const setCollapsed: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_SetCollapsed = collapsedState[1];

  const expandAriaLabel: Theme_DocRoot_Layout_Sidebar_Index_SidebarExpandAriaLabel = translate({
    id: 'theme.docs.sidebar.expandButtonAriaLabel',
    message: 'Expand sidebar',
    description: 'The ARIA label for the button that expands the doc sidebar',
  });
  const collapseAriaLabel: Theme_DocRoot_Layout_Sidebar_Index_SidebarCollapseAriaLabel = translate({
    id: 'theme.docs.sidebar.collapseButtonAriaLabel',
    message: 'Collapse sidebar',
    description: 'The ARIA label for the button that collapses the doc sidebar',
  });

  const baseAsideClassName: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_AsideClassName = (collapsed === true) ? 'nova-col-12 nova-col-lg-3 nova-sidebar-collapsed' : 'nova-col-12 nova-col-lg-3';
  const asideClassName: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_AsideClassName = (props['className'] !== undefined) ? `${baseAsideClassName} ${props['className']}` : baseAsideClassName;
  const toggleLabel: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ToggleLabel = (collapsed === true) ? expandAriaLabel : collapseAriaLabel;
  const toggleIndicator: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_ToggleIndicator = (collapsed === true) ? '\u00BB' : '\u00AB';

  return (
    <aside
      className={asideClassName}
      style={props['style']}
    >
      <DocSidebar
        sidebar={props['sidebar']}
        path={pathname}
        onCollapse={() => undefined}
        isHidden={false}
      />
      {(hideableValue === true) && (
        <button
          type="button"
          className="nova-sidebar-toggle"
          aria-label={toggleLabel}
          onClick={() => {
            const nextCollapsed: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_Collapsed = collapsed === false;

            setCollapsed(nextCollapsed);

            const nextCollapsedString: Theme_DocRoot_Layout_Sidebar_Index_DocRootLayoutSidebar_NextCollapsedString = String(nextCollapsed);

            localStorage.setItem('docusaurus.sidebar.collapsed', nextCollapsedString);

            return undefined;
          }}
        >
          {toggleIndicator}
        </button>
      )}
    </aside>
  );
}

export default DocRootLayoutSidebar;
