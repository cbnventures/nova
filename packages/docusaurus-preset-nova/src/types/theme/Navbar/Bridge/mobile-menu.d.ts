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

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrcLight = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrc = {
  light: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrcLight;
  dark: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmark = {
  light: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmarkLight;
  dark: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoHref = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoTarget = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoRel = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogo = {
  alt: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoAlt;
  src: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoSrc;
  wordmark: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoWordmark;
  title: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoTitle;
  href: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoHref;
  target: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoTarget;
  rel: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoRel;
  ariaLabel: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogoAriaLabel;
};

export type ThemeNavbarBridgeMobileMenuMobileMenuPropsActiveItemLabel = string | null;

export type ThemeNavbarBridgeMobileMenuMobileMenuProps = {
  isOpen: ThemeNavbarBridgeMobileMenuMobileMenuPropsIsOpen;
  onClose: ThemeNavbarBridgeMobileMenuMobileMenuPropsOnClose;
  items: ThemeNavbarBridgeMobileMenuMobileMenuPropsItems;
  siteLogo: ThemeNavbarBridgeMobileMenuMobileMenuPropsSiteLogo;
  activeItemLabel: ThemeNavbarBridgeMobileMenuMobileMenuPropsActiveItemLabel;
};

export type ThemeNavbarBridgeMobileMenuMobileMenuReturns = React.JSX.Element | null;

export type ThemeNavbarBridgeMobileMenuMobileMenuIsOpen = boolean;

export type ThemeNavbarBridgeMobileMenuMobileMenuOnClose = () => void;

export type ThemeNavbarBridgeMobileMenuMobileMenuItems = ThemeNavbarItem[];

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoAlt = string;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrcLight = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrcDark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrc = {
  light: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrcLight;
  dark: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmark = {
  light: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmarkLight;
  dark: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoTitle = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoHref = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoTarget = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoRel = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarBridgeMobileMenuMobileMenuSiteLogo = {
  alt: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoAlt;
  src: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoSrc;
  wordmark: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoWordmark;
  title: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoTitle;
  href: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoHref;
  target: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoTarget;
  rel: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoRel;
  ariaLabel: ThemeNavbarBridgeMobileMenuMobileMenuSiteLogoAriaLabel;
};

export type ThemeNavbarBridgeMobileMenuMobileMenuActiveItemLabel = string | null;

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

export type ThemeNavbarBridgeMobileMenuMobileMenuItemIsActive = boolean;

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
