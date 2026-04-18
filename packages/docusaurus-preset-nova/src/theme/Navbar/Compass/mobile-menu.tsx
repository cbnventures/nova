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
  ThemeNavbarCompassMobileMenuCloseMenuAriaLabel,
  ThemeNavbarCompassMobileMenuMobileMenuAnimationEvent,
  ThemeNavbarCompassMobileMenuMobileMenuAriaLabel,
  ThemeNavbarCompassMobileMenuMobileMenuDefaultIcon,
  ThemeNavbarCompassMobileMenuMobileMenuFocusTarget,
  ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideFunction,
  ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideMouseEvent,
  ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideMouseTarget,
  ThemeNavbarCompassMobileMenuMobileMenuHandleEscapeFunction,
  ThemeNavbarCompassMobileMenuMobileMenuHandleEscapeKeyboardEvent,
  ThemeNavbarCompassMobileMenuMobileMenuIsClosing,
  ThemeNavbarCompassMobileMenuMobileMenuIsClosingState,
  ThemeNavbarCompassMobileMenuMobileMenuIsOpen,
  ThemeNavbarCompassMobileMenuMobileMenuItemIcon,
  ThemeNavbarCompassMobileMenuMobileMenuItemIndex,
  ThemeNavbarCompassMobileMenuMobileMenuItems,
  ThemeNavbarCompassMobileMenuMobileMenuItemStyle,
  ThemeNavbarCompassMobileMenuMobileMenuLinkProps,
  ThemeNavbarCompassMobileMenuMobileMenuLinkSpread,
  ThemeNavbarCompassMobileMenuMobileMenuOnClose,
  ThemeNavbarCompassMobileMenuMobileMenuOverlayClassName,
  ThemeNavbarCompassMobileMenuMobileMenuPanelRef,
  ThemeNavbarCompassMobileMenuMobileMenuProps,
  ThemeNavbarCompassMobileMenuMobileMenuReturns,
  ThemeNavbarCompassMobileMenuMobileMenuSetIsClosing,
  ThemeNavbarCompassMobileMenuMobileMenuSiteLogo,
} from '../../../types/theme/Navbar/Compass/mobile-menu.d.ts';

import type { ThemeNavbarItem } from '../../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar - Compass - Mobile Menu - Mobile Menu.
 *
 * Renders a full-screen or floating menu panel with an overlay backdrop,
 * a close button, and navigation items. The panel layout and visual
 * styling are controlled entirely by per-preset CSS.
 *
 * @param {ThemeNavbarCompassMobileMenuMobileMenuProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MobileMenu(props: ThemeNavbarCompassMobileMenuMobileMenuProps): ThemeNavbarCompassMobileMenuMobileMenuReturns {
  const isOpen: ThemeNavbarCompassMobileMenuMobileMenuIsOpen = props['isOpen'];
  const onClose: ThemeNavbarCompassMobileMenuMobileMenuOnClose = props['onClose'];
  const items: ThemeNavbarCompassMobileMenuMobileMenuItems = props['items'];
  const siteLogo: ThemeNavbarCompassMobileMenuMobileMenuSiteLogo = props['siteLogo'];
  const panelRef: ThemeNavbarCompassMobileMenuMobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const isClosingState: ThemeNavbarCompassMobileMenuMobileMenuIsClosingState = useState<ThemeNavbarCompassMobileMenuMobileMenuIsClosing>(false);
  const isClosing: ThemeNavbarCompassMobileMenuMobileMenuIsClosing = isClosingState[0];
  const setIsClosing: ThemeNavbarCompassMobileMenuMobileMenuSetIsClosing = isClosingState[1];

  /**
   * Theme - Navbar - Compass - Mobile Menu - Mobile Menu - Handle Escape.
   *
   * Closes the mobile menu when the user presses the Escape key,
   * providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: ThemeNavbarCompassMobileMenuMobileMenuHandleEscapeFunction = useCallback((event: ThemeNavbarCompassMobileMenuMobileMenuHandleEscapeKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Theme - Navbar - Compass - Mobile Menu - Mobile Menu - Handle Click Outside.
   *
   * Closes the mobile menu when the user clicks on the overlay backdrop
   * area outside the panel, providing an intuitive dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleClickOutside: ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideFunction = useCallback((event: ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideMouseEvent) => {
    const mouseTarget: ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideMouseTarget = event.target;

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
      const focusTarget: ThemeNavbarCompassMobileMenuMobileMenuFocusTarget = panelRef['current'].querySelector('.nova-navbar-compass-menu-close') as ThemeNavbarCompassMobileMenuMobileMenuFocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  const mobileMenuAriaLabel: ThemeNavbarCompassMobileMenuMobileMenuAriaLabel = translate({
    id: 'theme.navbar.mobileMenuAriaLabel',
    message: 'Navigation menu',
    description: 'The ARIA label for the mobile navigation menu dialog',
  });
  const closeMenuAriaLabel: ThemeNavbarCompassMobileMenuCloseMenuAriaLabel = translate({
    id: 'theme.navbar.closeMenuAriaLabel',
    message: 'Close menu',
    description: 'The ARIA label for the button that closes the mobile navigation menu',
  });

  if (isOpen === false) {
    return null;
  }

  let overlayClassName: ThemeNavbarCompassMobileMenuMobileMenuOverlayClassName = 'nova-navbar-compass-menu-overlay nova-navbar-compass-menu-open';

  if (isClosing === true) {
    overlayClassName = 'nova-navbar-compass-menu-overlay nova-navbar-compass-menu-closing';
  }

  return createPortal(
    <div
      className={overlayClassName}
      onClick={handleClickOutside}
      role="presentation"
      onAnimationEnd={(_event: ThemeNavbarCompassMobileMenuMobileMenuAnimationEvent) => {
        if (isClosing === true) {
          onClose();
          setIsClosing(false);
        }

        return undefined;
      }}
    >
      <div
        className="nova-navbar-compass-menu-panel nova-mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={mobileMenuAriaLabel}
      >
        <SearchProvider>
          <div className="nova-navbar-compass-menu-header">
            <div className="nova-navbar-compass-menu-brand">
              <Link
                to={siteLogo['href'] ?? '/'}
                onClick={() => {
                  setIsClosing(true);

                  return undefined;
                }}
              >
                {(siteLogo['wordmark'] !== undefined) && (
                  <img
                    className={(siteLogo['wordmarkDark'] !== undefined) ? 'nova-brand-light' : undefined}
                    src={siteLogo['wordmark']}
                    alt={siteLogo['alt']}
                  />
                )}
                {(
                  siteLogo['wordmark'] !== undefined
                  && siteLogo['wordmarkDark'] !== undefined
                ) && (
                  <img
                    className="nova-brand-dark"
                    src={siteLogo['wordmarkDark']}
                    alt={siteLogo['alt']}
                  />
                )}
                {(
                  siteLogo['wordmark'] === undefined
                  && siteLogo['src'] !== undefined
                ) && (
                  <img
                    className={(siteLogo['srcDark'] !== undefined) ? 'nova-brand-light' : undefined}
                    src={siteLogo['src']}
                    alt={siteLogo['alt']}
                  />
                )}
                {(
                  siteLogo['wordmark'] === undefined
                  && siteLogo['src'] !== undefined
                  && siteLogo['srcDark'] !== undefined
                ) && (
                  <img
                    className="nova-brand-dark"
                    src={siteLogo['srcDark']}
                    alt={siteLogo['alt']}
                  />
                )}
                {(
                  siteLogo['wordmark'] === undefined
                  && siteLogo['title'] !== undefined
                ) && (
                  <span>{siteLogo['title']}</span>
                )}
              </Link>
            </div>
            <button
              className="nova-navbar-compass-menu-close"
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
          <div className="nova-navbar-compass-menu-search nova-mobile-menu-search">
            <SearchInput />
            <SearchResults />
          </div>
          <div className="nova-navbar-compass-menu-items nova-mobile-menu-items">
            {
              items.map((navItem: ThemeNavbarItem, itemIndex: ThemeNavbarCompassMobileMenuMobileMenuItemIndex) => {
                const itemIcon: ThemeNavbarCompassMobileMenuMobileMenuItemIcon = navItem['icon'] as ThemeNavbarCompassMobileMenuMobileMenuItemIcon;
                const defaultIcon: ThemeNavbarCompassMobileMenuMobileMenuDefaultIcon = 'lucide:link';
                const itemStyle: ThemeNavbarCompassMobileMenuMobileMenuItemStyle = { '--nova-item-index': itemIndex } as ThemeNavbarCompassMobileMenuMobileMenuItemStyle;
                const linkProps: ThemeNavbarCompassMobileMenuMobileMenuLinkProps = {};

                if (navItem['to'] !== undefined) {
                  Reflect.set(linkProps, 'to', navItem['to']);
                  Reflect.set(linkProps, 'isNavLink', true);
                }

                if (navItem['href'] !== undefined) {
                  Reflect.set(linkProps, 'href', navItem['href']);
                }

                return (
                  <Link
                    className="nova-navbar-compass-menu-item"
                    key={navItem['label']}
                    style={itemStyle}
                    {...(linkProps as ThemeNavbarCompassMobileMenuMobileMenuLinkSpread)}
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
