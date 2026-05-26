import type { CSSProperties, ReactNode } from 'react';

import type { ThemeNavbarItem } from '../index.d.ts';

/**
 * Theme - Navbar - Monolith.
 *
 * @since 0.15.0
 */
export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoAlt = string;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrcLight = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrcDark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrc = {
  light: ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrcLight;
  dark: ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmark = {
  light: ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmarkLight;
  dark: ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoTitle = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoHref = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoTarget = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoRel = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsSiteLogo = {
  alt: ThemeNavbarMonolithIndexMonolithPropsSiteLogoAlt;
  src: ThemeNavbarMonolithIndexMonolithPropsSiteLogoSrc;
  wordmark: ThemeNavbarMonolithIndexMonolithPropsSiteLogoWordmark;
  title: ThemeNavbarMonolithIndexMonolithPropsSiteLogoTitle;
  href: ThemeNavbarMonolithIndexMonolithPropsSiteLogoHref;
  target: ThemeNavbarMonolithIndexMonolithPropsSiteLogoTarget;
  rel: ThemeNavbarMonolithIndexMonolithPropsSiteLogoRel;
  ariaLabel: ThemeNavbarMonolithIndexMonolithPropsSiteLogoAriaLabel;
};

export type ThemeNavbarMonolithIndexMonolithPropsItems = ThemeNavbarItem[];

export type ThemeNavbarMonolithIndexMonolithPropsActionItems = ThemeNavbarItem[];

export type ThemeNavbarMonolithIndexMonolithPropsColorModeLabel = ReactNode;

export type ThemeNavbarMonolithIndexMonolithPropsOnColorModeToggle = () => void;

export type ThemeNavbarMonolithIndexMonolithPropsHamburgerLabel = ReactNode;

export type ThemeNavbarMonolithIndexMonolithPropsOnMenuToggle = () => void;

export type ThemeNavbarMonolithIndexMonolithPropsActiveItemLabel = string | null;

export type ThemeNavbarMonolithIndexMonolithPropsClassName = string | undefined;

export type ThemeNavbarMonolithIndexMonolithPropsStyle = CSSProperties | undefined;

export type ThemeNavbarMonolithIndexMonolithProps = {
  siteLogo: ThemeNavbarMonolithIndexMonolithPropsSiteLogo;
  items: ThemeNavbarMonolithIndexMonolithPropsItems;
  actionItems: ThemeNavbarMonolithIndexMonolithPropsActionItems;
  colorModeLabel: ThemeNavbarMonolithIndexMonolithPropsColorModeLabel;
  onColorModeToggle: ThemeNavbarMonolithIndexMonolithPropsOnColorModeToggle;
  hamburgerLabel: ThemeNavbarMonolithIndexMonolithPropsHamburgerLabel;
  onMenuToggle: ThemeNavbarMonolithIndexMonolithPropsOnMenuToggle;
  activeItemLabel: ThemeNavbarMonolithIndexMonolithPropsActiveItemLabel;
  className?: ThemeNavbarMonolithIndexMonolithPropsClassName;
  style?: ThemeNavbarMonolithIndexMonolithPropsStyle;
};

export type ThemeNavbarMonolithIndexMonolithReturns = React.JSX.Element;

export type ThemeNavbarMonolithIndexMonolithSiteLogoAlt = string;

export type ThemeNavbarMonolithIndexMonolithSiteLogoSrcLight = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoSrcDark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoSrc = {
  light: ThemeNavbarMonolithIndexMonolithSiteLogoSrcLight;
  dark: ThemeNavbarMonolithIndexMonolithSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoWordmark = {
  light: ThemeNavbarMonolithIndexMonolithSiteLogoWordmarkLight;
  dark: ThemeNavbarMonolithIndexMonolithSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoTitle = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoHref = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoTarget = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoRel = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarMonolithIndexMonolithSiteLogo = {
  alt: ThemeNavbarMonolithIndexMonolithSiteLogoAlt;
  src: ThemeNavbarMonolithIndexMonolithSiteLogoSrc;
  wordmark: ThemeNavbarMonolithIndexMonolithSiteLogoWordmark;
  title: ThemeNavbarMonolithIndexMonolithSiteLogoTitle;
  href: ThemeNavbarMonolithIndexMonolithSiteLogoHref;
  target: ThemeNavbarMonolithIndexMonolithSiteLogoTarget;
  rel: ThemeNavbarMonolithIndexMonolithSiteLogoRel;
  ariaLabel: ThemeNavbarMonolithIndexMonolithSiteLogoAriaLabel;
};

export type ThemeNavbarMonolithIndexMonolithActionItems = ThemeNavbarItem[];

export type ThemeNavbarMonolithIndexMonolithColorModeLabel = ReactNode;

export type ThemeNavbarMonolithIndexMonolithOnColorModeToggle = () => void;

export type ThemeNavbarMonolithIndexMonolithHamburgerLabel = ReactNode;

export type ThemeNavbarMonolithIndexMonolithOnMenuToggle = () => void;

export type ThemeNavbarMonolithIndexMonolithNavbarClassName = string;

export type ThemeNavbarMonolithIndexMonolithNavAriaLabel = string;

export type ThemeNavbarMonolithIndexMonolithOpenMenuAriaLabel = string;

export type ThemeNavbarMonolithIndexMonolithToggleColorModeAriaLabel = string;

export type ThemeNavbarMonolithIndexMonolithNavbarItemKey = string;

export type ThemeNavbarMonolithIndexMonolithNavbarItemSpread = Record<string, unknown>;
