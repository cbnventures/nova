import type { CSSProperties } from 'react';

/**
 * Theme - Blog - Components - Author.
 *
 * @since 0.18.0
 */
export type ThemeBlogComponentsAuthorAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type ThemeBlogComponentsAuthorAuthorPage = {
  permalink: string;
} | null | undefined;

export type ThemeBlogComponentsAuthorPropsClassName = string | undefined;

export type ThemeBlogComponentsAuthorPropsStyle = CSSProperties | undefined;

export type ThemeBlogComponentsAuthorProps = {
  author: ThemeBlogComponentsAuthorAuthor;
  as?: ThemeBlogComponentsAuthorAs;
  count?: ThemeBlogComponentsAuthorCount;
  className?: ThemeBlogComponentsAuthorPropsClassName;
  style?: ThemeBlogComponentsAuthorPropsStyle;
};

export type ThemeBlogComponentsAuthorAuthor = {
  name?: string;
  imageURL?: string;
  url?: string;
  title?: string;
  email?: string;
  description?: string;
  page?: ThemeBlogComponentsAuthorAuthorPage;
  socials?: Readonly<Record<string, string>>;
  [key: string]: unknown;
};

export type ThemeBlogComponentsAuthorCount = number | undefined;

export type ThemeBlogComponentsAuthorAuthorName = string | undefined;

export type ThemeBlogComponentsAuthorAuthorTitle = string | undefined;

export type ThemeBlogComponentsAuthorAuthorImageUrl = string | undefined;

export type ThemeBlogComponentsAuthorLink = string | undefined;
