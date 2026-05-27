import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';

import type {
  Theme_DocItem_Toc_Desktop_Index_DocItemTocDesktopDoc,
  Theme_DocItem_Toc_Desktop_Index_DocItemTocDesktopMergedClassName,
  Theme_DocItem_Toc_Desktop_Index_DocItemTocDesktopProps,
  Theme_DocItem_Toc_Desktop_Index_DocItemTocDesktopTocSpread,
} from '../../../../types/theme/DocItem/TOC/Desktop/index.d.ts';

/**
 * Theme - Doc Item - Toc - Desktop - Doc Item Toc Desktop.
 *
 * Renders a sidebar table of contents for desktop viewports
 * using heading data and level constraints from the current
 * doc front matter.
 *
 * @param {Theme_DocItem_Toc_Desktop_Index_DocItemTocDesktopProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemTOCDesktop(props: Theme_DocItem_Toc_Desktop_Index_DocItemTocDesktopProps) {
  const doc: Theme_DocItem_Toc_Desktop_Index_DocItemTocDesktopDoc = useDoc();
  const tocSpread: Theme_DocItem_Toc_Desktop_Index_DocItemTocDesktopTocSpread = {};

  if (doc['frontMatter']['toc_min_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'minHeadingLevel', doc['frontMatter']['toc_min_heading_level']);
  }

  if (doc['frontMatter']['toc_max_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'maxHeadingLevel', doc['frontMatter']['toc_max_heading_level']);
  }

  const mergedClassName: Theme_DocItem_Toc_Desktop_Index_DocItemTocDesktopMergedClassName = (props['className'] !== undefined) ? `nova-doc-item-toc-desktop ${props['className']}` : 'nova-doc-item-toc-desktop';

  return (
    <TOC
      toc={doc['toc']}
      className={mergedClassName}
      style={props['style']}
      {...tocSpread}
    />
  );
}

export default DocItemTOCDesktop;
