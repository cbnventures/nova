import type { CSSProperties, ReactNode } from 'react';

import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Bridge.
 *
 * @since 0.15.0
 */
export type ThemeNavbarBridgeIndexBridgePropsSiteLogoAlt = string;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoSrcLight = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoSrc = {
  light: ThemeNavbarBridgeIndexBridgePropsSiteLogoSrcLight;
  dark: ThemeNavbarBridgeIndexBridgePropsSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmark = {
  light: ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmarkLight;
  dark: ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoTitle = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoHref = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoTarget = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoRel = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogo = {
  alt: ThemeNavbarBridgeIndexBridgePropsSiteLogoAlt;
  src: ThemeNavbarBridgeIndexBridgePropsSiteLogoSrc;
  wordmark: ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmark;
  title: ThemeNavbarBridgeIndexBridgePropsSiteLogoTitle;
  href: ThemeNavbarBridgeIndexBridgePropsSiteLogoHref;
  target: ThemeNavbarBridgeIndexBridgePropsSiteLogoTarget;
  rel: ThemeNavbarBridgeIndexBridgePropsSiteLogoRel;
  ariaLabel: ThemeNavbarBridgeIndexBridgePropsSiteLogoAriaLabel;
};

export type ThemeNavbarBridgeIndexBridgePropsItems = ThemeNavbarItem[];

export type ThemeNavbarBridgeIndexBridgePropsActionItems = ThemeNavbarItem[];

export type ThemeNavbarBridgeIndexBridgePropsColorModeLabel = ReactNode;

export type ThemeNavbarBridgeIndexBridgePropsOnColorModeToggle = () => void;

export type ThemeNavbarBridgeIndexBridgePropsHamburgerLabel = ReactNode;

export type ThemeNavbarBridgeIndexBridgePropsOnMenuToggle = () => void;

export type ThemeNavbarBridgeIndexBridgePropsActiveItemLabel = string | null;

export type ThemeNavbarBridgeIndexBridgePropsClassName = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsStyle = CSSProperties | undefined;

export type ThemeNavbarBridgeIndexBridgeProps = {
  siteLogo: ThemeNavbarBridgeIndexBridgePropsSiteLogo;
  items: ThemeNavbarBridgeIndexBridgePropsItems;
  actionItems: ThemeNavbarBridgeIndexBridgePropsActionItems;
  colorModeLabel: ThemeNavbarBridgeIndexBridgePropsColorModeLabel;
  onColorModeToggle: ThemeNavbarBridgeIndexBridgePropsOnColorModeToggle;
  hamburgerLabel: ThemeNavbarBridgeIndexBridgePropsHamburgerLabel;
  onMenuToggle: ThemeNavbarBridgeIndexBridgePropsOnMenuToggle;
  activeItemLabel: ThemeNavbarBridgeIndexBridgePropsActiveItemLabel;
  className?: ThemeNavbarBridgeIndexBridgePropsClassName;
  style?: ThemeNavbarBridgeIndexBridgePropsStyle;
};

export type ThemeNavbarBridgeIndexBridgeReturns = React.JSX.Element;

export type ThemeNavbarBridgeIndexBridgeSiteLogoAlt = string;

export type ThemeNavbarBridgeIndexBridgeSiteLogoSrcLight = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoSrcDark = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoSrc = {
  light: ThemeNavbarBridgeIndexBridgeSiteLogoSrcLight;
  dark: ThemeNavbarBridgeIndexBridgeSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoWordmark = {
  light: ThemeNavbarBridgeIndexBridgeSiteLogoWordmarkLight;
  dark: ThemeNavbarBridgeIndexBridgeSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoTitle = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoHref = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoTarget = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoRel = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogo = {
  alt: ThemeNavbarBridgeIndexBridgeSiteLogoAlt;
  src: ThemeNavbarBridgeIndexBridgeSiteLogoSrc;
  wordmark: ThemeNavbarBridgeIndexBridgeSiteLogoWordmark;
  title: ThemeNavbarBridgeIndexBridgeSiteLogoTitle;
  href: ThemeNavbarBridgeIndexBridgeSiteLogoHref;
  target: ThemeNavbarBridgeIndexBridgeSiteLogoTarget;
  rel: ThemeNavbarBridgeIndexBridgeSiteLogoRel;
  ariaLabel: ThemeNavbarBridgeIndexBridgeSiteLogoAriaLabel;
};

export type ThemeNavbarBridgeIndexBridgeItems = ThemeNavbarItem[];

export type ThemeNavbarBridgeIndexBridgeActionItems = ThemeNavbarItem[];

export type ThemeNavbarBridgeIndexBridgeColorModeLabel = ReactNode;

export type ThemeNavbarBridgeIndexBridgeOnColorModeToggle = () => void;

export type ThemeNavbarBridgeIndexBridgeHamburgerLabel = ReactNode;

export type ThemeNavbarBridgeIndexBridgeOnMenuToggle = () => void;

export type ThemeNavbarBridgeIndexBridgeActiveItemLabel = string | null;

export type ThemeNavbarBridgeIndexBridgeNavbarClassName = string;

export type ThemeNavbarBridgeIndexBridgeNavAriaLabel = string;

export type ThemeNavbarBridgeIndexBridgeOpenMenuAriaLabel = string;

export type ThemeNavbarBridgeIndexBridgeToggleColorModeAriaLabel = string;

export type ThemeNavbarBridgeIndexBridgeNavbarItemSpread = Record<string, unknown>;

export type ThemeNavbarBridgeIndexBridgeNavbarItemKey = string;
