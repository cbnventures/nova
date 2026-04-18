import Head from '@docusaurus/Head';

import type { ThemeSearchMetadataSearchMetadataProps } from '../../types/theme/SearchMetadata/index.d.ts';

/**
 * Theme - Search Metadata - Search Metadata.
 *
 * Injects search-related meta tags into the document head
 * so that search plugins can index content by locale,
 * version, and tag attributes.
 *
 * @param {ThemeSearchMetadataSearchMetadataProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchMetadata(props: ThemeSearchMetadataSearchMetadataProps) {
  return (
    <Head>
      {(props['locale'] !== undefined) && (
        <meta name="docusaurus_locale" content={props['locale']} />
      )}
      {(props['version'] !== undefined) && (
        <meta name="docusaurus_version" content={props['version']} />
      )}
      {(props['tag'] !== undefined) && (
        <meta name="docusaurus_tag" content={props['tag']} />
      )}
    </Head>
  );
}

export default SearchMetadata;
