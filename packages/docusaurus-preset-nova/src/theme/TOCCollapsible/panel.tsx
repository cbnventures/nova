import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import {
  useEffect,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';

import {
  tocCollapsibleGetOpenSnapshot,
  tocCollapsibleGetPayloadSnapshot,
  tocCollapsibleSetOpen,
  tocCollapsibleSubscribe,
} from '../../lib/toc-collapsible-store.js';
import { useOverlayPanel } from '../../lib/use-overlay-panel.js';

import type {
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_AnimationEvent,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_CloseAriaLabel,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_DialogAriaLabel,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideFunction,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosing,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsOpen,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_OverlayClassName,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_OverlayPanel,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_PanelRef,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Pathname,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_SetIsClosing,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_TriggerLabel,
  Theme_TocCollapsible_Panel_TocList_Item,
  Theme_TocCollapsible_Panel_TocList_Items,
  Theme_TocCollapsible_Panel_TocList_OnLinkClick,
} from '../../types/theme/TOCCollapsible/panel.d.ts';

/**
 * Theme - Toc Collapsible - Panel - Toc List.
 *
 * Recursively renders a nested unordered list of
 * table-of-contents items, linking each heading by its anchor
 * identifier and nesting child items.
 *
 * @param {Theme_TocCollapsible_Panel_TocList_Items}       items       - Items.
 * @param {Theme_TocCollapsible_Panel_TocList_OnLinkClick} onLinkClick - On link click.
 *
 * @returns {JSX.Element | undefined}
 *
 * @since 0.27.0
 */
function TocList(items: Theme_TocCollapsible_Panel_TocList_Items, onLinkClick: Theme_TocCollapsible_Panel_TocList_OnLinkClick) {
  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  return (
    <ul className="nova-toc-list">
      {
        items.map((item: Theme_TocCollapsible_Panel_TocList_Item) => (
          <li className="nova-toc-item" key={item['id']}>
            <a className="nova-toc-link" href={`#${item['id']}`} onClick={onLinkClick} dangerouslySetInnerHTML={{ __html: item['value'] }} />
            {TocList(item['children'], onLinkClick)}
          </li>
        ))
      }
    </ul>
  );
}

/**
 * Theme - Toc Collapsible - Panel - Toc Collapsible Panel.
 *
 * Renders the floating overlay panel containing the table of contents.
 * Mounted once from the persistent doc-root layout (docs) or the page
 * shell (src/pages, blog) so navigation does not blink the open overlay.
 *
 * @since 0.21.0
 */
function TOCCollapsiblePanel() {
  const pathname: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Pathname = useLocation()['pathname'];
  const isOpen: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsOpen = useSyncExternalStore(tocCollapsibleSubscribe, tocCollapsibleGetOpenSnapshot, tocCollapsibleGetOpenSnapshot);
  const payload: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload = useSyncExternalStore(tocCollapsibleSubscribe, tocCollapsibleGetPayloadSnapshot, tocCollapsibleGetPayloadSnapshot);

  const overlayPanel: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_OverlayPanel = useOverlayPanel(isOpen, '.nova-toc-collapsible-close');
  const isClosing: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosing = overlayPanel['isClosing'];
  const setIsClosing: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_SetIsClosing = overlayPanel['setIsClosing'];
  const handleClickOutside: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideFunction = overlayPanel['handleClickOutside'];
  const panelRef: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_PanelRef = overlayPanel['panelRef'];

  // Close overlay on navigation.
  useEffect(() => {
    if (isOpen === true) {
      setIsClosing(true);
    }

    return undefined;
  }, [pathname]);

  if (
    isOpen !== true
    || payload === undefined
    || payload['treeItems']['length'] === 0
  ) {
    return null;
  }

  const triggerLabel: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_TriggerLabel = translate({
    id: 'theme.TOCCollapsible.toggleButtonLabel',
    message: 'Table of Contents',
    description: 'The label for the table of contents trigger button and header title',
  });
  const dialogAriaLabel: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_DialogAriaLabel = translate({
    id: 'theme.TOCCollapsible.dialogAriaLabel',
    message: 'Table of contents',
    description: 'The ARIA label for the table of contents dialog panel',
  });
  const closeAriaLabel: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_CloseAriaLabel = translate({
    id: 'theme.TOCCollapsible.closeAriaLabel',
    message: 'Close table of contents',
    description: 'The ARIA label for the button that closes the table of contents overlay',
  });

  let overlayClassName: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_OverlayClassName = 'nova-toc-collapsible-overlay nova-toc-collapsible-open';

  if (isClosing === true) {
    overlayClassName = 'nova-toc-collapsible-overlay nova-toc-collapsible-closing';
  }

  return createPortal(
    <div
      className={overlayClassName}
      onClick={handleClickOutside}
      role="presentation"
      onAnimationEnd={(_event: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_AnimationEvent) => {
        if (isClosing === true) {
          tocCollapsibleSetOpen(false);
          setIsClosing(false);
        }

        return undefined;
      }}
    >
      <div
        className="nova-toc-collapsible-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={dialogAriaLabel}
      >
        <div className="nova-toc-collapsible-header">
          <span className="nova-toc-collapsible-header-title">{triggerLabel}</span>
          <button
            className="nova-toc-collapsible-close"
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
        <div className="nova-toc-collapsible-content">
          {TocList(payload['treeItems'], () => {
            setIsClosing(true);

            return undefined;
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default TOCCollapsiblePanel;
