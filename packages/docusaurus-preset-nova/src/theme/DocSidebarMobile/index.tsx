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
  Theme_DocSidebarMobile_Index_DocSidebarMobile_AnimationEvent,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbIndex,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbItem,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_Breadcrumbs,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_CloseAriaLabel,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_FocusTarget,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideFunction,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideMouseEvent,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideMouseTarget,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleEscapeFunction,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleEscapeKeyboardEvent,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_HeaderTitle,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_IsClosing,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_IsClosingState,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_IsOpen,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_IsOpenState,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_OpenAriaLabel,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_OverlayClassName,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_PanelAriaLabel,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_PanelRef,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_Pathname,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_Props,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_Separator,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_SetIsClosing,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_SetIsOpen,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_Sidebar,
  Theme_DocSidebarMobile_Index_DocSidebarMobile_SidebarItems,
} from '../../types/theme/DocSidebarMobile/index.d.ts';

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile.
 *
 * Renders a mobile-only trigger button showing the current sidebar
 * hierarchy path, and a floating overlay panel containing the full
 * doc sidebar when tapped.
 *
 * @param {Theme_DocSidebarMobile_Index_DocSidebarMobile_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocSidebarMobile(props: Theme_DocSidebarMobile_Index_DocSidebarMobile_Props) {
  const breadcrumbs: Theme_DocSidebarMobile_Index_DocSidebarMobile_Breadcrumbs = useSidebarBreadcrumbs();
  const sidebar: Theme_DocSidebarMobile_Index_DocSidebarMobile_Sidebar = useDocsSidebar() as Theme_DocSidebarMobile_Index_DocSidebarMobile_Sidebar;
  const pathname: Theme_DocSidebarMobile_Index_DocSidebarMobile_Pathname = useLocation()['pathname'];

  const isOpenState: Theme_DocSidebarMobile_Index_DocSidebarMobile_IsOpenState = useState<Theme_DocSidebarMobile_Index_DocSidebarMobile_IsOpen>(false);
  const isOpen: Theme_DocSidebarMobile_Index_DocSidebarMobile_IsOpen = isOpenState[0];
  const setIsOpen: Theme_DocSidebarMobile_Index_DocSidebarMobile_SetIsOpen = isOpenState[1];

  const isClosingState: Theme_DocSidebarMobile_Index_DocSidebarMobile_IsClosingState = useState<Theme_DocSidebarMobile_Index_DocSidebarMobile_IsClosing>(false);
  const isClosing: Theme_DocSidebarMobile_Index_DocSidebarMobile_IsClosing = isClosingState[0];
  const setIsClosing: Theme_DocSidebarMobile_Index_DocSidebarMobile_SetIsClosing = isClosingState[1];

  const panelRef: Theme_DocSidebarMobile_Index_DocSidebarMobile_PanelRef = useRef<HTMLDivElement>(null);

  /**
   * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile - Handle Escape.
   *
   * Closes the sidebar overlay when the user presses the Escape
   * key, providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleEscapeFunction = useCallback((event: Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleEscapeKeyboardEvent) => {
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
  const handleClickOutside: Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideFunction = useCallback((event: Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideMouseEvent) => {
    const mouseTarget: Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideMouseTarget = event.target;

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
      const focusTarget: Theme_DocSidebarMobile_Index_DocSidebarMobile_FocusTarget = panelRef['current'].querySelector('.nova-sidebar-mobile-close') as Theme_DocSidebarMobile_Index_DocSidebarMobile_FocusTarget;

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

  const openAriaLabel: Theme_DocSidebarMobile_Index_DocSidebarMobile_OpenAriaLabel = translate({
    id: 'theme.docs.sidebarMobile.openAriaLabel',
    message: 'Open docs navigation',
    description: 'The ARIA label for the button that opens the mobile docs sidebar',
  });
  const panelAriaLabel: Theme_DocSidebarMobile_Index_DocSidebarMobile_PanelAriaLabel = translate({
    id: 'theme.docs.sidebarMobile.panelAriaLabel',
    message: 'Docs navigation',
    description: 'The ARIA label for the mobile docs sidebar panel',
  });
  const headerTitle: Theme_DocSidebarMobile_Index_DocSidebarMobile_HeaderTitle = translate({
    id: 'theme.docs.sidebarMobile.headerTitle',
    message: 'Navigation',
    description: 'The title shown in the mobile docs sidebar header',
  });
  const closeAriaLabel: Theme_DocSidebarMobile_Index_DocSidebarMobile_CloseAriaLabel = translate({
    id: 'theme.docs.sidebarMobile.closeAriaLabel',
    message: 'Close navigation',
    description: 'The ARIA label for the button that closes the mobile docs sidebar',
  });

  const sidebarItems: Theme_DocSidebarMobile_Index_DocSidebarMobile_SidebarItems = sidebar['items'] as Theme_DocSidebarMobile_Index_DocSidebarMobile_SidebarItems;
  const separator: Theme_DocSidebarMobile_Index_DocSidebarMobile_Separator = <Icon icon="lucide:chevron-right" width="12" height="12" aria-hidden="true" />;

  return (
    <>
      <button
        className={(props['className'] !== undefined) ? `nova-sidebar-mobile-trigger ${props['className']}` : 'nova-sidebar-mobile-trigger'}
        style={props['style']}
        type="button"
        onClick={() => {
          setIsOpen(true);

          return undefined;
        }}
        aria-label={openAriaLabel}
      >
        <Icon icon="lucide:list-tree" width="14" height="14" aria-hidden="true" />
        <span className="nova-sidebar-mobile-trigger-path">
          {breadcrumbs.map((item: Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbItem, index: Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbIndex) => (
            <span className="nova-sidebar-mobile-trigger-segment" key={index}>
              {(index > 0) && separator}
              {item['label']}
            </span>
          ))}
        </span>
        <Icon icon="lucide:chevron-down" width="14" height="14" aria-hidden="true" />
      </button>

      {(isOpen === true) && (() => {
        let overlayClassName: Theme_DocSidebarMobile_Index_DocSidebarMobile_OverlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-open';

        if (isClosing === true) {
          overlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-closing';
        }

        return createPortal(
          <div
            className={overlayClassName}
            onClick={handleClickOutside}
            role="presentation"
            onAnimationEnd={(_event: Theme_DocSidebarMobile_Index_DocSidebarMobile_AnimationEvent) => {
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
