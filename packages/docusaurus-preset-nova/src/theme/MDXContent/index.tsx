import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';

import type {
  ThemeMdxContentMdxContentComponents,
  ThemeMdxContentMdxContentProps,
} from '../../types/theme/MDXContent/index.d.ts';

/**
 * Theme - MDX Content - MDX Content.
 *
 * Wraps page children in the MDX provider so custom component mappings
 * apply to all MDX content, plus a `.nova-mdx-content` div so page-wide
 * MDX styling has a single scope hook.
 *
 * @param {ThemeMdxContentMdxContentProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MdxContent(props: ThemeMdxContentMdxContentProps) {
  return (
    <MDXProvider components={MDXComponents as ThemeMdxContentMdxContentComponents}>
      <div
        className={(props['className'] !== undefined) ? `nova-mdx-content ${props['className']}` : 'nova-mdx-content'}
        style={props['style']}
      >
        {props['children']}
      </div>
    </MDXProvider>
  );
}

export default MdxContent;
