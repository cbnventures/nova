import type { ReactNode } from 'react';

import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Compass.
 *
 * @since 0.15.0
 */
export type ThemeNavbarCompassIndexCompassPropsSiteLogoAlt = string;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoSrc = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoWordmark = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogoHref = string | undefined;

export type ThemeNavbarCompassIndexCompassPropsSiteLogo = {
  alt: ThemeNavbarCompassIndexCompassPropsSiteLogoAlt;
  src: ThemeNavbarCompassIndexCompassPropsSiteLogoSrc;
  srcDark: ThemeNavbarCompassIndexCompassPropsSiteLogoSrcDark;
  wordmark: ThemeNavbarCompassIndexCompassPropsSiteLogoWordmark;
  wordmarkDark: ThemeNavbarCompassIndexCompassPropsSiteLogoWordmarkDark;
  title: ThemeNavbarCompassIndexCompassPropsSiteLogoTitle;
  href: ThemeNavbarCompassIndexCompassPropsSiteLogoHref;
};

export type ThemeNavbarCompassIndexCompassPropsItems = ThemeNavbarItem[];

export type ThemeNavbarCompassIndexCompassPropsColorModeLabel = ReactNode;

export type ThemeNavbarCompassIndexCompassPropsOnColorModeToggle = () => void;

export type ThemeNavbarCompassIndexCompassPropsHamburgerLabel = ReactNode;

export type ThemeNavbarCompassIndexCompassPropsOnMenuToggle = () => void;

export type ThemeNavbarCompassIndexCompassProps = {
  siteLogo: ThemeNavbarCompassIndexCompassPropsSiteLogo;
  items: ThemeNavbarCompassIndexCompassPropsItems;
  colorModeLabel: ThemeNavbarCompassIndexCompassPropsColorModeLabel;
  onColorModeToggle: ThemeNavbarCompassIndexCompassPropsOnColorModeToggle;
  hamburgerLabel: ThemeNavbarCompassIndexCompassPropsHamburgerLabel;
  onMenuToggle: ThemeNavbarCompassIndexCompassPropsOnMenuToggle;
};

export type ThemeNavbarCompassIndexCompassReturns = React.JSX.Element;

export type ThemeNavbarCompassIndexCompassSiteLogoAlt = string;

export type ThemeNavbarCompassIndexCompassSiteLogoSrc = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoSrcDark = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoWordmark = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoTitle = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogoHref = string | undefined;

export type ThemeNavbarCompassIndexCompassSiteLogo = {
  alt: ThemeNavbarCompassIndexCompassSiteLogoAlt;
  src: ThemeNavbarCompassIndexCompassSiteLogoSrc;
  srcDark: ThemeNavbarCompassIndexCompassSiteLogoSrcDark;
  wordmark: ThemeNavbarCompassIndexCompassSiteLogoWordmark;
  wordmarkDark: ThemeNavbarCompassIndexCompassSiteLogoWordmarkDark;
  title: ThemeNavbarCompassIndexCompassSiteLogoTitle;
  href: ThemeNavbarCompassIndexCompassSiteLogoHref;
};

export type ThemeNavbarCompassIndexCompassItems = ThemeNavbarItem[];

export type ThemeNavbarCompassIndexCompassColorModeLabel = ReactNode;

export type ThemeNavbarCompassIndexCompassOnColorModeToggle = () => void;

export type ThemeNavbarCompassIndexCompassHamburgerLabel = ReactNode;

export type ThemeNavbarCompassIndexCompassOnMenuToggle = () => void;

export type ThemeNavbarCompassIndexCompassNavbarClassName = string;

export type ThemeNavbarCompassIndexCompassOpenMenuAriaLabel = string;

export type ThemeNavbarCompassIndexCompassToggleColorModeAriaLabel = string;

export type ThemeNavbarCompassIndexCompassNavbarItemSpread = Record<string, unknown>;
