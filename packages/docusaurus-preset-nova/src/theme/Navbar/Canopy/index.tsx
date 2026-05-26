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
  ThemeNavbarCanopyIndexCanopyActionItems,
  ThemeNavbarCanopyIndexCanopyActiveItemLabel,
  ThemeNavbarCanopyIndexCanopyColorModeLabel,
  ThemeNavbarCanopyIndexCanopyHamburgerLabel,
  ThemeNavbarCanopyIndexCanopyItems,
  ThemeNavbarCanopyIndexCanopyNavAriaLabel,
  ThemeNavbarCanopyIndexCanopyNavbarClassName,
  ThemeNavbarCanopyIndexCanopyNavbarItemKey,
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
  const actionItems: ThemeNavbarCanopyIndexCanopyActionItems = props['actionItems'];
  const colorModeLabel: ThemeNavbarCanopyIndexCanopyColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: ThemeNavbarCanopyIndexCanopyOnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: ThemeNavbarCanopyIndexCanopyHamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: ThemeNavbarCanopyIndexCanopyOnMenuToggle = props['onMenuToggle'];
  const activeItemLabel: ThemeNavbarCanopyIndexCanopyActiveItemLabel = props['activeItemLabel'];
  const navbarClassName: ThemeNavbarCanopyIndexCanopyNavbarClassName = 'nova-navbar-canopy';

  const navAriaLabel: ThemeNavbarCanopyIndexCanopyNavAriaLabel = translate({
    id: 'theme.navbar.navAriaLabel',
    message: 'Main',
    description: 'The ARIA label for the main site navigation landmark',
  });
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

  const overflow: LibUseNavbarOverflowReturns = useNavbarOverflow({
    items,
    budgetVariable: '--nova-navbar-canopy-items-max-width',
    triggerVariable: '--nova-navbar-more-width',
  });
  const measureRef: LibUseNavbarOverflowMeasureRef = overflow['measureRef'];
  const visibleCount: LibUseNavbarOverflowVisibleCount = overflow['visibleCount'];
  const hasOverflow: LibUseNavbarOverflowHasOverflow = overflow['hasOverflow'];
  const measuring: LibUseNavbarOverflowMeasuring = overflow['measuring'];
  const visibleItems: ThemeNavbarCanopyIndexCanopyItems = items.slice(0, visibleCount);
  const overflowItems: ThemeNavbarCanopyIndexCanopyItems = items.slice(visibleCount);

  return (
    <nav
      className={(props['className'] !== undefined) ? `${navbarClassName} ${props['className']}` : navbarClassName}
      style={props['style']}
      aria-label={navAriaLabel}
    >
      <div className="nova-container">
        <div className="nova-navbar-canopy-brand">
          <Link
            to={siteLogo['href'] ?? '/'}
            target={siteLogo['target']}
            rel={siteLogo['rel']}
            aria-label={siteLogo['ariaLabel']}
          >
            <Logo siteLogo={siteLogo} />
          </Link>
        </div>
        <div ref={measureRef} className="nova-navbar-canopy-items nova-navbar-items-measure" aria-hidden="true">
          {
            items.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as ThemeNavbarCanopyIndexCanopyNavbarItemSpread}
                isActiveItem={navItem['label'] === activeItemLabel}
              />
            ))
          }
        </div>
        <div className={(measuring === true) ? 'nova-navbar-canopy-items nova-navbar-items-measuring' : 'nova-navbar-canopy-items'}>
          {
            visibleItems.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as ThemeNavbarCanopyIndexCanopyNavbarItemSpread}
                isActiveItem={navItem['label'] === activeItemLabel}
              />
            ))
          }
          {(hasOverflow === true) && (
            <More items={overflowItems} activeItemLabel={activeItemLabel} />
          )}
        </div>
        <div className="nova-navbar-canopy-actions">
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
                key={(navItem['type'] as ThemeNavbarCanopyIndexCanopyNavbarItemKey) ?? (navItem['label'])}
                {...navItem as ThemeNavbarCanopyIndexCanopyNavbarItemSpread}
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

export default Canopy;
