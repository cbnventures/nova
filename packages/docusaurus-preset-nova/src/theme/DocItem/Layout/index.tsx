import { useDoc } from '@docusaurus/plugin-content-docs/client';
import ContentVisibility from '@theme/ContentVisibility';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocSidebarMobile from '@theme/DocSidebarMobile';
import DocVersionBanner from '@theme/DocVersionBanner';

import type {
  Theme_DocItem_Layout_Index_DocItemLayout_CanRenderToc,
  Theme_DocItem_Layout_Index_DocItemLayout_Doc,
  Theme_DocItem_Layout_Index_DocItemLayout_Props,
} from '../../../types/theme/DocItem/Layout/index.d.ts';

/**
 * Theme - Doc Item - Layout - Doc Item Layout.
 *
 * Renders the full documentation page layout with breadcrumbs, version
 * indicators, table of contents, content, footer, and pagination,
 * without any module CSS or framework class names.
 *
 * @param {Theme_DocItem_Layout_Index_DocItemLayout_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemLayout(props: Theme_DocItem_Layout_Index_DocItemLayout_Props) {
  const doc: Theme_DocItem_Layout_Index_DocItemLayout_Doc = useDoc();
  const canRenderToc: Theme_DocItem_Layout_Index_DocItemLayout_CanRenderToc = (
    doc['frontMatter']['hide_table_of_contents'] !== true
    && doc['toc']['length'] > 0
  );

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-grid ${props['className']}` : 'nova-grid'}
      style={props['style']}
    >
      <div className="nova-col-12 nova-col-lg-9">
        <ContentVisibility metadata={doc['metadata']} />
        <DocVersionBanner />
        <div>
          <article>
            <DocSidebarMobile />
            <DocBreadcrumbs />
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
          <DocItemTOCDesktop />
        </div>
      )}
    </div>
  );
}

export default DocItemLayout;
