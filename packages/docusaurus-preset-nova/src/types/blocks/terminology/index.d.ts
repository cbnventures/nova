import type {
  CSSProperties,
  Dispatch,
  MouseEvent,
  PointerEvent,
  ReactNode,
  ReactPortal,
  RefObject,
  SetStateAction,
} from 'react';

import type { Shared_TerminologyTooltipPosition } from '../../shared.d.ts';

/**
 * Blocks - Terminology.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_TerminologyShowDelay = number;

export type Blocks_Terminology_Index_TerminologyHideDelay = number;

export type Blocks_Terminology_Index_TerminologyTooltipGap = number;

/**
 * Blocks - Terminology - Blocks Terminology.
 *
 * @since 0.15.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_Props_Children = ReactNode;

export type Blocks_Terminology_Index_BlocksTerminology_Props_Color = boolean | undefined;

export type Blocks_Terminology_Index_BlocksTerminology_Props_Title = string;

export type Blocks_Terminology_Index_BlocksTerminology_Props_To = string | undefined;

export type Blocks_Terminology_Index_BlocksTerminology_Props_ClassName = string | undefined;

export type Blocks_Terminology_Index_BlocksTerminology_Props_Style = CSSProperties | undefined;

export type Blocks_Terminology_Index_BlocksTerminology_Props = {
  children: Blocks_Terminology_Index_BlocksTerminology_Props_Children;
  color?: Blocks_Terminology_Index_BlocksTerminology_Props_Color;
  title: Blocks_Terminology_Index_BlocksTerminology_Props_Title;
  to?: Blocks_Terminology_Index_BlocksTerminology_Props_To;
  className?: Blocks_Terminology_Index_BlocksTerminology_Props_ClassName;
  style?: Blocks_Terminology_Index_BlocksTerminology_Props_Style;
};

export type Blocks_Terminology_Index_BlocksTerminology_ClassName = string;

export type Blocks_Terminology_Index_BlocksTerminology_TooltipId = string;

export type Blocks_Terminology_Index_BlocksTerminology_DescriptionId = string;

export type Blocks_Terminology_Index_BlocksTerminology_TermRef = RefObject<HTMLElement | null>;

export type Blocks_Terminology_Index_BlocksTerminology_TooltipRef = RefObject<HTMLSpanElement | null>;

export type Blocks_Terminology_Index_BlocksTerminology_ShowTimerRef = RefObject<ReturnType<typeof setTimeout> | undefined>;

export type Blocks_Terminology_Index_BlocksTerminology_HideTimerRef = RefObject<ReturnType<typeof setTimeout> | undefined>;

export type Blocks_Terminology_Index_BlocksTerminology_PointerTypeRef = RefObject<string>;

export type Blocks_Terminology_Index_BlocksTerminology_IsOpenState = [Blocks_Terminology_Index_BlocksTerminology_IsOpen, Blocks_Terminology_Index_BlocksTerminology_SetIsOpen];

export type Blocks_Terminology_Index_BlocksTerminology_IsOpen = boolean;

export type Blocks_Terminology_Index_BlocksTerminology_SetIsOpen = Dispatch<SetStateAction<Blocks_Terminology_Index_BlocksTerminology_IsOpen>>;

export type Blocks_Terminology_Index_BlocksTerminology_PositionState = [Blocks_Terminology_Index_BlocksTerminology_Position, Blocks_Terminology_Index_BlocksTerminology_SetPosition];

export type Blocks_Terminology_Index_BlocksTerminology_Position = Shared_TerminologyTooltipPosition | undefined;

export type Blocks_Terminology_Index_BlocksTerminology_SetPosition = Dispatch<SetStateAction<Blocks_Terminology_Index_BlocksTerminology_Position>>;

export type Blocks_Terminology_Index_BlocksTerminology_FrameId = number;

export type Blocks_Terminology_Index_BlocksTerminology_DescribedBy = string;

export type Blocks_Terminology_Index_BlocksTerminology_TooltipStyle = CSSProperties & Record<`--${string}`, string>;

export type Blocks_Terminology_Index_BlocksTerminology_TooltipContainer = Element | null;

export type Blocks_Terminology_Index_BlocksTerminology_Tooltip = ReactPortal | null;

export type Blocks_Terminology_Index_BlocksTerminology_TermElement = HTMLElement | null;

export type Blocks_Terminology_Index_BlocksTerminology_Element = ReactNode;

/**
 * Blocks - Terminology - Blocks Terminology - Clear Timers.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_ClearTimers_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Handle Blur.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_HandleBlur_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Handle Click.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_HandleClick_Event = MouseEvent<HTMLElement>;

export type Blocks_Terminology_Index_BlocksTerminology_HandleClick_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Handle Escape.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_HandleEscape_Event = KeyboardEvent;

export type Blocks_Terminology_Index_BlocksTerminology_HandleEscape_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Handle Focus.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_HandleFocus_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Handle Key Down.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_HandleKeyDown_Event = React.KeyboardEvent<HTMLElement>;

export type Blocks_Terminology_Index_BlocksTerminology_HandleKeyDown_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Handle Outside Pointer.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Event = globalThis.PointerEvent;

export type Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Returns = undefined;

export type Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Target = EventTarget | null;

export type Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_InsideTerm = boolean;

export type Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_InsideTooltip = boolean;

/**
 * Blocks - Terminology - Blocks Terminology - Handle Pointer Down.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_HandlePointerDown_Event = PointerEvent<HTMLElement>;

export type Blocks_Terminology_Index_BlocksTerminology_HandlePointerDown_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Handle Pointer Enter.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_HandlePointerEnter_Event = PointerEvent<HTMLElement>;

export type Blocks_Terminology_Index_BlocksTerminology_HandlePointerEnter_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Handle Pointer Leave.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_HandlePointerLeave_Event = PointerEvent<HTMLElement>;

export type Blocks_Terminology_Index_BlocksTerminology_HandlePointerLeave_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Schedule Hide.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_ScheduleHide_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Schedule Show.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_ScheduleShow_Delay = number;

export type Blocks_Terminology_Index_BlocksTerminology_ScheduleShow_Returns = undefined;

/**
 * Blocks - Terminology - Blocks Terminology - Update Position.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_Returns = undefined;

export type Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_Anchor = HTMLElement | null;

export type Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_TooltipElement = HTMLSpanElement | null;

export type Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_AnchorRect = DOMRect;
