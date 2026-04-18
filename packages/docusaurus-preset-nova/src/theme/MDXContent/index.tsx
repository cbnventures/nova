import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';

import type {
  ThemeMdxContentMdxContentComponents,
  ThemeMdxContentMdxContentProps,
} from '../../types/theme/MDXContent/index.d.ts';

/**
 * Theme - MDX Content - MDX Content.
 *
 * Wraps page children in the MDX provider so that
 * custom component mappings defined in MDXComponents apply
 * to all MDX content rendered on the page.
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
      {props['children']}
    </MDXProvider>
  );
}

export default MdxContent;
