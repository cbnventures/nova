import Link from '@docusaurus/Link';
import {
  useActiveDocContext,
  useLayoutDoc,
} from '@docusaurus/plugin-content-docs/client';

import type {
  ThemeNavbarItemDocNavbarItemActiveDocContext,
  ThemeNavbarItemDocNavbarItemAriaCurrent,
  ThemeNavbarItemDocNavbarItemLabel,
  ThemeNavbarItemDocNavbarItemLayoutDoc,
  ThemeNavbarItemDocNavbarItemPageActive,
  ThemeNavbarItemDocNavbarItemPath,
  ThemeNavbarItemDocNavbarItemProps,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Doc Navbar Item - Doc Navbar Item.
 *
 * Renders a navigation link to a specific document resolved by ID through
 * the docs plugin, hiding the item when the target is null or unlisted.
 * Active state is supplied by the coordinator via `isActiveItem`.
 *
 * @param {ThemeNavbarItemDocNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocNavbarItem(props: ThemeNavbarItemDocNavbarItemProps) {
  const activeDocContext: ThemeNavbarItemDocNavbarItemActiveDocContext = useActiveDocContext(props['docsPluginId']);
  const layoutDoc: ThemeNavbarItemDocNavbarItemLayoutDoc = useLayoutDoc(props['docId'], props['docsPluginId']);
  const pageActive: ThemeNavbarItemDocNavbarItemPageActive = props['isActiveItem'] === true;

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

  const label: ThemeNavbarItemDocNavbarItemLabel = props['label'] ?? layoutDoc['id'];
  const path: ThemeNavbarItemDocNavbarItemPath = layoutDoc['path'];
  const ariaCurrent: ThemeNavbarItemDocNavbarItemAriaCurrent = (pageActive === true) ? 'page' : undefined;

  return (
    <Link to={path} aria-current={ariaCurrent}>
      {label}
    </Link>
  );
}

export default DocNavbarItem;
