import { useVersions } from '@docusaurus/plugin-content-docs/client';
import { translate } from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';

import DocsVersionDropdownNavbarItem from '../NavbarItem/docs-version-dropdown-navbar-item.js';

import type {
  ThemeDocSidebarDocSidebarNavAriaLabel,
  ThemeDocSidebarDocSidebarProps,
  ThemeDocSidebarDocSidebarVersions,
} from '../../types/theme/DocSidebar/index.d.ts';

/**
 * Theme - Doc Sidebar - Doc Sidebar.
 *
 * Renders a plain sidebar navigation wrapping an unordered list of sidebar
 * items, with no desktop/mobile split, no logo, and no collapse decoration.
 * The version switcher only renders when more than one version is configured.
 *
 * @param {ThemeDocSidebarDocSidebarProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebar(props: ThemeDocSidebarDocSidebarProps) {
  const navAriaLabel: ThemeDocSidebarDocSidebarNavAriaLabel = translate({
    id: 'theme.docs.sidebar.navAriaLabel',
    message: 'Docs sidebar',
    description: 'The ARIA label for the docs sidebar navigation',
  });
  const versions: ThemeDocSidebarDocSidebarVersions = useVersions(undefined);

  return (
    <nav
      className={(props['className'] !== undefined) ? `nova-sidebar ${props['className']}` : 'nova-sidebar'}
      style={props['style']}
      aria-label={navAriaLabel}
    >
      {
        (versions.length > 1) ? (
          <div className="nova-sidebar-version-switcher">
            <DocsVersionDropdownNavbarItem />
          </div>
        ) : null
      }
      <ul className="nova-sidebar-list">
        <DocSidebarItems
          items={props['sidebar']}
          activePath={props['path']}
          level={1}
        />
      </ul>
    </nav>
  );
}

export default DocSidebar;
