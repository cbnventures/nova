import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Bridge - Mobile Menu.
 *
 * @since 0.15.0
 */
export type ThemeNavbarBridgeMobileMenuMobileMenuPropsIsOpen = boolean;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsOnClose = () => void;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsItems = ThemeNavbarItem[];

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoAlt = string;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrc = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoHref = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogo = {
  alt: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoAlt;
  src: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrc;
  srcDark: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrcDark;
  wordmark: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmark;
  wordmarkDark: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmarkDark;
  title: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoTitle;
  href: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoHref;
};

export type ThemeNavbarBridgeMobileMenuMobileMenuProps = {
  isOpen: ThemeNavbarBridgeMobileMenuMobileMenuPropsIsOpen;
  onClose: ThemeNavbarBridgeMobileMenuMobileMenuPropsOnClose;
  items: ThemeNavbarBridgeMobileMenuMobileMenuPropsItems;
  siteLogo: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogo;
};

export type ThemeNavbarBridgeMobileMenuMobileMenuReturns = React.JSX.Element | null;

export type ThemeNavbarBridgeMobileMenuMobileMenuIsOpen = boolean;

export type ThemeNavbarBridgeMobileMenuMobileMenuOnClose = () => void;

export type ThemeNavbarBridgeMobileMenuMobileMenuItems = ThemeNavbarItem[];

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoAlt = string;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrc = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrcDark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoTitle = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoHref = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogo = {
  alt: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoAlt;
  src: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrc;
  srcDark: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrcDark;
  wordmark: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmark;
  wordmarkDark: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmarkDark;
  title: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoTitle;
  href: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoHref;
};

export type ThemeNavbarBridgeMobileMenuMobileMenuPanelRef = React.RefObject<HTMLDivElement | null>;

export type ThemeNavbarBridgeMobileMenuMobileMenuIsClosing = boolean;

export type ThemeNavbarBridgeMobileMenuMobileMenuIsClosingState = [ThemeNavbarBridgeMobileMenuMobileMenuIsClosing, ThemeNavbarBridgeMobileMenuMobileMenuSetIsClosing];

export type ThemeNavbarBridgeMobileMenuMobileMenuSetIsClosing = React.Dispatch<React.SetStateAction<ThemeNavbarBridgeMobileMenuMobileMenuIsClosing>>;

export type ThemeNavbarBridgeMobileMenuMobileMenuAriaLabel = string;

export type ThemeNavbarBridgeMobileMenuCloseMenuAriaLabel = string;

export type ThemeNavbarBridgeMobileMenuMobileMenuOverlayClassName = string;

export type ThemeNavbarBridgeMobileMenuMobileMenuAnimationEvent = React.AnimationEvent<HTMLDivElement>;

export type ThemeNavbarBridgeMobileMenuMobileMenuItemIndex = number;

export type ThemeNavbarBridgeMobileMenuMobileMenuItemIcon = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuDefaultIcon = string;

export type ThemeNavbarBridgeMobileMenuMobileMenuItemStyle = React.CSSProperties;

export type ThemeNavbarBridgeMobileMenuMobileMenuItemTo = string;

export type ThemeNavbarBridgeMobileMenuMobileMenuItemHref = string;

export type ThemeNavbarBridgeMobileMenuMobileMenuLinkProps = Record<string, string>;

export type ThemeNavbarBridgeMobileMenuMobileMenuLinkSpread = Record<string, string>;

/**
 * Theme - Navbar - Bridge - Mobile Menu - Mobile Menu - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideFunction = (event: ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideMouseEvent) => void;

export type ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideMouseEvent = React.MouseEvent<HTMLDivElement>;

export type ThemeNavbarBridgeMobileMenuMobileMenuHandleClickOutsideMouseTarget = EventTarget | null;

/**
 * Theme - Navbar - Bridge - Mobile Menu - Mobile Menu - Handle Escape.
 *
 * @since 0.15.0
 */
export type ThemeNavbarBridgeMobileMenuMobileMenuHandleEscapeFunction = (event: ThemeNavbarBridgeMobileMenuMobileMenuHandleEscapeKeyboardEvent) => void;

export type ThemeNavbarBridgeMobileMenuMobileMenuHandleEscapeKeyboardEvent = KeyboardEvent;

export type ThemeNavbarBridgeMobileMenuMobileMenuFocusTarget = HTMLButtonElement | null;
