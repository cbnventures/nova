import { DocProvider } from '@docusaurus/plugin-content-docs/client';
import { HtmlClassNameProvider } from '@docusaurus/theme-common';
import DocItemLayout from '@theme/DocItem/Layout';
import DocItemMetadata from '@theme/DocItem/Metadata';
import { createElement } from 'react';

import type {
  ThemeDocItemDocItemHtmlClassName,
  ThemeDocItemDocItemMdxComponent,
  ThemeDocItemDocItemProps,
} from '../../types/theme/DocItem/index.d.ts';

/**
 * Theme - Doc Item - Doc Item.
 *
 * Wraps a documentation page in the Docusaurus doc provider and HTML class name
 * provider, rendering metadata and layout with the doc content as a
 * child MDX component.
 *
 * @param {ThemeDocItemDocItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItem(props: ThemeDocItemDocItemProps) {
  const htmlClassName: ThemeDocItemDocItemHtmlClassName = `docs-doc-id-${props['content']['metadata']['id']}`;
  const mdxComponent: ThemeDocItemDocItemMdxComponent = props['content'];

  return (
    <DocProvider content={props['content']}>
      <HtmlClassNameProvider className={htmlClassName}>
        <DocItemMetadata />
        <DocItemLayout>
          {createElement(mdxComponent)}
        </DocItemLayout>
      </HtmlClassNameProvider>
    </DocProvider>
  );
}

export default DocItem;
