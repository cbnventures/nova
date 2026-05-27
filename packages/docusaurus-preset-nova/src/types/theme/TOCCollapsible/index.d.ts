import type { CSSProperties, MouseEvent, RefObject } from 'react';

/**
 * Theme - Toc Collapsible - Toc Collapsible.
 *
 * @since 0.15.0
 */
export type Theme_TocCollapsible_Index_TocCollapsibleProps_Toc = Theme_TocCollapsible_Index_TocListItem[];

export type Theme_TocCollapsible_Index_TocCollapsibleProps_ClassName = string | undefined;

export type Theme_TocCollapsible_Index_TocCollapsibleProps_Style = CSSProperties | undefined;

export type Theme_TocCollapsible_Index_TocCollapsibleProps_MinHeadingLevel = number | undefined;

export type Theme_TocCollapsible_Index_TocCollapsibleProps_MaxHeadingLevel = number | undefined;

export type Theme_TocCollapsible_Index_TocCollapsibleProps = {
  toc: Theme_TocCollapsible_Index_TocCollapsibleProps_Toc;
  className?: Theme_TocCollapsible_Index_TocCollapsibleProps_ClassName;
  style?: Theme_TocCollapsible_Index_TocCollapsibleProps_Style;
  minHeadingLevel?: Theme_TocCollapsible_Index_TocCollapsibleProps_MinHeadingLevel;
  maxHeadingLevel?: Theme_TocCollapsible_Index_TocCollapsibleProps_MaxHeadingLevel;
  [key: string]: unknown;
};

export type Theme_TocCollapsible_Index_TocCollapsibleItems = Theme_TocCollapsible_Index_TocListItem[];

export type Theme_TocCollapsible_Index_TocCollapsibleMinHeadingLevel = number;

export type Theme_TocCollapsible_Index_TocCollapsibleMaxHeadingLevel = number;

export type Theme_TocCollapsible_Index_TocCollapsiblePathname = string;

export type Theme_TocCollapsible_Index_TocCollapsibleIsOpenState = [boolean, Theme_TocCollapsible_Index_TocCollapsibleSetIsOpen];

export type Theme_TocCollapsible_Index_TocCollapsibleIsOpen = boolean;

export type Theme_TocCollapsible_Index_TocCollapsibleSetIsOpen = React.Dispatch<React.SetStateAction<boolean>>;

export type Theme_TocCollapsible_Index_TocCollapsibleIsClosingState = [boolean, Theme_TocCollapsible_Index_TocCollapsibleSetIsClosing];

export type Theme_TocCollapsible_Index_TocCollapsibleIsClosing = boolean;

export type Theme_TocCollapsible_Index_TocCollapsibleSetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type Theme_TocCollapsible_Index_TocCollapsiblePanelRef = RefObject<HTMLDivElement | null>;

export type Theme_TocCollapsible_Index_TocCollapsibleOpenAriaLabel = string;

export type Theme_TocCollapsible_Index_TocCollapsibleTriggerLabel = string;

export type Theme_TocCollapsible_Index_TocCollapsibleDialogAriaLabel = string;

export type Theme_TocCollapsible_Index_TocCollapsibleCloseAriaLabel = string;

export type Theme_TocCollapsible_Index_TocCollapsibleTreeItems = Theme_TocCollapsible_Index_TocListItem[];

export type Theme_TocCollapsible_Index_TocCollapsibleOverlayClassName = string;

export type Theme_TocCollapsible_Index_TocCollapsibleAnimationEvent = React.AnimationEvent<HTMLDivElement>;

/**
 * Theme - Toc Collapsible - Toc Collapsible - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideFunction = (event: Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideMouseEvent) => void;

export type Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideMouseEvent = MouseEvent<HTMLDivElement>;

export type Theme_TocCollapsible_Index_TocCollapsibleHandleClickOutsideMouseTarget = EventTarget;

/**
 * Theme - Toc Collapsible - Toc Collapsible - Handle Escape.
 *
 * @since 0.15.0
 */
export type Theme_TocCollapsible_Index_TocCollapsibleHandleEscapeFunction = (event: Theme_TocCollapsible_Index_TocCollapsibleHandleEscapeKeyboardEvent) => void;

export type Theme_TocCollapsible_Index_TocCollapsibleHandleEscapeKeyboardEvent = KeyboardEvent;

export type Theme_TocCollapsible_Index_TocCollapsibleFocusTarget = HTMLButtonElement | null;

/**
 * Theme - Toc Collapsible - Toc List.
 *
 * @since 0.15.0
 */
export type Theme_TocCollapsible_Index_TocListItems = Theme_TocCollapsible_Index_TocListItem[];

export type Theme_TocCollapsible_Index_TocListOnLinkClick = () => void;

export type Theme_TocCollapsible_Index_TocListItemValue = string;

export type Theme_TocCollapsible_Index_TocListItemId = string;

export type Theme_TocCollapsible_Index_TocListItemLevel = number;

export type Theme_TocCollapsible_Index_TocListItemChildren = Theme_TocCollapsible_Index_TocListItem[];

export type Theme_TocCollapsible_Index_TocListItem = {
  value: Theme_TocCollapsible_Index_TocListItemValue;
  id: Theme_TocCollapsible_Index_TocListItemId;
  level: Theme_TocCollapsible_Index_TocListItemLevel;
  children: Theme_TocCollapsible_Index_TocListItemChildren;
};
