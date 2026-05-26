import Link from '@docusaurus/Link';
import { useLayoutDocsSidebar } from '@docusaurus/plugin-content-docs/client';

import type {
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
 * Renders a link to the first document of a named sidebar resolved through
 * the docs plugin, throwing an error when the sidebar has no link. Active
 * state is supplied by the coordinator via `isActiveItem`.
 *
 * @param {ThemeNavbarItemDocSidebarNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarNavbarItem(props: ThemeNavbarItemDocSidebarNavbarItemProps) {
  const sidebarData: ThemeNavbarItemDocSidebarNavbarItemSidebarData = useLayoutDocsSidebar(props['sidebarId'], props['docsPluginId']);
  const sidebarLink: ThemeNavbarItemDocSidebarNavbarItemSidebarLink = sidebarData['link'];

  if (sidebarLink === undefined) {
    throw new Error(
      `DocSidebarNavbarItem: Sidebar with ID "${props['sidebarId']}" doesn't have anything to be linked to.`,
    );
  }

  const label: ThemeNavbarItemDocSidebarNavbarItemLabel = props['label'] ?? sidebarLink['label'];
  const path: ThemeNavbarItemDocSidebarNavbarItemPath = sidebarLink['path'];
  const sidebarActive: ThemeNavbarItemDocSidebarNavbarItemSidebarActive = props['isActiveItem'] === true;
  const ariaCurrent: ThemeNavbarItemDocSidebarNavbarItemAriaCurrent = (sidebarActive === true) ? 'page' : undefined;

  return (
    <Link to={path} aria-current={ariaCurrent}>
      {label}
    </Link>
  );
}

export default DocSidebarNavbarItem;
