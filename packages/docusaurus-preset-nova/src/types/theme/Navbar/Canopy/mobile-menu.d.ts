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

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrcLight = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrc = {
  light: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrcLight;
  dark: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmark = {
  light: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmarkLight;
  dark: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoHref = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoTarget = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoRel = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogo = {
  alt: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoAlt;
  src: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoSrc;
  wordmark: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoWordmark;
  title: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoTitle;
  href: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoHref;
  target: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoTarget;
  rel: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoRel;
  ariaLabel: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogoAriaLabel;
};

export type ThemeNavbarCanopyMobileMenuMobileMenuPropsActiveItemLabel = string | null;

export type ThemeNavbarCanopyMobileMenuMobileMenuProps = {
  isOpen: ThemeNavbarCanopyMobileMenuMobileMenuPropsIsOpen;
  onClose: ThemeNavbarCanopyMobileMenuMobileMenuPropsOnClose;
  items: ThemeNavbarCanopyMobileMenuMobileMenuPropsItems;
  siteLogo: ThemeNavbarCanopyMobileMenuMobileMenuPropsSiteLogo;
  activeItemLabel: ThemeNavbarCanopyMobileMenuMobileMenuPropsActiveItemLabel;
};

export type ThemeNavbarCanopyMobileMenuMobileMenuReturns = React.JSX.Element | null;

export type ThemeNavbarCanopyMobileMenuMobileMenuIsOpen = boolean;

export type ThemeNavbarCanopyMobileMenuMobileMenuOnClose = () => void;

export type ThemeNavbarCanopyMobileMenuMobileMenuItems = ThemeNavbarItem[];

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoAlt = string;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrcLight = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrc = {
  light: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrcLight;
  dark: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmark = {
  light: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmarkLight;
  dark: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoTitle = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoHref = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoTarget = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoRel = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarCanopyMobileMenuMobileMenuSiteLogo = {
  alt: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoAlt;
  src: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoSrc;
  wordmark: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoWordmark;
  title: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoTitle;
  href: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoHref;
  target: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoTarget;
  rel: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoRel;
  ariaLabel: ThemeNavbarCanopyMobileMenuMobileMenuSiteLogoAriaLabel;
};

export type ThemeNavbarCanopyMobileMenuMobileMenuActiveItemLabel = string | null;

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

export type ThemeNavbarCanopyMobileMenuMobileMenuItemIsActive = boolean;

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
