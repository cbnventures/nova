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
  SharedPresetLogo,
  SharedPresetNavbar,
} from '../../shared.d.ts';

/**
 * Theme - Navbar.
 *
 * @since 0.15.0
 */
export type ThemeNavbarPropsClassName = string | undefined;

export type ThemeNavbarPropsStyle = CSSProperties | undefined;

export type ThemeNavbarProps = {
  className?: ThemeNavbarPropsClassName;
  style?: ThemeNavbarPropsStyle;
};

export type ThemeNavbarThemeConfigCast = unknown;

export type ThemeNavbarThemeConfig = Record<string, unknown>;

export type ThemeNavbarSiteConfigTitle = string;

export type ThemeNavbarSiteConfig = {
  title: ThemeNavbarSiteConfigTitle;
  [key: string]: unknown;
};

export type ThemeNavbarNavbarConfigTitle = string | undefined;

export type ThemeNavbarNavbarConfigItems = ThemeNavbarItem[];

export type ThemeNavbarNavbarConfig = {
  title: ThemeNavbarNavbarConfigTitle;
  items: ThemeNavbarNavbarConfigItems;
  [key: string]: unknown;
};

export type ThemeNavbarColorMode = 'light' | 'dark';

export type ThemeNavbarColorModeStateColorMode = ThemeNavbarColorMode;

export type ThemeNavbarColorModeStateColorModeChoice = ThemeNavbarColorModeChoice;

export type ThemeNavbarColorModeStateSetColorMode = ThemeNavbarSetColorMode;

export type ThemeNavbarColorModeState = {
  readonly colorMode: ThemeNavbarColorModeStateColorMode;
  readonly colorModeChoice: ThemeNavbarColorModeStateColorModeChoice;
  readonly setColorMode: ThemeNavbarColorModeStateSetColorMode;
  [key: string]: unknown;
};

export type ThemeNavbarColorModeChoice = ThemeNavbarColorMode | null;

export type ThemeNavbarSetColorMode = (colorMode: ThemeNavbarColorModeChoice) => void;

export type ThemeNavbarSiteTitle = string;

export type ThemeNavbarIndexPluginData = Record<string, unknown>;

export type ThemeNavbarIndexPresetLogo = SharedPresetLogo | undefined;

export type ThemeNavbarIndexUserLogo = Record<string, unknown> | undefined;

export type ThemeNavbarIndexUserLogoSrcLight = string | undefined;

export type ThemeNavbarIndexUserLogoSrcDark = string | undefined;

export type ThemeNavbarIndexUserLogoSrc = {
  light: ThemeNavbarIndexUserLogoSrcLight;
  dark: ThemeNavbarIndexUserLogoSrcDark;
} | undefined;

export type ThemeNavbarIndexUserLogoWordmarkLight = string | undefined;

export type ThemeNavbarIndexUserLogoWordmarkDark = string | undefined;

export type ThemeNavbarIndexUserLogoWordmark = {
  light: ThemeNavbarIndexUserLogoWordmarkLight;
  dark: ThemeNavbarIndexUserLogoWordmarkDark;
} | undefined;

export type ThemeNavbarIndexUserLogoTitle = string | undefined;

export type ThemeNavbarIndexUserLogoAlt = string | undefined;

export type ThemeNavbarIndexUserLogoHref = string | undefined;

export type ThemeNavbarIndexUserLogoTarget = string | undefined;

export type ThemeNavbarIndexUserLogoRel = string | undefined;

export type ThemeNavbarIndexUserLogoAriaLabel = string | undefined;

export type ThemeNavbarIndexPresetLogoSrc = string | undefined;

export type ThemeNavbarIndexPresetLogoTitle = string | undefined;

export type ThemeNavbarIndexPresetLogoAlt = string | undefined;

export type ThemeNavbarIndexSiteLogoSrcLight = string | undefined;

export type ThemeNavbarIndexSiteLogoSrcDark = string | undefined;

export type ThemeNavbarIndexSiteLogoSrc = {
  light: ThemeNavbarIndexSiteLogoSrcLight;
  dark: ThemeNavbarIndexSiteLogoSrcDark;
} | undefined;

export type ThemeNavbarIndexSiteLogoWordmarkLight = string | undefined;

export type ThemeNavbarIndexSiteLogoWordmarkDark = string | undefined;

export type ThemeNavbarIndexSiteLogoWordmark = {
  light: ThemeNavbarIndexSiteLogoWordmarkLight;
  dark: ThemeNavbarIndexSiteLogoWordmarkDark;
} | undefined;

export type ThemeNavbarIndexSiteLogoTitle = string | undefined;

export type ThemeNavbarIndexSiteLogoAlt = string;

export type ThemeNavbarIndexSiteLogoHref = string | undefined;

export type ThemeNavbarIndexSiteLogoTarget = string | undefined;

export type ThemeNavbarIndexSiteLogoRel = string | undefined;

export type ThemeNavbarIndexSiteLogoAriaLabel = string | undefined;

export type ThemeNavbarIndexSiteLogo = {
  src: ThemeNavbarIndexSiteLogoSrc;
  wordmark: ThemeNavbarIndexSiteLogoWordmark;
  title: ThemeNavbarIndexSiteLogoTitle;
  alt: ThemeNavbarIndexSiteLogoAlt;
  href: ThemeNavbarIndexSiteLogoHref;
  target: ThemeNavbarIndexSiteLogoTarget;
  rel: ThemeNavbarIndexSiteLogoRel;
  ariaLabel: ThemeNavbarIndexSiteLogoAriaLabel;
};

export type ThemeNavbarIndexHideOnScroll = boolean;

export type ThemeNavbarItems = ThemeNavbarItem[];

export type ThemeNavbarItemLabel = string;

export type ThemeNavbarItemTo = string | undefined;

export type ThemeNavbarItemHref = string | undefined;

export type ThemeNavbarItem = {
  label: ThemeNavbarItemLabel;
  to?: ThemeNavbarItemTo;
  href?: ThemeNavbarItemHref;
  [key: string]: unknown;
};

export type ThemeNavbarIndexGlobalData = Record<string, unknown>;

export type ThemeNavbarIndexNavbarVariant = SharedPresetNavbar;

export type ThemeNavbarIndexNavbarHiddenState = [ThemeNavbarIndexNavbarHidden, ThemeNavbarIndexSetNavbarHidden];

export type ThemeNavbarIndexNavbarHidden = boolean;

export type ThemeNavbarIndexSetNavbarHidden = Dispatch<SetStateAction<ThemeNavbarIndexNavbarHidden>>;

export type ThemeNavbarIndexLastScrollPositionRef = RefObject<number>;

export type ThemeNavbarIndexIsMenuOpenState = [ThemeNavbarIndexIsMenuOpen, ThemeNavbarIndexSetIsMenuOpen];

export type ThemeNavbarIndexIsMenuOpen = boolean;

export type ThemeNavbarIndexSetIsMenuOpen = Dispatch<SetStateAction<ThemeNavbarIndexIsMenuOpen>>;

export type ThemeNavbarNavbarColorModeSystemLabel = string;

export type ThemeNavbarNavbarColorModeLightLabel = string;

export type ThemeNavbarNavbarColorModeDarkLabel = string;

export type ThemeNavbarNavbarMenuButtonLabel = string;

export type ThemeNavbarColorModeLabel = ReactNode;

export type ThemeNavbarIndexHamburgerLabel = ReactNode;

export type ThemeNavbarIndexNavbarClassName = string;

export type ThemeNavbarIndexVariantPropsSiteLogo = ThemeNavbarIndexSiteLogo;

export type ThemeNavbarIndexVariantPropsItems = ThemeNavbarItems;

export type ThemeNavbarIndexVariantPropsActionItems = ThemeNavbarItems;

export type ThemeNavbarIndexVariantPropsColorModeLabel = ThemeNavbarColorModeLabel;

export type ThemeNavbarIndexVariantPropsOnColorModeToggle = () => void;

export type ThemeNavbarIndexVariantPropsHamburgerLabel = ReactNode;

export type ThemeNavbarIndexVariantPropsOnMenuToggle = () => void;

export type ThemeNavbarIndexVariantPropsActiveItemLabel = string | null;

export type ThemeNavbarIndexVariantProps = {
  siteLogo: ThemeNavbarIndexVariantPropsSiteLogo;
  items: ThemeNavbarIndexVariantPropsItems;
  actionItems: ThemeNavbarIndexVariantPropsActionItems;
  colorModeLabel: ThemeNavbarIndexVariantPropsColorModeLabel;
  onColorModeToggle: ThemeNavbarIndexVariantPropsOnColorModeToggle;
  hamburgerLabel: ThemeNavbarIndexVariantPropsHamburgerLabel;
  onMenuToggle: ThemeNavbarIndexVariantPropsOnMenuToggle;
  activeItemLabel: ThemeNavbarIndexVariantPropsActiveItemLabel;
};

export type ThemeNavbarIndexSvgFilterDefinition = ReactNode;

export type ThemeNavbarItemLinkTo = string;

export type ThemeNavbarItemSpread = Record<string, unknown>;

/**
 * Theme - Navbar - Navbar.
 *
 * @since 0.15.0
 */
export type ThemeNavbarIndexActionItemTypes = Set<string>;

export type ThemeNavbarIndexActionItemType = string;

export type ThemeNavbarIndexThemeChoice = string | null;

/**
 * Theme - Navbar - Navbar - Apply System Mode.
 *
 * @since 0.15.0
 */
export type ThemeNavbarIndexSystemColorMode = 'light' | 'dark';

export type ThemeNavbarIndexMediaQuery = MediaQueryList;

/**
 * Theme - Navbar - Navbar - Handle Scroll.
 *
 * @since 0.15.0
 */
export type ThemeNavbarIndexCurrentScrollPosition = number;

export type ThemeNavbarIndexIsScrollingDown = boolean;

/**
 * Theme - Navbar - Navbar - Resolve Mobile Items.
 *
 * @since 0.15.0
 */
export type ThemeNavbarIndexAllDocsData = Record<string, GlobalPluginData>;

export type ThemeNavbarIndexResolvedItems = ThemeNavbarItem[];

export type ThemeNavbarIndexResolvedItemType = string | undefined;

export type ThemeNavbarIndexResolvedItemPluginId = string;

export type ThemeNavbarIndexResolvedItemPluginData = GlobalPluginData | undefined;

export type ThemeNavbarIndexResolvedItemDocId = string;

export type ThemeNavbarIndexResolvedItemAllDocs = GlobalDoc[];

export type ThemeNavbarIndexResolvedItemVersion = GlobalVersion;

export type ThemeNavbarIndexResolvedItemMatchedDoc = GlobalDoc | undefined;

export type ThemeNavbarIndexResolvedItemDocCandidate = GlobalDoc;

export type ThemeNavbarIndexResolvedItem = ThemeNavbarItem;

export type ThemeNavbarIndexResolvedItemSidebarId = string;

export type ThemeNavbarIndexResolvedItemMatchedVersion = GlobalVersion | undefined;

export type ThemeNavbarIndexResolvedItemVersionSidebarsOrUndefined = Record<string, GlobalSidebar> | undefined;

export type ThemeNavbarIndexResolvedItemSidebar = GlobalSidebar | undefined;

export type ThemeNavbarIndexResolvedItemVersionSidebars = Record<string, GlobalSidebar>;

export type ThemeNavbarIndexResolvedItemSidebarLinkLabel = string;

export type ThemeNavbarIndexResolvedItemSidebarLinkPath = string;

export type ThemeNavbarIndexResolvedItemSidebarLink = {
  label: ThemeNavbarIndexResolvedItemSidebarLinkLabel;
  path: ThemeNavbarIndexResolvedItemSidebarLinkPath;
} | undefined;
