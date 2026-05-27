import type { useBlogPost } from '@docusaurus/plugin-content-blog/client';

/**
 * Theme - Blog Post Page - Metadata - Blog Post Page Metadata.
 *
 * @since 0.18.0
 */
export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_BlogPost = ReturnType<typeof useBlogPost>;

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Metadata = Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_BlogPost['metadata'];

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_FrontMatter = Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Metadata['frontMatter'];

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Description = Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Metadata['description'];

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Title = string;

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Date = string;

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Spread = {
  description?: string;
  keywords?: readonly string[];
  image?: string;
};

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_Image = string | undefined;

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_AuthorUrls = string[];

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_AuthorUrl = string | undefined;

export type Theme_BlogPostPage_Metadata_Index_BlogPostPageMetadata_TagLabels = string[];
