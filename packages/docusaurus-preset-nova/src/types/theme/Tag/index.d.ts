import type { CSSProperties } from 'react';

/**
 * Theme - Tag.
 *
 * @since 0.15.0
 */
export type Theme_Tag_Index_Tag_Props_Permalink = string;

export type Theme_Tag_Index_Tag_Props_Label = string;

export type Theme_Tag_Index_Tag_Props_Count = number | undefined;

export type Theme_Tag_Index_Tag_Props_Description = string | undefined;

export type Theme_Tag_Index_Tag_Props_ClassName = string | undefined;

export type Theme_Tag_Index_Tag_Props_Style = CSSProperties | undefined;

export type Theme_Tag_Index_Tag_Props = {
  permalink: Theme_Tag_Index_Tag_Props_Permalink;
  label: Theme_Tag_Index_Tag_Props_Label;
  count?: Theme_Tag_Index_Tag_Props_Count;
  description?: Theme_Tag_Index_Tag_Props_Description;
  className?: Theme_Tag_Index_Tag_Props_ClassName;
  style?: Theme_Tag_Index_Tag_Props_Style;
  [key: string]: unknown;
};
