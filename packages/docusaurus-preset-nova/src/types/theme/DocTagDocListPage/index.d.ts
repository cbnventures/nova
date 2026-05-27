import type { CSSProperties } from 'react';

/**
 * Theme - Doc Tag Doc List Page - Doc Tag Doc List Page.
 *
 * @since 0.15.0
 */
export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Label = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Description = string | undefined;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Permalink = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Count = number;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_AllTagsPath = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Unlisted = boolean | undefined;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Items = Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc[];

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag = {
  label: Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Label;
  description?: Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Description;
  permalink: Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Permalink;
  count: Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Count;
  allTagsPath: Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_AllTagsPath;
  unlisted?: Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Unlisted;
  items: Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag_Items;
  [key: string]: unknown;
};

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Props_Tag = Theme_DocTagDocListPage_Index_DocTagDocListPage_Tag;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Props_ClassName = string | undefined;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Props_Style = CSSProperties | undefined;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Props = {
  tag: Theme_DocTagDocListPage_Index_DocTagDocListPage_Props_Tag;
  className?: Theme_DocTagDocListPage_Index_DocTagDocListPage_Props_ClassName;
  style?: Theme_DocTagDocListPage_Index_DocTagDocListPage_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_DocsTaggedPlural = Theme_DocTagDocListPage_Index_UseDocsTaggedPlural_SelectMessage;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_NDocsTagged = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Title = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_ViewAllTags = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_ReadDocLabel = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_MetadataSpread = Record<string, unknown>;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc_Id = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc_Title = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc_Description = string | undefined;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc_Permalink = string;

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc = {
  id: Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc_Id;
  title: Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc_Title;
  description?: Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc_Description;
  permalink: Theme_DocTagDocListPage_Index_DocTagDocListPage_Doc_Permalink;
  [key: string]: unknown;
};

export type Theme_DocTagDocListPage_Index_DocTagDocListPage_ItemSectionLabel = string;

/**
 * Theme - Doc Tag Doc List Page - Format Doc Section.
 *
 * @since 0.18.0
 */
export type Theme_DocTagDocListPage_Index_FormatDocSection_DocId = string;

export type Theme_DocTagDocListPage_Index_FormatDocSection_Returns = string;

export type Theme_DocTagDocListPage_Index_FormatDocSection_Parts = string[];

export type Theme_DocTagDocListPage_Index_FormatDocSection_ParentParts = string[];

export type Theme_DocTagDocListPage_Index_FormatDocSection_Formatted = string[];

export type Theme_DocTagDocListPage_Index_FormatDocSection_Segment = string;

export type Theme_DocTagDocListPage_Index_FormatDocSection_Words = string[];

export type Theme_DocTagDocListPage_Index_FormatDocSection_Titled = string[];

export type Theme_DocTagDocListPage_Index_FormatDocSection_Word = string;

/**
 * Theme - Doc Tag Doc List Page - Use Docs Tagged Plural.
 *
 * @since 0.18.0
 */
export type Theme_DocTagDocListPage_Index_UseDocsTaggedPlural_SelectMessage = (count: number) => string;

export type Theme_DocTagDocListPage_Index_UseDocsTaggedPlural_PluralForm_SelectMessage = (count: number, message: string) => string;

export type Theme_DocTagDocListPage_Index_UseDocsTaggedPlural_PluralForm = {
  selectMessage: Theme_DocTagDocListPage_Index_UseDocsTaggedPlural_PluralForm_SelectMessage;
};

export type Theme_DocTagDocListPage_Index_UseDocsTaggedPlural_Count = number;

export type Theme_DocTagDocListPage_Index_UseDocsTaggedPlural_Translated = string;
