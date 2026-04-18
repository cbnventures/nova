import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Canopy - Mobile Menu.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCanopyMobileMenuMobileMenuPropsIsOpen = boolean;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsOnClose = () => void;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsItems = ThemeNavbarItem[];

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoAlt = string;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrc = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoHref = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogo = {
  alt: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoAlt;
  src: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrc;
  srcDark: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrcDark;
  wordmark: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmark;
  wordmarkDark: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmarkDark;
  title: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoTitle;
  href: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoHref;
};

export type ThemeNavbarCanopyMobileMenuMobileMenuProps = {
  isOpen: ThemeNavbarCanopyMobileMenuMobileMenuPropsIsOpen;
  onClose: ThemeNavbarCanopyMobileMenuMobileMenuPropsOnClose;
  items: ThemeNavbarCanopyMobileMenuMobileMenuPropsItems;
  siteLogo: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogo;
};

export type ThemeNavbarCanopyMobileMenuMobileMenuReturns = React.JSX.Element | null;

export type ThemeNavbarCanopyMobileMenuMobileMenuIsOpen = boolean;

export type ThemeNavbarCanopyMobileMenuMobileMenuOnClose = () => void;

export type ThemeNavbarCanopyMobileMenuMobileMenuItems = ThemeNavbarItem[];

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoAlt = string;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrc = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoTitle = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoHref = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogo = {
  alt: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoAlt;
  src: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrc;
  srcDark: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrcDark;
  wordmark: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmark;
  wordmarkDark: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmarkDark;
  title: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoTitle;
  href: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoHref;
};

export type ThemeNavbarCanopyMobileMenuMobileMenuPanelRef = React.RefObject<HTMLDivElement | null>;

export type ThemeNavbarCanopyMobileMenuMobileMenuIsClosing = boolean;

export type ThemeNavbarCanopyMobileMenuMobileMenuIsClosingState = [ThemeNavbarCanopyMobileMenuMobileMenuIsClosing, ThemeNavbarCanopyMobileMenuMobileMenuSetIsClosing];

export type ThemeNavbarCanopyMobileMenuMobileMenuSetIsClosing = React.Dispatch<React.SetStateAction<ThemeNavbarCanopyMobileMenuMobileMenuIsClosing>>;

export type ThemeNavbarCanopyMobileMenuMobileMenuAriaLabel = string;

export type ThemeNavbarCanopyMobileMenuCloseMenuAriaLabel = string;

export type ThemeNavbarCanopyMobileMenuMobileMenuOverlayClassName = string;

export type ThemeNavbarCanopyMobileMenuMobileMenuAnimationEvent = React.AnimationEvent<HTMLDivElement>;

export type ThemeNavbarCanopyMobileMenuMobileMenuItemIndex = number;

export type ThemeNavbarCanopyMobileMenuMobileMenuItemIcon = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuDefaultIcon = string;

export type ThemeNavbarCanopyMobileMenuMobileMenuItemStyle = React.CSSProperties;

export type ThemeNavbarCanopyMobileMenuMobileMenuItemTo = string;

export type ThemeNavbarCanopyMobileMenuMobileMenuItemHref = string;

export type ThemeNavbarCanopyMobileMenuMobileMenuLinkProps = Record<string, string>;

export type ThemeNavbarCanopyMobileMenuMobileMenuLinkSpread = Record<string, string>;

/**
 * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideFunction = (event: ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideMouseEvent) => void;

export type ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideMouseEvent = React.MouseEvent<HTMLDivElement>;

export type ThemeNavbarCanopyMobileMenuMobileMenuHandleClickOutsideMouseTarget = EventTarget | null;

/**
 * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu - Handle Escape.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCanopyMobileMenuMobileMenuHandleEscapeFunction = (event: ThemeNavbarCanopyMobileMenuMobileMenuHandleEscapeKeyboardEvent) => void;

export type ThemeNavbarCanopyMobileMenuMobileMenuHandleEscapeKeyboardEvent = KeyboardEvent;

export type ThemeNavbarCanopyMobileMenuMobileMenuFocusTarget = HTMLButtonElement | null;
