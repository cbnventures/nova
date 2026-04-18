import type { ReactNode } from 'react';

import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Monolith.
 *
 * @since 0.15.0
 */
export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoAlt = string;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrc = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoHref = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogo = {
  alt: ThemeNavbarMonolithIndexMonolithPropsSiteLogoAlt;
  src: ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrc;
  srcDark: ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrcDark;
  wordmark: ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmark;
  wordmarkDark: ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmarkDark;
  title: ThemeNavbarMonolithIndexMonolithPropsSiteLogoTitle;
  href: ThemeNavbarMonolithIndexMonolithPropsSiteLogoHref;
};

export type ThemeNavbarMonolithIndexMonolithPropsItems = ThemeNavbarItem[];

export type ThemeNavbarMonolithIndexMonolithPropsColorModeLabel = ReactNode;

export type ThemeNavbarMonolithIndexMonolithPropsOnColorModeToggle = () => void;

export type ThemeNavbarMonolithIndexMonolithPropsHamburgerLabel = ReactNode;

export type ThemeNavbarMonolithIndexMonolithPropsOnMenuToggle = () => void;

export type ThemeNavbarMonolithIndexMonolithProps = {
  siteLogo: ThemeNavbarMonolithIndexMonolithPropsSiteLogo;
  items: ThemeNavbarMonolithIndexMonolithPropsItems;
  colorModeLabel: ThemeNavbarMonolithIndexMonolithPropsColorModeLabel;
  onColorModeToggle: ThemeNavbarMonolithIndexMonolithPropsOnColorModeToggle;
  hamburgerLabel: ThemeNavbarMonolithIndexMonolithPropsHamburgerLabel;
  onMenuToggle: ThemeNavbarMonolithIndexMonolithPropsOnMenuToggle;
};

export type ThemeNavbarMonolithIndexMonolithReturns = React.JSX.Element;

export type ThemeNavbarMonolithIndexMonolithSiteLogoAlt = string;

export type ThemeNavbarMonolithIndexMonolithSiteLogoSrc = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoSrcDark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoWordmark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoTitle = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoHref = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogo = {
  alt: ThemeNavbarMonolithIndexMonolithSiteLogoAlt;
  src: ThemeNavbarMonolithIndexMonolithSiteLogoSrc;
  srcDark: ThemeNavbarMonolithIndexMonolithSiteLogoSrcDark;
  wordmark: ThemeNavbarMonolithIndexMonolithSiteLogoWordmark;
  wordmarkDark: ThemeNavbarMonolithIndexMonolithSiteLogoWordmarkDark;
  title: ThemeNavbarMonolithIndexMonolithSiteLogoTitle;
  href: ThemeNavbarMonolithIndexMonolithSiteLogoHref;
};

export type ThemeNavbarMonolithIndexMonolithColorModeLabel = ReactNode;

export type ThemeNavbarMonolithIndexMonolithOnColorModeToggle = () => void;

export type ThemeNavbarMonolithIndexMonolithHamburgerLabel = ReactNode;

export type ThemeNavbarMonolithIndexMonolithOnMenuToggle = () => void;

export type ThemeNavbarMonolithIndexMonolithNavbarClassName = string;

export type ThemeNavbarMonolithIndexMonolithOpenMenuAriaLabel = string;

export type ThemeNavbarMonolithIndexMonolithToggleColorModeAriaLabel = string;
