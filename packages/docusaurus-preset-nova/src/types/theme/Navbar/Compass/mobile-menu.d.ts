import type { Theme_Navbar_Index_Navbar_Item } from '../index.d.ts';

/**
 * Theme - Navbar - Compass - Mobile Menu.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_IsOpen = boolean;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_OnClose = () => void;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Alt = string;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Src_Light = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Src_Dark = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Src = undefined | {
  light: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Src_Light;
  dark: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Src_Dark;
};

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Light = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Dark = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark = undefined | {
  light: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Light;
  dark: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Dark;
};

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Title = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Href = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Target = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Rel = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_AriaLabel = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo = {
  alt: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Alt;
  src: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Src;
  wordmark: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark;
  title: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Title;
  href: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Href;
  target: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Target;
  rel: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_Rel;
  ariaLabel: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo_AriaLabel;
};

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_ActiveItemLabel = string | null;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Props = {
  isOpen: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_IsOpen;
  onClose: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_OnClose;
  items: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_Items;
  siteLogo: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_SiteLogo;
  activeItemLabel: Theme_Navbar_Compass_MobileMenu_MobileMenu_Props_ActiveItemLabel;
};

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_Returns = React.JSX.Element | null;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Alt = string;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Src_Light = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Src_Dark = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Src = undefined | {
  light: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Src_Light;
  dark: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Src_Dark;
};

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Wordmark_Light = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Wordmark_Dark = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Wordmark = undefined | {
  light: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Wordmark_Light;
  dark: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Wordmark_Dark;
};

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Title = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Href = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Target = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Rel = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_AriaLabel = string | undefined;

export type Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo = {
  alt: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Alt;
  src: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Src;
  wordmark: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Wordmark;
  title: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Title;
  href: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Href;
  target: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Target;
  rel: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_Rel;
  ariaLabel: Theme_Navbar_Compass_MobileMenu_MobileMenu_SiteLogo_AriaLabel;
};
