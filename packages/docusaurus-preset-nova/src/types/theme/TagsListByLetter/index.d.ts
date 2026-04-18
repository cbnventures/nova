import type { TagLetterEntry } from '@docusaurus/theme-common';
import type { TagsListItem } from '@docusaurus/utils';

/**
 * Theme - Tags List By Letter - Tags List By Letter.
 *
 * @since 0.15.0
 */
export type ThemeTagsListByLetterTagsListByLetterPropsTags = readonly TagsListItem[];

export type ThemeTagsListByLetterTagsListByLetterProps = {
  tags: ThemeTagsListByLetterTagsListByLetterPropsTags;
  [key: string]: unknown;
};

export type ThemeTagsListByLetterTagsListByLetterLetterList = TagLetterEntry[];

export type ThemeTagsListByLetterTagsListByLetterLetterEntry = TagLetterEntry;

export type ThemeTagsListByLetterTagsListByLetterTag = TagsListItem;
