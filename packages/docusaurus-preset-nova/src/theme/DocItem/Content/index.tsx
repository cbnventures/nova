import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

import type {
  Theme_DocItem_Content_Index_DocItemContent_Props,
  Theme_DocItem_Content_Index_UseSyntheticTitle_Doc,
  Theme_DocItem_Content_Index_UseSyntheticTitle_SyntheticTitle,
} from '../../../types/theme/DocItem/Content/index.d.ts';

/**
 * Theme - Doc Item - Content - Use Synthetic Title.
 *
 * Returns the document title when a synthetic heading should be rendered,
 * or null when the content already provides a top-level heading
 * or the title is explicitly hidden.
 *
 * @returns {Theme_DocItem_Content_Index_UseSyntheticTitle_SyntheticTitle}
 *
 * @since 0.15.0
 */
function useSyntheticTitle(): Theme_DocItem_Content_Index_UseSyntheticTitle_SyntheticTitle {
  const doc: Theme_DocItem_Content_Index_UseSyntheticTitle_Doc = useDoc();

  if (
    doc['frontMatter']['hide_title'] === true
    || typeof doc['contentTitle'] !== 'undefined'
  ) {
    return null;
  }

  return doc['metadata']['title'];
}

/**
 * Theme - Doc Item - Content - Doc Item Content.
 *
 * Renders document content with an optional synthetic heading when the
 * markdown does not contain a top-level heading, wrapping children
 * in the MDXContent provider.
 *
 * @param {Theme_DocItem_Content_Index_DocItemContent_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemContent(props: Theme_DocItem_Content_Index_DocItemContent_Props) {
  const syntheticTitle: Theme_DocItem_Content_Index_UseSyntheticTitle_SyntheticTitle = useSyntheticTitle();

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-doc-content ${props['className']}` : 'nova-doc-content'}
      style={props['style']}
    >
      {(syntheticTitle !== null) && (
        <header className="nova-doc-content-header">
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <MDXContent>{props['children']}</MDXContent>
    </div>
  );
}

export default DocItemContent;
