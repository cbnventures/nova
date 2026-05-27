import type { BlogMetadata, BlogSidebar, PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { BlogPostContextValue } from '@docusaurus/plugin-content-blog/client';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Blog Post Page - Blog Post Page.
 *
 * @since 0.15.0
 */
export type Theme_BlogPostPage_Index_BlogPostPage_Props_Sidebar = BlogSidebar;

export type Theme_BlogPostPage_Index_BlogPostPage_Props_Content = PropBlogPostContent;

export type Theme_BlogPostPage_Index_BlogPostPage_Props_BlogMetadata = BlogMetadata;

export type Theme_BlogPostPage_Index_BlogPostPage_Props_ClassName = string | undefined;

export type Theme_BlogPostPage_Index_BlogPostPage_Props_Style = CSSProperties | undefined;

export type Theme_BlogPostPage_Index_BlogPostPage_Props = {
  sidebar: Theme_BlogPostPage_Index_BlogPostPage_Props_Sidebar;
  content: Theme_BlogPostPage_Index_BlogPostPage_Props_Content;
  blogMetadata: Theme_BlogPostPage_Index_BlogPostPage_Props_BlogMetadata;
  className?: Theme_BlogPostPage_Index_BlogPostPage_Props_ClassName;
  style?: Theme_BlogPostPage_Index_BlogPostPage_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogPostPage_Index_BlogPostPage_BlogPostContent = PropBlogPostContent;

/**
 * Theme - Blog Post Page - Blog Post Page Content.
 *
 * @since 0.15.0
 */
export type Theme_BlogPostPage_Index_BlogPostPageContent_Props_Children = ReactNode;

export type Theme_BlogPostPage_Index_BlogPostPageContent_Props_Sidebar = BlogSidebar;

export type Theme_BlogPostPage_Index_BlogPostPageContent_Props_ClassName = string | undefined;

export type Theme_BlogPostPage_Index_BlogPostPageContent_Props_Style = CSSProperties | undefined;

export type Theme_BlogPostPage_Index_BlogPostPageContent_Props = {
  sidebar: Theme_BlogPostPage_Index_BlogPostPageContent_Props_Sidebar;
  children: Theme_BlogPostPage_Index_BlogPostPageContent_Props_Children;
  className?: Theme_BlogPostPage_Index_BlogPostPageContent_Props_ClassName;
  style?: Theme_BlogPostPage_Index_BlogPostPageContent_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogPostPage_Index_BlogPostPageContent_BlogPost = BlogPostContextValue;

export type Theme_BlogPostPage_Index_BlogPostPageContent_MetadataNextItem_Title = string;

export type Theme_BlogPostPage_Index_BlogPostPageContent_MetadataNextItem_Permalink = string;

export type Theme_BlogPostPage_Index_BlogPostPageContent_MetadataNextItem = {
  title: Theme_BlogPostPage_Index_BlogPostPageContent_MetadataNextItem_Title;
  permalink: Theme_BlogPostPage_Index_BlogPostPageContent_MetadataNextItem_Permalink;
  [key: string]: unknown;
};

export type Theme_BlogPostPage_Index_BlogPostPageContent_NextItem = Theme_BlogPostPage_Index_BlogPostPageContent_MetadataNextItem | undefined;

export type Theme_BlogPostPage_Index_BlogPostPageContent_MetadataPrevItem_Title = string;

export type Theme_BlogPostPage_Index_BlogPostPageContent_MetadataPrevItem_Permalink = string;

export type Theme_BlogPostPage_Index_BlogPostPageContent_MetadataPrevItem = {
  title: Theme_BlogPostPage_Index_BlogPostPageContent_MetadataPrevItem_Title;
  permalink: Theme_BlogPostPage_Index_BlogPostPageContent_MetadataPrevItem_Permalink;
  [key: string]: unknown;
};

export type Theme_BlogPostPage_Index_BlogPostPageContent_PrevItem = Theme_BlogPostPage_Index_BlogPostPageContent_MetadataPrevItem | undefined;

export type Theme_BlogPostPage_Index_BlogPostPageContent_HideTableOfContents = boolean | undefined;

export type Theme_BlogPostPage_Index_BlogPostPageContent_TocMinHeadingLevel = number | undefined;

export type Theme_BlogPostPage_Index_BlogPostPageContent_TocMaxHeadingLevel = number | undefined;

export type Theme_BlogPostPage_Index_BlogPostPageContent_TocSpread = Record<string, unknown>;

export type Theme_BlogPostPage_Index_BlogPostPageContent_CanRenderToc = boolean;

export type Theme_BlogPostPage_Index_BlogPostPageContent_Toc = ReactNode;

export type Theme_BlogPostPage_Index_BlogPostPageContent_PaginatorSpread = Record<string, unknown>;
