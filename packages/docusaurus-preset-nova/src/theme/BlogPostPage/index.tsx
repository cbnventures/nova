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
  ThemeBlogPostPageBlogPostPageBlogPostContent,
  ThemeBlogPostPageBlogPostPageContentBlogPost,
  ThemeBlogPostPageBlogPostPageContentCanRenderToc,
  ThemeBlogPostPageBlogPostPageContentHideTableOfContents,
  ThemeBlogPostPageBlogPostPageContentNextItem,
  ThemeBlogPostPageBlogPostPageContentPaginatorSpread,
  ThemeBlogPostPageBlogPostPageContentPrevItem,
  ThemeBlogPostPageBlogPostPageContentProps,
  ThemeBlogPostPageBlogPostPageContentToc,
  ThemeBlogPostPageBlogPostPageContentTocMaxHeadingLevel,
  ThemeBlogPostPageBlogPostPageContentTocMinHeadingLevel,
  ThemeBlogPostPageBlogPostPageContentTocSpread,
  ThemeBlogPostPageBlogPostPageProps,
} from '../../types/theme/BlogPostPage/index.d.ts';

/**
 * Theme - Blog Post Page - Blog Post Page Content.
 *
 * Renders a single blog post inside the blog layout with optional
 * table of contents and previous/next post navigation, using the
 * BlogPostProvider context for metadata access.
 *
 * @param {ThemeBlogPostPageBlogPostPageContentProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostPageContent(props: ThemeBlogPostPageBlogPostPageContentProps) {
  const blogPost: ThemeBlogPostPageBlogPostPageContentBlogPost = useBlogPost();
  const nextItem: ThemeBlogPostPageBlogPostPageContentNextItem = blogPost['metadata']['nextItem'];
  const prevItem: ThemeBlogPostPageBlogPostPageContentPrevItem = blogPost['metadata']['prevItem'];
  const hideTableOfContents: ThemeBlogPostPageBlogPostPageContentHideTableOfContents = blogPost['metadata']['frontMatter']['hide_table_of_contents'];
  const tocMinHeadingLevel: ThemeBlogPostPageBlogPostPageContentTocMinHeadingLevel = blogPost['metadata']['frontMatter']['toc_min_heading_level'];
  const tocMaxHeadingLevel: ThemeBlogPostPageBlogPostPageContentTocMaxHeadingLevel = blogPost['metadata']['frontMatter']['toc_max_heading_level'];
  const tocSpread: ThemeBlogPostPageBlogPostPageContentTocSpread = {};

  if (tocMinHeadingLevel !== undefined) {
    Reflect.set(tocSpread, 'minHeadingLevel', tocMinHeadingLevel);
  }

  if (tocMaxHeadingLevel !== undefined) {
    Reflect.set(tocSpread, 'maxHeadingLevel', tocMaxHeadingLevel);
  }

  const canRenderToc: ThemeBlogPostPageBlogPostPageContentCanRenderToc = (
    hideTableOfContents !== true
    && blogPost['toc']['length'] > 0
  );

  let toc: ThemeBlogPostPageBlogPostPageContentToc = undefined;

  if (canRenderToc === true) {
    toc = <TOC toc={blogPost['toc']} {...tocSpread} />;
  }

  const paginatorSpread: ThemeBlogPostPageBlogPostPageContentPaginatorSpread = {};

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
 * @param {ThemeBlogPostPageBlogPostPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogPostPage(props: ThemeBlogPostPageBlogPostPageProps) {
  const blogPostContent: ThemeBlogPostPageBlogPostPageBlogPostContent = props['content'];

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
