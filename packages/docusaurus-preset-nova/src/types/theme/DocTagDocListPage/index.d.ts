import type { CSSProperties } from 'react';

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

export type ThemeDocTagDocListPageDocTagDocListPagePropsClassName = string | undefined;

export type ThemeDocTagDocListPageDocTagDocListPagePropsStyle = CSSProperties | undefined;

export type ThemeDocTagDocListPageDocTagDocListPageProps = {
  tag: ThemeDocTagDocListPageDocTagDocListPagePropsTag;
  className?: ThemeDocTagDocListPageDocTagDocListPagePropsClassName;
  style?: ThemeDocTagDocListPageDocTagDocListPagePropsStyle;
  [key: string]: unknown;
};

export type ThemeDocTagDocListPageDocTagDocListPageDocsTaggedPlural = ThemeDocTagDocListPageUseDocsTaggedPluralSelectMessage;

export type ThemeDocTagDocListPageDocTagDocListPageNDocsTagged = string;

export type ThemeDocTagDocListPageDocTagDocListPageTitle = string;

export type ThemeDocTagDocListPageDocTagDocListPageViewAllTags = string;

export type ThemeDocTagDocListPageDocTagDocListPageReadDocLabel = string;

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

export type ThemeDocTagDocListPageDocTagDocListPageItemSectionLabel = string;

/**
 * Theme - Doc Tag Doc List Page - Format Doc Section.
 *
 * @since 0.18.0
 */
export type ThemeDocTagDocListPageFormatDocSectionDocId = string;

export type ThemeDocTagDocListPageFormatDocSectionReturns = string;

export type ThemeDocTagDocListPageFormatDocSectionParts = string[];

export type ThemeDocTagDocListPageFormatDocSectionParentParts = string[];

export type ThemeDocTagDocListPageFormatDocSectionFormatted = string[];

export type ThemeDocTagDocListPageFormatDocSectionSegment = string;

export type ThemeDocTagDocListPageFormatDocSectionWords = string[];

export type ThemeDocTagDocListPageFormatDocSectionTitled = string[];

export type ThemeDocTagDocListPageFormatDocSectionWord = string;

/**
 * Theme - Doc Tag Doc List Page - Use Docs Tagged Plural.
 *
 * @since 0.18.0
 */
export type ThemeDocTagDocListPageUseDocsTaggedPluralSelectMessage = (count: number) => string;

export type ThemeDocTagDocListPageUseDocsTaggedPluralPluralFormSelectMessage = (count: number, message: string) => string;

export type ThemeDocTagDocListPageUseDocsTaggedPluralPluralForm = {
  selectMessage: ThemeDocTagDocListPageUseDocsTaggedPluralPluralFormSelectMessage;
};

export type ThemeDocTagDocListPageUseDocsTaggedPluralCount = number;

export type ThemeDocTagDocListPageUseDocsTaggedPluralTranslated = string;
