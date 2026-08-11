import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import type {
  Lib_UseOverlayPanel_FocusSelector,
  Lib_UseOverlayPanel_IsOpen,
  Lib_UseOverlayPanel_Returns,
  Lib_UseOverlayPanel_UseOverlayPanel_FocusTarget,
  Lib_UseOverlayPanel_UseOverlayPanel_HandleClickOutside,
  Lib_UseOverlayPanel_UseOverlayPanel_HandleEscape,
  Lib_UseOverlayPanel_UseOverlayPanel_IsClosing,
  Lib_UseOverlayPanel_UseOverlayPanel_IsClosingState,
  Lib_UseOverlayPanel_UseOverlayPanel_MouseTarget,
  Lib_UseOverlayPanel_UseOverlayPanel_PanelRef,
  Lib_UseOverlayPanel_UseOverlayPanel_SetIsClosing,
} from '../types/lib/use-overlay-panel.d.ts';

/**
 * Lib - Use Overlay Panel - Use Overlay Panel.
 *
 * Manages shared overlay panel behavior including close-on-escape,
 * close-on-backdrop-click, keyboard listener lifecycle, and
 * focus-on-open targeting.
 *
 * @param {Lib_UseOverlayPanel_IsOpen}        isOpen        - Is open.
 * @param {Lib_UseOverlayPanel_FocusSelector} focusSelector - Focus selector.
 *
 * @returns {Lib_UseOverlayPanel_Returns}
 *
 * @since 0.23.0
 */
export function useOverlayPanel(isOpen: Lib_UseOverlayPanel_IsOpen, focusSelector: Lib_UseOverlayPanel_FocusSelector): Lib_UseOverlayPanel_Returns {
  const isClosingState: Lib_UseOverlayPanel_UseOverlayPanel_IsClosingState = useState<Lib_UseOverlayPanel_UseOverlayPanel_IsClosing>(false);
  const isClosing: Lib_UseOverlayPanel_UseOverlayPanel_IsClosing = isClosingState[0];
  const setIsClosing: Lib_UseOverlayPanel_UseOverlayPanel_SetIsClosing = isClosingState[1];

  const panelRef: Lib_UseOverlayPanel_UseOverlayPanel_PanelRef = useRef<HTMLDivElement>(null);

  /**
   * Lib - Use Overlay Panel - Use Overlay Panel - Handle Escape.
   *
   * Closes the overlay panel when the user presses the Escape
   * key, providing a standard keyboard-accessible dismiss mechanism.
   *
   * @since 0.23.0
   */
  const handleEscape: Lib_UseOverlayPanel_UseOverlayPanel_HandleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsClosing(true);
    }

    return undefined;
  }, []);

  /**
   * Lib - Use Overlay Panel - Use Overlay Panel - Handle Click Outside.
   *
   * Closes the overlay panel when the user clicks on the backdrop
   * area outside the panel, providing an intuitive dismiss.
   *
   * @since 0.23.0
   */
  const handleClickOutside: Lib_UseOverlayPanel_UseOverlayPanel_HandleClickOutside = useCallback((event) => {
    const mouseTarget: Lib_UseOverlayPanel_UseOverlayPanel_MouseTarget = event.target;

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
      const focusTarget: Lib_UseOverlayPanel_UseOverlayPanel_FocusTarget = panelRef['current'].querySelector(focusSelector) as Lib_UseOverlayPanel_UseOverlayPanel_FocusTarget;

      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }

    return undefined;
  }, [
    isOpen,
    focusSelector,
  ]);

  return {
    isClosing,
    setIsClosing,
    handleClickOutside,
    panelRef,
  };
}
