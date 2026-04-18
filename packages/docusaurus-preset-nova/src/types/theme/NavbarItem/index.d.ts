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
import type { ComponentType, ReactNode } from 'react';

/**
 * Theme - Navbar Item - Component Types.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemComponentTypesMap = Record<string, ComponentType<any>>;

/**
 * Theme - Navbar Item - Default Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemDefaultNavbarItemPropsLabel = string | undefined;

export type ThemeNavbarItemDefaultNavbarItemPropsTo = string | undefined;

export type ThemeNavbarItemDefaultNavbarItemPropsHref = string | undefined;

export type ThemeNavbarItemDefaultNavbarItemProps = {
  label?: ThemeNavbarItemDefaultNavbarItemPropsLabel;
  to?: ThemeNavbarItemDefaultNavbarItemPropsTo;
  href?: ThemeNavbarItemDefaultNavbarItemPropsHref;
  [key: string]: unknown;
};

export type ThemeNavbarItemDefaultNavbarItemLabel = string | undefined;

export type ThemeNavbarItemDefaultNavbarItemTo = string | undefined;

export type ThemeNavbarItemDefaultNavbarItemHref = string | undefined;

export type ThemeNavbarItemDefaultNavbarItemLinkSpread = Record<string, unknown>;

/**
 * Theme - Navbar Item - Doc Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemDocNavbarItemPropsDocId = string;

export type ThemeNavbarItemDocNavbarItemPropsLabel = string | undefined;

export type ThemeNavbarItemDocNavbarItemPropsDocsPluginId = string | undefined;

export type ThemeNavbarItemDocNavbarItemProps = {
  docId: ThemeNavbarItemDocNavbarItemPropsDocId;
  label?: ThemeNavbarItemDocNavbarItemPropsLabel;
  docsPluginId?: ThemeNavbarItemDocNavbarItemPropsDocsPluginId;
  [key: string]: unknown;
};

export type ThemeNavbarItemDocNavbarItemActiveDocContext = ActiveDocContext;

export type ThemeNavbarItemDocNavbarItemLayoutDoc = GlobalDoc | null;

export type ThemeNavbarItemDocNavbarItemPageActive = boolean;

export type ThemeNavbarItemDocNavbarItemLabel = string;

export type ThemeNavbarItemDocNavbarItemPath = string;

export type ThemeNavbarItemDocNavbarItemAriaCurrent = 'page' | undefined;

/**
 * Theme - Navbar Item - Doc Sidebar Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemDocSidebarNavbarItemPropsSidebarId = string;

export type ThemeNavbarItemDocSidebarNavbarItemPropsLabel = string | undefined;

export type ThemeNavbarItemDocSidebarNavbarItemPropsDocsPluginId = string | undefined;

export type ThemeNavbarItemDocSidebarNavbarItemProps = {
  sidebarId: ThemeNavbarItemDocSidebarNavbarItemPropsSidebarId;
  label?: ThemeNavbarItemDocSidebarNavbarItemPropsLabel;
  docsPluginId?: ThemeNavbarItemDocSidebarNavbarItemPropsDocsPluginId;
  [key: string]: unknown;
};

export type ThemeNavbarItemDocSidebarNavbarItemActiveDocContext = ActiveDocContext;

export type ThemeNavbarItemDocSidebarNavbarItemSidebarData = GlobalSidebar;

export type ThemeNavbarItemDocSidebarNavbarItemSidebarLink = GlobalSidebar['link'];

export type ThemeNavbarItemDocSidebarNavbarItemLabel = string;

export type ThemeNavbarItemDocSidebarNavbarItemPath = string;

export type ThemeNavbarItemDocSidebarNavbarItemSidebarActive = boolean;

export type ThemeNavbarItemDocSidebarNavbarItemAriaCurrent = 'page' | undefined;

/**
 * Theme - Navbar Item - Docs Version Dropdown Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemDocsVersionDropdownNavbarItemPropsDocsPluginId = string | undefined;

export type ThemeNavbarItemDocsVersionDropdownNavbarItemPropsDropdownItemsBefore = ThemeNavbarItemDropdownNavbarItemChildItem[];

export type ThemeNavbarItemDocsVersionDropdownNavbarItemPropsDropdownItemsAfter = ThemeNavbarItemDropdownNavbarItemChildItem[];

export type ThemeNavbarItemDocsVersionDropdownNavbarItemProps = {
  docsPluginId?: ThemeNavbarItemDocsVersionDropdownNavbarItemPropsDocsPluginId;
  dropdownItemsBefore?: ThemeNavbarItemDocsVersionDropdownNavbarItemPropsDropdownItemsBefore;
  dropdownItemsAfter?: ThemeNavbarItemDocsVersionDropdownNavbarItemPropsDropdownItemsAfter;
  [key: string]: unknown;
};

export type ThemeNavbarItemDocsVersionDropdownNavbarItemCandidates = [GlobalVersion, ...GlobalVersion[]];

export type ThemeNavbarItemDocsVersionDropdownNavbarItemActiveDocContext = ActiveDocContext;

export type ThemeNavbarItemDocsVersionDropdownNavbarItemVersion = GlobalVersion;

export type ThemeNavbarItemDocsVersionDropdownNavbarItemTargetDoc = GlobalDoc | undefined;

export type ThemeNavbarItemDocsVersionDropdownNavbarItemLabel = string;

export type ThemeNavbarItemDocsVersionDropdownNavbarItemPath = string;

export type ThemeNavbarItemDocsVersionDropdownNavbarItemItemLabel = string;

export type ThemeNavbarItemDocsVersionDropdownNavbarItemItemTo = string;

export type ThemeNavbarItemDocsVersionDropdownNavbarItemItem = {
  label: ThemeNavbarItemDocsVersionDropdownNavbarItemItemLabel;
  to: ThemeNavbarItemDocsVersionDropdownNavbarItemItemTo;
};

export type ThemeNavbarItemDocsVersionDropdownNavbarItemItems = ThemeNavbarItemDocsVersionDropdownNavbarItemItem[];

export type ThemeNavbarItemDocsVersionDropdownNavbarItemFirstItem = ThemeNavbarItemDocsVersionDropdownNavbarItemItem | undefined;

/**
 * Theme - Navbar Item - Docs Version Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemDocsVersionNavbarItemPropsLabel = string | undefined;

export type ThemeNavbarItemDocsVersionNavbarItemPropsTo = string | undefined;

export type ThemeNavbarItemDocsVersionNavbarItemPropsDocsPluginId = string | undefined;

export type ThemeNavbarItemDocsVersionNavbarItemProps = {
  label?: ThemeNavbarItemDocsVersionNavbarItemPropsLabel;
  to?: ThemeNavbarItemDocsVersionNavbarItemPropsTo;
  docsPluginId?: ThemeNavbarItemDocsVersionNavbarItemPropsDocsPluginId;
  [key: string]: unknown;
};

export type ThemeNavbarItemDocsVersionNavbarItemCandidates = [GlobalVersion, ...GlobalVersion[]];

export type ThemeNavbarItemDocsVersionNavbarItemVersion = GlobalVersion;

export type ThemeNavbarItemDocsVersionNavbarItemMainDoc = GlobalDoc | undefined;

export type ThemeNavbarItemDocsVersionNavbarItemLabel = string;

export type ThemeNavbarItemDocsVersionNavbarItemPath = string;

/**
 * Theme - Navbar Item - Dropdown Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemDropdownNavbarItemPropsLabel = string | undefined;

export type ThemeNavbarItemDropdownNavbarItemPropsItems = ThemeNavbarItemDropdownNavbarItemChildItem[];

export type ThemeNavbarItemDropdownNavbarItemProps = {
  label?: ThemeNavbarItemDropdownNavbarItemPropsLabel;
  items?: ThemeNavbarItemDropdownNavbarItemPropsItems;
  [key: string]: unknown;
};

export type ThemeNavbarItemDropdownNavbarItemChildItemLabel = string | undefined;

export type ThemeNavbarItemDropdownNavbarItemChildItem = {
  label?: ThemeNavbarItemDropdownNavbarItemChildItemLabel;
  [key: string]: unknown;
};

export type ThemeNavbarItemDropdownNavbarItemLabel = string | undefined;

export type ThemeNavbarItemDropdownNavbarItemItems = ThemeNavbarItemDropdownNavbarItemChildItem[];

/**
 * Theme - Navbar Item - HTML Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemHtmlNavbarItemPropsValue = string;

export type ThemeNavbarItemHtmlNavbarItemProps = {
  value: ThemeNavbarItemHtmlNavbarItemPropsValue;
  [key: string]: unknown;
};

export type ThemeNavbarItemHtmlNavbarItemValue = string;

export type ThemeNavbarItemHtmlNavbarItemInnerHtml = {
  __html: string;
};

/**
 * Theme - Navbar Item - Locale Dropdown Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemLocaleDropdownNavbarItemPropsDropdownItemsBefore = ThemeNavbarItemDropdownNavbarItemChildItem[];

export type ThemeNavbarItemLocaleDropdownNavbarItemPropsDropdownItemsAfter = ThemeNavbarItemDropdownNavbarItemChildItem[];

export type ThemeNavbarItemLocaleDropdownNavbarItemPropsQueryString = string | undefined;

export type ThemeNavbarItemLocaleDropdownNavbarItemProps = {
  dropdownItemsBefore?: ThemeNavbarItemLocaleDropdownNavbarItemPropsDropdownItemsBefore;
  dropdownItemsAfter?: ThemeNavbarItemLocaleDropdownNavbarItemPropsDropdownItemsAfter;
  queryString?: ThemeNavbarItemLocaleDropdownNavbarItemPropsQueryString;
  [key: string]: unknown;
};

export type ThemeNavbarItemLocaleDropdownNavbarItemContext = DocusaurusContext;

export type ThemeNavbarItemLocaleDropdownNavbarItemCurrentLocale = string;

export type ThemeNavbarItemLocaleDropdownNavbarItemLocales = string[];

export type ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfigs = {
  [locale: string]: I18nLocaleConfig;
};

export type ThemeNavbarItemLocaleDropdownNavbarItemCurrentLocaleConfig = I18nLocaleConfig | undefined;

export type ThemeNavbarItemLocaleDropdownNavbarItemAlternatePageUtils = {
  createUrl: (options: {
    locale: string;
    fullyQualified: boolean;
  }) => string;
};

export type ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfig = I18nLocaleConfig | undefined;

export type ThemeNavbarItemLocaleDropdownNavbarItemLocaleUrl = string;

export type ThemeNavbarItemLocaleDropdownNavbarItemLocaleItemLabel = string;

export type ThemeNavbarItemLocaleDropdownNavbarItemLocaleItemTo = string;

export type ThemeNavbarItemLocaleDropdownNavbarItemLocaleItem = {
  label: ThemeNavbarItemLocaleDropdownNavbarItemLocaleItemLabel;
  to: ThemeNavbarItemLocaleDropdownNavbarItemLocaleItemTo;
};

export type ThemeNavbarItemLocaleDropdownNavbarItemLocaleItems = ThemeNavbarItemLocaleDropdownNavbarItemLocaleItem[];

export type ThemeNavbarItemLocaleDropdownNavbarItemItems = ThemeNavbarItemDropdownNavbarItemChildItem[];

export type ThemeNavbarItemLocaleDropdownNavbarItemLabel = string;

export type ThemeNavbarItemLocaleDropdownNavbarItemHref = string;

/**
 * Theme - Navbar Item - Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemNavbarItemPropsType = string | undefined;

export type ThemeNavbarItemNavbarItemProps = {
  type?: ThemeNavbarItemNavbarItemPropsType;
  [key: string]: unknown;
};

export type ThemeNavbarItemNavbarItemNormalizedType = string;

export type ThemeNavbarItemNavbarItemComponentToRender = ComponentType<any> | undefined;

/**
 * Theme - Navbar Item - Search Navbar Item.
 *
 * @since 0.15.0
 */
export type ThemeNavbarItemSearchNavbarItemProps = {
  [key: string]: unknown;
};

export type ThemeNavbarItemSearchNavbarItemElement = ReactNode;
