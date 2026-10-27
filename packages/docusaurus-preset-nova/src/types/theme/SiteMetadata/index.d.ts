import type { I18nLocaleConfig } from '@docusaurus/types';
import type { Location } from 'history';

/**
 * Theme - Site Metadata.
 *
 * @since 0.15.0
 */
export type Theme_SiteMetadata_Index_SiteMetadata_SiteContext_SiteConfig = Record<string, unknown>;

export type Theme_SiteMetadata_Index_SiteMetadata_SiteContext_I18n = Record<string, unknown>;

export type Theme_SiteMetadata_Index_SiteMetadata_SiteContext = {
  siteConfig: Theme_SiteMetadata_Index_SiteMetadata_SiteContext_SiteConfig;
  i18n: Theme_SiteMetadata_Index_SiteMetadata_SiteContext_I18n;
  [key: string]: unknown;
};

export type Theme_SiteMetadata_Index_SiteMetadata_ThemeConfigDataCast = unknown;

export type Theme_SiteMetadata_Index_SiteMetadata_ThemeConfigData = Record<string, unknown>;

export type Theme_SiteMetadata_Index_SiteMetadata_SiteConfig_Image = string | undefined;

export type Theme_SiteMetadata_Index_SiteMetadata_SiteConfig = {
  image?: Theme_SiteMetadata_Index_SiteMetadata_SiteConfig_Image;
  [key: string]: unknown;
};

export type Theme_SiteMetadata_Index_SiteMetadata_LocationData = Location;

export type Theme_SiteMetadata_Index_MetadataEntry_Name = string;

export type Theme_SiteMetadata_Index_MetadataEntry_Content = string;

export type Theme_SiteMetadata_Index_MetadataEntry = {
  name: Theme_SiteMetadata_Index_MetadataEntry_Name;
  content: Theme_SiteMetadata_Index_MetadataEntry_Content;
};

export type Theme_SiteMetadata_Index_SiteMetadata = Theme_SiteMetadata_Index_MetadataEntry[];

/**
 * Theme - Site Metadata - Site Metadata.
 *
 * @since 0.15.0
 */
export type Theme_SiteMetadata_Index_SiteMetadata_SiteUrl = string;

export type Theme_SiteMetadata_Index_SiteMetadata_BaseUrl = string;

export type Theme_SiteMetadata_Index_SiteMetadata_TrailingSlash = boolean | undefined;

export type Theme_SiteMetadata_Index_SiteMetadata_CurrentLocale = string;

export type Theme_SiteMetadata_Index_SiteMetadata_DefaultImage = string | undefined;

export type Theme_SiteMetadata_Index_SiteMetadata_SiteDescriptionEntry = Theme_SiteMetadata_Index_MetadataEntry | undefined;

export type Theme_SiteMetadata_Index_SiteMetadata_SiteDescription = string | undefined;

export type Theme_SiteMetadata_Index_SiteMetadata_Pathname = string;

export type Theme_SiteMetadata_Index_SiteMetadata_BaseUrlPath = string;

export type Theme_SiteMetadata_Index_SiteMetadata_CanonicalPathname = string;

export type Theme_SiteMetadata_Index_SiteMetadata_CanonicalUrl = string;

export type Theme_SiteMetadata_Index_SiteMetadata_DefaultLocale = string;

export type Theme_SiteMetadata_Index_SiteMetadata_LocaleConfigs = Record<string, I18nLocaleConfig>;

export type Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtilsCreateUrlParams_Locale = string;

export type Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtilsCreateUrlParams_FullyQualified = boolean;

export type Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtilsCreateUrlParams = {
  locale: Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtilsCreateUrlParams_Locale;
  fullyQualified: Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtilsCreateUrlParams_FullyQualified;
};

export type Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtils_CreateUrl = (params: Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtilsCreateUrlParams) => string;

export type Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtils = {
  createUrl: Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtils_CreateUrl;
};

export type Theme_SiteMetadata_Index_SiteMetadata_LocaleEntries = [string, I18nLocaleConfig][];

export type Theme_SiteMetadata_Index_SiteMetadata_CurrentLocaleConfig = I18nLocaleConfig | undefined;

export type Theme_SiteMetadata_Index_SiteMetadata_CurrentHtmlLang = string;

export type Theme_SiteMetadata_Index_SiteMetadata_EntryLocale = string;

export type Theme_SiteMetadata_Index_SiteMetadata_EntryHtmlLang = string;
