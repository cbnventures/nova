import type { MouseEvent, RefObject } from 'react';

/**
 * Theme - Doc Sidebar Mobile - Panel - Doc Sidebar Mobile Panel.
 *
 * @since 0.21.0
 */
export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_Sidebar = Record<string, unknown> | null;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_Pathname = string;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_IsOpen = boolean;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_IsClosingState = [boolean, Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_SetIsClosing];

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_IsClosing = boolean;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_SetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_PanelRef = RefObject<HTMLDivElement | null>;

/**
 * Theme - Doc Sidebar Mobile - Panel - Doc Sidebar Mobile Panel - Handle Escape.
 *
 * @since 0.21.0
 */
export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HandleEscapeFunction = (event: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HandleEscapeKeyboardEvent) => void;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HandleEscapeKeyboardEvent = KeyboardEvent;

/**
 * Theme - Doc Sidebar Mobile - Panel - Doc Sidebar Mobile Panel - Handle Click Outside.
 *
 * @since 0.21.0
 */
export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HandleClickOutsideFunction = (event: Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HandleClickOutsideMouseEvent) => void;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HandleClickOutsideMouseEvent = MouseEvent<HTMLDivElement>;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HandleClickOutsideMouseTarget = EventTarget;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_FocusTarget = HTMLButtonElement | null;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_PanelAriaLabel = string;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_HeaderTitle = string;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_CloseAriaLabel = string;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_SidebarItems = unknown[];

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_OverlayClassName = string;

export type Theme_DocSidebarMobile_Panel_DocSidebarMobilePanel_AnimationEvent = React.AnimationEvent<HTMLDivElement>;
