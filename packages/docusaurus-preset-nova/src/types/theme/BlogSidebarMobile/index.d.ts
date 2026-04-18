import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import type { MouseEvent, RefObject } from 'react';

/**
 * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile.
 *
 * @since 0.15.0
 */
export type ThemeBlogSidebarMobileBlogSidebarMobilePropsSidebar = BlogSidebar | undefined;

export type ThemeBlogSidebarMobileBlogSidebarMobileProps = {
  sidebar?: ThemeBlogSidebarMobileBlogSidebarMobilePropsSidebar;
  [key: string]: unknown;
};

export type ThemeBlogSidebarMobileBlogSidebarMobilePathname = string;

export type ThemeBlogSidebarMobileBlogSidebarMobileIsOpenState = [boolean, ThemeBlogSidebarMobileBlogSidebarMobileSetIsOpen];

export type ThemeBlogSidebarMobileBlogSidebarMobileIsOpen = boolean;

export type ThemeBlogSidebarMobileBlogSidebarMobileSetIsOpen = React.Dispatch<React.SetStateAction<boolean>>;

export type ThemeBlogSidebarMobileBlogSidebarMobileIsClosingState = [boolean, ThemeBlogSidebarMobileBlogSidebarMobileSetIsClosing];

export type ThemeBlogSidebarMobileBlogSidebarMobileIsClosing = boolean;

export type ThemeBlogSidebarMobileBlogSidebarMobileSetIsClosing = React.Dispatch<React.SetStateAction<boolean>>;

export type ThemeBlogSidebarMobileBlogSidebarMobilePanelRef = RefObject<HTMLDivElement | null>;

export type ThemeBlogSidebarMobileBlogSidebarMobileTriggerLabel = string;

export type ThemeBlogSidebarMobileBlogSidebarMobileOpenAriaLabel = string;

export type ThemeBlogSidebarMobileBlogSidebarMobileHeaderTitle = string;

export type ThemeBlogSidebarMobileBlogSidebarMobilePanelAriaLabel = string;

export type ThemeBlogSidebarMobileBlogSidebarMobileCloseAriaLabel = string;

export type ThemeBlogSidebarMobileBlogSidebarMobileOverlayClassName = string;

export type ThemeBlogSidebarMobileBlogSidebarMobileAnimationEvent = React.AnimationEvent<HTMLDivElement>;

/**
 * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideFunction = (event: ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideMouseEvent) => void;

export type ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideMouseEvent = MouseEvent<HTMLDivElement>;

export type ThemeBlogSidebarMobileBlogSidebarMobileHandleClickOutsideMouseTarget = EventTarget;

/**
 * Theme - Blog Sidebar Mobile - Blog Sidebar Mobile - Handle Escape.
 *
 * @since 0.15.0
 */
export type ThemeBlogSidebarMobileBlogSidebarMobileHandleEscapeFunction = (event: ThemeBlogSidebarMobileBlogSidebarMobileHandleEscapeKeyboardEvent) => void;

export type ThemeBlogSidebarMobileBlogSidebarMobileHandleEscapeKeyboardEvent = KeyboardEvent;

export type ThemeBlogSidebarMobileBlogSidebarMobileFocusTarget = HTMLButtonElement | null;
