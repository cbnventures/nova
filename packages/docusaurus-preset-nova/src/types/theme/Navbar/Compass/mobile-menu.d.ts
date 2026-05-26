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

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrcLight = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrc = {
  light: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrcLight;
  dark: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmark = {
  light: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmarkLight;
  dark: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoHref = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoTarget = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoRel = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogo = {
  alt: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoAlt;
  src: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoSrc;
  wordmark: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoWordmark;
  title: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoTitle;
  href: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoHref;
  target: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoTarget;
  rel: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoRel;
  ariaLabel: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogoAriaLabel;
};

export type ThemeNavbarCompassMobileMenuMobileMenuPropsActiveItemLabel = string | null;

export type ThemeNavbarCompassMobileMenuMobileMenuProps = {
  isOpen: ThemeNavbarCompassMobileMenuMobileMenuPropsIsOpen;
  onClose: ThemeNavbarCompassMobileMenuMobileMenuPropsOnClose;
  items: ThemeNavbarCompassMobileMenuMobileMenuPropsItems;
  siteLogo: ThemeNavbarCompassMobileMenuMobileMenuPropsSiteLogo;
  activeItemLabel: ThemeNavbarCompassMobileMenuMobileMenuPropsActiveItemLabel;
};

export type ThemeNavbarCompassMobileMenuMobileMenuReturns = React.JSX.Element | null;

export type ThemeNavbarCompassMobileMenuMobileMenuIsOpen = boolean;

export type ThemeNavbarCompassMobileMenuMobileMenuOnClose = () => void;

export type ThemeNavbarCompassMobileMenuMobileMenuItems = ThemeNavbarItem[];

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoAlt = string;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrcLight = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrc = {
  light: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrcLight;
  dark: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmark = {
  light: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmarkLight;
  dark: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoTitle = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoHref = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoTarget = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoRel = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarCompassMobileMenuMobileMenuSiteLogo = {
  alt: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoAlt;
  src: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoSrc;
  wordmark: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoWordmark;
  title: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoTitle;
  href: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoHref;
  target: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoTarget;
  rel: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoRel;
  ariaLabel: ThemeNavbarCompassMobileMenuMobileMenuSiteLogoAriaLabel;
};

export type ThemeNavbarCompassMobileMenuMobileMenuActiveItemLabel = string | null;

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

export type ThemeNavbarCompassMobileMenuMobileMenuItemIsActive = boolean;

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
