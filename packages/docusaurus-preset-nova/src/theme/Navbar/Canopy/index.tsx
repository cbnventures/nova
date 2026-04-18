import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import NavbarItem from '@theme/NavbarItem';
import { SearchInput, SearchProvider, SearchResults } from '@theme/SearchBar';

import type {
  ThemeNavbarCanopyIndexCanopyColorModeLabel,
  ThemeNavbarCanopyIndexCanopyHamburgerLabel,
  ThemeNavbarCanopyIndexCanopyItems,
  ThemeNavbarCanopyIndexCanopyNavbarClassName,
  ThemeNavbarCanopyIndexCanopyNavbarItemSpread,
  ThemeNavbarCanopyIndexCanopyOnColorModeToggle,
  ThemeNavbarCanopyIndexCanopyOnMenuToggle,
  ThemeNavbarCanopyIndexCanopyOpenMenuAriaLabel,
  ThemeNavbarCanopyIndexCanopyProps,
  ThemeNavbarCanopyIndexCanopyReturns,
  ThemeNavbarCanopyIndexCanopySiteLogo,
  ThemeNavbarCanopyIndexCanopyToggleColorModeAriaLabel,
} from '../../../types/theme/Navbar/Canopy/index.d.ts';

import type { ThemeNavbarItem } from '../../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar - Canopy.
 *
 * Centered brand layout with the site logo and title positioned at the
 * top center, navigation items expanding into dropdowns below,
 * and action buttons aligned to the right.
 *
 * @param {ThemeNavbarCanopyIndexCanopyProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Canopy(props: ThemeNavbarCanopyIndexCanopyProps): ThemeNavbarCanopyIndexCanopyReturns {
  const siteLogo: ThemeNavbarCanopyIndexCanopySiteLogo = props['siteLogo'];
  const items: ThemeNavbarCanopyIndexCanopyItems = props['items'];
  const colorModeLabel: ThemeNavbarCanopyIndexCanopyColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: ThemeNavbarCanopyIndexCanopyOnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: ThemeNavbarCanopyIndexCanopyHamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: ThemeNavbarCanopyIndexCanopyOnMenuToggle = props['onMenuToggle'];
  const navbarClassName: ThemeNavbarCanopyIndexCanopyNavbarClassName = 'nova-navbar-canopy';

  const openMenuAriaLabel: ThemeNavbarCanopyIndexCanopyOpenMenuAriaLabel = translate({
    id: 'theme.navbar.openMenuAriaLabel',
    message: 'Open menu',
    description: 'The ARIA label for the button that opens the mobile navigation menu',
  });
  const toggleColorModeAriaLabel: ThemeNavbarCanopyIndexCanopyToggleColorModeAriaLabel = translate({
    id: 'theme.colorMode.toggleAriaLabel',
    message: 'Toggle color mode',
    description: 'The ARIA label for the button that cycles through color modes',
  });

  return (
    <nav className={navbarClassName}>
      <div className="nova-navbar-canopy nova-container">
        <div className="nova-navbar-canopy-brand">
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
        <div className="nova-navbar-canopy-items">
          {
            items.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as ThemeNavbarCanopyIndexCanopyNavbarItemSpread}
              />
            ))
          }
        </div>
        <div className="nova-navbar-canopy-actions">
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

export default Canopy;
