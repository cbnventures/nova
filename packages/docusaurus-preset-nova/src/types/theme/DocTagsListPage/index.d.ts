import type { TagsListItem } from '@docusaurus/utils';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Tags List Page - Doc Tags List Page.
 *
 * @since 0.15.0
 */
export type Theme_DocTagsListPage_Index_DocTagsListPage_Props_Tags = readonly TagsListItem[];

export type Theme_DocTagsListPage_Index_DocTagsListPage_Props_ClassName = string | undefined;

export type Theme_DocTagsListPage_Index_DocTagsListPage_Props_Style = CSSProperties | undefined;

export type Theme_DocTagsListPage_Index_DocTagsListPage_Props = {
  tags: Theme_DocTagsListPage_Index_DocTagsListPage_Props_Tags;
  className?: Theme_DocTagsListPage_Index_DocTagsListPage_Props_ClassName;
  style?: Theme_DocTagsListPage_Index_DocTagsListPage_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocTagsListPage_Index_DocTagsListPage_Title = string;
