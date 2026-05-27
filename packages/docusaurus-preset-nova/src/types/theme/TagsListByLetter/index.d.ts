import type { TagLetterEntry } from '@docusaurus/theme-common';
import type { TagsListItem } from '@docusaurus/utils';
import type { CSSProperties } from 'react';

/**
 * Theme - Tags List By Letter - Tags List By Letter.
 *
 * @since 0.15.0
 */
export type Theme_TagsListByLetter_Index_TagsListByLetter_Props_Tags = readonly TagsListItem[];

export type Theme_TagsListByLetter_Index_TagsListByLetter_Props_ClassName = string | undefined;

export type Theme_TagsListByLetter_Index_TagsListByLetter_Props_Style = CSSProperties | undefined;

export type Theme_TagsListByLetter_Index_TagsListByLetter_Props = {
  tags: Theme_TagsListByLetter_Index_TagsListByLetter_Props_Tags;
  className?: Theme_TagsListByLetter_Index_TagsListByLetter_Props_ClassName;
  style?: Theme_TagsListByLetter_Index_TagsListByLetter_Props_Style;
  [key: string]: unknown;
};

export type Theme_TagsListByLetter_Index_TagsListByLetter_LetterList = TagLetterEntry[];

export type Theme_TagsListByLetter_Index_TagsListByLetter_LetterEntry = TagLetterEntry;

export type Theme_TagsListByLetter_Index_TagsListByLetter_Tag = TagsListItem;
