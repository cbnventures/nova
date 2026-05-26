/**
 * Lib - Use Navbar Overflow.
 *
 * Measures inline navbar items against a CSS-variable width budget so
 * variants can render the visible slice plus a trailing "More" dropdown.
 *
 * @since 0.18.0
 */

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import type {
  LibUseNavbarOverflowBudgetPixels,
  LibUseNavbarOverflowCancelled,
  LibUseNavbarOverflowChildElement,
  LibUseNavbarOverflowChildrenWidths,
  LibUseNavbarOverflowChildWidth,
  LibUseNavbarOverflowComputeReturns,
  LibUseNavbarOverflowContainerElement,
  LibUseNavbarOverflowCount,
  LibUseNavbarOverflowCumulative,
  LibUseNavbarOverflowGap,
  LibUseNavbarOverflowHasOverflow,
  LibUseNavbarOverflowInput,
  LibUseNavbarOverflowIsLast,
  LibUseNavbarOverflowItemCount,
  LibUseNavbarOverflowMaybeChildWidth,
  LibUseNavbarOverflowMeasureRef,
  LibUseNavbarOverflowMeasuring,
  LibUseNavbarOverflowMeasuringState,
  LibUseNavbarOverflowMoreReservation,
  LibUseNavbarOverflowObserver,
  LibUseNavbarOverflowParseLengthInput,
  LibUseNavbarOverflowParseLengthNumeric,
  LibUseNavbarOverflowParseLengthReturns,
  LibUseNavbarOverflowParseLengthRootFontSize,
  LibUseNavbarOverflowProposed,
  LibUseNavbarOverflowReturns,
  LibUseNavbarOverflowSetMeasuring,
  LibUseNavbarOverflowSetVisibleCount,
  LibUseNavbarOverflowTriggerPixels,
  LibUseNavbarOverflowVisibleCount,
  LibUseNavbarOverflowVisibleCountState,
} from '../types/lib/use-navbar-overflow.d.ts';

function parseLength(value: LibUseNavbarOverflowParseLengthInput): LibUseNavbarOverflowParseLengthReturns {
  const numeric: LibUseNavbarOverflowParseLengthNumeric = parseFloat(value);

  if (Number.isNaN(numeric) === true) {
    return 0;
  }

  if (value.endsWith('rem') === true) {
    const rootFontSize: LibUseNavbarOverflowParseLengthRootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    return numeric * rootFontSize;
  }

  return numeric;
}

export function useNavbarOverflow(input: LibUseNavbarOverflowInput): LibUseNavbarOverflowReturns {
  const itemCount: LibUseNavbarOverflowItemCount = input['items'].length;
  const measureRef: LibUseNavbarOverflowMeasureRef = useRef<LibUseNavbarOverflowContainerElement | null>(null);
  const visibleCountState: LibUseNavbarOverflowVisibleCountState = useState<LibUseNavbarOverflowVisibleCount>(itemCount);
  const visibleCount: LibUseNavbarOverflowVisibleCount = visibleCountState[0];
  const setVisibleCount: LibUseNavbarOverflowSetVisibleCount = visibleCountState[1];
  const measuringState: LibUseNavbarOverflowMeasuringState = useState<LibUseNavbarOverflowMeasuring>(true);
  const measuring: LibUseNavbarOverflowMeasuring = measuringState[0];
  const setMeasuring: LibUseNavbarOverflowSetMeasuring = measuringState[1];

  function compute(): LibUseNavbarOverflowComputeReturns {
    if (measureRef.current === null) {
      return undefined;
    }

    if (typeof window === 'undefined') {
      return undefined;
    }

    const container: LibUseNavbarOverflowContainerElement = measureRef.current;
    const budgetRaw: LibUseNavbarOverflowParseLengthInput = getComputedStyle(document.documentElement).getPropertyValue(input['budgetVariable']).trim();
    const triggerRaw: LibUseNavbarOverflowParseLengthInput = getComputedStyle(document.documentElement).getPropertyValue(input['triggerVariable']).trim();
    const budgetPixels: LibUseNavbarOverflowBudgetPixels = parseLength(budgetRaw);
    const triggerPixels: LibUseNavbarOverflowTriggerPixels = parseLength(triggerRaw);
    const gap: LibUseNavbarOverflowGap = parseFloat(getComputedStyle(container).gap) || 0;

    const childrenWidths: LibUseNavbarOverflowChildrenWidths = Array.from(container.children).map(
      (child: LibUseNavbarOverflowChildElement) => child.getBoundingClientRect().width,
    );

    let cumulative: LibUseNavbarOverflowCumulative = 0;
    let count: LibUseNavbarOverflowCount = 0;

    for (let i = 0; i < childrenWidths.length; i += 1) {
      const childWidth: LibUseNavbarOverflowMaybeChildWidth = childrenWidths[i];

      if (childWidth === undefined) {
        continue;
      }

      const width: LibUseNavbarOverflowChildWidth = childWidth;
      const proposed: LibUseNavbarOverflowProposed = cumulative + ((i > 0) ? gap : 0) + width;
      const isLast: LibUseNavbarOverflowIsLast = (i === childrenWidths.length - 1);
      const moreReservation: LibUseNavbarOverflowMoreReservation = (isLast === true) ? 0 : (triggerPixels + gap);

      if (proposed + moreReservation > budgetPixels) {
        break;
      }

      cumulative = proposed;
      count = i + 1;
    }

    setVisibleCount(count);

    return undefined;
  }

  useLayoutEffect(() => {
    compute();

    if (
      typeof document === 'undefined'
      || document.fonts === undefined
      || document.fonts.ready === undefined
    ) {
      setMeasuring(false);

      return undefined;
    }

    let cancelled: LibUseNavbarOverflowCancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled === true) {
        return undefined;
      }

      compute();
      setMeasuring(false);

      return undefined;
    });

    return () => {
      cancelled = true;

      return undefined;
    };
  }, [itemCount]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const observer: LibUseNavbarOverflowObserver = new ResizeObserver(() => {
      compute();

      return undefined;
    });

    if (measureRef.current !== null) {
      observer.observe(measureRef.current);
    }

    observer.observe(document.documentElement);

    return () => {
      observer.disconnect();

      return undefined;
    };
  }, [itemCount]);

  const hasOverflow: LibUseNavbarOverflowHasOverflow = (visibleCount < itemCount);

  return {
    measureRef,
    visibleCount,
    hasOverflow,
    measuring,
  };
}
