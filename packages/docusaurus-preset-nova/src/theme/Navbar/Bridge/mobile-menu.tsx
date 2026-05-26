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
  ThemeNavbarBridgeMobileMenuCloseMenuAriaLabel,
  ThemeNavbarBridgeMobileMenuMobileMenuActiveItemLabel,
  ThemeNavbarBridgeMobileMenuMobileMenuAnimationEvent,
  ThemeNavbarBridgeMobileMenuMobileMenuAriaLabel,
  ThemeNavbarBridgeMobileMenuMobileMenuDefaultIcon,
  ThemeNavbarBridgeMobileMenuMobileMenuFocusTarget,
  ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideFunction,
  ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideMouseEvent,
  ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideMouseTarget,
  ThemeNavbarBridgeMobileMenuMobileMenuHandleEscapeFunction,
  ThemeNavbarBridgeMobileMenuMobileMenuHandleEscapeKeyboardEvent,
  ThemeNavbarBridgeMobileMenuMobileMenuIsClosing,
  ThemeNavbarBridgeMobileMenuMobileMenuIsClosingState,
  ThemeNavbarBridgeMobileMenuMobileMenuIsOpen,
  ThemeNavbarBridgeMobileMenuMobileMenuItemIcon,
  ThemeNavbarBridgeMobileMenuMobileMenuItemIndex,
  ThemeNavbarBridgeMobileMenuMobileMenuItemIsActive,
  ThemeNavbarBridgeMobileMenuMobileMenuItems,
  ThemeNavbarBridgeMobileMenuMobileMenuItemStyle,
  ThemeNavbarBridgeMobileMenuMobileMenuLinkProps,
  ThemeNavbarBridgeMobileMenuMobileMenuLinkSpread,
  ThemeNavbarBridgeMobileMenuMobileMenuOnClose,
  ThemeNavbarBridgeMobileMenuMobileMenuOverlayClassName,
  ThemeNavbarBridgeMobileMenuMobileMenuPanelRef,
  ThemeNavbarBridgeMobileMenuMobileMenuProps,
  ThemeNavbarBridgeMobileMenuMobileMenuReturns,
  ThemeNavbarBridgeMobileMenuMobileMenuSetIsClosing,
  ThemeNavbarBridgeMobileMenuMobileMenuSiteLogo,
} from '../../../types/theme/Navbar/Bridge/mobile-menu.d.ts';

import type { ThemeNavbarItem } from '../../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar - Bridge - Mobile Menu - Mobile Menu.
 *
 * Renders a full-screen or floating menu panel with an overlay backdrop,
 * a close button, and navigation items. The panel layout and visual
 * styling are controlled entirely by per-preset CSS.
 *
 * @param {ThemeNavbarBridgeMobileMenuMobileMenuProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MobileMenu(props: ThemeNavbarBridgeMobileMenuMobileMenuProps): ThemeNavbarBridgeMobileMenuMobileMenuReturns {
  const isOpen: ThemeNavbarBridgeMobileMenuMobileMenuIsOpen = props['isOpen'];
  const onClose: ThemeNavbarBridgeMobileMenuMobileMenuOnClose = props['onClose'];
  const items: ThemeNavbarBridgeMobileMenuMobileMenuItems = props['items'];
  const siteLogo: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogo = props['siteLogo'];
  const activeItemLabel: ThemeNavbarBridgeMobileMenuMobileMenuActiveItemLabel = props['activeItemLabel'];
  const panelRef: ThemeNavbarBridgeMobileMenuMobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const isClosingState: ThemeNavbarBridgeMobileMenuMobileMenuIsClosingState = useState<ThemeNavbarBridgeMobileMenuMobileMenuIsClosing>(false);
  const isClosing: ThemeNavbarBridgeMobileMenuMobileMenuIsClosing = isClosingState[0];
  const setIsClosing: ThemeNavbarBridgeMobileMenuMobileMenuSetIsClosing = isClosingState[1];

  /**
   * Theme - Navbar - Bridge - Mobile Menu - Mobile Menu - Handle Escape.
   *
   * Closes the mobile menu when the user presses the Escape key,
   * providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: ThemeNavbarBridgeMobileMenuMobileMenuHandleEscapeFunction = useCallback((event: ThemeNavbarBridgeMobileMenuMobileMenuHandleEscapeKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Theme - Navbar - Bridge - Mobile Menu - Mobile Menu - Handle Click Outside.
   *
   * Closes the mobile menu when the user clicks on the overlay backdrop
   * area outside the panel, providing an intuitive dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleClickOutside: ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideFunction = useCallback((event: ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideMouseEvent) => {
    const mouseTarget: ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideMouseTarget = event.target;

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
      const focusTarget: ThemeNavbarBridgeMobileMenuMobileMenuFocusTarget = panelRef['current'].querySelector('.nova-navbar-bridge-menu-close') as ThemeNavbarBridgeMobileMenuMobileMenuFocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  const mobileMenuAriaLabel: ThemeNavbarBridgeMobileMenuMobileMenuAriaLabel = translate({
    id: 'theme.navbar.mobileMenuAriaLabel',
    message: 'Navigation menu',
    description: 'The ARIA label for the mobile navigation menu dialog',
  });
  const closeMenuAriaLabel: ThemeNavbarBridgeMobileMenuCloseMenuAriaLabel = translate({
    id: 'theme.navbar.closeMenuAriaLabel',
    message: 'Close menu',
    description: 'The ARIA label for the button that closes the mobile navigation menu',
  });

  if (isOpen === false) {
    return null;
  }

  let overlayClassName: ThemeNavbarBridgeMobileMenuMobileMenuOverlayClassName = 'nova-navbar-bridge-menu-overlay nova-navbar-bridge-menu-open';

  if (isClosing === true) {
    overlayClassName = 'nova-navbar-bridge-menu-overlay nova-navbar-bridge-menu-closing';
  }

  return createPortal(
    <div
      className={overlayClassName}
      onClick={handleClickOutside}
      role="presentation"
      onAnimationEnd={(_event: ThemeNavbarBridgeMobileMenuMobileMenuAnimationEvent) => {
        if (isClosing === true) {
          onClose();
          setIsClosing(false);
        }

        return undefined;
      }}
    >
      <div
        className="nova-navbar-bridge-menu-panel nova-mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={mobileMenuAriaLabel}
      >
        <SearchProvider>
          <div className="nova-navbar-bridge-menu-header">
            <div className="nova-navbar-bridge-menu-brand">
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
                <Logo siteLogo={siteLogo} />
              </Link>
            </div>
            <button
              className="nova-navbar-bridge-menu-close"
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
          <div className="nova-navbar-bridge-menu-search nova-mobile-menu-search">
            <SearchInput />
          </div>
          <div className="nova-navbar-bridge-menu-body nova-mobile-menu-body">
            <SearchResults />
            <div className="nova-navbar-bridge-menu-items nova-mobile-menu-items">
              {
                items.map((navItem: ThemeNavbarItem, itemIndex: ThemeNavbarBridgeMobileMenuMobileMenuItemIndex) => {
                  const itemIcon: ThemeNavbarBridgeMobileMenuMobileMenuItemIcon = navItem['icon'] as ThemeNavbarBridgeMobileMenuMobileMenuItemIcon;
                  const defaultIcon: ThemeNavbarBridgeMobileMenuMobileMenuDefaultIcon = 'lucide:link';
                  const itemStyle: ThemeNavbarBridgeMobileMenuMobileMenuItemStyle = { '--nova-item-index': itemIndex } as ThemeNavbarBridgeMobileMenuMobileMenuItemStyle;
                  const linkProps: ThemeNavbarBridgeMobileMenuMobileMenuLinkProps = {};
                  const isActive: ThemeNavbarBridgeMobileMenuMobileMenuItemIsActive = navItem['label'] === activeItemLabel;

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
                      className="nova-navbar-bridge-menu-item"
                      key={navItem['label']}
                      style={itemStyle}
                      {...(linkProps as ThemeNavbarBridgeMobileMenuMobileMenuLinkSpread)}
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
