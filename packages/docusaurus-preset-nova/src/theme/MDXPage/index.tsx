import { PageMetadata } from '@docusaurus/theme-common';
import ContentVisibility from '@theme/ContentVisibility';
import EditMetaRow from '@theme/EditMetaRow';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import TOC from '@theme/TOC';
import { createElement } from 'react';

import type {
  ThemeMdxPageMdxPageCanDisplayEditMetaRow,
  ThemeMdxPageMdxPageDescription,
  ThemeMdxPageMdxPageEditUrl,
  ThemeMdxPageMdxPageFrontMatter,
  ThemeMdxPageMdxPageHideTableOfContents,
  ThemeMdxPageMdxPageImage,
  ThemeMdxPageMdxPageKeywords,
  ThemeMdxPageMdxPageLastUpdatedAt,
  ThemeMdxPageMdxPageLastUpdatedBy,
  ThemeMdxPageMdxPageMdxComponent,
  ThemeMdxPageMdxPageMetadataSpread,
  ThemeMdxPageMdxPageProps,
  ThemeMdxPageMdxPageTitle,
  ThemeMdxPageMdxPageToc,
  ThemeMdxPageMdxPageTocMaxHeadingLevel,
  ThemeMdxPageMdxPageTocMinHeadingLevel,
  ThemeMdxPageMdxPageTocSpread,
} from '../../types/theme/MDXPage/index.d.ts';

/**
 * Theme - MDX Page - MDX Page.
 *
 * Renders a standalone MDX page with metadata, optional table of contents,
 * and edit/last-updated information inside the site
 * layout wrapper.
 *
 * @param {ThemeMdxPageMdxPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MDXPage(props: ThemeMdxPageMdxPageProps) {
  const title: ThemeMdxPageMdxPageTitle = props['content']['metadata']['title'];
  const editUrl: ThemeMdxPageMdxPageEditUrl = props['content']['metadata']['editUrl'];
  const description: ThemeMdxPageMdxPageDescription = props['content']['metadata']['description'];
  const frontMatter: ThemeMdxPageMdxPageFrontMatter = props['content']['metadata']['frontMatter'];
  const lastUpdatedBy: ThemeMdxPageMdxPageLastUpdatedBy = props['content']['metadata']['lastUpdatedBy'];
  const lastUpdatedAt: ThemeMdxPageMdxPageLastUpdatedAt = props['content']['metadata']['lastUpdatedAt'];
  const keywords: ThemeMdxPageMdxPageKeywords = frontMatter['keywords'];
  const image: ThemeMdxPageMdxPageImage = props['content']['assets']['image'] ?? frontMatter['image'];
  const hideTableOfContents: ThemeMdxPageMdxPageHideTableOfContents = frontMatter['hide_table_of_contents'];
  const tocMinHeadingLevel: ThemeMdxPageMdxPageTocMinHeadingLevel = frontMatter['toc_min_heading_level'];
  const tocMaxHeadingLevel: ThemeMdxPageMdxPageTocMaxHeadingLevel = frontMatter['toc_max_heading_level'];
  const canDisplayEditMetaRow: ThemeMdxPageMdxPageCanDisplayEditMetaRow = (
    editUrl !== undefined
    || lastUpdatedAt !== undefined
    || lastUpdatedBy !== undefined
  );
  const mdxComponent: ThemeMdxPageMdxPageMdxComponent = props['content'];
  const metadataSpread: ThemeMdxPageMdxPageMetadataSpread = {};

  if (title !== undefined) {
    Reflect.set(metadataSpread, 'title', title);
  }

  if (description !== undefined) {
    Reflect.set(metadataSpread, 'description', description);
  }

  if (keywords !== undefined) {
    Reflect.set(metadataSpread, 'keywords', keywords);
  }

  if (image !== undefined) {
    Reflect.set(metadataSpread, 'image', image);
  }

  const tocSpread: ThemeMdxPageMdxPageTocSpread = {};

  if (tocMinHeadingLevel !== undefined) {
    Reflect.set(tocSpread, 'minHeadingLevel', tocMinHeadingLevel);
  }

  if (tocMaxHeadingLevel !== undefined) {
    Reflect.set(tocSpread, 'maxHeadingLevel', tocMaxHeadingLevel);
  }

  let toc: ThemeMdxPageMdxPageToc = undefined;

  if (hideTableOfContents !== 'true' && props['content']['toc']['length'] > 0) {
    toc = <TOC toc={props['content']['toc']} {...tocSpread} />;
  }

  return (
    <Layout>
      <PageMetadata {...metadataSpread} />
      <main className="nova-container">
        <ContentVisibility metadata={props['content']['metadata']} />
        <article>
          <MDXContent>
            {createElement(mdxComponent)}
          </MDXContent>
        </article>
        {canDisplayEditMetaRow === true && (
          <EditMetaRow
            className=""
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
        {toc}
      </main>
    </Layout>
  );
}

export default MDXPage;
