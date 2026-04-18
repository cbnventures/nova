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

import type { ThemeNavbarItem } from '../../../types/theme/Navbar/index.d.ts';

import type {
  ThemeNavbarMonolithMobileMenuCloseMenuAriaLabel,
  ThemeNavbarMonolithMobileMenuMobileMenuAnimationEvent,
  ThemeNavbarMonolithMobileMenuMobileMenuAriaLabel,
  ThemeNavbarMonolithMobileMenuMobileMenuDefaultIcon,
  ThemeNavbarMonolithMobileMenuMobileMenuFocusTarget,
  ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideFunction,
  ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideMouseEvent,
  ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideMouseTarget,
  ThemeNavbarMonolithMobileMenuMobileMenuHandleEscapeFunction,
  ThemeNavbarMonolithMobileMenuMobileMenuHandleEscapeKeyboardEvent,
  ThemeNavbarMonolithMobileMenuMobileMenuIsClosing,
  ThemeNavbarMonolithMobileMenuMobileMenuIsClosingState,
  ThemeNavbarMonolithMobileMenuMobileMenuIsOpen,
  ThemeNavbarMonolithMobileMenuMobileMenuItemIcon,
  ThemeNavbarMonolithMobileMenuMobileMenuItemIndex,
  ThemeNavbarMonolithMobileMenuMobileMenuItems,
  ThemeNavbarMonolithMobileMenuMobileMenuItemStyle,
  ThemeNavbarMonolithMobileMenuMobileMenuLinkProps,
  ThemeNavbarMonolithMobileMenuMobileMenuLinkSpread,
  ThemeNavbarMonolithMobileMenuMobileMenuOnClose,
  ThemeNavbarMonolithMobileMenuMobileMenuOverlayClassName,
  ThemeNavbarMonolithMobileMenuMobileMenuPanelRef,
  ThemeNavbarMonolithMobileMenuMobileMenuProps,
  ThemeNavbarMonolithMobileMenuMobileMenuReturns,
  ThemeNavbarMonolithMobileMenuMobileMenuSetIsClosing,
} from '../../../types/theme/Navbar/Monolith/mobile-menu.d.ts';

/**
 * Theme - Navbar - Monolith - Mobile Menu - Mobile Menu.
 *
 * Renders a full-screen or floating menu panel with an overlay backdrop,
 * a close button, and navigation items. The panel layout and visual
 * styling are controlled entirely by per-preset CSS.
 *
 * @param {ThemeNavbarMonolithMobileMenuMobileMenuProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MobileMenu(props: ThemeNavbarMonolithMobileMenuMobileMenuProps): ThemeNavbarMonolithMobileMenuMobileMenuReturns {
  const isOpen: ThemeNavbarMonolithMobileMenuMobileMenuIsOpen = props['isOpen'];
  const onClose: ThemeNavbarMonolithMobileMenuMobileMenuOnClose = props['onClose'];
  const items: ThemeNavbarMonolithMobileMenuMobileMenuItems = props['items'];
  const panelRef: ThemeNavbarMonolithMobileMenuMobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const isClosingState: ThemeNavbarMonolithMobileMenuMobileMenuIsClosingState = useState<ThemeNavbarMonolithMobileMenuMobileMenuIsClosing>(false);
  const isClosing: ThemeNavbarMonolithMobileMenuMobileMenuIsClosing = isClosingState[0];
  const setIsClosing: ThemeNavbarMonolithMobileMenuMobileMenuSetIsClosing = isClosingState[1];

  /**
   * Theme - Navbar - Monolith - Mobile Menu - Mobile Menu - Handle Escape.
   *
   * Closes the mobile menu when the user presses the Escape key,
   * providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: ThemeNavbarMonolithMobileMenuMobileMenuHandleEscapeFunction = useCallback((event: ThemeNavbarMonolithMobileMenuMobileMenuHandleEscapeKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Theme - Navbar - Monolith - Mobile Menu - Mobile Menu - Handle Click Outside.
   *
   * Closes the mobile menu when the user clicks on the overlay backdrop
   * area outside the panel, providing an intuitive dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleClickOutside: ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideFunction = useCallback((event: ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideMouseEvent) => {
    const mouseTarget: ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideMouseTarget = event.target;

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
      const focusTarget: ThemeNavbarMonolithMobileMenuMobileMenuFocusTarget = panelRef['current'].querySelector('.nova-navbar-monolith-menu-close') as ThemeNavbarMonolithMobileMenuMobileMenuFocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  const mobileMenuAriaLabel: ThemeNavbarMonolithMobileMenuMobileMenuAriaLabel = translate({
    id: 'theme.navbar.mobileMenuAriaLabel',
    message: 'Navigation menu',
    description: 'The ARIA label for the mobile navigation menu dialog',
  });
  const closeMenuAriaLabel: ThemeNavbarMonolithMobileMenuCloseMenuAriaLabel = translate({
    id: 'theme.navbar.closeMenuAriaLabel',
    message: 'Close menu',
    description: 'The ARIA label for the button that closes the mobile navigation menu',
  });

  if (isOpen === false) {
    return null;
  }

  let overlayClassName: ThemeNavbarMonolithMobileMenuMobileMenuOverlayClassName = 'nova-navbar-monolith-menu-overlay nova-navbar-monolith-menu-open';

  if (isClosing === true) {
    overlayClassName = 'nova-navbar-monolith-menu-overlay nova-navbar-monolith-menu-closing';
  }

  return createPortal(
    <div
      className={overlayClassName}
      onClick={handleClickOutside}
      role="presentation"
      onAnimationEnd={(_event: ThemeNavbarMonolithMobileMenuMobileMenuAnimationEvent) => {
        if (isClosing === true) {
          onClose();
          setIsClosing(false);
        }

        return undefined;
      }}
    >
      <div
        className="nova-navbar-monolith-menu-panel nova-mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={mobileMenuAriaLabel}
      >
        <SearchProvider>
          <div className="nova-navbar-monolith-menu-header">
            <div className="nova-navbar-monolith-menu-search nova-mobile-menu-search">
              <SearchInput />
            </div>
            <button
              className="nova-navbar-monolith-menu-close"
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
          <div className="nova-navbar-monolith-menu-results nova-mobile-menu-results">
            <SearchResults />
          </div>
          <div className="nova-navbar-monolith-menu-items nova-mobile-menu-items">
            {
              items.map((navItem: ThemeNavbarItem, itemIndex: ThemeNavbarMonolithMobileMenuMobileMenuItemIndex) => {
                const itemIcon: ThemeNavbarMonolithMobileMenuMobileMenuItemIcon = navItem['icon'] as ThemeNavbarMonolithMobileMenuMobileMenuItemIcon;
                const defaultIcon: ThemeNavbarMonolithMobileMenuMobileMenuDefaultIcon = 'lucide:link';
                const itemStyle: ThemeNavbarMonolithMobileMenuMobileMenuItemStyle = { '--nova-item-index': itemIndex } as ThemeNavbarMonolithMobileMenuMobileMenuItemStyle;
                const linkProps: ThemeNavbarMonolithMobileMenuMobileMenuLinkProps = {};

                if (navItem['to'] !== undefined) {
                  Reflect.set(linkProps, 'to', navItem['to']);
                  Reflect.set(linkProps, 'isNavLink', true);
                }

                if (navItem['href'] !== undefined) {
                  Reflect.set(linkProps, 'href', navItem['href']);
                }

                return (
                  <Link
                    className="nova-navbar-monolith-menu-item"
                    key={navItem['label']}
                    style={itemStyle}
                    {...(linkProps as ThemeNavbarMonolithMobileMenuMobileMenuLinkSpread)}
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
