import { SearchInput } from '@theme/SearchBar';

import MobileMenuBase from '../shared/mobile-menu-base.js';

import type {
  Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props,
  Theme_Navbar_Monolith_MobileMenu_MobileMenu_Returns,
} from '../../../types/theme/Navbar/Monolith/mobile-menu.d.ts';

import type {
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_CloseButton,
} from '../../../types/theme/Navbar/shared/mobile-menu-base.d.ts';

/**
 * Theme - Navbar - Monolith - Mobile Menu - Mobile Menu.
 *
 * Renders the Monolith variant of the mobile navigation menu by
 * delegating shared panel logic to MobileMenuBase and providing
 * a variant-specific header with inline search and close button.
 *
 * @param {Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props} props - Props.
 *
 * @since 0.15.0
 */
function MobileMenu(props: Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props): Theme_Navbar_Monolith_MobileMenu_MobileMenu_Returns {
  return (
    <MobileMenuBase
      variantPrefix="nova-navbar-monolith-menu"
      renderHeader={(renderHeaderProps: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps) => {
        const closeButton: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_CloseButton = renderHeaderProps['closeButton'];

        return (
          <div className="nova-navbar-monolith-menu-header">
            <div className="nova-navbar-monolith-menu-search nova-mobile-menu-search">
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
