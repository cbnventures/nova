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
  Theme_Navbar_Bridge_Index_Bridge_ActionItems,
  Theme_Navbar_Bridge_Index_Bridge_ActiveItemLabel,
  Theme_Navbar_Bridge_Index_Bridge_ColorModeLabel,
  Theme_Navbar_Bridge_Index_Bridge_HamburgerLabel,
  Theme_Navbar_Bridge_Index_Bridge_Items,
  Theme_Navbar_Bridge_Index_Bridge_NavAriaLabel,
  Theme_Navbar_Bridge_Index_Bridge_NavbarClassName,
  Theme_Navbar_Bridge_Index_Bridge_NavbarItemKey,
  Theme_Navbar_Bridge_Index_Bridge_NavbarItemSpread,
  Theme_Navbar_Bridge_Index_Bridge_OnColorModeToggle,
  Theme_Navbar_Bridge_Index_Bridge_OnMenuToggle,
  Theme_Navbar_Bridge_Index_Bridge_OpenMenuAriaLabel,
  Theme_Navbar_Bridge_Index_Bridge_Props,
  Theme_Navbar_Bridge_Index_Bridge_Returns,
  Theme_Navbar_Bridge_Index_Bridge_SiteLogo,
  Theme_Navbar_Bridge_Index_Bridge_ToggleColorModeAriaLabel,
} from '../../../types/theme/Navbar/Bridge/index.d.ts';

import type { Theme_Navbar_Index_Navbar_Item } from '../../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar - Bridge.
 *
 * Split navigation layout with the site brand anchored to the left,
 * navigation items in the center-left region, and action
 * buttons grouped to the right.
 *
 * @param {Theme_Navbar_Bridge_Index_Bridge_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Bridge(props: Theme_Navbar_Bridge_Index_Bridge_Props): Theme_Navbar_Bridge_Index_Bridge_Returns {
  const siteLogo: Theme_Navbar_Bridge_Index_Bridge_SiteLogo = props['siteLogo'];
  const items: Theme_Navbar_Bridge_Index_Bridge_Items = props['items'];
  const actionItems: Theme_Navbar_Bridge_Index_Bridge_ActionItems = props['actionItems'];
  const colorModeLabel: Theme_Navbar_Bridge_Index_Bridge_ColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: Theme_Navbar_Bridge_Index_Bridge_OnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: Theme_Navbar_Bridge_Index_Bridge_HamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: Theme_Navbar_Bridge_Index_Bridge_OnMenuToggle = props['onMenuToggle'];
  const activeItemLabel: Theme_Navbar_Bridge_Index_Bridge_ActiveItemLabel = props['activeItemLabel'];
  const navbarClassName: Theme_Navbar_Bridge_Index_Bridge_NavbarClassName = 'nova-navbar-bridge';

  const navAriaLabel: Theme_Navbar_Bridge_Index_Bridge_NavAriaLabel = translate({
    id: 'theme.navbar.navAriaLabel',
    message: 'Main',
    description: 'The ARIA label for the main site navigation landmark',
  });
  const openMenuAriaLabel: Theme_Navbar_Bridge_Index_Bridge_OpenMenuAriaLabel = translate({
    id: 'theme.navbar.openMenuAriaLabel',
    message: 'Open menu',
    description: 'The ARIA label for the button that opens the mobile navigation menu',
  });
  const toggleColorModeAriaLabel: Theme_Navbar_Bridge_Index_Bridge_ToggleColorModeAriaLabel = translate({
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
  const visibleItems: Theme_Navbar_Bridge_Index_Bridge_Items = items.slice(0, visibleCount);
  const overflowItems: Theme_Navbar_Bridge_Index_Bridge_Items = items.slice(visibleCount);

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
            items.map((navItem: Theme_Navbar_Index_Navbar_Item) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as Theme_Navbar_Bridge_Index_Bridge_NavbarItemSpread}
                isActiveItem={navItem['label'] === activeItemLabel}
              />
            ))
          }
        </div>
        <div className={(measuring === true) ? 'nova-navbar-bridge-items nova-navbar-items-measuring' : 'nova-navbar-bridge-items'}>
          {
            visibleItems.map((navItem: Theme_Navbar_Index_Navbar_Item) => (
              <NavbarItem
                key={navItem['label']}
                {...navItem as Theme_Navbar_Bridge_Index_Bridge_NavbarItemSpread}
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
            actionItems.map((navItem: Theme_Navbar_Index_Navbar_Item) => (
              <NavbarItem
                key={(navItem['type'] as Theme_Navbar_Bridge_Index_Bridge_NavbarItemKey) ?? (navItem['label'])}
                {...navItem as Theme_Navbar_Bridge_Index_Bridge_NavbarItemSpread}
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
