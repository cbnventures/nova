import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { PageMetadata } from '@docusaurus/theme-common';

import type {
  ThemeDocItemMetadataDocItemMetadataDoc,
  ThemeDocItemMetadataDocItemMetadataImage,
  ThemeDocItemMetadataDocItemMetadataSpread,
} from '../../../types/theme/DocItem/Metadata/index.d.ts';

/**
 * Theme - Doc Item - Metadata - Doc Item Metadata.
 *
 * Renders page metadata for a documentation item using the doc title,
 * description, keywords, and image from front matter
 * and asset metadata.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemMetadata() {
  const doc: ThemeDocItemMetadataDocItemMetadataDoc = useDoc();
  const metadataSpread: ThemeDocItemMetadataDocItemMetadataSpread = {};

  if (doc['metadata']['description'] !== undefined) {
    Reflect.set(metadataSpread, 'description', doc['metadata']['description']);
  }

  if (doc['frontMatter']['keywords'] !== undefined) {
    Reflect.set(metadataSpread, 'keywords', doc['frontMatter']['keywords']);
  }

  const metadataImage: ThemeDocItemMetadataDocItemMetadataImage = doc['assets']['image'] ?? doc['frontMatter']['image'];

  if (metadataImage !== undefined) {
    Reflect.set(metadataSpread, 'image', metadataImage);
  }

  return (
    <PageMetadata
      title={doc['metadata']['title']}
      {...metadataSpread}
    />
  );
}

export default DocItemMetadata;
