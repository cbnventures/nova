import Link from '@docusaurus/Link';
import { useLayoutDocsSidebar } from '@docusaurus/plugin-content-docs/client';

import type {
  Theme_NavbarItem_DocSidebarNavbarItem_AriaCurrent,
  Theme_NavbarItem_DocSidebarNavbarItem_Label,
  Theme_NavbarItem_DocSidebarNavbarItem_Path,
  Theme_NavbarItem_DocSidebarNavbarItem_Props,
  Theme_NavbarItem_DocSidebarNavbarItem_SidebarActive,
  Theme_NavbarItem_DocSidebarNavbarItem_SidebarData,
  Theme_NavbarItem_DocSidebarNavbarItem_SidebarLink,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Doc Sidebar Navbar Item - Doc Sidebar Navbar Item.
 *
 * Renders a link to the first document of a named sidebar resolved through
 * the docs plugin, throwing an error when the sidebar has no link. Active
 * state is supplied by the coordinator via `isActiveItem`.
 *
 * @param {Theme_NavbarItem_DocSidebarNavbarItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarNavbarItem(props: Theme_NavbarItem_DocSidebarNavbarItem_Props) {
  const sidebarData: Theme_NavbarItem_DocSidebarNavbarItem_SidebarData = useLayoutDocsSidebar(props['sidebarId'], props['docsPluginId']);
  const sidebarLink: Theme_NavbarItem_DocSidebarNavbarItem_SidebarLink = sidebarData['link'];

  if (sidebarLink === undefined) {
    throw new Error(
      `DocSidebarNavbarItem: Sidebar with ID "${props['sidebarId']}" doesn't have anything to be linked to.`,
    );
  }

  const label: Theme_NavbarItem_DocSidebarNavbarItem_Label = props['label'] ?? sidebarLink['label'];
  const path: Theme_NavbarItem_DocSidebarNavbarItem_Path = sidebarLink['path'];
  const sidebarActive: Theme_NavbarItem_DocSidebarNavbarItem_SidebarActive = props['isActiveItem'] === true;
  const ariaCurrent: Theme_NavbarItem_DocSidebarNavbarItem_AriaCurrent = (sidebarActive === true) ? 'page' : undefined;

  return (
    <Link to={path} aria-current={ariaCurrent}>
      {label}
    </Link>
  );
}

export default DocSidebarNavbarItem;
