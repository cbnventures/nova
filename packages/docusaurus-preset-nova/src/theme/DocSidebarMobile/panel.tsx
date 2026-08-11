import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import DocSidebar from '@theme/DocSidebar';
import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import {
  sidebarMobileGetSnapshot,
  sidebarMobileSetOpen,
  sidebarMobileSubscribe,
} from '../../lib/sidebar-mobile-store.js';
import { useOverlayPanel } from '../../lib/use-overlay-panel.js';

import type {
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_AnimationEvent,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_CloseAriaLabel,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HandleClickOutsideFunction,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HeaderTitle,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_IsClosing,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_IsOpen,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_OverlayClassName,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_OverlayPanel,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_PanelAriaLabel,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_PanelRef,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_Pathname,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_SetIsClosing,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_Sidebar,
  Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_SidebarItems,
} from '../../types/theme/DocSidebarMobile/panel.d.ts';

/**
 * Theme - Doc Sidebar Mobile - Panel - Doc Sidebar Mobile Panel.
 *
 * Renders the floating overlay panel containing the full doc sidebar.
 * Mounted once from the persistent doc-root layout so it survives
 * doc-to-doc navigation without the open overlay blinking.
 *
 * @since 0.21.0
 */
function DocSidebarMobilePanel() {
  const sidebar: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_Sidebar = useDocsSidebar() as Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_Sidebar;
  const pathname: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_Pathname = useLocation()['pathname'];

  const isOpen: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_IsOpen = useSyncExternalStore(sidebarMobileSubscribe, sidebarMobileGetSnapshot, sidebarMobileGetSnapshot);

  const overlayPanel: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_OverlayPanel = useOverlayPanel(isOpen, '.nova-sidebar-mobile-close');
  const isClosing: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_IsClosing = overlayPanel['isClosing'];
  const setIsClosing: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_SetIsClosing = overlayPanel['setIsClosing'];
  const handleClickOutside: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HandleClickOutsideFunction = overlayPanel['handleClickOutside'];
  const panelRef: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_PanelRef = overlayPanel['panelRef'];

  if (
    isOpen !== true
    || sidebar === null
  ) {
    return null;
  }

  const panelAriaLabel: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_PanelAriaLabel = translate({
    id: 'theme.docs.sidebarMobile.panelAriaLabel',
    message: 'Docs navigation',
    description: 'The ARIA label for the mobile docs sidebar panel',
  });
  const headerTitle: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HeaderTitle = translate({
    id: 'theme.docs.sidebarMobile.headerTitle',
    message: 'Navigation',
    description: 'The title shown in the mobile docs sidebar header',
  });
  const closeAriaLabel: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_CloseAriaLabel = translate({
    id: 'theme.docs.sidebarMobile.closeAriaLabel',
    message: 'Close navigation',
    description: 'The ARIA label for the button that closes the mobile docs sidebar',
  });

  const sidebarItems: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_SidebarItems = sidebar['items'] as Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_SidebarItems;

  let overlayClassName: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_OverlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-open';

  if (isClosing === true) {
    overlayClassName = 'nova-sidebar-mobile-overlay nova-sidebar-mobile-closing';
  }

  return createPortal(
    <div
      className={overlayClassName}
      onClick={handleClickOutside}
      role="presentation"
      onAnimationEnd={(_event: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_AnimationEvent) => {
        if (isClosing === true) {
          sidebarMobileSetOpen(false);
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
}

export default DocSidebarMobilePanel;
