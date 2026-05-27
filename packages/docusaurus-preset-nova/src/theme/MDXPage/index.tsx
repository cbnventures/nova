import { PageMetadata } from '@docusaurus/theme-common';
import { MDXProvider } from '@mdx-js/react';
import ContentVisibility from '@theme/ContentVisibility';
import EditMetaRow from '@theme/EditMetaRow';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import MDXComponentsTheme from '@theme/MDXComponents';
import TOC from '@theme/TOC';
import TOCCollapsible from '@theme/TOCCollapsible';
import { createElement } from 'react';

import type {
  Theme_MdxPage_Index_MdxPageCanDisplayEditMetaRow,
  Theme_MdxPage_Index_MdxPageCanRenderToc,
  Theme_MdxPage_Index_MdxPageDescription,
  Theme_MdxPage_Index_MdxPageEditUrl,
  Theme_MdxPage_Index_MdxPageFirstH1State,
  Theme_MdxPage_Index_MdxPageFrontMatter,
  Theme_MdxPage_Index_MdxPageH1OverrideProps,
  Theme_MdxPage_Index_MdxPageHideTableOfContents,
  Theme_MdxPage_Index_MdxPageImage,
  Theme_MdxPage_Index_MdxPageIsFirst,
  Theme_MdxPage_Index_MdxPageKeywords,
  Theme_MdxPage_Index_MdxPageLastUpdatedAt,
  Theme_MdxPage_Index_MdxPageLastUpdatedBy,
  Theme_MdxPage_Index_MdxPageMdxComponent,
  Theme_MdxPage_Index_MdxPageMdxComponents,
  Theme_MdxPage_Index_MdxPageMetadataSpread,
  Theme_MdxPage_Index_MdxPageProps,
  Theme_MdxPage_Index_MdxPageTitle,
  Theme_MdxPage_Index_MdxPageTocMaxHeadingLevel,
  Theme_MdxPage_Index_MdxPageTocMinHeadingLevel,
  Theme_MdxPage_Index_MdxPageTocSpread,
} from '../../types/theme/MDXPage/index.d.ts';

/**
 * Theme - MDX Page - MDX Page.
 *
 * Two-column layout mirroring DocItem (article + sticky right-rail TOC),
 * collapsing below lg. The `TOCCollapsible` mobile trigger is injected as
 * a sibling after the first `h1` so it sits between title and body.
 *
 * @param {Theme_MdxPage_Index_MdxPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MDXPage(props: Theme_MdxPage_Index_MdxPageProps) {
  const title: Theme_MdxPage_Index_MdxPageTitle = props['content']['metadata']['title'];
  const editUrl: Theme_MdxPage_Index_MdxPageEditUrl = props['content']['metadata']['editUrl'];
  const description: Theme_MdxPage_Index_MdxPageDescription = props['content']['metadata']['description'];
  const frontMatter: Theme_MdxPage_Index_MdxPageFrontMatter = props['content']['metadata']['frontMatter'];
  const lastUpdatedBy: Theme_MdxPage_Index_MdxPageLastUpdatedBy = props['content']['metadata']['lastUpdatedBy'];
  const lastUpdatedAt: Theme_MdxPage_Index_MdxPageLastUpdatedAt = props['content']['metadata']['lastUpdatedAt'];
  const keywords: Theme_MdxPage_Index_MdxPageKeywords = frontMatter['keywords'];
  const image: Theme_MdxPage_Index_MdxPageImage = props['content']['assets']['image'] ?? frontMatter['image'];
  const hideTableOfContents: Theme_MdxPage_Index_MdxPageHideTableOfContents = frontMatter['hide_table_of_contents'];
  const tocMinHeadingLevel: Theme_MdxPage_Index_MdxPageTocMinHeadingLevel = frontMatter['toc_min_heading_level'];
  const tocMaxHeadingLevel: Theme_MdxPage_Index_MdxPageTocMaxHeadingLevel = frontMatter['toc_max_heading_level'];
  const canDisplayEditMetaRow: Theme_MdxPage_Index_MdxPageCanDisplayEditMetaRow = (
    editUrl !== undefined
    || lastUpdatedAt !== undefined
    || lastUpdatedBy !== undefined
  );
  const canRenderToc: Theme_MdxPage_Index_MdxPageCanRenderToc = (
    hideTableOfContents !== 'true'
    && props['content']['toc']['length'] > 0
  );
  const mdxComponent: Theme_MdxPage_Index_MdxPageMdxComponent = props['content'];
  const metadataSpread: Theme_MdxPage_Index_MdxPageMetadataSpread = {};

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

  const tocSpread: Theme_MdxPage_Index_MdxPageTocSpread = {};

  if (tocMinHeadingLevel !== undefined) {
    Reflect.set(tocSpread, 'minHeadingLevel', tocMinHeadingLevel);
  }

  if (tocMaxHeadingLevel !== undefined) {
    Reflect.set(tocSpread, 'maxHeadingLevel', tocMaxHeadingLevel);
  }

  /**
   * Theme - MDX Page - MDX Page - First H State.
   *
   * Function-local flag scoping first-h1 detection to a single render so
   * subsequent renders start clean. Drives the `TOCCollapsible` trigger
   * injection in the `h1` MDX component override below.
   */
  const firstH1State: Theme_MdxPage_Index_MdxPageFirstH1State = { rendered: false };
  const mdxComponents: Theme_MdxPage_Index_MdxPageMdxComponents = {
    ...MDXComponentsTheme,
    h1: function MDXPageH1(h1Props: Theme_MdxPage_Index_MdxPageH1OverrideProps) {
      const isFirst: Theme_MdxPage_Index_MdxPageIsFirst = firstH1State['rendered'] === false;

      Reflect.set(firstH1State, 'rendered', true);

      if (isFirst === true && canRenderToc === true) {
        return (
          <>
            <Heading as="h1" {...h1Props} />
            <TOCCollapsible toc={props['content']['toc']} {...tocSpread} />
          </>
        );
      }

      return <Heading as="h1" {...h1Props} />;
    },
  };

  return (
    <Layout>
      <PageMetadata {...metadataSpread} />
      <div
        className={(props['className'] !== undefined) ? `nova-mdx-page-root ${props['className']}` : 'nova-mdx-page-root'}
        style={props['style']}
      >
        <div className="nova-container">
          <main>
            <ContentVisibility metadata={props['content']['metadata']} />
            <div className="nova-grid">
              <div className="nova-col-12 nova-col-lg-9">
                <article>
                  <MDXProvider components={mdxComponents}>
                    <div className="nova-mdx-content">
                      {createElement(mdxComponent)}
                    </div>
                  </MDXProvider>
                </article>
                {canDisplayEditMetaRow === true && (
                  <EditMetaRow
                    editUrl={editUrl}
                    lastUpdatedAt={lastUpdatedAt}
                    lastUpdatedBy={lastUpdatedBy}
                  />
                )}
              </div>
              {canRenderToc === true && (
                <div className="nova-col-12 nova-col-lg-3">
                  <TOC toc={props['content']['toc']} {...tocSpread} />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default MDXPage;
