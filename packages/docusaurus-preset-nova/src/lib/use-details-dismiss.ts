import { useEffect } from 'react';

import type {
  Lib_UseDetailsDismiss_DetailsRef,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleKeyDown_Function,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleKeyDown_KeyboardEvent,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_Function,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_MouseEvent,
  Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_MouseTarget,
  Lib_UseDetailsDismiss_Returns,
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
    const handleMouseDown: Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_Function = (event: Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_MouseEvent) => {
      const mouseTarget: Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_MouseTarget = event.target as Lib_UseDetailsDismiss_UseDetailsDismiss_HandleMouseDown_MouseTarget;

      if (
        detailsRef.current !== null
        && detailsRef.current.open === true
        && detailsRef.current.contains(mouseTarget) === false
      ) {
        detailsRef.current.removeAttribute('open');
      }

      return undefined;
    };

    const handleKeyDown: Lib_UseDetailsDismiss_UseDetailsDismiss_HandleKeyDown_Function = (event: Lib_UseDetailsDismiss_UseDetailsDismiss_HandleKeyDown_KeyboardEvent) => {
      if (
        event.key === 'Escape'
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
