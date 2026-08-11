import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { SearchProvider, SearchResults } from '@theme/SearchBar';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import type { Theme_Navbar_Index_Navbar_Item } from '../../../types/theme/Navbar/index.d.ts';

import type {
  Theme_Navbar_Shared_MobileMenuBase_CloseMenuAriaLabel,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ActiveItemLabel,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_AnimationEvent,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_AriaLabel,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildIsActive,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildItem,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildKey,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildLabel,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildTo,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_CloseButton,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_DefaultIcon,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_FocusSelector,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_FocusTarget,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideFunction,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideMouseEvent,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideMouseTarget,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleEscapeFunction,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleEscapeKeyboardEvent,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsClosing,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsClosingState,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsOpen,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIcon,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIndex,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIsActive,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Items,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemStyle,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_LinkProps,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_LinkSpread,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_NavItemChildren,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_NavItemType,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_OnClose,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_OverlayClassName,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_PanelRef,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Pathname,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeader,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Returns,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_SetIsClosing,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_StartClosing_Callback,
  Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_VariantPrefix,
} from '../../../types/theme/Navbar/shared/mobile-menu-base.d.ts';

/**
 * Theme - Navbar - Shared - Mobile Menu Base - Mobile Menu Base.
 *
 * Renders a full-screen or floating menu panel with an overlay backdrop,
 * a close button, and navigation items. The panel layout and visual styling
 * are controlled entirely by per-preset CSS via the renderHeader render prop.
 *
 * @param {Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props} props - Props.
 *
 * @since 0.23.0
 */
function MobileMenuBase(props: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props): Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Returns {
  const variantPrefix: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_VariantPrefix = props['variantPrefix'];
  const renderHeader: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeader = props['renderHeader'];
  const isOpen: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsOpen = props['isOpen'];
  const onClose: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_OnClose = props['onClose'];
  const items: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Items = props['items'];
  const activeItemLabel: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ActiveItemLabel = props['activeItemLabel'];
  const pathname: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Pathname = useLocation()['pathname'];
  const panelRef: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_PanelRef = useRef<HTMLDivElement>(null);
  const isClosingState: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsClosingState = useState<Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsClosing>(false);
  const isClosing: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsClosing = isClosingState[0];
  const setIsClosing: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_SetIsClosing = isClosingState[1];

  /**
   * Theme - Navbar - Shared - Mobile Menu Base - Mobile Menu Base - Handle Escape.
   *
   * Closes the mobile menu when the user presses the Escape key,
   * providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.23.0
   */
  const handleEscape: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleEscapeFunction = useCallback((event: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleEscapeKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Theme - Navbar - Shared - Mobile Menu Base - Mobile Menu Base - Handle Click Outside.
   *
   * Closes the mobile menu when the user clicks on the overlay backdrop
   * area outside the panel, providing an intuitive dismiss mechanism.
   *
   * @since 0.23.0
   */
  const handleClickOutside: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideFunction = useCallback((event: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideMouseEvent) => {
    const mouseTarget: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideMouseTarget = event.target;

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
      const focusSelector: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_FocusSelector = `.${variantPrefix}-close`;
      const focusTarget: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_FocusTarget = panelRef['current'].querySelector(focusSelector) as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_FocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  const mobileMenuAriaLabel: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_AriaLabel = translate({
    id: 'theme.navbar.mobileMenuAriaLabel',
    message: 'Navigation menu',
    description: 'The ARIA label for the mobile navigation menu dialog',
  });
  const closeMenuAriaLabel: Theme_Navbar_Shared_MobileMenuBase_CloseMenuAriaLabel = translate({
    id: 'theme.navbar.closeMenuAriaLabel',
    message: 'Close menu',
    description: 'The ARIA label for the button that closes the mobile navigation menu',
  });

  if (isOpen === false) {
    return null;
  }

  let overlayClassName: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_OverlayClassName = `${variantPrefix}-overlay ${variantPrefix}-open`;

  if (isClosing === true) {
    overlayClassName = `${variantPrefix}-overlay ${variantPrefix}-closing`;
  }

  /**
   * Theme - Navbar - Shared - Mobile Menu Base - Mobile Menu Base - Start Closing.
   *
   * Triggers the closing animation for the mobile menu panel
 * by setting the isClosing state to true.
   *
   * @since 0.23.0
   */
  const startClosing: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_StartClosing_Callback = () => {
    setIsClosing(true);

    return undefined;
  };

  const closeButton: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_CloseButton = (
    <button
      className={`${variantPrefix}-close`}
      type="button"
      onClick={() => {
        setIsClosing(true);

        return undefined;
      }}
      aria-label={closeMenuAriaLabel}
    >
      <Icon icon="lucide:x" width="20" height="20" aria-hidden="true" />
    </button>
  );

  return createPortal(
    <div
      className={overlayClassName}
      onClick={handleClickOutside}
      role="presentation"
      onAnimationEnd={(_event: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_AnimationEvent) => {
        if (isClosing === true) {
          onClose();
          setIsClosing(false);
        }

        return undefined;
      }}
    >
      <div
        className={`${variantPrefix}-panel nova-mobile-menu-panel`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={mobileMenuAriaLabel}
      >
        <SearchProvider>
          {renderHeader({
            closeButton,
            startClosing,
          })}
          <div className={`${variantPrefix}-body nova-mobile-menu-body`}>
            <SearchResults />
            <div className={`${variantPrefix}-items nova-mobile-menu-items`}>
              {
                items.map((navItem: Theme_Navbar_Index_Navbar_Item, itemIndex: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIndex) => {
                  const navItemType: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_NavItemType = navItem['type'] as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_NavItemType;
                  const navItemChildren: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_NavItemChildren = navItem['items'] as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_NavItemChildren;
                  const itemStyle: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemStyle = { '--nova-item-index': itemIndex } as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemStyle;

                  if (
                    navItemType === 'dropdown'
                    || (
                      navItemType === undefined
                      && Array.isArray(navItemChildren) === true
                    )
                  ) {
                    const dropdownIcon: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIcon = navItem['icon'] as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIcon;

                    return (
                      <details key={navItem['label']} className={`${variantPrefix}-dropdown`} style={itemStyle}>
                        <summary className={`${variantPrefix}-dropdown-summary`}>
                          <Icon icon={dropdownIcon ?? 'lucide:chevron-down'} width="18" height="18" aria-hidden="true" />
                          <span>{navItem['label']}</span>
                        </summary>
                        <div className={`${variantPrefix}-dropdown-children`}>
                          {
                            (navItemChildren ?? []).map((childItem: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildItem) => {
                              const childIcon: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIcon = childItem['icon'] as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIcon;
                              const childLinkProps: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_LinkProps = {};
                              const childTo: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildTo = childItem['to'] as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildTo;
                              const childIsActive: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildIsActive = (typeof childTo === 'string' && pathname.startsWith(childTo) === true);

                              if (childTo !== undefined) {
                                Reflect.set(childLinkProps, 'to', childTo);
                              }

                              if (childItem['href'] !== undefined) {
                                Reflect.set(childLinkProps, 'href', childItem['href']);
                              }

                              if (childIsActive === true) {
                                Reflect.set(childLinkProps, 'aria-current', 'page');
                              }

                              return (
                                <Link
                                  className={`${variantPrefix}-item`}
                                  key={childItem['label'] as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildKey}
                                  {...(childLinkProps as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_LinkSpread)}
                                  onClick={() => {
                                    setIsClosing(true);

                                    return undefined;
                                  }}
                                >
                                  <Icon icon={childIcon ?? 'lucide:link'} width="18" height="18" aria-hidden="true" />
                                  <span>{childItem['label'] as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildLabel}</span>
                                </Link>
                              );
                            })
                          }
                        </div>
                      </details>
                    );
                  }

                  const itemIcon: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIcon = navItem['icon'] as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIcon;
                  const defaultIcon: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_DefaultIcon = 'lucide:link';
                  const linkProps: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_LinkProps = {};
                  const isActive: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIsActive = navItem['label'] === activeItemLabel;

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
                      className={`${variantPrefix}-item`}
                      key={navItem['label']}
                      style={itemStyle}
                      {...(linkProps as Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_LinkSpread)}
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

export default MobileMenuBase;
