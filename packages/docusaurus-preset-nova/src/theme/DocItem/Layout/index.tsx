import { useDoc } from '@docusaurus/plugin-content-docs/client';
import ContentVisibility from '@theme/ContentVisibility';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocSidebarMobile from '@theme/DocSidebarMobile';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import TOC from '@theme/TOC';

import type {
  ThemeDocItemLayoutDocItemLayoutCanRenderToc,
  ThemeDocItemLayoutDocItemLayoutDoc,
  ThemeDocItemLayoutDocItemLayoutProps,
  ThemeDocItemLayoutDocItemLayoutTocSpread,
} from '../../../types/theme/DocItem/Layout/index.d.ts';

/**
 * Theme - Doc Item - Layout - Doc Item Layout.
 *
 * Renders the full documentation page layout with breadcrumbs, version
 * indicators, table of contents, content, footer, and pagination,
 * without any module CSS or framework class names.
 *
 * @param {ThemeDocItemLayoutDocItemLayoutProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemLayout(props: ThemeDocItemLayoutDocItemLayoutProps) {
  const doc: ThemeDocItemLayoutDocItemLayoutDoc = useDoc();
  const canRenderToc: ThemeDocItemLayoutDocItemLayoutCanRenderToc = (
    doc['frontMatter']['hide_table_of_contents'] !== true
    && doc['toc']['length'] > 0
  );
  const tocSpread: ThemeDocItemLayoutDocItemLayoutTocSpread = {};

  if (doc['frontMatter']['toc_min_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'minHeadingLevel', doc['frontMatter']['toc_min_heading_level']);
  }

  if (doc['frontMatter']['toc_max_heading_level'] !== undefined) {
    Reflect.set(tocSpread, 'maxHeadingLevel', doc['frontMatter']['toc_max_heading_level']);
  }

  return (
    <div className="nova-grid">
      <div className="nova-col-12 nova-col-lg-9">
        <ContentVisibility metadata={doc['metadata']} />
        <DocVersionBanner />
        <div>
          <article>
            <DocSidebarMobile />
            <DocBreadcrumbs />
            <DocVersionBadge />
            {(canRenderToc === true) && (
              <DocItemTOCMobile />
            )}
            <DocItemContent>{props['children']}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {(canRenderToc === true) && (
        <div className="nova-col-12 nova-col-lg-3">
          <TOC
            toc={doc['toc']}
            {...tocSpread}
          />
        </div>
      )}
    </div>
  );
}

export default DocItemLayout;
