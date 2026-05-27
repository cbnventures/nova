import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import {
  PageMetadata,
  useThemeConfig,
} from '@docusaurus/theme-common';
import { DEFAULT_SEARCH_TAG } from '@docusaurus/theme-common/internal';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { applyTrailingSlash } from '@docusaurus/utils-common';
import SearchMetadata from '@theme/SearchMetadata';

import type {
  Theme_SiteMetadata_Index_MetadataEntry_Content,
  Theme_SiteMetadata_Index_MetadataEntry_Name,
  Theme_SiteMetadata_Index_SiteMetadata,
  Theme_SiteMetadata_Index_SiteMetadata_LocationData,
  Theme_SiteMetadata_Index_SiteMetadata_SiteConfig,
  Theme_SiteMetadata_Index_SiteMetadata_SiteContext,
  Theme_SiteMetadata_Index_SiteMetadata_BaseUrl,
  Theme_SiteMetadata_Index_SiteMetadata_BaseUrlPath,
  Theme_SiteMetadata_Index_SiteMetadata_CanonicalPathname,
  Theme_SiteMetadata_Index_SiteMetadata_CanonicalUrl,
  Theme_SiteMetadata_Index_SiteMetadata_CurrentLocale,
  Theme_SiteMetadata_Index_SiteMetadata_DefaultImage,
  Theme_SiteMetadata_Index_SiteMetadata_Pathname,
  Theme_SiteMetadata_Index_SiteMetadata_SiteUrl,
  Theme_SiteMetadata_Index_SiteMetadata_TrailingSlash,
  Theme_SiteMetadata_Index_SiteMetadata_ThemeConfigData,
  Theme_SiteMetadata_Index_SiteMetadata_ThemeConfigDataCast,
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

  return (
    <>
      {(defaultImage !== undefined) && (
        <PageMetadata image={defaultImage} />
      )}

      <Head>
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
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
