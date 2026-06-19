import type { Theme_Navbar_Index_Navbar_Item } from '../index.d.ts';

/**
 * Theme - Navbar - Canopy - Mobile Menu.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_IsOpen = boolean;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_OnClose = () => void;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Alt = string;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src_Light = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src_Dark = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src_Object_Light = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src_Object_Dark = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src_Object = {
  light: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src_Object_Light;
  dark: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src_Object_Dark;
};

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src = Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src_Object | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Light = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Dark = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Object_Light = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Object_Dark = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Object = {
  light: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Object_Light;
  dark: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Object_Dark;
};

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark = Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark_Object | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Title = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Href = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Target = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Rel = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_AriaLabel = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo = {
  alt: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Alt;
  src: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Src;
  wordmark: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Wordmark;
  title: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Title;
  href: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Href;
  target: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Target;
  rel: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_Rel;
  ariaLabel: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo_AriaLabel;
};

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_ActiveItemLabel = string | null;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props = {
  isOpen: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_IsOpen;
  onClose: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_OnClose;
  items: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_Items;
  siteLogo: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_SiteLogo;
  activeItemLabel: Theme_Navbar_Canopy_MobileMenu_MobileMenu_Props_ActiveItemLabel;
};

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Returns = React.JSX.Element | null;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsOpen = boolean;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_OnClose = () => void;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Alt = string;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Src_Object_Light = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Src_Object_Dark = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Src_Object = {
  light: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Src_Object_Light;
  dark: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Src_Object_Dark;
};

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Src = Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Src_Object | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Wordmark_Object_Light = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Wordmark_Object_Dark = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Wordmark_Object = {
  light: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Wordmark_Object_Light;
  dark: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Wordmark_Object_Dark;
};

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Wordmark = Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Wordmark_Object | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Title = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Href = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Target = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Rel = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_AriaLabel = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo = {
  alt: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Alt;
  src: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Src;
  wordmark: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Wordmark;
  title: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Title;
  href: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Href;
  target: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Target;
  rel: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_Rel;
  ariaLabel: Theme_Navbar_Canopy_MobileMenu_MobileMenu_SiteLogo_AriaLabel;
};

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_ActiveItemLabel = string | null;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_PanelRef = React.RefObject<HTMLDivElement | null>;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsClosing = boolean;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsClosingState = [Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsClosing, Theme_Navbar_Canopy_MobileMenu_MobileMenu_SetIsClosing];

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_SetIsClosing = React.Dispatch<React.SetStateAction<Theme_Navbar_Canopy_MobileMenu_MobileMenu_IsClosing>>;

/**
 * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu - Handle Escape.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleEscapeFunction = (event: Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleEscapeKeyboardEvent) => void;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleEscapeKeyboardEvent = KeyboardEvent;

/**
 * Theme - Navbar - Canopy - Mobile Menu - Mobile Menu - Handle Click Outside.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideFunction = (event: Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideMouseEvent) => void;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideMouseEvent = React.MouseEvent<HTMLDivElement>;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_HandleClickOutsideMouseTarget = EventTarget | null;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_FocusTarget = HTMLButtonElement | null;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_AriaLabel = string;

export type Theme_Navbar_Canopy_MobileMenu_CloseMenuAriaLabel = string;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_OverlayClassName = string;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_AnimationEvent = React.AnimationEvent<HTMLDivElement>;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIndex = number;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIcon = string | undefined;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_DefaultIcon = string;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemStyle = React.CSSProperties;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemTo = string;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemHref = string;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_LinkProps = Record<string, string>;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_ItemIsActive = boolean;

export type Theme_Navbar_Canopy_MobileMenu_MobileMenu_LinkSpread = Record<string, string>;
