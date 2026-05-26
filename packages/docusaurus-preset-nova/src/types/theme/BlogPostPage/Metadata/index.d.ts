import type { useBlogPost } from '@docusaurus/plugin-content-blog/client';

/**
 * Theme - Blog Post Page - Metadata - Blog Post Page Metadata.
 *
 * @since 0.18.0
 */
export type ThemeBlogPostPageMetadataBlogPostPageMetadataBlogPost = ReturnType<typeof useBlogPost>;

export type ThemeBlogPostPageMetadataBlogPostPageMetadataMetadata = ThemeBlogPostPageMetadataBlogPostPageMetadataBlogPost['metadata'];

export type ThemeBlogPostPageMetadataBlogPostPageMetadataFrontMatter = ThemeBlogPostPageMetadataBlogPostPageMetadataMetadata['frontMatter'];

export type ThemeBlogPostPageMetadataBlogPostPageMetadataDescription = ThemeBlogPostPageMetadataBlogPostPageMetadataMetadata['description'];

export type ThemeBlogPostPageMetadataBlogPostPageMetadataTitle = string;

export type ThemeBlogPostPageMetadataBlogPostPageMetadataDate = string;

export type ThemeBlogPostPageMetadataBlogPostPageMetadataSpread = {
  description?: string;
  keywords?: readonly string[];
  image?: string;
};

export type ThemeBlogPostPageMetadataBlogPostPageMetadataImage = string | undefined;

export type ThemeBlogPostPageMetadataBlogPostPageMetadataAuthorUrls = string[];

export type ThemeBlogPostPageMetadataBlogPostPageMetadataAuthorUrl = string | undefined;

export type ThemeBlogPostPageMetadataBlogPostPageMetadataTagLabels = string[];
