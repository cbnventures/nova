import { useEffect } from 'react';

import type {
  Lib_UseDetailsDismiss_CloseOnEscape_ActiveElement,
  Lib_UseDetailsDismiss_CloseOnEscape_Details,
  Lib_UseDetailsDismiss_CloseOnEscape_HadFocus,
  Lib_UseDetailsDismiss_CloseOnEscape_Returns,
  Lib_UseDetailsDismiss_CloseOnEscape_Summary,
  Lib_UseDetailsDismiss_DetailsRef,
  Lib_UseDetailsDismiss_Returns,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleKeyDown,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_MouseTarget,
  Lib_UseDetailsDismiss_UseDetailsDismiss_KeyboardEvent,
  Lib_UseDetailsDismiss_UseDetailsDismiss_MouseEvent,
} from '../types/lib/use-details-dismiss.d.ts';

/**
 * Lib - Use Details Dismiss - Close On Escape.
 *
 * Closes an open `<details>` element and, when keyboard focus was inside it,
 * hands focus back to its own `<summary>` so the user stays on the trigger
 * instead of dropping to the top of the page with the hidden content.
 *
 * @param {Lib_UseDetailsDismiss_CloseOnEscape_Details}       details       - Details.
 * @param {Lib_UseDetailsDismiss_CloseOnEscape_ActiveElement} activeElement - Active element.
 *
 * @returns {Lib_UseDetailsDismiss_CloseOnEscape_Returns}
 *
 * @since 0.50.0
 */
export function closeOnEscape(details: Lib_UseDetailsDismiss_CloseOnEscape_Details, activeElement: Lib_UseDetailsDismiss_CloseOnEscape_ActiveElement): Lib_UseDetailsDismiss_CloseOnEscape_Returns {
  if (details.open !== true) {
    return undefined;
  }

  const hadFocus: Lib_UseDetailsDismiss_CloseOnEscape_HadFocus = (activeElement !== null && details.contains(activeElement) === true);

  details.removeAttribute('open');

  if (hadFocus === false) {
    return undefined;
  }

  // The element's own summary is its first child, so it is the first match.
  const summary: Lib_UseDetailsDismiss_CloseOnEscape_Summary = details.querySelector('summary');

  // Escape is a key press, so the returned focus shows the keyboard ring.
  if (summary !== null) {
    summary.focus({
      focusVisible: true,
    });
  }

  return undefined;
}

/**
 * Lib - Use Details Dismiss - Use Details Dismiss.
 *
 * Closes the supplied `<details>` element on outside-click or Escape while
 * it is open. Document-level listeners are bound on mount and cleaned up
 * on unmount, matching the dismissal pattern shared across navbar dropdowns.
 *
 * @param {Lib_UseDetailsDismiss_DetailsRef} detailsRef - Details ref.
 *
 * @returns {Lib_UseDetailsDismiss_Returns}
 *
 * @since 0.18.0
 */
export function useDetailsDismiss(detailsRef: Lib_UseDetailsDismiss_DetailsRef): Lib_UseDetailsDismiss_Returns {
  useEffect(() => {
    /**
     * Lib - Use Details Dismiss - Use Details Dismiss - Handle Mouse Down.
     *
     * Closes the details element when a mousedown lands outside its
     * bounds while the element is currently open.
     *
     * @param {Lib_UseDetailsDismiss_UseDetailsDismiss_MouseEvent} mouseEvent - Mouse event.
     *
     * @private
     *
     * @returns {undefined}
     *
     * @since 0.21.0
     */
    const handleMouseDown: Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown = (mouseEvent: Lib_UseDetailsDismiss_UseDetailsDismiss_MouseEvent) => {
      const mouseTarget: Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_MouseTarget = mouseEvent.target as Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_MouseTarget;

      if (
        detailsRef.current !== null
        && detailsRef.current.open === true
        && detailsRef.current.contains(mouseTarget) === false
      ) {
        detailsRef.current.removeAttribute('open');
      }

      return undefined;
    };

    /**
     * Lib - Use Details Dismiss - Use Details Dismiss - Handle Key Down.
     *
     * Closes the details element when the Escape key is pressed while
     * the element is currently open, returning focus to its summary when
     * focus was inside it.
     *
     * @param {Lib_UseDetailsDismiss_UseDetailsDismiss_KeyboardEvent} keyboardEvent - Keyboard event.
     *
     * @private
     *
     * @returns {undefined}
     *
     * @since 0.21.0
     */
    const handleKeyDown: Lib_UseDetailsDismiss_UseDetailsDismiss_HandleKeyDown = (keyboardEvent: Lib_UseDetailsDismiss_UseDetailsDismiss_KeyboardEvent) => {
      if (
        keyboardEvent.key === 'Escape'
        && detailsRef.current !== null
      ) {
        closeOnEscape(detailsRef.current, document.activeElement);
      }

      return undefined;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);

      return undefined;
    };
  }, [detailsRef]);

  return undefined;
}
