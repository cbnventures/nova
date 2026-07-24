import type { MouseEvent, RefObject } from 'react';

import type { Shared_TocHeading } from '../../shared.d.ts';

/**
 * Theme - Toc Collapsible - Panel - Toc Collapsible Panel.
 *
 * @since 0.21.0
 */
export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsOpen = boolean;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload_TreeItems = Shared_TocHeading[];

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload = {
  treeItems: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload_TreeItems;
} | undefined;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosingState = [boolean, Theme_TocCollapsible_Panel_TOCCollapsiblePanel_SetIsClosing];

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosing = boolean;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_SetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_PanelRef = RefObject<HTMLDivElement | null>;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleEscapeFunction = (event: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleEscapeKeyboardEvent) => void;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleEscapeKeyboardEvent = KeyboardEvent;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideFunction = (event: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideMouseEvent) => void;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideMouseEvent = MouseEvent<HTMLDivElement>;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideMouseTarget = EventTarget;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_FocusTarget = HTMLButtonElement | null;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_TriggerLabel = string;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_DialogAriaLabel = string;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_CloseAriaLabel = string;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_OverlayClassName = string;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_AnimationEvent = React.AnimationEvent<HTMLDivElement>;

/**
 * Theme - Toc Collapsible - Panel - Toc Collapsible Panel (TOCCollapsiblePanel).
 *
 * @since 0.21.0
 */
export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Returns = React.JSX.Element | null;

/**
 * Theme - Toc Collapsible - Panel - Toc List.
 *
 * @since 0.21.0
 */
export type Theme_TocCollapsible_Panel_TocList_Item = Shared_TocHeading;

export type Theme_TocCollapsible_Panel_TocList_Items = Theme_TocCollapsible_Panel_TocList_Item[];

/**
 * Theme - Toc Collapsible - Panel - Toc List (TocList).
 *
 * @since 0.21.0
 */
export type Theme_TocCollapsible_Panel_TocList_Returns = React.JSX.Element | undefined;
