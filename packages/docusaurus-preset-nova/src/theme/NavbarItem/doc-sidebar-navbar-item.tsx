import Link from '@docusaurus/Link';
import {
  useActiveDocContext,
  useLayoutDocsSidebar,
} from '@docusaurus/plugin-content-docs/client';

import type {
  ThemeNavbarItemDocSidebarNavbarItemActiveDocContext,
  ThemeNavbarItemDocSidebarNavbarItemAriaCurrent,
  ThemeNavbarItemDocSidebarNavbarItemLabel,
  ThemeNavbarItemDocSidebarNavbarItemPath,
  ThemeNavbarItemDocSidebarNavbarItemProps,
  ThemeNavbarItemDocSidebarNavbarItemSidebarActive,
  ThemeNavbarItemDocSidebarNavbarItemSidebarData,
  ThemeNavbarItemDocSidebarNavbarItemSidebarLink,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Doc Sidebar Navbar Item - Doc Sidebar Navbar Item.
 *
 * Renders a navigation link to the first document of a named
 * sidebar resolved through the Docusaurus docs plugin, throwing
 * an error when the sidebar has no link.
 *
 * @param {ThemeNavbarItemDocSidebarNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarNavbarItem(props: ThemeNavbarItemDocSidebarNavbarItemProps) {
  const activeDocContext: ThemeNavbarItemDocSidebarNavbarItemActiveDocContext = useActiveDocContext(props['docsPluginId']);
  const sidebarData: ThemeNavbarItemDocSidebarNavbarItemSidebarData = useLayoutDocsSidebar(props['sidebarId'], props['docsPluginId']);
  const sidebarLink: ThemeNavbarItemDocSidebarNavbarItemSidebarLink = sidebarData['link'];

  if (sidebarLink === undefined) {
    throw new Error(
      `DocSidebarNavbarItem: Sidebar with ID "${props['sidebarId']}" doesn't have anything to be linked to.`,
    );
  }

  const label: ThemeNavbarItemDocSidebarNavbarItemLabel = props['label'] ?? sidebarLink['label'];
  const path: ThemeNavbarItemDocSidebarNavbarItemPath = sidebarLink['path'];
  const sidebarActive: ThemeNavbarItemDocSidebarNavbarItemSidebarActive = activeDocContext['activeDoc'] !== undefined
    && activeDocContext['activeDoc']['sidebar'] === props['sidebarId'];
  const ariaCurrent: ThemeNavbarItemDocSidebarNavbarItemAriaCurrent = (sidebarActive === true) ? 'page' : undefined;

  return (
    <Link to={path} aria-current={ariaCurrent}>
      {label}
    </Link>
  );
}

export default DocSidebarNavbarItem;
