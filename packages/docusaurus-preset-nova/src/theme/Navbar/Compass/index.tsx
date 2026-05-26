import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Logo from '@theme/Logo';
import NavbarItem from '@theme/NavbarItem';
import { SearchInput, SearchProvider, SearchResults } from '@theme/SearchBar';

import { useNavbarOverflow } from '../../../lib/use-navbar-overflow.js';
import More from '../More/index.js';

import type {
  LibUseNavbarOverflowHasOverflow,
  LibUseNavbarOverflowMeasureRef,
  LibUseNavbarOverflowMeasuring,
  LibUseNavbarOverflowReturns,
  LibUseNavbarOverflowVisibleCount,
} from '../../../types/lib/use-navbar-overflow.d.ts';

import type {
  ThemeNavbarCompassIndexCompassActionItems,
  ThemeNavbarCompassIndexCompassActiveItemLabel,
  ThemeNavbarCompassIndexCompassColorModeLabel,
  ThemeNavbarCompassIndexCompassHamburgerLabel,
  ThemeNavbarCompassIndexCompassItems,
  ThemeNavbarCompassIndexCompassNavAriaLabel,
  ThemeNavbarCompassIndexCompassNavbarClassName,
  ThemeNavbarCompassIndexCompassNavbarItemKey,
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
  const actionItems: ThemeNavbarCompassIndexCompassActionItems = props['actionItems'];
  const colorModeLabel: ThemeNavbarCompassIndexCompassColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: ThemeNavbarCompassIndexCompassOnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: ThemeNavbarCompassIndexCompassHamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: ThemeNavbarCompassIndexCompassOnMenuToggle = props['onMenuToggle'];
  const activeItemLabel: ThemeNavbarCompassIndexCompassActiveItemLabel = props['activeItemLabel'];
  const navbarClassName: ThemeNavbarCompassIndexCompassNavbarClassName = 'nova-navbar-compass';

  const navAriaLabel: ThemeNavbarCompassIndexCompassNavAriaLabel = translate({
    id: 'theme.navbar.navAriaLabel',
    message: 'Main',
    description: 'The ARIA label for the main site navigation landmark',
  });
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

  const overflow: LibUseNavbarOverflowReturns = useNavbarOverflow({
    items,
    budgetVariable: '--nova-navbar-compass-items-max-width',
    triggerVariable: '--nova-navbar-more-width',
  });
  const measureRef: LibUseNavbarOverflowMeasureRef = overflow['measureRef'];
  const visibleCount: LibUseNavbarOverflowVisibleCount = overflow['visibleCount'];
  const hasOverflow: LibUseNavbarOverflowHasOverflow = overflow['hasOverflow'];
  const measuring: LibUseNavbarOverflowMeasuring = overflow['measuring'];
  const visibleItems: ThemeNavbarCompassIndexCompassItems = items.slice(0, visibleCount);
  const overflowItems: ThemeNavbarCompassIndexCompassItems = items.slice(visibleCount);

  return (
    <nav
      className={(props['className'] !== undefined) ? `${navbarClassName} ${props['className']}` : navbarClassName}
      style={props['style']}
      aria-label={navAriaLabel}
    >
      <div className="nova-container">
        <div className="nova-navbar-compass-brand">
          <Link
            to={siteLogo['href'] ?? '/'}
            target={siteLogo['target']}
            rel={siteLogo['rel']}
            aria-label={siteLogo['ariaLabel']}
          >
            <Logo siteLogo={siteLogo} />
          </Link>
        </div>
        <div ref={measureRef} className="nova-navbar-compass-items nova-navbar-items-measure" aria-hidden="true">
          {
            items.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as ThemeNavbarCompassIndexCompassNavbarItemSpread}
                isActiveItem={navItem['label'] === activeItemLabel}
              />
            ))
          }
        </div>
        <div className={(measuring === true) ? 'nova-navbar-compass-items nova-navbar-items-measuring' : 'nova-navbar-compass-items'}>
          {
            visibleItems.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as ThemeNavbarCompassIndexCompassNavbarItemSpread}
                isActiveItem={navItem['label'] === activeItemLabel}
              />
            ))
          }
          {(hasOverflow === true) && (
            <More items={overflowItems} activeItemLabel={activeItemLabel} />
          )}
        </div>
        <div className="nova-navbar-compass-actions">
          <button
            className="nova-hamburger-toggle"
            type="button"
            onClick={onMenuToggle}
            aria-label={openMenuAriaLabel}
          >
            {hamburgerLabel}
          </button>
          <SearchProvider>
            <div className="nova-search-anchor">
              <SearchInput />
              <SearchResults />
            </div>
          </SearchProvider>
          {
            actionItems.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={(navItem['type'] as ThemeNavbarCompassIndexCompassNavbarItemKey) ?? (navItem['label'])}
                {...navItem as ThemeNavbarCompassIndexCompassNavbarItemSpread}
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

export default Compass;
