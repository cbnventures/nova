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
export type Lib_UseNavbarOverflow_ParseLength_Input = string;

export type Lib_UseNavbarOverflow_ParseLength_Returns = number;

export type Lib_UseNavbarOverflow_ParseLength_Numeric = number;

export type Lib_UseNavbarOverflow_ParseLength_RootFontSize = number;

export type Lib_UseNavbarOverflow_InputItem = unknown;

export type Lib_UseNavbarOverflow_Input_Items = readonly Lib_UseNavbarOverflow_InputItem[];

export type Lib_UseNavbarOverflow_Input_BudgetVariable = string;

export type Lib_UseNavbarOverflow_Input_TriggerVariable = string;

export type Lib_UseNavbarOverflow_Input = {
  items: Lib_UseNavbarOverflow_Input_Items;
  budgetVariable: Lib_UseNavbarOverflow_Input_BudgetVariable;
  triggerVariable: Lib_UseNavbarOverflow_Input_TriggerVariable;
};

export type Lib_UseNavbarOverflow_Returns_MeasureRef = RefObject<HTMLDivElement | null>;

export type Lib_UseNavbarOverflow_Returns_VisibleCount = number;

export type Lib_UseNavbarOverflow_Returns_HasOverflow = boolean;

export type Lib_UseNavbarOverflow_Returns_Measuring = boolean;

export type Lib_UseNavbarOverflow_Returns = {
  measureRef: Lib_UseNavbarOverflow_Returns_MeasureRef;
  visibleCount: Lib_UseNavbarOverflow_Returns_VisibleCount;
  hasOverflow: Lib_UseNavbarOverflow_Returns_HasOverflow;
  measuring: Lib_UseNavbarOverflow_Returns_Measuring;
};

export type Lib_UseNavbarOverflow_ItemCount = number;

export type Lib_UseNavbarOverflow_ContainerElement = HTMLDivElement;

export type Lib_UseNavbarOverflow_MeasureRef = RefObject<Lib_UseNavbarOverflow_ContainerElement | null>;

export type Lib_UseNavbarOverflow_VisibleCountState = [Lib_UseNavbarOverflow_VisibleCount, Lib_UseNavbarOverflow_SetVisibleCount];

export type Lib_UseNavbarOverflow_VisibleCount = number;

export type Lib_UseNavbarOverflow_SetVisibleCount = Dispatch<SetStateAction<Lib_UseNavbarOverflow_VisibleCount>>;

export type Lib_UseNavbarOverflow_MeasuringState = [Lib_UseNavbarOverflow_Measuring, Lib_UseNavbarOverflow_SetMeasuring];

export type Lib_UseNavbarOverflow_Measuring = boolean;

export type Lib_UseNavbarOverflow_SetMeasuring = Dispatch<SetStateAction<Lib_UseNavbarOverflow_Measuring>>;

export type Lib_UseNavbarOverflow_UseNavbarOverflow_Compute_Returns = undefined;

export type Lib_UseNavbarOverflow_BudgetPixels = number;

export type Lib_UseNavbarOverflow_TriggerPixels = number;

export type Lib_UseNavbarOverflow_Gap = number;

export type Lib_UseNavbarOverflow_ChildrenWidths = Lib_UseNavbarOverflow_ChildWidth[];

export type Lib_UseNavbarOverflow_ChildElement = Element;

export type Lib_UseNavbarOverflow_Cumulative = number;

export type Lib_UseNavbarOverflow_Count = number;

export type Lib_UseNavbarOverflow_MaybeChildWidth = Lib_UseNavbarOverflow_ChildWidth | undefined;

export type Lib_UseNavbarOverflow_ChildWidth = number;

export type Lib_UseNavbarOverflow_Proposed = number;

export type Lib_UseNavbarOverflow_IsLast = boolean;

export type Lib_UseNavbarOverflow_MoreReservation = number;

export type Lib_UseNavbarOverflow_Cancelled = boolean;

export type Lib_UseNavbarOverflow_Observer = ResizeObserver;

export type Lib_UseNavbarOverflow_HasOverflow = boolean;
