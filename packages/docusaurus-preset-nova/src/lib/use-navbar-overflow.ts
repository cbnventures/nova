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
  Lib_UseNavbarOverflow_BudgetPixels,
  Lib_UseNavbarOverflow_BudgetRaw,
  Lib_UseNavbarOverflow_Cancelled,
  Lib_UseNavbarOverflow_ChildrenWidths,
  Lib_UseNavbarOverflow_Container,
  Lib_UseNavbarOverflow_ContainerElement,
  Lib_UseNavbarOverflow_Count,
  Lib_UseNavbarOverflow_Cumulative,
  Lib_UseNavbarOverflow_Gap,
  Lib_UseNavbarOverflow_HasOverflow,
  Lib_UseNavbarOverflow_Input,
  Lib_UseNavbarOverflow_IsLast,
  Lib_UseNavbarOverflow_ItemCount,
  Lib_UseNavbarOverflow_MeasureRef,
  Lib_UseNavbarOverflow_Measuring,
  Lib_UseNavbarOverflow_MeasuringState,
  Lib_UseNavbarOverflow_MoreReservation,
  Lib_UseNavbarOverflow_Observer,
  Lib_UseNavbarOverflow_ParseLength_Numeric,
  Lib_UseNavbarOverflow_ParseLength_Returns,
  Lib_UseNavbarOverflow_ParseLength_RootFontSize,
  Lib_UseNavbarOverflow_ParseLength_Value,
  Lib_UseNavbarOverflow_Proposed,
  Lib_UseNavbarOverflow_Returns,
  Lib_UseNavbarOverflow_SetMeasuring,
  Lib_UseNavbarOverflow_SetVisibleCount,
  Lib_UseNavbarOverflow_TriggerPixels,
  Lib_UseNavbarOverflow_TriggerRaw,
  Lib_UseNavbarOverflow_UseNavbarOverflow_Compute_ChildWidth,
  Lib_UseNavbarOverflow_UseNavbarOverflow_Compute_Returns,
  Lib_UseNavbarOverflow_VisibleCount,
  Lib_UseNavbarOverflow_VisibleCountState,
  Lib_UseNavbarOverflow_Width,
} from '../types/lib/use-navbar-overflow.d.ts';

function parseLength(value: Lib_UseNavbarOverflow_ParseLength_Value): Lib_UseNavbarOverflow_ParseLength_Returns {
  const numeric: Lib_UseNavbarOverflow_ParseLength_Numeric = parseFloat(value);

  if (Number.isNaN(numeric) === true) {
    return 0;
  }

  if (value.endsWith('rem') === true) {
    const rootFontSize: Lib_UseNavbarOverflow_ParseLength_RootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    return numeric * rootFontSize;
  }

  return numeric;
}

export function useNavbarOverflow(input: Lib_UseNavbarOverflow_Input): Lib_UseNavbarOverflow_Returns {
  const itemCount: Lib_UseNavbarOverflow_ItemCount = input['items'].length;
  const measureRef: Lib_UseNavbarOverflow_MeasureRef = useRef<Lib_UseNavbarOverflow_ContainerElement | null>(null);
  const visibleCountState: Lib_UseNavbarOverflow_VisibleCountState = useState<Lib_UseNavbarOverflow_VisibleCount>(itemCount);
  const visibleCount: Lib_UseNavbarOverflow_VisibleCount = visibleCountState[0];
  const setVisibleCount: Lib_UseNavbarOverflow_SetVisibleCount = visibleCountState[1];
  const measuringState: Lib_UseNavbarOverflow_MeasuringState = useState<Lib_UseNavbarOverflow_Measuring>(true);
  const measuring: Lib_UseNavbarOverflow_Measuring = measuringState[0];
  const setMeasuring: Lib_UseNavbarOverflow_SetMeasuring = measuringState[1];

  function compute(): Lib_UseNavbarOverflow_UseNavbarOverflow_Compute_Returns {
    if (measureRef.current === null) {
      return undefined;
    }

    if (typeof window === 'undefined') {
      return undefined;
    }

    const container: Lib_UseNavbarOverflow_Container = measureRef.current;
    const budgetRaw: Lib_UseNavbarOverflow_BudgetRaw = getComputedStyle(document.documentElement).getPropertyValue(input['budgetVariable']).trim();
    const triggerRaw: Lib_UseNavbarOverflow_TriggerRaw = getComputedStyle(document.documentElement).getPropertyValue(input['triggerVariable']).trim();
    const budgetPixels: Lib_UseNavbarOverflow_BudgetPixels = parseLength(budgetRaw);
    const triggerPixels: Lib_UseNavbarOverflow_TriggerPixels = parseLength(triggerRaw);
    const gap: Lib_UseNavbarOverflow_Gap = parseFloat(getComputedStyle(container).gap) || 0;

    const childrenWidths: Lib_UseNavbarOverflow_ChildrenWidths = Array.from(container.children).map(
      (child) => child.getBoundingClientRect().width,
    );

    let cumulative: Lib_UseNavbarOverflow_Cumulative = 0;
    let count: Lib_UseNavbarOverflow_Count = 0;

    for (let i = 0; i < childrenWidths.length; i += 1) {
      const childWidth: Lib_UseNavbarOverflow_UseNavbarOverflow_Compute_ChildWidth = childrenWidths[i];

      if (childWidth === undefined) {
        continue;
      }

      const width: Lib_UseNavbarOverflow_Width = childWidth;
      const proposed: Lib_UseNavbarOverflow_Proposed = cumulative + ((i > 0) ? gap : 0) + width;
      const isLast: Lib_UseNavbarOverflow_IsLast = (i === childrenWidths.length - 1);
      const moreReservation: Lib_UseNavbarOverflow_MoreReservation = (isLast === true) ? 0 : (triggerPixels + gap);

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

    let cancelled: Lib_UseNavbarOverflow_Cancelled = false;

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

    const observer: Lib_UseNavbarOverflow_Observer = new ResizeObserver(() => {
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

  const hasOverflow: Lib_UseNavbarOverflow_HasOverflow = (visibleCount < itemCount);

  return {
    measureRef,
    visibleCount,
    hasOverflow,
    measuring,
  };
}
