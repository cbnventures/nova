import type { Author } from '@docusaurus/plugin-content-blog';
import type { BlogPostContextValue } from '@docusaurus/plugin-content-blog/client';
import type { DocusaurusContext } from '@docusaurus/types';
import type { TagMetadata } from '@docusaurus/utils';
import type { ReactNode } from 'react';

/**
 * Theme - Blog Post Item - Blog Post Item.
 *
 * @since 0.15.0
 */
export type ThemeBlogPostItemBlogPostItemPropsChildren = ReactNode;

export type ThemeBlogPostItemBlogPostItemPropsClassName = string | undefined;

export type ThemeBlogPostItemBlogPostItemProps = {
  children: ThemeBlogPostItemBlogPostItemPropsChildren;
  className?: ThemeBlogPostItemBlogPostItemPropsClassName;
  [key: string]: unknown;
};

export type ThemeBlogPostItemBlogPostItemContext = DocusaurusContext;

export type ThemeBlogPostItemBlogPostItemCurrentLocale = string;

export type ThemeBlogPostItemBlogPostItemBlogPost = BlogPostContextValue;

export type ThemeBlogPostItemBlogPostItemIsBlogPostPage = boolean;

export type ThemeBlogPostItemBlogPostItemTitle = string;

export type ThemeBlogPostItemBlogPostItemPermalink = string;

export type ThemeBlogPostItemBlogPostItemDate = string;

export type ThemeBlogPostItemBlogPostItemDateObject = Date;

export type ThemeBlogPostItemBlogPostItemFormattedDate = string;

export type ThemeBlogPostItemBlogPostItemReadingTime = number | undefined;

export type ThemeBlogPostItemBlogPostItemReadingTimeLabel = string;

export type ThemeBlogPostItemBlogPostItemFormattedReadingTime = string;

export type ThemeBlogPostItemBlogPostItemHasTruncateMarker = boolean;

export type ThemeBlogPostItemBlogPostItemAuthors = readonly Author[];

export type ThemeBlogPostItemBlogPostItemAssetsAuthorImageUrls = readonly (string | undefined)[];

export type ThemeBlogPostItemBlogPostItemTags = readonly TagMetadata[];

export type ThemeBlogPostItemBlogPostItemArticleClassName = string;

export type ThemeBlogPostItemBlogPostItemThemeConfig = {
  blog?: ThemeBlogPostItemBlogPostItemBlogShareConfig;
  [key: string]: unknown;
};

export type ThemeBlogPostItemBlogPostItemThemeConfigCast = unknown;

export type ThemeBlogPostItemBlogPostItemBlogShareConfig = {
  share?: ThemeBlogPostItemBlogPostItemShareConfig;
  [key: string]: unknown;
};

export type ThemeBlogPostItemBlogPostItemShareConfig = {
  platforms?: ThemeBlogPostItemBlogPostItemSharePlatforms;
  [key: string]: unknown;
};

export type ThemeBlogPostItemBlogPostItemSharePlatforms = string[];

export type ThemeBlogPostItemBlogPostItemHasShareButtons = boolean;

export type ThemeBlogPostItemBlogPostItemShareUrl = string;

export type ThemeBlogPostItemBlogPostItemReadMore = string;

export type ThemeBlogPostItemBlogPostItemAuthor = Author;

export type ThemeBlogPostItemBlogPostItemAuthorIndex = number;

export type ThemeBlogPostItemBlogPostItemAuthorImageUrl = string | undefined;

export type ThemeBlogPostItemBlogPostItemAuthorPage = {
  permalink: string;
  [key: string]: unknown;
} | null | undefined;

export type ThemeBlogPostItemBlogPostItemAuthorPermalink = string | undefined;

export type ThemeBlogPostItemBlogPostItemTag = TagMetadata;
