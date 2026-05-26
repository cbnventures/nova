import type { CSSProperties } from 'react';

/**
 * Theme - Content Footer - Tags.
 *
 * @since 0.18.0
 */
export type ThemeContentFooterTagsPropsTags = ThemeContentFooterTagsTag[] | undefined;

export type ThemeContentFooterTagsPropsClassName = string | undefined;

export type ThemeContentFooterTagsPropsStyle = CSSProperties | undefined;

export type ThemeContentFooterTagsProps = {
  tags?: ThemeContentFooterTagsPropsTags;
  className?: ThemeContentFooterTagsPropsClassName;
  style?: ThemeContentFooterTagsPropsStyle;
};

export type ThemeContentFooterTagsLabel = string;

export type ThemeContentFooterTagsTagPermalink = string;

export type ThemeContentFooterTagsTagLabel = string;

export type ThemeContentFooterTagsTagDescription = string | undefined;

export type ThemeContentFooterTagsTag = {
  permalink: ThemeContentFooterTagsTagPermalink;
  label: ThemeContentFooterTagsTagLabel;
  description: ThemeContentFooterTagsTagDescription;
  [key: string]: unknown;
};
