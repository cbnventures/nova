import type { ReactNode } from 'react';

import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Bridge.
 *
 * @since 0.15.0
 */
export type ThemeNavbarBridgeIndexBridgePropsSiteLogoAlt = string;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoSrc = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmark = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoTitle = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogoHref = string | undefined;

export type ThemeNavbarBridgeIndexBridgePropsSiteLogo = {
  alt: ThemeNavbarBridgeIndexBridgePropsSiteLogoAlt;
  src: ThemeNavbarBridgeIndexBridgePropsSiteLogoSrc;
  srcDark: ThemeNavbarBridgeIndexBridgePropsSiteLogoSrcDark;
  wordmark: ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmark;
  wordmarkDark: ThemeNavbarBridgeIndexBridgePropsSiteLogoWordmarkDark;
  title: ThemeNavbarBridgeIndexBridgePropsSiteLogoTitle;
  href: ThemeNavbarBridgeIndexBridgePropsSiteLogoHref;
};

export type ThemeNavbarBridgeIndexBridgePropsItems = ThemeNavbarItem[];

export type ThemeNavbarBridgeIndexBridgePropsColorModeLabel = ReactNode;

export type ThemeNavbarBridgeIndexBridgePropsOnColorModeToggle = () => void;

export type ThemeNavbarBridgeIndexBridgePropsHamburgerLabel = ReactNode;

export type ThemeNavbarBridgeIndexBridgePropsOnMenuToggle = () => void;

export type ThemeNavbarBridgeIndexBridgeProps = {
  siteLogo: ThemeNavbarBridgeIndexBridgePropsSiteLogo;
  items: ThemeNavbarBridgeIndexBridgePropsItems;
  colorModeLabel: ThemeNavbarBridgeIndexBridgePropsColorModeLabel;
  onColorModeToggle: ThemeNavbarBridgeIndexBridgePropsOnColorModeToggle;
  hamburgerLabel: ThemeNavbarBridgeIndexBridgePropsHamburgerLabel;
  onMenuToggle: ThemeNavbarBridgeIndexBridgePropsOnMenuToggle;
};

export type ThemeNavbarBridgeIndexBridgeReturns = React.JSX.Element;

export type ThemeNavbarBridgeIndexBridgeSiteLogoAlt = string;

export type ThemeNavbarBridgeIndexBridgeSiteLogoSrc = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoSrcDark = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoWordmark = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoTitle = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogoHref = string | undefined;

export type ThemeNavbarBridgeIndexBridgeSiteLogo = {
  alt: ThemeNavbarBridgeIndexBridgeSiteLogoAlt;
  src: ThemeNavbarBridgeIndexBridgeSiteLogoSrc;
  srcDark: ThemeNavbarBridgeIndexBridgeSiteLogoSrcDark;
  wordmark: ThemeNavbarBridgeIndexBridgeSiteLogoWordmark;
  wordmarkDark: ThemeNavbarBridgeIndexBridgeSiteLogoWordmarkDark;
  title: ThemeNavbarBridgeIndexBridgeSiteLogoTitle;
  href: ThemeNavbarBridgeIndexBridgeSiteLogoHref;
};

export type ThemeNavbarBridgeIndexBridgeItems = ThemeNavbarItem[];

export type ThemeNavbarBridgeIndexBridgeColorModeLabel = ReactNode;

export type ThemeNavbarBridgeIndexBridgeOnColorModeToggle = () => void;

export type ThemeNavbarBridgeIndexBridgeHamburgerLabel = ReactNode;

export type ThemeNavbarBridgeIndexBridgeOnMenuToggle = () => void;

export type ThemeNavbarBridgeIndexBridgeNavbarClassName = string;

export type ThemeNavbarBridgeIndexBridgeOpenMenuAriaLabel = string;

export type ThemeNavbarBridgeIndexBridgeToggleColorModeAriaLabel = string;

export type ThemeNavbarBridgeIndexBridgeNavbarItemSpread = Record<string, unknown>;
