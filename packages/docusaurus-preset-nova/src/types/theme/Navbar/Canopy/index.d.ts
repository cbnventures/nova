import type { CSSProperties, ReactNode } from 'react';

import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Canopy.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoAlt = string;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrcLight = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrc = {
  light: ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrcLight;
  dark: ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmark = {
  light: ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmarkLight;
  dark: ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoHref = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoTarget = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoRel = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsSiteLogo = {
  alt: ThemeNavbarCanopyIndexCanopyPropsSiteLogoAlt;
  src: ThemeNavbarCanopyIndexCanopyPropsSiteLogoSrc;
  wordmark: ThemeNavbarCanopyIndexCanopyPropsSiteLogoWordmark;
  title: ThemeNavbarCanopyIndexCanopyPropsSiteLogoTitle;
  href: ThemeNavbarCanopyIndexCanopyPropsSiteLogoHref;
  target: ThemeNavbarCanopyIndexCanopyPropsSiteLogoTarget;
  rel: ThemeNavbarCanopyIndexCanopyPropsSiteLogoRel;
  ariaLabel: ThemeNavbarCanopyIndexCanopyPropsSiteLogoAriaLabel;
};

export type ThemeNavbarCanopyIndexCanopyPropsItems = ThemeNavbarItem[];

export type ThemeNavbarCanopyIndexCanopyPropsActionItems = ThemeNavbarItem[];

export type ThemeNavbarCanopyIndexCanopyPropsColorModeLabel = ReactNode;

export type ThemeNavbarCanopyIndexCanopyPropsOnColorModeToggle = () => void;

export type ThemeNavbarCanopyIndexCanopyPropsHamburgerLabel = ReactNode;

export type ThemeNavbarCanopyIndexCanopyPropsOnMenuToggle = () => void;

export type ThemeNavbarCanopyIndexCanopyPropsActiveItemLabel = string | null;

export type ThemeNavbarCanopyIndexCanopyPropsClassName = string | undefined;

export type ThemeNavbarCanopyIndexCanopyPropsStyle = CSSProperties | undefined;

export type ThemeNavbarCanopyIndexCanopyProps = {
  siteLogo: ThemeNavbarCanopyIndexCanopyPropsSiteLogo;
  items: ThemeNavbarCanopyIndexCanopyPropsItems;
  actionItems: ThemeNavbarCanopyIndexCanopyPropsActionItems;
  colorModeLabel: ThemeNavbarCanopyIndexCanopyPropsColorModeLabel;
  onColorModeToggle: ThemeNavbarCanopyIndexCanopyPropsOnColorModeToggle;
  hamburgerLabel: ThemeNavbarCanopyIndexCanopyPropsHamburgerLabel;
  onMenuToggle: ThemeNavbarCanopyIndexCanopyPropsOnMenuToggle;
  activeItemLabel: ThemeNavbarCanopyIndexCanopyPropsActiveItemLabel;
  className?: ThemeNavbarCanopyIndexCanopyPropsClassName;
  style?: ThemeNavbarCanopyIndexCanopyPropsStyle;
};

export type ThemeNavbarCanopyIndexCanopyReturns = React.JSX.Element;

export type ThemeNavbarCanopyIndexCanopySiteLogoAlt = string;

export type ThemeNavbarCanopyIndexCanopySiteLogoSrcLight = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoSrcDark = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoSrc = {
  light: ThemeNavbarCanopyIndexCanopySiteLogoSrcLight;
  dark: ThemeNavbarCanopyIndexCanopySiteLogoSrcDark;
} | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoWordmark = {
  light: ThemeNavbarCanopyIndexCanopySiteLogoWordmarkLight;
  dark: ThemeNavbarCanopyIndexCanopySiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoTitle = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoHref = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoTarget = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoRel = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogoAriaLabel = string | undefined;

export type ThemeNavbarCanopyIndexCanopySiteLogo = {
  alt: ThemeNavbarCanopyIndexCanopySiteLogoAlt;
  src: ThemeNavbarCanopyIndexCanopySiteLogoSrc;
  wordmark: ThemeNavbarCanopyIndexCanopySiteLogoWordmark;
  title: ThemeNavbarCanopyIndexCanopySiteLogoTitle;
  href: ThemeNavbarCanopyIndexCanopySiteLogoHref;
  target: ThemeNavbarCanopyIndexCanopySiteLogoTarget;
  rel: ThemeNavbarCanopyIndexCanopySiteLogoRel;
  ariaLabel: ThemeNavbarCanopyIndexCanopySiteLogoAriaLabel;
};

export type ThemeNavbarCanopyIndexCanopyItems = ThemeNavbarItem[];

export type ThemeNavbarCanopyIndexCanopyActionItems = ThemeNavbarItem[];

export type ThemeNavbarCanopyIndexCanopyColorModeLabel = ReactNode;

export type ThemeNavbarCanopyIndexCanopyOnColorModeToggle = () => void;

export type ThemeNavbarCanopyIndexCanopyHamburgerLabel = ReactNode;

export type ThemeNavbarCanopyIndexCanopyOnMenuToggle = () => void;

export type ThemeNavbarCanopyIndexCanopyActiveItemLabel = string | null;

export type ThemeNavbarCanopyIndexCanopyNavbarClassName = string;

export type ThemeNavbarCanopyIndexCanopyNavAriaLabel = string;

export type ThemeNavbarCanopyIndexCanopyOpenMenuAriaLabel = string;

export type ThemeNavbarCanopyIndexCanopyToggleColorModeAriaLabel = string;

export type ThemeNavbarCanopyIndexCanopyNavbarItemSpread = Record<string, unknown>;

export type ThemeNavbarCanopyIndexCanopyNavbarItemKey = string;
