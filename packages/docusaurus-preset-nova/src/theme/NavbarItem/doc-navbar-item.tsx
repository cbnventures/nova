import Link from '@docusaurus/Link';
import {
  useActiveDocContext,
  useLayoutDoc,
} from '@docusaurus/plugin-content-docs/client';

import type {
  Theme_NavbarItem_DocNavbarItem_ActiveDocContext,
  Theme_NavbarItem_DocNavbarItem_AriaCurrent,
  Theme_NavbarItem_DocNavbarItem_Label,
  Theme_NavbarItem_DocNavbarItem_LayoutDoc,
  Theme_NavbarItem_DocNavbarItem_PageActive,
  Theme_NavbarItem_DocNavbarItem_Path,
  Theme_NavbarItem_DocNavbarItem_Props,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Doc Navbar Item - Doc Navbar Item.
 *
 * Renders a navigation link to a specific document resolved by ID through
 * the docs plugin, hiding the item when the target is null or unlisted.
 * Active state is supplied by the coordinator via `isActiveItem`.
 *
 * @param {Theme_NavbarItem_DocNavbarItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocNavbarItem(props: Theme_NavbarItem_DocNavbarItem_Props) {
  const activeDocContext: Theme_NavbarItem_DocNavbarItem_ActiveDocContext = useActiveDocContext(props['docsPluginId']);
  const layoutDoc: Theme_NavbarItem_DocNavbarItem_LayoutDoc = useLayoutDoc(props['docId'], props['docsPluginId']);
  const pageActive: Theme_NavbarItem_DocNavbarItem_PageActive = props['isActiveItem'] === true;

  // Draft and unlisted items are not displayed in the navbar. Unlisted items
  // are still shown when the user is reading them, so the sidebar check
  // mirrors the docs plugin's own "active doc lives in this sidebar" rule.
  if (
    layoutDoc === null
    || (
      layoutDoc['unlisted'] === true
      && (
        activeDocContext['activeDoc'] === undefined
        || activeDocContext['activeDoc']['sidebar'] !== layoutDoc['sidebar']
      )
    )
  ) {
    return undefined;
  }

  const label: Theme_NavbarItem_DocNavbarItem_Label = props['label'] ?? layoutDoc['id'];
  const path: Theme_NavbarItem_DocNavbarItem_Path = layoutDoc['path'];
  const ariaCurrent: Theme_NavbarItem_DocNavbarItem_AriaCurrent = (pageActive === true) ? 'page' : undefined;

  return (
    <Link to={path} aria-current={ariaCurrent}>
      {label}
    </Link>
  );
}

export default DocNavbarItem;
