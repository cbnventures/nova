import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Compass - Mobile Menu.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCompassMobileMenuMobileMenuPropsIsOpen = boolean;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsOnClose = () => void;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsItems = ThemeNavbarItem[];

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoAlt = string;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrc = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoHref = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogo = {
  alt: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoAlt;
  src: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrc;
  srcDark: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrcDark;
  wordmark: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmark;
  wordmarkDark: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmarkDark;
  title: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoTitle;
  href: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoHref;
};

export type ThemeNavbarCompassMobileMenuMobileMenuProps = {
  isOpen: ThemeNavbarCompassMobileMenuMobileMenuPropsIsOpen;
  onClose: ThemeNavbarCompassMobileMenuMobileMenuPropsOnClose;
  items: ThemeNavbarCompassMobileMenuMobileMenuPropsItems;
  siteLogo: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogo;
};

export type ThemeNavbarCompassMobileMenuMobileMenuReturns = React.JSX.Element | null;

export type ThemeNavbarCompassMobileMenuMobileMenuIsOpen = boolean;

export type ThemeNavbarCompassMobileMenuMobileMenuOnClose = () => void;

export type ThemeNavbarCompassMobileMenuMobileMenuItems = ThemeNavbarItem[];

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoAlt = string;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrc = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoTitle = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoHref = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogo = {
  alt: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoAlt;
  src: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrc;
  srcDark: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrcDark;
  wordmark: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmark;
  wordmarkDark: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmarkDark;
  title: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoTitle;
  href: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoHref;
};

export type ThemeNavbarCompassMobileMenuMobileMenuPanelRef = React.RefObject<HTMLDivElement | null>;

export type ThemeNavbarCompassMobileMenuMobileMenuIsClosing = boolean;

export type ThemeNavbarCompassMobileMenuMobileMenuIsClosingState = [ThemeNavbarCompassMobileMenuMobileMenuIsClosing, ThemeNavbarCompassMobileMenuMobileMenuSetIsClosing];

export type ThemeNavbarCompassMobileMenuMobileMenuSetIsClosing = React.Dispatch<React.SetStateAction<ThemeNavbarCompassMobileMenuMobileMenuIsClosing>>;

export type ThemeNavbarCompassMobileMenuMobileMenuAriaLabel = string;

export type ThemeNavbarCompassMobileMenuCloseMenuAriaLabel = string;

export type ThemeNavbarCompassMobileMenuMobileMenuOverlayClassName = string;

export type ThemeNavbarCompassMobileMenuMobileMenuAnimationEvent = React.AnimationEvent<HTMLDivElement>;

export type ThemeNavbarCompassMobileMenuMobileMenuItemIndex = number;

export type ThemeNavbarCompassMobileMenuMobileMenuItemIcon = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuDefaultIcon = string;

export type ThemeNavbarCompassMobileMenuMobileMenuItemStyle = React.CSSProperties;

export type ThemeNavbarCompassMobileMenuMobileMenuItemTo = string;

export type ThemeNavbarCompassMobileMenuMobileMenuItemHref = string;

export type ThemeNavbarCompassMobileMenuMobileMenuLinkProps = Record<string, string>;

export type ThemeNavbarCompassMobileMenuMobileMenuLinkSpread = Record<string, string>;

/**
 * Theme - Navbar - Compass - Mobile Menu - Mobile Menu - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideFunction = (event: ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideMouseEvent) => void;

export type ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideMouseEvent = React.MouseEvent<HTMLDivElement>;

export type ThemeNavbarCompassMobileMenuMobileMenuHandleClickOutsideMouseTarget = EventTarget | null;

/**
 * Theme - Navbar - Compass - Mobile Menu - Mobile Menu - Handle Escape.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCompassMobileMenuMobileMenuHandleEscapeFunction = (event: ThemeNavbarCompassMobileMenuMobileMenuHandleEscapeKeyboardEvent) => void;

export type ThemeNavbarCompassMobileMenuMobileMenuHandleEscapeKeyboardEvent = KeyboardEvent;

export type ThemeNavbarCompassMobileMenuMobileMenuFocusTarget = HTMLButtonElement | null;
