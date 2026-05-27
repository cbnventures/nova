import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { PageMetadata } from '@docusaurus/theme-common';

import type {
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_AuthorUrl,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_AuthorUrls,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_BlogPost,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Date,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Description,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_FrontMatter,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Image,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Metadata,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Spread,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_TagLabels,
  Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Title,
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
  const blogPost: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_BlogPost = useBlogPost();
  const metadata: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Metadata = blogPost['metadata'];
  const frontMatter: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_FrontMatter = metadata['frontMatter'];
  const description: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Description = metadata['description'];
  const resolvedTitle: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Title = (frontMatter['title_meta']) ?? metadata['title'];
  const publishedDate: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Date = metadata['date'];

  const metadataSpread: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Spread = {};

  if (
    description !== undefined
    && description !== ''
  ) {
    Reflect.set(metadataSpread, 'description', description);
  }

  if (frontMatter['keywords'] !== undefined) {
    Reflect.set(metadataSpread, 'keywords', frontMatter['keywords']);
  }

  const image: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Image = blogPost['assets']['image'] ?? frontMatter['image'];

  if (image !== undefined) {
    Reflect.set(metadataSpread, 'image', image);
  }

  const authorUrls: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_AuthorUrls = [];

  metadata['authors'].forEach((author) => {
    const url: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_AuthorUrl = author['url'];

    if (
      url !== undefined
      && url !== ''
    ) {
      authorUrls.push(url);
    }

    return;
  });

  const tagLabels: Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_TagLabels = metadata['tags'].map((tag) => tag['label']);

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
