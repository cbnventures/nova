import type { PropSidebarBreadcrumbsItem } from '@docusaurus/plugin-content-docs';
import type {
  CSSProperties, MouseEvent, ReactNode, RefObject,
} from 'react';

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Props_ClassName = string | undefined;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Props_Style = CSSProperties | undefined;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Props = {
  className?: Theme_DocSidebarMobile_Index_DocSidebarMobile_Props_ClassName;
  style?: Theme_DocSidebarMobile_Index_DocSidebarMobile_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Breadcrumbs = PropSidebarBreadcrumbsItem[] | null;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Sidebar = Record<string, unknown> | null;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Pathname = string;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_IsOpenState = [boolean, Theme_DocSidebarMobile_Index_DocSidebarMobile_SetIsOpen];

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_IsOpen = boolean;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_SetIsOpen = React.Dispatch<React.SetStateAction<boolean>>;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_IsClosingState = [boolean, Theme_DocSidebarMobile_Index_DocSidebarMobile_SetIsClosing];

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_IsClosing = boolean;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_SetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_PanelRef = RefObject<HTMLDivElement | null>;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_SidebarItems = unknown[];

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Separator = ReactNode;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbItem = PropSidebarBreadcrumbsItem;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbIndex = number;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_OverlayClassName = string;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_AnimationEvent = React.AnimationEvent<HTMLDivElement>;

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideFunction = (event: Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideMouseEvent) => void;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideMouseEvent = MouseEvent<HTMLDivElement>;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleClickOutsideMouseTarget = EventTarget;

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile - Handle Escape.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleEscapeFunction = (event: Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleEscapeKeyboardEvent) => void;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_HandleEscapeKeyboardEvent = KeyboardEvent;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_FocusTarget = HTMLButtonElement | null;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_OpenAriaLabel = string;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_PanelAriaLabel = string;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_HeaderTitle = string;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_CloseAriaLabel = string;
