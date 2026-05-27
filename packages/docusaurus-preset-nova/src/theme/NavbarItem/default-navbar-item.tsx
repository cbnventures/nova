import Link from '@docusaurus/Link';

import type {
  Theme_NavbarItem_DefaultNavbarItem_AriaCurrent,
  Theme_NavbarItem_DefaultNavbarItem_Href,
  Theme_NavbarItem_DefaultNavbarItem_IsActive,
  Theme_NavbarItem_DefaultNavbarItem_Label,
  Theme_NavbarItem_DefaultNavbarItem_LinkSpread,
  Theme_NavbarItem_DefaultNavbarItem_Props,
  Theme_NavbarItem_DefaultNavbarItem_To,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Default Navbar Item - Default Navbar Item.
 *
 * Renders a standard navigation link using the Docusaurus Link component,
 * resolving destination from the to or href prop with a plain text label.
 * Active state is supplied by the coordinator via `isActiveItem`.
 *
 * @param {Theme_NavbarItem_DefaultNavbarItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DefaultNavbarItem(props: Theme_NavbarItem_DefaultNavbarItem_Props) {
  const label: Theme_NavbarItem_DefaultNavbarItem_Label = props['label'];
  const to: Theme_NavbarItem_DefaultNavbarItem_To = props['to'];
  const href: Theme_NavbarItem_DefaultNavbarItem_Href = props['href'];
  const isActive: Theme_NavbarItem_DefaultNavbarItem_IsActive = props['isActiveItem'] === true;
  const ariaCurrent: Theme_NavbarItem_DefaultNavbarItem_AriaCurrent = (isActive === true) ? 'page' : undefined;

  const linkSpread: Theme_NavbarItem_DefaultNavbarItem_LinkSpread = {};

  if (href !== undefined) {
    Reflect.set(linkSpread, 'href', href);
  }

  if (to !== undefined) {
    Reflect.set(linkSpread, 'to', to);
  }

  if (ariaCurrent !== undefined) {
    Reflect.set(linkSpread, 'aria-current', ariaCurrent);
  }

  return (
    <Link {...linkSpread}>
      {label}
    </Link>
  );
}

export default DefaultNavbarItem;
