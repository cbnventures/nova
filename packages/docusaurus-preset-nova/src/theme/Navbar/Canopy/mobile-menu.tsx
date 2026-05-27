import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import Logo from '@theme/Logo';
import { SearchInput, SearchProvider, SearchResults } from '@theme/SearchBar';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import type {
  Theme_Navbar_Canopy_MobileMenu_CloseMenuAriaLabel,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_ActiveItemLabel,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_AnimationEvent,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_AriaLabel,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_DefaultIcon,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_FocusTarget,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideFunction,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideMouseEvent,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideMouseTarget,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleEscapeFunction,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleEscapeKeyboardEvent,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsClosing,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsClosingState,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsOpen,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIcon,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIndex,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIsActive,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_Items,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemStyle,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_LinkProps,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_LinkSpread,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_OnClose,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_OverlayClassName,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_PanelRef,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_Returns,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_SetIsClosing,
  Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo,
} from '../../../types/theme/Navbar/Canopy/mobile-menu.d.ts';

import type { Theme_Navbar_Index_Navbar_Item } from '../../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu.
 *
 * Renders a full-screen or floating menu panel with an overlay backdrop,
 * a close button, and navigation items. The panel layout and visual
 * styling are controlled entirely by per-preset CSS.
 *
 * @param {Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MobileMenu(props: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props): Theme_Navbar_Canopy_MobileMenu_MobileMenu_Returns {
  const isOpen: Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsOpen = props['isOpen'];
  const onClose: Theme_Navbar_Canopy_MobileMenu_MobileMenu_OnClose = props['onClose'];
  const items: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Items = props['items'];
  const siteLogo: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo = props['siteLogo'];
  const activeItemLabel: Theme_Navbar_Canopy_MobileMenu_MobileMenu_ActiveItemLabel = props['activeItemLabel'];
  const panelRef: Theme_Navbar_Canopy_MobileMenu_MobileMenu_PanelRef = useRef<HTMLDivElement>(null);
  const isClosingState: Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsClosingState = useState<Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsClosing>(false);
  const isClosing: Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsClosing = isClosingState[0];
  const setIsClosing: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SetIsClosing = isClosingState[1];

  /**
   * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu - Handle Escape.
   *
   * Closes the mobile menu when the user presses the Escape key,
   * providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleEscapeFunction = useCallback((event: Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleEscapeKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu - Handle Click Outside.
   *
   * Closes the mobile menu when the user clicks on the overlay backdrop
   * area outside the panel, providing an intuitive dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleClickOutside: Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideFunction = useCallback((event: Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideMouseEvent) => {
    const mouseTarget: Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideMouseTarget = event.target;

    if (mouseTarget === event.currentTarget) {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  useEffect(() => {
    if (isOpen === true) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);

      return undefined;
    };
  }, [
    isOpen,
    handleEscape,
  ]);

  // Focus close button when menu opens.
  useEffect(() => {
    if (isOpen === true && panelRef['current'] !== null) {
      const focusTarget: Theme_Navbar_Canopy_MobileMenu_MobileMenu_FocusTarget = panelRef['current'].querySelector('.nova-navbar-canopy-menu-close') as Theme_Navbar_Canopy_MobileMenu_MobileMenu_FocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  const mobileMenuAriaLabel: Theme_Navbar_Canopy_MobileMenu_MobileMenu_AriaLabel = translate({
    id: 'theme.navbar.mobileMenuAriaLabel',
    message: 'Navigation menu',
    description: 'The ARIA label for the mobile navigation menu dialog',
  });
  const closeMenuAriaLabel: Theme_Navbar_Canopy_MobileMenu_CloseMenuAriaLabel = translate({
    id: 'theme.navbar.closeMenuAriaLabel',
    message: 'Close menu',
    description: 'The ARIA label for the button that closes the mobile navigation menu',
  });

  if (isOpen === false) {
    return null;
  }

  let overlayClassName: Theme_Navbar_Canopy_MobileMenu_MobileMenu_OverlayClassName = 'nova-navbar-canopy-menu-overlay nova-navbar-canopy-menu-open';

  if (isClosing === true) {
    overlayClassName = 'nova-navbar-canopy-menu-overlay nova-navbar-canopy-menu-closing';
  }

  return createPortal(
    <div
      className={overlayClassName}
      onClick={handleClickOutside}
      role="presentation"
      onAnimationEnd={(_event: Theme_Navbar_Canopy_MobileMenu_MobileMenu_AnimationEvent) => {
        if (isClosing === true) {
          onClose();
          setIsClosing(false);
        }

        return undefined;
      }}
    >
      <div
        className="nova-navbar-canopy-menu-panel nova-mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={mobileMenuAriaLabel}
      >
        <SearchProvider>
          <div className="nova-navbar-canopy-menu-header">
            <div className="nova-navbar-canopy-menu-brand">
              <Link
                to={siteLogo['href'] ?? '/'}
                target={siteLogo['target']}
                rel={siteLogo['rel']}
                aria-label={siteLogo['ariaLabel']}
                onClick={() => {
                  setIsClosing(true);

                  return undefined;
                }}
              >
                <Logo siteLogo={siteLogo} iconFirst />
              </Link>
            </div>
            <div className="nova-navbar-canopy-menu-search nova-mobile-menu-search">
              <SearchInput />
            </div>
            <button
              className="nova-navbar-canopy-menu-close"
              type="button"
              onClick={() => {
                setIsClosing(true);

                return undefined;
              }}
              aria-label={closeMenuAriaLabel}
            >
              <Icon icon="lucide:x" width="20" height="20" aria-hidden="true" />
            </button>
          </div>
          <div className="nova-navbar-canopy-menu-body nova-mobile-menu-body">
            <SearchResults />
            <div className="nova-navbar-canopy-menu-items nova-mobile-menu-items">
              {
                items.map((navItem: Theme_Navbar_Index_Navbar_Item, itemIndex: Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIndex) => {
                  const itemIcon: Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIcon = navItem['icon'] as Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIcon;
                  const defaultIcon: Theme_Navbar_Canopy_MobileMenu_MobileMenu_DefaultIcon = 'lucide:link';
                  const itemStyle: Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemStyle = { '--nova-item-index': itemIndex } as Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemStyle;
                  const linkProps: Theme_Navbar_Canopy_MobileMenu_MobileMenu_LinkProps = {};
                  const isActive: Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIsActive = navItem['label'] === activeItemLabel;

                  if (navItem['to'] !== undefined) {
                    Reflect.set(linkProps, 'to', navItem['to']);
                  }

                  if (navItem['href'] !== undefined) {
                    Reflect.set(linkProps, 'href', navItem['href']);
                  }

                  if (isActive === true) {
                    Reflect.set(linkProps, 'aria-current', 'page');
                  }

                  return (
                    <Link
                      className="nova-navbar-canopy-menu-item"
                      key={navItem['label']}
                      style={itemStyle}
                      {...(linkProps as Theme_Navbar_Canopy_MobileMenu_MobileMenu_LinkSpread)}
                      onClick={() => {
                        setIsClosing(true);

                        return undefined;
                      }}
                    >
                      <Icon icon={itemIcon ?? defaultIcon} width="18" height="18" aria-hidden="true" />
                      <span>{navItem['label']}</span>
                    </Link>
                  );
                })
              }
            </div>
          </div>
        </SearchProvider>
      </div>
    </div>,
    document.body,
  );
}

export default MobileMenu;
