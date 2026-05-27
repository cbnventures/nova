import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import type { CSSProperties, MouseEvent, RefObject } from 'react';

/**
 * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile.
 *
 * @since 0.15.0
 */
export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_Sidebar = BlogSidebar | undefined;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_ClassName = string | undefined;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_Style = CSSProperties | undefined;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props = {
  sidebar?: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_Sidebar;
  className?: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_ClassName;
  style?: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_Pathname = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsOpenState = [boolean, Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsOpen];

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsOpen = boolean;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsOpen = React.Dispatch<React.SetStateAction<boolean>>;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsClosingState = [boolean, Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsClosing];

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_IsClosing = boolean;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_SetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_PanelRef = RefObject<HTMLDivElement | null>;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_TriggerLabel = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_OpenAriaLabel = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HeaderTitle = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_PanelAriaLabel = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_CloseAriaLabel = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_OverlayClassName = string;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_AnimationEvent = React.AnimationEvent<HTMLDivElement>;

/**
 * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideFunction = (event: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideMouseEvent) => void;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideMouseEvent = MouseEvent<HTMLDivElement>;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleClickOutsideMouseTarget = EventTarget;

/**
 * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile - Handle Escape.
 *
 * @since 0.15.0
 */
export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleEscapeFunction = (event: Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleEscapeKeyboardEvent) => void;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_HandleEscapeKeyboardEvent = KeyboardEvent;

export type Theme_BlogSidebarMobile_Index_BlogSidebarMobile_FocusTarget = HTMLButtonElement | null;
