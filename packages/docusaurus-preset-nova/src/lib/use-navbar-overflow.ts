/**
 * Lib - Use Navbar Overflow.
 *
 * Measures inline navbar items against their live rendered space so variants
 * can render the visible slice plus a trailing "More" dropdown.
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
  Lib_UseNavbarOverflow_AvailableContainer,
  Lib_UseNavbarOverflow_AvailablePixels,
  Lib_UseNavbarOverflow_AvailableRef,
  Lib_UseNavbarOverflow_Cancelled,
  Lib_UseNavbarOverflow_ChildrenWidths,
  Lib_UseNavbarOverflow_Container,
  Lib_UseNavbarOverflow_ContainerElement,
  Lib_UseNavbarOverflow_Count,
  Lib_UseNavbarOverflow_Cumulative,
  Lib_UseNavbarOverflow_Gap,
  Lib_UseNavbarOverflow_HasOverflow,
  Lib_UseNavbarOverflow_Input,
  Lib_UseNavbarOverflow_ItemCount,
  Lib_UseNavbarOverflow_MeasureRef,
  Lib_UseNavbarOverflow_Measuring,
  Lib_UseNavbarOverflow_MeasuringState,
  Lib_UseNavbarOverflow_Observer,
  Lib_UseNavbarOverflow_ParseLength_Numeric,
  Lib_UseNavbarOverflow_ParseLength_Returns,
  Lib_UseNavbarOverflow_ParseLength_RootFontSize,
  Lib_UseNavbarOverflow_ParseLength_Value,
  Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_AvailableForItems,
  Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_ChildWidth,
  Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_FullWidth,
  Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_Input,
  Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_Proposed,
  Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_Returns,
  Lib_UseNavbarOverflow_Returns,
  Lib_UseNavbarOverflow_SetMeasuring,
  Lib_UseNavbarOverflow_SetVisibleCount,
  Lib_UseNavbarOverflow_TriggerPixels,
  Lib_UseNavbarOverflow_TriggerRaw,
  Lib_UseNavbarOverflow_UseNavbarOverflow_Compute_Returns,
  Lib_UseNavbarOverflow_VisibleCount,
  Lib_UseNavbarOverflow_VisibleCountState,
} from '../types/lib/use-navbar-overflow.d.ts';

/**
 * Lib - Use Navbar Overflow - Parse Length.
 *
 * Converts a CSS length string into a pixel number, resolving rem
 * units against the document root font size and treating any
 * non-numeric input as zero.
 *
 * @param {Lib_UseNavbarOverflow_ParseLength_Value} value - Value.
 *
 * @returns {Lib_UseNavbarOverflow_ParseLength_Returns}
 *
 * @since 0.21.0
 */
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

/**
 * Lib - Use Navbar Overflow - Resolve Navbar Visible Count.
 *
 * Returns every item when the complete row fits. Only after overflow is
 * confirmed does it reserve room for the trailing More control and determine
 * how many leading items can remain visible.
 *
 * @param {Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_Input} input - Input.
 *
 * @returns {number}
 *
 * @since 0.33.0
 */
export function resolveNavbarVisibleCount(input: Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_Input): Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_Returns {
  const fullWidth: Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_FullWidth = input['childrenWidths'].reduce(
    (total, width, index) => total + width + ((index > 0) ? input['gap'] : 0),
    0,
  );

  if (fullWidth <= input['availablePixels']) {
    return input['childrenWidths'].length;
  }

  const availableForItems: Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_AvailableForItems = Math.max(
    0,
    input['availablePixels'] - input['triggerPixels'] - input['gap'],
  );

  let cumulative: Lib_UseNavbarOverflow_Cumulative = 0;
  let count: Lib_UseNavbarOverflow_Count = 0;

  for (let i = 0; i < input['childrenWidths'].length; i += 1) {
    const childWidth: Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_ChildWidth = input['childrenWidths'][i];

    if (childWidth === undefined) {
      continue;
    }

    const proposed: Lib_UseNavbarOverflow_ResolveNavbarVisibleCount_Proposed = cumulative + ((i > 0) ? input['gap'] : 0) + childWidth;

    if (proposed > availableForItems) {
      break;
    }

    cumulative = proposed;
    count = i + 1;
  }

  return count;
}

/**
 * Lib - Use Navbar Overflow - Use Navbar Overflow.
 *
 * Measures navbar items against the actual width of their rendered slot and
 * returns the count that fits alongside a measuring flag. Resize observers
 * keep the result synchronized with browser, font, brand, and action changes.
 *
 * @param {Lib_UseNavbarOverflow_Input} input - Input.
 *
 * @returns {Lib_UseNavbarOverflow_Returns}
 *
 * @since 0.21.0
 */
export function useNavbarOverflow(input: Lib_UseNavbarOverflow_Input): Lib_UseNavbarOverflow_Returns {
  const itemCount: Lib_UseNavbarOverflow_ItemCount = input['items'].length;
  const measureRef: Lib_UseNavbarOverflow_MeasureRef = useRef<Lib_UseNavbarOverflow_ContainerElement | null>(null);
  const availableRef: Lib_UseNavbarOverflow_AvailableRef = useRef<Lib_UseNavbarOverflow_ContainerElement | null>(null);
  const visibleCountState: Lib_UseNavbarOverflow_VisibleCountState = useState<Lib_UseNavbarOverflow_VisibleCount>(itemCount);
  const visibleCount: Lib_UseNavbarOverflow_VisibleCount = visibleCountState[0];
  const setVisibleCount: Lib_UseNavbarOverflow_SetVisibleCount = visibleCountState[1];
  const measuringState: Lib_UseNavbarOverflow_MeasuringState = useState<Lib_UseNavbarOverflow_Measuring>(true);
  const measuring: Lib_UseNavbarOverflow_Measuring = measuringState[0];
  const setMeasuring: Lib_UseNavbarOverflow_SetMeasuring = measuringState[1];

  /**
   * Lib - Use Navbar Overflow - Use Navbar Overflow - Compute.
   *
   * Measures each navbar child against the live available width and updates
   * the visible count and measuring state to reflect what fits.
   *
   * @private
   *
   * @returns {Lib_UseNavbarOverflow_UseNavbarOverflow_Compute_Returns}
   *
   * @since 0.21.0
   */
  function compute(): Lib_UseNavbarOverflow_UseNavbarOverflow_Compute_Returns {
    if (measureRef.current === null || availableRef.current === null) {
      return undefined;
    }

    if (typeof window === 'undefined') {
      return undefined;
    }

    const container: Lib_UseNavbarOverflow_Container = measureRef.current;
    const availableContainer: Lib_UseNavbarOverflow_AvailableContainer = availableRef.current;
    const triggerRaw: Lib_UseNavbarOverflow_TriggerRaw = getComputedStyle(document.documentElement).getPropertyValue(input['triggerVariable']).trim();
    const availablePixels: Lib_UseNavbarOverflow_AvailablePixels = availableContainer.getBoundingClientRect().width;
    const triggerPixels: Lib_UseNavbarOverflow_TriggerPixels = parseLength(triggerRaw);
    const gap: Lib_UseNavbarOverflow_Gap = parseFloat(getComputedStyle(container).gap) || 0;

    const childrenWidths: Lib_UseNavbarOverflow_ChildrenWidths = Array.from(container.children).map(
      (child) => child.getBoundingClientRect().width,
    );

    const count: Lib_UseNavbarOverflow_Count = resolveNavbarVisibleCount({
      availablePixels,
      childrenWidths,
      gap,
      triggerPixels,
    });

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

    if (availableRef.current !== null) {
      observer.observe(availableRef.current);
    }

    window.addEventListener('resize', compute);

    return () => {
      window.removeEventListener('resize', compute);

      observer.disconnect();

      return undefined;
    };
  }, [itemCount]);

  const hasOverflow: Lib_UseNavbarOverflow_HasOverflow = (visibleCount < itemCount);

  return {
    availableRef,
    measureRef,
    visibleCount,
    hasOverflow,
    measuring,
  };
}
