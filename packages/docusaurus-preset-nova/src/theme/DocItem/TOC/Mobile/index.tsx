import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TOCCollapsible from '@theme/TOCCollapsible';

import type {
  Theme_DocItem_Toc_Mobile_Index_DocItemTOCMobile_Doc,
  Theme_DocItem_Toc_Mobile_Index_DocItemTOCMobile_MergedClassName,
  Theme_DocItem_Toc_Mobile_Index_DocItemTOCMobile_Props,
  Theme_DocItem_Toc_Mobile_Index_DocItemTOCMobile_TocSpread,
} from '../../../../types/theme/DocItem/TOC/Mobile/index.d.ts';

/**
 * Theme - Doc Item - Toc - Mobile - Doc Item Toc Mobile.
 *
 * Renders a collapsible table of contents for mobile viewports
 * using heading data and level constraints from the current
 * doc front matter.
 *
 * @param {Theme_DocItem_Toc_Mobile_Index_DocItemTOCMobile_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemTOCMobile(props: Theme_DocItem_Toc_Mobile_Index_DocItemTOCMobile_Props) {
  const doc: Theme_DocItem_Toc_Mobile_Index_DocItemTOCMobile_Doc = useDoc();
  const tocSpread: Theme_DocItem_Toc_Mobile_Index_DocItemTOCMobile_TocSpread = {};

  if (doc['frontMatter']['toc_min_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'minHeadingLevel', doc['frontMatter']['toc_min_heading_level']);
  }

  if (doc['frontMatter']['toc_max_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'maxHeadingLevel', doc['frontMatter']['toc_max_heading_level']);
  }

  const mergedClassName: Theme_DocItem_Toc_Mobile_Index_DocItemTOCMobile_MergedClassName = (props['className'] !== undefined) ? `nova-doc-item-toc-mobile ${props['className']}` : 'nova-doc-item-toc-mobile';

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
