import Head from '@docusaurus/Head';
import { useBlogPostStructuredData } from '@docusaurus/plugin-content-blog/client';

import { serializeJsonLd } from '../../../lib/safe-json-ld.js';

import type { Theme_BlogPostPage_StructuredData_Index_BlogPostPageStructuredData } from '../../../types/theme/BlogPostPage/StructuredData/index.d.ts';

/**
 * Theme - Blog Post Page - Structured Data - Blog Post Page Structured Data.
 *
 * Emits a JSON-LD `BlogPosting` schema script in <head> for rich-result
 * eligibility (Google "Article" rich result + breadcrumbs in search).
 *
 * @constructor
 *
 * @since 0.18.0
 */
function BlogPostPageStructuredData() {
  const structuredData: Theme_BlogPostPage_StructuredData_Index_BlogPostPageStructuredData = useBlogPostStructuredData();

  return (
    <Head>
      <script type="application/ld+json">
        {serializeJsonLd(structuredData)}
      </script>
    </Head>
  );
}

export default BlogPostPageStructuredData;
