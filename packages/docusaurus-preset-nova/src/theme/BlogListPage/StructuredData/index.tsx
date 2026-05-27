import Head from '@docusaurus/Head';
import { useBlogListPageStructuredData } from '@docusaurus/plugin-content-blog/client';

import { serializeJsonLd } from '../../../lib/safe-json-ld.js';

import type {
  Theme_BlogListPage_StructuredData_Index_BlogListPageStructuredData,
  Theme_BlogListPage_StructuredData_Index_BlogListPageStructuredData_Props,
} from '../../../types/theme/BlogListPage/StructuredData/index.d.ts';

/**
 * Theme - Blog List Page - Structured Data - Blog List Page Structured Data.
 *
 * Emits a JSON-LD `Blog` schema script in <head> for the blog listing page
 * (paginated index of all posts). Improves search-result rich snippets and
 * helps engines understand the blog's collection structure.
 *
 * @param {Theme_BlogListPage_StructuredData_Index_BlogListPageStructuredData_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function BlogListPageStructuredData(props: Theme_BlogListPage_StructuredData_Index_BlogListPageStructuredData_Props) {
  const structuredData: Theme_BlogListPage_StructuredData_Index_BlogListPageStructuredData = useBlogListPageStructuredData(props);

  return (
    <Head>
      <script type="application/ld+json">
        {serializeJsonLd(structuredData)}
      </script>
    </Head>
  );
}

export default BlogListPageStructuredData;
