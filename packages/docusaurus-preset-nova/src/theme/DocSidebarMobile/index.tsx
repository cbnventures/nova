import { useDocsSidebar, useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import DocSidebar from '@theme/DocSidebar';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import type {
  ThemeDocSidebarMobileDocSidebarMobileAnimationEvent,
  ThemeDocSidebarMobileDocSidebarMobileBreadcrumbIndex,
  ThemeDocSidebarMobileDocSidebarMobileBreadcrumbItem,
  ThemeDocSidebarMobileDocSidebarMobileBreadcrumbs,
  ThemeDocSidebarMobileDocSidebarMobileCloseAriaLabel,
  ThemeDocSidebarMobileDocSidebarMobileFocusTarget,
  ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideFunction,
  ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideMouseEvent,
  ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideMouseTarget,
  ThemeDocSidebarMobileDocSidebarMobileHandleEscapeFunction,
  ThemeDocSidebarMobileDocSidebarMobileHandleEscapeKeyboardEvent,
  ThemeDocSidebarMobileDocSidebarMobileHeaderTitle,
  ThemeDocSidebarMobileDocSidebarMobileIsClosing,
  ThemeDocSidebarMobileDocSidebarMobileIsClosingState,
  ThemeDocSidebarMobileDocSidebarMobileIsOpen,
  ThemeDocSidebarMobileDocSidebarMobileIsOpenState,
  ThemeDocSidebarMobileDocSidebarMobileOpenAriaLabel,
  ThemeDocSidebarMobileDocSidebarMobileOverlayClassName,
  ThemeDocSidebarMobileDocSidebarMobilePanelAriaLabel,
  ThemeDocSidebarMobileDocSidebarMobilePanelRef,
  ThemeDocSidebarMobileDocSidebarMobilePathname,
  ThemeDocSidebarMobileDocSidebarMobileSeparator,
  ThemeDocSidebarMobileDocSidebarMobileSetIsClosing,
  ThemeDocSidebarMobileDocSidebarMobileSetIsOpen,
  ThemeDocSidebarMobileDocSidebarMobileSidebar,
  ThemeDocSidebarMobileDocSidebarMobileSidebarItems,
} from '../../types/theme/DocSidebarMobile/index.d.ts';

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile.
 *
 * Renders a mobile-only trigger button showing the current sidebar
 * hierarchy path, and a floating overlay panel containing the full
 * doc sidebar when tapped.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarMobile() {
  const breadcrumbs: ThemeDocSidebarMobileDocSidebarMobileBreadcrumbs = useSidebarBreadcrumbs();
  const sidebar: ThemeDocSidebarMobileDocSidebarMobileSidebar = useDocsSidebar() as ThemeDocSidebarMobileDocSidebarMobileSidebar;
  const pathname: ThemeDocSidebarMobileDocSidebarMobilePathname = useLocation()['pathname'];

  const isOpenState: ThemeDocSidebarMobileDocSidebarMobileIsOpenState = useState<ThemeDocSidebarMobileDocSidebarMobileIsOpen>(false);
  const isOpen: ThemeDocSidebarMobileDocSidebarMobileIsOpen = isOpenState[0];
  const setIsOpen: ThemeDocSidebarMobileDocSidebarMobileSetIsOpen = isOpenState[1];

  const isClosingState: ThemeDocSidebarMobileDocSidebarMobileIsClosingState = useState<ThemeDocSidebarMobileDocSidebarMobileIsClosing>(false);
  const isClosing: ThemeDocSidebarMobileDocSidebarMobileIsClosing = isClosingState[0];
  const setIsClosing: ThemeDocSidebarMobileDocSidebarMobileSetIsClosing = isClosingState[1];

  const panelRef: ThemeDocSidebarMobileDocSidebarMobilePanelRef = useRef<HTMLDivElement>(null);

  /**
   * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile - Handle Escape.
   *
   * Closes the sidebar overlay when the user presses the Escape
   * key, providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: ThemeDocSidebarMobileDocSidebarMobileHandleEscapeFunction = useCallback((event: ThemeDocSidebarMobileDocSidebarMobileHandleEscapeKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile - Handle Click Outside.
   *
   * Closes the sidebar overlay when the user clicks on the
   * backdrop area outside the panel, providing an intuitive dismiss.
   *
   * @since 0.15.0
   */
  const handleClickOutside: ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideFunction = useCallback((event: ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideMouseEvent) => {
    const mouseTarget: ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideMouseTarget = event.target;

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

  // Close overlay on navigation.
  useEffect(() => {
    if (isOpen === true) {
      setIsClosing(true);
    }

    return undefined;
  }, [pathname]);

  // Focus close button when dialog opens.
  useEffect(() => {
    if (isOpen === true && panelRef['current'] !== null) {
      const focusTarget: ThemeDocSidebarMobileDocSidebarMobileFocusTarget = panelRef['current'].querySelector('.nova-sidebar-mobile-close') as ThemeDocSidebarMobileDocSidebarMobileFocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  if (
    sidebar === null
    || breadcrumbs === null
    || breadcrumbs === undefined
  ) {
    return null;
  }

  const openAriaLabel: ThemeDocSidebarMobileDocSidebarMobileOpenAriaLabel = translate({
    id: 'theme.docs.sidebarMobile.openAriaLabel',
    message: 'Open docs navigation',
    description: 'The ARIA label for the button that opens the mobile docs sidebar',
  });
  const panelAriaLabel: ThemeDocSidebarMobileDocSidebarMobilePanelAriaLabel = translate({
    id: 'theme.docs.sidebarMobile.panelAriaLabel',
    message: 'Docs navigation',
    description: 'The ARIA label for the mobile docs sidebar panel',
  });
  const headerTitle: ThemeDocSidebarMobileDocSidebarMobileHeaderTitle = translate({
    id: 'theme.docs.sidebarMobile.headerTitle',
    message: 'Navigation',
    description: 'The title shown in the mobile docs sidebar header',
  });
  const closeAriaLabel: ThemeDocSidebarMobileDocSidebarMobileCloseAriaLabel = translate({
    id: 'theme.docs.sidebarMobile.closeAriaLabel',
    message: 'Close navigation',
    description: 'The ARIA label for the button that closes the mobile docs sidebar',
  });

  const sidebarItems: ThemeDocSidebarMobileDocSidebarMobileSidebarItems = sidebar['items'] as ThemeDocSidebarMobileDocSidebarMobileSidebarItems;
  const separator: ThemeDocSidebarMobileDocSidebarMobileSeparator = <Icon icon="lucide:chevron-right" width="12" height="12" aria-hidden="true" />;

  return (
    <>
      <button
        className="nova-sidebar-mobile-trigger"
        type="button"
        onClick={() => {
          setIsOpen(true);

          return undefined;
        }}
        aria-label={openAriaLabel}
      >
        <Icon icon="lucide:list-tree" width="14" height="14" aria-hidden="true" />
        <span className="nova-sidebar-mobile-trigger-path">
          {breadcrumbs.map((item: ThemeDocSidebarMobileDocSidebarMobileBreadcrumbItem, index: ThemeDocSidebarMobileDocSidebarMobileBreadcrumbIndex) => (
            <span className="nova-sidebar-mobile-trigger-segment" key={index}>
              {(index > 0) && separator}
              {item['label']}
            </span>
          ))}
        </span>
        <Icon icon="lucide:chevron-down" width="14" height="14" aria-hidden="true" />
      </button>

      {(isOpen === true) && (() => {
        let overlayClassName: ThemeDocSidebarMobileDocSidebarMobileOverlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-open';

        if (isClosing === true) {
          overlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-closing';
        }

        return createPortal(
          <div
            className={overlayClassName}
            onClick={handleClickOutside}
            role="presentation"
            onAnimationEnd={(_event: ThemeDocSidebarMobileDocSidebarMobileAnimationEvent) => {
              if (isClosing === true) {
                setIsOpen(false);
                setIsClosing(false);
              }

              return undefined;
            }}
          >
            <div
              className="nova-sidebar-mobile-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={panelAriaLabel}
            >
              <div className="nova-sidebar-mobile-header">
                <span className="nova-sidebar-mobile-header-title">{headerTitle}</span>
                <button
                  className="nova-sidebar-mobile-close"
                  type="button"
                  onClick={() => {
                    setIsClosing(true);

                    return undefined;
                  }}
                  aria-label={closeAriaLabel}
                >
                  <Icon icon="lucide:x" width="20" height="20" aria-hidden="true" />
                </button>
              </div>
              <div className="nova-sidebar-mobile-content">
                <DocSidebar
                  sidebar={sidebarItems}
                  path={pathname}
                  onCollapse={() => undefined}
                  isHidden={false}
                />
              </div>
            </div>
          </div>,
          document.body,
        );
      })()}
    </>
  );
}

export default DocSidebarMobile;
