import type { PropSidebarBreadcrumbsItem } from '@docusaurus/plugin-content-docs';
import type { MouseEvent, ReactNode, RefObject } from 'react';

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarMobileDocSidebarMobileBreadcrumbs = PropSidebarBreadcrumbsItem[] | null;

export type ThemeDocSidebarMobileDocSidebarMobileSidebar = Record<string, unknown> | null;

export type ThemeDocSidebarMobileDocSidebarMobilePathname = string;

export type ThemeDocSidebarMobileDocSidebarMobileIsOpenState = [boolean, ThemeDocSidebarMobileDocSidebarMobileSetIsOpen];

export type ThemeDocSidebarMobileDocSidebarMobileIsOpen = boolean;

export type ThemeDocSidebarMobileDocSidebarMobileSetIsOpen = React.Dispatch<React.SetStateAction<boolean>>;

export type ThemeDocSidebarMobileDocSidebarMobileIsClosingState = [boolean, ThemeDocSidebarMobileDocSidebarMobileSetIsClosing];

export type ThemeDocSidebarMobileDocSidebarMobileIsClosing = boolean;

export type ThemeDocSidebarMobileDocSidebarMobileSetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type ThemeDocSidebarMobileDocSidebarMobilePanelRef = RefObject<HTMLDivElement | null>;

export type ThemeDocSidebarMobileDocSidebarMobileSidebarItems = unknown[];

export type ThemeDocSidebarMobileDocSidebarMobileSeparator = ReactNode;

export type ThemeDocSidebarMobileDocSidebarMobileBreadcrumbItem = PropSidebarBreadcrumbsItem;

export type ThemeDocSidebarMobileDocSidebarMobileBreadcrumbIndex = number;

export type ThemeDocSidebarMobileDocSidebarMobileOverlayClassName = string;

export type ThemeDocSidebarMobileDocSidebarMobileAnimationEvent = React.AnimationEvent<HTMLDivElement>;

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideFunction = (event: ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideMouseEvent) => void;

export type ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideMouseEvent = MouseEvent<HTMLDivElement>;

export type ThemeDocSidebarMobileDocSidebarMobileHandleClickOutsideMouseTarget = EventTarget;

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile - Handle Escape.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarMobileDocSidebarMobileHandleEscapeFunction = (event: ThemeDocSidebarMobileDocSidebarMobileHandleEscapeKeyboardEvent) => void;

export type ThemeDocSidebarMobileDocSidebarMobileHandleEscapeKeyboardEvent = KeyboardEvent;

export type ThemeDocSidebarMobileDocSidebarMobileFocusTarget = HTMLButtonElement | null;

export type ThemeDocSidebarMobileDocSidebarMobileOpenAriaLabel = string;

export type ThemeDocSidebarMobileDocSidebarMobilePanelAriaLabel = string;

export type ThemeDocSidebarMobileDocSidebarMobileHeaderTitle = string;

export type ThemeDocSidebarMobileDocSidebarMobileCloseAriaLabel = string;
