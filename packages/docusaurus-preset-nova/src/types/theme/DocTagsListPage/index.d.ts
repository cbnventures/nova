import type { TagsListItem } from '@docusaurus/utils';

/**
 * Theme - Doc Tags List Page - Doc Tags List Page.
 *
 * @since 0.15.0
 */
export type ThemeDocTagsListPageDocTagsListPagePropsTags = readonly TagsListItem[];

export type ThemeDocTagsListPageDocTagsListPageProps = {
  tags: ThemeDocTagsListPageDocTagsListPagePropsTags;
  [key: string]: unknown;
};

export type ThemeDocTagsListPageDocTagsListPageTitle = string;
