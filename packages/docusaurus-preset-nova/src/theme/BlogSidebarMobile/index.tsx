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
  ThemeBlogSidebarMobileBlogSidebarMobileAnimationEvent,
  ThemeBlogSidebarMobileBlogSidebarMobileCloseAriaLabel,
  ThemeBlogSidebarMobileBlogSidebarMobileFocusTarget,
  ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideFunction,
  ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideMouseEvent,
  ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideMouseTarget,
  ThemeBlogSidebarMobileBlogSidebarMobileHandleEscapeFunction,
  ThemeBlogSidebarMobileBlogSidebarMobileHandleEscapeKeyboardEvent,
  ThemeBlogSidebarMobileBlogSidebarMobileHeaderTitle,
  ThemeBlogSidebarMobileBlogSidebarMobileIsClosing,
  ThemeBlogSidebarMobileBlogSidebarMobileIsClosingState,
  ThemeBlogSidebarMobileBlogSidebarMobileIsOpen,
  ThemeBlogSidebarMobileBlogSidebarMobileIsOpenState,
  ThemeBlogSidebarMobileBlogSidebarMobileOpenAriaLabel,
  ThemeBlogSidebarMobileBlogSidebarMobileOverlayClassName,
  ThemeBlogSidebarMobileBlogSidebarMobilePanelAriaLabel,
  ThemeBlogSidebarMobileBlogSidebarMobilePanelRef,
  ThemeBlogSidebarMobileBlogSidebarMobilePathname,
  ThemeBlogSidebarMobileBlogSidebarMobileProps,
  ThemeBlogSidebarMobileBlogSidebarMobileSetIsClosing,
  ThemeBlogSidebarMobileBlogSidebarMobileSetIsOpen,
  ThemeBlogSidebarMobileBlogSidebarMobileTriggerLabel,
} from '../../types/theme/BlogSidebarMobile/index.d.ts';

/**
 * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile.
 *
 * Renders a mobile-only trigger button showing the blog sidebar
 * title, and a floating overlay panel containing the full blog
 * sidebar when tapped.
 *
 * @param {ThemeBlogSidebarMobileBlogSidebarMobileProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogSidebarMobile(props: ThemeBlogSidebarMobileBlogSidebarMobileProps) {
  const pathname: ThemeBlogSidebarMobileBlogSidebarMobilePathname = useLocation()['pathname'];

  const isOpenState: ThemeBlogSidebarMobileBlogSidebarMobileIsOpenState = useState<ThemeBlogSidebarMobileBlogSidebarMobileIsOpen>(false);
  const isOpen: ThemeBlogSidebarMobileBlogSidebarMobileIsOpen = isOpenState[0];
  const setIsOpen: ThemeBlogSidebarMobileBlogSidebarMobileSetIsOpen = isOpenState[1];

  const isClosingState: ThemeBlogSidebarMobileBlogSidebarMobileIsClosingState = useState<ThemeBlogSidebarMobileBlogSidebarMobileIsClosing>(false);
  const isClosing: ThemeBlogSidebarMobileBlogSidebarMobileIsClosing = isClosingState[0];
  const setIsClosing: ThemeBlogSidebarMobileBlogSidebarMobileSetIsClosing = isClosingState[1];

  const panelRef: ThemeBlogSidebarMobileBlogSidebarMobilePanelRef = useRef<HTMLDivElement>(null);

  /**
   * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile - Handle Escape.
   *
   * Closes the sidebar overlay when the user presses the Escape
   * key, providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: ThemeBlogSidebarMobileBlogSidebarMobileHandleEscapeFunction = useCallback((event: ThemeBlogSidebarMobileBlogSidebarMobileHandleEscapeKeyboardEvent) => {
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
  const handleClickOutside: ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideFunction = useCallback((event: ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideMouseEvent) => {
    const mouseTarget: ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideMouseTarget = event.target;

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
      const focusTarget: ThemeBlogSidebarMobileBlogSidebarMobileFocusTarget = panelRef['current'].querySelector('.nova-sidebar-mobile-close') as ThemeBlogSidebarMobileBlogSidebarMobileFocusTarget;

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

  const triggerLabel: ThemeBlogSidebarMobileBlogSidebarMobileTriggerLabel = translate({
    id: 'theme.blog.sidebar.mobileTriggerLabel',
    message: 'Sidebar',
    description: 'The label shown on the mobile blog sidebar trigger button',
  });
  const openAriaLabel: ThemeBlogSidebarMobileBlogSidebarMobileOpenAriaLabel = translate({
    id: 'theme.blog.sidebar.mobileOpenAriaLabel',
    message: 'Open blog sidebar',
    description: 'The ARIA label for the button that opens the mobile blog sidebar overlay',
  });
  const headerTitle: ThemeBlogSidebarMobileBlogSidebarMobileHeaderTitle = translate({
    id: 'theme.blog.sidebar.mobileHeaderTitle',
    message: 'Sidebar',
    description: 'The title shown in the mobile blog sidebar overlay header',
  });
  const panelAriaLabel: ThemeBlogSidebarMobileBlogSidebarMobilePanelAriaLabel = translate({
    id: 'theme.blog.sidebar.mobilePanelAriaLabel',
    message: 'Blog sidebar',
    description: 'The ARIA label for the mobile blog sidebar overlay panel',
  });
  const closeAriaLabel: ThemeBlogSidebarMobileBlogSidebarMobileCloseAriaLabel = translate({
    id: 'theme.blog.sidebar.mobileCloseAriaLabel',
    message: 'Close blog sidebar',
    description: 'The ARIA label for the button that closes the mobile blog sidebar overlay',
  });

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
        <Icon icon="lucide:newspaper" width="14" height="14" aria-hidden="true" />
        <span className="nova-sidebar-mobile-trigger-path">
          {triggerLabel}
        </span>
        <Icon icon="lucide:chevron-down" width="14" height="14" aria-hidden="true" />
      </button>

      {(isOpen === true) && (() => {
        let overlayClassName: ThemeBlogSidebarMobileBlogSidebarMobileOverlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-open';

        if (isClosing === true) {
          overlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-closing';
        }

        return createPortal(
          <div
            className={overlayClassName}
            onClick={handleClickOutside}
            role="presentation"
            onAnimationEnd={(_event: ThemeBlogSidebarMobileBlogSidebarMobileAnimationEvent) => {
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
