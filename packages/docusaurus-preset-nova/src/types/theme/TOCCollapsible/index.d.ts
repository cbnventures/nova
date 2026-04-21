import type { MouseEvent, RefObject } from 'react';

/**
 * Theme - Toc Collapsible - Toc Collapsible.
 *
 * @since 0.15.0
 */
export type ThemeTocCollapsibleTocCollapsiblePropsToc = ThemeTocCollapsibleTocListItem[];

export type ThemeTocCollapsibleTocCollapsiblePropsClassName = string | undefined;

export type ThemeTocCollapsibleTocCollapsiblePropsMinHeadingLevel = number | undefined;

export type ThemeTocCollapsibleTocCollapsiblePropsMaxHeadingLevel = number | undefined;

export type ThemeTocCollapsibleTocCollapsibleProps = {
  toc: ThemeTocCollapsibleTocCollapsiblePropsToc;
  className?: ThemeTocCollapsibleTocCollapsiblePropsClassName;
  minHeadingLevel?: ThemeTocCollapsibleTocCollapsiblePropsMinHeadingLevel;
  maxHeadingLevel?: ThemeTocCollapsibleTocCollapsiblePropsMaxHeadingLevel;
  [key: string]: unknown;
};

export type ThemeTocCollapsibleTocCollapsibleItems = ThemeTocCollapsibleTocListItem[];

export type ThemeTocCollapsibleTocCollapsibleMinHeadingLevel = number;

export type ThemeTocCollapsibleTocCollapsibleMaxHeadingLevel = number;

export type ThemeTocCollapsibleTocCollapsiblePathname = string;

export type ThemeTocCollapsibleTocCollapsibleIsOpenState = [boolean, ThemeTocCollapsibleTocCollapsibleSetIsOpen];

export type ThemeTocCollapsibleTocCollapsibleIsOpen = boolean;

export type ThemeTocCollapsibleTocCollapsibleSetIsOpen = React.Dispatch<React.SetStateAction<boolean>>;

export type ThemeTocCollapsibleTocCollapsibleIsClosingState = [boolean, ThemeTocCollapsibleTocCollapsibleSetIsClosing];

export type ThemeTocCollapsibleTocCollapsibleIsClosing = boolean;

export type ThemeTocCollapsibleTocCollapsibleSetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type ThemeTocCollapsibleTocCollapsiblePanelRef = RefObject<HTMLDivElement | null>;

export type ThemeTocCollapsibleTocCollapsibleOpenAriaLabel = string;

export type ThemeTocCollapsibleTocCollapsibleTriggerLabel = string;

export type ThemeTocCollapsibleTocCollapsibleDialogAriaLabel = string;

export type ThemeTocCollapsibleTocCollapsibleCloseAriaLabel = string;

export type ThemeTocCollapsibleTocCollapsibleTreeItems = ThemeTocCollapsibleTocListItem[];

export type ThemeTocCollapsibleTocCollapsibleOverlayClassName = string;

export type ThemeTocCollapsibleTocCollapsibleAnimationEvent = React.AnimationEvent<HTMLDivElement>;

/**
 * Theme - Toc Collapsible - Toc Collapsible - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type ThemeTocCollapsibleTocCollapsibleHandleClickOutsideFunction = (event: ThemeTocCollapsibleTocCollapsibleHandleClickOutsideMouseEvent) => void;

export type ThemeTocCollapsibleTocCollapsibleHandleClickOutsideMouseEvent = MouseEvent<HTMLDivElement>;

export type ThemeTocCollapsibleTocCollapsibleHandleClickOutsideMouseTarget = EventTarget;

/**
 * Theme - Toc Collapsible - Toc Collapsible - Handle Escape.
 *
 * @since 0.15.0
 */
export type ThemeTocCollapsibleTocCollapsibleHandleEscapeFunction = (event: ThemeTocCollapsibleTocCollapsibleHandleEscapeKeyboardEvent) => void;

export type ThemeTocCollapsibleTocCollapsibleHandleEscapeKeyboardEvent = KeyboardEvent;

export type ThemeTocCollapsibleTocCollapsibleFocusTarget = HTMLButtonElement | null;

/**
 * Theme - Toc Collapsible - Toc List.
 *
 * @since 0.15.0
 */
export type ThemeTocCollapsibleTocListItems = ThemeTocCollapsibleTocListItem[];

export type ThemeTocCollapsibleTocListOnLinkClick = () => void;

export type ThemeTocCollapsibleTocListItemValue = string;

export type ThemeTocCollapsibleTocListItemId = string;

export type ThemeTocCollapsibleTocListItemLevel = number;

export type ThemeTocCollapsibleTocListItemChildren = ThemeTocCollapsibleTocListItem[];

export type ThemeTocCollapsibleTocListItem = {
  value: ThemeTocCollapsibleTocListItemValue;
  id: ThemeTocCollapsibleTocListItemId;
  level: ThemeTocCollapsibleTocListItemLevel;
  children: ThemeTocCollapsibleTocListItemChildren;
};
