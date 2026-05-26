import { useEffect } from 'react';

import type {
  LibUseDetailsDismissDetailsRef,
  LibUseDetailsDismissHandleKeyDownFunction,
  LibUseDetailsDismissHandleKeyDownKeyboardEvent,
  LibUseDetailsDismissHandleMouseDownFunction,
  LibUseDetailsDismissHandleMouseDownMouseEvent,
  LibUseDetailsDismissHandleMouseDownMouseTarget,
  LibUseDetailsDismissReturns,
} from '../types/lib/use-details-dismiss.d.ts';

/**
 * Lib - Use Details Dismiss - Use Details Dismiss.
 *
 * Closes the supplied `<details>` element on outside-click or Escape while
 * it is open. Document-level listeners are bound on mount and cleaned up
 * on unmount, matching the dismissal pattern shared across navbar dropdowns.
 *
 * @param {LibUseDetailsDismissDetailsRef} detailsRef - Details ref.
 *
 * @returns {LibUseDetailsDismissReturns}
 *
 * @since 0.18.0
 */
export function useDetailsDismiss(detailsRef: LibUseDetailsDismissDetailsRef): LibUseDetailsDismissReturns {
  useEffect(() => {
    const handleMouseDown: LibUseDetailsDismissHandleMouseDownFunction = (event: LibUseDetailsDismissHandleMouseDownMouseEvent) => {
      const mouseTarget: LibUseDetailsDismissHandleMouseDownMouseTarget = event.target as LibUseDetailsDismissHandleMouseDownMouseTarget;

      if (
        detailsRef.current !== null
        && detailsRef.current.open === true
        && detailsRef.current.contains(mouseTarget) === false
      ) {
        detailsRef.current.removeAttribute('open');
      }

      return undefined;
    };

    const handleKeyDown: LibUseDetailsDismissHandleKeyDownFunction = (event: LibUseDetailsDismissHandleKeyDownKeyboardEvent) => {
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
