import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

import type {
  ThemeDocItemContentDocItemContentProps,
  ThemeDocItemContentUseSyntheticTitleDoc,
  ThemeDocItemContentUseSyntheticTitleSyntheticTitle,
} from '../../../types/theme/DocItem/Content/index.d.ts';

/**
 * Theme - Doc Item - Content - Use Synthetic Title.
 *
 * Returns the document title when a synthetic heading should be rendered,
 * or null when the content already provides a top-level heading
 * or the title is explicitly hidden.
 *
 * @returns {ThemeDocItemContentUseSyntheticTitleSyntheticTitle}
 *
 * @since 0.15.0
 */
function useSyntheticTitle(): ThemeDocItemContentUseSyntheticTitleSyntheticTitle {
  const doc: ThemeDocItemContentUseSyntheticTitleDoc = useDoc();

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
 * @param {ThemeDocItemContentDocItemContentProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemContent(props: ThemeDocItemContentDocItemContentProps) {
  const syntheticTitle: ThemeDocItemContentUseSyntheticTitleSyntheticTitle = useSyntheticTitle();

  return (
    <div className="nova-doc-content">
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
