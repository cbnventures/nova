import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { SearchInput, SearchProvider, SearchResults } from '@theme/SearchBar';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import type {
  ThemeNavbarCanopyMobileMenuCloseMenuAriaLabel,
  ThemeNavbarCanopyMobileMenuMobileMenuAnimationEvent,
  ThemeNavbarCanopyMobileMenuMobileMenuAriaLabel,
  ThemeNavbarCanopyMobileMenuMobileMenuDefaultIcon,
  ThemeNavbarCanopyMobileMenuMobileMenuFocusTarget,
  ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideFunction,
  ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideMouseEvent,
  ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideMouseTarget,
  ThemeNavbarCanopyMobileMenuMobileMenuHandleEscapeFunction,
  ThemeNavbarCanopyMobileMenuMobileMenuHandleEscapeKeyboardEvent,
  ThemeNavbarCanopyMobileMenuMobileMenuIsClosing,
  ThemeNavbarCanopyMobileMenuMobileMenuIsClosingState,
  ThemeNavbarCanopyMobileMenuMobileMenuIsOpen,
  ThemeNavbarCanopyMobileMenuMobileMenuItemIcon,
  ThemeNavbarCanopyMobileMenuMobileMenuItemIndex,
  ThemeNavbarCanopyMobileMenuMobileMenuItems,
  ThemeNavbarCanopyMobileMenuMobileMenuItemStyle,
  ThemeNavbarCanopyMobileMenuMobileMenuLinkProps,
  ThemeNavbarCanopyMobileMenuMobileMenuLinkSpread,
  ThemeNavbarCanopyMobileMenuMobileMenuOnClose,
  ThemeNavbarCanopyMobileMenuMobileMenuOverlayClassName,
  ThemeNavbarCanopyMobileMenuMobileMenuPanelRef,
  ThemeNavbarCanopyMobileMenuMobileMenuProps,
  ThemeNavbarCanopyMobileMenuMobileMenuReturns,
  ThemeNavbarCanopyMobileMenuMobileMenuSetIsClosing,
  ThemeNavbarCanopyMobileMenuMobileMenuSiteLogo,
} from '../../../types/theme/Navbar/Canopy/mobile-menu.d.ts';

import type { ThemeNavbarItem } from '../../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu.
 *
 * Renders a full-screen or floating menu panel with an overlay backdrop,
 * a close button, and navigation items. The panel layout and visual
 * styling are controlled entirely by per-preset CSS.
 *
 * @param {ThemeNavbarCanopyMobileMenuMobileMenuProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MobileMenu(props: ThemeNavbarCanopyMobileMenuMobileMenuProps): ThemeNavbarCanopyMobileMenuMobileMenuReturns {
  const isOpen: ThemeNavbarCanopyMobileMenuMobileMenuIsOpen = props['isOpen'];
  const onClose: ThemeNavbarCanopyMobileMenuMobileMenuOnClose = props['onClose'];
  const items: ThemeNavbarCanopyMobileMenuMobileMenuItems = props['items'];
  const siteLogo: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogo = props['siteLogo'];
  const panelRef: ThemeNavbarCanopyMobileMenuMobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const isClosingState: ThemeNavbarCanopyMobileMenuMobileMenuIsClosingState = useState<ThemeNavbarCanopyMobileMenuMobileMenuIsClosing>(false);
  const isClosing: ThemeNavbarCanopyMobileMenuMobileMenuIsClosing = isClosingState[0];
  const setIsClosing: ThemeNavbarCanopyMobileMenuMobileMenuSetIsClosing = isClosingState[1];

  /**
   * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu - Handle Escape.
   *
   * Closes the mobile menu when the user presses the Escape key,
   * providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: ThemeNavbarCanopyMobileMenuMobileMenuHandleEscapeFunction = useCallback((event: ThemeNavbarCanopyMobileMenuMobileMenuHandleEscapeKeyboardEvent) => {
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
  const handleClickOutside: ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideFunction = useCallback((event: ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideMouseEvent) => {
    const mouseTarget: ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideMouseTarget = event.target;

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
      const focusTarget: ThemeNavbarCanopyMobileMenuMobileMenuFocusTarget = panelRef['current'].querySelector('.nova-navbar-canopy-menu-close') as ThemeNavbarCanopyMobileMenuMobileMenuFocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  const mobileMenuAriaLabel: ThemeNavbarCanopyMobileMenuMobileMenuAriaLabel = translate({
    id: 'theme.navbar.mobileMenuAriaLabel',
    message: 'Navigation menu',
    description: 'The ARIA label for the mobile navigation menu dialog',
  });
  const closeMenuAriaLabel: ThemeNavbarCanopyMobileMenuCloseMenuAriaLabel = translate({
    id: 'theme.navbar.closeMenuAriaLabel',
    message: 'Close menu',
    description: 'The ARIA label for the button that closes the mobile navigation menu',
  });

  if (isOpen === false) {
    return null;
  }

  let overlayClassName: ThemeNavbarCanopyMobileMenuMobileMenuOverlayClassName = 'nova-navbar-canopy-menu-overlay nova-navbar-canopy-menu-open';

  if (isClosing === true) {
    overlayClassName = 'nova-navbar-canopy-menu-overlay nova-navbar-canopy-menu-closing';
  }

  return createPortal(
    <div
      className={overlayClassName}
      onClick={handleClickOutside}
      role="presentation"
      onAnimationEnd={(_event: ThemeNavbarCanopyMobileMenuMobileMenuAnimationEvent) => {
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
                onClick={() => {
                  setIsClosing(true);

                  return undefined;
                }}
              >
                {(siteLogo['src'] !== undefined) && (
                  <img
                    className={(siteLogo['srcDark'] !== undefined) ? 'nova-brand-light' : undefined}
                    src={siteLogo['src']}
                    alt={siteLogo['alt']}
                  />
                )}
                {(
                  siteLogo['src'] !== undefined
                  && siteLogo['srcDark'] !== undefined
                ) && (
                  <img
                    className="nova-brand-dark"
                    src={siteLogo['srcDark']}
                    alt={siteLogo['alt']}
                  />
                )}
                {(
                  siteLogo['src'] === undefined
                  && siteLogo['wordmark'] !== undefined
                ) && (
                  <img
                    className={(siteLogo['wordmarkDark'] !== undefined) ? 'nova-brand-light' : undefined}
                    src={siteLogo['wordmark']}
                    alt={siteLogo['alt']}
                  />
                )}
                {(
                  siteLogo['src'] === undefined
                  && siteLogo['wordmark'] !== undefined
                  && siteLogo['wordmarkDark'] !== undefined
                ) && (
                  <img
                    className="nova-brand-dark"
                    src={siteLogo['wordmarkDark']}
                    alt={siteLogo['alt']}
                  />
                )}
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
          <div className="nova-navbar-canopy-menu-results nova-mobile-menu-results">
            <SearchResults />
          </div>
          <div className="nova-navbar-canopy-menu-items nova-mobile-menu-items">
            {
              items.map((navItem: ThemeNavbarItem, itemIndex: ThemeNavbarCanopyMobileMenuMobileMenuItemIndex) => {
                const itemIcon: ThemeNavbarCanopyMobileMenuMobileMenuItemIcon = navItem['icon'] as ThemeNavbarCanopyMobileMenuMobileMenuItemIcon;
                const defaultIcon: ThemeNavbarCanopyMobileMenuMobileMenuDefaultIcon = 'lucide:link';
                const itemStyle: ThemeNavbarCanopyMobileMenuMobileMenuItemStyle = { '--nova-item-index': itemIndex } as ThemeNavbarCanopyMobileMenuMobileMenuItemStyle;
                const linkProps: ThemeNavbarCanopyMobileMenuMobileMenuLinkProps = {};

                if (navItem['to'] !== undefined) {
                  Reflect.set(linkProps, 'to', navItem['to']);
                  Reflect.set(linkProps, 'isNavLink', true);
                }

                if (navItem['href'] !== undefined) {
                  Reflect.set(linkProps, 'href', navItem['href']);
                }

                return (
                  <Link
                    className="nova-navbar-canopy-menu-item"
                    key={navItem['label']}
                    style={itemStyle}
                    {...(linkProps as ThemeNavbarCanopyMobileMenuMobileMenuLinkSpread)}
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
        </SearchProvider>
      </div>
    </div>,
    document.body,
  );
}

export default MobileMenu;
