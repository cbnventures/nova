import { translate } from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';

import type {
  ThemeDocSidebarDocSidebarNavAriaLabel,
  ThemeDocSidebarDocSidebarProps,
} from '../../types/theme/DocSidebar/index.d.ts';

/**
 * Theme - Doc Sidebar - Doc Sidebar.
 *
 * Renders a plain sidebar navigation wrapping an unordered list of sidebar
 * items with no desktop/mobile split, no logo, and no collapse
 * button decoration.
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

  return (
    <nav className="nova-sidebar" aria-label={navAriaLabel}>
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
