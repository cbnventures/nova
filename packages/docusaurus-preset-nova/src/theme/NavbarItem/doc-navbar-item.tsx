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
 * Renders a navigation link to a specific document resolved by ID
 * through the Docusaurus docs plugin, hiding the item when the target
 * document is null or unlisted.
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
  const pageActive: ThemeNavbarItemDocNavbarItemPageActive = activeDocContext['activeDoc'] !== undefined
    && layoutDoc !== null
    && activeDocContext['activeDoc']['sidebar'] === layoutDoc['sidebar'];

  // Draft and unlisted items are not displayed in the navbar.
  if (
    layoutDoc === null
    || (
      layoutDoc['unlisted'] === true
      && pageActive !== true
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
