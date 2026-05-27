import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import BlogSidebar from '@theme/BlogSidebar';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import type {
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_AnimationEvent,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_CloseAriaLabel,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_FocusTarget,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideFunction,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideMouseEvent,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideMouseTarget,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleEscapeFunction,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleEscapeKeyboardEvent,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HeaderTitle,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsClosing,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsClosingState,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsOpen,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsOpenState,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_OpenAriaLabel,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_OverlayClassName,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_PanelAriaLabel,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_PanelRef,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Pathname,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsClosing,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsOpen,
  Theme_BlogSidebarMobile_Index_BlogSidebarMobile_TriggerLabel,
} from '../../types/theme/BlogSidebarMobile/index.d.ts';

/**
 * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile.
 *
 * Renders a mobile-only trigger button showing the blog sidebar
 * title, and a floating overlay panel containing the full blog
 * sidebar when tapped.
 *
 * @param {Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogSidebarMobile(props: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props) {
  const pathname: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Pathname = useLocation()['pathname'];

  const isOpenState: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsOpenState = useState<Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsOpen>(false);
  const isOpen: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsOpen = isOpenState[0];
  const setIsOpen: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsOpen = isOpenState[1];

  const isClosingState: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsClosingState = useState<Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsClosing>(false);
  const isClosing: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsClosing = isClosingState[0];
  const setIsClosing: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsClosing = isClosingState[1];

  const panelRef: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_PanelRef = useRef<HTMLDivElement>(null);

  /**
   * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile - Handle Escape.
   *
   * Closes the sidebar overlay when the user presses the Escape
   * key, providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleEscapeFunction = useCallback((event: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleEscapeKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile - Handle Click Outside.
   *
   * Closes the sidebar overlay when the user clicks on the
   * backdrop area outside the panel, providing an intuitive dismiss.
   *
   * @since 0.15.0
   */
  const handleClickOutside: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideFunction = useCallback((event: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideMouseEvent) => {
    const mouseTarget: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideMouseTarget = event.target;

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
      const focusTarget: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_FocusTarget = panelRef['current'].querySelector('.nova-sidebar-mobile-close') as Theme_BlogSidebarMobile_Index_BlogSidebarMobile_FocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  if (
    props['sidebar'] === undefined
    || props['sidebar']['items']['length'] === 0
  ) {
    return undefined;
  }

  const triggerLabel: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_TriggerLabel = translate({
    id: 'theme.blog.sidebar.mobileTriggerLabel',
    message: 'Sidebar',
    description: 'The label shown on the mobile blog sidebar trigger button',
  });
  const openAriaLabel: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_OpenAriaLabel = translate({
    id: 'theme.blog.sidebar.mobileOpenAriaLabel',
    message: 'Open blog sidebar',
    description: 'The ARIA label for the button that opens the mobile blog sidebar overlay',
  });
  const headerTitle: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HeaderTitle = translate({
    id: 'theme.blog.sidebar.mobileHeaderTitle',
    message: 'Sidebar',
    description: 'The title shown in the mobile blog sidebar overlay header',
  });
  const panelAriaLabel: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_PanelAriaLabel = translate({
    id: 'theme.blog.sidebar.mobilePanelAriaLabel',
    message: 'Blog sidebar',
    description: 'The ARIA label for the mobile blog sidebar overlay panel',
  });
  const closeAriaLabel: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_CloseAriaLabel = translate({
    id: 'theme.blog.sidebar.mobileCloseAriaLabel',
    message: 'Close blog sidebar',
    description: 'The ARIA label for the button that closes the mobile blog sidebar overlay',
  });

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
        <Icon icon="lucide:newspaper" width="14" height="14" aria-hidden="true" />
        <span className="nova-sidebar-mobile-trigger-path">
          {triggerLabel}
        </span>
        <Icon icon="lucide:chevron-down" width="14" height="14" aria-hidden="true" />
      </button>

      {(isOpen === true) && (() => {
        let overlayClassName: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_OverlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-open';

        if (isClosing === true) {
          overlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-closing';
        }

        return createPortal(
          <div
            className={overlayClassName}
            onClick={handleClickOutside}
            role="presentation"
            onAnimationEnd={(_event: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_AnimationEvent) => {
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
                <BlogSidebar sidebar={props['sidebar']} />
              </div>
            </div>
          </div>,
          document.body,
        );
      })()}
    </>
  );
}

export default BlogSidebarMobile;
