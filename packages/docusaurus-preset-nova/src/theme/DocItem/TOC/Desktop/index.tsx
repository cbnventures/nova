import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';

import type {
  ThemeDocItemTocDesktopDocItemTocDesktopDoc,
  ThemeDocItemTocDesktopDocItemTocDesktopTocSpread,
} from '../../../../types/theme/DocItem/TOC/Desktop/index.d.ts';

/**
 * Theme - Doc Item - Toc - Desktop - Doc Item Toc Desktop.
 *
 * Renders a sidebar table of contents for desktop viewports
 * using heading data and level constraints from the current
 * doc front matter.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemTOCDesktop() {
  const doc: ThemeDocItemTocDesktopDocItemTocDesktopDoc = useDoc();
  const tocSpread: ThemeDocItemTocDesktopDocItemTocDesktopTocSpread = {};

  if (doc['frontMatter']['toc_min_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'minHeadingLevel', doc['frontMatter']['toc_min_heading_level']);
  }

  if (doc['frontMatter']['toc_max_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'maxHeadingLevel', doc['frontMatter']['toc_max_heading_level']);
  }

  return (
    <TOC
      toc={doc['toc']}
      {...tocSpread}
    />
  );
}

export default DocItemTOCDesktop;
