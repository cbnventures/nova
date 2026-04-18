/**
 * Theme - Site Metadata.
 *
 * @since 0.15.0
 */
export type ThemeSiteMetadataSiteContextSiteConfig = Record<string, unknown>;

export type ThemeSiteMetadataSiteContextI18n = Record<string, unknown>;

export type ThemeSiteMetadataSiteContext = {
  siteConfig: ThemeSiteMetadataSiteContextSiteConfig;
  i18n: ThemeSiteMetadataSiteContextI18n;
  [key: string]: unknown;
};

export type ThemeSiteMetadataThemeConfigDataCast = unknown;

export type ThemeSiteMetadataThemeConfigData = Record<string, unknown>;

export type ThemeSiteMetadataSiteConfigImage = string | undefined;

export type ThemeSiteMetadataSiteConfig = {
  image?: ThemeSiteMetadataSiteConfigImage;
  [key: string]: unknown;
};

export type ThemeSiteMetadataLocationData = import('history').Location;

export type ThemeSiteMetadataIndexMetadataEntryName = string;

export type ThemeSiteMetadataIndexMetadataEntryContent = string;

export type ThemeSiteMetadataIndexMetadataEntry = {
  name: ThemeSiteMetadataIndexMetadataEntryName;
  content: ThemeSiteMetadataIndexMetadataEntryContent;
};

export type ThemeSiteMetadataIndexSiteMetadata = ThemeSiteMetadataIndexMetadataEntry[];

/**
 * Theme - Site Metadata - Site Metadata.
 *
 * @since 0.15.0
 */
export type ThemeSiteMetadataSiteMetadataSiteUrl = string;

export type ThemeSiteMetadataSiteMetadataBaseUrl = string;

export type ThemeSiteMetadataSiteMetadataTrailingSlash = boolean | undefined;

export type ThemeSiteMetadataSiteMetadataCurrentLocale = string;

export type ThemeSiteMetadataSiteMetadataDefaultImage = string | undefined;

export type ThemeSiteMetadataSiteMetadataPathname = string;

export type ThemeSiteMetadataSiteMetadataBaseUrlPath = string;

export type ThemeSiteMetadataSiteMetadataCanonicalPathname = string;

export type ThemeSiteMetadataSiteMetadataCanonicalUrl = string;
