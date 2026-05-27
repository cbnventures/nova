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

export type Theme_SiteMetadata_Index_SiteMetadata_LocationData = import('history').Location;

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

export type Theme_SiteMetadata_Index_SiteMetadata_Pathname = string;

export type Theme_SiteMetadata_Index_SiteMetadata_BaseUrlPath = string;

export type Theme_SiteMetadata_Index_SiteMetadata_CanonicalPathname = string;

export type Theme_SiteMetadata_Index_SiteMetadata_CanonicalUrl = string;
