import type { CSSProperties, ReactNode } from 'react';

import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Compass.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCompassIndexCompassPropsSiteLogoAlt = string;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoSrcLight = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoSrc = {
  light: ThemeNavbarCompassIndexCompassPropsSiteLogoSrcLight;
  dark: ThemeNavbarCompassIndexCompassPropsSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoWordmark = {
  light: ThemeNavbarCompassIndexCompassPropsSiteLogoWordmarkLight;
  dark: ThemeNavbarCompassIndexCompassPropsSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoHref = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoTarget = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoRel = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogo = {
  alt: ThemeNavbarCompassIndexCompassPropsSiteLogoAlt;
  src: ThemeNavbarCompassIndexCompassPropsSiteLogoSrc;
  wordmark: ThemeNavbarCompassIndexCompassPropsSiteLogoWordmark;
  title: ThemeNavbarCompassIndexCompassPropsSiteLogoTitle;
  href: ThemeNavbarCompassIndexCompassPropsSiteLogoHref;
  target: ThemeNavbarCompassIndexCompassPropsSiteLogoTarget;
  rel: ThemeNavbarCompassIndexCompassPropsSiteLogoRel;
  ariaLabel: ThemeNavbarCompassIndexCompassPropsSiteLogoAriaLabel;
};

export type ThemeNavbarCompassIndexCompassPropsItems = ThemeNavbarItem[];

export type ThemeNavbarCompassIndexCompassPropsActionItems = ThemeNavbarItem[];

export type ThemeNavbarCompassIndexCompassPropsColorModeLabel = ReactNode;

export type ThemeNavbarCompassIndexCompassPropsOnColorModeToggle = () => void;

export type ThemeNavbarCompassIndexCompassPropsHamburgerLabel = ReactNode;

export type ThemeNavbarCompassIndexCompassPropsOnMenuToggle = () => void;

export type ThemeNavbarCompassIndexCompassPropsActiveItemLabel = string | null;

export type ThemeNavbarCompassIndexCompassPropsClassName = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsStyle = CSSProperties | undefined;

export type ThemeNavbarCompassIndexCompassProps = {
  siteLogo: ThemeNavbarCompassIndexCompassPropsSiteLogo;
  items: ThemeNavbarCompassIndexCompassPropsItems;
  actionItems: ThemeNavbarCompassIndexCompassPropsActionItems;
  colorModeLabel: ThemeNavbarCompassIndexCompassPropsColorModeLabel;
  onColorModeToggle: ThemeNavbarCompassIndexCompassPropsOnColorModeToggle;
  hamburgerLabel: ThemeNavbarCompassIndexCompassPropsHamburgerLabel;
  onMenuToggle: ThemeNavbarCompassIndexCompassPropsOnMenuToggle;
  activeItemLabel: ThemeNavbarCompassIndexCompassPropsActiveItemLabel;
  className?: ThemeNavbarCompassIndexCompassPropsClassName;
  style?: ThemeNavbarCompassIndexCompassPropsStyle;
};

export type ThemeNavbarCompassIndexCompassReturns = React.JSX.Element;

export type ThemeNavbarCompassIndexCompassSiteLogoAlt = string;

export type ThemeNavbarCompassIndexCompassSiteLogoSrcLight = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoSrc = {
  light: ThemeNavbarCompassIndexCompassSiteLogoSrcLight;
  dark: ThemeNavbarCompassIndexCompassSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoWordmark = {
  light: ThemeNavbarCompassIndexCompassSiteLogoWordmarkLight;
  dark: ThemeNavbarCompassIndexCompassSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoTitle = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoHref = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoTarget = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoRel = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogo = {
  alt: ThemeNavbarCompassIndexCompassSiteLogoAlt;
  src: ThemeNavbarCompassIndexCompassSiteLogoSrc;
  wordmark: ThemeNavbarCompassIndexCompassSiteLogoWordmark;
  title: ThemeNavbarCompassIndexCompassSiteLogoTitle;
  href: ThemeNavbarCompassIndexCompassSiteLogoHref;
  target: ThemeNavbarCompassIndexCompassSiteLogoTarget;
  rel: ThemeNavbarCompassIndexCompassSiteLogoRel;
  ariaLabel: ThemeNavbarCompassIndexCompassSiteLogoAriaLabel;
};

export type ThemeNavbarCompassIndexCompassItems = ThemeNavbarItem[];

export type ThemeNavbarCompassIndexCompassActionItems = ThemeNavbarItem[];

export type ThemeNavbarCompassIndexCompassColorModeLabel = ReactNode;

export type ThemeNavbarCompassIndexCompassOnColorModeToggle = () => void;

export type ThemeNavbarCompassIndexCompassHamburgerLabel = ReactNode;

export type ThemeNavbarCompassIndexCompassOnMenuToggle = () => void;

export type ThemeNavbarCompassIndexCompassActiveItemLabel = string | null;

export type ThemeNavbarCompassIndexCompassNavbarClassName = string;

export type ThemeNavbarCompassIndexCompassNavAriaLabel = string;

export type ThemeNavbarCompassIndexCompassOpenMenuAriaLabel = string;

export type ThemeNavbarCompassIndexCompassToggleColorModeAriaLabel = string;

export type ThemeNavbarCompassIndexCompassNavbarItemSpread = Record<string, unknown>;

export type ThemeNavbarCompassIndexCompassNavbarItemKey = string;
