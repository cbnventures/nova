import type { MouseEvent, RefObject } from 'react';

/**
 * Lib - Use Overlay Panel.
 *
 * @since 0.23.0
 */
export type Lib_UseOverlayPanel_IsOpen = boolean;

export type Lib_UseOverlayPanel_FocusSelector = string;

export type Lib_UseOverlayPanel_Returns_IsClosing = boolean;

export type Lib_UseOverlayPanel_Returns_SetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type Lib_UseOverlayPanel_Returns_HandleClickOutside = (event: MouseEvent<HTMLDivElement>) => undefined;

export type Lib_UseOverlayPanel_Returns_PanelRef = RefObject<HTMLDivElement | null>;

export type Lib_UseOverlayPanel_Returns = {
  isClosing: Lib_UseOverlayPanel_Returns_IsClosing;
  setIsClosing: Lib_UseOverlayPanel_Returns_SetIsClosing;
  handleClickOutside: Lib_UseOverlayPanel_Returns_HandleClickOutside;
  panelRef: Lib_UseOverlayPanel_Returns_PanelRef;
};

/**
 * Lib - Use Overlay Panel - Use Overlay Panel.
 *
 * @since 0.23.0
 */
export type Lib_UseOverlayPanel_UseOverlayPanel_IsClosingState = [Lib_UseOverlayPanel_UseOverlayPanel_IsClosing, Lib_UseOverlayPanel_UseOverlayPanel_SetIsClosing];

export type Lib_UseOverlayPanel_UseOverlayPanel_IsClosing = boolean;

export type Lib_UseOverlayPanel_UseOverlayPanel_SetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type Lib_UseOverlayPanel_UseOverlayPanel_PanelRef = RefObject<HTMLDivElement | null>;

export type Lib_UseOverlayPanel_UseOverlayPanel_HandleEscape = (event: Lib_UseOverlayPanel_UseOverlayPanel_HandleEscapeKeyboardEvent) => undefined;

export type Lib_UseOverlayPanel_UseOverlayPanel_HandleEscapeKeyboardEvent = KeyboardEvent;

export type Lib_UseOverlayPanel_UseOverlayPanel_HandleClickOutside = (event: Lib_UseOverlayPanel_UseOverlayPanel_HandleClickOutsideMouseEvent) => undefined;

export type Lib_UseOverlayPanel_UseOverlayPanel_HandleClickOutsideMouseEvent = MouseEvent<HTMLDivElement>;

export type Lib_UseOverlayPanel_UseOverlayPanel_MouseTarget = EventTarget;

export type Lib_UseOverlayPanel_UseOverlayPanel_FocusTarget = HTMLButtonElement | null;
