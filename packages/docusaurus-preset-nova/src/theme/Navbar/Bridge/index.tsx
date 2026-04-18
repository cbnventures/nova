import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import NavbarItem from '@theme/NavbarItem';
import { SearchInput, SearchProvider, SearchResults } from '@theme/SearchBar';

import type {
  ThemeNavbarBridgeIndexBridgeColorModeLabel,
  ThemeNavbarBridgeIndexBridgeHamburgerLabel,
  ThemeNavbarBridgeIndexBridgeItems,
  ThemeNavbarBridgeIndexBridgeNavbarClassName,
  ThemeNavbarBridgeIndexBridgeNavbarItemSpread,
  ThemeNavbarBridgeIndexBridgeOnColorModeToggle,
  ThemeNavbarBridgeIndexBridgeOnMenuToggle,
  ThemeNavbarBridgeIndexBridgeOpenMenuAriaLabel,
  ThemeNavbarBridgeIndexBridgeProps,
  ThemeNavbarBridgeIndexBridgeReturns,
  ThemeNavbarBridgeIndexBridgeSiteLogo,
  ThemeNavbarBridgeIndexBridgeToggleColorModeAriaLabel,
} from '../../../types/theme/Navbar/Bridge/index.d.ts';

import type { ThemeNavbarItem } from '../../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar - Bridge.
 *
 * Split navigation layout with the site brand anchored to the left,
 * navigation items in the center-left region, and action
 * buttons grouped to the right.
 *
 * @param {ThemeNavbarBridgeIndexBridgeProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Bridge(props: ThemeNavbarBridgeIndexBridgeProps): ThemeNavbarBridgeIndexBridgeReturns {
  const siteLogo: ThemeNavbarBridgeIndexBridgeSiteLogo = props['siteLogo'];
  const items: ThemeNavbarBridgeIndexBridgeItems = props['items'];
  const colorModeLabel: ThemeNavbarBridgeIndexBridgeColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: ThemeNavbarBridgeIndexBridgeOnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: ThemeNavbarBridgeIndexBridgeHamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: ThemeNavbarBridgeIndexBridgeOnMenuToggle = props['onMenuToggle'];
  const navbarClassName: ThemeNavbarBridgeIndexBridgeNavbarClassName = 'nova-navbar-bridge';

  const openMenuAriaLabel: ThemeNavbarBridgeIndexBridgeOpenMenuAriaLabel = translate({
    id: 'theme.navbar.openMenuAriaLabel',
    message: 'Open menu',
    description: 'The ARIA label for the button that opens the mobile navigation menu',
  });
  const toggleColorModeAriaLabel: ThemeNavbarBridgeIndexBridgeToggleColorModeAriaLabel = translate({
    id: 'theme.colorMode.toggleAriaLabel',
    message: 'Toggle color mode',
    description: 'The ARIA label for the button that cycles through color modes',
  });

  return (
    <nav className={navbarClassName}>
      <div className="nova-navbar-bridge nova-container">
        <div className="nova-navbar-bridge-brand">
          <Link to={siteLogo['href'] ?? '/'}>
            {(siteLogo['wordmark'] !== undefined) && (
              <img
                className={(siteLogo['wordmarkDark'] !== undefined) ? 'nova-brand-light' : undefined}
                src={siteLogo['wordmark']}
                alt={siteLogo['alt']}
              />
            )}
            {(
              siteLogo['wordmark'] !== undefined
              && siteLogo['wordmarkDark'] !== undefined
            ) && (
              <img
                className="nova-brand-dark"
                src={siteLogo['wordmarkDark']}
                alt={siteLogo['alt']}
              />
            )}
            {(
              siteLogo['wordmark'] === undefined
              && siteLogo['src'] !== undefined
            ) && (
              <img
                className={(siteLogo['srcDark'] !== undefined) ? 'nova-brand-light' : undefined}
                src={siteLogo['src']}
                alt={siteLogo['alt']}
              />
            )}
            {(
              siteLogo['wordmark'] === undefined
              && siteLogo['src'] !== undefined
              && siteLogo['srcDark'] !== undefined
            ) && (
              <img
                className="nova-brand-dark"
                src={siteLogo['srcDark']}
                alt={siteLogo['alt']}
              />
            )}
            {(
              siteLogo['wordmark'] === undefined
              && siteLogo['title'] !== undefined
            ) && (
              <span>{siteLogo['title']}</span>
            )}
          </Link>
        </div>
        <div className="nova-navbar-bridge-items">
          {
            items.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as ThemeNavbarBridgeIndexBridgeNavbarItemSpread}
              />
            ))
          }
        </div>
        <div className="nova-navbar-bridge-actions">
          <SearchProvider>
            <div className="nova-search-anchor">
              <SearchInput />
              <SearchResults />
            </div>
          </SearchProvider>
          <button
            className="nova-hamburger-toggle"
            type="button"
            onClick={onMenuToggle}
            aria-label={openMenuAriaLabel}
          >
            {hamburgerLabel}
          </button>
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

export default Bridge;
