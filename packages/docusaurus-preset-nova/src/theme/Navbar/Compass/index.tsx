import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import NavbarItem from '@theme/NavbarItem';
import { SearchInput, SearchProvider, SearchResults } from '@theme/SearchBar';

import type {
  ThemeNavbarCompassIndexCompassColorModeLabel,
  ThemeNavbarCompassIndexCompassHamburgerLabel,
  ThemeNavbarCompassIndexCompassItems,
  ThemeNavbarCompassIndexCompassNavbarClassName,
  ThemeNavbarCompassIndexCompassNavbarItemSpread,
  ThemeNavbarCompassIndexCompassOnColorModeToggle,
  ThemeNavbarCompassIndexCompassOnMenuToggle,
  ThemeNavbarCompassIndexCompassOpenMenuAriaLabel,
  ThemeNavbarCompassIndexCompassProps,
  ThemeNavbarCompassIndexCompassReturns,
  ThemeNavbarCompassIndexCompassSiteLogo,
  ThemeNavbarCompassIndexCompassToggleColorModeAriaLabel,
} from '../../../types/theme/Navbar/Compass/index.d.ts';

import type { ThemeNavbarItem } from '../../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar - Compass.
 *
 * Search-forward navigation layout with the site brand on the left, a dominant
 * search bar occupying the center region, and minimal action
 * buttons with navigation items grouped to the right.
 *
 * @param {ThemeNavbarCompassIndexCompassProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Compass(props: ThemeNavbarCompassIndexCompassProps): ThemeNavbarCompassIndexCompassReturns {
  const siteLogo: ThemeNavbarCompassIndexCompassSiteLogo = props['siteLogo'];
  const items: ThemeNavbarCompassIndexCompassItems = props['items'];
  const colorModeLabel: ThemeNavbarCompassIndexCompassColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: ThemeNavbarCompassIndexCompassOnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: ThemeNavbarCompassIndexCompassHamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: ThemeNavbarCompassIndexCompassOnMenuToggle = props['onMenuToggle'];
  const navbarClassName: ThemeNavbarCompassIndexCompassNavbarClassName = 'nova-navbar-compass';

  const openMenuAriaLabel: ThemeNavbarCompassIndexCompassOpenMenuAriaLabel = translate({
    id: 'theme.navbar.openMenuAriaLabel',
    message: 'Open menu',
    description: 'The ARIA label for the button that opens the mobile navigation menu',
  });
  const toggleColorModeAriaLabel: ThemeNavbarCompassIndexCompassToggleColorModeAriaLabel = translate({
    id: 'theme.colorMode.toggleAriaLabel',
    message: 'Toggle color mode',
    description: 'The ARIA label for the button that cycles through color modes',
  });

  return (
    <nav className={navbarClassName}>
      <div className="nova-navbar-compass nova-container">
        <div className="nova-navbar-compass-brand">
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
        <div className="nova-navbar-compass-items">
          {
            items.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as ThemeNavbarCompassIndexCompassNavbarItemSpread}
              />
            ))
          }
        </div>
        <div className="nova-navbar-compass-actions">
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

export default Compass;
