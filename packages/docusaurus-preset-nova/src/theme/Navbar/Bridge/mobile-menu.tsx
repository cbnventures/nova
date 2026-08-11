import Link from '@docusaurus/Link';
import Logo from '@theme/Logo';
import { SearchInput } from '@theme/SearchBar';

import MobileMenuBase from '../shared/mobile-menu-base.js';

import type {
  Theme_Navbar_Bridge_MobileMenu_MobileMenu_Props,
  Theme_Navbar_Bridge_MobileMenu_MobileMenu_Returns,
  Theme_Navbar_Bridge_MobileMenu_MobileMenu_SiteLogo,
} from '../../../types/theme/Navbar/Bridge/mobile-menu.d.ts';

import type {
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_CloseButton,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_StartClosing,
} from '../../../types/theme/Navbar/shared/mobile-menu-base.d.ts';

/**
 * Theme - Navbar - Bridge - Mobile Menu - Mobile Menu.
 *
 * Renders the Bridge variant of the mobile navigation menu by
 * delegating shared panel logic to MobileMenuBase and providing
 * a variant-specific header with brand logo and search below.
 *
 * @param {Theme_Navbar_Bridge_MobileMenu_MobileMenu_Props} props - Props.
 *
 * @since 0.15.0
 */
function MobileMenu(props: Theme_Navbar_Bridge_MobileMenu_MobileMenu_Props): Theme_Navbar_Bridge_MobileMenu_MobileMenu_Returns {
  const siteLogo: Theme_Navbar_Bridge_MobileMenu_MobileMenu_SiteLogo = props['siteLogo'];

  return (
    <MobileMenuBase
      variantPrefix="nova-navbar-bridge-menu"
      renderHeader={(renderHeaderProps: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps) => {
        const closeButton: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_CloseButton = renderHeaderProps['closeButton'];
        const startClosing: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_StartClosing = renderHeaderProps['startClosing'];

        return (
          <>
            <div className="nova-navbar-bridge-menu-header">
              <div className="nova-navbar-bridge-menu-brand">
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
                  <Logo siteLogo={siteLogo} />
                </Link>
              </div>
              {closeButton}
            </div>
            <div className="nova-navbar-bridge-menu-search nova-mobile-menu-search">
              <SearchInput />
            </div>
          </>
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
