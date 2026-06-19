import { useEffect } from 'react';

import type {
  Lib_UseDetailsDismiss_DetailsRef,
  Lib_UseDetailsDismiss_Returns,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleKeyDown,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_MouseTarget,
  Lib_UseDetailsDismiss_UseDetailsDismiss_KeyboardEvent,
  Lib_UseDetailsDismiss_UseDetailsDismiss_MouseEvent,
} from '../types/lib/use-details-dismiss.d.ts';

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

    const handleKeyDown: Lib_UseDetailsDismiss_UseDetailsDismiss_HandleKeyDown = (keyboardEvent: Lib_UseDetailsDismiss_UseDetailsDismiss_KeyboardEvent) => {
      if (
        keyboardEvent.key === 'Escape'
        && detailsRef.current !== null
        && detailsRef.current.open === true
      ) {
        detailsRef.current.removeAttribute('open');
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
