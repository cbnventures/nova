import type { TagsListItem } from '@docusaurus/utils';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Tags List Page - Doc Tags List Page.
 *
 * @since 0.15.0
 */
export type ThemeDocTagsListPageDocTagsListPagePropsTags = readonly TagsListItem[];

export type ThemeDocTagsListPageDocTagsListPagePropsClassName = string | undefined;

export type ThemeDocTagsListPageDocTagsListPagePropsStyle = CSSProperties | undefined;

export type ThemeDocTagsListPageDocTagsListPageProps = {
  tags: ThemeDocTagsListPageDocTagsListPagePropsTags;
  className?: ThemeDocTagsListPageDocTagsListPagePropsClassName;
  style?: ThemeDocTagsListPageDocTagsListPagePropsStyle;
  [key: string]: unknown;
};

export type ThemeDocTagsListPageDocTagsListPageTitle = string;
