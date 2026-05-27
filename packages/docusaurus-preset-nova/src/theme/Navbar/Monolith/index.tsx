import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Logo from '@theme/Logo';
import NavbarItem from '@theme/NavbarItem';

import type { Theme_Navbar_Index_Navbar_Item } from '../../../types/theme/Navbar/index.d.ts';
import type {
  Theme_Navbar_Monolith_Index_Monolith_ActionItems,
  Theme_Navbar_Monolith_Index_Monolith_ColorModeLabel,
  Theme_Navbar_Monolith_Index_Monolith_HamburgerLabel,
  Theme_Navbar_Monolith_Index_Monolith_NavAriaLabel,
  Theme_Navbar_Monolith_Index_Monolith_NavbarClassName,
  Theme_Navbar_Monolith_Index_Monolith_NavbarItemKey,
  Theme_Navbar_Monolith_Index_Monolith_NavbarItemSpread,
  Theme_Navbar_Monolith_Index_Monolith_OnColorModeToggle,
  Theme_Navbar_Monolith_Index_Monolith_OnMenuToggle,
  Theme_Navbar_Monolith_Index_Monolith_OpenMenuAriaLabel,
  Theme_Navbar_Monolith_Index_Monolith_Props,
  Theme_Navbar_Monolith_Index_Monolith_Returns,
  Theme_Navbar_Monolith_Index_Monolith_SiteLogo,
  Theme_Navbar_Monolith_Index_Monolith_ToggleColorModeAriaLabel,
} from '../../../types/theme/Navbar/Monolith/index.d.ts';

/**
 * Theme - Navbar - Monolith.
 *
 * Minimal navigation layout with the site brand centered and only utility
 * action icons visible, omitting traditional navigation items
 * for a focused single-purpose interface.
 *
 * @param {Theme_Navbar_Monolith_Index_Monolith_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Monolith(props: Theme_Navbar_Monolith_Index_Monolith_Props): Theme_Navbar_Monolith_Index_Monolith_Returns {
  const siteLogo: Theme_Navbar_Monolith_Index_Monolith_SiteLogo = props['siteLogo'];
  const actionItems: Theme_Navbar_Monolith_Index_Monolith_ActionItems = props['actionItems'];
  const colorModeLabel: Theme_Navbar_Monolith_Index_Monolith_ColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: Theme_Navbar_Monolith_Index_Monolith_OnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: Theme_Navbar_Monolith_Index_Monolith_HamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: Theme_Navbar_Monolith_Index_Monolith_OnMenuToggle = props['onMenuToggle'];
  const navbarClassName: Theme_Navbar_Monolith_Index_Monolith_NavbarClassName = 'nova-navbar-monolith';

  const navAriaLabel: Theme_Navbar_Monolith_Index_Monolith_NavAriaLabel = translate({
    id: 'theme.navbar.navAriaLabel',
    message: 'Main',
    description: 'The ARIA label for the main site navigation landmark',
  });
  const openMenuAriaLabel: Theme_Navbar_Monolith_Index_Monolith_OpenMenuAriaLabel = translate({
    id: 'theme.navbar.openMenuAriaLabel',
    message: 'Open menu',
    description: 'The ARIA label for the button that opens the mobile navigation menu',
  });
  const toggleColorModeAriaLabel: Theme_Navbar_Monolith_Index_Monolith_ToggleColorModeAriaLabel = translate({
    id: 'theme.colorMode.toggleAriaLabel',
    message: 'Toggle color mode',
    description: 'The ARIA label for the button that cycles through color modes',
  });

  return (
    <nav
      className={(props['className'] !== undefined) ? `${navbarClassName} ${props['className']}` : navbarClassName}
      style={props['style']}
      aria-label={navAriaLabel}
    >
      <div className="nova-container">
        <div className="nova-navbar-monolith-brand">
          <Link
            to={siteLogo['href'] ?? '/'}
            target={siteLogo['target']}
            rel={siteLogo['rel']}
            aria-label={siteLogo['ariaLabel']}
          >
            <Logo siteLogo={siteLogo} />
          </Link>
        </div>
        <div className="nova-navbar-monolith-actions">
          <button
            className="nova-hamburger-toggle"
            type="button"
            onClick={onMenuToggle}
            aria-label={openMenuAriaLabel}
          >
            {hamburgerLabel}
          </button>
          {
            actionItems.map((navItem: Theme_Navbar_Index_Navbar_Item) => (
              <NavbarItem
                key={(navItem['type'] as Theme_Navbar_Monolith_Index_Monolith_NavbarItemKey) ?? (navItem['label'])}
                {...navItem as Theme_Navbar_Monolith_Index_Monolith_NavbarItemSpread}
              />
            ))
          }
          <button
            className="nova-color-mode-toggle"
            type="button"
            onClick={onColorModeToggle}
            aria-label={toggleColorModeAriaLabel}
          >
            {colorModeLabel}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Monolith;
