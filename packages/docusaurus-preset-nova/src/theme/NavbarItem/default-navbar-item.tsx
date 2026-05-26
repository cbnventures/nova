import Link from '@docusaurus/Link';

import type {
  ThemeNavbarItemDefaultNavbarItemAriaCurrent,
  ThemeNavbarItemDefaultNavbarItemHref,
  ThemeNavbarItemDefaultNavbarItemIsActive,
  ThemeNavbarItemDefaultNavbarItemLabel,
  ThemeNavbarItemDefaultNavbarItemLinkSpread,
  ThemeNavbarItemDefaultNavbarItemProps,
  ThemeNavbarItemDefaultNavbarItemTo,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Default Navbar Item - Default Navbar Item.
 *
 * Renders a standard navigation link using the Docusaurus Link component,
 * resolving destination from the to or href prop with a plain text label.
 * Active state is supplied by the coordinator via `isActiveItem`.
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
  const isActive: ThemeNavbarItemDefaultNavbarItemIsActive = props['isActiveItem'] === true;
  const ariaCurrent: ThemeNavbarItemDefaultNavbarItemAriaCurrent = (isActive === true) ? 'page' : undefined;

  const linkSpread: ThemeNavbarItemDefaultNavbarItemLinkSpread = {};

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
