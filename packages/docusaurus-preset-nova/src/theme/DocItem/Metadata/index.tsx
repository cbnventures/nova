import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { PageMetadata } from '@docusaurus/theme-common';

import type {
  Theme_DocItem_Metadata_Index_DocItemMetadata_Doc,
  Theme_DocItem_Metadata_Index_DocItemMetadata_Image,
  Theme_DocItem_Metadata_Index_DocItemMetadata_MergedClassName,
  Theme_DocItem_Metadata_Index_DocItemMetadata_Props,
  Theme_DocItem_Metadata_Index_DocItemMetadata_Spread,
} from '../../../types/theme/DocItem/Metadata/index.d.ts';

/**
 * Theme - Doc Item - Metadata - Doc Item Metadata.
 *
 * Renders page metadata for a documentation item using the doc title,
 * description, keywords, and image from front matter
 * and asset metadata.
 *
 * @param {Theme_DocItem_Metadata_Index_DocItemMetadata_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemMetadata(props: Theme_DocItem_Metadata_Index_DocItemMetadata_Props) {
  const doc: Theme_DocItem_Metadata_Index_DocItemMetadata_Doc = useDoc();
  const metadataSpread: Theme_DocItem_Metadata_Index_DocItemMetadata_Spread = {};

  if (doc['metadata']['description'] !== undefined) {
    Reflect.set(metadataSpread, 'description', doc['metadata']['description']);
  }

  if (doc['frontMatter']['keywords'] !== undefined) {
    Reflect.set(metadataSpread, 'keywords', doc['frontMatter']['keywords']);
  }

  const metadataImage: Theme_DocItem_Metadata_Index_DocItemMetadata_Image = doc['assets']['image'] ?? doc['frontMatter']['image'];

  if (metadataImage !== undefined) {
    Reflect.set(metadataSpread, 'image', metadataImage);
  }

  const mergedClassName: Theme_DocItem_Metadata_Index_DocItemMetadata_MergedClassName = (props['className'] !== undefined) ? `nova-doc-item-metadata ${props['className']}` : 'nova-doc-item-metadata';

  Reflect.set(metadataSpread, 'className', mergedClassName);
  Reflect.set(metadataSpread, 'style', props['style']);

  return (
    <PageMetadata
      title={doc['metadata']['title']}
      {...metadataSpread}
    />
  );
}

export default DocItemMetadata;
