import type { Author } from '@docusaurus/plugin-content-blog';
import type { BlogPostContextValue } from '@docusaurus/plugin-content-blog/client';
import type { DocusaurusContext } from '@docusaurus/types';
import type { TagMetadata } from '@docusaurus/utils';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Blog Post Item - Blog Post Item.
 *
 * @since 0.15.0
 */
export type Theme_BlogPostItem_Index_BlogPostItem_Props_Children = ReactNode;

export type Theme_BlogPostItem_Index_BlogPostItem_Props_ClassName = string | undefined;

export type Theme_BlogPostItem_Index_BlogPostItem_Props_Style = CSSProperties | undefined;

export type Theme_BlogPostItem_Index_BlogPostItem_Props = {
  children: Theme_BlogPostItem_Index_BlogPostItem_Props_Children;
  className?: Theme_BlogPostItem_Index_BlogPostItem_Props_ClassName;
  style?: Theme_BlogPostItem_Index_BlogPostItem_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogPostItem_Index_BlogPostItem_Context = DocusaurusContext;

export type Theme_BlogPostItem_Index_BlogPostItem_CurrentLocale = string;

export type Theme_BlogPostItem_Index_BlogPostItem_BlogPost = BlogPostContextValue;

export type Theme_BlogPostItem_Index_BlogPostItem_IsBlogPostPage = boolean;

export type Theme_BlogPostItem_Index_BlogPostItem_Title = string;

export type Theme_BlogPostItem_Index_BlogPostItem_Permalink = string;

export type Theme_BlogPostItem_Index_BlogPostItem_Date = string;

export type Theme_BlogPostItem_Index_BlogPostItem_DateObject = Date;

export type Theme_BlogPostItem_Index_BlogPostItem_FormattedDate = string;

export type Theme_BlogPostItem_Index_BlogPostItem_ReadingTime = number | undefined;

export type Theme_BlogPostItem_Index_BlogPostItem_ReadingTimeLabel = string;

export type Theme_BlogPostItem_Index_BlogPostItem_FormattedReadingTime = string;

export type Theme_BlogPostItem_Index_BlogPostItem_HasTruncateMarker = boolean;

export type Theme_BlogPostItem_Index_BlogPostItem_Authors = readonly Author[];

export type Theme_BlogPostItem_Index_BlogPostItem_AssetsAuthorImageUrls = readonly (string | undefined)[];

export type Theme_BlogPostItem_Index_BlogPostItem_Tags = readonly TagMetadata[];

export type Theme_BlogPostItem_Index_BlogPostItem_ArticleClassName = string;

export type Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig = {
  blog?: Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog;
  [key: string]: unknown;
};

export type Theme_BlogPostItem_Index_BlogPostItem_ThemeConfigCast = unknown;

export type Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog = {
  share?: Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog_Share;
  [key: string]: unknown;
};

export type Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog_Share = {
  platforms?: Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog_Share_Platforms;
  [key: string]: unknown;
};

export type Theme_BlogPostItem_Index_BlogPostItem_ThemeConfig_Blog_Share_Platforms = string[];

export type Theme_BlogPostItem_Index_BlogPostItem_HasShareButtons = boolean;

export type Theme_BlogPostItem_Index_BlogPostItem_ShareUrl = string;

export type Theme_BlogPostItem_Index_BlogPostItem_ReadMore = string;

export type Theme_BlogPostItem_Index_BlogPostItem_ReadMoreAriaLabel = string;

export type Theme_BlogPostItem_Index_BlogPostItem_Author = Author;

export type Theme_BlogPostItem_Index_BlogPostItem_AuthorIndex = number;

export type Theme_BlogPostItem_Index_BlogPostItem_AuthorImageUrl = string | undefined;

export type Theme_BlogPostItem_Index_BlogPostItem_AuthorPage = {
  permalink: string;
  [key: string]: unknown;
} | null | undefined;

export type Theme_BlogPostItem_Index_BlogPostItem_AuthorPermalink = string | undefined;

export type Theme_BlogPostItem_Index_BlogPostItem_Tag = TagMetadata;
