import type { ReactNode } from 'react';

import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Canopy.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoAlt = string;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrc = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmark = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoHref = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogo = {
  alt: ThemeNavbarCanopyIndexCanopyPropsSiteLogoAlt;
  src: ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrc;
  srcDark: ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrcDark;
  wordmark: ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmark;
  wordmarkDark: ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmarkDark;
  title: ThemeNavbarCanopyIndexCanopyPropsSiteLogoTitle;
  href: ThemeNavbarCanopyIndexCanopyPropsSiteLogoHref;
};

export type ThemeNavbarCanopyIndexCanopyPropsItems = ThemeNavbarItem[];

export type ThemeNavbarCanopyIndexCanopyPropsColorModeLabel = ReactNode;

export type ThemeNavbarCanopyIndexCanopyPropsOnColorModeToggle = () => void;

export type ThemeNavbarCanopyIndexCanopyPropsHamburgerLabel = ReactNode;

export type ThemeNavbarCanopyIndexCanopyPropsOnMenuToggle = () => void;

export type ThemeNavbarCanopyIndexCanopyProps = {
  siteLogo: ThemeNavbarCanopyIndexCanopyPropsSiteLogo;
  items: ThemeNavbarCanopyIndexCanopyPropsItems;
  colorModeLabel: ThemeNavbarCanopyIndexCanopyPropsColorModeLabel;
  onColorModeToggle: ThemeNavbarCanopyIndexCanopyPropsOnColorModeToggle;
  hamburgerLabel: ThemeNavbarCanopyIndexCanopyPropsHamburgerLabel;
  onMenuToggle: ThemeNavbarCanopyIndexCanopyPropsOnMenuToggle;
};

export type ThemeNavbarCanopyIndexCanopyReturns = React.JSX.Element;

export type ThemeNavbarCanopyIndexCanopySiteLogoAlt = string;

export type ThemeNavbarCanopyIndexCanopySiteLogoSrc = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoSrcDark = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoWordmark = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoTitle = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoHref = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogo = {
  alt: ThemeNavbarCanopyIndexCanopySiteLogoAlt;
  src: ThemeNavbarCanopyIndexCanopySiteLogoSrc;
  srcDark: ThemeNavbarCanopyIndexCanopySiteLogoSrcDark;
  wordmark: ThemeNavbarCanopyIndexCanopySiteLogoWordmark;
  wordmarkDark: ThemeNavbarCanopyIndexCanopySiteLogoWordmarkDark;
  title: ThemeNavbarCanopyIndexCanopySiteLogoTitle;
  href: ThemeNavbarCanopyIndexCanopySiteLogoHref;
};

export type ThemeNavbarCanopyIndexCanopyItems = ThemeNavbarItem[];

export type ThemeNavbarCanopyIndexCanopyColorModeLabel = ReactNode;

export type ThemeNavbarCanopyIndexCanopyOnColorModeToggle = () => void;

export type ThemeNavbarCanopyIndexCanopyHamburgerLabel = ReactNode;

export type ThemeNavbarCanopyIndexCanopyOnMenuToggle = () => void;

export type ThemeNavbarCanopyIndexCanopyNavbarClassName = string;

export type ThemeNavbarCanopyIndexCanopyOpenMenuAriaLabel = string;

export type ThemeNavbarCanopyIndexCanopyToggleColorModeAriaLabel = string;

export type ThemeNavbarCanopyIndexCanopyNavbarItemSpread = Record<string, unknown>;
