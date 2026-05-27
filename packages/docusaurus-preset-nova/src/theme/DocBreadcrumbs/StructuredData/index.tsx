import Head from '@docusaurus/Head';
import { useBreadcrumbsStructuredData } from '@docusaurus/plugin-content-docs/client';

import { serializeJsonLd } from '../../../lib/safe-json-ld.js';

import type {
  Theme_DocBreadcrumbs_StructuredData_Index_DocBreadcrumbsStructuredData,
  Theme_DocBreadcrumbs_StructuredData_Index_DocBreadcrumbsStructuredData_Props,
} from '../../../types/theme/DocBreadcrumbs/StructuredData/index.d.ts';

/**
 * Theme - Doc Breadcrumbs - Structured Data - Doc Breadcrumbs Structured Data.
 *
 * Emits a JSON-LD `BreadcrumbList` schema script in <head> for the doc page,
 * derived from the sidebar breadcrumb trail. Enables Google to render
 * breadcrumbs directly in search results.
 *
 * @param {Theme_DocBreadcrumbs_StructuredData_Index_DocBreadcrumbsStructuredData_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function DocBreadcrumbsStructuredData(props: Theme_DocBreadcrumbs_StructuredData_Index_DocBreadcrumbsStructuredData_Props) {
  const structuredData: Theme_DocBreadcrumbs_StructuredData_Index_DocBreadcrumbsStructuredData = useBreadcrumbsStructuredData({
    breadcrumbs: props['breadcrumbs'],
  });

  return (
    <Head>
      <script type="application/ld+json">
        {serializeJsonLd(structuredData)}
      </script>
    </Head>
  );
}

export default DocBreadcrumbsStructuredData;
