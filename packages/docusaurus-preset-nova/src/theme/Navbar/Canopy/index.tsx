import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Logo from '@theme/Logo';
import NavbarItem from '@theme/NavbarItem';
import { SearchInput, SearchProvider, SearchResults } from '@theme/SearchBar';

import { useNavbarOverflow } from '../../../lib/use-navbar-overflow.js';
import More from '../More/index.js';

import type {
  Lib_UseNavbarOverflow_HasOverflow as LibUseNavbarOverflowHasOverflow,
  Lib_UseNavbarOverflow_MeasureRef as LibUseNavbarOverflowMeasureRef,
  Lib_UseNavbarOverflow_Measuring as LibUseNavbarOverflowMeasuring,
  Lib_UseNavbarOverflow_Returns as LibUseNavbarOverflowReturns,
  Lib_UseNavbarOverflow_VisibleCount as LibUseNavbarOverflowVisibleCount,
} from '../../../types/lib/use-navbar-overflow.d.ts';

import type {
  Theme_Navbar_Canopy_Index_Canopy_ActionItems,
  Theme_Navbar_Canopy_Index_Canopy_ActiveItemLabel,
  Theme_Navbar_Canopy_Index_Canopy_ColorModeLabel,
  Theme_Navbar_Canopy_Index_Canopy_HamburgerLabel,
  Theme_Navbar_Canopy_Index_Canopy_Items,
  Theme_Navbar_Canopy_Index_Canopy_NavAriaLabel,
  Theme_Navbar_Canopy_Index_Canopy_NavbarClassName,
  Theme_Navbar_Canopy_Index_Canopy_NavbarItemKey,
  Theme_Navbar_Canopy_Index_Canopy_NavbarItemSpread,
  Theme_Navbar_Canopy_Index_Canopy_OnColorModeToggle,
  Theme_Navbar_Canopy_Index_Canopy_OnMenuToggle,
  Theme_Navbar_Canopy_Index_Canopy_OpenMenuAriaLabel,
  Theme_Navbar_Canopy_Index_Canopy_Props,
  Theme_Navbar_Canopy_Index_Canopy_Returns,
  Theme_Navbar_Canopy_Index_Canopy_SiteLogo,
  Theme_Navbar_Canopy_Index_Canopy_ToggleColorModeAriaLabel,
} from '../../../types/theme/Navbar/Canopy/index.d.ts';

import type { Theme_Navbar_Index_Navbar_Item } from '../../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar - Canopy.
 *
 * Centered brand layout with the site logo and title positioned at the
 * top center, navigation items expanding into dropdowns below,
 * and action buttons aligned to the right.
 *
 * @param {Theme_Navbar_Canopy_Index_Canopy_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Canopy(props: Theme_Navbar_Canopy_Index_Canopy_Props): Theme_Navbar_Canopy_Index_Canopy_Returns {
  const siteLogo: Theme_Navbar_Canopy_Index_Canopy_SiteLogo = props['siteLogo'];
  const items: Theme_Navbar_Canopy_Index_Canopy_Items = props['items'];
  const actionItems: Theme_Navbar_Canopy_Index_Canopy_ActionItems = props['actionItems'];
  const colorModeLabel: Theme_Navbar_Canopy_Index_Canopy_ColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: Theme_Navbar_Canopy_Index_Canopy_OnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: Theme_Navbar_Canopy_Index_Canopy_HamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: Theme_Navbar_Canopy_Index_Canopy_OnMenuToggle = props['onMenuToggle'];
  const activeItemLabel: Theme_Navbar_Canopy_Index_Canopy_ActiveItemLabel = props['activeItemLabel'];
  const navbarClassName: Theme_Navbar_Canopy_Index_Canopy_NavbarClassName = 'nova-navbar-canopy';

  const navAriaLabel: Theme_Navbar_Canopy_Index_Canopy_NavAriaLabel = translate({
    id: 'theme.navbar.navAriaLabel',
    message: 'Main',
    description: 'The ARIA label for the main site navigation landmark',
  });
  const openMenuAriaLabel: Theme_Navbar_Canopy_Index_Canopy_OpenMenuAriaLabel = translate({
    id: 'theme.navbar.openMenuAriaLabel',
    message: 'Open menu',
    description: 'The ARIA label for the button that opens the mobile navigation menu',
  });
  const toggleColorModeAriaLabel: Theme_Navbar_Canopy_Index_Canopy_ToggleColorModeAriaLabel = translate({
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
  const visibleItems: Theme_Navbar_Canopy_Index_Canopy_Items = items.slice(0, visibleCount);
  const overflowItems: Theme_Navbar_Canopy_Index_Canopy_Items = items.slice(visibleCount);

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
        <div className="nova-navbar-items-measure-clip">
          <div ref={measureRef} className="nova-navbar-canopy-items nova-navbar-items-measure" aria-hidden="true">
            {
              items.map((navItem: Theme_Navbar_Index_Navbar_Item) => (
                <NavbarItem
                  key={navItem['label']}
                  {...navItem as Theme_Navbar_Canopy_Index_Canopy_NavbarItemSpread}
                  isActiveItem={navItem['label'] === activeItemLabel}
                />
              ))
            }
          </div>
        </div>
        <div className={(measuring === true) ? 'nova-navbar-canopy-items nova-navbar-items-measuring' : 'nova-navbar-canopy-items'}>
          {
            visibleItems.map((navItem: Theme_Navbar_Index_Navbar_Item) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as Theme_Navbar_Canopy_Index_Canopy_NavbarItemSpread}
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
            actionItems.map((navItem: Theme_Navbar_Index_Navbar_Item) => (
              <NavbarItem
                key={(navItem['type'] as Theme_Navbar_Canopy_Index_Canopy_NavbarItemKey) ?? (navItem['label'])}
                {...navItem as Theme_Navbar_Canopy_Index_Canopy_NavbarItemSpread}
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
