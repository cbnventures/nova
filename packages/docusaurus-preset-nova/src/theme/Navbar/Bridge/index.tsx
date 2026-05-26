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
  ThemeNavbarBridgeIndexBridgeActionItems,
  ThemeNavbarBridgeIndexBridgeActiveItemLabel,
  ThemeNavbarBridgeIndexBridgeColorModeLabel,
  ThemeNavbarBridgeIndexBridgeHamburgerLabel,
  ThemeNavbarBridgeIndexBridgeItems,
  ThemeNavbarBridgeIndexBridgeNavAriaLabel,
  ThemeNavbarBridgeIndexBridgeNavbarClassName,
  ThemeNavbarBridgeIndexBridgeNavbarItemKey,
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
  const actionItems: ThemeNavbarBridgeIndexBridgeActionItems = props['actionItems'];
  const colorModeLabel: ThemeNavbarBridgeIndexBridgeColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: ThemeNavbarBridgeIndexBridgeOnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: ThemeNavbarBridgeIndexBridgeHamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: ThemeNavbarBridgeIndexBridgeOnMenuToggle = props['onMenuToggle'];
  const activeItemLabel: ThemeNavbarBridgeIndexBridgeActiveItemLabel = props['activeItemLabel'];
  const navbarClassName: ThemeNavbarBridgeIndexBridgeNavbarClassName = 'nova-navbar-bridge';

  const navAriaLabel: ThemeNavbarBridgeIndexBridgeNavAriaLabel = translate({
    id: 'theme.navbar.navAriaLabel',
    message: 'Main',
    description: 'The ARIA label for the main site navigation landmark',
  });
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

  const overflow: LibUseNavbarOverflowReturns = useNavbarOverflow({
    items,
    budgetVariable: '--nova-navbar-bridge-items-max-width',
    triggerVariable: '--nova-navbar-more-width',
  });
  const measureRef: LibUseNavbarOverflowMeasureRef = overflow['measureRef'];
  const visibleCount: LibUseNavbarOverflowVisibleCount = overflow['visibleCount'];
  const hasOverflow: LibUseNavbarOverflowHasOverflow = overflow['hasOverflow'];
  const measuring: LibUseNavbarOverflowMeasuring = overflow['measuring'];
  const visibleItems: ThemeNavbarBridgeIndexBridgeItems = items.slice(0, visibleCount);
  const overflowItems: ThemeNavbarBridgeIndexBridgeItems = items.slice(visibleCount);

  return (
    <nav
      className={(props['className'] !== undefined) ? `${navbarClassName} ${props['className']}` : navbarClassName}
      style={props['style']}
      aria-label={navAriaLabel}
    >
      <div className="nova-container">
        <div className="nova-navbar-bridge-brand">
          <Link
            to={siteLogo['href'] ?? '/'}
            target={siteLogo['target']}
            rel={siteLogo['rel']}
            aria-label={siteLogo['ariaLabel']}
          >
            <Logo siteLogo={siteLogo} />
          </Link>
        </div>
        <div ref={measureRef} className="nova-navbar-bridge-items nova-navbar-items-measure" aria-hidden="true">
          {
            items.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as ThemeNavbarBridgeIndexBridgeNavbarItemSpread}
                isActiveItem={navItem['label'] === activeItemLabel}
              />
            ))
          }
        </div>
        <div className={(measuring === true) ? 'nova-navbar-bridge-items nova-navbar-items-measuring' : 'nova-navbar-bridge-items'}>
          {
            visibleItems.map((navItem: ThemeNavbarItem) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as ThemeNavbarBridgeIndexBridgeNavbarItemSpread}
                isActiveItem={navItem['label'] === activeItemLabel}
              />
            ))
          }
          {(hasOverflow === true) && (
            <More items={overflowItems} activeItemLabel={activeItemLabel} />
          )}
        </div>
        <div className="nova-navbar-bridge-actions">
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
                key={(navItem['type'] as ThemeNavbarBridgeIndexBridgeNavbarItemKey) ?? (navItem['label'])}
                {...navItem as ThemeNavbarBridgeIndexBridgeNavbarItemSpread}
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

export default Bridge;
