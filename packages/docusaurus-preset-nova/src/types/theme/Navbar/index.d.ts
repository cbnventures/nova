import type {
  GlobalDoc,
  GlobalPluginData,
  GlobalSidebar,
  GlobalVersion,
} from '@docusaurus/plugin-content-docs/client';
import type {
  CSSProperties,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react';

import type {
  Shared_Preset_Logo,
  Shared_Preset_Navbar,
} from '../../shared.d.ts';

/**
 * Theme - Navbar.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Index_PluginData = Record<string, unknown>;

export type Theme_Navbar_Index_PresetLogo = Shared_Preset_Logo | undefined;

export type Theme_Navbar_Index_UserLogo = Record<string, unknown> | undefined;

export type Theme_Navbar_Index_UserLogoSrc_Value_Light = string | undefined;

export type Theme_Navbar_Index_UserLogoSrc_Value_Dark = string | undefined;

export type Theme_Navbar_Index_UserLogoSrc_Value = {
  light: Theme_Navbar_Index_UserLogoSrc_Value_Light;
  dark: Theme_Navbar_Index_UserLogoSrc_Value_Dark;
};

export type Theme_Navbar_Index_UserLogoSrc = Theme_Navbar_Index_UserLogoSrc_Value | undefined;

export type Theme_Navbar_Index_UserLogoWordmark_Value_Light = string | undefined;

export type Theme_Navbar_Index_UserLogoWordmark_Value_Dark = string | undefined;

export type Theme_Navbar_Index_UserLogoWordmark_Value = {
  light: Theme_Navbar_Index_UserLogoWordmark_Value_Light;
  dark: Theme_Navbar_Index_UserLogoWordmark_Value_Dark;
};

export type Theme_Navbar_Index_UserLogoWordmark = Theme_Navbar_Index_UserLogoWordmark_Value | undefined;

export type Theme_Navbar_Index_UserLogoAlt = string | undefined;

export type Theme_Navbar_Index_UserLogoHref = string | undefined;

export type Theme_Navbar_Index_UserLogoTarget = string | undefined;

export type Theme_Navbar_Index_UserLogoRel = string | undefined;

export type Theme_Navbar_Index_UserLogoAriaLabel = string | undefined;

export type Theme_Navbar_Index_PresetLogoSrc = string | undefined;

export type Theme_Navbar_Index_PresetLogoAlt = string | undefined;

export type Theme_Navbar_Index_SiteLogo_Src_Value_Light = string | undefined;

export type Theme_Navbar_Index_SiteLogo_Src_Value_Dark = string | undefined;

export type Theme_Navbar_Index_SiteLogo_Src_Value = {
  light: Theme_Navbar_Index_SiteLogo_Src_Value_Light;
  dark: Theme_Navbar_Index_SiteLogo_Src_Value_Dark;
};

export type Theme_Navbar_Index_SiteLogo_Src = Theme_Navbar_Index_SiteLogo_Src_Value | undefined;

export type Theme_Navbar_Index_SiteLogo_Wordmark_Value_Light = string | undefined;

export type Theme_Navbar_Index_SiteLogo_Wordmark_Value_Dark = string | undefined;

export type Theme_Navbar_Index_SiteLogo_Wordmark_Value = {
  light: Theme_Navbar_Index_SiteLogo_Wordmark_Value_Light;
  dark: Theme_Navbar_Index_SiteLogo_Wordmark_Value_Dark;
};

export type Theme_Navbar_Index_SiteLogo_Wordmark = Theme_Navbar_Index_SiteLogo_Wordmark_Value | undefined;

export type Theme_Navbar_Index_SiteLogo_Title = string | undefined;

export type Theme_Navbar_Index_SiteLogo_Alt = string;

export type Theme_Navbar_Index_SiteLogo_Href = string | undefined;

export type Theme_Navbar_Index_SiteLogo_Target = string | undefined;

export type Theme_Navbar_Index_SiteLogo_Rel = string | undefined;

export type Theme_Navbar_Index_SiteLogo_AriaLabel = string | undefined;

export type Theme_Navbar_Index_SiteLogo = {
  src: Theme_Navbar_Index_SiteLogo_Src;
  wordmark: Theme_Navbar_Index_SiteLogo_Wordmark;
  title: Theme_Navbar_Index_SiteLogo_Title;
  alt: Theme_Navbar_Index_SiteLogo_Alt;
  href: Theme_Navbar_Index_SiteLogo_Href;
  target: Theme_Navbar_Index_SiteLogo_Target;
  rel: Theme_Navbar_Index_SiteLogo_Rel;
  ariaLabel: Theme_Navbar_Index_SiteLogo_AriaLabel;
};

export type Theme_Navbar_Index_HideOnScroll = boolean;

export type Theme_Navbar_Index_ActionItemTypes = Set<string>;

export type Theme_Navbar_Index_ActionItemType = string;

export type Theme_Navbar_Index_AllDocsData = Record<string, GlobalPluginData>;

export type Theme_Navbar_Index_ResolvedItem = Theme_Navbar_Index_Navbar_Item;

export type Theme_Navbar_Index_ResolvedItems = Theme_Navbar_Index_ResolvedItem[];

export type Theme_Navbar_Index_ResolvedItemType = string | undefined;

export type Theme_Navbar_Index_ResolvedItemPluginId = string;

export type Theme_Navbar_Index_ResolvedItemPluginData = GlobalPluginData | undefined;

export type Theme_Navbar_Index_ResolvedItemDocId = string;

export type Theme_Navbar_Index_ResolvedItemAllDocs = GlobalDoc[];

export type Theme_Navbar_Index_ResolvedItemVersion = GlobalVersion;

export type Theme_Navbar_Index_ResolvedItemMatchedDoc = GlobalDoc | undefined;

export type Theme_Navbar_Index_ResolvedItemDocCandidate = GlobalDoc;

export type Theme_Navbar_Index_ResolvedItemSidebarId = string;

export type Theme_Navbar_Index_ResolvedItemMatchedVersion = GlobalVersion | undefined;

export type Theme_Navbar_Index_ResolvedItemVersionSidebarsOrUndefined = Record<string, GlobalSidebar> | undefined;

export type Theme_Navbar_Index_ResolvedItemSidebar = GlobalSidebar | undefined;

export type Theme_Navbar_Index_ResolvedItemVersionSidebars = Record<string, GlobalSidebar>;

export type Theme_Navbar_Index_ResolvedItemSidebarLink_Value_Label = string;

export type Theme_Navbar_Index_ResolvedItemSidebarLink_Value_Path = string;

export type Theme_Navbar_Index_ResolvedItemSidebarLink_Value = {
  label: Theme_Navbar_Index_ResolvedItemSidebarLink_Value_Label;
  path: Theme_Navbar_Index_ResolvedItemSidebarLink_Value_Path;
};

export type Theme_Navbar_Index_ResolvedItemSidebarLink = Theme_Navbar_Index_ResolvedItemSidebarLink_Value | undefined;

export type Theme_Navbar_Index_GlobalData = Record<string, unknown>;

export type Theme_Navbar_Index_SetNavbarHidden = Dispatch<SetStateAction<Theme_Navbar_Index_Navbar_Hidden>>;

export type Theme_Navbar_Index_LastScrollPositionRef = RefObject<number>;

export type Theme_Navbar_Index_IsMenuOpen = boolean;

export type Theme_Navbar_Index_IsMenuOpenState = [Theme_Navbar_Index_IsMenuOpen, Theme_Navbar_Index_SetIsMenuOpen];

export type Theme_Navbar_Index_SetIsMenuOpen = Dispatch<SetStateAction<Theme_Navbar_Index_IsMenuOpen>>;

export type Theme_Navbar_Index_ThemeChoice = string | null;

export type Theme_Navbar_Index_HamburgerLabel = ReactNode;

export type Theme_Navbar_Index_VariantProps_SiteLogo = Theme_Navbar_Index_SiteLogo;

export type Theme_Navbar_Index_VariantProps_Items = Theme_Navbar_Index_Navbar_Items;

export type Theme_Navbar_Index_VariantProps_ActionItems = Theme_Navbar_Index_Navbar_Items;

export type Theme_Navbar_Index_VariantProps_ColorModeLabel = Theme_Navbar_Index_Navbar_ColorModeLabel;

export type Theme_Navbar_Index_VariantProps_OnColorModeToggle = () => void;

export type Theme_Navbar_Index_VariantProps_HamburgerLabel = ReactNode;

export type Theme_Navbar_Index_VariantProps_OnMenuToggle = () => void;

export type Theme_Navbar_Index_VariantProps_ActiveItemLabel = string | null;

export type Theme_Navbar_Index_VariantProps = {
  siteLogo: Theme_Navbar_Index_VariantProps_SiteLogo;
  items: Theme_Navbar_Index_VariantProps_Items;
  actionItems: Theme_Navbar_Index_VariantProps_ActionItems;
  colorModeLabel: Theme_Navbar_Index_VariantProps_ColorModeLabel;
  onColorModeToggle: Theme_Navbar_Index_VariantProps_OnColorModeToggle;
  hamburgerLabel: Theme_Navbar_Index_VariantProps_HamburgerLabel;
  onMenuToggle: Theme_Navbar_Index_VariantProps_OnMenuToggle;
  activeItemLabel: Theme_Navbar_Index_VariantProps_ActiveItemLabel;
};

export type Theme_Navbar_Index_SvgFilterDefinition = ReactNode;

/**
 * Theme - Navbar - Navbar.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Index_Navbar_Props_ClassName = string | undefined;

export type Theme_Navbar_Index_Navbar_Props_Style = CSSProperties | undefined;

export type Theme_Navbar_Index_Navbar_Props = {
  className?: Theme_Navbar_Index_Navbar_Props_ClassName;
  style?: Theme_Navbar_Index_Navbar_Props_Style;
};

export type Theme_Navbar_Index_Navbar_ThemeConfigCast = unknown;

export type Theme_Navbar_Index_Navbar_ThemeConfig = Record<string, unknown>;

export type Theme_Navbar_Index_Navbar_DocusaurusContext = ReturnType<typeof import('@docusaurus/useDocusaurusContext').default>;

export type Theme_Navbar_Index_Navbar_SiteTitle = string;

export type Theme_Navbar_Index_Navbar_SiteConfig = {
  [key: string]: unknown;
};

export type Theme_Navbar_Index_Navbar_Item_Label = string;

export type Theme_Navbar_Index_Navbar_Item_To = string | undefined;

export type Theme_Navbar_Index_Navbar_Item_Href = string | undefined;

export type Theme_Navbar_Index_Navbar_Item = {
  label: Theme_Navbar_Index_Navbar_Item_Label;
  to?: Theme_Navbar_Index_Navbar_Item_To;
  href?: Theme_Navbar_Index_Navbar_Item_Href;
  [key: string]: unknown;
};

export type Theme_Navbar_Index_Navbar_Config_Title = string | undefined;

export type Theme_Navbar_Index_Navbar_Config_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Index_Navbar_Config = {
  title: Theme_Navbar_Index_Navbar_Config_Title;
  items: Theme_Navbar_Index_Navbar_Config_Items;
  [key: string]: unknown;
};

export type Theme_Navbar_Index_Navbar_ColorMode = 'light' | 'dark';

export type Theme_Navbar_Index_Navbar_ColorModeStateColorMode = Theme_Navbar_Index_Navbar_ColorMode;

export type Theme_Navbar_Index_Navbar_ColorModeStateColorModeChoice = Theme_Navbar_Index_Navbar_ColorModeChoice;

export type Theme_Navbar_Index_Navbar_ColorModeStateSetColorMode = Theme_Navbar_Index_Navbar_SetColorMode;

export type Theme_Navbar_Index_Navbar_ColorModeState = {
  readonly colorMode: Theme_Navbar_Index_Navbar_ColorModeStateColorMode;
  readonly colorModeChoice: Theme_Navbar_Index_Navbar_ColorModeStateColorModeChoice;
  readonly setColorMode: Theme_Navbar_Index_Navbar_ColorModeStateSetColorMode;
  [key: string]: unknown;
};

export type Theme_Navbar_Index_Navbar_ColorModeChoice = Theme_Navbar_Index_Navbar_ColorMode | null;

export type Theme_Navbar_Index_Navbar_SetColorMode = (colorMode: Theme_Navbar_Index_Navbar_ColorModeChoice) => void;

export type Theme_Navbar_Index_Navbar_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Index_Navbar_Variant = Shared_Preset_Navbar;

export type Theme_Navbar_Index_Navbar_Hidden = boolean;

export type Theme_Navbar_Index_Navbar_HiddenState = [Theme_Navbar_Index_Navbar_Hidden, Theme_Navbar_Index_SetNavbarHidden];

export type Theme_Navbar_Index_Navbar_ColorModeSystemLabel = string;

export type Theme_Navbar_Index_Navbar_ColorModeLightLabel = string;

export type Theme_Navbar_Index_Navbar_ColorModeDarkLabel = string;

export type Theme_Navbar_Index_Navbar_MenuButtonLabel = string;

export type Theme_Navbar_Index_Navbar_ColorModeLabel = ReactNode;

export type Theme_Navbar_Index_Navbar_ClassName = string;

export type Theme_Navbar_Index_Navbar_ItemLinkTo = string;

export type Theme_Navbar_Index_Navbar_ItemSpread = Record<string, unknown>;

/**
 * Theme - Navbar - Navbar - Apply System Mode.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Index_Navbar_ApplySystemMode_SystemColorMode = 'light' | 'dark';

export type Theme_Navbar_Index_Navbar_ApplySystemMode_MediaQuery = MediaQueryList;

/**
 * Theme - Navbar - Navbar - Handle Scroll.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Index_Navbar_HandleScroll_CurrentScrollPosition = number;

export type Theme_Navbar_Index_Navbar_HandleScroll_IsScrollingDown = boolean;
