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

import type {
  ThemeTocCollapsibleTocCollapsibleAnimationEvent,
  ThemeTocCollapsibleTocCollapsibleCloseAriaLabel,
  ThemeTocCollapsibleTocCollapsibleDialogAriaLabel,
  ThemeTocCollapsibleTocCollapsibleFocusTarget,
  ThemeTocCollapsibleTocCollapsibleHandleClickOutsideFunction,
  ThemeTocCollapsibleTocCollapsibleHandleClickOutsideMouseEvent,
  ThemeTocCollapsibleTocCollapsibleHandleClickOutsideMouseTarget,
  ThemeTocCollapsibleTocCollapsibleHandleEscapeFunction,
  ThemeTocCollapsibleTocCollapsibleHandleEscapeKeyboardEvent,
  ThemeTocCollapsibleTocCollapsibleIsClosing,
  ThemeTocCollapsibleTocCollapsibleIsClosingState,
  ThemeTocCollapsibleTocCollapsibleIsOpen,
  ThemeTocCollapsibleTocCollapsibleIsOpenState,
  ThemeTocCollapsibleTocCollapsibleItems,
  ThemeTocCollapsibleTocCollapsibleOpenAriaLabel,
  ThemeTocCollapsibleTocCollapsibleOverlayClassName,
  ThemeTocCollapsibleTocCollapsiblePanelRef,
  ThemeTocCollapsibleTocCollapsiblePathname,
  ThemeTocCollapsibleTocCollapsibleProps,
  ThemeTocCollapsibleTocCollapsibleSetIsClosing,
  ThemeTocCollapsibleTocCollapsibleSetIsOpen,
  ThemeTocCollapsibleTocCollapsibleTriggerLabel,
  ThemeTocCollapsibleTocListItem,
  ThemeTocCollapsibleTocListItems,
  ThemeTocCollapsibleTocListOnLinkClick,
} from '../../types/theme/TOCCollapsible/index.d.ts';

/**
 * Theme - Toc Collapsible - Toc List.
 *
 * Recursively renders a nested unordered list of
 * table-of-contents items, linking each heading by its anchor
 * identifier and nesting child items.
 *
 * @param {ThemeTocCollapsibleTocListItems}       items       - Items.
 * @param {ThemeTocCollapsibleTocListOnLinkClick} onLinkClick - On link click.
 *
 * @returns {JSX.Element | undefined}
 *
 * @since 0.15.0
 */
function TocList(items: ThemeTocCollapsibleTocListItems, onLinkClick: ThemeTocCollapsibleTocListOnLinkClick) {
  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  return (
    <ul className="nova-toc-list">
      {
        items.map((item: ThemeTocCollapsibleTocListItem) => (
          <li className="nova-toc-item" key={item['id']}>
            <a className="nova-toc-link" href={`#${item['id']}`} onClick={onLinkClick}>
              {item['value']}
            </a>
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
 * @param {ThemeTocCollapsibleTocCollapsibleProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TOCCollapsible(props: ThemeTocCollapsibleTocCollapsibleProps) {
  const items: ThemeTocCollapsibleTocCollapsibleItems = props['toc'];
  const pathname: ThemeTocCollapsibleTocCollapsiblePathname = useLocation()['pathname'];

  const isOpenState: ThemeTocCollapsibleTocCollapsibleIsOpenState = useState<ThemeTocCollapsibleTocCollapsibleIsOpen>(false);
  const isOpen: ThemeTocCollapsibleTocCollapsibleIsOpen = isOpenState[0];
  const setIsOpen: ThemeTocCollapsibleTocCollapsibleSetIsOpen = isOpenState[1];

  const isClosingState: ThemeTocCollapsibleTocCollapsibleIsClosingState = useState<ThemeTocCollapsibleTocCollapsibleIsClosing>(false);
  const isClosing: ThemeTocCollapsibleTocCollapsibleIsClosing = isClosingState[0];
  const setIsClosing: ThemeTocCollapsibleTocCollapsibleSetIsClosing = isClosingState[1];

  const panelRef: ThemeTocCollapsibleTocCollapsiblePanelRef = useRef<HTMLDivElement>(null);
  const openAriaLabel: ThemeTocCollapsibleTocCollapsibleOpenAriaLabel = translate({
    id: 'theme.TOCCollapsible.openAriaLabel',
    message: 'Open table of contents',
    description: 'The ARIA label for the button that opens the table of contents overlay',
  });
  const triggerLabel: ThemeTocCollapsibleTocCollapsibleTriggerLabel = translate({
    id: 'theme.TOCCollapsible.toggleButtonLabel',
    message: 'Table of Contents',
    description: 'The label for the table of contents trigger button and header title',
  });
  const dialogAriaLabel: ThemeTocCollapsibleTocCollapsibleDialogAriaLabel = translate({
    id: 'theme.TOCCollapsible.dialogAriaLabel',
    message: 'Table of contents',
    description: 'The ARIA label for the table of contents dialog panel',
  });
  const closeAriaLabel: ThemeTocCollapsibleTocCollapsibleCloseAriaLabel = translate({
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
  const handleEscape: ThemeTocCollapsibleTocCollapsibleHandleEscapeFunction = useCallback((event: ThemeTocCollapsibleTocCollapsibleHandleEscapeKeyboardEvent) => {
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
  const handleClickOutside: ThemeTocCollapsibleTocCollapsibleHandleClickOutsideFunction = useCallback((event: ThemeTocCollapsibleTocCollapsibleHandleClickOutsideMouseEvent) => {
    const mouseTarget: ThemeTocCollapsibleTocCollapsibleHandleClickOutsideMouseTarget = event.target;

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
      const focusTarget: ThemeTocCollapsibleTocCollapsibleFocusTarget = panelRef['current'].querySelector('.nova-toc-collapsible-close') as ThemeTocCollapsibleTocCollapsibleFocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [isOpen]);

  if (items === undefined || items['length'] === 0) {
    return undefined;
  }

  return (
    <>
      <button
        className="nova-toc-collapsible-trigger"
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
        let overlayClassName: ThemeTocCollapsibleTocCollapsibleOverlayClassName = 'nova-toc-collapsible-overlay nova-toc-collapsible-open';

        if (isClosing === true) {
          overlayClassName = 'nova-toc-collapsible-overlay nova-toc-collapsible-closing';
        }

        return createPortal(
          <div
            className={overlayClassName}
            onClick={handleClickOutside}
            role="presentation"
            onAnimationEnd={(_event: ThemeTocCollapsibleTocCollapsibleAnimationEvent) => {
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
                {TocList(items, () => {
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
