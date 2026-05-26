import type { TagLetterEntry } from '@docusaurus/theme-common';
import type { TagsListItem } from '@docusaurus/utils';
import type { CSSProperties } from 'react';

/**
 * Theme - Tags List By Letter - Tags List By Letter.
 *
 * @since 0.15.0
 */
export type ThemeTagsListByLetterTagsListByLetterPropsTags = readonly TagsListItem[];

export type ThemeTagsListByLetterTagsListByLetterPropsClassName = string | undefined;

export type ThemeTagsListByLetterTagsListByLetterPropsStyle = CSSProperties | undefined;

export type ThemeTagsListByLetterTagsListByLetterProps = {
  tags: ThemeTagsListByLetterTagsListByLetterPropsTags;
  className?: ThemeTagsListByLetterTagsListByLetterPropsClassName;
  style?: ThemeTagsListByLetterTagsListByLetterPropsStyle;
  [key: string]: unknown;
};

export type ThemeTagsListByLetterTagsListByLetterLetterList = TagLetterEntry[];

export type ThemeTagsListByLetterTagsListByLetterLetterEntry = TagLetterEntry;

export type ThemeTagsListByLetterTagsListByLetterTag = TagsListItem;
