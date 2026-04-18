import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import DocSidebar from '@theme/DocSidebar';
import { useState } from 'react';

import type {
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarAsideClassName,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsed,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsedState,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarDocsConfig,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarHideable,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarInitialCollapsed,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarNextCollapsedString,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarPathname,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarProps,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarSetCollapsed,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarSidebarConfig,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarStoredValue,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarThemeConfig,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarThemeConfigCast,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarToggleIndicator,
  ThemeDocRootLayoutSidebarDocRootLayoutSidebarToggleLabel,
  ThemeDocRootLayoutSidebarSidebarCollapseAriaLabel,
  ThemeDocRootLayoutSidebarSidebarExpandAriaLabel,
} from '../../../../types/theme/DocRoot/Layout/Sidebar/index.d.ts';

/**
 * Theme - Doc Root - Layout - Sidebar - Doc Root Layout Sidebar.
 *
 * Renders a plain aside element wrapping the DocSidebar component with
 * an optional collapse toggle button when the hideable setting is
 * enabled, persisting the collapsed state in localStorage.
 *
 * @param {ThemeDocRootLayoutSidebarDocRootLayoutSidebarProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocRootLayoutSidebar(props: ThemeDocRootLayoutSidebarDocRootLayoutSidebarProps) {
  const themeConfig: ThemeDocRootLayoutSidebarDocRootLayoutSidebarThemeConfig = useThemeConfig() as ThemeDocRootLayoutSidebarDocRootLayoutSidebarThemeConfigCast as ThemeDocRootLayoutSidebarDocRootLayoutSidebarThemeConfig;
  const docsConfig: ThemeDocRootLayoutSidebarDocRootLayoutSidebarDocsConfig = themeConfig['docs'] as ThemeDocRootLayoutSidebarDocRootLayoutSidebarDocsConfig;
  const sidebarConfig: ThemeDocRootLayoutSidebarDocRootLayoutSidebarSidebarConfig = docsConfig['sidebar'];
  const hideableValue: ThemeDocRootLayoutSidebarDocRootLayoutSidebarHideable = (sidebarConfig['hideable'] ?? false);
  const pathname: ThemeDocRootLayoutSidebarDocRootLayoutSidebarPathname = useLocation()['pathname'];

  const initialCollapsed: ThemeDocRootLayoutSidebarDocRootLayoutSidebarInitialCollapsed = (() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const storedValue: ThemeDocRootLayoutSidebarDocRootLayoutSidebarStoredValue = localStorage.getItem('docusaurus.sidebar.collapsed');

    return storedValue === 'true';
  })();

  const collapsedState: ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsedState = useState<ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsed>(initialCollapsed);
  const collapsed: ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsed = collapsedState[0];
  const setCollapsed: ThemeDocRootLayoutSidebarDocRootLayoutSidebarSetCollapsed = collapsedState[1];

  const expandAriaLabel: ThemeDocRootLayoutSidebarSidebarExpandAriaLabel = translate({
    id: 'theme.docs.sidebar.expandButtonAriaLabel',
    message: 'Expand sidebar',
    description: 'The ARIA label for the button that expands the doc sidebar',
  });
  const collapseAriaLabel: ThemeDocRootLayoutSidebarSidebarCollapseAriaLabel = translate({
    id: 'theme.docs.sidebar.collapseButtonAriaLabel',
    message: 'Collapse sidebar',
    description: 'The ARIA label for the button that collapses the doc sidebar',
  });

  const asideClassName: ThemeDocRootLayoutSidebarDocRootLayoutSidebarAsideClassName = (collapsed === true) ? 'nova-col-12 nova-col-lg-3 nova-sidebar-collapsed' : 'nova-col-12 nova-col-lg-3';
  const toggleLabel: ThemeDocRootLayoutSidebarDocRootLayoutSidebarToggleLabel = (collapsed === true) ? expandAriaLabel : collapseAriaLabel;
  const toggleIndicator: ThemeDocRootLayoutSidebarDocRootLayoutSidebarToggleIndicator = (collapsed === true) ? '\u00BB' : '\u00AB';

  return (
    <aside className={asideClassName}>
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
            const nextCollapsed: ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsed = collapsed === false;

            setCollapsed(nextCollapsed);

            const nextCollapsedString: ThemeDocRootLayoutSidebarDocRootLayoutSidebarNextCollapsedString = String(nextCollapsed);

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
