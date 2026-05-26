import type {
  Dispatch,
  RefObject,
  SetStateAction,
} from 'react';

/**
 * Lib - Use Navbar Overflow.
 *
 * @since 0.18.0
 */
export type LibUseNavbarOverflowParseLengthInput = string;

export type LibUseNavbarOverflowParseLengthReturns = number;

export type LibUseNavbarOverflowParseLengthNumeric = number;

export type LibUseNavbarOverflowParseLengthRootFontSize = number;

export type LibUseNavbarOverflowInputItem = unknown;

export type LibUseNavbarOverflowInputItems = readonly LibUseNavbarOverflowInputItem[];

export type LibUseNavbarOverflowInputBudgetVariable = string;

export type LibUseNavbarOverflowInputTriggerVariable = string;

export type LibUseNavbarOverflowInput = {
  items: LibUseNavbarOverflowInputItems;
  budgetVariable: LibUseNavbarOverflowInputBudgetVariable;
  triggerVariable: LibUseNavbarOverflowInputTriggerVariable;
};

export type LibUseNavbarOverflowReturnsMeasureRef = RefObject<HTMLDivElement | null>;

export type LibUseNavbarOverflowReturnsVisibleCount = number;

export type LibUseNavbarOverflowReturnsHasOverflow = boolean;

export type LibUseNavbarOverflowReturnsMeasuring = boolean;

export type LibUseNavbarOverflowReturns = {
  measureRef: LibUseNavbarOverflowReturnsMeasureRef;
  visibleCount: LibUseNavbarOverflowReturnsVisibleCount;
  hasOverflow: LibUseNavbarOverflowReturnsHasOverflow;
  measuring: LibUseNavbarOverflowReturnsMeasuring;
};

export type LibUseNavbarOverflowItemCount = number;

export type LibUseNavbarOverflowContainerElement = HTMLDivElement;

export type LibUseNavbarOverflowMeasureRef = RefObject<LibUseNavbarOverflowContainerElement | null>;

export type LibUseNavbarOverflowVisibleCountState = [LibUseNavbarOverflowVisibleCount, LibUseNavbarOverflowSetVisibleCount];

export type LibUseNavbarOverflowVisibleCount = number;

export type LibUseNavbarOverflowSetVisibleCount = Dispatch<SetStateAction<LibUseNavbarOverflowVisibleCount>>;

export type LibUseNavbarOverflowMeasuringState = [LibUseNavbarOverflowMeasuring, LibUseNavbarOverflowSetMeasuring];

export type LibUseNavbarOverflowMeasuring = boolean;

export type LibUseNavbarOverflowSetMeasuring = Dispatch<SetStateAction<LibUseNavbarOverflowMeasuring>>;

export type LibUseNavbarOverflowComputeReturns = undefined;

export type LibUseNavbarOverflowBudgetPixels = number;

export type LibUseNavbarOverflowTriggerPixels = number;

export type LibUseNavbarOverflowGap = number;

export type LibUseNavbarOverflowChildrenWidths = LibUseNavbarOverflowChildWidth[];

export type LibUseNavbarOverflowChildElement = Element;

export type LibUseNavbarOverflowCumulative = number;

export type LibUseNavbarOverflowCount = number;

export type LibUseNavbarOverflowMaybeChildWidth = LibUseNavbarOverflowChildWidth | undefined;

export type LibUseNavbarOverflowChildWidth = number;

export type LibUseNavbarOverflowProposed = number;

export type LibUseNavbarOverflowIsLast = boolean;

export type LibUseNavbarOverflowMoreReservation = number;

export type LibUseNavbarOverflowCancelled = boolean;

export type LibUseNavbarOverflowObserver = ResizeObserver;

export type LibUseNavbarOverflowHasOverflow = boolean;
