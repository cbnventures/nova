import Link from '@docusaurus/Link';

import type {
  ThemeNavbarItemDefaultNavbarItemHref,
  ThemeNavbarItemDefaultNavbarItemLabel,
  ThemeNavbarItemDefaultNavbarItemLinkSpread,
  ThemeNavbarItemDefaultNavbarItemProps,
  ThemeNavbarItemDefaultNavbarItemTo,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Default Navbar Item - Default Navbar Item.
 *
 * Renders a standard navigation link using the Docusaurus
 * Link component, resolving destination from the to or href
 * prop with a plain text label.
 *
 * @param {ThemeNavbarItemDefaultNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DefaultNavbarItem(props: ThemeNavbarItemDefaultNavbarItemProps) {
  const label: ThemeNavbarItemDefaultNavbarItemLabel = props['label'];
  const to: ThemeNavbarItemDefaultNavbarItemTo = props['to'];
  const href: ThemeNavbarItemDefaultNavbarItemHref = props['href'];

  const linkSpread: ThemeNavbarItemDefaultNavbarItemLinkSpread = {};

  if (href !== undefined) {
    Reflect.set(linkSpread, 'href', href);
  }

  if (to !== undefined) {
    Reflect.set(linkSpread, 'to', to);
    Reflect.set(linkSpread, 'isNavLink', true);
  }

  return (
    <Link {...linkSpread}>
      {label}
    </Link>
  );
}

export default DefaultNavbarItem;
