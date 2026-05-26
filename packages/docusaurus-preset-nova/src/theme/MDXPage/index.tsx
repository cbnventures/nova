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
  ThemeMdxPageMdxPageCanDisplayEditMetaRow,
  ThemeMdxPageMdxPageCanRenderToc,
  ThemeMdxPageMdxPageDescription,
  ThemeMdxPageMdxPageEditUrl,
  ThemeMdxPageMdxPageFirstH1State,
  ThemeMdxPageMdxPageFrontMatter,
  ThemeMdxPageMdxPageH1OverrideProps,
  ThemeMdxPageMdxPageHideTableOfContents,
  ThemeMdxPageMdxPageImage,
  ThemeMdxPageMdxPageIsFirst,
  ThemeMdxPageMdxPageKeywords,
  ThemeMdxPageMdxPageLastUpdatedAt,
  ThemeMdxPageMdxPageLastUpdatedBy,
  ThemeMdxPageMdxPageMdxComponent,
  ThemeMdxPageMdxPageMdxComponents,
  ThemeMdxPageMdxPageMetadataSpread,
  ThemeMdxPageMdxPageProps,
  ThemeMdxPageMdxPageTitle,
  ThemeMdxPageMdxPageTocMaxHeadingLevel,
  ThemeMdxPageMdxPageTocMinHeadingLevel,
  ThemeMdxPageMdxPageTocSpread,
} from '../../types/theme/MDXPage/index.d.ts';

/**
 * Theme - MDX Page - MDX Page.
 *
 * Two-column layout mirroring DocItem (article + sticky right-rail TOC),
 * collapsing below lg. The `TOCCollapsible` mobile trigger is injected as
 * a sibling after the first `h1` so it sits between title and body.
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
  const canRenderToc: ThemeMdxPageMdxPageCanRenderToc = (
    hideTableOfContents !== 'true'
    && props['content']['toc']['length'] > 0
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

  /**
   * Theme - MDX Page - MDX Page - First H State.
   *
   * Function-local flag scoping first-h1 detection to a single render so
   * subsequent renders start clean. Drives the `TOCCollapsible` trigger
   * injection in the `h1` MDX component override below.
   */
  const firstH1State: ThemeMdxPageMdxPageFirstH1State = { rendered: false };
  const mdxComponents: ThemeMdxPageMdxPageMdxComponents = {
    ...MDXComponentsTheme,
    h1: function MDXPageH1(h1Props: ThemeMdxPageMdxPageH1OverrideProps) {
      const isFirst: ThemeMdxPageMdxPageIsFirst = firstH1State['rendered'] === false;

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
