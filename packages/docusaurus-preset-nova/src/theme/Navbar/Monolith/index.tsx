import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Logo from '@theme/Logo';
import NavbarItem from '@theme/NavbarItem';

import type { ThemeNavbarItem } from '../../../types/theme/Navbar/index.d.ts';
import type {
  ThemeNavbarMonolithIndexMonolithActionItems,
  ThemeNavbarMonolithIndexMonolithColorModeLabel,
  ThemeNavbarMonolithIndexMonolithHamburgerLabel,
  ThemeNavbarMonolithIndexMonolithNavAriaLabel,
  ThemeNavbarMonolithIndexMonolithNavbarClassName,
  ThemeNavbarMonolithIndexMonolithNavbarItemKey,
  ThemeNavbarMonolithIndexMonolithNavbarItemSpread,
  ThemeNavbarMonolithIndexMonolithOnColorModeToggle,
  ThemeNavbarMonolithIndexMonolithOnMenuToggle,
  ThemeNavbarMonolithIndexMonolithOpenMenuAriaLabel,
  ThemeNavbarMonolithIndexMonolithProps,
  ThemeNavbarMonolithIndexMonolithReturns,
  ThemeNavbarMonolithIndexMonolithSiteLogo,
  ThemeNavbarMonolithIndexMonolithToggleColorModeAriaLabel,
} from '../../../types/theme/Navbar/Monolith/index.d.ts';

/**
 * Theme - Navbar - Monolith.
 *
 * Minimal navigation layout with the site brand centered and only utility
 * action icons visible, omitting traditional navigation items
 * for a focused single-purpose interface.
 *
 * @param {ThemeNavbarMonolithIndexMonolithProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Monolith(props: ThemeNavbarMonolithIndexMonolithProps): ThemeNavbarMonolithIndexMonolithReturns {
  const siteLogo: ThemeNavbarMonolithIndexMonolithSiteLogo = props['siteLogo'];
  const actionItems: ThemeNavbarMonolithIndexMonolithActionItems = props['actionItems'];
  const colorModeLabel: ThemeNavbarMonolithIndexMonolithColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: ThemeNavbarMonolithIndexMonolithOnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: ThemeNavbarMonolithIndexMonolithHamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: ThemeNavbarMonolithIndexMonolithOnMenuToggle = props['onMenuToggle'];
  const navbarClassName: ThemeNavbarMonolithIndexMonolithNavbarClassName = 'nova-navbar-monolith';

  const navAriaLabel: ThemeNavbarMonolithIndexMonolithNavAriaLabel = translate({
    id: 'theme.navbar.navAriaLabel',
    message: 'Main',
    description: 'The ARIA label for the main site navigation landmark',
  });
  const openMenuAriaLabel: ThemeNavbarMonolithIndexMonolithOpenMenuAriaLabel = translate({
    id: 'theme.navbar.openMenuAriaLabel',
    message: 'Open menu',
    description: 'The ARIA label for the button that opens the mobile navigation menu',
  });
  const toggleColorModeAriaLabel: ThemeNavbarMonolithIndexMonolithToggleColorModeAriaLabel = translate({
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
            actionItems.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={(navItem['type'] as ThemeNavbarMonolithIndexMonolithNavbarItemKey) ?? (navItem['label'])}
                {...navItem as ThemeNavbarMonolithIndexMonolithNavbarItemSpread}
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
