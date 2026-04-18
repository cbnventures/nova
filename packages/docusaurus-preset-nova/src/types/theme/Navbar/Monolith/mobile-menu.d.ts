import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Monolith - Mobile Menu.
 *
 * @since 0.15.0
 */
export type ThemeNavbarMonolithMobileMenuMobileMenuPropsIsOpen = boolean;

export type ThemeNavbarMonolithMobileMenuMobileMenuPropsOnClose = () => void;

export type ThemeNavbarMonolithMobileMenuMobileMenuPropsItems = ThemeNavbarItem[];

export type ThemeNavbarMonolithMobileMenuMobileMenuProps = {
  isOpen: ThemeNavbarMonolithMobileMenuMobileMenuPropsIsOpen;
  onClose: ThemeNavbarMonolithMobileMenuMobileMenuPropsOnClose;
  items: ThemeNavbarMonolithMobileMenuMobileMenuPropsItems;
};

export type ThemeNavbarMonolithMobileMenuMobileMenuReturns = React.JSX.Element | null;

export type ThemeNavbarMonolithMobileMenuMobileMenuIsOpen = boolean;

export type ThemeNavbarMonolithMobileMenuMobileMenuOnClose = () => void;

export type ThemeNavbarMonolithMobileMenuMobileMenuItems = ThemeNavbarItem[];

export type ThemeNavbarMonolithMobileMenuMobileMenuPanelRef = React.RefObject<HTMLDivElement | null>;

export type ThemeNavbarMonolithMobileMenuMobileMenuIsClosing = boolean;

export type ThemeNavbarMonolithMobileMenuMobileMenuIsClosingState = [ThemeNavbarMonolithMobileMenuMobileMenuIsClosing, ThemeNavbarMonolithMobileMenuMobileMenuSetIsClosing];

export type ThemeNavbarMonolithMobileMenuMobileMenuSetIsClosing = React.Dispatch<React.SetStateAction<ThemeNavbarMonolithMobileMenuMobileMenuIsClosing>>;

export type ThemeNavbarMonolithMobileMenuMobileMenuAriaLabel = string;

export type ThemeNavbarMonolithMobileMenuCloseMenuAriaLabel = string;

export type ThemeNavbarMonolithMobileMenuMobileMenuOverlayClassName = string;

export type ThemeNavbarMonolithMobileMenuMobileMenuAnimationEvent = React.AnimationEvent<HTMLDivElement>;

export type ThemeNavbarMonolithMobileMenuMobileMenuItemIndex = number;

export type ThemeNavbarMonolithMobileMenuMobileMenuItemIcon = string | undefined;

export type ThemeNavbarMonolithMobileMenuMobileMenuDefaultIcon = string;

export type ThemeNavbarMonolithMobileMenuMobileMenuItemStyle = React.CSSProperties;

export type ThemeNavbarMonolithMobileMenuMobileMenuItemTo = string;

export type ThemeNavbarMonolithMobileMenuMobileMenuItemHref = string;

export type ThemeNavbarMonolithMobileMenuMobileMenuLinkProps = Record<string, string>;

export type ThemeNavbarMonolithMobileMenuMobileMenuLinkSpread = Record<string, string>;

/**
 * Theme - Navbar - Monolith - Mobile Menu - Mobile Menu - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideFunction = (event: ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideMouseEvent) => void;

export type ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideMouseEvent = React.MouseEvent<HTMLDivElement>;

export type ThemeNavbarMonolithMobileMenuMobileMenuHandleClickOutsideMouseTarget = EventTarget | null;

/**
 * Theme - Navbar - Monolith - Mobile Menu - Mobile Menu - Handle Escape.
 *
 * @since 0.15.0
 */
export type ThemeNavbarMonolithMobileMenuMobileMenuHandleEscapeFunction = (event: ThemeNavbarMonolithMobileMenuMobileMenuHandleEscapeKeyboardEvent) => void;

export type ThemeNavbarMonolithMobileMenuMobileMenuHandleEscapeKeyboardEvent = KeyboardEvent;

export type ThemeNavbarMonolithMobileMenuMobileMenuFocusTarget = HTMLButtonElement | null;
