import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import ContentVisibility from '@theme/ContentVisibility';
import TOC from '@theme/TOC';
import TOCCollapsible from '@theme/TOCCollapsible';
import { createElement } from 'react';

import type {
  Theme_BlogPostPage_Index_BlogPostPage_BlogPostContent,
  Theme_BlogPostPage_Index_BlogPostPageContent_BlogPost,
  Theme_BlogPostPage_Index_BlogPostPageContent_CanRenderToc,
  Theme_BlogPostPage_Index_BlogPostPageContent_HideTableOfContents,
  Theme_BlogPostPage_Index_BlogPostPageContent_NextItem,
  Theme_BlogPostPage_Index_BlogPostPageContent_PaginatorSpread,
  Theme_BlogPostPage_Index_BlogPostPageContent_PrevItem,
  Theme_BlogPostPage_Index_BlogPostPageContent_Props,
  Theme_BlogPostPage_Index_BlogPostPageContent_Toc,
  Theme_BlogPostPage_Index_BlogPostPageContent_TocMaxHeadingLevel,
  Theme_BlogPostPage_Index_BlogPostPageContent_TocMinHeadingLevel,
  Theme_BlogPostPage_Index_BlogPostPageContent_TocSpread,
  Theme_BlogPostPage_Index_BlogPostPage_Props,
} from '../../types/theme/BlogPostPage/index.d.ts';

/**
 * Theme - Blog Post Page - Blog Post Page Content.
 *
 * Renders a single blog post inside the blog layout with optional
 * table of contents and previous/next post navigation, using the
 * BlogPostProvider context for metadata access.
 *
 * @param {Theme_BlogPostPage_Index_BlogPostPageContent_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostPageContent(props: Theme_BlogPostPage_Index_BlogPostPageContent_Props) {
  const blogPost: Theme_BlogPostPage_Index_BlogPostPageContent_BlogPost = useBlogPost();
  const nextItem: Theme_BlogPostPage_Index_BlogPostPageContent_NextItem = blogPost['metadata']['nextItem'];
  const prevItem: Theme_BlogPostPage_Index_BlogPostPageContent_PrevItem = blogPost['metadata']['prevItem'];
  const hideTableOfContents: Theme_BlogPostPage_Index_BlogPostPageContent_HideTableOfContents = blogPost['metadata']['frontMatter']['hide_table_of_contents'];
  const tocMinHeadingLevel: Theme_BlogPostPage_Index_BlogPostPageContent_TocMinHeadingLevel = blogPost['metadata']['frontMatter']['toc_min_heading_level'];
  const tocMaxHeadingLevel: Theme_BlogPostPage_Index_BlogPostPageContent_TocMaxHeadingLevel = blogPost['metadata']['frontMatter']['toc_max_heading_level'];
  const tocSpread: Theme_BlogPostPage_Index_BlogPostPageContent_TocSpread = {};

  if (tocMinHeadingLevel !== undefined) {
    Reflect.set(tocSpread, 'minHeadingLevel', tocMinHeadingLevel);
  }

  if (tocMaxHeadingLevel !== undefined) {
    Reflect.set(tocSpread, 'maxHeadingLevel', tocMaxHeadingLevel);
  }

  const canRenderToc: Theme_BlogPostPage_Index_BlogPostPageContent_CanRenderToc = (
    hideTableOfContents !== true
    && blogPost['toc']['length'] > 0
  );

  let toc: Theme_BlogPostPage_Index_BlogPostPageContent_Toc = undefined;

  if (canRenderToc === true) {
    toc = <TOC toc={blogPost['toc']} {...tocSpread} />;
  }

  const paginatorSpread: Theme_BlogPostPage_Index_BlogPostPageContent_PaginatorSpread = {};

  if (nextItem !== undefined) {
    Reflect.set(paginatorSpread, 'nextItem', nextItem);
  }

  if (prevItem !== undefined) {
    Reflect.set(paginatorSpread, 'prevItem', prevItem);
  }

  return (
    <BlogLayout
      sidebar={props['sidebar']}
      toc={toc}
      className={(props['className'] !== undefined) ? `nova-blog-post-page ${props['className']}` : 'nova-blog-post-page'}
      style={props['style']}
    >
      <BlogPostPageMetadata />
      <BlogPostPageStructuredData />
      <ContentVisibility metadata={blogPost['metadata']} />
      {(canRenderToc === true) && (
        <TOCCollapsible toc={blogPost['toc']} {...tocSpread} />
      )}
      <BlogPostItem>
        {props['children']}
      </BlogPostItem>
      {
        (
          nextItem !== undefined
          || prevItem !== undefined
        )
        && (
          <BlogPostPaginator {...paginatorSpread} />
        )
      }
    </BlogLayout>
  );
}

/**
 * Theme - Blog Post Page - Blog Post Page.
 *
 * Wraps the blog post page content inside a BlogPostProvider
 * context, rendering the MDX content component as a child with
 * full sidebar and navigation support.
 *
 * @param {Theme_BlogPostPage_Index_BlogPostPage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostPage(props: Theme_BlogPostPage_Index_BlogPostPage_Props) {
  const blogPostContent: Theme_BlogPostPage_Index_BlogPostPage_BlogPostContent = props['content'];

  return (
    <BlogPostProvider content={props['content']} isBlogPostPage={true}>
      <BlogPostPageContent
        sidebar={props['sidebar']}
        className={props['className']}
        style={props['style']}
      >
        {createElement(blogPostContent)}
      </BlogPostPageContent>
    </BlogPostProvider>
  );
}

export default BlogPostPage;
