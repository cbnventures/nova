import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';

import {
  tocCollapsibleGetOpenSnapshot,
  tocCollapsibleGetPayloadSnapshot,
  tocCollapsibleSetOpen,
  tocCollapsibleSubscribe,
} from '../../lib/toc-collapsible-store.js';

import type {
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_AnimationEvent,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_CloseAriaLabel,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_DialogAriaLabel,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_FocusTarget,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideFunction,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideMouseEvent,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideMouseTarget,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleEscapeFunction,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleEscapeKeyboardEvent,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosing,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosingState,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsOpen,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_OverlayClassName,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_PanelRef,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_SetIsClosing,
  Theme_TocCollapsible_Panel_TOCCollapsiblePanel_TriggerLabel,
  Theme_TocCollapsible_Panel_TocList_Item,
  Theme_TocCollapsible_Panel_TocList_Items,
} from '../../types/theme/TOCCollapsible/panel.d.ts';

/**
 * Theme - Toc Collapsible - Panel - Toc List.
 *
 * Recursively renders a nested unordered list of
 * table-of-contents items, linking each heading by its anchor
 * identifier and nesting child items.
 *
 * @param {Theme_TocCollapsible_Panel_TocList_Items} items - Items.
 *
 * @returns {JSX.Element | undefined}
 *
 * @since 0.21.0
 */
function TocList(items: Theme_TocCollapsible_Panel_TocList_Items) {
  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  return (
    <ul className="nova-toc-list">
      {
        items.map((item: Theme_TocCollapsible_Panel_TocList_Item) => (
          <li className="nova-toc-item" key={item['id']}>
            <a className="nova-toc-link" href={`#${item['id']}`} dangerouslySetInnerHTML={{ __html: item['value'] }} />
            {TocList(item['children'])}
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
  const isOpen: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsOpen = useSyncExternalStore(tocCollapsibleSubscribe, tocCollapsibleGetOpenSnapshot, tocCollapsibleGetOpenSnapshot);
  const payload: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload = useSyncExternalStore(tocCollapsibleSubscribe, tocCollapsibleGetPayloadSnapshot, tocCollapsibleGetPayloadSnapshot);

  const isClosingState: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosingState = useState<Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosing>(false);
  const isClosing: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosing = isClosingState[0];
  const setIsClosing: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_SetIsClosing = isClosingState[1];

  const panelRef: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_PanelRef = useRef<HTMLDivElement>(null);

  /**
   * Theme - Toc Collapsible - Panel - Toc Collapsible Panel - Handle Escape.
   *
   * Closes the table of contents overlay when the user presses
   * the Escape key, providing a standard keyboard-accessible
   * dismiss mechanism.
   *
   * @since 0.21.0
   */
  const handleEscape: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleEscapeFunction = useCallback((event: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleEscapeKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Theme - Toc Collapsible - Panel - Toc Collapsible Panel - Handle Click Outside.
   *
   * Closes the table of contents overlay when the user clicks
   * on the backdrop area outside the panel, providing an
   * intuitive dismiss.
   *
   * @since 0.21.0
   */
  const handleClickOutside: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideFunction = useCallback((event: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideMouseEvent) => {
    const mouseTarget: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideMouseTarget = event.target;

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

  // Focus close button when dialog opens.
  useEffect(() => {
    if (isOpen === true && panelRef['current'] !== null) {
      const focusTarget: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_FocusTarget = panelRef['current'].querySelector('.nova-toc-collapsible-close') as Theme_TocCollapsible_Panel_TOCCollapsiblePanel_FocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

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
          {TocList(payload['treeItems'])}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default TOCCollapsiblePanel;
