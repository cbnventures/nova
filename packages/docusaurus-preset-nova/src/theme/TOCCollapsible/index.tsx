import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { filterToc, treeifyToc } from '../../lib/toc.js';

import type {
  Theme_TocCollapsible_Index_TocCollapsibleAnimationEvent,
  Theme_TocCollapsible_Index_TocCollapsibleCloseAriaLabel,
  Theme_TocCollapsible_Index_TocCollapsibleDialogAriaLabel,
  Theme_TocCollapsible_Index_TocCollapsibleFocusTarget,
  Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideFunction,
  Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideMouseEvent,
  Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideMouseTarget,
  Theme_TocCollapsible_Index_TocCollapsibleHandleEscapeFunction,
  Theme_TocCollapsible_Index_TocCollapsibleHandleEscapeKeyboardEvent,
  Theme_TocCollapsible_Index_TocCollapsibleIsClosing,
  Theme_TocCollapsible_Index_TocCollapsibleIsClosingState,
  Theme_TocCollapsible_Index_TocCollapsibleIsOpen,
  Theme_TocCollapsible_Index_TocCollapsibleIsOpenState,
  Theme_TocCollapsible_Index_TocCollapsibleItems,
  Theme_TocCollapsible_Index_TocCollapsibleMaxHeadingLevel,
  Theme_TocCollapsible_Index_TocCollapsibleMinHeadingLevel,
  Theme_TocCollapsible_Index_TocCollapsibleOpenAriaLabel,
  Theme_TocCollapsible_Index_TocCollapsibleOverlayClassName,
  Theme_TocCollapsible_Index_TocCollapsiblePanelRef,
  Theme_TocCollapsible_Index_TocCollapsiblePathname,
  Theme_TocCollapsible_Index_TocCollapsibleProps,
  Theme_TocCollapsible_Index_TocCollapsibleSetIsClosing,
  Theme_TocCollapsible_Index_TocCollapsibleSetIsOpen,
  Theme_TocCollapsible_Index_TocCollapsibleTreeItems,
  Theme_TocCollapsible_Index_TocCollapsibleTriggerLabel,
  Theme_TocCollapsible_Index_TocListItem,
  Theme_TocCollapsible_Index_TocListItems,
  Theme_TocCollapsible_Index_TocListOnLinkClick,
} from '../../types/theme/TOCCollapsible/index.d.ts';

/**
 * Theme - Toc Collapsible - Toc List.
 *
 * Recursively renders a nested unordered list of
 * table-of-contents items, linking each heading by its anchor
 * identifier and nesting child items.
 *
 * @param {Theme_TocCollapsible_Index_TocListItems}       items       - Items.
 * @param {Theme_TocCollapsible_Index_TocListOnLinkClick} onLinkClick - On link click.
 *
 * @returns {JSX.Element | undefined}
 *
 * @since 0.15.0
 */
function TocList(items: Theme_TocCollapsible_Index_TocListItems, onLinkClick: Theme_TocCollapsible_Index_TocListOnLinkClick) {
  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  return (
    <ul className="nova-toc-list">
      {
        items.map((item: Theme_TocCollapsible_Index_TocListItem) => (
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
 * Theme - Toc Collapsible - Toc Collapsible.
 *
 * Renders a trigger button that opens a floating
 * overlay panel containing the table of contents, with keyboard
 * and click-outside dismissal.
 *
 * @param {Theme_TocCollapsible_Index_TocCollapsibleProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TOCCollapsible(props: Theme_TocCollapsible_Index_TocCollapsibleProps) {
  const items: Theme_TocCollapsible_Index_TocCollapsibleItems = props['toc'];
  const minHeadingLevel: Theme_TocCollapsible_Index_TocCollapsibleMinHeadingLevel = (props['minHeadingLevel'] !== undefined) ? props['minHeadingLevel'] : 2;
  const maxHeadingLevel: Theme_TocCollapsible_Index_TocCollapsibleMaxHeadingLevel = (props['maxHeadingLevel'] !== undefined) ? props['maxHeadingLevel'] : 3;
  const pathname: Theme_TocCollapsible_Index_TocCollapsiblePathname = useLocation()['pathname'];

  const isOpenState: Theme_TocCollapsible_Index_TocCollapsibleIsOpenState = useState<Theme_TocCollapsible_Index_TocCollapsibleIsOpen>(false);
  const isOpen: Theme_TocCollapsible_Index_TocCollapsibleIsOpen = isOpenState[0];
  const setIsOpen: Theme_TocCollapsible_Index_TocCollapsibleSetIsOpen = isOpenState[1];

  const isClosingState: Theme_TocCollapsible_Index_TocCollapsibleIsClosingState = useState<Theme_TocCollapsible_Index_TocCollapsibleIsClosing>(false);
  const isClosing: Theme_TocCollapsible_Index_TocCollapsibleIsClosing = isClosingState[0];
  const setIsClosing: Theme_TocCollapsible_Index_TocCollapsibleSetIsClosing = isClosingState[1];

  const panelRef: Theme_TocCollapsible_Index_TocCollapsiblePanelRef = useRef<HTMLDivElement>(null);
  const openAriaLabel: Theme_TocCollapsible_Index_TocCollapsibleOpenAriaLabel = translate({
    id: 'theme.TOCCollapsible.openAriaLabel',
    message: 'Open table of contents',
    description: 'The ARIA label for the button that opens the table of contents overlay',
  });
  const triggerLabel: Theme_TocCollapsible_Index_TocCollapsibleTriggerLabel = translate({
    id: 'theme.TOCCollapsible.toggleButtonLabel',
    message: 'Table of Contents',
    description: 'The label for the table of contents trigger button and header title',
  });
  const dialogAriaLabel: Theme_TocCollapsible_Index_TocCollapsibleDialogAriaLabel = translate({
    id: 'theme.TOCCollapsible.dialogAriaLabel',
    message: 'Table of contents',
    description: 'The ARIA label for the table of contents dialog panel',
  });
  const closeAriaLabel: Theme_TocCollapsible_Index_TocCollapsibleCloseAriaLabel = translate({
    id: 'theme.TOCCollapsible.closeAriaLabel',
    message: 'Close table of contents',
    description: 'The ARIA label for the button that closes the table of contents overlay',
  });

  /**
   * Theme - Toc Collapsible - Toc Collapsible - Handle Escape.
   *
   * Closes the table of contents overlay when the user presses
   * the Escape key, providing a standard keyboard-accessible
   * dismiss mechanism.
   *
   * @since 0.15.0
   */
  const handleEscape: Theme_TocCollapsible_Index_TocCollapsibleHandleEscapeFunction = useCallback((event: Theme_TocCollapsible_Index_TocCollapsibleHandleEscapeKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Theme - Toc Collapsible - Toc Collapsible - Handle Click Outside.
   *
   * Closes the table of contents overlay when the user clicks
   * on the backdrop area outside the panel, providing an
   * intuitive dismiss.
   *
   * @since 0.15.0
   */
  const handleClickOutside: Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideFunction = useCallback((event: Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideMouseEvent) => {
    const mouseTarget: Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideMouseTarget = event.target;

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
      const focusTarget: Theme_TocCollapsible_Index_TocCollapsibleFocusTarget = panelRef['current'].querySelector('.nova-toc-collapsible-close') as Theme_TocCollapsible_Index_TocCollapsibleFocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  const treeItems: Theme_TocCollapsible_Index_TocCollapsibleTreeItems = filterToc(treeifyToc(items), minHeadingLevel, maxHeadingLevel);

  if (treeItems['length'] === 0) {
    return undefined;
  }

  return (
    <>
      <button
        className={(props['className'] !== undefined) ? `nova-toc-collapsible-trigger ${props['className']}` : 'nova-toc-collapsible-trigger'}
        style={props['style']}
        type="button"
        onClick={() => {
          setIsOpen(true);

          return undefined;
        }}
        aria-label={openAriaLabel}
      >
        <Icon icon="lucide:list" width="14" height="14" aria-hidden="true" />
        <span className="nova-toc-collapsible-trigger-label">{triggerLabel}</span>
        <Icon icon="lucide:chevron-down" width="14" height="14" aria-hidden="true" />
      </button>

      {(isOpen === true) && (() => {
        let overlayClassName: Theme_TocCollapsible_Index_TocCollapsibleOverlayClassName = 'nova-toc-collapsible-overlay nova-toc-collapsible-open';

        if (isClosing === true) {
          overlayClassName = 'nova-toc-collapsible-overlay nova-toc-collapsible-closing';
        }

        return createPortal(
          <div
            className={overlayClassName}
            onClick={handleClickOutside}
            role="presentation"
            onAnimationEnd={(_event: Theme_TocCollapsible_Index_TocCollapsibleAnimationEvent) => {
              if (isClosing === true) {
                setIsOpen(false);
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
                {TocList(treeItems, () => {
                  setIsClosing(true);

                  return undefined;
                })}
              </div>
            </div>
          </div>,
          document.body,
        );
      })()}
    </>
  );
}

export default TOCCollapsible;
