import type {
  ActiveDocContext,
  GlobalDoc,
  GlobalSidebar,
  GlobalVersion,
} from '@docusaurus/plugin-content-docs/client';
import type {
  DocusaurusContext,
  I18nLocaleConfig,
} from '@docusaurus/types';
import type { ComponentType, CSSProperties, ReactNode } from 'react';

/**
 * Theme - Navbar Item - Component Types.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_ComponentTypes_Map = Record<string, ComponentType<any>>;

/**
 * Theme - Navbar Item - Default Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_DefaultNavbarItem_Props_Label = string | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_Props_To = string | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_Props_Href = string | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_Props_ActiveBaseRegex = string | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_Props_IsActiveItem = boolean | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_Props = {
  label?: Theme_NavbarItem_DefaultNavbarItem_Props_Label;
  to?: Theme_NavbarItem_DefaultNavbarItem_Props_To;
  href?: Theme_NavbarItem_DefaultNavbarItem_Props_Href;
  activeBaseRegex?: Theme_NavbarItem_DefaultNavbarItem_Props_ActiveBaseRegex;
  isActiveItem?: Theme_NavbarItem_DefaultNavbarItem_Props_IsActiveItem;
  [key: string]: unknown;
};

export type Theme_NavbarItem_DefaultNavbarItem_Label = string | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_To = string | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_Href = string | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_ActiveBaseRegex = string | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_Pathname = string;

export type Theme_NavbarItem_DefaultNavbarItem_IsActive = boolean;

export type Theme_NavbarItem_DefaultNavbarItem_AriaCurrent = 'page' | undefined;

export type Theme_NavbarItem_DefaultNavbarItem_LinkSpread = Record<string, unknown>;

/**
 * Theme - Navbar Item - Doc Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_DocNavbarItem_Props_DocId = string;

export type Theme_NavbarItem_DocNavbarItem_Props_Label = string | undefined;

export type Theme_NavbarItem_DocNavbarItem_Props_DocsPluginId = string | undefined;

export type Theme_NavbarItem_DocNavbarItem_Props_IsActiveItem = boolean | undefined;

export type Theme_NavbarItem_DocNavbarItem_Props = {
  docId: Theme_NavbarItem_DocNavbarItem_Props_DocId;
  label?: Theme_NavbarItem_DocNavbarItem_Props_Label;
  docsPluginId?: Theme_NavbarItem_DocNavbarItem_Props_DocsPluginId;
  isActiveItem?: Theme_NavbarItem_DocNavbarItem_Props_IsActiveItem;
  [key: string]: unknown;
};

export type Theme_NavbarItem_DocNavbarItem_ActiveDocContext = ActiveDocContext;

export type Theme_NavbarItem_DocNavbarItem_LayoutDoc = GlobalDoc | null;

export type Theme_NavbarItem_DocNavbarItem_Pathname = string;

export type Theme_NavbarItem_DocNavbarItem_PageActive = boolean;

export type Theme_NavbarItem_DocNavbarItem_Label = string;

export type Theme_NavbarItem_DocNavbarItem_Path = string;

export type Theme_NavbarItem_DocNavbarItem_AriaCurrent = 'page' | undefined;

/**
 * Theme - Navbar Item - Doc Sidebar Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_DocSidebarNavbarItem_Props_SidebarId = string;

export type Theme_NavbarItem_DocSidebarNavbarItem_Props_Label = string | undefined;

export type Theme_NavbarItem_DocSidebarNavbarItem_Props_DocsPluginId = string | undefined;

export type Theme_NavbarItem_DocSidebarNavbarItem_Props_IsActiveItem = boolean | undefined;

export type Theme_NavbarItem_DocSidebarNavbarItem_Props = {
  sidebarId: Theme_NavbarItem_DocSidebarNavbarItem_Props_SidebarId;
  label?: Theme_NavbarItem_DocSidebarNavbarItem_Props_Label;
  docsPluginId?: Theme_NavbarItem_DocSidebarNavbarItem_Props_DocsPluginId;
  isActiveItem?: Theme_NavbarItem_DocSidebarNavbarItem_Props_IsActiveItem;
  [key: string]: unknown;
};

export type Theme_NavbarItem_DocSidebarNavbarItem_ActiveDocContext = ActiveDocContext;

export type Theme_NavbarItem_DocSidebarNavbarItem_SidebarData = GlobalSidebar;

export type Theme_NavbarItem_DocSidebarNavbarItem_SidebarLink = GlobalSidebar['link'];

export type Theme_NavbarItem_DocSidebarNavbarItem_Label = string;

export type Theme_NavbarItem_DocSidebarNavbarItem_Path = string;

export type Theme_NavbarItem_DocSidebarNavbarItem_SidebarActive = boolean;

export type Theme_NavbarItem_DocSidebarNavbarItem_AriaCurrent = 'page' | undefined;

/**
 * Theme - Navbar Item - Docs Version Dropdown Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props_DocsPluginId = string | undefined;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props_DropdownItemsBefore = Theme_NavbarItem_DropdownNavbarItem_ChildItem[];

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props_DropdownItemsAfter = Theme_NavbarItem_DropdownNavbarItem_ChildItem[];

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props = {
  docsPluginId?: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props_DocsPluginId;
  dropdownItemsBefore?: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props_DropdownItemsBefore;
  dropdownItemsAfter?: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Props_DropdownItemsAfter;
  [key: string]: unknown;
};

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Versions = GlobalVersion[];

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_ActiveDocContext = ActiveDocContext;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_ActiveVersion = GlobalVersion | undefined;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Version = GlobalVersion;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_TargetDoc = GlobalDoc | undefined;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Label = string;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Path = string;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Item_Label = string;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Item_To = string;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Item_VersionName = string;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Item = {
  label: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Item_Label;
  to: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Item_To;
  versionName: Theme_NavbarItem_DocsVersionDropdownNavbarItem_Item_VersionName;
};

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_Items = Theme_NavbarItem_DocsVersionDropdownNavbarItem_Item[];

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_FirstItem = Theme_NavbarItem_DocsVersionDropdownNavbarItem_Item | undefined;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_ItemClassName = string;

export type Theme_NavbarItem_DocsVersionDropdownNavbarItem_DetailsRef = React.RefObject<HTMLDetailsElement | null>;

/**
 * Theme - Navbar Item - Docs Version Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_DocsVersionNavbarItem_Props_Label = string | undefined;

export type Theme_NavbarItem_DocsVersionNavbarItem_Props_To = string | undefined;

export type Theme_NavbarItem_DocsVersionNavbarItem_Props_DocsPluginId = string | undefined;

export type Theme_NavbarItem_DocsVersionNavbarItem_Props = {
  label?: Theme_NavbarItem_DocsVersionNavbarItem_Props_Label;
  to?: Theme_NavbarItem_DocsVersionNavbarItem_Props_To;
  docsPluginId?: Theme_NavbarItem_DocsVersionNavbarItem_Props_DocsPluginId;
  [key: string]: unknown;
};

export type Theme_NavbarItem_DocsVersionNavbarItem_Candidates = [GlobalVersion, ...GlobalVersion[]];

export type Theme_NavbarItem_DocsVersionNavbarItem_Version = GlobalVersion;

export type Theme_NavbarItem_DocsVersionNavbarItem_MainDoc = GlobalDoc | undefined;

export type Theme_NavbarItem_DocsVersionNavbarItem_Label = string;

export type Theme_NavbarItem_DocsVersionNavbarItem_Path = string;

/**
 * Theme - Navbar Item - Dropdown Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_DropdownNavbarItem_Props_Label = string | undefined;

export type Theme_NavbarItem_DropdownNavbarItem_Props_Items = Theme_NavbarItem_DropdownNavbarItem_ChildItem[];

export type Theme_NavbarItem_DropdownNavbarItem_Props = {
  label?: Theme_NavbarItem_DropdownNavbarItem_Props_Label;
  items?: Theme_NavbarItem_DropdownNavbarItem_Props_Items;
  [key: string]: unknown;
};

export type Theme_NavbarItem_DropdownNavbarItem_ChildItem_Label = string | undefined;

export type Theme_NavbarItem_DropdownNavbarItem_ChildItem = {
  label?: Theme_NavbarItem_DropdownNavbarItem_ChildItem_Label;
  [key: string]: unknown;
};

export type Theme_NavbarItem_DropdownNavbarItem_Label = string | undefined;

export type Theme_NavbarItem_DropdownNavbarItem_Items = Theme_NavbarItem_DropdownNavbarItem_ChildItem[];

/**
 * Theme - Navbar Item - HTML Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_HtmlNavbarItem_Props_Value = string;

export type Theme_NavbarItem_HtmlNavbarItem_Props = {
  value: Theme_NavbarItem_HtmlNavbarItem_Props_Value;
  [key: string]: unknown;
};

export type Theme_NavbarItem_HtmlNavbarItem_Value = string;

export type Theme_NavbarItem_HtmlNavbarItem_InnerHtml = {
  __html: string;
};

/**
 * Theme - Navbar Item - Locale Dropdown Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_LocaleDropdownNavbarItem_Props_DropdownItemsBefore = Theme_NavbarItem_DropdownNavbarItem_ChildItem[];

export type Theme_NavbarItem_LocaleDropdownNavbarItem_Props_DropdownItemsAfter = Theme_NavbarItem_DropdownNavbarItem_ChildItem[];

export type Theme_NavbarItem_LocaleDropdownNavbarItem_Props_QueryString = string | undefined;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_Props = {
  dropdownItemsBefore?: Theme_NavbarItem_LocaleDropdownNavbarItem_Props_DropdownItemsBefore;
  dropdownItemsAfter?: Theme_NavbarItem_LocaleDropdownNavbarItem_Props_DropdownItemsAfter;
  queryString?: Theme_NavbarItem_LocaleDropdownNavbarItem_Props_QueryString;
  [key: string]: unknown;
};

export type Theme_NavbarItem_LocaleDropdownNavbarItem_Context = DocusaurusContext;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_Locales = string[];

export type Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleConfigs = {
  [locale: string]: I18nLocaleConfig;
};

export type Theme_NavbarItem_LocaleDropdownNavbarItem_ActiveLocale = string;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_AlternatePageUtilsCreateUrlParams = {
  locale: string;
  fullyQualified: boolean;
};

export type Theme_NavbarItem_LocaleDropdownNavbarItem_AlternatePageUtils = {
  createUrl: (params: Theme_NavbarItem_LocaleDropdownNavbarItem_AlternatePageUtilsCreateUrlParams) => string;
};

export type Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleConfig = I18nLocaleConfig | undefined;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleUrl = string;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleItem_Label = string;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleItem_To = string;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleItem = {
  label: Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleItem_Label;
  to: Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleItem_To;
};

export type Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleItems = Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleItem[];

export type Theme_NavbarItem_LocaleDropdownNavbarItem_ShortLabelMap = Record<string, string>;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_Items = Theme_NavbarItem_DropdownNavbarItem_ChildItem[];

export type Theme_NavbarItem_LocaleDropdownNavbarItem_Label = string;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_ShortLabel = string;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_Href = string;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_ItemClassName = string;

export type Theme_NavbarItem_LocaleDropdownNavbarItem_DetailsRef = React.RefObject<HTMLDetailsElement | null>;

/**
 * Theme - Navbar Item - Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_Index_NavbarItem_Props_Type = string | undefined;

export type Theme_NavbarItem_Index_NavbarItem_Props_ClassName = string | undefined;

export type Theme_NavbarItem_Index_NavbarItem_Props_Style = CSSProperties | undefined;

export type Theme_NavbarItem_Index_NavbarItem_Props_IsActiveItem = boolean | undefined;

export type Theme_NavbarItem_Index_NavbarItem_Props = {
  type?: Theme_NavbarItem_Index_NavbarItem_Props_Type;
  className?: Theme_NavbarItem_Index_NavbarItem_Props_ClassName;
  style?: Theme_NavbarItem_Index_NavbarItem_Props_Style;
  isActiveItem?: Theme_NavbarItem_Index_NavbarItem_Props_IsActiveItem;
  [key: string]: unknown;
};

export type Theme_NavbarItem_Index_NavbarItem_NormalizedType = string;

export type Theme_NavbarItem_Index_NavbarItem_ComponentToRender = ComponentType<any> | undefined;

/**
 * Theme - Navbar Item - Search Navbar Item.
 *
 * @since 0.15.0
 */
export type Theme_NavbarItem_SearchNavbarItem_Props = {
  [key: string]: unknown;
};

export type Theme_NavbarItem_SearchNavbarItem_Element = ReactNode;
