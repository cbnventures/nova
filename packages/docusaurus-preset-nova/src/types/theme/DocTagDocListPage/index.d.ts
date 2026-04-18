/**
 * Theme - Doc Tag Doc List Page - Doc Tag Doc List Page.
 *
 * @since 0.15.0
 */
export type ThemeDocTagDocListPageDocTagDocListPageTagLabel = string;

export type ThemeDocTagDocListPageDocTagDocListPageTagDescription = string | undefined;

export type ThemeDocTagDocListPageDocTagDocListPageTagPermalink = string;

export type ThemeDocTagDocListPageDocTagDocListPageTagCount = number;

export type ThemeDocTagDocListPageDocTagDocListPageTagAllTagsPath = string;

export type ThemeDocTagDocListPageDocTagDocListPageTagUnlisted = boolean | undefined;

export type ThemeDocTagDocListPageDocTagDocListPageTagItems = ThemeDocTagDocListPageDocTagDocListPageDoc[];

export type ThemeDocTagDocListPageDocTagDocListPageTag = {
  label: ThemeDocTagDocListPageDocTagDocListPageTagLabel;
  description?: ThemeDocTagDocListPageDocTagDocListPageTagDescription;
  permalink: ThemeDocTagDocListPageDocTagDocListPageTagPermalink;
  count: ThemeDocTagDocListPageDocTagDocListPageTagCount;
  allTagsPath: ThemeDocTagDocListPageDocTagDocListPageTagAllTagsPath;
  unlisted?: ThemeDocTagDocListPageDocTagDocListPageTagUnlisted;
  items: ThemeDocTagDocListPageDocTagDocListPageTagItems;
  [key: string]: unknown;
};

export type ThemeDocTagDocListPageDocTagDocListPagePropsTag = ThemeDocTagDocListPageDocTagDocListPageTag;

export type ThemeDocTagDocListPageDocTagDocListPageProps = {
  tag: ThemeDocTagDocListPageDocTagDocListPagePropsTag;
  [key: string]: unknown;
};

export type ThemeDocTagDocListPageDocTagDocListPageTitle = string;

export type ThemeDocTagDocListPageDocTagDocListPageViewAllTags = string;

export type ThemeDocTagDocListPageDocTagDocListPageMetadataSpread = Record<string, unknown>;

export type ThemeDocTagDocListPageDocTagDocListPageDocId = string;

export type ThemeDocTagDocListPageDocTagDocListPageDocTitle = string;

export type ThemeDocTagDocListPageDocTagDocListPageDocDescription = string | undefined;

export type ThemeDocTagDocListPageDocTagDocListPageDocPermalink = string;

export type ThemeDocTagDocListPageDocTagDocListPageDoc = {
  id: ThemeDocTagDocListPageDocTagDocListPageDocId;
  title: ThemeDocTagDocListPageDocTagDocListPageDocTitle;
  description?: ThemeDocTagDocListPageDocTagDocListPageDocDescription;
  permalink: ThemeDocTagDocListPageDocTagDocListPageDocPermalink;
  [key: string]: unknown;
};
