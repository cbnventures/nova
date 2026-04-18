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
  ThemeSiteMetadataIndexMetadataEntryContent,
  ThemeSiteMetadataIndexMetadataEntryName,
  ThemeSiteMetadataIndexSiteMetadata,
  ThemeSiteMetadataLocationData,
  ThemeSiteMetadataSiteConfig,
  ThemeSiteMetadataSiteContext,
  ThemeSiteMetadataSiteMetadataBaseUrl,
  ThemeSiteMetadataSiteMetadataBaseUrlPath,
  ThemeSiteMetadataSiteMetadataCanonicalPathname,
  ThemeSiteMetadataSiteMetadataCanonicalUrl,
  ThemeSiteMetadataSiteMetadataCurrentLocale,
  ThemeSiteMetadataSiteMetadataDefaultImage,
  ThemeSiteMetadataSiteMetadataPathname,
  ThemeSiteMetadataSiteMetadataSiteUrl,
  ThemeSiteMetadataSiteMetadataTrailingSlash,
  ThemeSiteMetadataThemeConfigData,
  ThemeSiteMetadataThemeConfigDataCast,
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
  const siteContext: ThemeSiteMetadataSiteContext = useDocusaurusContext();
  const themeConfigData: ThemeSiteMetadataThemeConfigData = useThemeConfig() as ThemeSiteMetadataThemeConfigDataCast as ThemeSiteMetadataThemeConfigData;
  const siteConfig: ThemeSiteMetadataSiteConfig = themeConfigData['site'] as ThemeSiteMetadataSiteConfig;
  const locationData: ThemeSiteMetadataLocationData = useLocation();

  const siteUrl: ThemeSiteMetadataSiteMetadataSiteUrl = siteContext['siteConfig']['url'] as ThemeSiteMetadataSiteMetadataSiteUrl;
  const baseUrl: ThemeSiteMetadataSiteMetadataBaseUrl = siteContext['siteConfig']['baseUrl'] as ThemeSiteMetadataSiteMetadataBaseUrl;
  const trailingSlash: ThemeSiteMetadataSiteMetadataTrailingSlash = siteContext['siteConfig']['trailingSlash'] as ThemeSiteMetadataSiteMetadataTrailingSlash;
  const currentLocale: ThemeSiteMetadataSiteMetadataCurrentLocale = siteContext['i18n']['currentLocale'] as ThemeSiteMetadataSiteMetadataCurrentLocale;
  const defaultImage: ThemeSiteMetadataSiteMetadataDefaultImage = siteConfig['image'];
  const siteMetadata: ThemeSiteMetadataIndexSiteMetadata = siteConfig['metadata'] as ThemeSiteMetadataIndexSiteMetadata;
  const pathname: ThemeSiteMetadataSiteMetadataPathname = locationData['pathname'];

  const baseUrlPath: ThemeSiteMetadataSiteMetadataBaseUrlPath = useBaseUrl(pathname);

  const canonicalPathname: ThemeSiteMetadataSiteMetadataCanonicalPathname = applyTrailingSlash(
    baseUrlPath,
    {
      trailingSlash,
      baseUrl,
    },
  );

  const canonicalUrl: ThemeSiteMetadataSiteMetadataCanonicalUrl = siteUrl + canonicalPathname;

  return (
    <>
      {(defaultImage !== undefined) && (
        <PageMetadata image={defaultImage} />
      )}

      <Head>
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={canonicalUrl} />
        {siteMetadata.map((metadataEntry) => {
          const metadataEntryName: ThemeSiteMetadataIndexMetadataEntryName = metadataEntry['name'];
          const metadataEntryContent: ThemeSiteMetadataIndexMetadataEntryContent = metadataEntry['content'];

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
