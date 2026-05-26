import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { PageMetadata } from '@docusaurus/theme-common';

import type {
  ThemeBlogPostPageMetadataBlogPostPageMetadataAuthorUrl,
  ThemeBlogPostPageMetadataBlogPostPageMetadataAuthorUrls,
  ThemeBlogPostPageMetadataBlogPostPageMetadataBlogPost,
  ThemeBlogPostPageMetadataBlogPostPageMetadataDate,
  ThemeBlogPostPageMetadataBlogPostPageMetadataDescription,
  ThemeBlogPostPageMetadataBlogPostPageMetadataFrontMatter,
  ThemeBlogPostPageMetadataBlogPostPageMetadataImage,
  ThemeBlogPostPageMetadataBlogPostPageMetadataMetadata,
  ThemeBlogPostPageMetadataBlogPostPageMetadataSpread,
  ThemeBlogPostPageMetadataBlogPostPageMetadataTagLabels,
  ThemeBlogPostPageMetadataBlogPostPageMetadataTitle,
} from '../../../types/theme/BlogPostPage/Metadata/index.d.ts';

/**
 * Theme - Blog Post Page - Metadata - Blog Post Page Metadata.
 *
 * Renders <head> meta tags for a blog post: title (with `title_meta` override),
 * description, keywords, image, and Open Graph article markers.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function BlogPostPageMetadata() {
  const blogPost: ThemeBlogPostPageMetadataBlogPostPageMetadataBlogPost = useBlogPost();
  const metadata: ThemeBlogPostPageMetadataBlogPostPageMetadataMetadata = blogPost['metadata'];
  const frontMatter: ThemeBlogPostPageMetadataBlogPostPageMetadataFrontMatter = metadata['frontMatter'];
  const description: ThemeBlogPostPageMetadataBlogPostPageMetadataDescription = metadata['description'];
  const resolvedTitle: ThemeBlogPostPageMetadataBlogPostPageMetadataTitle = (frontMatter['title_meta']) ?? metadata['title'];
  const publishedDate: ThemeBlogPostPageMetadataBlogPostPageMetadataDate = metadata['date'];

  const metadataSpread: ThemeBlogPostPageMetadataBlogPostPageMetadataSpread = {};

  if (
    description !== undefined
    && description !== ''
  ) {
    Reflect.set(metadataSpread, 'description', description);
  }

  if (frontMatter['keywords'] !== undefined) {
    Reflect.set(metadataSpread, 'keywords', frontMatter['keywords']);
  }

  const image: ThemeBlogPostPageMetadataBlogPostPageMetadataImage = blogPost['assets']['image'] ?? frontMatter['image'];

  if (image !== undefined) {
    Reflect.set(metadataSpread, 'image', image);
  }

  const authorUrls: ThemeBlogPostPageMetadataBlogPostPageMetadataAuthorUrls = [];

  metadata['authors'].forEach((author) => {
    const url: ThemeBlogPostPageMetadataBlogPostPageMetadataAuthorUrl = author['url'];

    if (
      url !== undefined
      && url !== ''
    ) {
      authorUrls.push(url);
    }

    return;
  });

  const tagLabels: ThemeBlogPostPageMetadataBlogPostPageMetadataTagLabels = metadata['tags'].map((tag) => tag['label']);

  return (
    <PageMetadata title={resolvedTitle} {...metadataSpread}>
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={publishedDate} />
      {authorUrls.map((url) => (
        <meta key={url} property="article:author" content={url} />
      ))}
      {tagLabels.map((label) => (
        <meta key={label} property="article:tag" content={label} />
      ))}
    </PageMetadata>
  );
}

export default BlogPostPageMetadata;
