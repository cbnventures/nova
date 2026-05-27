import type { CSSProperties } from 'react';

/**
 * Theme - Content Footer - Tags.
 *
 * @since 0.18.0
 */
export type Theme_ContentFooter_Tags_Index_Tags_Props_Tags = Theme_ContentFooter_Tags_Index_Tags_Tag[] | undefined;

export type Theme_ContentFooter_Tags_Index_Tags_Props_ClassName = string | undefined;

export type Theme_ContentFooter_Tags_Index_Tags_Props_Style = CSSProperties | undefined;

export type Theme_ContentFooter_Tags_Index_Tags_Props = {
  tags?: Theme_ContentFooter_Tags_Index_Tags_Props_Tags;
  className?: Theme_ContentFooter_Tags_Index_Tags_Props_ClassName;
  style?: Theme_ContentFooter_Tags_Index_Tags_Props_Style;
};

export type Theme_ContentFooter_Tags_Index_Tags_Label = string;

export type Theme_ContentFooter_Tags_Index_Tags_Tag_Permalink = string;

export type Theme_ContentFooter_Tags_Index_Tags_Tag_Label = string;

export type Theme_ContentFooter_Tags_Index_Tags_Tag_Description = string | undefined;

export type Theme_ContentFooter_Tags_Index_Tags_Tag = {
  permalink: Theme_ContentFooter_Tags_Index_Tags_Tag_Permalink;
  label: Theme_ContentFooter_Tags_Index_Tags_Tag_Label;
  description: Theme_ContentFooter_Tags_Index_Tags_Tag_Description;
  [key: string]: unknown;
};
