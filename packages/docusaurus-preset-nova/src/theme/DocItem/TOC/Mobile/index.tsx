import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TOCCollapsible from '@theme/TOCCollapsible';

import type {
  ThemeDocItemTocMobileDocItemTocMobileDoc,
  ThemeDocItemTocMobileDocItemTocMobileMergedClassName,
  ThemeDocItemTocMobileDocItemTocMobileProps,
  ThemeDocItemTocMobileDocItemTocMobileTocSpread,
} from '../../../../types/theme/DocItem/TOC/Mobile/index.d.ts';

/**
 * Theme - Doc Item - Toc - Mobile - Doc Item Toc Mobile.
 *
 * Renders a collapsible table of contents for mobile viewports
 * using heading data and level constraints from the current
 * doc front matter.
 *
 * @param {ThemeDocItemTocMobileDocItemTocMobileProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemTOCMobile(props: ThemeDocItemTocMobileDocItemTocMobileProps) {
  const doc: ThemeDocItemTocMobileDocItemTocMobileDoc = useDoc();
  const tocSpread: ThemeDocItemTocMobileDocItemTocMobileTocSpread = {};

  if (doc['frontMatter']['toc_min_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'minHeadingLevel', doc['frontMatter']['toc_min_heading_level']);
  }

  if (doc['frontMatter']['toc_max_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'maxHeadingLevel', doc['frontMatter']['toc_max_heading_level']);
  }

  const mergedClassName: ThemeDocItemTocMobileDocItemTocMobileMergedClassName = (props['className'] !== undefined) ? `nova-doc-item-toc-mobile ${props['className']}` : 'nova-doc-item-toc-mobile';

  return (
    <TOCCollapsible
      toc={doc['toc']}
      className={mergedClassName}
      style={props['style']}
      {...tocSpread}
    />
  );
}

export default DocItemTOCMobile;
