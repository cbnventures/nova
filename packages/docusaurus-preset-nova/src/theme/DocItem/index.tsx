import { DocProvider } from '@docusaurus/plugin-content-docs/client';
import { HtmlClassNameProvider } from '@docusaurus/theme-common';
import DocItemLayout from '@theme/DocItem/Layout';
import DocItemMetadata from '@theme/DocItem/Metadata';
import { createElement } from 'react';

import type {
  Theme_DocItem_Index_DocItem_HtmlClassName,
  Theme_DocItem_Index_DocItem_MdxComponent,
  Theme_DocItem_Index_DocItem_Props,
} from '../../types/theme/DocItem/index.d.ts';

/**
 * Theme - Doc Item - Doc Item.
 *
 * Wraps a documentation page in the Docusaurus doc provider and HTML class name
 * provider, rendering metadata and layout with the doc content as a
 * child MDX component.
 *
 * @param {Theme_DocItem_Index_DocItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItem(props: Theme_DocItem_Index_DocItem_Props) {
  const htmlClassName: Theme_DocItem_Index_DocItem_HtmlClassName = (props['className'] !== undefined) ? `docs-doc-id-${props['content']['metadata']['id']} ${props['className']}` : `docs-doc-id-${props['content']['metadata']['id']}`;
  const mdxComponent: Theme_DocItem_Index_DocItem_MdxComponent = props['content'];

  return (
    <DocProvider content={props['content']}>
      <HtmlClassNameProvider className={htmlClassName}>
        <DocItemMetadata />
        <DocItemLayout style={props['style']}>
          {createElement(mdxComponent)}
        </DocItemLayout>
      </HtmlClassNameProvider>
    </DocProvider>
  );
}

export default DocItem;
