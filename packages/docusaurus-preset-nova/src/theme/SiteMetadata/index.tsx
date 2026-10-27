import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import {
  PageMetadata,
  useThemeConfig,
} from '@docusaurus/theme-common';
import {
  DEFAULT_SEARCH_TAG,
  useAlternatePageUtils,
} from '@docusaurus/theme-common/internal';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { applyTrailingSlash } from '@docusaurus/utils-common';
import SearchMetadata from '@theme/SearchMetadata';

import type {
  Theme_SiteMetadata_Index_MetadataEntry_Content,
  Theme_SiteMetadata_Index_MetadataEntry_Name,
  Theme_SiteMetadata_Index_SiteMetadata,
  Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtils,
  Theme_SiteMetadata_Index_SiteMetadata_BaseUrl,
  Theme_SiteMetadata_Index_SiteMetadata_BaseUrlPath,
  Theme_SiteMetadata_Index_SiteMetadata_CanonicalPathname,
  Theme_SiteMetadata_Index_SiteMetadata_CanonicalUrl,
  Theme_SiteMetadata_Index_SiteMetadata_CurrentHtmlLang,
  Theme_SiteMetadata_Index_SiteMetadata_CurrentLocale,
  Theme_SiteMetadata_Index_SiteMetadata_CurrentLocaleConfig,
  Theme_SiteMetadata_Index_SiteMetadata_DefaultImage,
  Theme_SiteMetadata_Index_SiteMetadata_DefaultLocale,
  Theme_SiteMetadata_Index_SiteMetadata_EntryHtmlLang,
  Theme_SiteMetadata_Index_SiteMetadata_EntryLocale,
  Theme_SiteMetadata_Index_SiteMetadata_LocaleConfigs,
  Theme_SiteMetadata_Index_SiteMetadata_LocaleEntries,
  Theme_SiteMetadata_Index_SiteMetadata_LocationData,
  Theme_SiteMetadata_Index_SiteMetadata_Pathname,
  Theme_SiteMetadata_Index_SiteMetadata_SiteConfig,
  Theme_SiteMetadata_Index_SiteMetadata_SiteContext,
  Theme_SiteMetadata_Index_SiteMetadata_SiteDescription,
  Theme_SiteMetadata_Index_SiteMetadata_SiteDescriptionEntry,
  Theme_SiteMetadata_Index_SiteMetadata_SiteUrl,
  Theme_SiteMetadata_Index_SiteMetadata_ThemeConfigData,
  Theme_SiteMetadata_Index_SiteMetadata_ThemeConfigDataCast,
  Theme_SiteMetadata_Index_SiteMetadata_TrailingSlash,
} from '../../types/theme/SiteMetadata/index.d.ts';

/**
 * Theme - Site Metadata - Site Metadata.
 *
 * Injects global site metadata into the document head
 * including canonical URLs, Open Graph tags, and default
 * search metadata for every rendered page.
 *
 * @constructor
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function SiteMetadata() {
  const siteContext: Theme_SiteMetadata_Index_SiteMetadata_SiteContext = useDocusaurusContext();
  const themeConfigData: Theme_SiteMetadata_Index_SiteMetadata_ThemeConfigData = useThemeConfig() as Theme_SiteMetadata_Index_SiteMetadata_ThemeConfigDataCast as Theme_SiteMetadata_Index_SiteMetadata_ThemeConfigData;
  const siteConfig: Theme_SiteMetadata_Index_SiteMetadata_SiteConfig = themeConfigData['site'] as Theme_SiteMetadata_Index_SiteMetadata_SiteConfig;
  const locationData: Theme_SiteMetadata_Index_SiteMetadata_LocationData = useLocation();

  const siteUrl: Theme_SiteMetadata_Index_SiteMetadata_SiteUrl = siteContext['siteConfig']['url'] as Theme_SiteMetadata_Index_SiteMetadata_SiteUrl;
  const baseUrl: Theme_SiteMetadata_Index_SiteMetadata_BaseUrl = siteContext['siteConfig']['baseUrl'] as Theme_SiteMetadata_Index_SiteMetadata_BaseUrl;
  const trailingSlash: Theme_SiteMetadata_Index_SiteMetadata_TrailingSlash = siteContext['siteConfig']['trailingSlash'] as Theme_SiteMetadata_Index_SiteMetadata_TrailingSlash;
  const currentLocale: Theme_SiteMetadata_Index_SiteMetadata_CurrentLocale = siteContext['i18n']['currentLocale'] as Theme_SiteMetadata_Index_SiteMetadata_CurrentLocale;
  const defaultImage: Theme_SiteMetadata_Index_SiteMetadata_DefaultImage = siteConfig['image'];
  const siteMetadata: Theme_SiteMetadata_Index_SiteMetadata = siteConfig['metadata'] as Theme_SiteMetadata_Index_SiteMetadata;
  const siteDescriptionEntry: Theme_SiteMetadata_Index_SiteMetadata_SiteDescriptionEntry = siteMetadata.find(
    (metadataEntry) => metadataEntry['name'] === 'description',
  );
  const siteDescription: Theme_SiteMetadata_Index_SiteMetadata_SiteDescription = (siteDescriptionEntry !== undefined) ? siteDescriptionEntry['content'] : undefined;
  const pathname: Theme_SiteMetadata_Index_SiteMetadata_Pathname = locationData['pathname'];

  const baseUrlPath: Theme_SiteMetadata_Index_SiteMetadata_BaseUrlPath = useBaseUrl(pathname);

  const canonicalPathname: Theme_SiteMetadata_Index_SiteMetadata_CanonicalPathname = applyTrailingSlash(
    baseUrlPath,
    {
      trailingSlash,
      baseUrl,
    },
  );

  const canonicalUrl: Theme_SiteMetadata_Index_SiteMetadata_CanonicalUrl = siteUrl + canonicalPathname;

  // Alternate-language links, as upstream Docusaurus emits them, so search engines pair each translation with the others.
  const defaultLocale: Theme_SiteMetadata_Index_SiteMetadata_DefaultLocale = siteContext['i18n']['defaultLocale'] as Theme_SiteMetadata_Index_SiteMetadata_DefaultLocale;
  const localeConfigs: Theme_SiteMetadata_Index_SiteMetadata_LocaleConfigs = siteContext['i18n']['localeConfigs'] as Theme_SiteMetadata_Index_SiteMetadata_LocaleConfigs;
  const alternatePageUtils: Theme_SiteMetadata_Index_SiteMetadata_AlternatePageUtils = useAlternatePageUtils();
  const localeEntries: Theme_SiteMetadata_Index_SiteMetadata_LocaleEntries = Object.entries(localeConfigs);
  const currentLocaleConfig: Theme_SiteMetadata_Index_SiteMetadata_CurrentLocaleConfig = localeConfigs[currentLocale];
  const currentHtmlLang: Theme_SiteMetadata_Index_SiteMetadata_CurrentHtmlLang = (currentLocaleConfig !== undefined) ? currentLocaleConfig['htmlLang'] : currentLocale;

  return (
    <>
      {(defaultImage !== undefined) && (
        <PageMetadata image={defaultImage} />
      )}

      <Head>
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        {localeEntries.map((localeEntry) => {
          const entryLocale: Theme_SiteMetadata_Index_SiteMetadata_EntryLocale = localeEntry[0];
          const entryHtmlLang: Theme_SiteMetadata_Index_SiteMetadata_EntryHtmlLang = localeEntry[1]['htmlLang'];

          return (
            <link
              key={entryLocale}
              rel="alternate"
              href={alternatePageUtils.createUrl({
                locale: entryLocale,
                fullyQualified: true,
              })}
              hrefLang={entryHtmlLang}
            />
          );
        })}
        <link
          rel="alternate"
          href={alternatePageUtils.createUrl({
            locale: defaultLocale,
            fullyQualified: true,
          })}
          hrefLang="x-default"
        />
        <meta property="og:locale" content={currentHtmlLang.replace('-', '_')} />
        {(siteDescription !== undefined) && (
          <meta property="og:description" content={siteDescription} />
        )}
        {siteMetadata.map((metadataEntry) => {
          const metadataEntryName: Theme_SiteMetadata_Index_MetadataEntry_Name = metadataEntry['name'];
          const metadataEntryContent: Theme_SiteMetadata_Index_MetadataEntry_Content = metadataEntry['content'];

          return (
            <meta key={metadataEntryName} name={metadataEntryName} content={metadataEntryContent} />
          );
        })}
      </Head>

      <SearchMetadata tag={DEFAULT_SEARCH_TAG} locale={currentLocale} />
    </>
  );
}

export default SiteMetadata;
