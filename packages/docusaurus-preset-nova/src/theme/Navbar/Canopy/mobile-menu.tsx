import Link from '@docusaurus/Link';
import Logo from '@theme/Logo';
import { SearchInput } from '@theme/SearchBar';

import MobileMenuBase from '../shared/mobile-menu-base.js';

import type {
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_Returns,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo,
} from '../../../types/theme/Navbar/Canopy/mobile-menu.d.ts';

import type {
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_CloseButton,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_StartClosing,
} from '../../../types/theme/Navbar/shared/mobile-menu-base.d.ts';

/**
 * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu.
 *
 * Renders the Canopy variant of the mobile navigation menu by
 * delegating shared panel logic to MobileMenuBase and providing
 * a variant-specific header with brand logo, inline search, and close button.
 *
 * @param {Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props} props - Props.
 *
 * @since 0.15.0
 */
function MobileMenu(props: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props): Theme_Navbar_Canopy_MobileMenu_MobileMenu_Returns {
  const siteLogo: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo = props['siteLogo'];

  return (
    <MobileMenuBase
      variantPrefix="nova-navbar-canopy-menu"
      renderHeader={(renderHeaderProps: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps) => {
        const closeButton: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_CloseButton = renderHeaderProps['closeButton'];
        const startClosing: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_StartClosing = renderHeaderProps['startClosing'];

        return (
          <div className="nova-navbar-canopy-menu-header">
            <div className="nova-navbar-canopy-menu-brand">
              <Link
                to={siteLogo['href'] ?? '/'}
                target={siteLogo['target']}
                rel={siteLogo['rel']}
                aria-label={siteLogo['ariaLabel']}
                onClick={() => {
                  startClosing();

                  return undefined;
                }}
              >
                <Logo siteLogo={siteLogo} iconFirst />
              </Link>
            </div>
            <div className="nova-navbar-canopy-menu-search nova-mobile-menu-search">
              <SearchInput />
            </div>
            {closeButton}
          </div>
        );
      }}
      isOpen={props['isOpen']}
      onClose={props['onClose']}
      items={props['items']}
      activeItemLabel={props['activeItemLabel']}
    />
  );
}

export default MobileMenu;
