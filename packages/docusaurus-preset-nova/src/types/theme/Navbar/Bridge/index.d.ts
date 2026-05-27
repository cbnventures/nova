import type { CSSProperties, ReactNode } from 'react';

import type { Theme_Navbar_Index_Navbar_Item } from '../index.d.ts';

/**
 * Theme - Navbar - Bridge.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Alt = string;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Src_Light = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Src_Dark = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Src = {
  light: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Src_Light;
  dark: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Src_Dark;
} | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Wordmark_Light = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Wordmark_Dark = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Wordmark = {
  light: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Wordmark_Light;
  dark: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Wordmark_Dark;
} | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Title = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Href = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Target = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Rel = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_AriaLabel = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo = {
  alt: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Alt;
  src: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Src;
  wordmark: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Wordmark;
  title: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Title;
  href: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Href;
  target: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Target;
  rel: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_Rel;
  ariaLabel: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo_AriaLabel;
};

export type Theme_Navbar_Bridge_Index_Bridge_Props_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Bridge_Index_Bridge_Props_ActionItems = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Bridge_Index_Bridge_Props_ColorModeLabel = ReactNode;

export type Theme_Navbar_Bridge_Index_Bridge_Props_OnColorModeToggle = () => void;

export type Theme_Navbar_Bridge_Index_Bridge_Props_HamburgerLabel = ReactNode;

export type Theme_Navbar_Bridge_Index_Bridge_Props_OnMenuToggle = () => void;

export type Theme_Navbar_Bridge_Index_Bridge_Props_ActiveItemLabel = string | null;

export type Theme_Navbar_Bridge_Index_Bridge_Props_ClassName = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props_Style = CSSProperties | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_Props = {
  siteLogo: Theme_Navbar_Bridge_Index_Bridge_Props_SiteLogo;
  items: Theme_Navbar_Bridge_Index_Bridge_Props_Items;
  actionItems: Theme_Navbar_Bridge_Index_Bridge_Props_ActionItems;
  colorModeLabel: Theme_Navbar_Bridge_Index_Bridge_Props_ColorModeLabel;
  onColorModeToggle: Theme_Navbar_Bridge_Index_Bridge_Props_OnColorModeToggle;
  hamburgerLabel: Theme_Navbar_Bridge_Index_Bridge_Props_HamburgerLabel;
  onMenuToggle: Theme_Navbar_Bridge_Index_Bridge_Props_OnMenuToggle;
  activeItemLabel: Theme_Navbar_Bridge_Index_Bridge_Props_ActiveItemLabel;
  className?: Theme_Navbar_Bridge_Index_Bridge_Props_ClassName;
  style?: Theme_Navbar_Bridge_Index_Bridge_Props_Style;
};

export type Theme_Navbar_Bridge_Index_Bridge_Returns = React.JSX.Element;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Alt = string;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Src_Light = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Src_Dark = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Src = {
  light: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Src_Light;
  dark: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Src_Dark;
} | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Wordmark_Light = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Wordmark_Dark = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Wordmark = {
  light: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Wordmark_Light;
  dark: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Wordmark_Dark;
} | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Title = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Href = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Target = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Rel = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo_AriaLabel = string | undefined;

export type Theme_Navbar_Bridge_Index_Bridge_SiteLogo = {
  alt: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Alt;
  src: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Src;
  wordmark: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Wordmark;
  title: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Title;
  href: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Href;
  target: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Target;
  rel: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_Rel;
  ariaLabel: Theme_Navbar_Bridge_Index_Bridge_SiteLogo_AriaLabel;
};

export type Theme_Navbar_Bridge_Index_Bridge_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Bridge_Index_Bridge_ActionItems = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Bridge_Index_Bridge_ColorModeLabel = ReactNode;

export type Theme_Navbar_Bridge_Index_Bridge_OnColorModeToggle = () => void;

export type Theme_Navbar_Bridge_Index_Bridge_HamburgerLabel = ReactNode;

export type Theme_Navbar_Bridge_Index_Bridge_OnMenuToggle = () => void;

export type Theme_Navbar_Bridge_Index_Bridge_ActiveItemLabel = string | null;

export type Theme_Navbar_Bridge_Index_Bridge_NavbarClassName = string;

export type Theme_Navbar_Bridge_Index_Bridge_NavAriaLabel = string;

export type Theme_Navbar_Bridge_Index_Bridge_OpenMenuAriaLabel = string;

export type Theme_Navbar_Bridge_Index_Bridge_ToggleColorModeAriaLabel = string;

export type Theme_Navbar_Bridge_Index_Bridge_NavbarItemSpread = Record<string, unknown>;

export type Theme_Navbar_Bridge_Index_Bridge_NavbarItemKey = string;
